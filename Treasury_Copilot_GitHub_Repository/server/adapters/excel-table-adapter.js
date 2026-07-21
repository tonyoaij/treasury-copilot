import crypto from "node:crypto";

export const WORKBOOK_MAPPING = Object.freeze({
  headers: { sheet: "Bank_Reconciliation_Headers", table: "BankReconciliationHeadersTable", required: ["OrganisationID", "ReconciliationID", "BankAccountID", "BankName", "AccountNumber", "Currency", "StatementStartDate", "StatementEndDate", "OpeningStatementBalance", "ClosingStatementBalance", "SystemOpeningBalance", "SystemClosingBalance", "ReconciliationStatus"] },
  lines: { sheet: "Bank_Reconciliation_Lines", table: "BankReconciliationLinesTable", required: ["OrganisationID", "ReconciliationLineID", "ReconciliationID", "LineSource", "TransactionDate", "Description", "ReferenceNo", "DebitAmount", "CreditAmount", "MatchStatus", "MatchType"] },
  adjustments: { sheet: "Bank_Recon_Adjustment", table: "BankReconAdjustmentsTable", required: ["OrganisationID", "AdjustmentID", "ReconciliationID", "AdjustmentDate", "AdjustmentType", "AdjustmentAmount", "AdjustmentStatus", "Description"] },
  statements: { sheet: "Bank_Statement_Imports", table: "BankStatementImportsTable", required: ["OrganisationID", "StatementImportID", "BankAccountID", "Currency", "StatementDate", "Description", "ReferenceNo", "DebitAmount", "CreditAmount", "MatchStatus", "MatchedReconciliationID"] },
  bankAccounts: { sheet: "Bank_Accounts", table: "BankAccountsTable", required: ["OrganisationID", "BankAccountID", "BankName", "AccountNumber", "Currency", "OperationalStatus"] }
});

const EXCLUDED_FIELDS = new Set(["RawImportedText", "PreparedBy", "ReviewedBy", "ApprovedBy", "CancelledBy", "EnteredBy", "ModifiedBy", "PostedBy", "PayeePayer", "SourceFileName", "Notes", "ReviewNotes"]);
const text = (value, max = 160) => String(value ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);
const amount = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
const maskAccount = (value) => `•••• ${text(value).slice(-4).padStart(4, "•")}`;
const evidenceId = (prefix, sourceId) => `EV-${prefix}-${crypto.createHash("sha256").update(String(sourceId)).digest("hex").slice(0, 10).toUpperCase()}`;

export function validateTableHeaders(tableName, rows, mapping = WORKBOOK_MAPPING) {
  const definition = Object.values(mapping).find((item) => item.table === tableName);
  if (!definition) throw new Error(`Unapproved workbook table: ${tableName}`);
  const headers = new Set(Object.keys(rows[0] || {}));
  const missing = definition.required.filter((field) => !headers.has(field));
  if (missing.length) throw new Error(`${tableName} is missing columns: ${missing.join(", ")}`);
  return true;
}

export function sanitizeRow(row) {
  return Object.fromEntries(Object.entries(row).filter(([key]) => !EXCLUDED_FIELDS.has(key)));
}

export function buildSnapshotFromTables({ activeOrganisationId, reconciliationId, userRole, permissions = [], tables, now = new Date().toISOString() }) {
  if (!activeOrganisationId || !reconciliationId) throw new Error("Trusted organisation and reconciliation context are required.");
  for (const [key, definition] of Object.entries(WORKBOOK_MAPPING)) validateTableHeaders(definition.table, tables[key] || []);
  const scoped = (rows) => rows.filter((row) => text(row.OrganisationID) === activeOrganisationId);
  const headerRows = scoped(tables.headers).filter((row) => text(row.ReconciliationID) === reconciliationId);
  if (headerRows.length !== 1) throw new Error("Exactly one organisation-scoped reconciliation header is required.");
  const header = sanitizeRow(headerRows[0]);
  const lineRows = scoped(tables.lines).filter((row) => text(row.ReconciliationID) === reconciliationId).map(sanitizeRow);
  const adjustmentRows = scoped(tables.adjustments).filter((row) => text(row.ReconciliationID) === reconciliationId).map(sanitizeRow);
  const statementRows = scoped(tables.statements).filter((row) => text(row.MatchedReconciliationID) === reconciliationId || text(row.BankAccountID) === text(header.BankAccountID)).map(sanitizeRow);

  const lines = lineRows.map((row) => ({
    organisationId: activeOrganisationId, reconciliationId, evidenceId: evidenceId("LINE", row.ReconciliationLineID), lineId: text(row.ReconciliationLineID),
    source: ["Bank", "System", "Adjustment"].includes(text(row.LineSource)) ? text(row.LineSource) : "System",
    transactionDate: new Date(row.TransactionDate).toISOString().slice(0, 10), description: text(row.Description), reference: text(row.ReferenceNo, 60) || undefined,
    debit: amount(row.DebitAmount), credit: amount(row.CreditAmount), matchStatus: /^matched$/i.test(text(row.MatchStatus)) ? "Matched" : "Unmatched", matchType: text(row.MatchType) || undefined
  }));
  const adjustments = adjustmentRows.map((row) => ({
    organisationId: activeOrganisationId, reconciliationId, evidenceId: evidenceId("ADJ", row.AdjustmentID), adjustmentId: text(row.AdjustmentID),
    adjustmentType: /^income$/i.test(text(row.AdjustmentType)) ? "Income" : "Expense", amount: Math.abs(amount(row.AdjustmentAmount)), status: text(row.AdjustmentStatus),
    transactionDate: new Date(row.AdjustmentDate).toISOString().slice(0, 10), description: text(row.Description)
  }));
  const headerEvidenceId = evidenceId("HDR", reconciliationId);
  const evidence = [{ evidenceId: headerEvidenceId, sourceType: "reconciliation_header", sourceId: reconciliationId, label: "Reconciliation header", amount: amount(header.Difference), currency: text(header.Currency), status: text(header.ReconciliationStatus) }];
  for (const row of lines) evidence.push({ evidenceId: row.evidenceId, sourceType: "reconciliation_line", sourceId: row.lineId, label: row.description || "Reconciliation line", date: row.transactionDate, amount: row.credit - row.debit, currency: text(header.Currency), status: row.matchStatus });
  for (const row of adjustments) evidence.push({ evidenceId: row.evidenceId, sourceType: "adjustment", sourceId: row.adjustmentId, label: row.description || "Reconciliation adjustment", date: row.transactionDate, amount: row.amount, currency: text(header.Currency), status: row.status });

  return {
    schemaVersion: "1.0", generatedAt: now,
    requestContext: { requestId: `req-${crypto.randomUUID()}`, organisationId: activeOrganisationId, reconciliationId, userRole: text(userRole || "Read Only"), permissions, clientType: "excel_adapter", readOnly: true },
    reconciliation: { organisationId: activeOrganisationId, reconciliationId, bankAccountId: text(header.BankAccountID), bankName: text(header.BankName), maskedAccountNumber: maskAccount(header.AccountNumber), currency: text(header.Currency), statementStartDate: new Date(header.StatementStartDate).toISOString().slice(0, 10), statementEndDate: new Date(header.StatementEndDate).toISOString().slice(0, 10), openingStatementBalance: amount(header.OpeningStatementBalance), closingStatementBalance: amount(header.ClosingStatementBalance), systemOpeningBalance: amount(header.SystemOpeningBalance), systemClosingBalance: amount(header.SystemClosingBalance), status: text(header.ReconciliationStatus) },
    lines, adjustments, evidence,
    adapterAudit: { tableRowsRead: { headers: headerRows.length, lines: lineRows.length, adjustments: adjustmentRows.length, statements: statementRows.length }, excludedFields: [...EXCLUDED_FIELDS], workbookMutated: false }
  };
}


import { SnapshotSchema } from "../shared/schemas.js";

export function validateSnapshot(input) {
  const snapshot = SnapshotSchema.parse(input);
  const { organisationId, reconciliationId, readOnly } = snapshot.requestContext;
  if (!readOnly) throw new Error("Treasury Copilot accepts read-only snapshots only.");
  if (snapshot.reconciliation.organisationId !== organisationId || snapshot.reconciliation.reconciliationId !== reconciliationId) {
    throw new Error("Reconciliation header is outside the trusted request context.");
  }
  for (const row of [...snapshot.lines, ...snapshot.adjustments]) {
    if (row.organisationId !== organisationId || row.reconciliationId !== reconciliationId) {
      throw new Error(`Cross-context record rejected: ${row.evidenceId}`);
    }
  }
  const ids = new Set();
  for (const item of snapshot.evidence) {
    if (ids.has(item.evidenceId)) throw new Error(`Duplicate evidence ID: ${item.evidenceId}`);
    ids.add(item.evidenceId);
  }
  for (const row of [...snapshot.lines, ...snapshot.adjustments]) {
    if (!ids.has(row.evidenceId)) throw new Error(`Missing evidence record: ${row.evidenceId}`);
  }
  return snapshot;
}

export function minimalModelContext(snapshot, facts) {
  return {
    requestContext: {
      requestId: snapshot.requestContext.requestId,
      organisationId: snapshot.requestContext.organisationId,
      reconciliationId: snapshot.requestContext.reconciliationId,
      userRole: snapshot.requestContext.userRole,
      readOnly: true
    },
    reconciliation: {
      bankName: snapshot.reconciliation.bankName,
      maskedAccountNumber: snapshot.reconciliation.maskedAccountNumber,
      currency: snapshot.reconciliation.currency,
      statementStartDate: snapshot.reconciliation.statementStartDate,
      statementEndDate: snapshot.reconciliation.statementEndDate,
      status: snapshot.reconciliation.status
    },
    facts,
    evidence: snapshot.evidence.map(({ evidenceId, sourceType, label, date, amount, currency, status }) => ({
      evidenceId, sourceType, label, date, amount, currency, status
    }))
  };
}


const round = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const signed = (line) => round((line.credit || 0) - (line.debit || 0));

export function computeFacts(snapshot) {
  const bankLines = snapshot.lines.filter((line) => line.source === "Bank");
  const systemLines = snapshot.lines.filter((line) => line.source === "System");
  const unmatchedBank = bankLines.filter((line) => line.matchStatus === "Unmatched");
  const unmatchedSystem = systemLines.filter((line) => line.matchStatus === "Unmatched");
  const matched = snapshot.lines.filter((line) => line.matchStatus === "Matched");
  const preparedAdjustments = snapshot.adjustments.filter((item) => item.status === "Prepared");
  const closingDifference = round(snapshot.reconciliation.closingStatementBalance - snapshot.reconciliation.systemClosingBalance);
  const unmatchedBankNet = round(unmatchedBank.reduce((sum, line) => sum + signed(line), 0));
  const unmatchedSystemNet = round(unmatchedSystem.reduce((sum, line) => sum + signed(line), 0));
  const pendingAdjustmentAmount = round(preparedAdjustments.reduce((sum, item) => sum + item.amount, 0));
  const uniqueMatchGroups = new Set(matched.map((line) => line.matchGroupId).filter(Boolean)).size;
  const allEvidenceIds = ["EV-HDR-001", ...unmatchedBank.map((x) => x.evidenceId), ...unmatchedSystem.map((x) => x.evidenceId), ...preparedAdjustments.map((x) => x.evidenceId)];

  return Object.freeze({
    currency: snapshot.reconciliation.currency,
    statementClosingBalance: snapshot.reconciliation.closingStatementBalance,
    systemClosingBalance: snapshot.reconciliation.systemClosingBalance,
    closingDifference,
    absoluteDifference: Math.abs(closingDifference),
    isBalanced: closingDifference === 0,
    reconciliationStatus: snapshot.reconciliation.status,
    matchedLineCount: matched.length,
    matchGroupCount: uniqueMatchGroups,
    unmatchedBankCount: unmatchedBank.length,
    unmatchedBankNet,
    unmatchedSystemCount: unmatchedSystem.length,
    unmatchedSystemNet,
    pendingAdjustmentCount: preparedAdjustments.length,
    pendingAdjustmentAmount,
    readyForApproval: closingDifference === 0 && unmatchedBank.length === 0 && unmatchedSystem.length === 0 && preparedAdjustments.length === 0 && snapshot.reconciliation.status === "Reviewed",
    blockerCount: Number(closingDifference !== 0) + Number(unmatchedBank.length > 0) + Number(unmatchedSystem.length > 0) + Number(preparedAdjustments.length > 0),
    evidenceIds: [...new Set(allEvidenceIds)]
  });
}


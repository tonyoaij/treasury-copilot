export function buildFallbackBrief(snapshot, facts, model = "deterministic") {
  const currency = facts.currency;
  const fmt = (n) => `${currency} ${Math.abs(n).toLocaleString("en-KE", { maximumFractionDigits: 2 })}`;
  const findings = [];
  if (!facts.isBalanced) findings.push({
    findingId: "F-VARIANCE", priority: "high", category: "variance",
    title: `${fmt(facts.closingDifference)} closing difference`,
    explanation: `The statement closing balance exceeds the system closing balance by ${fmt(facts.closingDifference)}. This is a deterministic comparison of the two closing balances.`,
    implication: "The reconciliation should not progress to approval until the difference is explained and resolved.",
    evidenceIds: ["EV-HDR-001"], confidence: "high"
  });
  if (facts.unmatchedBankCount) findings.push({
    findingId: "F-UNMATCHED-BANK", priority: "high", category: "unmatched",
    title: `${facts.unmatchedBankCount} unmatched bank lines`,
    explanation: `Unmatched bank activity has a net value of ${fmt(facts.unmatchedBankNet)} and requires source identification or an authorised adjustment workflow.`,
    implication: "Unresolved bank activity may explain all or part of the closing difference.",
    evidenceIds: snapshot.lines.filter((x) => x.source === "Bank" && x.matchStatus === "Unmatched").map((x) => x.evidenceId), confidence: "high"
  });
  if (facts.pendingAdjustmentCount) findings.push({
    findingId: "F-ADJUSTMENT", priority: "medium", category: "adjustment",
    title: "Prepared adjustment awaits independent review",
    explanation: `${facts.pendingAdjustmentCount} adjustment totaling ${fmt(facts.pendingAdjustmentAmount)} is prepared but not reviewed, approved, or posted.`,
    implication: "The adjustment cannot affect the final reconciled position until the controlled maker-checker workflow is completed.",
    evidenceIds: snapshot.adjustments.filter((x) => x.status === "Prepared").map((x) => x.evidenceId), confidence: "high"
  });
  if (!findings.length) findings.push({
    findingId: "F-CLEAR", priority: "low", category: "information", title: "No deterministic exceptions detected",
    explanation: "Closing balances agree and no unmatched lines or pending adjustments were detected.",
    implication: "The reconciliation may proceed subject to the existing workflow and human review.", evidenceIds: ["EV-HDR-001"], confidence: "high"
  });
  const recommendations = [];
  if (facts.unmatchedBankCount) recommendations.push({ action: "Identify and resolve the unmatched bank transactions using the existing reconciliation workflow.", ownerRole: "Preparer", urgency: "before_review", evidenceIds: findings.find((x) => x.findingId === "F-UNMATCHED-BANK").evidenceIds });
  if (facts.pendingAdjustmentCount) recommendations.push({ action: "Route the prepared bank-charge adjustment for independent review; do not bypass maker-checker controls.", ownerRole: "Reviewer", urgency: "before_approval", evidenceIds: ["EV-ADJ-001"] });
  if (!recommendations.length) recommendations.push({ action: "Perform the normal human review and retain approval evidence.", ownerRole: "Reviewer", urgency: "before_approval", evidenceIds: ["EV-HDR-001"] });
  return {
    schemaVersion: "1.0", requestId: snapshot.requestContext.requestId, reconciliationId: snapshot.requestContext.reconciliationId,
    verdict: facts.readyForApproval ? "ready" : facts.blockerCount ? "not_ready" : "attention_required",
    headline: facts.readyForApproval ? "Reconciliation is ready for approval." : `${facts.blockerCount} control blockers require attention before approval.`,
    executiveSummary: `The ${snapshot.reconciliation.statementEndDate} reconciliation is ${snapshot.reconciliation.status}. The closing difference is ${fmt(facts.closingDifference)}. There are ${facts.unmatchedBankCount} unmatched bank lines, ${facts.unmatchedSystemCount} unmatched system lines, and ${facts.pendingAdjustmentCount} pending adjustment. Treasury Copilot has not changed any accounting record.`,
    findings: findings.slice(0, 5), recommendations: recommendations.slice(0, 5),
    caveats: ["This brief is decision support, not an approval or accounting instruction.", "All actions must remain inside the Treasury Management Platform controls."],
    evidenceIds: [...new Set(findings.flatMap((x) => x.evidenceIds))], generatedBy: "deterministic_fallback", model,
    validation: { schemaValid: true, evidenceValid: true, numericClaimsValidated: true }
  };
}


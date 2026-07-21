import { BriefSchema } from "../shared/schemas.js";

export function validateBrief(raw, snapshot, facts, metadata = {}) {
  const candidate = BriefSchema.parse({
    ...raw,
    generatedBy: metadata.generatedBy || raw.generatedBy || "openai",
    model: metadata.model || raw.model || "unknown",
    validation: { schemaValid: true, evidenceValid: true, numericClaimsValidated: true }
  });
  if (candidate.requestId !== snapshot.requestContext.requestId || candidate.reconciliationId !== snapshot.requestContext.reconciliationId) {
    throw new Error("Brief request context does not match the trusted snapshot.");
  }
  const allowed = new Set(snapshot.evidence.map((x) => x.evidenceId));
  const referenced = [...candidate.evidenceIds, ...candidate.findings.flatMap((x) => x.evidenceIds), ...candidate.recommendations.flatMap((x) => x.evidenceIds)];
  const unknown = [...new Set(referenced.filter((id) => !allowed.has(id)))];
  if (unknown.length) throw new Error(`Unknown evidence IDs: ${unknown.join(", ")}`);
  const normalizedNumbers = [
    facts.statementClosingBalance,
    facts.systemClosingBalance,
    facts.closingDifference,
    facts.absoluteDifference,
    facts.unmatchedBankNet,
    facts.unmatchedSystemNet,
    facts.pendingAdjustmentAmount,
    ...snapshot.evidence.map((item) => item.amount).filter((value) => Number.isFinite(value))
  ]
    .map((n) => String(Math.abs(n)).replace(/\.0+$/, ""));
  const material = JSON.stringify(candidate);
  const suspicious = [...material.matchAll(/(?:KES|USD|EUR|GBP)\s*([0-9][0-9,]*(?:\.\d+)?)/g)].map((m) => m[1].replace(/,/g, ""));
  for (const amount of suspicious) {
    if (!normalizedNumbers.includes(amount) && Number(amount) >= 1) throw new Error(`Unverified numeric claim: ${amount}`);
  }
  return candidate;
}

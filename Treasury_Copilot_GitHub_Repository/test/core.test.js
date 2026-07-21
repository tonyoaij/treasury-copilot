import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeFacts } from "../server/facts.js";
import { buildFallbackBrief } from "../server/fallback.js";
import { validateSnapshot } from "../server/snapshot.js";
import { validateBrief } from "../server/validator.js";
import { loadConfig, publicConfig } from "../server/config.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixture = JSON.parse(fs.readFileSync(path.join(root, "fixtures/sanitized-reconciliation.json"), "utf8"));

test("sanitized fixture is organisation-scoped and read-only", () => {
  const snapshot = validateSnapshot(fixture);
  assert.equal(snapshot.requestContext.readOnly, true);
  assert.ok(snapshot.lines.every((x) => x.organisationId === snapshot.requestContext.organisationId));
  assert.ok(!JSON.stringify(snapshot).includes("RawImportedText"));
  assert.match(snapshot.reconciliation.maskedAccountNumber, /•/);
});

test("deterministic facts reconcile the curated demo position", () => {
  const facts = computeFacts(validateSnapshot(fixture));
  assert.equal(facts.closingDifference, 30500);
  assert.equal(facts.unmatchedBankCount, 2);
  assert.equal(facts.unmatchedBankNet, 30500);
  assert.equal(facts.pendingAdjustmentAmount, 12000);
  assert.equal(facts.readyForApproval, false);
});

test("cross-organisation rows are rejected", () => {
  const poisoned = structuredClone(fixture);
  poisoned.lines[0].organisationId = "ORG-OTHER";
  assert.throws(() => validateSnapshot(poisoned), /Cross-context record rejected/);
});

test("unknown evidence IDs are rejected", () => {
  const snapshot = validateSnapshot(fixture);
  const facts = computeFacts(snapshot);
  const brief = buildFallbackBrief(snapshot, facts);
  brief.findings[0].evidenceIds = ["EV-NOT-REAL"];
  assert.throws(() => validateBrief(brief, snapshot, facts), /Unknown evidence IDs/);
});

test("unverified currency claims are rejected", () => {
  const snapshot = validateSnapshot(fixture);
  const facts = computeFacts(snapshot);
  const brief = buildFallbackBrief(snapshot, facts);
  brief.executiveSummary += " An unsupported amount is KES 999,999.";
  assert.throws(() => validateBrief(brief, snapshot, facts), /Unverified numeric claim/);
});

test("verified closing balances and evidence amounts are accepted", () => {
  const snapshot = validateSnapshot(fixture);
  const facts = computeFacts(snapshot);
  const brief = buildFallbackBrief(snapshot, facts);
  brief.executiveSummary += " The statement balance is KES 1,392,750 and the incoming evidence is KES 42,500.";
  assert.equal(validateBrief(brief, snapshot, facts).validation.numericClaimsValidated, true);
});

test("fallback brief is schema-valid and evidence-grounded", () => {
  const snapshot = validateSnapshot(fixture);
  const facts = computeFacts(snapshot);
  const brief = validateBrief(buildFallbackBrief(snapshot, facts), snapshot, facts);
  assert.equal(brief.generatedBy, "deterministic_fallback");
  assert.equal(brief.validation.evidenceValid, true);
  assert.equal(brief.verdict, "not_ready");
});

test("public configuration never exposes the API key", () => {
  const config = loadConfig({ OPENAI_API_KEY: "test-secret", TREASURY_OPENAI_MODEL: "test-model" });
  const safe = publicConfig(config);
  assert.equal(safe.apiKeyConfigured, true);
  assert.equal("apiKey" in safe, false);
  assert.equal(JSON.stringify(safe).includes("test-secret"), false);
});

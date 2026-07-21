import { computeFacts } from "./facts.js";
import { buildFallbackBrief } from "./fallback.js";
import { generateOpenAIBrief } from "./openai-service.js";
import { validateSnapshot } from "./snapshot.js";
import { validateBrief } from "./validator.js";
import { safeTelemetry } from "./telemetry.js";

export async function analyze(input, config, { preferLiveAi = true } = {}) {
  const started = performance.now();
  const snapshot = validateSnapshot(input);
  const facts = computeFacts(snapshot);
  let brief;
  let usage = null;
  let fallbackUsed = false;
  let errorClass;
  try {
    if (!preferLiveAi) throw new Error("Deterministic demonstration mode requested.");
    const generated = await generateOpenAIBrief(snapshot, facts, config);
    usage = generated.usage;
    brief = validateBrief(generated.brief, snapshot, facts, { generatedBy: "openai", model: config.model });
  } catch (error) {
    fallbackUsed = true;
    errorClass = error?.constructor?.name || "Error";
    brief = validateBrief(buildFallbackBrief(snapshot, facts, `${config.model} (fallback)`), snapshot, facts, { generatedBy: "deterministic_fallback", model: `${config.model} (fallback)` });
  }
  const responseTimeMs = Math.round(performance.now() - started);
  safeTelemetry({ requestId: snapshot.requestContext.requestId, model: config.model, responseTimeMs, validationStatus: "passed", structuredOutputValid: true, mode: config.mode, fallbackUsed, errorClass, inputTokens: usage?.input_tokens, outputTokens: usage?.output_tokens, totalTokens: usage?.total_tokens });
  return { snapshotMeta: { organisationId: snapshot.requestContext.organisationId, reconciliationId: snapshot.requestContext.reconciliationId, readOnly: true }, facts, brief, telemetry: { requestId: snapshot.requestContext.requestId, model: config.model, responseTimeMs, validationStatus: "passed", fallbackUsed, inputTokens: usage?.input_tokens ?? null, outputTokens: usage?.output_tokens ?? null, totalTokens: usage?.total_tokens ?? null } };
}

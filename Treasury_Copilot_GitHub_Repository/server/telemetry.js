export function safeTelemetry(event) {
  const safe = {
    timestamp: new Date().toISOString(),
    requestId: event.requestId,
    model: event.model,
    responseTimeMs: event.responseTimeMs,
    validationStatus: event.validationStatus,
    structuredOutputValid: event.structuredOutputValid,
    mode: event.mode,
    fallbackUsed: event.fallbackUsed,
    errorClass: event.errorClass,
    inputTokens: event.inputTokens,
    outputTokens: event.outputTokens,
    totalTokens: event.totalTokens
  };
  console.log(JSON.stringify(safe));
}

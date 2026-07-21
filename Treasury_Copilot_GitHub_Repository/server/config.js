import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.resolve(appRoot, "../.env.local"), quiet: true });
dotenv.config({ path: path.resolve(appRoot, ".env.local"), override: false, quiet: true });

const bool = (value, fallback) => value == null ? fallback : /^(1|true|yes)$/i.test(value);
const number = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;

export function loadConfig(env = process.env) {
  const mode = env.TREASURY_MODE || "development";
  return Object.freeze({
    provider: env.TREASURY_OPENAI_PROVIDER || "openai",
    model: env.TREASURY_OPENAI_MODEL || "gpt-5.6-terra",
    apiKeySource: "OPENAI_API_KEY environment variable",
    apiKey: env.OPENAI_API_KEY || "",
    requestTimeoutMs: number(env.TREASURY_REQUEST_TIMEOUT_MS, 30000),
    maxOutputTokens: number(env.TREASURY_MAX_OUTPUT_TOKENS, 1400),
    temperature: number(env.TREASURY_TEMPERATURE, 0.2),
    structuredOutput: bool(env.TREASURY_STRUCTURED_OUTPUT, true),
    allowLiveAi: bool(env.TREASURY_ALLOW_LIVE_AI, true),
    mode,
    port: number(env.TREASURY_PORT, 8787),
    telemetryEnabled: true,
    appRoot
  });
}

export const config = loadConfig();

export function publicConfig(value = config) {
  return {
    provider: value.provider,
    model: value.model,
    apiKeySource: value.apiKeySource,
    requestTimeoutMs: value.requestTimeoutMs,
    maxOutputTokens: value.maxOutputTokens,
    temperature: value.temperature,
    structuredOutput: value.structuredOutput,
    allowLiveAi: value.allowLiveAi,
    mode: value.mode,
    apiKeyConfigured: Boolean(value.apiKey)
  };
}

import { z } from "zod";

const money = z.number().finite();

export const EvidenceSchema = z.object({
  evidenceId: z.string().min(3),
  sourceType: z.enum(["reconciliation_header", "reconciliation_line", "statement_line", "adjustment", "computed_fact"]),
  sourceId: z.string().min(1),
  label: z.string().min(1),
  date: z.string().optional(),
  amount: money.optional(),
  currency: z.string().length(3).optional(),
  status: z.string().optional(),
  description: z.string().max(160).optional()
});

export const SnapshotSchema = z.object({
  schemaVersion: z.literal("1.0"),
  generatedAt: z.string(),
  requestContext: z.object({
    requestId: z.string().min(8),
    organisationId: z.string().min(1),
    reconciliationId: z.string().min(1),
    userRole: z.string().min(1),
    permissions: z.array(z.string()),
    clientType: z.enum(["static_fixture", "excel_adapter", "web_adapter"]),
    readOnly: z.literal(true)
  }),
  reconciliation: z.object({
    organisationId: z.string(),
    reconciliationId: z.string(),
    bankAccountId: z.string(),
    bankName: z.string(),
    maskedAccountNumber: z.string(),
    currency: z.string().length(3),
    statementStartDate: z.string(),
    statementEndDate: z.string(),
    openingStatementBalance: money,
    closingStatementBalance: money,
    systemOpeningBalance: money,
    systemClosingBalance: money,
    status: z.string()
  }),
  lines: z.array(z.object({
    organisationId: z.string(),
    reconciliationId: z.string(),
    evidenceId: z.string(),
    lineId: z.string(),
    source: z.enum(["Bank", "System", "Adjustment"]),
    transactionDate: z.string(),
    description: z.string().max(160),
    reference: z.string().max(60).optional(),
    debit: money,
    credit: money,
    matchStatus: z.enum(["Matched", "Unmatched"]),
    matchType: z.string().optional(),
    matchGroupId: z.string().optional()
  })),
  adjustments: z.array(z.object({
    organisationId: z.string(),
    reconciliationId: z.string(),
    evidenceId: z.string(),
    adjustmentId: z.string(),
    adjustmentType: z.enum(["Income", "Expense"]),
    amount: money.nonnegative(),
    status: z.string(),
    transactionDate: z.string(),
    description: z.string().max(160)
  })),
  evidence: z.array(EvidenceSchema)
});

export const FindingSchema = z.object({
  findingId: z.string().min(1),
  priority: z.enum(["high", "medium", "low"]),
  category: z.enum(["variance", "unmatched", "ageing", "workflow", "adjustment", "control", "information"]),
  title: z.string().min(1).max(100),
  explanation: z.string().min(1).max(500),
  implication: z.string().min(1).max(300),
  evidenceIds: z.array(z.string()).min(1),
  confidence: z.enum(["high", "medium", "low"])
});

export const RecommendationSchema = z.object({
  action: z.string().min(1).max(240),
  ownerRole: z.string().min(1).max(80),
  urgency: z.enum(["now", "before_review", "before_approval", "monitor"]),
  evidenceIds: z.array(z.string()).min(1)
});

export const BriefSchema = z.object({
  schemaVersion: z.literal("1.0"),
  requestId: z.string(),
  reconciliationId: z.string(),
  verdict: z.enum(["ready", "attention_required", "not_ready", "insufficient_data"]),
  headline: z.string().min(1).max(180),
  executiveSummary: z.string().min(1).max(900),
  findings: z.array(FindingSchema).min(1).max(5),
  recommendations: z.array(RecommendationSchema).min(1).max(5),
  caveats: z.array(z.string().max(240)).max(5),
  evidenceIds: z.array(z.string()).min(1),
  generatedBy: z.enum(["openai", "deterministic_fallback"]),
  model: z.string(),
  validation: z.object({
    schemaValid: z.boolean(),
    evidenceValid: z.boolean(),
    numericClaimsValidated: z.boolean()
  })
});

export const briefJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "requestId", "reconciliationId", "verdict", "headline", "executiveSummary", "findings", "recommendations", "caveats", "evidenceIds"],
  properties: {
    schemaVersion: { type: "string", enum: ["1.0"] },
    requestId: { type: "string" },
    reconciliationId: { type: "string" },
    verdict: { type: "string", enum: ["ready", "attention_required", "not_ready", "insufficient_data"] },
    headline: { type: "string", maxLength: 180 },
    executiveSummary: { type: "string", maxLength: 900 },
    findings: {
      type: "array", minItems: 1, maxItems: 5,
      items: {
        type: "object", additionalProperties: false,
        required: ["findingId", "priority", "category", "title", "explanation", "implication", "evidenceIds", "confidence"],
        properties: {
          findingId: { type: "string" }, priority: { type: "string", enum: ["high", "medium", "low"] },
          category: { type: "string", enum: ["variance", "unmatched", "ageing", "workflow", "adjustment", "control", "information"] },
          title: { type: "string", maxLength: 100 }, explanation: { type: "string", maxLength: 500 },
          implication: { type: "string", maxLength: 300 }, evidenceIds: { type: "array", minItems: 1, items: { type: "string" } },
          confidence: { type: "string", enum: ["high", "medium", "low"] }
        }
      }
    },
    recommendations: {
      type: "array", minItems: 1, maxItems: 5,
      items: {
        type: "object", additionalProperties: false,
        required: ["action", "ownerRole", "urgency", "evidenceIds"],
        properties: {
          action: { type: "string", maxLength: 240 }, ownerRole: { type: "string", maxLength: 80 },
          urgency: { type: "string", enum: ["now", "before_review", "before_approval", "monitor"] },
          evidenceIds: { type: "array", minItems: 1, items: { type: "string" } }
        }
      }
    },
    caveats: { type: "array", maxItems: 5, items: { type: "string", maxLength: 240 } },
    evidenceIds: { type: "array", minItems: 1, items: { type: "string" } }
  }
};


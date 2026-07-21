# Judge Talking Points and FAQ

## Five talking points

1. **AI is not the ledger.** Deterministic services establish the facts; OpenAI interprets and communicates them.
2. **Grounding is enforced.** Every finding and recommendation must cite a supplied evidence ID.
3. **Production controls remain authoritative.** Organisation scope, permissions, maker-checker, workflow and audit controls are never bypassed.
4. **The demo is resilient.** A deterministic fallback produces the same validated contract during API failure.
5. **The architecture scales beyond Excel.** Clients only need to implement the versioned snapshot adapter.

## Likely questions

### Why is this more than a chatbot?

It has a trusted, organisation-scoped data contract; deterministic finance calculations; strict Structured Output; evidence and numeric validation; and no write-capable tools. The conversational output is the last step of a controlled analytical pipeline.

### What exactly does OpenAI do?

OpenAI prioritises the computed exceptions, explains implications, creates role-aware recommendations and drafts the executive narrative. Arithmetic, identity scope and workflow authority remain outside the model.

### Do the guided follow-ups make more API calls?

No. The three demonstration follow-ups reuse the already validated brief, facts and evidence registry. This avoids duplicate cost and ensures the displayed answer remains within the validated context.

### How do you prevent hallucinations?

The model receives a minimal validated snapshot, every claim must cite allowed evidence IDs, unknown IDs are rejected, currency claims are checked against computed facts, and uncertain drivers must be described as hypotheses.

### Can it modify the workbook?

No. The hackathon version has no write tool or workbook mutation path. It produces an external read-only brief.

### How is organisation separation enforced?

The organisation ID comes from the trusted session. The adapter filters every table and the server independently verifies every record against the same organisation and reconciliation context. A cross-organisation test fails closed.

### What if the API is down?

The platform state is preserved and a schema-valid deterministic brief is returned from the same snapshot and fact engine.

### What data reaches OpenAI?

Only minimal computed facts and sanitized evidence metadata. Full account numbers, raw imported text, personal workflow fields, passwords/hashes, filenames and unnecessary notes are excluded.

### How will this scale?

The `ReconciliationSnapshot` and `CopilotBrief` contracts are platform-neutral. Excel, Sheets, web and mobile adapters can reuse the same intelligence and validation layers.

### What would you build next?

Production adapter hardening and evaluation first. Human-reviewed match recommendations would follow only after confidence calibration, audit design and explicit approval. No autonomous posting is proposed.

### What is the commercial value?

It reduces the time from operational reconciliation to management understanding, makes review more consistent, improves exception prioritisation, and provides an extensible intelligence layer for treasury operations.

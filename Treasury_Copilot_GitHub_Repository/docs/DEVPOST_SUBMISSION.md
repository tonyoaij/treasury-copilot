# Devpost Submission Draft

## Project name

Treasury Copilot — Evidence-grounded intelligence for treasury reconciliation

## One-line summary

Treasury Copilot turns a controlled bank reconciliation into an evidence-backed executive brief—without changing a single accounting record.

## Inspiration

Finance teams often have the data and controls they need but still spend significant time interpreting reconciliation status, finding the most important exceptions, and translating operational detail for decision-makers. We wanted AI to make a production treasury workflow easier to understand without weakening its controls.

## What it does

Treasury Copilot sits above an existing Excel/VBA Treasury Management Platform. For one selected, organisation-scoped bank reconciliation it:

- calculates balances, differences, unmatched activity and workflow blockers deterministically;
- uses OpenAI Structured Outputs to create a concise Reconciliation Intelligence Brief;
- grounds every finding and recommendation in approved evidence IDs;
- explains why a reconciliation is or is not ready to progress;
- generates a management-ready narrative; and
- falls back to a deterministic brief if the API is unavailable.

Treasury Copilot is read-only. It cannot match transactions, create or post entries, approve work, or modify the workbook.

### Demonstration data

The demonstration uses sanitized synthetic data created solely for hackathon testing. `ORG-DEMO-001`, the KES bank account ending `4821`, and `REC-DEMO-2026-06` do not represent actual records in the frozen production workbook. The scenario mirrors the Treasury Management Platform's structure and controls while protecting operational and personal data.

Treasury Copilot operates against a sanitized, platform-neutral snapshot. The public submission does not bundle `Treasury DB 1.0_Production_Baseline.xlsb`, the workbook was not modified or converted, and we do not claim that the demonstration reconciliation was extracted live from it. The fixture contains no real names, telephone numbers, email addresses, complete bank account numbers, or confidential transactions.

## How we built it

We separated the solution into a platform-neutral client adapter, Treasury Intelligence Layer, model provider abstraction, validation layer, and responsive presentation client. The adapter filters by the trusted organisation and reconciliation, applies a strict field allowlist, masks the account number, and removes personal and raw imported data.

The intelligence layer validates the snapshot, computes treasury facts, sends only minimal context to OpenAI, and requires strict JSON Schema output. A post-generation validator checks request context, evidence references, and currency claims before anything reaches the user.

## How we use OpenAI

OpenAI is used for the work that benefits from language intelligence: prioritising exceptions, explaining implications, producing role-appropriate recommendations, answering bounded questions, and drafting the executive narrative. It is not used for arithmetic or authority decisions. Model selection is configuration-driven, allowing the provider layer to evolve without redesigning the product.

Codex was the implementation and QA collaborator used to build the new Treasury Copilot extension during the hackathon. The live demonstration was verified with the exact configured model identifier `gpt-5.6-terra`. The pre-existing Treasury Management Platform remains the system of record and was not presented as hackathon work.

## Challenges

The central challenge was balancing useful AI interpretation with production treasury controls. We addressed this by making the trusted data contract explicit, performing calculations outside the model, requiring evidence IDs, treating all transaction text as untrusted, and exposing no write tools. We also designed a deterministic fallback so the product remains useful and demonstrable during API or account interruptions.

## Accomplishments

- A complete sanitized-snapshot-to-validated-brief vertical slice.
- Strict organisation and reconciliation isolation.
- Deterministic financial calculations.
- Structured Output and evidence validation.
- Injection-resistant data handling.
- No workbook mutation path.
- Responsive, judge-ready UI with evidence drill-down.
- Automated safety and domain tests.
- Platform-neutral path to Excel, Google Sheets, web and mobile.
- Three consecutive live Responses API runs verified with schema, evidence and numeric validation passing.

## What we learned

The strongest AI architecture for finance does not ask the model to become the ledger. It combines deterministic systems for truth and control with models for interpretation and communication.

## What’s next

After the hackathon we will harden the Excel read-only adapter, add evaluation datasets and observability, then explore human-reviewed match recommendations and multi-platform adapters. Any future write capability will use the Treasury Management Platform’s existing validation, permission, maker-checker and audit workflows.

## Suggested tags

OpenAI, FinTech, Treasury, Financial Operations, Structured Outputs, Responsible AI, Excel, Reconciliation

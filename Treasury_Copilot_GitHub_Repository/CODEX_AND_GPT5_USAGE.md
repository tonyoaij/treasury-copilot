# How Codex and GPT-5.6 Were Used

## Pre-existing product

The **Treasury Management Platform** is the pre-existing Excel/VBA system of record. It owns treasury data, permissions, organisation context, maker-checker workflows and accounting controls. The frozen production workbook was not created during the hackathon and is not included in this repository.

## New hackathon work

**Treasury Copilot** is the new hackathon extension. The work produced during the submission period includes:

- the platform-neutral sanitized snapshot contract;
- organisation and reconciliation scope validation;
- deterministic reconciliation calculations;
- the OpenAI provider abstraction and Structured Output schema;
- evidence-ID and numeric-claim validation;
- the deterministic fallback;
- safe telemetry;
- the responsive read-only interface and guided follow-up presentation;
- automated tests; and
- architecture, demonstration and submission materials.

## Codex contribution

Codex was used as the implementation and QA collaborator to:

- inspect the exported VBA/data-mapping materials without modifying the frozen workbook;
- design the platform-neutral boundary and repository structure;
- implement the server, React interface, schemas, validation and fallback;
- write and run automated tests;
- perform desktop/mobile visual QA and evidence-flow testing;
- scan public artifacts for secrets, private paths and excluded files;
- prepare the README, owner guide, Devpost copy, demo script, architecture and release evidence; and
- package and validate the final candidate.

The final submission checklist requires the owner to provide the relevant Codex `/feedback` Session ID in the submission form.

## GPT-5.6 contribution

The configured live model is `gpt-5.6-terra`. Treasury Copilot uses it through the OpenAI Responses API to:

- prioritize already-computed reconciliation exceptions;
- explain business and control implications;
- draft role-aware next steps; and
- produce an executive Reconciliation Intelligence Brief as strict JSON Schema Structured Output.

GPT-5.6 does **not** calculate balances, select the organisation, change the reconciliation, match transactions, post entries, approve work or write to the workbook. Deterministic code establishes the facts first. Every model finding must cite allowed evidence IDs, and the response must pass schema, evidence and numeric validation before display.

If the API is unavailable or validation fails, Treasury Copilot returns a validated deterministic fallback while leaving the Treasury Management Platform unchanged.

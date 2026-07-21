# Test and Release Report

**Build:** Treasury Copilot Hackathon Edition Final Candidate  
**Date:** 21 July 2026  
**Release intent:** Final submission candidate

## Automated results

Eight tests pass:

1. Sanitized fixture is organisation-scoped and read-only.
2. Closing difference, unmatched activity and adjustment values reconcile.
3. Cross-organisation rows are rejected.
4. Unknown evidence IDs are rejected.
5. Unsupported currency claims are rejected.
6. Verified closing balances and evidence amounts pass numeric validation.
7. Fallback brief passes schema and evidence validation.
8. Public configuration never exposes the API key.

The production frontend build passes.

RC2 owner acceptance passed the clean installation, live OpenAI, evidence, read-only, fallback, desktop and mobile tests.

## Runtime results

- Health endpoint, read-only flag and secure key detection: pass.
- Live OpenAI request: pass on four total verification runs, including the final RC2 run; the previous HTTP 429 is resolved.
- Final RC2 live run: 10,734 ms, 1,049 input tokens, 1,059 output tokens and 2,108 total tokens.
- Structured Output schema validation: pass on every live run.
- Evidence-ID validation: pass; the final run resolved `EV-HDR-001`, `EV-BANK-002`, `EV-BANK-003`, `EV-SYS-003` and `EV-ADJ-001`.
- Numeric-claim validation: pass; final live and fallback results reconcile to the deterministic Ksh 30,500 closing difference.
- Live verdict stability: `not_ready` on every live run.
- Observed live latency: 9,632-13,422 ms across service and interface checks; allow approximately 10-15 seconds in the demo.
- Observed live token usage: 1,049 input tokens and 896-1,191 output tokens.
- Approximate cost formula: `(input tokens / 1,000,000 x current input price) + (output tokens / 1,000,000 x current output price)`, using the current official model rates. No fixed per-run price is claimed.
- Graceful deterministic fallback: pass; final direct verification completed in 37 ms and the interface displayed a validated fallback brief in 2 ms.
- Guided follow-up: three bounded questions render answers from the already validated brief without another API call.
- Secret/sensitive log scan: pass; telemetry contains only request ID, model, time, validation state, fallback state, error class and token counts.

## Visual fidelity ledger

| Check | Evidence | Result |
|---|---|---|
| Clear first-viewport hierarchy | Home screenshot | Pass |
| Product distinction and read-only trust | Header/context bar | Pass |
| Dense reconciliation converted to concise brief | Brief screenshot | Pass |
| Evidence access visible and usable | Evidence screenshot | Pass |
| Guided follow-up remains grounded | Follow-up screenshot | Pass |
| Responsive mobile composition | 390 x 844 mobile screenshot | Pass |
| Typography and controls avoid browser defaults | Computed render inspection | Pass |
| No clipping or horizontal overflow | Desktop/mobile full-page captures | Pass |
| Synthetic-data disclosure visible | Desktop and mobile opening views | Pass |
| Architecture diagram spacing | Full-size, 50% and embedded-width renders | Pass |

## Release decision

**The technical final candidate is frozen with live OpenAI and deterministic fallback retained. Formal submission completion depends only on the owner actions listed in the final submission checklist.**

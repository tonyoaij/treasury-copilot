# Treasury Copilot Final Demo Script and Storyboard

**Target:** 2:40-2:50  
**Absolute maximum:** 2:59  
**Delivery:** Calm, approximately 120-125 spoken words per minute. Use the API wait for narration rather than silence.
**Measured narration:** 325 words; approximately 2:36 at 125 words per minute or 2:43 at 120 words per minute, leaving the target edit at 2:40-2:50 with natural pauses and actions.

## Timed script

### 0:00-0:18 — Problem and product (18 seconds)

**On screen:** Open on the Treasury Copilot home screen. Point briefly to the product title and reconciliation context.

**Narration:** “Treasury teams already have controlled reconciliation data, but reviewers still spend time turning balances, exceptions and workflow status into a decision. Treasury Copilot converts that detail into a concise, evidence-backed brief.”

### 0:18-0:35 — What was built (17 seconds)

**On screen:** Point to “Intelligence for the Treasury Management Platform” and the Read-only label.

**Narration:** “The Treasury Management Platform is the existing Excel and VBA system of record. During the hackathon, I built Treasury Copilot as a separate, read-only intelligence layer using Codex and GPT-5.6. It adds interpretation, not transaction processing.”

### 0:35-0:50 — Synthetic context and analysis (15 seconds)

**On screen:** Point to the synthetic-demo disclosure, `ORG-DEMO-001`, masked account and `REC-DEMO-2026-06`. Click **Analyse reconciliation** once.

**Narration:** “This is sanitized synthetic KES data created only for hackathon testing, not a real account or live production-workbook extract. The scenario preserves the platform’s structure and controls without exposing operational data.”

### 0:50-1:05 — Live API wait (15 seconds)

**On screen:** Keep the loading state visible until the brief appears.

**Narration:** “While GPT-5.6 prepares the narrative, deterministic services calculate every treasury fact. OpenAI must return strict Structured Output, cite supplied evidence IDs, and pass schema, evidence and numeric validation before anything is displayed.”

### 1:05-1:35 — Verdict and priorities (30 seconds)

**On screen:** Show **Not ready**, Ksh 30,500, two unmatched bank lines and one pending adjustment. Scroll just enough to show the first two findings.

**Narration:** “The verdict is Not ready. The closing difference is KES 30,500, driven by two unmatched bank lines, while one prepared adjustment and an unmatched system item still require review. Treasury Copilot prioritises the variance and workflow blockers, then gives role-aware next steps. The model explains validated facts; it does not calculate balances or approve the reconciliation.”

### 1:35-1:55 — Evidence drill-down (20 seconds)

**On screen:** Open `EV-BANK-002`. Pause on the drawer, then close it.

**Narration:** “Every material finding links to allowed evidence. This record shows the masked, sanitized amount and status. Full account details, personal fields and raw imported text are excluded, and an unknown evidence ID would be rejected.”

### 1:55-2:15 — Validated follow-up (20 seconds)

**On screen:** Scroll to **Ask the validated brief** and select **Why is this not ready for approval?**

**Narration:** “The guided follow-up answers from the already validated facts and evidence, so it is immediate and makes no duplicate API call. The response explains the four blockers and remains traceable to the same evidence IDs.”

### 2:15-2:35 — Safeguards and architecture (20 seconds)

**On screen:** Show **Validation passed** and **OpenAI structured brief**, then cut to the corrected architecture diagram.

**Narration:** “Organisation scope is fixed before analysis, calculations are deterministic, output is evidence-validated, and no write-capable tool exists. If the API fails, the deterministic fallback preserves the demonstration and leaves the Treasury Management Platform untouched.”

### 2:35-2:50 — Impact and close (15 seconds)

**On screen:** Hold on the full architecture, then finish on the Treasury Copilot card.

**Narration:** “The durable boundary is a platform-neutral snapshot, so future Excel, Sheets, web, mobile and cloud clients can reuse the same intelligence layer. Treasury Copilot makes treasury decisions faster to understand without making AI the ledger.”

## If rehearsal exceeds 2:50

Remove these lines first, in order:

1. “The model explains validated facts; it does not calculate balances or approve the reconciliation.”
2. “This record shows the masked, sanitized amount and status.”
3. “The response explains the four blockers and remains traceable to the same evidence IDs.”
4. Shorten the final platform list to “future clients”.

Do not remove the synthetic-data disclosure, live-analysis identification, Not ready verdict, evidence demonstration, safeguards, Codex/GPT-5.6 statement, or closing value proposition.

## Backup edit plan for a slow API

- Continue the 15-second validation narration during the live wait.
- If the result has not appeared by 1:05, cut directly to the previously captured live-brief screenshot and continue the script.
- Remove the first optional sentence listed above to recover approximately five seconds.
- If the API returns fallback, do not call it live OpenAI output. Use the validated backup screenshot for the primary edit, or explicitly label the fallback as the resilience path.
- Never accelerate the narration beyond a natural speaking pace.

## Final recording checklist

- [ ] Final edited duration is 2:40-2:50 and below 3:00.
- [ ] The synthetic-data disclosure is visible and spoken.
- [ ] The live result visibly says **OPENAI STRUCTURED BRIEF**.
- [ ] **Not ready**, KES 30,500 and the priority findings are readable.
- [ ] One evidence drawer and one guided follow-up answer are shown.
- [ ] Read-only, deterministic calculations and validation safeguards are stated.
- [ ] Codex and GPT-5.6 are named accurately.
- [ ] The corrected architecture is readable at embedded video size.
- [ ] No API key, `.env.local`, terminal history, notifications or private browser details are visible.
- [ ] No copyrighted music or unauthorized assets are used.
- [ ] Audio is clear, cursor movement is deliberate and the ending is not cut off.

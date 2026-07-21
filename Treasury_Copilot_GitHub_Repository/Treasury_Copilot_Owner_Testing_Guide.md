# Treasury Copilot Owner Testing Guide

**Release:** Treasury Copilot Hackathon Edition RC2  
**Audience:** Product owner or business tester using Windows 10/11  
**Purpose:** Verify the release candidate before the final submission freeze

This guide uses only the sanitized demonstration reconciliation. It does not open or modify `Treasury DB 1.0_Production_Baseline.xlsb`.

## Synthetic demonstration disclosure

The demonstration uses sanitized synthetic data created solely for hackathon testing. The demonstration organisation `ORG-DEMO-001`, KES bank account ending `4821`, and reconciliation `REC-DEMO-2026-06` are not actual records in the frozen production workbook. The scenario mirrors the structure and controls of the Treasury Management Platform while protecting operational and personal data.

Treasury Copilot reads a sanitized, platform-neutral snapshot. The demonstration is not a live extraction from `Treasury DB 1.0_Production_Baseline.xlsb`; the production workbook is not bundled publicly unless explicitly approved and was not modified or converted. The fixture contains no real names, telephone numbers, email addresses, complete bank account numbers, or confidential transactions.

## Important safety rules

- Never send, photograph or paste your OpenAI API key into chat, email, screenshots, videos, workbook cells or source files.
- Never place the key inside the `Treasury_Copilot_Hackathon_Edition` application folder.
- Do not test against the frozen production workbook.
- Keep the black Treasury Copilot application window open while testing. Close it when testing is finished.

## Test record

Tester: ____________________  Date/time: ____________________  Windows version: ____________________

Browser and version: ____________________  Node.js version: ____________________

For each test, mark one box: `[ ] PASS` or `[ ] FAIL`.

If a test fails, capture:

1. a screenshot of what you see;
2. the exact step number;
3. the time of failure;
4. the browser name; and
5. a photograph or screenshot of the application window **after checking that it contains no API key**.

## A. Preserve and extract the release

### Test A1 — Preserve the downloaded ZIP

**Action**

1. Locate `Treasury_Copilot_Hackathon_Edition_RC2.zip` in Downloads.
2. Copy it to a safe folder such as `Documents\Treasury Copilot Releases`.
3. Keep that copied ZIP unchanged as the release record.

**Expected result:** The ZIP remains present and unopened in the safe folder.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the folder view and Windows error message.

### Test A2 — Extract into a fresh folder

**Action**

1. Right-click the copied ZIP.
2. Select **Extract All…**.
3. Enter a new destination such as `Documents\Treasury Copilot RC2 Owner Test`.
4. Select **Extract**.
5. Do not run the application from inside the ZIP preview.

**Expected result:** A normal folder named `Treasury_Copilot_Hackathon_Edition` appears and contains `README.md`, this guide, `01_INSTALL_WINDOWS.cmd`, `02_START_TREASURY_COPILOT.cmd`, and application folders.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the extraction error and the destination path.

## B. Read the release information

### Test B1 — Open this guide first

**Action:** Open `Treasury_Copilot_Owner_Testing_Guide.md` with Notepad, Visual Studio Code, or another Markdown viewer.

**Expected result:** The headings and numbered instructions are readable.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the program used and the unreadable content.

### Test B2 — Read the README

**Action:** Open `README.md` in the same folder and read **Start here**, **Secure OpenAI configuration**, **Testing**, and **Scope guardrails**.

**Expected result:** It clearly distinguishes the Treasury Management Platform from Treasury Copilot and says the application is read-only.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Note the unclear section and capture it.

## C. Confirm prerequisites

### Test C1 — Check the browser

**Action:** Open Microsoft Edge or Google Chrome, open its menu, and choose **Help and feedback → About** (Edge) or **Help → About Google Chrome**.

**Expected result:** The browser reports that it is current or begins updating successfully.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the browser version screen.

### Test C2 — Check Node.js

**Action**

1. Press the Windows key.
2. Type `Command Prompt` and open it.
3. Type the following command and press Enter:

```text
node --version
```

**Expected result:** A version beginning with `v20`, `v22`, `v24`, or a later supported LTS version appears.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Install the current **LTS** version from `https://nodejs.org/`, accept the normal defaults, restart Windows if requested, and repeat the test. Capture the command window if it still fails.

## D. Configure the API key securely

The API key file belongs **beside**, not inside, the application folder.

Example:

```text
Treasury Copilot RC2 Owner Test\
├── .env.local
└── Treasury_Copilot_Hackathon_Edition\
```

### Test D1 — Create the local key file

**Action**

1. Open the folder that contains `Treasury_Copilot_Hackathon_Edition`.
2. Click the folder address bar, type `powershell`, and press Enter.
3. In the blue or black PowerShell window, type:

```powershell
notepad .env.local
```

4. If Notepad asks to create the file, choose **Yes**.
5. Enter one line, replacing `<your key>` with the key obtained securely from OpenAI Platform:

```text
OPENAI_API_KEY=<your key>
```

6. Save and close Notepad.
7. Close PowerShell.

**Expected result:** `.env.local` exists beside the application folder. Its contents are not displayed anywhere else.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture only the folder and error message. **Do not capture the file contents or API key.**

## E. Install and start Treasury Copilot

### Test E1 — Install dependencies

**Action**

1. Open `Treasury_Copilot_Hackathon_Edition`.
2. Double-click `01_INSTALL_WINDOWS.cmd`.
3. If Windows asks for confirmation, verify the filename and choose to run it.
4. Wait until the window says **Installation completed successfully**.
5. Press any key to close it.

**Expected result:** Installation completes without a red error or failure message.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the complete installation window, excluding any unrelated personal information.

### Test E2 — Start the application

**Action**

1. Double-click `02_START_TREASURY_COPILOT.cmd`.
2. Keep the resulting application window open.
3. Wait until it says Treasury Copilot is listening at `http://127.0.0.1:8787`.

**Expected result:** The application stays running and shows no error.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the application window after confirming it does not display a secret.

### Test E3 — Open the application

**Action:** Open Edge or Chrome and enter:

```text
http://127.0.0.1:8787
```

**Expected result:** The opening screen shows:

- **Treasury Copilot**;
- **Intelligence for the Treasury Management Platform**;
- a **READ-ONLY** label;
- organisation `ORG-DEMO-001`;
- reconciliation `REC-DEMO-2026-06`;
- masked account ending `4821`; and
- **Analyse reconciliation**.

There should be no clipped text, overlap, error overlay, blank screen, or horizontal scrollbar.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the entire browser window and browser address.

## F. Run the live OpenAI analysis

### Test F1 — Live analysis

**Action**

1. Confirm **OpenAI analysis** is selected.
2. Choose **Analyse reconciliation** once.
3. Wait approximately 8–15 seconds. Do not click twice.

**Expected result:** A brief appears with:

- a closing difference of `KES 30,500`;
- two unmatched bank lines;
- one pending adjustment;
- approval readiness **Not ready**;
- evidence-linked findings;
- **Validation passed**; and
- the badge **OPENAI STRUCTURED BRIEF**.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the result, badge, visible error, and application window. Record the response time.

### Test F2 — Evidence drill-down

**Action:** Under a finding, choose an evidence button such as `EV-BANK-002`.

**Expected result:** A drawer opens showing a sanitized evidence record with an evidence ID, source, status, date, and amount. No full account number, user name, raw imported text, API key or password appears.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the open drawer and note which evidence button was selected.

### Test F3 — Close the evidence drawer

**Action:** Choose the `×` button at the top-right of the drawer.

**Expected result:** The drawer closes and the brief remains visible.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the browser state.

## G. Test guided follow-up questions

Scroll to **Ask the validated brief**.

### Test G1 — Approval-readiness question

**Action:** Choose **Why is this not ready for approval?**

**Expected result:** A grounded answer explains the validated blockers and shows evidence buttons. The interface states **No additional API call**.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the whole follow-up panel.

### Test G2 — Priority question

**Action:** Choose **Which exception needs attention first?**

**Expected result:** The answer reflects the first priority finding and shows its evidence IDs.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the selected question and answer.

### Test G3 — Management question

**Action:** Choose **What should management know?**

**Expected result:** The validated executive summary appears without another loading wait.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the selected question and answer.

## H. Confirm read-only behavior

### Test H1 — Visual and functional check

**Action:** Review the home, brief, evidence and guided follow-up views.

**Expected result:** There is no control to match, unmatch, edit, post, approve, cancel, save or write to the workbook. The header continues to show **READ-ONLY**.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture any control that appears to permit a write operation. Stop testing and report immediately.

## I. Test fallback and restore live mode

### Test I1 — Deterministic fallback

**Action**

1. Choose **New analysis**.
2. Select **Deterministic fallback**.
3. Choose **Analyse reconciliation**.

**Expected result:** The same key figures and **Not ready** conclusion appear quickly. The badge says **FALLBACK BRIEF**, and validation passes.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the screen and application window.

### Test I2 — Restore live mode

**Action**

1. Choose **New analysis**.
2. Select **OpenAI analysis**.

**Expected result:** **OpenAI analysis** is visibly selected. Do not run another paid request unless needed.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the mode buttons.

## J. Desktop and mobile layout

### Test J1 — Desktop layout

**Action:** Maximize the browser at normal Windows display scaling.

**Expected result:** Text is readable, cards do not overlap, evidence buttons remain visible, and there is no horizontal scrollbar.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the full window and note display scaling.

### Test J2 — Mobile layout using browser tools

**Action**

1. Press `F12`.
2. Press `Ctrl+Shift+M` or choose the phone/tablet icon.
3. Select a mobile width close to 390 pixels.
4. Reload the page.

**Expected result:** The header, opening content, controls and assessment panel stack vertically with no clipped text or horizontal scrolling.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the simulated device view and selected dimensions.

5. Press `F12` again to exit browser tools.

## K. Close the application

### Test K1 — Stop safely

**Action**

1. Close the browser tab.
2. Return to the Treasury Copilot application window.
3. Press `Ctrl+C` once.
4. If asked to terminate the batch job, type `Y` and press Enter.
5. Close the window.

**Expected result:** Treasury Copilot stops. Opening `http://127.0.0.1:8787` no longer loads the app.

`[ ] PASS`  `[ ] FAIL`

**If it fails:** Capture the application window and remaining browser response.

## Fifteen-minute critical-path test

Use this when time is limited:

1. `[ ]` Extract the untouched RC2 ZIP into a fresh folder.
2. `[ ]` Confirm `.env.local` is beside—not inside—the application folder.
3. `[ ]` Run `01_INSTALL_WINDOWS.cmd` if dependencies are not installed.
4. `[ ]` Run `02_START_TREASURY_COPILOT.cmd`.
5. `[ ]` Open `http://127.0.0.1:8787` and confirm **READ-ONLY** plus sanitized context.
6. `[ ]` Run **OpenAI analysis** and confirm **OPENAI STRUCTURED BRIEF** within approximately 8–15 seconds.
7. `[ ]` Confirm `KES 30,500`, two unmatched bank lines, one pending adjustment and **Not ready**.
8. `[ ]` Open one evidence record and confirm it is sanitized.
9. `[ ]` Test **Why is this not ready for approval?**.
10. `[ ]` Run **Deterministic fallback** and confirm **FALLBACK BRIEF**.
11. `[ ]` Restore **OpenAI analysis**.
12. `[ ]` Stop the application with `Ctrl+C`.

## Defect report template

```text
Release: Treasury Copilot Hackathon Edition RC2
Tester:
Date/time:
Test step:
PASS or FAIL:
What I did:
What I expected:
What happened:
Browser/version:
Windows version and display scaling:
Live or fallback mode:
Screenshot filenames:
Application-window capture filename:
Does any capture contain a secret? No
```

Send the completed checklist and defect reports to the release owner. Do not send `.env.local`, the API key, `node_modules`, or the frozen workbook.

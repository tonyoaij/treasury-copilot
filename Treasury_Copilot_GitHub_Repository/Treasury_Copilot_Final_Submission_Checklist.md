# Treasury Copilot Final Submission Checklist

**Candidate:** Final submission candidate  
**Date:** 21 July 2026  
**Allowed statuses:** PASS, FAIL, ACTION REQUIRED, NOT APPLICABLE

## A. Eligibility and rules

| Item | Status | Evidence / action |
|---|---|---|
| Entrant eligibility confirmed | ACTION REQUIRED | Owner must confirm against the official rules |
| Correct track selected | ACTION REQUIRED | Confirm in Devpost before submission |
| Project uses Codex and GPT-5.6 | PASS | README, Devpost and demo script describe both |
| Pre-existing Treasury Management Platform clearly distinguished from new Treasury Copilot work | PASS | README, Devpost and demo script |
| Evidence of work during the submission period preserved | PASS | Source, release packages, reports and task history retained |
| `/feedback` Codex Session ID available | ACTION REQUIRED | Owner must run `/feedback` and record the Session ID |
| All third-party data, APIs and assets authorized | ACTION REQUIRED | Owner must confirm OpenAI/API and asset rights |
| Synthetic demo-data disclosure included | PASS | Interface, README, owner guide, Devpost and demo script |

## B. Application and testing

| Item | Status | Evidence / action |
|---|---|---|
| Clean installation works | PASS | RC2 owner acceptance completed successfully |
| App runs consistently as depicted | PASS | Owner acceptance and final visual QA |
| Live OpenAI analysis passes | PASS | Live Responses API evidence retained |
| Structured Output validation passes | PASS | Runtime and automated validation |
| Numeric reconciliation passes | PASS | KES 30,500 deterministic reconciliation |
| Evidence validation passes | PASS | Live IDs and negative tests pass |
| Organisation scoping passes | PASS | Cross-organisation rejection test |
| Read-only behavior passes | PASS | Owner acceptance; no write route or control |
| Deterministic fallback passes | PASS | Owner acceptance and automated test |
| Return to live mode passes | PASS | Owner acceptance |
| Desktop layout passes | PASS | Final browser QA |
| Mobile layout passes | PASS | Final 390-pixel browser QA |
| Production build passes | PASS | Final build check |
| Automated tests pass | PASS | Eight tests pass |

## C. Security and privacy

| Item | Status | Evidence / action |
|---|---|---|
| No API key in package | PASS | Final secret scan |
| No `.env.local` in package | PASS | Package inventory scan |
| Secret scan passes | PASS | Final staging and extracted-ZIP scans |
| Sensitive-log scan passes | PASS | Only allowlisted telemetry fields |
| No production workbook modification | PASS | Frozen `.xlsb` untouched and excluded |
| No real confidential records in demonstration data | PASS | Synthetic fixture field and content review |
| Account numbers remain masked | PASS | Interface, fixture and screenshots use ending `4821` only |
| No local Windows username or private path appears publicly | PASS | Final public-artifact scan |
| Screenshots and video contain no secrets or notifications | ACTION REQUIRED | Screenshots pass; owner must verify final video before upload |

## D. Visual assets

| Item | Status | Evidence / action |
|---|---|---|
| Corrected architecture SVG visually inspected | PASS | Full size, normal view, 50% and embedded-width checks |
| Corrected architecture PNG visually inspected | PASS | Full size, normal view, 50% and embedded-width checks |
| No overflow, hidden text or overlapping objects | PASS | Direct visual inspection and DOM bounds checks |
| Screenshots match final UI | PASS | Regenerated after disclosure change |
| Desktop screenshots readable | PASS | Direct inspection |
| Mobile screenshots readable | PASS | Direct inspection |
| Diagram remains readable when embedded | PASS | README/Devpost-width inspection |
| Filenames and image references are portable | PASS | Relative package paths and stable filenames |

## E. README and repository

| Item | Status | Evidence / action |
|---|---|---|
| README setup instructions tested from a fresh folder | PASS | Owner acceptance used packaged guide and clean install |
| README explains Codex collaboration | PASS | Hackathon/work disclosure |
| README explains GPT-5.6 usage | PASS | OpenAI integration section |
| README distinguishes pre-existing and new work | PASS | Opening and architecture sections |
| README identifies synthetic demonstration data | PASS | Dedicated disclosure section |
| Repository link works | ACTION REQUIRED | Owner must insert and test final public URL |
| Repository access meets submission requirement | ACTION REQUIRED | Test signed-out access |
| Repository contains required source and assets | PASS | Final package inventory |
| Repository includes testing instructions | PASS | README and owner testing guide |
| No broken relative links | PASS | Final link check |
| No required local Windows user paths | PASS | Public-artifact path scan |

## F. Video

| Item | Status | Evidence / action |
|---|---|---|
| Final duration below three minutes | ACTION REQUIRED | Verify exported video duration |
| Target duration 2:40-2:50 | ACTION REQUIRED | Record and edit to revised script |
| Audio is clear | ACTION REQUIRED | Owner playback check |
| Live application is visibly demonstrated | ACTION REQUIRED | Confirm final edit |
| What was built is explained | PASS | Revised script |
| Codex and GPT-5.6 use is explained | PASS | Revised script |
| Synthetic data is disclosed briefly | PASS | Revised script |
| No copyrighted music or unauthorized material | ACTION REQUIRED | Owner must confirm final edit |
| No third-party trademarks unless permitted | ACTION REQUIRED | Owner must review final frames |
| Uploaded YouTube video is publicly visible | ACTION REQUIRED | Upload and verify |
| Video link opens in a logged-out/incognito browser | ACTION REQUIRED | Test after upload |
| Thumbnail and title are professional | ACTION REQUIRED | Final YouTube review |

## G. Devpost entry

| Item | Status | Evidence / action |
|---|---|---|
| Project title finalized | ACTION REQUIRED | Owner confirms final title |
| Tagline finalized | ACTION REQUIRED | Owner confirms one-line summary |
| Correct category selected | ACTION REQUIRED | Confirm in Devpost |
| Project description complete | PASS | Devpost draft supplied |
| Problem, solution, implementation and impact included | PASS | Devpost draft |
| Treasury Management Platform and Treasury Copilot distinguished | PASS | Devpost draft |
| Implemented features separated from roadmap features | PASS | Accomplishments and What's next sections |
| Exact model identifier used accurately | PASS | `gpt-5.6-terra` configuration and live evidence |
| Unsupported pricing claims removed | PASS | Token profile and formula only |
| Screenshots uploaded | ACTION REQUIRED | Owner upload |
| Architecture uploaded | ACTION REQUIRED | Owner upload corrected asset |
| Video link added | ACTION REQUIRED | Owner action after YouTube upload |
| Repository link added | ACTION REQUIRED | Owner action |
| Testing access/instructions added | ACTION REQUIRED | Copy from README/owner guide into submission |
| `/feedback` Session ID provided | ACTION REQUIRED | Owner action |
| All mandatory fields completed | ACTION REQUIRED | Final Devpost preview review |

## H. Judge access

| Item | Status | Evidence / action |
|---|---|---|
| Test build or functioning demo is accessible | ACTION REQUIRED | Publish/download link and test it |
| Judges can test without the production workbook | PASS | Sanitized fixture is bundled |
| Judges do not need the owner's API key | PASS | Deterministic fallback works; live mode accepts securely supplied project configuration |
| Any test credentials are valid and documented | NOT APPLICABLE | No application credentials are bundled |
| Project remains available throughout judging | ACTION REQUIRED | Owner must maintain hosting/download links |
| Repository permissions verified | ACTION REQUIRED | Signed-out test |
| Links tested in a signed-out browser | ACTION REQUIRED | Test all final URLs |

## I. Final package

| Item | Status | Evidence / action |
|---|---|---|
| Final ZIP extracts successfully | PASS | Fresh extraction validated |
| Every file opens | PASS | JSON, SVG, PNG, Markdown and HTML validation |
| No temporary or cache files | PASS | Package scan |
| No `node_modules` unless intentionally required | PASS | Excluded |
| No obsolete screenshots or diagrams | PASS | Only final assets included |
| Checksum generated | PASS | SHA-256 file supplied |
| Checksum recorded in release evidence | PASS | Final release report |
| Previous RC2 package preserved | PASS | Owner-accepted RC2 copy and checksum retained |
| Final release version clearly named | PASS | Final-candidate filename |
| Frozen `.xlsb` hash or preservation evidence retained privately | ACTION REQUIRED | Owner must retain private workbook/hash evidence |

## J. Submission completion

| Item | Status | Evidence / action |
|---|---|---|
| Final owner acceptance received | PASS | RC2 owner acceptance confirmed 21 July 2026 |
| Devpost preview reviewed | ACTION REQUIRED | Owner final review |
| Submission saved | ACTION REQUIRED | Owner action |
| Submission formally submitted | ACTION REQUIRED | Owner action |
| Confirmation page captured | ACTION REQUIRED | Owner action |
| Confirmation email preserved | ACTION REQUIRED | Owner action |
| Submitted links retested | ACTION REQUIRED | Signed-out verification |
| Local archive and cloud backup preserved | ACTION REQUIRED | Owner action |
| No further code changes after final submission unless rules permit editing | ACTION REQUIRED | Enforce after submission |

## Freeze decision

The technical candidate may be frozen only after the corrected architecture, disclosure, compressed script, tests, scans and final ZIP validation pass. Formal submission completion remains dependent on the owner actions marked **ACTION REQUIRED** above.

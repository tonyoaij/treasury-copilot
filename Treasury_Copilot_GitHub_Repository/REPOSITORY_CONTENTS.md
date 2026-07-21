# Public Repository Contents

## Required submission records included

| Requirement | Repository evidence |
|---|---|
| Actual source files | `src/`, `server/`, `shared/`, `config/`, `test/`, `package.json`, `vite.config.js` |
| Root README | `README.md` |
| Codex use explained | `README.md` and `CODEX_AND_GPT5_USAGE.md` |
| GPT-5.6 use explained | `README.md`, `CODEX_AND_GPT5_USAGE.md`, `server/openai-service.js` |
| Pre-existing and new work distinguished | README hackathon section, Devpost draft and `CODEX_AND_GPT5_USAGE.md` |
| Sanitized sample data | `fixtures/sanitized-reconciliation.json` |
| Setup instructions | README, `.env.example`, Windows install/start helpers |
| Testing instructions | README, `test/`, owner testing guide and test report |
| Security exclusions | `.gitignore`, secret-safe configuration and package scans |

## Recommended supporting records included

- architecture and data mapping;
- final demo script and storyboard;
- Devpost submission draft;
- judge FAQ and talking points;
- post-hackathon roadmap;
- owner testing guide;
- test and release report;
- final submission checklist; and
- sanitized screenshots, architecture files and video thumbnails.

## Deliberately excluded

- `OPENAI_API_KEY` and all other secrets;
- `.env.local` and other local configuration;
- `Treasury DB 1.0_Production_Baseline.xlsb` and every production workbook;
- the final-candidate ZIP and earlier release archives;
- `node_modules`;
- generated `dist` output;
- logs, caches and coverage output; and
- complete financial datasets or confidential operational records.

The public demonstration fixture is synthetic. It contains no real person names, phone numbers, email addresses, complete bank account numbers or confidential transactions, and it is not represented as a live extraction from the production workbook.

## Before publishing

1. Create the GitHub repository and copy the **contents** of this folder to its root.
2. Confirm `README.md` appears on the repository landing page.
3. Run `npm install`, `npm test` and `npm run build` from a clean clone.
4. Inspect the staged Git file list before the first push.
5. Run a final secret scan and confirm no workbook or `.env.local` is tracked.
6. Test the public repository URL while signed out.
7. Add the repository URL and Codex `/feedback` Session ID to the hackathon submission.

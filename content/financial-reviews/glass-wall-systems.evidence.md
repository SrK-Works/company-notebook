# Glass Wall Systems — re-verification of the existing snapshot (dist/financial-data.js)

Checked 14 November 2026. Re-check only: the snapshot, lesson and build files were not changed.

## Discrepancies and unsupported items
No amount, label, period or scope in the snapshot disagrees with the filing: revenue from operations ₹4,300.19 million (snapshot 430.019 crore) and profit for the year ₹758.95 million (snapshot 75.895 crore) match exactly after dividing by 10. Points to note:
1. Text not extractable. The PDF is a scan (53 pages, no text layer; pypdf and TinyFish returned no text). The audited statement of profit and loss was read by viewing the page image (PDF page 14) and the audit opinion by viewing PDF page 1. Only PDF pages 1 and 14 were viewed. The rest of the file (balance sheet, notes) was not read.
2. Page locator. "PDF page 14 · standalone statement of profit and loss" ✔. The page carries no printed page number.
3. Revenue label. The snapshot row is "Whole parent company" at revenue from operations (4,300.19 million). Total income, which adds other income of 140.53 million, is 4,440.72 million; the snapshot does not use it ✔.
4. Source type. The file is hosted under the company's "ipo-docs" folder. It is the audited standalone financial statements for the year ended 31 March 2026 (auditor's report dated 13 August 2026), not an exchange filing found in a results announcement. An exchange copy was not located. The snapshot says "Official financial disclosure": the folder name suggests the financials were supplied for the company's public offering (not stated in the page read).
5. Profit definition. The line read is "Profit for the year" after tax. Tax expense includes an adjustment for earlier periods of 4.85 million and a deferred tax credit of (23.58) million; no exceptional-items line exists on the statement.

## Source
Glass Wall Systems (India) Limited (formerly Glass Wall Systems (India) Private Limited), audited standalone financial statements for the year ended 31 March 2026, https://www.glasswallsystems.in/ipo-docs/70768f2eb63447c19e077624facbc935.pdf. Fetched and read from the company link. Standalone (the parent company only; the auditor's opinion covers "the standalone financial statements"); unit ₹ in Million; year ended 31 March 2026 (2025 in brackets); audited by S R B C & CO LLP (Mumbai), signed 13 August 2026.

## Standalone statement of profit and loss (PDF page 14), ₹ million
Revenue from operations (note 24) 4,300.19 (2,447.61); Other income (note 25) 140.53 (69.38); Total income 4,440.72 (2,516.99); Cost of raw materials and components consumed 2,132.42 (1,181.21); Employee benefits expense 328.69 (259.69); Finance costs 33.88 (30.21); Depreciation and amortisation 47.08 (30.74); Other expenses 883.59 (425.85); Total expenses 3,425.66 (1,927.70); Profit before tax 1,015.06 (589.29); Current tax 274.84 (46.59); adjustment of tax relating to earlier periods 4.85 ((0.47)); deferred tax (23.58) (105.08); Total tax expense 256.11 (151.20); Profit for the year 758.95 (438.09); Other comprehensive loss, net of tax (2.92) ((0.97)); Total comprehensive income 756.03 (437.12); basic and diluted EPS ₹9.34 (₹5.20).

Sum checks: 4,300.19 + 140.53 = 4,440.72 ✔. 4,440.72 − 3,425.66 = 1,015.06 ✔. 2,132.42 + 328.69 + 33.88 + 47.08 + 883.59 = 3,425.66 ✔. 274.84 + 4.85 − 23.58 = 256.11 ✔. 1,015.06 − 256.11 = 758.95 ✔. Conversions: 4,300.19 ÷ 10 = 430.019; 758.95 ÷ 10 = 75.895.

## Skipped lines
All expense, tax, comprehensive income and EPS detail above; balance sheet, cash flow, notes (including note 24 revenue breakdown and any customer-concentration disclosure) were not read.

## Management Discussion figures
None used.

## Lesson financialNotes check (content/company-lessons/glass-wall-systems.json)
- "standalone parent-company revenue and profit … does not establish separate revenue or profit for curtain walls, cladding, engineering or installation" ✔ (no segment or product profit was read; not checked whether the notes disclose one).
- "Contract assets, receivables and retention can explain why earnings and cash move differently" — advice, no figures. No mismatch.

## Not verified
Notes to the accounts (segment note, revenue note 24, customer concentration, any one-off items inside expenses) were image-only and were not read. An exchange (NSE/BSE) copy of the same financials was not located.

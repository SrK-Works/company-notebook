# Avenue Supermarts (DMart) — re-verification of the existing snapshot (migrated to content/financial-reviews)

Checked 14 November 2026. Snapshot moved from dist/financial-data.js to this folder.
Corrected 14 November 2026: Store-growth figure labelled as a quarterly management figure from the press release, not audited. Lesson financialNotes no longer link DMart Ready to a group company (not verified in the pages read); subsidiary Avenue E-commerce Limited named as listed in the accounts. Amounts unchanged. (Other lesson sections still name Avenue E-Commerce Limited as running DMart Ready; unverified outside financialNotes.)

## Discrepancies and unsupported items
No amount, label, period or scope in the snapshot disagrees with the filing: consolidated revenue from operations 68,820.74, group profit after tax 2,969.86, equity holders 2,970.49, non-controlling interests (0.63), parent revenue 66,968.03 and parent PAT 3,223.93 all match. Points to note:
1. Text quality. The results pages are scanned with OCR slips (for example "4,081 .62", "66,968 .03", scrambled column order on the consolidated page). Every number below was therefore confirmed by arithmetic (sums in the checks below), not by the OCR alone; no digit was guessed. No second copy of the results (exchange hosted) was fetched; the file itself is the company's filing to the exchanges (hosted at api.dmartindia.com).
2. Column order. On PDF page 14 the numbers are listed column by column in the order quarter ended 31 March 2026, quarter ended 31 December 2025, quarter ended 31 March 2025, year ended 31 March 2026, year ended 31 March 2025. The snapshot uses the year ended 31 March 2026 column ✔ (68,820.74, not the quarter's 17,683.86).
3. Store growth wording. Snapshot field "existingStoreGrowth 10.8" is labelled in the snapshot as March 2026 quarter store growth. The press release says "Two years and older DMart stores grew by 10.8% during Q4 FY26" (the DMart stores business only, a quarter, management wording), so it is not a full-year or group figure.
4. Store count. "500" is as of 31 March 2026 "(including one store at Navi Mumbai, Maharashtra currently closed for customers due to reconstruction)" with a retail business area of 20.6 million sq. ft.
5. One-off items. The filing shows tax in respect of earlier years of 0.37 (crore) in the consolidated year; no exceptional items. Note 10: the new Labour Codes liability "was not material to the consolidated financial results".

## Source
Avenue Supermarts Limited (DMart), outcome of the board meeting held on 2 May 2026 containing the audited consolidated and standalone financial results for the quarter and year ended 31st March 2026, https://api.dmartindia.com/corporate/content/file/v1/2/jZtJ4gV9JIDY9CjsdXXbQxhE1777722483/Outcome%20of%20the%20Board%20Meeting%20held%20on%20May%202%2C%202026.pdf; and the press release dated 2 May 2026, https://api.dmartindia.com/corporate/content/file/v1/2/R2aWBiIpiuD39xgfm4wrqQKc1777723315/Press%20release%20dated%202nd%20May%2C%202026.pdf. Both fetched and read from the company links. Consolidated (the holding company and its subsidiaries Avenue E-commerce Limited, Align Retail Trades, Avenue Food Plaza, Reflect Healthcare and Retail, Nahar Seth & Jogani Developers); unit ₹ crore ("₹ in Crores"); year ended 31st March 2026 (2025 in brackets); audited (note 5, board meeting 2 May 2026).

## Audited consolidated results, year ended 31st March 2026 (PDF page 14), ₹ crore
Revenue from operations 68,820.74 (59,358.05); Other income 74.10 (124.31); Total income 68,894.84 (59,482.36); Purchases of stock-in-trade 59,315.99 (51,668.76); Change in inventories (656.26) ((1,117.06)); Employee benefits expense 1,541.48 (1,165.90); Finance costs 142.05 (69.45); Depreciation and amortisation 1,037.02 (869.52); Other expenses 3,632.94 (3,153.12); Total expenses 64,813.22 (55,809.69); Profit before tax 4,081.62 (3,672.67); Current tax 1,101.23 (983.47); Deferred tax charge 10.16 (17.76); Tax in respect of earlier period/year 0.37 ((36.01)); Net profit after tax 2,969.86 (2,707.45); Other comprehensive income (5.48); Total comprehensive income 2,964.38; Profit attributable to equity holders of the Company 2,970.49 (2,708.02) and non-controlling interests (0.63) ((0.57)); EPS basic ₹45.65, diluted ₹45.63.
Note 7 (PDF page 17): "There are no separate reportable segment as per IND AS 108 – Operating Segments." The first half of the sentence (the channels through which retail trades are done) is garbled in the text ("retail trades through of nine and online ct,annels") and is not quoted.

Sum checks: 68,820.74 + 74.10 = 68,894.84 ✔. 59,315.99 − 656.26 + 1,541.48 + 142.05 + 1,037.02 + 3,632.94 = 64,813.22 ✔. 68,894.84 − 64,813.22 = 4,081.62 ✔. 4,081.62 − 1,101.23 − 10.16 − 0.37 = 2,969.86 ✔. 2,970.49 − 0.63 = 2,969.86 ✔.

## Audited standalone results, year ended 31st March 2026 (PDF page 6), ₹ crore
Revenue from operations 66,968.03 (57,789.81); Other income 128.02; Total income 67,096.05; Total expenses 62,777.55; Profit before tax 4,318.50 (3,883.17); Net profit after tax 3,223.93 (2,927.18). 67,096.05 − 62,777.55 = 4,318.50 ✔; 4,318.50 − 1,085.23 − 9.34 = 3,223.93 ✔. Standalone is the parent company alone and overlaps the group; not added to the consolidated figures.

## Press release (PDF page 4), 2 May 2026 — management statements
"Our revenue in Q4 FY26 grew by 19.0% … Two years and older DMart stores grew by 10.8% during Q4 FY26 as compared to 8.1% in Q4 FY25 … We opened 58 new stores during the quarter and also reached the landmark achievement of 500 DMart stores." "As of March 31, 2026, the Company had 500 stores … with Retail Business Area of 20.6 million sq. ft."

## Skipped lines
Quarter columns, the financial ratios (debt-equity, interest cover and so on), balance sheet and cash flow, commercial paper details (note 8).

## Management Discussion figures
Used and flagged: the 10.8% same-store growth, 500 store count and 58 new stores come from the press release's management commentary, not the audited statements. Revenue and profit figures come from the audited results.

## Lesson financialNotes check (content/company-lessons/avenue-supermarts.json)
- "how much of each ₹100 of group revenue from operations remained as profit after tax" — the figure itself is not in the notes; 2,969.86 ÷ 68,820.74 = ₹4.32 per ₹100 (group PAT incl. non-controlling interest) for comparison; the notes say the slice is "small" ✔.
- "Standalone figures cover the parent company … Consolidated figures cover the group, including DMart Ready's company. Do not add them together" ✔ (DMart Ready is run by the subsidiary Avenue E-commerce Limited, listed in note 6; the filing text does not itself use the name "DMart Ready" in the pages read, so that link is an outside fact, not verified here).
- No amounts to mismatch.

## Not verified
The "DMart Ready" name for Avenue E-commerce Limited (not in the pages read). Exchange-hosted copies of the results (not located). Printed page numbers (none on the scanned pages).

# Kanohar Electricals — re-verification of the existing snapshot (migrated to content/financial-reviews)

Checked 14 November 2026. Snapshot moved from dist/financial-data.js to this folder.
Corrected 14 November 2026: Snapshot notes add the earlier-year tax credit of 3.2372 crore inside profit. Amounts unchanged. Lesson financialNotes mention the one-off tax credit without an amount.

## Discrepancies and unsupported items
No amount, label, period or scope in the snapshot disagrees with the filing: revenue from operations ₹65,383.84 lakh (snapshot 653.8384 crore) and profit for the year ₹12,963.68 lakh (snapshot 129.6368 crore) match exactly after dividing by 100. Points to note:
1. Text not extractable. The PDF is a scan (57 pages, no text layer). PDF page 16 (statement of profit and loss) and PDF page 1 (audit opinion) were read from page images. The rest was not read.
2. Page locator. "PDF page 16 · statement of profit and loss" ✔. The audit report is paginated "Page 1 of 14"; the statements carry no printed page number.
3. Scope wording. The snapshot basis "Company financial statements" is correct: the statements are those of Kanohar Electricals Limited alone, but "which includes Joint Operation namely Kanohar-BCPL JV accounted on proportionate basis" (auditor's opinion, PDF page 1). The snapshot notes mention the joint operation ✔. There is no consolidated statement in the file; the name "Standalone" does not appear in the pages read.
4. Not stated in the snapshot notes: tax expense includes a credit of ₹323.72 lakh (₹3.2372 crore) for "Income tax relating to earlier years", a one-off item inside the profit figure.
5. Source type. The file is the company's own copy of the audited statements (auditor's report dated 01.07.2026); an exchange copy was not located.

## Source
Kanohar Electricals Limited, audited financial statements for the year ended March 31, 2026, https://www.kanohar.com/Asset/newkanweb/Audited_Fiancial_Statements_25-26.pdf. Fetched and read from the company link. Company statements including the Kanohar-BCPL JV joint operation on a proportionate basis; unit "Indian ₹ lakh except share data"; year ended March 31, 2026 (2025 in brackets); audited by S S Kothari Mehta & Company (Naveen Aggarwal, partner), dated 01.07.2026.

## Statement of profit and loss (PDF page 16), ₹ lakh
Revenue from operations (note 22) 65,383.84 (45,061.23); Other income (note 23) 902.32 (668.27); Total income 66,286.16 (45,729.50); Cost of materials consumed 37,137.43 (22,000.20); Purchases of stock-in-trade 7,510.08 (3,667.99); Changes in inventories of finished goods, work-in-progress and stock-in-trade (4,685.46) (4,744.42); Employee benefits expense 4,061.00 (2,388.97); Finance costs 1,290.60 (939.54); Depreciation and amortisation 297.18 (289.46); Other expenses 3,318.96 (2,919.84); Total expenses 48,929.79 (36,950.42); Profit before tax 17,356.37 (8,779.08); Current tax 4,727.00 (2,572.00); Income tax relating to earlier years (323.72) ((2.05)); Deferred tax (net) (10.59) ((310.89)); Total tax expense 4,392.69 (2,259.06); Profit for the year 12,963.68 (6,520.02); Total comprehensive income 12,961.36 (6,509.36); basic and diluted EPS ₹17.41 (₹8.76), face value ₹2.

Sum checks: 65,383.84 + 902.32 = 66,286.16 ✔. 66,286.16 − 48,929.79 = 17,356.37 ✔. 4,727.00 − 323.72 − 10.59 = 4,392.69 ✔. 17,356.37 − 4,392.69 = 12,963.68 ✔. 37,137.43 + 7,510.08 − 4,685.46 + 4,061.00 + 1,290.60 + 297.18 + 3,318.96 = 48,929.79 ✔. Conversions: 65,383.84 ÷ 100 = 653.8384; 12,963.68 ÷ 100 = 129.6368.

## Skipped lines
Balance sheet, cash flow, notes (revenue note 22, any segment or customer-concentration note, the joint operation policy) were not read.

## Management Discussion figures
None used.

## Lesson financialNotes check (content/company-lessons/kanohar-electricals.json)
- "company-level revenue and profit on the audited statement's basis, including its described joint-operation scope. It does not establish separate transformer, reactor or EPC earnings" ✔ (joint operation proportionate basis confirmed; no product split was read).
- "Read the joint-operation policy, equipment and project revenue recognition and cash-flow statement" — advice, no figures. No mismatch. Gap: the one-off ₹3.2372 crore earlier-year tax credit is not mentioned.

## Not verified
Notes to the accounts (segment, revenue, customer concentration, any other one-off items). An exchange copy was not located.

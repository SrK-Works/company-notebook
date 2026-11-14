# Larsen & Toubro — re-verification of the existing snapshot (migrated to content/financial-reviews)

Checked 14 November 2026. Snapshot moved from dist/financial-data.js to this folder.
Corrected 14 November 2026: Snapshot notes add the Labour Codes exceptional loss of 1,722.44 crore, define exceptional items and mention the sale profits grouped under Others; location now says PDF page 5. Amounts unchanged. Lesson financialNotes define exceptional items.

## Discrepancies and unsupported items
No amount, label, period or scope in the snapshot disagrees with the filing: seven segment revenues, seven segment results, both totals, internal sales and net revenue all match. Points to note:
1. Page locator. The snapshot says "Audited consolidated segment-wise revenue and results" with no page. The table is on PDF page 5 of the filing (no printed page numbers).
2. Row name. The filing prints the Financial Services row label garbled in the results block (the label reads "5" in the text) but the revenue block names it "Financial Services"; the snapshot name is correct.
3. Snapshot definition says the segment result is before "inter-segment margin adjustments, remaining finance costs, unallocated income, exceptional items and tax" ✔ (filing: segment result "represents profit before interest and tax"; the deductions are listed below the total).
4. Snapshot "Others" revenue 7,978.01 includes profits on sale of business undertakings or stakes in subsidiaries or joint ventures in the Development Projects and realty businesses ("grouped under Others"); the filing says so, the snapshot does not.
5. One-off item not in the snapshot notes: consolidated exceptional loss of ₹1,722.44 crore before tax (Labour Codes), see below.

## Source
Larsen & Toubro Limited, audited consolidated financial results and segment-wise revenue, results, total assets and total liabilities for the quarter and year ended 31 March 2026, https://investors.larsentoubro.com/upload/Quarterly/FY2026QuarterlyLTResultMarch2026.pdf. Fetched and read from the company link. Consolidated (L&T and subsidiaries; joint ventures and associates by equity method); unit ₹ crore ("Crore"); year ended March 31, 2026; audited.

## Audited consolidated segment-wise revenue and results (PDF page 5), ₹ crore, year ended March 31, 2026 (2025 in brackets)
Gross segment revenue: Infrastructure Projects 135344.58 (131314.52); Energy Projects 54888.59 (40676.89); Hi-Tech Manufacturing 14488.79 (10180.86); IT & Technology Services 53946.53 (48453.32); Financial Services 17283.43 (15193.95); Development Projects 5118.51 (5389.07); Others 7978.01 (7816.40); Total 289048.44 (259025.01); Less: Inter-segment revenue 3174.08 (3290.56); Net segment revenue 285874.36 (255734.45).
Segment results: Infrastructure Projects 7759.98 (6921.45); Energy Projects 3374.38 (3178.23); Hi-Tech Manufacturing 2105.13 (1459.05); IT & Technology Services 8633.94 (7682.15); Financial Services 4032.05 (3491.31); Development Projects 538.95 (716.00); Others 2085.70 (1934.81); Total 28530.13 (25383.00); Less: Inter-segment margins on capital jobs 114.25 (116.53); Less: Finance costs 2848.82 (3334.37); Add: Unallocable corporate income net of expenditure 2131.19 (1171.91); = 27698.25 (23104.01); Exceptional items [gain/(loss)] (1722.44) (474.78); Profit before tax 25975.81 (23578.79).
Notes in the filing: "Segment result represents profit before interest and tax. Unallocable corporate income includes majorly interest income, dividends and investment related gains." "In respect of (a) Financial Services segment and (b) Development Projects segment relating to a power generation asset given on finance lease, segment liabilities include borrowings as finance costs on the borrowings are accounted as segment expense." The Financial Services segment composition: "primarily comprises retail finance"; Infrastructure Projects: engineering and construction of buildings and factories, transport, heavy civil, power transmission and distribution, renewables, water, minerals and metals.

Sum checks: 135344.58 + 54888.59 + 14488.79 + 53946.53 + 17283.43 + 5118.51 + 7978.01 = 289048.44 ✔. 289048.44 − 3174.08 = 285874.36 ✔. 7759.98 + 3374.38 + 2105.13 + 8633.94 + 4032.05 + 538.95 + 2085.70 = 28530.13 ✔. 28530.13 − 114.25 − 2848.82 + 2131.19 = 27698.25 ✔. 27698.25 − 1722.44 = 25975.81 ✔ and equals profit before tax on page 1.

## Consolidated results (PDF page 1)
Revenue from operations 285874.36; other income (net) 5760.68; total income 291635.04; profit before exceptional items and tax 27698.25; exceptional items (1722.44); profit before tax 25975.81; tax 6816.41; net profit after tax 19159.40; share in loss of joint ventures/associates (205.52); profit 18953.88 (owners 16083.99; non-controlling 2869.89).
Exceptional note (PDF page 1): "Effective November 21, 2025, the Government of India consolidated 29 existing labour regulations into four Labour codes … The New Labour Codes has resulted in a one-time material increase in provision for employee benefits on account of recognition of past service costs. Based on the requirements of New Labour Codes and the ICAI clarification, the Group has assessed and accounted the estimated incremental impact of ₹1722.44 crore (before tax) as Exceptional items in the Consolidated Financial Results for the year ended March 31, 2026." A regulatory change, not a voluntary provision. Profit after tax before exceptional items attributable to owners 17238.50.

## Skipped lines
Segment assets and liabilities, standalone segment table (PDF page 10) and the quarterly columns were not used.

## Management Discussion figures
None used.

## Lesson financialNotes check (content/company-lessons/larsen-and-toubro.json)
- "Infrastructure Projects has the largest revenue, while IT & Technology Services has the largest reported segment result" ✔ (135,344.58 vs 53,946.53; 8,633.94 vs 7,759.98 for Infrastructure).
- "Reported segment revenue includes internal sales, which are removed when reconciling to net group revenue" ✔ (3,174.08). "Other finance costs, unallocated items, exceptional items and tax also separate the segment-result total from company profit" ✔ but "exceptional items" is not explained and the ₹1,722.44 crore one-off charge is not stated.

## Not verified
Nothing material. The quarterly columns and standalone page were not checked.

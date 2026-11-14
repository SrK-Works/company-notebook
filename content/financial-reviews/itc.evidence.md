# ITC — re-verification of the existing snapshot (dist/financial-data.js)

Checked 14 November 2026. Re-check only: the snapshot, lesson and build files were not changed.

## Discrepancies and unsupported items
No amount, label, period or scope in the snapshot disagrees with the filing: five segment revenue rows, five segment results, the segment totals, the internal-sales deduction and the gross revenue all match once the filing's two-decimal figures are rounded to whole crore. Points to note:
1. Source and page locator. The snapshot cites the Q4 FY2026 results presentation on itcportal.com, "Presentation page 34". That file (and every itcportal.com PDF) returned "not acceptable" to a plain download and "target unreachable" through TinyFish, and the NSE archive copy of the 21 May 2026 results also could not be fetched. The presentation page was therefore not read. The same segment table was read from the audited standalone financial statements in the ITC Report and Accounts 2026, as filed with BSE on 26 June 2026: https://www.bseindia.com/xml-data/corpfiling/AttachHis/590b42ae-15c9-44cf-be69-e58053128a6b.pdf (note 30, PDF page 219, printed page 191). "Presentation page 34" is unverified; a presentation is also not an audited statement.
2. Name. Filing: "FMCG - Others" and "Others"; snapshot "FMCG – Other products" and "Other businesses". Same rows. The filing describes "Others" as ITC Grand Central Hotel, Mumbai and Fresh Food etc.
3. Rounding. The five rounded revenue rows add to 90,714; the filing total is 90,713.20 (rounds to 90,713). The snapshot already says this differs by ₹1 crore.
4. One-off item not in the snapshot notes. Profit before tax includes an exceptional charge of ₹183.87 crore (net) for FY 2025-26 (prior year a gain of ₹527.96 crore). It sits below the segment results, so the segment table is unaffected, but it changes company profit (see below).

## Source
ITC Limited, Report and Accounts 2026, standalone financial statements, note 30 "Segment Reporting". Standalone (ITC Limited alone, not subsidiaries); unit ₹ crore; year ended 31 March 2026 (2025 in brackets); audited. Filed with BSE on 26 June 2026.

## Note 30 (PDF page 219, printed page 191), ₹ crore
Segment revenue (External / Inter segment / Total):
- FMCG - Cigarettes 37099.65 / – / 37099.65 (32631.27)
- FMCG - Others 24203.75 / 6.00 / 24209.75 (21981.57)
- FMCG - Total 61303.40 / 6.00 / 61309.40 (54612.84)
- Agri Business 12296.48 / 7999.92 / 20296.40 (19753.80)
- Paperboards, Paper and Packaging 6926.57 / 1839.04 / 8765.61 (8422.81)
- Others 341.04 / 0.75 / 341.79 (169.43)
- Segment Total 80867.49 / 9845.71 / 90713.20 (82958.88)
- Eliminations (9845.71) (9492.27)
- Gross Revenue from sale of products and services 80867.49 (73466.61)
Segment results: FMCG - Cigarettes 21051.12 (20024.87); FMCG - Others 1802.63 (1579.66); FMCG - Total 22853.75 (21604.53); Agri Business 1496.46 (1478.03); Paperboards, Paper and Packaging 796.71 (911.49); Others (8.06) (65.82); Segment Total 25138.86 (24059.87); Eliminations (37.56) (1.75); Total 25101.30 (24061.62); Unallocated corporate expenses net of unallocated income (1228.83) ((1310.30)); Profit before interest etc. and taxation 23872.47 (22751.32); Finance Costs (69.94); Interest earned on loans and deposits, income from investments etc. – Net 3148.94; Exceptional items [Refer Note 29(i)] (183.87) (2025: 527.96); Profit before tax 26767.60 (26530.26); Tax expense (6481.18); Profit for the year from continuing operations 20286.42 (20093.29); from discontinued operations nil (2025: 15103.76); Profit for the year 20286.42 (35197.05).
Notes under the table: (1) CODM is the Corporate Management Committee; (4) "Segment results of 'FMCG : Others' are after considering significant business development, brand building and gestation costs of the Branded Packaged Foods businesses and Personal Care Products business"; (5) stock option and appreciation right charges do not form part of segment performance; (6) "The Company is not reliant on revenues from transactions with any single external customer and does not receive 10% or more of its revenues from transactions with any single external customer."

Snapshot rows compared (snapshot value = filing value rounded): Cigarettes 37,100 / 21,051; Other products 24,210 / 1,803; Agri 20,296 / 1,496; Paperboards 8,766 / 797; Other businesses 342 / -8. revenueTotal 90,713, profitTotal 25,139; internal sales 9,846 and gross revenue 80,867 all match.

Sum checks: 37099.65 + 24209.75 + 20296.40 + 8765.61 + 341.79 = 90713.20 ✔. 21051.12 + 1802.63 + 1496.46 + 796.71 − 8.06 = 25138.86 ✔. 90713.20 − 9845.71 = 80867.49 ✔. 25138.86 − 37.56 − 1228.83 = 23872.47 ✔.

## Note 29(i) exceptional items (standalone, PDF page 204)
"Exceptional Items of Continuing Operations for the year ended 31st March, 2026 of ₹183.87 Crores represents: a) estimated one-time impact on recognition of past service cost of ₹271.95 Crores with respect to increase in liability of gratuity and compensated absences, primarily arising due to change in definition of wages pursuant to notifications … dated 21st November, 2025 bringing into force the provisions of the [four] New Labour Codes". "b) receipt of ₹88.08 Crores on final settlement of the insurance claim towards leaf tobacco stocks, which were destroyed due to fire at a third party owned warehouse in an earlier year." 271.95 − 88.08 = 183.87 ✔. Prior year (2025): fair value gain ₹527.96 crore on acquiring EIH and HLV shares from a wholly owned subsidiary.
Cigarette tax: note (xvii), PDF page 218 — GST and Central Excise changes from 1 February 2026 make excise duty and revenue "not strictly comparable with those of the previous year" ✔ (snapshot says tax changes affect comparability).

## Skipped lines
Segment assets, liabilities, capital expenditure, depreciation, non-cash expenditure and geography tables on PDF pages 219–220 were not used. The snapshot does not use consolidated figures.

## Management Discussion figures
None used in the snapshot. The Q4 presentation (snapshot source) was not read.

## Lesson financialNotes check (content/company-lessons/itc.json)
- Note 1: "ITC Limited on a standalone basis … does not show ITC Infotech's sales as a separate business, and its Other businesses row is not a shortcut for that subsidiary" ✔ (Others = hotel and fresh food; ITC Infotech is a subsidiary outside standalone accounts).
- Note 2: "each segment's reported result before interest and tax" ✔ (note 4 of the filing; segment result is before finance costs and tax).
- No amounts appear in the notes, so nothing to mismatch. Gaps: the notes do not mention the ₹183.87 crore net exceptional charge (below the segment line), and "exceptional items", "segment result" are not defined in plain words there.

## Not verified
- "Presentation page 34" of the itcportal.com presentation; the NSE copy of the results (file not reachable).
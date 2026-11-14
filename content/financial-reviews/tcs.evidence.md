# TCS — re-verification of the existing snapshot (migrated to content/financial-reviews)

Re-check of 14 Nov 2026; corrections listed below.
Corrected 14 November 2026: Snapshot corrected 14 Nov 2026 and moved from dist/financial-data.js to this folder: profit column is now Segment result in rupees crore from the audited note (27,011; 12,090; 11,473; 7,504; 8,051; 6,269; total 72,398) instead of 'not disclosed' margins; the unreproducible 25.0% total margin and the margin column were dropped; notes add unallocated expenses 11,313 including Labour Codes 2,128, legal claim 1,010 and restructuring 1,388; source changed to the report read here (ar.tcs.com). Revenue unchanged. Lesson financialNotes rewritten.

## Discrepancies and unsupported items (snapshot value vs filing)
1. Segment profit amounts ARE disclosed, contrary to the snapshot. Snapshot rows have `profit: null` and the note says "Only reported margin percentages are shown; profit amounts are not reverse-calculated"; the lesson note says the same. The audited consolidated note (segment information) gives "Segment result" in ₹ crore: BFSI 27,011; Manufacturing 8,051; Consumer Business 12,090; Communication, Media and Technology 11,473; Life Sciences and Healthcare 7,504; Others 6,269; total 72,398. Each reported margin equals segment result ÷ segment revenue (27,011 ÷ 103,363 = 26.1%). Nothing is wrong in the numbers shown; the claim that amounts are not available is unsupported.
2. "The total margin may include additional common costs" (snapshot note) is vague. The management discussion table's Total row shows segment margin 25.0% (24.3% in FY25) on revenue 267,021; the audited note shows segment results 72,398, unallocable expenses 11,313, operating income 61,085 (22.9% of 267,021), other income 4,402, profit before tax 65,487, tax 16,033, profit for the year 49,454. The 25.0% total is TCS's own reported operating margin and is not reproducible from these note lines alone (72,398 ÷ 267,021 = 27.1%; 61,085 ÷ 267,021 = 22.9%).
3. Unallocable expenses of 11,313 include one-offs not mentioned in the snapshot: "Statutory impact of new Labour Codes ₹2,128 crore, Provision towards legal claim ₹1,010 crore (Refer note 20) and re-structuring expenses of ₹1,388 crore (Refer note 25)". These sit outside the segment results.
4. Names. The filing says "Banking, Financial Services and Insurance", "Communication, Media and Technology"; "Others" are "Energy, Resources and Utilities, s-Governance and Products". Snapshot uses "&" and plain "Others".
5. Page locator. Snapshot: "Printed page 89 · management discussion, industry-vertical table". In the extracted text the table is bracketed by running heads "Management Discussion and Analysis / 89" (before) and "Integrated Annual Report 2025-26 / 90" (after); the note table by "255" (before) and "256" (after). Whether the printed page is 89 or 90 (and 255 or 256) could not be settled from text. Unconfirmed.

All revenue figures and margins in the snapshot match the filing.

## Source
Tata Consultancy Services Limited, Integrated Annual Report 2025-26, https://www.ar.tcs.com/files/TCS_Annual_Report_2025-26.pdf (company's report site; read in full as text). The snapshot's link, https://www.tcs.com/content/dam/tcs/investor-relations/financial-statements/2025-26/ar/annual-report-2025-2026.pdf, could not be fetched from this environment (target unreachable); the exchange copy on nsearchives.nseindia.com returned no text. The report is consolidated (TCS and its subsidiaries together); unit ₹ crore; year ended 31 March 2026.

## Management discussion, segmental table (printed page 89/90), ₹ crore
"TCS has identified business segments ('Industry vertical') as reportable segments." Industry Vertical Segment Revenue (₹ crore), YoY revenue growth %, Segment margin (%), FY 2026 then FY 2025:
| Segment | Revenue FY26 | Revenue FY25 | Growth % | Margin FY26 | Margin FY25 |
|---|---:|---:|---:|---:|---:|
| Banking, Financial Services and Insurance | 103,363 | 94,597 | 9.3 | 26.1 | 26.6 |
| Consumer Business | 42,432 | 40,197 | 5.6 | 28.5 | 27.9 |
| Communication, Media and Technology | 39,474 | 45,893 | (14.0) | 29.1 | 20.9 |
| Life Sciences and Healthcare | 27,745 | 26,456 | 4.9 | 27.0 | 28.2 |
| Manufacturing | 26,614 | 25,170 | 5.7 | 30.3 | 32.7 |
| Others | 27,393 | 23,011 | 19.0 | 22.9 | 25.2 |
| Total | 267,021 | 255,324 | 4.6 | 25.0 | 24.3 |
Sum: 103,363 + 42,432 + 39,474 + 27,745 + 26,614 + 27,393 = 267,021 ✔.

## Notes to the consolidated financial statements, segment information (printed page 255/256), ₹ crore, year ended 31 March 2026
Column order in the filing: BFSI; Manufacturing; Consumer Business; Communication, Media and Technology; Life Sciences and Healthcare; Others; Total.
| Line | BFSI | Manufacturing | Consumer | CMT | LSH | Others | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| Revenue from operations | 1,03,363 | 26,614 | 42,432 | 39,474 | 27,745 | 27,393 | 2,67,021 |
| Segment result | 27,011 | 8,051 | 12,090 | 11,473 | 7,504 | 6,269 | 72,398 |
Total unallocable expenses 11,313; Operating income 61,085; Other income 4,402; Profit before tax 65,487; Tax expense 16,033; Profit for the year 49,454; Depreciation and amortisation expense (unallocable) 5,560. FY25: segment result total 67,407; unallocable 6,038; operating income 61,369.
Statement in the note: "Expenses which are not directly identifiable to each reporting segment have been allocated on the basis of associated revenue of the segment. All other expenses which are not attributable or allocable to segments or are non-recurring in nature have been disclosed as unallocable expenses." Major customers: "No single customer represents 10% or more of the Group's total revenue".
Sum checks: 27,011 + 8,051 + 12,090 + 11,473 + 7,504 + 6,269 = 72,398 ✔. 72,398 − 11,313 = 61,085 ✔. 61,085 + 4,402 = 65,487 ✔. 65,487 − 16,033 = 49,454 ✔.

## Lesson financialNotes check (content/company-lessons/tcs.json)
- No amounts quoted; nothing numerically conflicting.
- "It deliberately does not multiply rounded percentages by revenue to manufacture profit amounts" is true but could mislead: audited segment results exist (item 1).
- "Cloud, AI and BaNCS can serve several client industries" — product-versus-industry statement; not a filing figure; not checked here.
- "Consolidated profit and cash-flow reconciliation" is general advice.

## Not verified
- PDF page numbers; printed page 89 versus 90 (item 5). The management-discussion margin definition beyond the table (how the 25.0% total is built).

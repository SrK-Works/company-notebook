# Infosys — re-verification of the existing snapshot (migrated to content/financial-reviews)

Re-check of 14 Nov 2026; corrections listed below.
Corrected 14 November 2026: Snapshot corrected 14 Nov 2026 and moved from dist/financial-data.js to this folder: notes now explain the shortened segment names and the 1,289 Labour Codes charge inside unallocated expenses of 6,191. Amounts unchanged. Lesson financialNotes rewritten.

## Discrepancies and unsupported items
No amount in the snapshot disagrees with the filing: all eight revenue and operating-income rows and both totals match (tables below). Points to note:
1. Segment names are shortened. Filing note 2.26: "Financial Services" includes enterprises in Financial Services and Insurance; "Retail" includes Retail, Consumer Packaged Goods and Logistics; "Communication" includes Communication, Telecom OEM and Media; "Life Sciences" includes Life sciences and Health care; "All other segments" are businesses in India, Japan, China, Infosys Public Services and identified enterprises in Public Services.
2. Label. The management discussion calls the line "Segmental operating income"; the audited note calls the same numbers "Segment Profit". Same figures. The snapshot's "Segment operating income" follows the management discussion.
3. The segment total 42,445 is not company profit. Unallocable expenses 6,191 (including ₹1,289 crore for the new Labour Codes), other income 4,157, finance cost 416, giving profit before tax 39,995; net profit 29,474. The snapshot note says segment income is not profit after tax; it does not state the Labour Codes item.
4. Page locator. Snapshot: "PDF page 6 · printed page 111" in the separate management-discussion PDF. The text read here is the full annual report; the segment table sits under the running head "Infosys Integrated Annual Report 2025-26 / 111" (management discussion, section 6 "Segmental profitability") and the note table under running head 387. Whether the printed number is the page's head or foot could not be settled from extracted text. The PDF page of the separate file was not read (that URL could not be fetched from this environment). Treat the page number as unconfirmed.

## Source
Infosys Limited, Integrated Annual Report 2025-26, as filed with BSE on 25 June 2026 (https://www.bseindia.com/xml-data/corpfiling/attachhis/19dd605c-2b6b-4084-8dca-9d578a3eb7a0.pdf; the same report is published at https://www.infosys.com/investors/reports-filings/annual-report/annual/documents/infosys-ar-26.pdf). The snapshot's own link, https://www.infosys.com/investors/reports-filings/annual-report/annual/documents/2025-26/managements-discussion-and-analysis.pdf, could not be fetched (target unreachable), so the figures were read from the full report filed with the exchange. Consolidated (Infosys and its subsidiaries together); unit ₹ crore; year ended 31 March 2026 (audited note); no conversion.

## Management discussion, "Business segments – Consolidated" (section 6), ₹ crore
| Line | Financial Services | Manufacturing | Energy, Utilities, Resources and Services | Retail | Communication | Hi-Tech | Life Sciences | All other segments | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Segmental revenues 2026 | 49,908 | 29,078 | 23,818 | 23,077 | 21,765 | 13,928 | 12,267 | 4,809 | 1,78,650 |
| Segmental revenues 2025 | 45,175 | 25,207 | 21,710 | 22,059 | 19,108 | 13,090 | 11,831 | 4,810 | 1,62,990 |
| Segmental operating income 2026 | 12,678 | 6,444 | 5,984 | 7,089 | 3,861 | 3,228 | 2,444 | 717 | 42,445 |
| Segmental operating income 2025 | 11,099 | 4,856 | 6,097 | 7,133 | 3,341 | 3,220 | 2,663 | 827 | 39,236 |
| Segmental operating margin (%) 2026 | 25.3 | 22.1 | 25.1 | 30.7 | 17.7 | 23.1 | 20.0 | 14.8 | 23.7 |
(The extracted text has spaces inside some digits, for example "7, 0 89" and "11, 0 9 9"; read as 7,089 and 11,099 and confirmed against the note table below, which prints them cleanly.)

## Notes to the consolidated financial statements, note 2.26 "Segment reporting" (running head 387), ₹ crore, year ended 31 March 2026 then 2025
| Line | Fin. Services | Manufacturing | Energy etc. | Retail | Communication | Hi-Tech | Life Sciences | All other | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Revenue from operations 2026 | 49,908 | 29,078 | 23,818 | 23,077 | 21,765 | 13,928 | 12,267 | 4,809 | 178,650 |
| Identifiable operating expenses 2026 | 27,877 | 17,797 | 13,327 | 11,529 | 13,908 | 8,286 | 7,667 | 2,956 | 103,347 |
| Allocated expenses 2026 | 9,353 | 4,837 | 4,507 | 4,459 | 3,996 | 2,414 | 2,156 | 1,136 | 32,858 |
| Segment Profit 2026 | 12,678 | 6,444 | 5,984 | 7,089 | 3,861 | 3,228 | 2,444 | 717 | 42,445 |
Reconciliation (2026): Segment profit 42,445; unallocable expenses 6,191; other income, net 4,157; finance cost 416; profit before tax 39,995; income tax expense 10,521; net profit 29,474. Depreciation and amortisation 4,902 (unallocable). Footnote: "Unallocable expense includes impact of ₹1,289 crore towards impact of Labour Codes for the year ended March 31, 2026 (refer to note 2.20.1)". "No client individually accounted for more than 10% of the revenues for the year ended March 31, 2026 and March 31, 2025."

Sum checks: 49,908 + 29,078 + 23,818 + 23,077 + 21,765 + 13,928 + 12,267 + 4,809 = 178,650 ✔. 12,678 + 6,444 + 5,984 + 7,089 + 3,861 + 3,228 + 2,444 + 717 = 42,445 ✔. 49,908 − 27,877 − 9,353 = 12,678 ✔. 42,445 − 6,191 + 4,157 − 416 = 39,995 ✔; 39,995 − 10,521 = 29,474 ✔.

## Lesson financialNotes check (content/company-lessons/infosys.json)
- No amounts quoted; nothing conflicts. Statements "segment operating income must be reconciled to company profit" and "not a disclosed profit for Cobalt, Topaz or Finacle" agree with the filing (segments are customer industries).
- "Billing or collection timing differences … consolidated cash-flow statement and customer balances" is general advice, not a filing claim; not checked against the cash-flow statement.

## Not verified
- PDF page 6 of the separate management-discussion PDF; the printed-page locator (see item 4).

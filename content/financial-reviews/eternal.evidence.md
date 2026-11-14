# Eternal — re-verification of the existing snapshot (migrated to content/financial-reviews)

Re-check of 14 Nov 2026; corrections listed below.
Corrected 14 November 2026: Snapshot moved unchanged from dist/financial-data.js to this folder on 14 Nov 2026 (no snapshot field changed). Lesson financialNotes rewritten to state group profit (profit before tax 615; profit for the year 366) and that the segment total 2,027 is a different measure.

## Discrepancies and unsupported items
No amount in the snapshot disagrees with the filing: all five revenue rows, all five segment results and both totals match the second, clean copy of the same results (NSE integrated filing). Points to note:
1. The Google Drive PDF named in the snapshot is a scanned image; its text layer is OCR and unreliable (for example India food ordering and delivery segment result read as "1,079" instead of 2,079, and Going Out revenue read as "m"). Per rule, digits were not taken from it. All figures below come from the NSE iXBRL copy of the same note 3, where the digits are clean. The Drive PDF was only used to confirm the table sits on PDF page 34 (pypdf, 44 pages), matching the snapshot's "PDF page 34". The OCR text of the segment results rows reads "549 547 439 1,079 1,541" for India food; the XBRL copy reads "549 547 439 2,079 1,541". The sum of the five results (2,079 + 16 + 430 − 292 − 206 = 2,027) confirms 2,079 but is not independent; the XBRL copy is.
2. Segment name. Filing: "Hyperpure supplies (B2B business)"; snapshot "Hyperpure supplies". Filing "Going Out"/"Going-out"; "All other segments (Residual)".
3. Revenue in the snapshot is "Revenue from operations (external customers)" (excludes inter-segment revenue 186 in total). Snapshot note says so ✔. Total 54,364; revenue from operations after inter-segment elimination in the segment-disclosure XBRL is 54,178 (54,364 − 186).
4. Quick commerce: the filing (note 8) says that from the quarter ended 30 June 2025 the Group "started transitioning from its marketplace model to a combination of marketplace and inventory-led model in its quick commerce segment", so revenue now includes direct sales and "a reduction in sales of Hyperpure supplies (B2B business)". Snapshot note ✔. Hyperpure FY25 revenue 6,196 vs FY26 5,366 reflects this.
5. Snapshot definition: segment result "before other income, share-based payments, finance costs, depreciation, exceptional items and tax" ✔ (reconciliation below).
6. Segment total 2,027 is not group profit: profit before tax is 615; profit for the year 366 (36,600 lakh).
7. Source link. The snapshot `source` is a drive.google.com view link (read as a PDF download). `announcement` https://www.eternal.com/blog/q4fy26/ not re-read here.

## Sources
- Eternal Limited (formerly Zomato Limited), consolidated financial results for the quarter (unaudited) and year (audited) ended 31 March 2026, approved by the Board 28 April 2026; auditor Deloitte Haskins and Sells, unmodified opinion. Scanned PDF at https://drive.google.com/file/d/1mz_hG7RPsvni3KAPKubphgQmuq0WiTS-/view (downloaded, 44 pages; PDF page 34 = "Notes to the consolidated results", note 3).
- Clean copy: https://nsearchives.nseindia.com/corporate/ixbrl/INTEGRATED_FILING_INDAS_153832_28042026202149_iXBRL_WEB.html (NSE integrated filing, consolidated, year to date audited, rounding in lakhs; textual note 3 in ₹ crore).
Consolidated (Eternal and its subsidiaries together); unit ₹ crore; year ended 31 March 2026 audited.

## Note 3, "Summarised segment information" (INR crore), year ended March 31, 2026 (FY25 in brackets)
Revenue from operations (external customers):
| Segment | FY26 | FY25 |
|---|---:|---:|
| India food ordering and delivery | 10,159 | 8,080 |
| Hyperpure supplies (B2B business) | 5,366 | 6,196 |
| Quick commerce | 37,779 | 5,206 |
| Going Out | 973 | 737 |
| All other segments (Residual) | 87 | 24 |
| Total | 54,364 | 20,243 |
Revenue from operations (inter-segment), FY26: India food 46; Hyperpure 78; Quick commerce 13; Going Out nil; All other 49; total 186.
Segment results:
| Segment | FY26 | FY25 |
|---|---:|---:|
| India food ordering and delivery | 2,079 | 1,541 |
| Hyperpure supplies (B2B business) | 16 | (43) |
| Quick commerce | 430 | (21) |
| Going Out | (292) | (30) |
| All other segments (Residual) | (206) | (12) |
| Segment results | 2,027 | 1,435 |
| Add: other income | 1,396 | 1,077 |
| Less: share based payment expense | 819 | 798 |
| Less: finance costs | 392 | 154 |
| Less: depreciation and amortisation expense | 1,597 | 863 |
| Add: exceptional items | nil | nil |
| Profit before tax | 615 | 697 |
Sum checks: 10,159 + 5,366 + 37,779 + 973 + 87 = 54,364 ✔. 2,079 + 16 + 430 − 292 − 206 = 2,027 ✔. 2,027 + 1,396 − 819 − 392 − 1,597 = 615 ✔.
XBRL cross-check: Segment Revenue (income) lakh rows 10,15,900; 5,36,600; 37,77,900; 97,300; 8,700 (these are rounded in lakh and are not used). Total profit before tax in the results: 61,500 lakh = ₹615 crore; total tax 24,900 lakh = ₹249 crore; profit 36,600 lakh = ₹366 crore. Exceptional items: nil. Note 9 states the Labour Codes provisions in force "do not have a material impact on the financial results of the Group".

## Lesson financialNotes check (content/company-lessons/eternal.json)
- No amounts quoted; nothing conflicting.
- "Blinkit revenue after the inventory-model change cannot be compared directly with a marketplace commission total" ✔ (note 8). "Preserve losses in the other rows, exclude internal transactions as the source does" ✔.
- Jargon not explained in the note: "segment result", "inventory-model change", "reconcile segment results to company profit". The note does not state group profit (615 before tax; 366 for the year).

## Not verified
- Printed page numbers (none); the eternal.com announcement page.

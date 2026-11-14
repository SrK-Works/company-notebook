# Titan Company — re-verification of the existing snapshot (migrated to content/financial-reviews)

Re-check of 14 Nov 2026; corrections listed below.
Corrected 14 November 2026: Snapshot corrected 14 Nov 2026 and moved from dist/financial-data.js to this folder: the unsupported claim that digi-gold is in the statutory table was removed (the filed note names gold-ingot sales of 10,568 as other operating revenue; the release excludes bullion and digi-gold from its headline); the 101 Labour Codes exceptional item added to notes. Amounts unchanged. Lesson financialNotes rewritten.

## Discrepancies and unsupported items
No amount in the snapshot disagrees with the filing: all five rows and both totals match. Points to note:
1. Source URL. The snapshot link, https://www.titancompany.in/sites/default/files/2026-05/Q4FY26%20-%20Financial%20results%20Uploaded_0.pdf, could not be fetched from this environment (target unreachable). The figures were read from the BSE copy of the 8 May 2026 board-outcome filing, https://bseindia.com/stockinfo/AnnPdfOpen.aspx?Pname=f7ed958b-7919-4dd8-8efe-b276e97da628.pdf (the search listing shows the same document title for the Titan site copy). The identity of the two copies is therefore an inference, not a byte comparison.
2. Page locator. Snapshot "Consolidated segment information · year ended 31 March 2026" has no page number. In the filing the consolidated results statement and the "SEGMENT INFORMATION (Refer note 3)" page follow the standalone statements; PDF page numbers are not recoverable from the extracted text. Unconfirmed.
3. Digi-gold. Snapshot note and lesson say the statutory table includes "bullion and digi-gold sales". The filed notes name only gold-ingot sales: note 4, "the Group sold gold-ingots aggregating ₹ 10,568 crores (previous year ended 31 March 2025 ₹ 3,124 crores) … which is disclosed as other operating revenues". The earnings-release text says "Total Income excludes Bullion sales & Digi-gold sales in all the periods". Digi-gold inside the statutory table is not stated in the filed results; unsupported.
4. Exceptional item. FY26 consolidated exceptional item is ₹101 crore (Labour Codes: "the Group has presented such incremental impact amounting to ₹ (51) crores as an exceptional item … for the quarter and ₹ 101 crores for year ended 31 March 2026"). Segment profit is stated before it, as the snapshot definition says; the snapshot does not mention the item.
5. Revenue column is "Revenue (including other income)", so the 287 "Corporate, unallocated" revenue is largely other income (group other income is 552). Snapshot notes say revenue includes other income; correct.

## Source
Titan Company Limited, outcome of board meeting 8 May 2026 with audited standalone and consolidated financial results for the quarter and year ended 31 March 2026 (auditor B S R & Co. LLP, unmodified opinion). Consolidated (Titan and its subsidiaries together; includes Damas Jewellery from 1 January 2026); unit ₹ crore; "Year ended 31-03-2026 (Audited)".

## Consolidated segment information, ₹ crore, year ended 31-03-2026 (31-03-2025 in brackets)
a) Revenue (including other income)
| Segment | FY26 | FY25 |
|---|---:|---:|
| Watches | 5,267 | 4,598 |
| Jewellery (refer note 4) | 79,660 | 53,966 |
| Eyecare | 916 | 801 |
| Others | 2,006 | 1,275 |
| Corporate (unallocated) | 287 | 302 |
| Total | 88,136 | 60,942 |
b) Profit / (loss) from segments before finance costs, exceptional item and tax
| Segment | FY26 | FY25 |
|---|---:|---:|
| Watches | 824 | 548 |
| Jewellery | 7,209 | 4,899 |
| Eyecare | 77 | 80 |
| Others | 173 | 8 |
| Corporate (unallocated) | (201) | (47) |
| Total | 8,082 | 5,488 |
Finance costs 1,180 (953); Exceptional item 101 (nil); Profit before tax including share from associate and joint venture 6,801 (4,535).
Note 3: "The Group is structured into four verticals namely Watches, Jewellery, Eyecare and Others, where 'Others' include Aerospace & Defence, Automation Solutions, Accessories, Fragrances and Indian dress wear."

Sum checks: 5,267 + 79,660 + 916 + 2,006 + 287 = 88,136 ✔. 824 + 7,209 + 77 + 173 − 201 = 8,082 ✔. 8,082 − 1,180 − 101 = 6,801 ✔.

## Consolidated statement of profit and loss, year ended 31-03-2026, ₹ crore
Revenue from operations: sale of products / services 76,797; other operating revenues (refer note 4) 10,787; other income 552; total income 88,136. Total expenses 81,235. Profit before share of associate and joint venture, exceptional item and tax 6,901; share of profit 1; profit before exceptional item and tax 6,902; exceptional item 101; profit before tax 6,801; total tax 1,728; profit for the period 5,073.
Note 4 (gold ingots): FY26 ₹10,568 crore (FY25 ₹3,124 crore), shown as other operating revenues.
Earnings release (same filing, "Total Income excludes Bullion sales & Digi-gold sales"): FY26 total income 76,078 (FY25 57,338); earnings before interest and tax 8,082; profit before tax 6,902; profit after tax 5,073. The release's total income of 76,078 is not the statutory 88,136.

## Lesson financialNotes check (content/company-lessons/titan-company.json)
- Note 1: Jewellery ₹79,660 crore revenue and ₹7,209 crore segment profit; Watches ₹5,267 crore and ₹824 crore. ✔ Matches. "before company-level finance costs, exceptional items and tax" ✔.
- Note 2: "The statutory table includes other income, bullion and digi-gold sales." Other income and gold ingots ✔; digi-gold not stated in the filed notes (item 3). "The earnings presentation excludes bullion and digi-gold from specified headline total-income figures" ✔ (release states this).
- Note 3: "corporate unallocated line has a ₹201 crore loss" ✔. "Others row is not a profit measure for every new lifestyle brand" ✔ (Others includes Aerospace & Defence, Automation Solutions and others). Jargon not explained in the note: "exceptional items", "segment profit", "consolidated".
- The ₹101 crore Labour Codes exceptional item (item 4) is not mentioned next to the profit figures.

## Not verified
- PDF page numbers; the titancompany.in copy of the filing; digi-gold within the statutory revenue.

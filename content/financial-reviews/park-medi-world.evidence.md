# Park Medi World — re-verification of the existing snapshot (dist/financial-data.js)

Checked 14 November 2026. Re-check only: the snapshot, lesson and build files were not changed.

## Discrepancies and unsupported items
No amount, label, period or scope in the snapshot disagrees with the filing: revenue from operations ₹16,793.56 million (snapshot 1,679.356 crore) and profit after tax ₹2,735.57 million (snapshot 273.557 crore) match exactly after dividing by 10. Points to note:
1. Page locator. Snapshot "PDF pages 180 and 196 · printed page 201 and segment policy". PDF page 180 = printed page 201 ✔ (statement of profit and loss). PDF page 196 = printed page 217 (accounting policy 2.20 Segment Reporting) ✔; the snapshot gives no printed number for it.
2. Revenue label. The snapshot row is "Healthcare business · whole group"; the filing has one reportable segment, so no segment table or segment result exists, and the row is a group total ✔.
3. The filing shows no exceptional items (line shown as nil), so no one-off item needs to be stated beside profit. An unusual tax line is small: income tax for earlier years ₹2.33 million.

## Source
Park Medi World Limited (formerly Park Medi World Private Limited), Annual Report 2025-2026, consolidated financial statements, https://www.parkhospital.in/public/uploads/financial-annual-report/Annual%20Report%202025-2026.pdf. Fetched and read from the company link. Consolidated (Park Medi World and its subsidiaries); unit ₹ in millions ("All amounts are ₹ in millions, unless stated otherwise"); year ended March 31, 2026 (2025 in brackets); audited (signed 12 May 2026 by Agiwal & Associates).

## Consolidated statement of profit and loss (PDF page 180, printed page 201), ₹ million
Revenue from operations (note 34) 16,793.56 (13,935.70); Other income (note 35) 316.09 (324.11); Total income 17,109.65 (14,259.81); Cost of material consumed/service rendered 2,950.61; Changes in inventories 7.45; Employee benefit expenses 3,233.97; Professional and consultancy fees 2,570.74; Finance costs 588.85; Depreciation and amortisation 624.62; Other expenses 3,587.57; Total expenses 13,563.81 (11,403.11); Profit before exceptional items and tax 3,545.84 (2,856.70); Exceptional items – ; Profit before tax 3,545.84; Current tax 822.45; income tax for earlier years 2.33 ((1.03)); deferred tax (14.51) ((88.00)); total tax 810.27 (702.29); Profit after tax 2,735.57 (2,154.41); attributable to owners of the company 2,581.20 (2,016.38) and non-controlling interest 154.37 (138.03).
Segment policy (PDF page 196, printed page 217, accounting policy 2.20): "The Group is engaged only in healthcare business and therefore the Group's CODM … decided to have only one reportable segment as at the March 31, 2026 in accordance with IND AS 108".

Sum checks: 16,793.56 + 316.09 = 17,109.65 ✔. 17,109.65 − 13,563.81 = 3,545.84 ✔. 3,545.84 − 810.27 = 2,735.57 ✔. 2,581.20 + 154.37 = 2,735.57 ✔. 822.45 + 2.33 − 14.51 = 810.27 ✔. Conversions: 16,793.56 ÷ 10 = 1,679.356; 2,735.57 ÷ 10 = 273.557.

## Skipped lines
Expense lines, other comprehensive income, the parent company's standalone statement of profit and loss (PDF page 114, revenue 1,289.65 and profit after tax 366.16 ₹ million for the year; a different, overlapping scope, not added to the group figures).

## Management Discussion figures
The Management Discussion table (PDF page 26) shows the same results rounded to whole ₹ million (for example total comprehensive income 2,745, profit before tax 3,546); not used in the snapshot. Other Management Discussion statements (for example operating cash flow of about ₹3,291 million, gross term debt ₹282 million) were not used.

## Lesson financialNotes check (content/company-lessons/park-medi-world.json)
- "reports consolidated healthcare revenue and profit after tax. It does not show whether cardiology, oncology or a particular hospital earns the most" ✔ (single segment).
- "Read the stated group and tax basis, then check receivables, operating cash flow, capital expenditure and lease or other commitments" — advice only, no figures. No mismatch.

## Not verified
Customer concentration (not searched). The standalone statement on PDF page 114 uses a different scope and was not reconciled to the group.

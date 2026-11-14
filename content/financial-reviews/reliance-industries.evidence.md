# Reliance Industries — re-verification of the existing snapshot (dist/financial-data.js)

Checked 14 November 2026. This file records a re-check of the original snapshot only. The snapshot, the lesson and the build files were not changed.
Corrected 14 November 2026: Snapshot corrected 14 Nov 2026 and moved from dist/financial-data.js to this folder: source changed to the annual report PDF with the business overview, note 37 and audited results page as location; revenue column labelled Value of Sales and Services (includes GST and inter-segment transfers); Media & Entertainment stated as part of Others in the audited segments; definition says EBITDA includes interest income; notes add the 1,274,193 vs 1,175,919 reconciliation. Lesson financialNotes rewritten (the unexplained 'ownership interests and investment needs' sentence removed). Amounts unchanged.

## Discrepancies and unsupported items (snapshot value vs filing)

1. Source locator. Snapshot `source` is `https://www.ril.com/ar2025-26/index.html` (the report's home page) and `location` is "Business overview · individual business highlights". No page or table is identifiable. Recorded here: Integrated Annual Report 2025-26 business overview (printed pages 4–5 highlights panel; Retail 12–13; Digital Services 16–17; Media & Entertainment 20–21; Oil to Chemicals 24–25; Oil and Gas 26–27) and audited consolidated results of 24 April 2026 (segment information, "Page 8 of 20" of the attached results). Printed page numbers are read from running heads in extracted text and may be one spread out.
2. Revenue basis. Every row is "Value of Sales and Services" (gross of GST and before inter-segment transfers elimination across the whole company), not "revenue from operations". The snapshot note says only Retail "uses the report's value-of-sales revenue presentation". Filing: the five rows add to 1,274,193 against group Value of Sales and Services of 1,175,919 (see reconciliation below). Revenue from operations (net of GST) for the same businesses is different: Retail 328,202; Media & Entertainment 34,917.
3. Media & Entertainment is not a reportable segment. Note 37 says "The Group has four principal operating and reporting segments; viz. Oil To Chemicals (O2C), Oil and Gas, Retail and Digital Services." Media & Entertainment sits inside "Others" (80,522 / EBITDA 10,857). The 40,682 and 5,842 come only from the business overview text and tables, not from the audited segment note. The snapshot coverage "Selected business highlights" is accurate on this point, but `status: "segments"` and the row list may read as five reportable segments.
4. Profit measure. The audited note 37 reports "Segment Result before Interest and Taxes" (EBIT): O2C 50,758; Oil and Gas 13,464; Retail 20,817; Digital Services 48,211; Others 3,448. EBITDA by segment appears in the results segment table and in the report's business overview. Footnote to the results table: "* Segment results (EBITDA and EBIT) include Interest Income pertaining to the respective segments." So O2C and Retail EBITDA include interest income. The snapshot definition does not say this.
5. Prior-year figures, if later added, differ in basis: FY25 Digital Services EBITDA 65,001, Retail 25,094 (not used in the snapshot).

All five snapshot amounts match the filing (table below).

## Source documents
- Reliance Industries Limited, Integrated Annual Report 2025-26, https://www.ril.com/ar2025-26/index.html and PDF https://ril.com/reports/RIL-Integrated-Annual-Report-2025-26.pdf (read in full as text).
- Reliance Industries Limited, media release and audited consolidated results for the year ended 31 March 2026, dated 24 April 2026: https://www.ril.com/sites/default/files/2026-04/24042026_Media_Release_RIL_Q4_FY2025-26_Financial_and_Operational_Performance.pdf
- Unit ₹ crore; consolidated (Reliance Industries and subsidiaries together). Period year ended 31 March 2026.

## Audited consolidated segment information, year ended 31 March 2026 (results attachment, "Page 8 of 20")
Segment Value of Sales and Services (Revenue), ₹ crore, year ended 31st Mar'26 (FY25 in brackets):
| Segment | Value of Sales and Services | EBITDA | Snapshot revenue | Snapshot profit |
|---|---:|---:|---:|---:|
| Oil to Chemicals (O2C) | 662,401 (626,921) | 60,546 (54,988) | 662,401 | 60,546 |
| Oil and Gas | 23,861 (25,211) | 19,050 (21,188) | 23,861 | 19,050 |
| Retail | 371,085 (330,943) | 27,034 (25,094) | 371,085 | 27,034 |
| Digital Services | 176,164 (154,119) | 76,560 (65,001) | 176,164 | 76,560 |
| Others | 80,522 (55,859) | 10,857 (8,526) | not in snapshot | not in snapshot |
| Gross Value of Sales and Services | 1,314,033 (1,193,053) | | | |
| Less: Inter Segment Transfers | 138,114 (121,879) | | | |
| Value of Sales & Services | 1,175,919 (1,071,174) | | | |
| Less: GST Recovered | 100,244 | | | |
| Revenue from Operations | 1,075,675 (980,136) | | | |
Total Segment Profit before Interest, Tax and Depreciation, Amortisation and Depletion (EBITDA) 194,047 (174,797). Consolidated EBITDA 207,911; PAT and share of associates 95,754.

Reconciliation: 662,401 + 23,861 + 371,085 + 176,164 + 80,522 = 1,314,033. ✔ 1,314,033 − 138,114 = 1,175,919. ✔ The five snapshot rows alone add to 662,401 + 23,861 + 371,085 + 176,164 + 40,682 = 1,274,193 (not a group total).

## Note 37 segment information (Integrated Annual Report, printed pages 256–257), ₹ crore, 2025-26
| Line | O2C | Oil and Gas | Retail | Digital Services | Others | Total |
|---|---:|---:|---:|---:|---:|---:|
| External turnover | 658,991 | 19,008 | 365,820 | 59,777 | 72,323 | 1,175,919 |
| Inter segment turnover | 3,410 | 4,853 | 5,265 | 116,387 | 8,199 | |
| Value of Sales and Services (Revenue) | 662,401 | 23,861 | 371,085 | 176,164 | 80,522 | 1,175,919 |
| Less: GST recovered | 21,429 | 24 | 42,883 | 26,199 | 9,709 | 100,244 |
| Revenue from Operations (net of GST) | 640,972 | 23,837 | 328,202 | 149,965 | 70,813 | 1,075,675 |
| Segment result before interest and taxes | 50,758 | 13,464 | 20,817 | 48,211 | 3,448 | 139,828 incl. unallocable 3,130 |
Note text: "Total Value of Sales and Services is after elimination of inter segment turnover of ₹ 1,38,114 crore." Finance cost (27,061); interest income 10,395; profit before tax and share of associates 123,162; profit after tax 95,610.

## Business overview tables (Integrated Annual Report 2025-26)
| Business | Value of Sales and Services | Revenue from operations | EBITDA | Margin (on revenue from operations) |
|---|---:|---:|---:|---|
| Retail (FY 2025-26 / FY 2024-25) | 3,71,085 / 3,30,943 | 3,28,202 / 2,91,043 | 27,034 / 25,094 | 8.2% / 8.6% |
| Digital Services | 1,76,164 / 1,54,119 | | 76,560 / 65,001 | |
| Media and Entertainment (FY25 includes JioStar from 14 Nov 2024) | 40,682 / 20,696 | 34,917 / 17,762 | 5,842 / 1,833 | 16.7% / 10.3% |
| Oil to Chemicals ("Revenue") | 6,62,401 / 6,26,921 | | 60,546 / 54,988 | 9.1% / 8.8% |
| Oil and Gas ("Revenue") | 23,861 / 25,211 | | 19,050 / 21,188 | 79.8% / 84.0% |

## Lesson financialNotes check (content/company-lessons/reliance-industries.json)
- No amounts are quoted, so nothing conflicts with the figures.
- "Retail uses the report's value-of-sales presentation" is incomplete: all five rows use that basis (item 2 above).
- "Ownership interests and investment needs matter afterward too" is unexplained and the filing does not make a claim there. Reader-facing jargon: "EBITDA" is explained; "depreciation" is explained.
- Not mentioned in the note: Media & Entertainment is not a reportable segment (item 3), segment EBITDA includes interest income (item 4).

## Not verified
- PDF page numbers of the annual report (only printed running heads available from extracted text).
- Pages of the Reliance home-page URL cited as `source` (a navigation page, no figures on it).

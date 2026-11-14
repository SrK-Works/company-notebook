# Marico — re-verification of the existing snapshot (migrated to content/financial-reviews)

Checked 14 November 2026. Snapshot moved from dist/financial-data.js to this folder.
Corrected 14 November 2026: Source changed to the BSE-filed annual report that was read (the marico.com PDFs could not be opened); location now note 30, PDF page 235 (printed 434-435), instead of the unconfirmed PDF page 13. Snapshot notes add the filing's statement that results include acquisitions and are not comparable with other periods; location no longer claims PDF page 13 (unconfirmed) and points to note 30; product table location gives PDF page 235 of the BSE copy. Amounts unchanged. Lesson financialNotes now say the filing calls the results not comparable.

## Discrepancies and unsupported items
No amount, label, period or scope in the snapshot disagrees with the filing: India and International revenue and segment result, the totals 13,611 and 2,474, finance costs 53, unallocated 144, PBT 2,277, tax 464, group PAT 1,813, non-controlling 51, owners 1,762, and the four product-category revenues all match. Points to note:
1. Sources. Both marico.com PDFs cited in the snapshot (Board_Meeting_Update_May_5_2026.pdf and Marico_Annual_Report_FY26.pdf) returned "not acceptable" to a plain download and "target unreachable" through TinyFish, so they were not read. Exchange copies were used instead: (a) the 5 May 2026 outcome with audited consolidated results, filed with BSE, https://www.bseindia.com/xml-data/corpfiling/AttachHis/54d38ace-3d50-4db1-a9c4-487f153aa34f.pdf; (b) the Integrated Annual Report 2025-26, filed with BSE and NSE on 9 July 2026, https://bseindia.com/xml-data/corpfiling/AttachHis/4d48a9a7-e7ee-4677-a18b-78ae7b5b01c7.pdf.
2. Page locators. Snapshot "PDF page 13" (results update) and "PDF page 219 · printed pages 434–435" (annual report). The printed pages 434–435 are confirmed (running head "435 434"); the segment note sits on PDF page 235 of the exchange copy (the company copy's PDF numbering was not checked). On PDF page 13 of the BSE results copy, the heading "Rs in crores" appears but the segment table text could not be extracted (the table is not text in that file), so "PDF page 13 · consolidated segment information" is unconfirmed. The same India/International numbers are confirmed in the annual report note 30.
3. Whole crore. Marico reports in whole ₹ crore ("Rs in crore"), so every figure is already rounded by the company.
4. Snapshot definition says the segment result is "Profit before tax and interest". The filing: "Total segment results" less "Finance costs" and "Other un-allocable expenditure net of un-allocable income" equals profit before tax ✔.

## Source
Marico Limited, Integrated Annual Report 2025-26, consolidated financial statements note 30 "Segment Information". Consolidated (Marico, its subsidiaries and step-down subsidiaries in India, Bangladesh, UAE, Egypt, South Africa, Malaysia, Sri Lanka, Vietnam and USA); unit ₹ crore ("₹ in crore"); year ended 31st March 2026 (2025 in brackets); audited.

## Note 30 (PDF page 235 of exchange copy, printed pages 434–435), ₹ crore
CODM: Managing Director and CEO; "examines the Group's performance from a geographic perspective"; India "comprises domestic consumer goods"; International.
Segment revenue (sales and other operating income): India 10,348 (8,110); International 3,263 (2,721); Total segment revenue 13,611 (10,831); Less inter segment revenue – .
Revenue from sale of products to external customers by major product categories: Edible Oils 7,049 (5,494); Hair oils 2,624 (2,115); Personal care 2,020 (1,886); Others 1,918 (1,336); total 13,611 (10,831).
By location of customers: India 10,348; Bangladesh 1,474; Vietnam 653; Others 1,136; total 13,611.
Segment results: India 1,661 (1,550); International 813 (711); Total segment results 2,474 (2,261); Less (i) Finance costs 53 (53); (ii) Other un-allocable expenditure net of un-allocable income 144 (92); Profit before tax 2,277 (2,116).
"The Group does not have revenue more than 10% of total revenue from single customer."

Sum checks: 10,348 + 3,263 = 13,611 ✔. 7,049 + 2,624 + 2,020 + 1,918 = 13,611 ✔. 1,661 + 813 = 2,474 ✔. 2,474 − 53 − 144 = 2,277 ✔. 1,474 + 653 + 1,136 + 10,348 = 13,611 ✔.

## Consolidated results (BSE copy of 5 May 2026 filing, PDF page 8), ₹ crore, year ended March 31, 2026 (2025)
Revenue from operations 13,611 (10,831); other income 204; total income 13,815; finance cost 53 (53); profit before tax 2,277 (2,116); current tax 543, deferred tax (79); tax expense 464 (458); net profit 1,813 (1,658); attributable to owners 1,762 (1,629) and non-controlling interests 51 (29). 1,813 − 51 = 1,762 ✔; 2,277 − 464 = 1,813 ✔.
Notes (PDF pages 11–12): note 4 acquired a further 8.8% of Satiya (Plix), stake now 60%; note 5 acquired the balance 46.02% of HW (True Elements), now wholly owned (17 October 2025); note 8 acquired 93.27% of Zea Maize (4700BC) from 29 January 2026; note 9 acquired 60% of Cosmix; "Results … include the impact of the above transactions … and are not comparable with other periods". Note 7: the new Labour Codes impact is "not material to the consolidated financial results" — no one-off profit item.

## Skipped lines
Segment assets and liabilities (India 4,832/1,774; International 2,548/888; unallocated 2,695/2,919), geographical non-current assets, the standalone statements.

## Management Discussion figures
None used. (The results update's description "turnover of ₹136.1 billion" is a rounding of the 13,611 crore revenue.)

## Lesson financialNotes check (content/company-lessons/marico.json)
- "revenue by product category and profit by segment, India and International. These come from different tables" ✔ (both inside note 30, separate tables).
- "Acquisitions change what the totals include … when each bought business joined the accounts and how much of it Marico owns" ✔ (notes 4–10 above give dates and stakes).
- No amounts, so no numeric mismatch. Gap: the note does not say that the filing itself calls the results not comparable with earlier periods because of these purchases.

## Not verified
The segment table on PDF page 13 of the BSE results copy (text not extractable) and the page numbers of the company-site PDFs.

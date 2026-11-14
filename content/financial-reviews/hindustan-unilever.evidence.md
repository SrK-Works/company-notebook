# Hindustan Unilever — re-verification of the existing snapshot (dist/financial-data.js)

Checked 14 November 2026. Re-check only: the snapshot, lesson and build files were not changed.
Corrected 14 November 2026: Snapshot moved unchanged from dist/financial-data.js to this folder on 14 Nov 2026 (no snapshot field changed). Lesson financialNotes rewritten: the 1,476 gap is explained (Others 2,181 less other operating revenue 705), demerger defined, the unverified 'Foods & Refreshment' label and Kwality Wall's pro forma statement removed.


## Discrepancies and unsupported items
No amount, label, period or scope in the snapshot disagrees with the filing: five revenue rows, five segment results and both totals match. Points to note:
1. Page locator. Snapshot "PDF page 453 · printed page 451". The segment note sits in the spread printed 450–451 (running head "Financial Statements 451 450"); PDF page 453 could not be confirmed because the PDF itself was not fetchable (hul.co.in returned access denied / unreachable) and the text read here has no PDF page breaks. Printed pages 450–451 are consistent; PDF page unconfirmed.
2. Source. The snapshot link, https://www.hul.co.in/files/annual-report-2025-26-single-page.pdf, could not be fetched here. The same Integrated Annual Report 2025-26 was read from the copy HUL filed with BSE on 2 June 2026, https://bseindia.com/xml-data/corpfiling/AttachHis/881493e4-75af-4a7f-8c64-9d0886e63f1d.pdf.
3. Names. Filing: "Others (includes Exports)"; snapshot "Others, including exports". Same row.
4. "Segment revenue relating to each of the above domestic business segments includes Income from Services provided to Group Companies, where applicable." Segment revenue (64,468) is therefore total revenue from operations including other operating revenue, not "turnover".
5. Lesson note gap (see lesson check below): the filing does explain the ₹1,476 crore gap that the lesson says "the pages read do not explain".

## Source
Hindustan Unilever Limited, Integrated Annual Report 2025-26, note 48 "Segment information" to the consolidated financial statements. Consolidated (HUL and its subsidiaries together); unit ₹ crores; year ended 31st March 2026; continuing operations (the ice cream business, demerged on 1 December 2025, is shown separately as discontinued operations).

## Note 48 (printed pages 450–451), ₹ crore, year ended 31st March 2026 (2025 in brackets)
Segment revenue: Home Care 23,672 (22,958); Beauty & Wellbeing 14,990 (13,523); Personal Care 9,564 (9,166); Foods 14,061 (13,501); Others (includes Exports) 2,181 (2,180); Total Segment Revenue from Continuing Operations 64,468 (61,328). Segment Revenue from Discontinued Operations 1,257 (1,793).
Segment results: Home Care 4,521 (4,429); Beauty & Wellbeing 4,161 (4,188); Personal Care 1,805 (1,631); Foods 2,824 (2,765); Others (includes Exports) 410 (440); Total Segment Results from Continuing Operations 13,721 (13,453). Segment Results from Discontinued Operations (122) (43).
Reconciliation lines: Finance costs 410 (381); Other Income 751 (1,017); Profit before exceptional items, tax and share of equity-accounted investee from Continuing Operations 14,062 (14,089); Share of loss of equity-accounted investee (net of tax) (15) (2025: (8)); Exceptional items – income/(expenditure) (235) (2025: income of 347); Profit before tax from Continuing Operations 13,812 (14,428); current tax (3,163); deferred tax charge/(credit) 3; Profit for the year from Continuing Operations 10,652 (10,680); Profit/(Loss) for the year from Discontinued Operations 4,407 (2025: loss of 9); Less: Non Controlling Interest (19) (2025: (22)); Profit for the year from Continuing and Discontinued Operations 15,040 (10,649).
Footnotes: "*There are no intersegment transactions." "Segment results relate to profit before other income, finance costs, exceptional items and tax." CODM: the Management Committee. Home Care includes detergent bars, powders, liquids, scourers; Beauty & Wellbeing includes Skin Care, Hair Care; Personal Care includes Skin Cleansing, Oral Care; Foods includes culinary products, tea, coffee, functional nutrition drinks; Others includes exports, consignment.
Also in the annual report's financial highlights (early pages): Turnover ₹63,763 Cr; Profit After Tax (PAT) ₹10,652 Cr; EBITDA margin 23.6%; segment revenue and "Segmental Results (EBIT)" as above.

Sum checks: 23,672 + 14,990 + 9,564 + 14,061 + 2,181 = 64,468 ✔. 4,521 + 4,161 + 1,805 + 2,824 + 410 = 13,721 ✔. 13,721 − 410 + 751 = 14,062 ✔. 14,062 − 235 − 15 = 13,812 ✔ (before exceptional items and equity-accounted share).

## Revenue note (consolidated, year ended 31st March 2026)
Sale of products 63,636; sale of services 127; other operating revenue: income from services rendered 425, government grants (GST budgetary support, production linked incentives, export incentives) 135, others (scrap, rentals) 145; total 64,468. "Sale of products and Services" 63,763 (contracted price 75,718 less trade discounts, promotions, volume rebates, returns 11,955). "The Group does not receive 10% or more of its revenues from transactions with any single external customer."

## Discontinued operations (note 44)
Scheme of Arrangement with Kwality Wall's (India) Limited effective 1st December 2025. "HUL has accordingly debited the fair value of the Ice Cream business undertaking amounting to ₹5,487 crores to retained earnings as dividend distribution to the shareholders … The difference between the aforementioned fair value and the carrying amount of net assets of the undertaking as at the effective date (₹876 crores) is recognised as a gain on demerger … exceptional item amounting to ₹4,611 crores." Discontinued operations: total income 1,257 (1,792); total expense 1,392 (1,763); loss before exceptional items and tax (135) (profit 29).

## Lesson financialNotes check (content/company-lessons/hindustan-unilever.json)
Note 1 ("How to read HUL's own figures"):
- Turnover ₹63,763 crore ✔ (sale of products and services). Home Care 23,672, Beauty & Wellbeing 14,990, Personal Care 9,564, Foods 14,061 ✔. The four add to 62,287 ✔ and 63,763 − 62,287 = 1,476 ✔.
- "The pages read for this lesson do not explain the gap": the annual report explains it. Segment revenue 64,468 = the four businesses 62,287 + Others (exports) 2,181; segment revenue is 705 higher than turnover because it includes other operating revenue (425 + 135 + 145 = 705; 63,763 + 705 = 64,468). So 62,287 + 2,181 − 705 = 63,763 and the gap 1,476 = 2,181 − 705. The lesson note is not wrong on any number but its claim of no explanation, and "do not treat the four as the whole company", is incomplete: the fifth segment, Others (exports), is the missing piece.
- "Segment margin is HUL's own measure": the filing calls it "Segment results" (profit before other income, finance costs, exceptional items and tax) and "Segmental Results (EBIT)" in the highlights; "margin" is not the filing's word.
Note 2 (ice cream):
- "Until 1 December 2025, ice cream sat inside HUL's Foods & Refreshment segment": the demerger date ✔ (note 44, effective 1st December 2025); the segment name "Foods & Refreshment" does not appear in the FY 2025-26 report (segments are Home Care, Beauty & Wellbeing, Personal Care, Foods, Others) and is unverified here.
- "KWIL reported results for the quarter ended 31 December 2025 on its own … pro forma basis" is from a KWIL filing not read here; unverified. "Demerger" is not defined in the note (it is a company split in which a business moves into a separate listed company; HUL records the gain as non-cash).
Note 3 (quarter ended 30 September 2026; source HUL's 28 October 2026 results release, BSE https://www.bseindia.com/xml-data/corpfiling/AttachLive/71a8a780-7e2e-4c6a-90fd-a387ae1fe0da.pdf):
- Turnover ₹18,071 crore ✔; EBITDA grew 8% to ₹4,089 crore ✔; EBITDA margin 22.6% ✔; "Reported Profit After Tax at ₹2,796 crores was flat due to one-off tax related gains of ₹273 crores" ✔ (release: prior-year quarter PAT ₹2,791 crore included a one-off tax gain of ₹273 crore "pursuant to resolution of prior years' tax matters"). The lesson wording "the earlier quarter included one-off tax gains" ✔.
- These are quarterly, unaudited-quarter figures outside this snapshot's period; they are not in the annual evidence above.
Jargon not explained in the lesson note: "EBITDA" is explained; "pro forma", "demerger", "segment margin" are not.

## Not verified
- PDF page 453 of the hul.co.in PDF; the KWIL pro forma statement; the "Foods & Refreshment" label.

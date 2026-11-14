# Mahindra & Mahindra — re-verification of the existing snapshot (migrated to content/financial-reviews)

Checked 14 November 2026. Snapshot moved from dist/financial-data.js to this folder.
Corrected 14 November 2026: Snapshot notes add the Labour Codes exceptional charge of 292.94 crore and say the filing does not show whether it sits in a segment result; exceptional items, associate and joint venture are defined; Industrial Businesses and Consumer Services result before and after share of associates is shown (1,725.61 and 3,704.64). Amounts unchanged. Lesson financialNotes define the terms.

## Discrepancies and unsupported items
No amount, label, period or scope in the snapshot disagrees with the filing: four segment revenues, four segment results (section C), both totals, the inter-segment deduction and income from operations all match. Points to note:
1. The snapshot uses section C (results after exceptional items and after share of profit/loss of associates and joint ventures). Section B (before the associates share) gives different figures (Automotive 10,478.54; Farm Equipment 5,505.59; Financial Services 3,708.89; Industrial Businesses and Consumer Services 1,725.61; total 21,418.63). The snapshot definition says it uses the after-associates measure ✔; the Industrial Businesses and Consumer Services result (3,704.64) is mostly share of profit from associates and joint ventures (1,725.61 before, 3,704.64 after), which a beginner will not expect from the label "segment result".
2. Name. Filing: "Industrial Businesses and Consumer Services" under the heading "Services:" together with Financial Services. Same row.
3. The consolidated result includes a one-off exceptional charge of ₹292.94 crore (Labour Codes, see below) that the snapshot notes do not state.
4. The filing has no printed page numbers; the locator "PDF page 2 · section C" is correct.

## Source
Mahindra & Mahindra Limited, statement of audited consolidated financial results and consolidated segment information for the quarter and year ended 31st March 2026 (board meeting 5 May 2026), https://www.mahindra.com/sites/default/files/2026-05/Quarterly%20Result%20for%20Q4F26.pdf. Fetched and read from the company link. Consolidated (M&M and subsidiaries; associates and joint ventures on the equity method); unit ₹ crore ("Rs. in Crores"); year ended 31st March 2026; audited.

## Consolidated segment information (PDF page 2), ₹ crore, year ended 31st March 2026 (2025 in brackets)
A. Segment revenue: Automotive 1,17,834.13 (90,824.58); Farm Equipment 42,568.39 (35,375.30); Services: Financial Services 20,949.32 (18,295.83); Industrial Businesses and Consumer Services 22,748.93 (18,971.43); Total segment revenue 2,04,100.77 (1,63,467.14); Less: Inter-segment revenue 5,462.22 (4,256.32); Income from operations 1,98,638.55 (1,59,210.82).
C. Segment results after exceptional items and share of profit/(loss) of associates and joint ventures: Automotive 10,383.47 (7,797.40); Farm Equipment 5,516.90 (4,946.65); Financial Services 3,778.53 (3,002.02); Industrial Businesses and Consumer Services 3,704.64 (2,717.52); Total 23,383.54 (18,463.59); Finance costs (excludes Financial Services business) (671.59) ((681.51)); Other unallocable income/(expense), net (includes exceptional items not allocated to segments) 2,472.81 (1,297.54); Profit/(loss) before tax 25,184.76 (19,079.62).

Sum checks: 1,17,834.13 + 42,568.39 + 20,949.32 + 22,748.93 = 2,04,100.77 ✔. 2,04,100.77 − 5,462.22 = 1,98,638.55 ✔. 10,383.47 + 5,516.90 + 3,778.53 + 3,704.64 = 23,383.54 ✔. 23,383.54 − 671.59 + 2,472.81 = 25,184.76 ✔ and equals profit before tax on page 1 (25,184.76) ✔.

## Consolidated results (PDF page 1)
Revenue from operations 1,97,792.78; income from investments related to subsidiaries, associates and joint ventures 845.77; Income from operations 1,98,638.55 (the snapshot's "income from operations" includes this 845.77 of investment income); other income 3,445.79; total income 2,02,084.34; Exceptional items (292.94); share of profit of associates and joint ventures (net) 1,964.91; Profit before tax 25,184.76; current tax (6,769.35); deferred tax 206.30; Profit after tax 18,621.71; owners 17,098.85; non-controlling interest 1,522.86.
Note 3 (PDF page 11): "The Group has recognised the incremental impact on retiral benefits aggregating to Rs. 292.94 crores for the Group and Rs. 98.19 crores for the Company and presented the same under 'Exceptional items'" — a one-off charge caused by the four new Labour Codes (29 labour laws consolidated, in force 21 November 2025), a regulatory change, not voluntary.
Note f) (PDF page 11): "Industrial Businesses and Consumer Services segment in consolidated results comprises of all other segments like IT services, Real Estate, Hospitality, Logistics, Steel trading and processing, Renewables, After-market, Defence, Agri, etc. … In the consolidated results, the reportable segments also include investments in associates and joint ventures in respective businesses." Automotive: "sale of automobiles, two wheelers, spares, construction equipments and related services"; Farm Equipment: "tractors, implements, spares, powerol and related services"; Financial Services: "retail and other loans, SME finance, housing finance, mutual funds and life and non-life insurance broking services".

## Skipped lines
Section B, D (segment assets) and E (segment liabilities), the balance sheet, cash flow and all standalone pages were not used.

## Management Discussion figures
None used.

## Lesson financialNotes check (content/company-lessons/mahindra-and-mahindra.json)
- "reports consolidated segments and deducts inter-segment revenue in its reconciliation" ✔.
- "Segment results include the exceptional and associate/joint-venture effects stated in the source" ✔ (section C wording). The words "exceptional" and "associate/joint-venture" are not explained in the note; the ₹292.94 crore Labour Codes charge is not mentioned.
- "Lending has financing costs within its own business economics … remaining group-level finance costs": ✔ (finance costs of ₹671.59 crore exclude Financial Services).

## Not verified
Whether the ₹292.94 crore exceptional charge falls inside segment results or the unallocable line is not shown (the unallocable line says it "includes exceptional items not allocated to segments").

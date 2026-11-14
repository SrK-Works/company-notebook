# Swiggy — re-verification of the existing snapshot (migrated to content/financial-reviews)

Checked 14 November 2026. Snapshot moved from dist/financial-data.js to this folder.
Corrected 14 November 2026: Snapshot notes add the Labour Codes exceptional item of 10 crore and the Rapido stake sale (2,399 crore) with its 1,350 crore gain recorded in other comprehensive income, not in the loss. Amounts unchanged. Lesson financialNotes mention exceptional items and Labour Codes without amounts.

## Discrepancies and unsupported items
No amount, label, period or scope in the snapshot disagrees with the filing: five revenue rows (after inter-segment adjustment), five segment results, revenueTotal 23,053 and profitTotal -2,265 all match. Points to note:
1. Reconciliation block unreadable. On PDF page 33 the lines below "Segment results" (other income, share-based payment, finance costs, depreciation, exceptional items, associate loss, loss before tax) are scrambled in the text. They were reconciled by arithmetic: −2,265 + 508 − 966 − 200 − 1,217 − 10 − 4 = −4,154 ✔, and loss before tax (4,154) is printed cleanly in the cash flow statement (PDF page 32). This is a sum match, not a second copy; the individual reconciliation lines are not used in the snapshot.
2. Gross versus net. Segment revenue before inter-segment removal is 23,060 (Food Delivery 7,839). The snapshot uses the net 23,053 and Food Delivery 7,832, as it says.
3. Names. Filing: "Food Delivery", "Out of home consumption", "Quick-commerce", "Supply chain and distribution", "Platform Innovations". Same rows.
4. Rounding. The filing is in whole ₹ crore ("restated from ₹ million to ₹ crore, rounded off to the nearest ₹ crore"). The snapshot note on ₹1 crore rounding is consistent.
5. One-off items not mentioned in the snapshot notes: exceptional items ₹10 crore (new Labour Codes gratuity), and a ₹1,350 crore gain on selling the Rapido stake that was recognised in other comprehensive income, not in the loss.

## Source
Swiggy Limited, Q4 FY2026 shareholder letter containing the audited consolidated financial results and notes, https://www.swiggy.com/corporate/wp-content/uploads/2026/05/Q4-FY2026-Shareholder-letter.pdf. Fetched and read from the company link. Consolidated (Swiggy and subsidiaries); unit ₹ crore; year ended Mar 31, 2026; audited (unmodified opinion, board meeting 8 May 2026).

## Note 5 Segment information (PDF page 33), ₹ crore, year ended Mar 31, 2026 (2025 in brackets)
a. Revenue from operations (total segment revenue): Food Delivery 7,839 (6,362); Out of home consumption 375 (238); Quick-commerce 3,859 (2,130); Supply chain and distribution 10,935 (6,418); Platform Innovations 52 (88); total 23,060 (15,236).
b. Less: revenue from operations (inter-segment): Food Delivery (7) ((9)).
c. Revenue from operations (a−b): Food Delivery 7,832 (6,353); Out of home consumption 375 (238); Quick-commerce 3,859 (2,130); Supply chain and distribution 10,935 (6,418); Platform Innovations 52 (88); total 23,053 (15,227).
Segment results: Food Delivery 1,041 (603); Out of home consumption 29 ((28)); Quick-commerce (3,063) ((1,896)); Supply chain and distribution (77) ((218)); Platform Innovations (195) ((73)); total (2,265) ((1,612)).
Segment descriptions: Food delivery "on-demand food delivery services through a network of restaurant partners and delivery partners"; Out-of-home consumption "restaurant dining solutions (DineOut) and access to curated outdoor events through Scenes"; Quick commerce "on-demand grocery and a growing array of household items … through Instamart"; Supply chain and distribution "comprehensive supply chain services to wholesalers, retailers, and FMCG brands, leveraging our warehousing capabilities"; Platform Innovations "a set of incubators for new service offerings" (including Private Brands, Swiggy Genie, Swiggy Minis, Swiggy Sports).
Reconciliation (read by arithmetic, see point 1): Add other income 508; share based payment expense (966); finance costs (200); depreciation and amortisation (1,217); exceptional items (10); share of loss of an associate (4); loss before tax (4,154).
Note 4 exceptional items: the table's row labels are readable (impairment on property, plant and equipment; IPO expenses; "Statutory impact of new Labour Code (Refer note 10) 10") but the column alignment is scrambled; the year total of 10 is taken from the segment reconciliation arithmetic (point 1), the Labour Code amount of 10 is the figure beside its row. Note 10: additional gratuity liability from the New Labour Codes "considering the non recurring nature of this impact". Note 8: sale of entire investment in Roppen Transportation Services (Rapido) for ₹2,399 crore; "a gain of ₹1,350 crore was recognised in Other Comprehensive Income". Note 9: QIP of ₹10,000 crore (26,66,66,663 shares at ₹375).

Sum checks: 7,832 + 375 + 3,859 + 10,935 + 52 = 23,053 ✔. 7,839 + 375 + 3,859 + 10,935 + 52 = 23,060 ✔; 23,060 − 7 = 23,053 ✔. 1,041 + 29 − 3,063 − 77 − 195 = −2,265 ✔.

## Skipped lines
Quarter columns, other statement pages (cash flow statement used only to confirm loss before tax), the adjusted EBITDA tables (PDF pages 21 and 25) for the snapshot values.

## Management Discussion figures
None used for the snapshot. The shareholder letter's adjusted EBITDA and gross order value are management measures (not audited statement lines); the lesson note names them but the snapshot does not use them.
Adjusted EBITDA definition (PDF page 25): "Profit/loss as per financials excluding (i) tax expense (ii) other income (iii) depreciation and amortization expense (iv) finance cost (v) exceptional items (vi) share in net loss of an associate (vii) share based payment expense and (viii) rental expenses pertaining to 'Ind AS 116 leases'".

## Lesson financialNotes check (content/company-lessons/swiggy.json)
- "preserves external revenue after inter-segment adjustments and the reported segment result" ✔.
- "Swiggy's own profit measure (adjusted EBITDA) is roughly profit from running the business before loan costs, tax and the wearing-out of equipment, and it also leaves out staff pay given in shares and some other items" ✔ against the definition above (it also removes other income, exceptional items, associate loss and lease rent).
- "different outcomes across food delivery, out-of-home, quick commerce, supply chain and innovations" ✔. No amounts. Gaps: the notes do not mention the ₹10 crore Labour Codes exceptional item.

## Not verified
The individual reconciliation lines on PDF page 33 (scrambled text; only their sum is confirmed). The printed page number (the letter's pages are presentation slides).

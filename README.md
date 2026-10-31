# Company Notebook

Mobile-friendly research prototype for Indian stock-market beginners.

## Run

Serve `dist/` with a local HTTP server. No dependency installation is required to run the checked-in site. After editing company lesson JSON files, regenerate their bundle with `node scripts/build-company-lessons.cjs`.
The entrypoint loads `data.js`, `company-expansion.js`, `overviews.js`, `product-images.js`, `gallery.js`, `financial-data.js`, `financial-expansion.js`, `financials.js`, `research-guides.js`, `hul-primer.js`, `itc-primer.js`, `nestle-primer.js`, `britannia-primer.js`, `marico-primer.js`, `dmart-primer.js`, `profile-lessons.js`, `company-lessons.js`, `app.js` and `style.css`. Navigation uses hash routes,
so company links work on static hosting. `.openai/hosting.json` retains the Sites project identity.

## Live website

GitHub Pages publishes `dist/` automatically after each push to `main`:
[srk-works.github.io/company-notebook](https://srk-works.github.io/company-notebook/)

## Features

- Product-first company pages: the visual shelf appears immediately after the company header, followed by the one-minute overview, product and business foundations, operating mechanics and deeper research. All 35 profiles omit the generic share-ownership tutorial.
- A one-minute overview on all 35 profiles: activities, paying customers, earnings, profit drivers and a next research question. The six earlier primers and 29 independently authored lessons supply the company-specific summaries, customers and profit drivers.
- Thirty-five company profiles, company/brand/ticker search and business-type filters. Multiword search matches words across company names, aliases and offerings (for example, “ITC Gold Flake”).
- Cards and profile headers omit fixed reading-time estimates; the approximate one-minute overview label remains.
- Device-local saved reading list, source references, business-model explanations,
  risks and self-check questions.
- Light and dark themes with system preference detection and a saved manual choice.
- Product and service visual shelves across all 35 profiles, with a smooth, continuous loop at 22 pixels per second, pause on interaction, native touch scrolling, and reduced-motion support.
- Starter guide and glossary.
- Local feedback, correction notes, coverage requests and JSON export for pilot sessions.
- Device-local reading events: opening and completing profiles, revealing explanations and bookmarks.
- Feature-detected WebMCP tools `list_companies` and `set_reading_list`.

## Editorial boundaries

Initial sources were inspected during 15–18 September 2026. No data refresh runs automatically. Per-company review dates are shown only when recorded; the 24 original profiles have no individual review date and are labelled accordingly, rather than inheriting a fixed date.
Company disclosures and product directories support business facts; watch items,
risks and learning explanations are editorial interpretation. This is not stock advice.
Profile sources are stored with each record in `dist/data.js` and `dist/company-expansion.js`. The 11 expansion profiles were reviewed on 27 October 2026; aliases support familiar names and common spelling variations.

Financial figures checked on 29 October 2026 are stored in the original `dist/financial-data.js` plus generated `dist/financial-expansion.js`, and rendered by `dist/financials.js`. New financial authoring lives in `content/financial-reviews/` with primary-source evidence transcriptions.
The current release contains 35 verified snapshots, all for FY 2025–26. The original 17 records remain unchanged:
- Eleven profiles have business/segment disclosures: HUL, ITC, Reliance, Mahindra & Mahindra, L&T, Infosys, Titan, Swiggy, Marico, Eternal and TCS. TCS shows reported margins rather than reverse-calculated profit amounts. Reliance shows selected business highlights, not a complete group reconciliation.
- Park Medi World reports one healthcare segment; Nestlé India reports one Food segment, with company profit and an additional sales-only product-group table. Britannia reports one Foods segment, with group profit attributable to owners, a separately labelled approximate turnover mix and geographical revenue. DMart’s consolidated retail results are also shown as group totals with no separate reportable segments. Glass Wall Systems and Kanohar show verified company totals, explicitly not product-level allocations.
- The additional 18 profiles now have verified annual figures: six reported segment tables (Bajaj Auto, Airtel, Dr. Reddy’s, NTPC, POWERGRID and Refex) and twelve company/group total tables (Asian Paints, UltraTech, Maruti, HDFC Bank, ICICI Bank, SBI, Sun Pharma, Rainbow, Rentomojo, Tonbo, Bharat Coking Coal and Parag). Company totals never imply brand or product-level profit disclosure. The renderer retains an explicit verification-pending state for future uncovered companies.

Every snapshot records reporting scope, source, table/page locator, profit definition, review date and reconciliation notes. ₹ million is divided by 10 and ₹ lakh by 100 where needed to present ₹ crore. Negative results retain a minus sign and a loss label. Revenue and profit amount bars use the same amount scale; margin bars use a separate 0–100% scale. Source figures are rounded only for display. ITC's independently rounded revenue rows differ from its reported subtotal by ₹1 crore; this is recorded and explained rather than silently adjusted.
The former HUL partial percentage chart has been removed; its replacement covers the consolidated continuing-operation revenue and segment results from the annual report. These snapshots are historical annual disclosures, not current-quarter or live figures. Reviewing financial figures does not update the review date of unrelated company claims.

Research updates are curated references, not an exhaustive or live announcements feed.
Each profile has a visual shelf of selected offerings, with product photos, brand imagery and explicitly labelled original service illustrations. The full curated text list remains in an expandable section. These are not comprehensive catalogues or live inventory. Image provenance is recorded in `dist/assets/products/sources.json`.

No accounts or central database are present. Browser storage is local to each origin
and device; local-preview and hosted bookmarks do not migrate automatically.
Feedback must be exported by a pilot participant and shared separately.

## Validation performed

- Financial UI: all 35 phone-width profiles render verified financial content (the explicit pending state is retained only for future uncovered companies); no horizontal overflow or broken section targets. Desktop loss labels and expandable measurement notes were checked, with no console errors.
- Financial checks: run `node --test tests/financials.test.cjs` for source metadata, finite values, signed losses, reported-total reconciliation, margin handling, totals-only handling, pending verification and safe rendering.

- 29 October usability audit: removed uniform five-minute labels, corrected multiword company/product matching in the UI and assistant tools, removed unsupported fallback review dates and prevented a successful feedback-save toast after a failed write. All 35 profiles passed browser checks for product-first order, overview presence, valid section targets, absence of the old reading label and desktop overflow. All 288 shelf assets have local files. Mobile explorer/profile, combined search, bookmark save/removal and local correction submission were checked. A blocked-storage check confirmed an accurate failure message.

- One-minute overviews: all 35 records have customer and profit-driver explanations, a research question and valid section targets; summaries contain roughly 110–150 words including labels.
- Overview layout checked in light/dark themes and at 390px; consumer, banking, pharmaceutical, platform and building-project profiles checked, with no page overflow. Research and source links scroll within the profile without changing routes.

- JavaScript syntax and all 35 records checked for required fields, counts and source URL shape.
- Browser search by brand, profile navigation, empty search and coverage form.
- Bookmarks persist across reload and removal updates the saved list.
- Feedback controls and export availability; no browser console errors observed.
- Phone viewport at 390px: explorer and banking profile have no horizontal overflow.
- WebMCP registration, valid read/write, invalid company rejection and state read-back.

## Next iteration

Test the 35 profiles with beginners, repeat the source check once the July–September 2026 results of SBI, Mahindra, Airtel, Britannia, Parag, POWERGRID and Kanohar are published, re-read Nestlé India's sources (its website blocked automated reading on 31 October 2026), extend verified segment financials,
then decide on shared feedback storage and editorial update tooling. Review image reuse permissions before commercial expansion.

## Beginner learning sequence

Company pages show products first, then the one-minute overview, product foundations and business mechanics, offering details, company-specific investigation questions, risks and research context. The self-check precedes the final learning section, Follow the money; original sources and feedback follow it. The four-step path and desktop contents mirror this order.

`dist/research-guides.js` supplies three editorial investigation instructions per base profile; the HUL deep dive extends its own list to five. They explain what to compare and what evidence to seek, not a finding that the business is doing well or a claim that every metric is disclosed. They are revealed on demand to keep the first read short. The final numbers section explicitly identifies cash flow, debt and valuation as work still to do. The overview’s opening explanation is not repeated in the business mechanics.

Run `node --test tests/*.test.cjs` to check disclosure handling and the learning sequence across all 35 profiles.

Learning sequence validation: all 35 profiles passed phone-width checks for section order, three investigation disclosures, valid jump links and no horizontal overflow. Desktop and phone interactions were checked on Glass Wall Systems and HDFC Bank.

## Company-by-company depth: HUL first

`dist/hul-primer.js` expands only Hindustan Unilever. It explains company/brand/product/segment, repeat purchases, FMCG, the route to a shopper, retail price versus company revenue, volume/price/mix examples and HUL's four category groups. It adds five HUL-specific investigation questions and risks, a local glossary and a worked reading of the existing segment table. Other profiles retain their earlier content.

Company facts link to HUL's FY 2025–26 annual report, category reviews and brand directory. Illustrative pack-price calculations are labelled as fictional; margin examples are calculated from the verified consolidated continuing-operations table and are not net profit or shareholder returns. Learning-source verification is separate from dates on the existing financial data.

HUL validation: desktop plus 320px, 390px and 768px layouts; no overflow, duplicate section IDs or broken jump links. Pricing and ownership disclosures, dark/light themes and the derived margin examples were checked. The test suite verifies the other 34 profiles and all financial records are untouched by the HUL extension.

HUL refinement: the ownership/share tutorial is omitted from HUL's company page. The practical cost explanation lives inside the product-to-customer foundations. HUL's contents menu and numbered sections reflect this shorter business-focused sequence.

## Second detailed profile: ITC

`dist/itc-primer.js` composes with the HUL primer and changes only ITC. It keeps products first, explains consumer versus business customers, maps cigarettes/other FMCG/agri/paper and packaging/ITC Infotech, and demonstrates connections and internal sales without showing financial values early. It omits the generic share-ownership section. Six investigation questions and five risk explanations are specific to ITC.

The numbers slot follows the existing dated standalone segment table. It derives contributions to reported segment results, not product margins or shareholder returns, and explains internal-sales elimination, cigarette tax comparability and subsidiary scope. Source figures are unchanged. Business explanations have their own check date; this does not re-date every catalogue entry. Four original, labelled SVG business illustrations supplement the existing product photographs; the original photographs remain in the shelf.

ITC validation: the full test suite preserves the other 34 profiles, all financial source records and HUL’s rendered primer sections. ITC was checked at 320px, 390px and 768px widths for overflow, links, six research questions and financial figures appearing only at the end. The tax explanation opens correctly.

## Third detailed profile: Nestlé India

`dist/nestle-primer.js` composes with the HUL and ITC primers without modifying them. It explains the product groups, ingredient-to-customer route, retail versus out-of-home channels, demand and pack-size changes, milk/coffee/cocoa costs, food quality, distribution and capacity investment. It keeps the generic share-ownership tutorial out of the company page. Six tailored investigation prompts and five risk explanations precede all reported financial values.

The new financial record in `financial-data.js` uses verified FY 2025–26 standalone revenue from operations and profit after tax, with the annual report's four product-sales groups stored separately. Sales-only groups contain no invented profit or margin. They reconcile to product sales; other operating revenue bridges that total to revenue from operations. The period note explains the older 15-month transition year, and rounded sales shares may sum to 100.01%. India figures are not replaced by global Nestlé margins. Four labelled original SVGs supplement the retained product photos.

Nestlé validation: 320px, 390px and 768px layouts have no overflow or broken jump links. Both financial tables remain in the final learning section, the product-sales table has four rows and no profit column, and the historical-period explanation expands correctly. All earlier financial records were compared with the previous published revision and remain unchanged.


## Fourth detailed profile: Britannia

`dist/britannia-primer.js` extends only Britannia and composes with the earlier HUL, ITC and Nestlé walkthroughs. Products lead: biscuits, bread/cakes/rusk, dairy and adjacent snacks. The page explains brand versus category versus reported Foods segment, the ingredient-to-shop route, pack sizes, consumer demand versus channel shipments, freshness and stock returns, ingredient costs, capacity utilisation and the cheese joint venture. Six investigation prompts and five risks precede the final financial section. The generic share-ownership tutorial is omitted.

The FY 2025–26 consolidated annual report is the primary financial source. Revenue and owners’ profit are shown as group totals, with no invented category profit. The BRSR approximate turnover mix is explicitly distinguished from exact category sales, biscuit-only sales and profit. The report’s consolidated reporting boundary is identified. Geographical revenues include other operating revenue and reconcile to the same group total. The profit explanation reconciles total group PAT to owners’ PAT; the separate Britannia Bel disclosure is an entity-level equity-accounted loss, not a cheese-product margin. Three original, labelled bakery illustrations supplement all retained product photos. Business-source checking does not re-date unrelated existing catalogue claims.

Britannia validation: all 20 automated checks pass, including preservation of the other profiles and earlier financial records, financial reconciliation and signed equity-accounted losses. At 320px, 390px and 768px there is no horizontal overflow, no broken jump target and no failed image. All three tables are inside the final numbers section. Geography and joint-venture disclosures expand correctly, and light/dark layouts were checked with no browser errors.


## Fifth detailed profile: Marico

`dist/marico-primer.js` changes Marico only. It starts with coconut and hair oils, cooking oils and foods, grooming/personal care and international offerings. It explains copra, price/quantity/mix, reduced pack contents, digital-first versus direct sales, actual period revenue versus annualised revenue run-rate, repeat demand, constant currency, acquisitions and Kaya's marketing rights outside clinics. Six tailored questions and five risks precede the figures. The generic ownership tutorial is omitted; all existing shelf assets are retained with clearer references and labels.

The existing verified India/International segment figures are preserved. A product-revenue table from FY 2025–26 consolidated Note 30 (printed pages 434–435) is stored separately and reconciles to the same group revenue, with no category profit estimates. The page warns against adding the two views together. Calculated segment-result-to-sales ratios are labelled separately from reported EBITDA margins. A disclosure traces segment result through finance costs, net unallocated expenditure, tax and non-controlling interests to owners’ profit, using the annual report's management review and accounts.

Marico validation: all 23 automated checks pass. All earlier financial source values are unchanged; only the new Marico product-revenue and reconciliation record is added. At 320px, 390px and 768px there is no horizontal overflow, broken section link or failed image. Both financial tables remain in the final learning section. The profit-reconciliation disclosure and light/dark layouts were checked, with no browser errors.


## Sixth detailed profile: Avenue Supermarts (DMart)

`dist/dmart-primer.js` explains DMart as a retailer: category selection, supplier versus retailer-associated brands, competitive buying and pricing, inventory, checkout collection, operating costs and new-store investment. It distinguishes visit/basket growth from quantity, and existing-store performance from store expansion. It explains store maturity, catchment, sales productivity, property/lease effects and the costs of online fulfilment. Six tailored research questions and five risks precede the figures. The DMart Ready description now reflects location-specific fulfilment rather than implying pick-up is universal, and the old canary offering reference is replaced with a public company page.

The new FY 2025–26 financial snapshot uses the audited consolidated annual column, retaining group PAT rather than silently substituting owners’ PAT. Standalone figures are labelled as overlapping parent scope and never added to group figures or subtracted to invent DMart Ready earnings. The results say there are no separate reportable segments. A calculated PAT-to-revenue example is labelled as neither gross mark-up nor cash after expansion. The dated store-growth explanation preserves the two-years-and-older quarterly definition and qualifies the store count for a location closed for reconstruction.

### Review sequence

Detailed business lessons now cover all 35 companies. The remaining 29, starting with Titan, were individually researched in this release. Completion requires product-first teaching, relevant mechanics, company-specific questions, dated primary sources, numbers-last reporting and responsive verification; adding length alone is not a completion criterion.

DMart validation: all 26 automated checks pass. At 320px, 390px and 768px there is no horizontal overflow, broken section target or failed image; all financial content stays at the end. Parent/group and store-growth disclosures expand correctly. Light/dark themes and phone-width financial cells were inspected with no browser errors. Generic brain icons in Daily Essentials and Dairy/Frozen were replaced with original category-appropriate illustrations; the produce illustration was improved too. New asset paths prevent older cached images appearing, and provenance/alternative text are updated.


## Independent company reviews: Titan and the remaining 28

Authoring lives in `content/company-lessons/{company-id}.json`; `scripts/build-company-lessons.cjs` generates `dist/profile-lessons.js`. The shared `dist/company-lessons.js` renderer composes with the earlier six primers and preserves their content and all existing financial records. Each of these 29 lessons explains offering groups, unfamiliar terms, the customer-to-company operating route, distinctive business mechanisms, five investigation questions, risks, a self-check and final financial interpretation.

Three agents researched separate company sets while the parent reviewed Titan, integrated the batch and checked the combined website. Future agents can own different company JSON files without competing to edit shared rendering code. `content/company-lessons/AGENTS.md` defines the source, scope and review rules. This is a reusable review workflow, not an automatic scheduled refresh.

Corrections include neutral listing labels where exchange admission was not verified; on 31 October 2026 these were replaced for Rentomojo, Tonbo Imaging, Glass Wall Systems and Kanohar with dated NSE listing labels (see the source review below). Lessons also carry a dated distinction between continuing and discontinued Refex activities, and a dated distinction between continuing and discontinued Refex activities. Titan explains gold price versus quantity, inventory funding, reporting definitions and acquisitions. Bank lessons explain provisions, problem loans, capital and liquidity before using them in research prompts. Business-source check dates are distinct from catalogue verification.

Business lessons and financial verification are separate workflows. Following the financial review below, all 35 companies have FY 2025–26 financial snapshots; the original 17 records and their reporting definitions remain unchanged.

Validation: `node --test tests/*.test.cjs` (29 checks) and `node scripts/build-company-lessons.cjs --check`. Browser checks cover all 29 new lessons at 390px and 320px, with representative tablet and desktop checks. The checks cover overflow, section targets, investigation disclosures and financial tables staying in the final learning section. A long-company-name wrapping issue found at 320px was corrected.


## Completing financial coverage for all 35 companies

Eighteen independently maintained snapshots and evidence transcriptions live in `content/financial-reviews/`. Regenerate their checked-in bundle using `node scripts/build-financial-reviews.cjs`; `--check` verifies it is current. The builder rejects attempts to overwrite the original 17 verified snapshots. Primary company, exchange and issuer prospectus documents supply the figures, with exact annual columns, units, reporting scopes and table/page locators. Agents and the parent reviewed original tables, including scanned PDFs, and independently cross-checked the bank/pharma and Bajaj/Airtel records.

Banks label total income explicitly rather than calling it product sales. NTPC, POWERGRID and Bajaj identify other-income-inclusive segment measures and internal eliminations where applicable. Dr. Reddy’s uses external segment revenue and gross profit under IFRS, with later costs and group PAT explained separately. Rentomojo’s material deferred-tax credit is explained beside its PAT. Refex distinguishes continuing and discontinued segments, retains losses and acknowledges the smaller solar activities actually reported by the issuer. BCCL’s policy changes and auditor emphasis matters accompany its totals. No product or brand profits have been invented.

The former pending-verification lesson notes are updated. All actual financial values and interpretations remain in the final Follow the money learning section. Revenue, gross profit, segment PBIT and PAT retain their distinct definitions; company tables do not form a valuation or cash-flow analysis.

Validation: 31 automated checks pass, covering complete 35-company coverage, preservation of the original 17 snapshots, source metadata, signed losses, reconciliation, bank-income terminology and the learning order. Browser checks cover all 18 new financial sections at 320px and 390px, with no overflow or stale pending messages. Financial disclosures and source links are checked in the rendered pages.


## Plain-language company review standard

The repository-root `AGENTS.md` records the permanent editorial standard for existing profiles, new companies and future additions. Assume that a first-time reader may not know the industry. Explain the physical product or actual work before its technical name, who pays and for what, major costs, and the journey from work to billing and customer payment. Define essential technical words locally. Rewrite vague wording instead of adding repeated paragraphs. Preserve company-specific questions and scope boundaries, with actual financial values at the end.

All 35 profiles were reviewed against Refex’s concrete explanation style. The other 28 JSON lessons were simplified independently, the six earlier consumer/retail walkthroughs were checked and refined, and Refex remains the reference. Captions for unfamiliar technical offerings now describe their purpose in everyday language. Verified financial snapshots and existing financial-interpretation notes are preserved. The overview’s next-question prompt uses the actual research question.

Plain-language release validation: all 31 automated checks pass. Browser checks cover all 35 profiles at 390px, including the four overview answers, real next-question prompts, section targets, no horizontal overflow and financial tables only in the final learning section.

## Checking source links

`node scripts/check-sources.cjs` makes a read-only check of every distinct source link in the lessons and earlier profiles and reports links that are missing (404), have moved, fail to load, or refuse automated requests. It never edits content. Add `--tinyfish` with a `TINYFISH_API_KEY` environment variable to retry the failed links through the TinyFish Fetch API and see which can still be read; `--company <lesson-id>` limits the check, `--json <file>` saves the report and `--strict` exits with an error for CI. The key is read only from the environment and is never stored. A reachable link does not prove the page still supports the claim; that still needs a person.

## Source review of 31 October 2026

All 35 profiles have now had a targeted source check, logged in `content/source-reviews/`: `pilot-2026-10-31.json` (HUL, Refex, Rainbow) and `review-2026-10-31-remaining.json` (the other 32). The checks used official company, exchange and regulator pages, read with the TinyFish web tools. Each profile's dated "what has changed" item now cites a recent official development, described in plain words, and its source list was extended. No new financial amounts were added and the verified annual snapshots are unchanged, apart from wording that said listing was unverified for Rentomojo and Tonbo Imaging.

Main corrections: Glass Wall Systems, Kanohar, Rentomojo and Tonbo Imaging now show their NSE listing dates (16, 16 and 17 September and 23 October 2026), and Bharat Coking Coal's listing is confirmed. The dates for the first three come from the companies' own exchange filings, because the NSE quote pages would not load; Tonbo's was read from NSE. Reliance's lesson covers the 28 October 2026 listing of Jio Platforms, Swiggy's lesson covers its sale of Lynks Logistics, and L&T, Sun Pharma and ITC describe pending transactions as pending.

Limits: Nestlé India could not be read (website blocked automated requests) and keeps its earlier review date. Several official PDFs for Infosys, Reliance and DMart could not be read, and the visible source notes on the ITC, Britannia, Marico and DMart primers still say they were checked on 29 October 2026. Open items are a Park Medi World income-tax inspection notice (October 2026) that the lesson does not yet mention, a new DMart subsidiary and a Swiggy food-safety order about its Toing app. These checks are targeted, not an exhaustive filing review, and there is still no automatic refresh.

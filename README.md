# Company Notebook

Mobile-friendly research prototype for Indian stock-market beginners.

## Run

Serve `dist/` with a local HTTP server. No build or dependency installation is required.
The entrypoint loads `data.js`, `company-expansion.js`, `overviews.js`, `product-images.js`, `gallery.js`, `financial-data.js`, `financials.js`, `research-guides.js`, `app.js` and `style.css`. Navigation uses hash routes,
so company links work on static hosting. `.openai/hosting.json` retains the Sites project identity.

## Live website

GitHub Pages publishes `dist/` automatically after each push to `main`:
[srk-works.github.io/company-notebook](https://srk-works.github.io/company-notebook/)

## Features

- Product-first company pages: the visual shelf appears immediately after the company header, followed by the one-minute overview, ownership context and deeper research. The business description appears once; the ownership section explains the listed entity rather than repeating the overview.
- A one-minute overview on all 35 profiles: activities, paying customers, earnings, profit drivers and a next research question. Summaries reuse existing sourced explanations; customer and profit-driver copy lives in `dist/overviews.js`.
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

Financial figures checked on 29 October 2026 are stored separately in `dist/financial-data.js` and rendered by `dist/financials.js`.
The current release contains 14 verified snapshots, all for FY 2025–26:
- Eleven profiles have business/segment disclosures: HUL, ITC, Reliance, Mahindra & Mahindra, L&T, Infosys, Titan, Swiggy, Marico, Eternal and TCS. TCS shows reported margins rather than reverse-calculated profit amounts. Reliance shows selected business highlights, not a complete group reconciliation.
- Park Medi World reports one healthcare segment. Glass Wall Systems and Kanohar show verified company totals, explicitly not product-level allocations.
- The other 21 profiles explicitly await financial verification. Missing verification must never be labelled as a company not disclosing information.

Every snapshot records reporting scope, source, table/page locator, profit definition, review date and reconciliation notes. ₹ million is divided by 10 and ₹ lakh by 100 where needed to present ₹ crore. Negative results retain a minus sign and a loss label. Revenue and profit amount bars use the same amount scale; margin bars use a separate 0–100% scale. Source figures are rounded only for display. ITC's independently rounded revenue rows differ from its reported subtotal by ₹1 crore; this is recorded and explained rather than silently adjusted.
The former HUL partial percentage chart has been removed; its replacement covers the consolidated continuing-operation revenue and segment results from the annual report. These snapshots are historical annual disclosures, not current-quarter or live figures. Reviewing financial figures does not update the review date of unrelated company claims.

Research updates are curated references, not an exhaustive or live announcements feed.
Each profile has a visual shelf of selected offerings, with product photos, brand imagery and explicitly labelled original service illustrations. The full curated text list remains in an expandable section. These are not comprehensive catalogues or live inventory. Image provenance is recorded in `dist/assets/products/sources.json`.

No accounts or central database are present. Browser storage is local to each origin
and device; local-preview and hosted bookmarks do not migrate automatically.
Feedback must be exported by a pilot participant and shared separately.

## Validation performed

- Financial UI: all 35 phone-width profiles render either one verified table (14) or an explicit pending state (21); no horizontal overflow or broken section targets. Desktop loss labels and expandable measurement notes were checked, with no console errors.
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

Review the three seed profiles with beginners, extend verified segment financials,
then decide on shared feedback storage and editorial update tooling. Review image reuse permissions before commercial expansion.

## Beginner learning sequence

Company pages show products first, then the one-minute overview, ownership and business mechanics, offering details, company-specific investigation questions, risks and research context. The self-check precedes the final learning section, Follow the money; original sources and feedback follow it. The four-step path and desktop contents mirror this order.

`dist/research-guides.js` supplies three editorial investigation instructions per company. They explain what to compare and what evidence to seek, not a finding that the business is doing well or a claim that every metric is disclosed. They are revealed on demand to keep the first read short. The final numbers section explicitly identifies cash flow, debt and valuation as work still to do. The overview’s opening explanation is not repeated in the business mechanics.

Run `node --test tests/*.test.cjs` to check disclosure handling and the learning sequence across all 35 profiles.

Learning sequence validation: all 35 profiles passed phone-width checks for section order, three investigation disclosures, valid jump links and no horizontal overflow. Desktop and phone interactions were checked on Glass Wall Systems and HDFC Bank.

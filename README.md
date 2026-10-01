# Company Notebook

Mobile-friendly research prototype for Indian stock-market beginners.

## Run

Serve `dist/` with a local HTTP server. No build or dependency installation is required.
The entrypoint loads `data.js`, `app.js` and `style.css`. Navigation uses hash routes,
so company links work on static hosting. `.openai/hosting.json` retains the Sites project identity.

## Features

- Twenty-four company profiles, company/brand/ticker search and business-type filters.
- Device-local saved reading list, source references, business-model explanations,
  risks and self-check questions.
- Starter guide and glossary.
- Local feedback, correction notes, coverage requests and JSON export for pilot sessions.
- Device-local reading events: opening and completing profiles, revealing explanations and bookmarks.
- Feature-detected WebMCP tools `list_companies` and `set_reading_list`.

## Editorial boundaries

Sources were inspected during 15–18 September 2026. No data refresh runs automatically.
Company disclosures and product directories support business facts; watch items,
risks and learning explanations are editorial interpretation. This is not stock advice.
All profile sources are stored with the record in `dist/data.js`.

HUL includes selected FY 2025–26 segment contributions sourced from its official
performance highlights. They total 97% as displayed, are explicitly marked partial,
and are not interpreted as brand-level shares. Other profiles intentionally display
that verified revenue splits have not been added. Older documents are labelled by period.
Research updates are curated references, not an exhaustive or live announcements feed.
Product cards are text-based selected offerings, not comprehensive catalogues or live inventory.

No accounts or central database are present. Browser storage is local to each origin
and device; local-preview and hosted bookmarks do not migrate automatically.
Feedback must be exported by a pilot participant and shared separately.

## Validation performed

- JavaScript syntax and all 24 records checked for required fields, counts and source URL shape.
- Browser search by brand, profile navigation, empty search and coverage form.
- Bookmarks persist across reload and removal updates the saved list.
- Feedback controls and export availability; no browser console errors observed.
- Phone viewport at 390px: explorer and banking profile have no horizontal overflow.
- WebMCP registration, valid read/write, invalid company rejection and state read-back.

## Next iteration

Review the three seed profiles with beginners, extend verified segment financials,
then decide on shared feedback storage, editorial update tooling and image rights.

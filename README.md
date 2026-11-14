# Company Notebook

A mobile-friendly site that explains Indian listed companies to people starting to invest. Each company page starts with things you can recognise (products, services, photos), says who pays the company and for what, shows how the work turns into a bill, weighs what helps and what could hurt, and only then shows checked financial figures and the original sources. It is for learning, not stock advice.

Live: [srk-works.github.io/company-notebook](https://srk-works.github.io/company-notebook/). GitHub Pages publishes `dist/` after every push to `main`. Pages are cached for up to 10 minutes, so a hard refresh may be needed after a release.

## Run it locally

Run `npm run serve` (or `npm run build`, then serve `dist/` with any static server) and open http://localhost:8765. The build creates three bundles from `content/`; they are not stored in git, so it must run once before the site works locally. The site itself installs nothing. Navigation uses hash routes (`#/company/<id>`), so links work on static hosting.

## How it fits together

Authors edit one set of files per company. Build scripts turn them into the bundles the site loads.

| You edit | It holds | Build | Site file |
|---|---|---|---|
| `content/companies/<id>.json` | Name, ticker, sector, colours, logo, product list, offering cards (pictures), extra sources | `node scripts/build-company-data.cjs` | `dist/company-data.js` |
| `content/company-lessons/<id>.json` | The explanation: quick answers, steps, what helps and hurts, deeper sections, sources, figure notes | `node scripts/build-company-lessons.cjs` | `dist/profile-lessons.js` |
| `content/financial-reviews/<id>.json` (+ `.evidence.md`) | A verified annual financial snapshot and the transcription it came from | `node scripts/build-financial-reviews.cjs` | `dist/financial-expansion.js` |

`npm run build` runs all three. The bundles are git-ignored: `npm test` and the deploy build them fresh, so separate changes never collide in a generated file. The deploy also replaces `?v=dev` in `dist/index.html` with the commit id, so browsers fetch new files after each release. Every pull request runs the tests and the lesson checker automatically.

Hand-written site files in `dist/`:
- `app.js`: the home page, search and filters, reading list, starter guide, theme switch, feedback and routing.
- `short-profile.js`: the company page.
- `company-lessons.js`: copies each lesson's summary, products and sources onto its company, for cards and search.
- `gallery.js`: the scrolling product picture shelf.
- `financials.js` (draws every financial table from the generated `financial-expansion.js`).
- `figure-walkthroughs.js`: plain-language walkthroughs of the figures for HUL, ITC, Nestlé India, Britannia, Marico and DMart.
- `style.css`: all styling. Every colour is a token at the end of the file, and dark mode only redefines those tokens.

## The company page

Every company has a lesson and the same page: photos (a mosaic when the company has at least five) or the product shelf, four quick answers, how the work moves (`steps`, under an optional `stepsTitle`), what helps and what could hurt, then the figures and the sources. Everything else in the lesson (service groups, words worth knowing, what makes the business different, risks, what to check next, the latest development, any made-up example and the full product list) sits under "Go deeper", collapsed. A made-up example is always labelled "Illustration · made-up numbers, not the company’s figures".

The format is defined once in `content/lesson-template/template.json`: the sections, what each answers for a beginner, size limits and the rules (money amounts only in `financialNotes`, https sources, a dated check). `node scripts/check-lessons.cjs [company…]` checks lessons against it. Errors block publishing; warnings (for example an abbreviation used without a definition) need a person to read them.

The writing standard for every company is in `AGENTS.md`; lesson and financial review rules are in `content/company-lessons/AGENTS.md` and `content/financial-reviews/AGENTS.md`.

## Adding a company

1. Create `content/companies/<id>.json` (identity and offering cards) and run `node scripts/build-company-data.cjs`.
2. Draft the lesson from official sources (below), have a person review it, and publish it.
3. Run `node scripts/build-company-lessons.cjs` and `npm test`.
4. Financial figures are a separate review in `content/financial-reviews/`. Until one exists, the page shows an explicit "awaiting verification" state and never invents figures.

### Drafting a lesson

Drafts live in `content/drafts/`, which is git-ignored. A person approves each draft before it goes live.

1. **See the size, free:** `node scripts/draft-lesson.cjs <id> --source <https link> --source <https link> --dry-run`. Give at least two sources, a company or exchange document first.
2. **Draft (paid API call):** the same command without `--dry-run`, with `ANTHROPIC_API_KEY` set (see `.env.example`). It saves `content/drafts/<id>.json` with status `needs-review`.
3. **Review:** the draft holds the lesson, the checker result and an evidence list: each claim with its source link and a quote. Quotes from web pages are checked automatically; quotes from PDFs are marked "to check by hand" unless you pass extracted text with `--pdf-text <pdf link>=<text file>`.
4. **Publish:** `node scripts/publish-draft.cjs <id>` shows the result; add `--approve` to move the lesson into `content/company-lessons/`. It refuses if the checker finds errors.

Without an API key, a Claude Code session can write the draft: `--dump-sources work/<id>` saves the source text, the session writes its answer to a JSON file, and `--answer <file>` runs every check and saves the draft the same way. If a page blocks automated readers and `TINYFISH_API_KEY` is set, the script retries through TinyFish (`--no-tinyfish` turns that off). The drafting script needs `npm install`; the site and every other script need nothing.

## Financial figures

Most companies have a verified FY 2025–26 snapshot; IREDA, HCG, Fredun Pharmaceuticals, Milky Mist, HFCL and Genus Power show the pending state. Each snapshot records its reporting scope (standalone or consolidated), source, table and page, profit definition, review date and reconciliation notes. ₹ million is divided by 10 and ₹ lakh by 100 to show ₹ crore. Losses keep a minus sign and a label. Company totals never imply a brand or product profit, and a sales split never becomes a profit split. These are historical annual disclosures, not live figures.

## Keeping figures current

A weekly GitHub Action (`.github/workflows/watch-results.yml`) runs `scripts/watch-results.cjs`. It does two things and never changes any file or merges anything.

1. **Date rules, no network.** For each snapshot in `content/financial-reviews/` it reads the period, works out the next annual period, and applies the Indian rule: audited full-year results are due within 60 days of year end, and the annual report usually follows by the AGM, so a company is called overdue after about 150 days. States are `current`, `results due` and `overdue`. The rules live in `scripts/lib/results-calendar.cjs` (today's date is passed in, so they are unit tested). A period the script cannot read is reported as a warning.
2. **Exchange check, best effort.** Once a company's year has ended, `scripts/lib/exchange-check.cjs` asks NSE for a results announcement using a plain `company-notebook-results-watcher` User-Agent. The exchanges often refuse automated requests, so any failure is reported as `unknown` and never fails the run. Treat this as a bonus, not a guarantee; the date rules are what the watcher relies on.

For each company that is due, overdue or found filed, it opens one issue titled `Update figures: <Company> (<next period>)` with the label `figures-update`. It searches open and closed issues by exact title first, so a period is never raised twice, and it opens at most 10 new issues per run. A summary table of every company goes to the Actions job summary.

Try it locally (no GitHub calls, opens nothing): `node scripts/watch-results.cjs --dry-run`, optionally with `--today=2027-06-15` to see what a later date would raise. The workflow can also be started by hand from the Actions tab; leave `dry_run` ticked to print only.

To process the issues, ask the figures-verifier agent to handle the open `figures-update` issues. It updates the snapshot, evidence file and the lesson's `financialNotes`, and its pull request closes the issue.

## Checks

- `npm test`: data, lessons, the company page, figure walkthroughs, financial records, the drafting step, source checking and design tokens.
- `node scripts/check-lessons.cjs`: every lesson against the template.
- `node scripts/check-sources.cjs`: a read-only check of every source link (missing, moved, failing or refusing automated requests). `--tinyfish` retries failures through TinyFish, `--company <id>` limits the check, `--json <file>` saves a report and `--strict` exits with an error for CI. A link that loads does not prove the page still supports the claim.

## Other features

- Search across company names, aliases, tickers and products; filters by business type.
- A reading list stored on the device.
- Light and dark themes that follow the system setting, with a saved manual choice.
- A starter guide: five questions to ask about any business.
- Local feedback, correction notes and coverage requests, with a JSON export for pilot sessions. There are no accounts and no central database.
- Browser-assistant tools `list_companies` and `set_reading_list` where the browser supports them.

## Known limits

- Nothing refreshes automatically. Source reviews are logged in `content/source-reviews/`, with open items in `content/source-reviews/follow-ups.json`.
- Photo and image reuse permission has not been reviewed. Image provenance is in `dist/assets/products/sources.json`.
- The quick answers, helps and hurts for 36 companies were rewritten on 11 November 2026 from each lesson's own checked sections, and the ITC, Nestlé India, Britannia, Marico and DMart lessons were rebuilt from their earlier checked pages. No person has read them yet.
- Nestlé India's website blocks automated reading, so its sources were last read on 29 October 2026.
- The lesson checker still reports 38 warnings, mostly abbreviations used before they are defined. They need a content pass.

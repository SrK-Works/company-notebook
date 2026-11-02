# Company Notebook: data plan notes (2 November 2026)

A plain-language summary of the conversation about making the notebook scale and stay up to date. Written to be read later by someone new to building software.

## 1. Where we started

- 41 company profiles, each with a one-minute overview and a beginner lesson. 35 have verified yearly financial figures. 6 (IREDA, HCG, Fredun, Milky Mist, HFCL, Genus Power) show "verification pending".
- Open items: financials for those 6, a Park Medi World tax-verification follow-up, Nestlé India sources to re-read by hand, results re-checks after July to September 2026, tests with real beginners, image permissions.

## 2. Your goal

- The site should grow to hundreds or thousands of listed companies and stay up to date, with an update run at least every week.
- Core aim: help a beginner understand a business without complication.
- You do not want numbers and charts like Tijori Finance. It was only a reference for how such a site is built.

## 3. The problem found

Company information was spread over many hand-edited files, and some text was stored twice. A read-only inventory showed:

- Core company data lived in hand-edited JavaScript inside `dist/` (`data.js`, `company-expansion.js`, `product-images.js`).
- For 29 of the 35 lesson companies, the older text in those files was replaced by the lesson text when the page loaded, so it never showed but still sat in the files.
- Six deep-dive pages (HUL, ITC, Nestlé, Britannia, Marico, DMart) are hand-written code, not data.
- At about 1,000 companies, loading all data in the browser would be around 17 MB per visit, far too slow.

## 4. The plan agreed

Split information by how fast it changes:

| Layer | Examples | Changes | Who updates it |
|---|---|---|---|
| Explanation | What it does, who pays, risks, quiz | Rarely | Drafted from a template, checked, reviewed |
| Facts | Results by period, listing status, offering cards | Every quarter or when a product launches | Weekly job |
| Sources | Filing links, date checked | Every run | The job |

Weekly flow: fetch filings, extract numbers, validate, then publish clean facts automatically. Anything that changes what the business is goes to a person as a review flag.

Past about 100 to 150 companies, move identity and facts into a database and load one company per page. A small API comes in the phase after the current one.

You also clarified that the existing lessons were AI-generated from your instructions, not hand-written. So new companies should follow one fixed template, be drafted from primary sources, pass an automatic checker, and be reviewed by you before going live.

## 5. What has been done

**Phase 1: one file per company (done).** `content/companies/<company>.json` holds each company's base record and offering cards. `node scripts/build-company-data.cjs` generates `dist/company-data.js`. The three old hand-edited files were deleted. I checked that every data set the page loads is identical before and after.

**Phase 2: remove duplicate text (done).** For the 35 companies with a lesson, eight explanation fields were removed from the company file, about 73,000 characters. The lesson is now the only home of that text. A test stops it coming back. The six companies without a lesson keep their text in the company file.

**Phase 3 part 1: lesson template and checker (done).**
- `content/lesson-template/template.json` defines the one lesson format: 16 sections, what each answers for a beginner, size limits and rules.
- `scripts/check-lessons.cjs` reports errors that block publishing and warnings that need a person to read them.
- All 35 current lessons pass with no errors. 38 warnings remain in 21 lessons, such as EBITDA, DISCOM, EPC, NPA and IPO used without a definition.
- The test suite grew from 39 to 52 tests, and all pass.

**Not committed.** Phases 1, 2 and 3 are saved in the working folder but not committed to git. The branch is also one commit ahead of the remote.

## 6. Questions you asked, and the answers

- **Is it all JSON files at big sites?** No. Large sites keep text in a database, with templates in the code. Smaller content sites use files such as Markdown or JSON. Many use a mix. Our current layout is the files kind.
- **Tijori's likely setup (inferred from public page code):** server-built pages from templates, a Python (Django-style) app, one page per topic per company, and a versioned data API. We keep ours static instead, so no server is needed yet.
- **Will we still end up with thousands of files?** Yes, and the bigger problem is page weight. So identity and facts move to a database later, and lessons stay as files.
- **Sitecore:** an enterprise CMS, a commercial product. It could give us templates, approvals and a delivery API, but it is too heavy and costly for now. A lighter option such as Sanity, Strapi or Payload fits better if non-technical editors join.
- **Your friend's tip:** her client keeps banner and promo text in JSON files and edits them without touching code, and said the tool is free and open source. That matches our setup. She was unsure of the tool's name, and Sitecore is not free as far as I know. Free tools that fit her description include Decap CMS and TinaCMS, which edit files in git through a web form.

## 7. Next steps

1. Drafting step: you name a company, it gathers primary sources and fills the lesson template, the checker validates it, and you review before it goes live.
2. Fix the 38 checker warnings in existing lessons, or start with a clean checker first.
3. Facts layer: dated results per company with source and checked date, written by the weekly job. The 6 companies without financials are the first test.
4. Weekly job and review queue, then the small API.
5. Optional trial: Decap CMS on one company, to see a web form saving into the same JSON file.
6. Commit phases 1, 2 and 3 as separate commits, so there is a safe point to return to.
7. Still open from before: an intermittent "awaiting verification" flicker on some financial panels, which was already in the site and has not been investigated.

## 8. Where things are

| What | Where |
|---|---|
| Company records and offering cards | `content/companies/` |
| Lessons | `content/company-lessons/` |
| Lesson format and rules | `content/lesson-template/template.json` |
| Lesson checker | `scripts/check-lessons.cjs` |
| Build scripts | `scripts/build-company-data.cjs`, `scripts/build-company-lessons.cjs` |
| Generated bundles (not edited by hand) | `dist/company-data.js`, `dist/profile-lessons.js` |
| Diagram page made in this chat | https://claude.ai/artifact/HxVWSDStFR2Fk2S4fiC1rc |
| Run all checks | `node --test tests/` |

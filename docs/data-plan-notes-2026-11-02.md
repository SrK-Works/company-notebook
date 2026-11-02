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
5. Convert the six primers to normal lessons (see section 9).
6. Optional trial: Decap CMS on one company, to see a web form saving into the same JSON file.
7. Phases 1, 2 and 3 are committed separately on the branch `data-layer-phases-1-3` and open as pull request 1.
8. Still open from before: an intermittent "awaiting verification" flicker on some financial panels, which was already in the site and has not been investigated.

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

## 9. Primer conversion (added to the plan)

**What the primers are.** HUL, ITC, Nestlé India, Britannia, Marico and DMart each have a hand-written deep-dive file in `dist/` (`hul-primer.js` and the other five). The text and the page-drawing code are mixed together, and each file replaces the standard business section of its page. These six are the only companies with no lesson file.

**Why convert them.** A weekly job and the lesson checker can only work on data, not on text buried in code. Converting them lets all 41 companies run the same way, and it lets us delete the primer code and the chain that loads them.

**How, one company at a time.**
1. Write the company's lesson with the template, keeping the best material from its primer: the plain explanations, the local definitions, the worked examples and the company-specific questions and risks.
2. Run `node scripts/check-lessons.cjs <company>` and fix every error.
3. Move any text still live in the company file into the lesson, then remove it from the file. The phase 2 test already fails if the same text appears in both.
4. Check the page looks the same or better, with nothing lost that was verified (financial tables, sources and dates stay).
5. When all six are done, delete the six primer files and their `index.html` entries.

**Design decision (made 2 November 2026).** The primers use fictional worked examples with made-up prices, but the template allowed money amounts only in `financialNotes`. We chose to add an optional, labelled `illustration` section to the template: one to three worked examples with made-up numbers. The checker accepts amounts there only if the item says in its own words that it is fictional or illustrative, and it still rejects amounts anywhere else. The lesson page does not draw this section yet, so the renderer needs a small change when the first primer (HUL) is converted.

**Order.** Start with HUL, which has the fullest primer, so the template is tested on the hardest case first.

## 10. Growth plan: nearly every listed company, beginners first (added 2 November 2026)

**Goal.** Add almost every listed company over time, slowly, with beginners as the priority, on one clean code and file structure.

**Primers are legacy.** They are the first six deep dives, written as custom code before the lesson template existed. They are kept only because they work. In the finished app no company has a primer: every company uses the same template and the same page code. Adding a company means adding data, never new page code.

**Order of adding companies.**
1. Household names, the Nifty 50, because a newcomer already knows them from daily life.
2. The next 100 to 500 by size.
3. Everything else, gradually, grouped by sector so a beginner can compare similar businesses.

**Depth by tier.** A full lesson for every listed company is not realistic at the start, so each company sits in a labelled tier and moves up as it is drafted and reviewed.

| Tier | What the page has | Who it is for |
|---|---|---|
| 1. Full lesson | The whole template: what it does, who pays, costs, steps, risks, research questions | Early-list companies, reviewed by you |
| 2. Starter page | A short plain description, labelled "not yet reviewed", plus dated facts and source links | Companies waiting for a full lesson |
| 3. Listing only | Name, sector and links to official filings | The long tail, so nothing is missing |

A beginner is never shown a page that looks more reliable than it is, because every tier is labelled.

**Target file structure.**
```
content/
  companies/<company>.json        identity and offering cards (exists)
  company-lessons/<company>.json  Tier 1 lessons (exists)
  lesson-template/template.json   the one lesson format (exists)
  starters/<company>.json         Tier 2 drafts (next)
  facts/                          dated results, written by the weekly job (later; a database at scale)
scripts/
  check-lessons.cjs               checks a lesson against the template (exists)
  build-*.cjs                     generate the bundles, never edited by hand (exists)
  draft-lesson.cjs                drafts a new company from sources (next)
```

**Order of work from here.**
1. Merge pull request 1.
2. Build the drafting step for new companies, with a review gate before anything goes live.
3. Add the Nifty 50 companies we do not yet cover, one batch at a time.
4. Convert the six primers, using HUL to test the `illustration` section.
5. Build the facts layer and weekly job, then the database and API as the list grows.

**One pipeline.** Name a company, draft it, check it, review it, publish it, and keep it fresh. Each step is a script, so the same path works for the first company and the thousandth.

## 11. Drafting step (built 2 November 2026)

`scripts/draft-lesson.cjs` takes a company that already has an identity file plus two or more https sources, and asks `claude-opus-5-5` to fill the lesson template. The answer comes back in a fixed format; the script converts it to the lesson shape, stamps today's date, rejects any source link that was not provided, runs the lesson checker, and checks each evidence quote against the page text. The result goes to `content/drafts/<company>.json` with status `needs-review`, and `scripts/publish-draft.cjs <company> --approve` is the review gate. Fake-model tests cover the request, refusals, invented links, overwriting and the gate. No live call has been made yet; it needs an API key and your approval of the cost.

**Not built yet:** creating a new company's identity file and offering cards automatically, finding the sources for you, PDF text checking, and running it for batches of companies.

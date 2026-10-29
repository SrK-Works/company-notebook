# Verified financial reviews

Each company has an independently authored JSON snapshot and a matching `.evidence.md` numerical transcription with primary-source URLs and page/table locators. Different agents may own different company files. Do not edit shared rendering code, generated files, or another agent's records.

Use audited full-year primary company/exchange disclosures, including restated audited figures in a prospectus where appropriate. Prefer the latest accessible annual period; explicitly identify older periods rather than inventing current figures. Verify the annual column, units, reporting scope and earnings definition. A prospectus does not establish exchange admission.

Preserve the existing snapshot schema in `dist/financial-data.js`. Segment rows must use the same disclosed revenue and earnings basis. Explain intersegment sales, unallocated costs and discontinued operations. Otherwise show clearly labelled whole-company/group totals. Never infer brand profit from sales shares or turn rounded margins into profit amounts. Keep losses signed. For banks, use `revenueLabel: "Total income"` and an `incomeDefinition` explaining the measure, rather than describing bank income as product sales. Separate group PAT from profit attributable to owners.

The parent reviewer integrates the files with `node scripts/build-financial-reviews.cjs`, validates evidence and reconciliation, checks browser layouts and publishes. Existing 17 financial snapshots remain unchanged. All financial figures and interpretations must stay in the final learning section of each company page.

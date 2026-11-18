'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');
const { validateRecord } = require('../scripts/lib/quarterly-records.cjs');
const { reviewQueue } = require('../scripts/watch-quarters.cjs');

const context = vm.createContext({ Intl });
context.window = context;
for (const name of ['company-data', 'profile-lessons', 'gallery', 'financial-expansion', 'financials',
  'quarterly-results', 'quarterly', 'short-profile']) {
  vm.runInContext(fs.readFileSync(`dist/${name}.js`, 'utf8'), context);
}
const record = context.QUARTERLY_RESULTS['refex-industries'];
const helpers = { safe: String, mono: () => '', saveButton: () => '', profileSources: () => [] };

test('quarterly records require the same quarter last year, a filing and finite amounts', () => {
  const check = patch => validateRecord({ ...record, ...patch }, '2026-09-30');
  assert.deepEqual(check({}), []);
  assert.match(check({ comparisonEnd: '2026-06-30' }).join(), /same quarter/);
  assert.match(check({ filedOn: '2026-09-29' }).join(), /dates must be in order/);
  assert.match(check({ sources: [{ ...record.sources[0], url: 'javascript:alert()' }] }).join(), /HTTPS/);
  assert.match(check({ metrics: [{ ...record.metrics[0], current: '761' }, record.metrics[1]] }).join(), /signed values/);
});

test('a quarterly card appears after the business lesson and before separately labelled annual figures', () => {
  const company = context.COMPANIES.find(company => company.id === 'refex-industries');
  const html = context.shortProfile.render(company, helpers);
  assert.ok(html.indexOf('id="money"') < html.indexOf('id="quarterly"'));
  assert.ok(html.indexOf('id="quarterly"') < html.indexOf('id="financials"'));
  assert.match(html, /Quarter ended 30 September 2026/);
  assert.match(html, /30 September 2025/);
  assert.match(html, /761\.32/); // INR lakh → INR crore
  assert.match(html, /Full-year figures/);
  const rainbow = context.COMPANIES.find(company => company.id === 'rainbow-childrens-medicare');
  assert.match(context.companyQuarterly.render(rainbow, String), /548\.02/); // INR million → INR crore
  const unreviewed = context.COMPANIES.find(company => company.id === 'marico');
  assert.ok(!context.shortProfile.render(unreviewed, helpers).includes('id="quarterly"'));
});

test('the review queue tracks the requested quarter by company without marking unseen filings verified', () => {
  const companies = [
    { id: 'acme', name: 'Acme', ticker: 'ACME' },
    { id: 'private', name: 'Private', ticker: 'PRIVATE', listingLabel: 'Listing unverified' },
  ];
  const quarterly = { acme: [record] };
  const [seen, privateCompany] = reviewQueue(companies, quarterly, record.periodEnd);
  assert.equal(seen.status, 'verified');
  assert.equal(seen.filing, record.sources[0].url);
  assert.match(seen.exchange, /symbol=ACME$/);
  assert.equal(privateCompany.status, 'needs review');
  assert.equal(privateCompany.exchange, null);
  assert.equal(reviewQueue(companies, quarterly, '2026-12-31')[0].status, 'needs review');
});

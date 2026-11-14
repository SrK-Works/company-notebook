'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { issueTitle, issueBody, summaryTable } = require('../scripts/lib/figures-issue.cjs');
const { findResults } = require('../scripts/lib/exchange-check.cjs');

const row = {
  id: 'acme', name: 'Acme', ticker: 'ACME', currentPeriod: 'FY 2025–26 · year ended 31 March 2026',
  nextPeriod: 'FY 2026–27 · year ended 31 March 2027', dueDate: '2027-05-30', overdueDate: '2027-08-28',
  state: 'results due', reason: 'audited results should have been filed.', investorPage: 'https://example.com/ir', source: 'https://example.com/r.pdf',
};

test('issue title is stable so duplicates can be found by exact match', () => {
  assert.equal(issueTitle(row), 'Update figures: Acme (FY 2026–27 · year ended 31 March 2027)');
});

test('issue body tells the verifier what to do', () => {
  const body = issueBody(row);
  for (const text of ['`acme`', '2027-05-30', 'ACME', 'https://example.com/ir', 'content/financial-reviews/acme.json',
    'content/company-lessons/acme.json', 'npm test', 'check-lessons', 'Closes #']) {
    assert.ok(body.includes(text), text);
  }
});

test('summary table lists every company, including warnings', () => {
  const table = summaryTable([row, { name: 'Odd', warning: 'cannot read the period "x"' }], '2026-11-14');
  assert.ok(table.includes('| Acme | FY 2025–26'));
  assert.ok(table.includes('| Odd | warning'));
});

test('exchange announcements: filed, not found, or unknown on a changed format', () => {
  const since = new Date('2027-03-31T00:00:00Z');
  const filed = [{ desc: 'Financial Results for year ended March 31, 2027', an_dt: '2027-05-10 16:00:00' }];
  const old = [{ desc: 'Financial Results', an_dt: '2026-05-10 16:00:00' }];
  assert.equal(findResults(filed, since), 'filed');
  assert.equal(findResults(old, since), 'not found');
  assert.equal(findResults({ error: 'x' }, since), 'unknown');
  assert.equal(findResults(null, since), 'unknown');
});

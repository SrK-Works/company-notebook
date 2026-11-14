'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { parseYearEnd, nextYearEnd, periodLabel, assess } = require('../scripts/lib/results-calendar.cjs');

const d = (s) => new Date(`${s}T00:00:00Z`);
const day = (date) => date.toISOString().slice(0, 10);

test('parses year ends for March, June, September and December', () => {
  assert.equal(day(parseYearEnd('FY 2025–26 · year ended 31 March 2026')), '2026-03-31');
  assert.equal(day(parseYearEnd('Year ended 30 June 2026')), '2026-06-30');
  assert.equal(day(parseYearEnd('year ended 30 September 2025')), '2025-09-30');
  assert.equal(day(parseYearEnd('year ended 31 December 2025')), '2025-12-31');
});

test('unparseable or impossible text gives null', () => {
  for (const text of ['', undefined, 'FY 2025–26', 'year ended 31 Smarch 2026', 'year ended 31 April 2026', 'year ended 29 February 2025']) {
    assert.equal(parseYearEnd(text), null);
    assert.equal(assess(text, d('2026-11-14')), null);
  }
});

test('month-ends stay month-ends across leap years', () => {
  assert.equal(day(nextYearEnd(d('2027-02-28'))), '2028-02-29');
  assert.equal(day(nextYearEnd(d('2028-02-29'))), '2029-02-28');
  assert.equal(day(nextYearEnd(d('2026-03-31'))), '2027-03-31');
});

test('period labels: Indian financial year for March, plain date otherwise', () => {
  assert.equal(periodLabel(d('2027-03-31')), 'FY 2026–27 · year ended 31 March 2027');
  assert.equal(periodLabel(d('2026-12-31')), 'year ended 31 December 2026');
});

test('March year end: current, results due after 60 days, overdue after 150', () => {
  const p = 'FY 2025–26 · year ended 31 March 2026';
  const now = assess(p, d('2026-11-14'));
  assert.equal(now.state, 'current');
  assert.equal(now.periodEnded, false);
  assert.equal(now.nextPeriod, 'FY 2026–27 · year ended 31 March 2027');
  assert.equal(now.dueDate, '2027-05-30');
  assert.equal(now.overdueDate, '2027-08-28');
  const april = assess(p, d('2027-04-15'));
  assert.equal(april.state, 'current');
  assert.equal(april.periodEnded, true);
  assert.equal(assess(p, d('2027-05-30')).state, 'current');
  assert.equal(assess(p, d('2027-05-31')).state, 'results due');
  assert.equal(assess(p, d('2027-08-28')).state, 'results due');
  assert.equal(assess(p, d('2027-08-29')).state, 'overdue');
});

test('June, September and December year ends', () => {
  const june = assess('year ended 30 June 2026', d('2026-11-14'));
  assert.equal(june.nextPeriod, 'year ended 30 June 2027');
  assert.equal(june.dueDate, '2027-08-29');
  const sep = assess('year ended 30 September 2025', d('2026-11-14'));
  assert.equal(sep.state, 'current'); // year ended 30 Sep 2026; 60 days run to 29 Nov 2026
  assert.equal(sep.periodEnded, true);
  assert.equal(assess('year ended 30 September 2025', d('2026-11-30')).state, 'results due');
  const dec = assess('year ended 31 December 2025', d('2027-03-02'));
  assert.equal(dec.dueDate, '2027-03-01');
  assert.equal(dec.state, 'results due');
});

test('leap year: a February year end counts real days', () => {
  const p = 'year ended 28 February 2027';
  const a = assess(p, d('2028-04-29'));
  assert.equal(a.nextYearEnd, '2028-02-29');
  assert.equal(a.dueDate, '2028-04-29');
  assert.equal(a.state, 'current');
  assert.equal(assess(p, d('2028-04-30')).state, 'results due');
});

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { extractUrls, collectSources, classifyDirect, classifyTinyfish } = require('../scripts/check-sources.cjs');

test('extractUrls keeps source pages and drops images, fonts and trailing punctuation', () => {
  const text = `see 'https://example.com/report.pdf', and "https://www.w3.org/2000/svg" plus https://cdn.example.com/a.PNG?x=1 and (https://example.com/a?b=1&amp;c=2) and https://example.com/Report_(FY26).pdf.`;
  assert.deepEqual(extractUrls(text), ['https://example.com/report.pdf', 'https://example.com/a?b=1&c=2', 'https://example.com/Report_(FY26).pdf']);
});

test('collectSources scopes lesson, catalogue and financial links to the requested company', () => {
  const uses = collectSources(path.resolve(__dirname, '..'), ['tcs']);
  assert.ok(uses.size >= 2);
  const places = new Set([...uses.values()].flatMap(s => [...s]));
  assert.ok(places.has('lesson:tcs'));
  assert.ok(places.has('annual:tcs'));
  assert.ok(places.has('quarter:tcs/2026-09-30'));
  assert.ok([...places].every(place => place.includes(':tcs')));
});

test('collectSources over the whole repository finds links from lessons, company records and figure walkthroughs', () => {
  const uses = collectSources(path.resolve(__dirname, '..'));
  const places = new Set([...uses.values()].flatMap(s => [...s]));
  assert.ok([...places].some(p => p.startsWith('lesson:')));
  assert.ok([...places].some(p => p.startsWith('content/companies:')));
  assert.ok([...places].some(p => p === 'dist:figure-walkthroughs.js'));
  assert.ok(uses.size > 100);
  assert.ok([...places].some(p => p.startsWith('annual:')));
  assert.ok([...places].some(p => p.startsWith('quarter:')));
});

test('classifyDirect separates working, moved, refusing, missing and failed links', () => {
  const url = 'https://example.com/results/q2';
  assert.equal(classifyDirect(url, { code: 200, finalUrl: 'https://www.example.com/results/q2/' }).status, 'ok');
  assert.equal(classifyDirect(url, { code: 200, finalUrl: 'https://example.com/ipo' }).status, 'moved');
  assert.equal(classifyDirect(url, { code: 403 }).status, 'blocked');
  assert.equal(classifyDirect(url, { code: 404 }).status, 'broken');
  assert.equal(classifyDirect(url, { code: 500 }).status, 'error');
  assert.equal(classifyDirect(url, { error: 'timeout' }).status, 'error');
});

test('classifyTinyfish needs readable text, not just a response', () => {
  assert.equal(classifyTinyfish({ text: 'x'.repeat(300) }).status, 'readable');
  assert.equal(classifyTinyfish({ text: 'short' }).status, 'unreachable');
  assert.equal(classifyTinyfish({ error: 'blocked' }).status, 'unreachable');
  assert.equal(classifyTinyfish(undefined).status, 'unreachable');
});

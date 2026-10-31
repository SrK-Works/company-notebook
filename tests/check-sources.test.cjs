const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { extractUrls, collectSources, classifyDirect, classifyTinyfish } = require('../scripts/check-sources.cjs');

test('extractUrls keeps source pages and drops images, fonts and trailing punctuation', () => {
  const text = `see 'https://example.com/report.pdf', and "https://www.w3.org/2000/svg" plus https://cdn.example.com/a.PNG?x=1 and (https://example.com/a?b=1&amp;c=2).`;
  assert.deepEqual(extractUrls(text), ['https://example.com/report.pdf', 'https://example.com/a?b=1&c=2']);
});

test('collectSources reads every lesson source and names the company that uses it', () => {
  const uses = collectSources(path.resolve(__dirname, '..'), ['tcs']);
  assert.ok(uses.size >= 2);
  for (const places of uses.values()) assert.ok([...places].every(p => p === 'lesson:tcs'));
});

test('collectSources over the whole repository finds links from lessons and earlier profiles', () => {
  const uses = collectSources(path.resolve(__dirname, '..'));
  const places = new Set([...uses.values()].flatMap(s => [...s]));
  assert.ok([...places].some(p => p.startsWith('lesson:')));
  assert.ok([...places].some(p => p.startsWith('dist:')));
  assert.ok(uses.size > 100);
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

#!/usr/bin/env node
// Report-only source freshness check. It never edits lessons, profiles or financial records.
//
//   node scripts/check-sources.cjs                  check every source link, direct requests only
//   TINYFISH_API_KEY=... node scripts/check-sources.cjs --tinyfish
//                                                   retry failed links through the TinyFish Fetch API
//   --company tcs        only links used by one company file (lesson id), repeatable
//   --json report.json   also write the full report as JSON
//   --strict             exit 1 when any link is broken or unreachable (for CI)
//
// The key is read only from the TINYFISH_API_KEY environment variable and is never printed or written.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const TINYFISH_URL = 'https://api.fetch.tinyfish.ai'; // POST, X-API-Key header, up to 10 urls per request
const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (compatible; Company-Notebook-source-check/1.0)';
const SKIP_HOSTS = ['www.w3.org', 'fonts.googleapis.com', 'fonts.gstatic.com', 'localhost'];
const IMAGE_EXT = /\.(jpe?g|png|webp|svg|gif|ico)(\?|#|$)/i;

// ---------- collecting links ----------
function cleanUrl(raw) {
  return raw.replace(/[.,;:!?]+$/, '').replace(/&amp;/g, '&');
}

function extractUrls(text) {
  const found = text.match(/https?:\/\/[^\s'"`<>)\\\]]+/g) || [];
  return found.map(cleanUrl).filter(u => {
    let host;
    try { host = new URL(u).hostname; } catch { return false; }
    return !SKIP_HOSTS.includes(host) && !IMAGE_EXT.test(u);
  });
}

// Returns Map<url, Set<place>> where place names the file (and company) using the link.
function collectSources(rootDir, onlyCompanies = []) {
  const uses = new Map();
  const add = (url, place) => {
    if (!uses.has(url)) uses.set(url, new Set());
    uses.get(url).add(place);
  };
  const lessonDir = path.join(rootDir, 'content/company-lessons');
  const known = fs.readdirSync(lessonDir).filter(f => f.endsWith('.json')).map(f => f.slice(0, -5));
  const unknown = onlyCompanies.filter(id => !known.includes(id));
  if (unknown.length) {
    throw new Error(`--company accepts lesson ids only (the 29 files in content/company-lessons). Unknown: ${unknown.join(', ')}. The six earlier profiles are checked in a full run.`);
  }
  for (const file of fs.readdirSync(lessonDir).filter(f => f.endsWith('.json')).sort()) {
    const id = file.slice(0, -5);
    if (onlyCompanies.length && !onlyCompanies.includes(id)) continue;
    const lesson = JSON.parse(fs.readFileSync(path.join(lessonDir, file), 'utf8'));
    for (const entry of lesson.sources || []) {
      const url = Array.isArray(entry) ? entry[1] : entry && entry.url;
      if (typeof url === 'string' && /^https?:\/\//.test(url)) add(cleanUrl(url), `lesson:${id}`);
    }
  }
  // Earlier profiles keep their links in hand-written files; those are matched by pattern and labelled by file.
  if (!onlyCompanies.length) {
    const dist = path.join(rootDir, 'dist');
    const files = ['data.js', 'company-expansion.js', ...fs.readdirSync(dist).filter(f => f.endsWith('-primer.js'))];
    for (const file of files) {
      const p = path.join(dist, file);
      if (!fs.existsSync(p)) continue;
      for (const url of extractUrls(fs.readFileSync(p, 'utf8'))) add(url, `dist:${file}`);
    }
  }
  return uses;
}

// ---------- classifying results ----------
function normalisePath(u) {
  const x = new URL(u);
  return x.hostname.replace(/^www\./, '') + x.pathname.replace(/\/+$/, '').toLowerCase();
}

// status: ok | moved | blocked | broken | error
function classifyDirect(url, outcome) {
  if (outcome.error) return { status: 'error', detail: outcome.error };
  const code = outcome.code;
  if (code >= 200 && code < 300) {
    if (outcome.finalUrl && normalisePath(outcome.finalUrl) !== normalisePath(url)) {
      return { status: 'moved', detail: `now ${outcome.finalUrl}` };
    }
    return { status: 'ok', detail: String(code) };
  }
  if ([401, 403, 429, 451, 999].includes(code)) return { status: 'blocked', detail: String(code) };
  if (code === 404 || code === 410) return { status: 'broken', detail: String(code) };
  return { status: 'error', detail: `HTTP ${code}` };
}

function classifyTinyfish(item) {
  if (item && item.error) return { status: 'unreachable', detail: String(item.error).slice(0, 120) };
  const text = item && typeof item.text === 'string' ? item.text.trim() : '';
  if (text.length > 200) return { status: 'readable', detail: `${text.length} characters read` };
  return { status: 'unreachable', detail: 'page returned no readable text' };
}

// ---------- network ----------
async function checkDirect(url, timeoutMs = 20000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': BROWSER_UA, accept: 'text/html,application/pdf,*/*' },
    });
    if (res.body) res.body.cancel().catch(() => {}); // only the headers matter; do not download large PDFs
    return { code: res.status, finalUrl: res.url };
  } catch (e) {
    return { error: e.name === 'AbortError' ? 'timeout' : (e.cause && e.cause.code) || e.message };
  } finally {
    clearTimeout(timer);
  }
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }));
  return results;
}

async function fetchViaTinyfish(urls, apiKey) {
  const out = new Map();
  for (let i = 0; i < urls.length; i += 10) {
    const batch = urls.slice(i, i + 10);
    try {
      const res = await fetch(TINYFISH_URL, {
        method: 'POST',
        headers: { 'X-API-Key': apiKey, 'content-type': 'application/json' },
        body: JSON.stringify({
          urls: batch,
          format: 'markdown',
          purpose: 'Check that a cited company source page is still reachable and has readable content',
        }),
      });
      if (!res.ok) {
        for (const u of batch) out.set(u, { error: `TinyFish HTTP ${res.status}` });
        continue;
      }
      const body = await res.json();
      for (const r of body.results || []) out.set(r.url, r);
      for (const e of body.errors || []) out.set(e.url, { error: e.error || e.code || 'fetch failed' });
      for (const u of batch) if (!out.has(u)) out.set(u, { error: 'no result returned' });
    } catch (e) {
      for (const u of batch) out.set(u, { error: e.message });
    }
  }
  return out;
}

// ---------- main ----------
function parseArgs(argv) {
  const args = { companies: [], json: null, tinyfish: false, strict: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--company') args.companies.push(argv[++i]);
    else if (argv[i] === '--json') args.json = argv[++i];
    else if (argv[i] === '--tinyfish') args.tinyfish = true;
    else if (argv[i] === '--strict') args.strict = true;
    else throw new Error(`Unknown option ${argv[i]}`);
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = process.env.TINYFISH_API_KEY;
  if (args.tinyfish && !apiKey) throw new Error('--tinyfish needs the TINYFISH_API_KEY environment variable.');
  const uses = collectSources(root, args.companies);
  const urls = [...uses.keys()];
  console.log(`Checking ${urls.length} distinct source links...`);

  const rows = await mapLimit(urls, 6, async url => {
    const outcome = await checkDirect(url);
    return { url, used: [...uses.get(url)], ...classifyDirect(url, outcome) };
  });

  if (args.tinyfish) {
    const retry = rows.filter(r => ['blocked', 'broken', 'error'].includes(r.status));
    if (retry.length) {
      console.log(`Retrying ${retry.length} links through TinyFish...`);
      const fetched = await fetchViaTinyfish(retry.map(r => r.url), apiKey);
      for (const row of retry) {
        row.direct = `${row.status} (${row.detail})`;
        Object.assign(row, classifyTinyfish(fetched.get(row.url)));
      }
    }
  }

  const order = ['broken', 'unreachable', 'error', 'blocked', 'moved', 'readable', 'ok'];
  const counts = {};
  for (const r of rows) counts[r.status] = (counts[r.status] || 0) + 1;
  rows.sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));
  for (const r of rows.filter(r => r.status !== 'ok')) {
    console.log(`\n[${r.status.toUpperCase()}] ${r.url}\n  ${r.detail}${r.direct ? ` · direct request: ${r.direct}` : ''}\n  used in: ${r.used.join(', ')}`);
  }
  console.log('\nSummary: ' + order.filter(k => counts[k]).map(k => `${counts[k]} ${k}`).join(', '));
  if (!args.tinyfish && (counts.blocked || counts.error)) {
    console.log('Blocked links may only be refusing automated requests. Re-run with --tinyfish to see which can still be read.');
  }
  if (args.json) {
    fs.writeFileSync(args.json, JSON.stringify({ checked: new Date().toISOString(), counts, links: rows }, null, 2));
    console.log(`Wrote ${args.json}`);
  }
  const failing = (counts.broken || 0) + (counts.unreachable || 0) + (args.tinyfish ? 0 : (counts.error || 0) + (counts.blocked || 0));
  if (args.strict && failing) process.exitCode = 1;
}

module.exports = { extractUrls, collectSources, classifyDirect, classifyTinyfish, normalisePath };
if (require.main === module) main().catch(e => { console.error(e.message); process.exitCode = 2; });

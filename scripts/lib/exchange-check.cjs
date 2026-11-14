'use strict';
// Layer 2, best effort: has the company filed new results on the exchange yet?
// It only ever answers 'filed', 'not found' or 'unknown'. Any failure (blocked, timeout,
// redirect to a web page, changed format) is 'unknown' and must never fail the run.
//
// From a plain, honest request the exchanges usually refuse us: BSE's announcements API
// answers 403, and NSE redirects API calls to its home page unless a browser session
// cookie is present. We do not imitate a browser, so expect 'unknown' most of the time.

const USER_AGENT = 'company-notebook-results-watcher';
const TIMEOUT_MS = 8000;
const NSE_URL = 'https://www.nseindia.com/api/corporate-announcements?index=equities&symbol=';

const RESULTS_WORDS = /financial results|audited results/i;

// Pure: look through NSE announcements (an array) for a results announcement dated after `since` (a Date).
function findResults(announcements, since) {
  if (!Array.isArray(announcements)) return 'unknown';
  for (const a of announcements) {
    const text = `${a && a.desc} ${a && a.attchmntText}`;
    const when = new Date(a && a.an_dt);
    if (RESULTS_WORDS.test(text) && when > since) return 'filed';
  }
  return 'not found';
}

// `since` is the year end of the period we hold. Never throws.
async function checkExchange(ticker, since, fetchImpl = fetch) {
  if (!ticker) return { status: 'unknown', detail: 'no ticker' };
  try {
    const res = await fetchImpl(NSE_URL + encodeURIComponent(ticker), {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return { status: 'unknown', detail: `NSE answered HTTP ${res.status}` };
    return { status: findResults(await res.json(), since), detail: 'NSE announcements' };
  } catch (err) {
    return { status: 'unknown', detail: `could not check (${err.name})` };
  }
}

module.exports = { USER_AGENT, findResults, checkExchange };

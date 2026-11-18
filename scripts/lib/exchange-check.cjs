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

const RESULTS_WORDS = /financial results?|audited results/i;
const MEETING_NOTICE = /(?:board meeting|meeting of (?:the )?board).*(?:intimation|notice)|(?:intimation|notice).*board meeting/i;

function yearEndPattern(end) {
  const day = end.getUTCDate();
  const year = end.getUTCFullYear();
  const shortMonth = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' }).format(end);
  const fullMonth = new Intl.DateTimeFormat('en-GB', { month: 'long', timeZone: 'UTC' }).format(end);
  const month = `(?:${shortMonth}|${fullMonth})`;
  const date = `(?:0?${day}(?:st|nd|rd|th)?[ -]+${month}[ , -]+${year}|${month}[ -]+0?${day}(?:st|nd|rd|th)?[ , -]+${year}|${end.toISOString().slice(0, 10)})`;
  return new RegExp(`\\byear\\s+end(?:ed|ing)\\s+(?:on\\s+)?${date}\\b`, 'i');
}

// A filing must name the target full year. Filing date and the word "audited" are insufficient.
function findResults(announcements, yearEnd) {
  if (!Array.isArray(announcements) || !Number.isFinite(yearEnd?.valueOf())) return 'unknown';
  const period = yearEndPattern(yearEnd);
  for (const announcement of announcements) {
    const description = announcement?.desc || '';
    const text = `${description} ${announcement?.attchmntText || ''}`.replace(/\s+/g, ' ');
    const fullYearText = text.replace(/\bhalf[ -]+year\b/ig, 'half-yearly');
    const when = new Date(announcement?.an_dt);
    if (when > yearEnd && !MEETING_NOTICE.test(description) && RESULTS_WORDS.test(text)
      && period.test(fullYearText)) return 'filed';
  }
  return 'not found';
}

async function checkExchange(ticker, yearEnd, fetchImpl = fetch) {
  if (!ticker) return { status: 'unknown', detail: 'no ticker' };
  try {
    const res = await fetchImpl(NSE_URL + encodeURIComponent(ticker), {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return { status: 'unknown', detail: `NSE answered HTTP ${res.status}` };
    return { status: findResults(await res.json(), yearEnd), detail: 'NSE announcements' };
  } catch (err) {
    return { status: 'unknown', detail: `could not check (${err.name})` };
  }
}

module.exports = { USER_AGENT, findResults, checkExchange };

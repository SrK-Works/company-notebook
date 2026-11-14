'use strict';
// Pure date rules for "should a newer annual period exist yet?". No clock, no network:
// today's date is always passed in. Dates are plain UTC calendar days.
//
// Indian rule used: a listed company files audited full-year results within 60 days of
// its year end, and the annual report normally follows by the AGM. We call a company
// overdue only about 150 days after year end.

const RESULTS_DAYS = 60;
const OVERDUE_DAYS = 150;
const DAY_MS = 86400000;
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
  'august', 'september', 'october', 'november', 'december'];

const utc = (y, m, d) => new Date(Date.UTC(y, m, d));
const daysInMonth = (y, m) => utc(y, m + 1, 0).getUTCDate();

// "FY 2025–26 · year ended 31 March 2026" -> Date (UTC), or null when it cannot be read.
function parseYearEnd(text) {
  const m = /year ended\s+(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/i.exec(String(text || ''));
  if (!m) return null;
  const month = MONTHS.indexOf(m[2].toLowerCase());
  const day = Number(m[1]);
  const year = Number(m[3]);
  if (month < 0 || day < 1 || day > daysInMonth(year, month)) return null;
  return utc(year, month, day);
}

// The same year end one year later; a month-end stays a month-end (28 Feb -> 29 Feb in a leap year).
function nextYearEnd(end) {
  const y = end.getUTCFullYear();
  const m = end.getUTCMonth();
  const wasMonthEnd = end.getUTCDate() === daysInMonth(y, m);
  return utc(y + 1, m, wasMonthEnd ? daysInMonth(y + 1, m) : end.getUTCDate());
}

const addDays = (date, n) => new Date(date.getTime() + n * DAY_MS);
const isoDay = (date) => date.toISOString().slice(0, 10);

function formatDate(date) {
  const name = MONTHS[date.getUTCMonth()];
  return `${date.getUTCDate()} ${name[0].toUpperCase()}${name.slice(1)} ${date.getUTCFullYear()}`;
}

// Indian financial years end on 31 March and are named "FY 2026–27"; other year ends only get the date.
function periodLabel(end) {
  const text = `year ended ${formatDate(end)}`;
  if (end.getUTCMonth() !== 2 || end.getUTCDate() !== 31) return text;
  const y = end.getUTCFullYear();
  return `FY ${y - 1}–${String(y).slice(2)} · ${text}`;
}

// today: a Date. Returns null when the period text cannot be parsed.
// state: 'current'     - newer results are not yet legally due (the year may have ended; the filing window is open)
//        'results due' - more than 60 days after the next year end, so results should be on the exchanges
//        'overdue'     - more than 150 days after it, so the annual report should be out too
function assess(periodText, today) {
  const end = parseYearEnd(periodText);
  if (!end) return null;
  const nextEnd = nextYearEnd(end);
  const resultsDue = addDays(nextEnd, RESULTS_DAYS);
  const overdueFrom = addDays(nextEnd, OVERDUE_DAYS);
  let state = 'current';
  if (today > overdueFrom) state = 'overdue';
  else if (today > resultsDue) state = 'results due';
  return {
    currentPeriod: periodLabel(end),
    nextPeriod: periodLabel(nextEnd),
    nextYearEnd: isoDay(nextEnd),
    dueDate: isoDay(resultsDue),
    overdueDate: isoDay(overdueFrom),
    periodEnded: today > nextEnd,
    state,
  };
}

module.exports = { RESULTS_DAYS, OVERDUE_DAYS, parseYearEnd, nextYearEnd, periodLabel, formatDate, assess };

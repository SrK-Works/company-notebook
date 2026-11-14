#!/usr/bin/env node
'use strict';
// Results watcher: for every financial snapshot, decide whether a newer annual period should
// exist, and open one "Update figures" GitHub issue per company that needs it.
//
//   node scripts/watch-results.cjs --dry-run        print only; never calls GitHub
//   node scripts/watch-results.cjs --today=2027-06-15   pretend today is another date
//
// Needs the gh CLI with GH_TOKEN (the Action provides it) when it is not a dry run.

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { assess, parseYearEnd } = require('./lib/results-calendar.cjs');
const { checkExchange } = require('./lib/exchange-check.cjs');
const { LABEL, issueTitle, issueBody, summaryTable } = require('./lib/figures-issue.cjs');

const ROOT = path.join(__dirname, '..');
const MAX_NEW_ISSUES = 10;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const todayArg = (args.find((a) => a.startsWith('--today=')) || '').slice(8);
const today = todayArg ? new Date(`${todayArg}T00:00:00Z`) : new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00Z');
if (Number.isNaN(today.getTime())) throw new Error('--today must look like 2027-06-15');

const readJson = (...parts) => JSON.parse(fs.readFileSync(path.join(ROOT, ...parts), 'utf8'));
const gh = (...a) => execFileSync('gh', a, { encoding: 'utf8' });

// Layer 1 for every snapshot, then layer 2 for companies whose year has ended.
async function buildRows() {
  const dir = path.join(ROOT, 'content', 'financial-reviews');
  const ids = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)).sort();
  const rows = [];
  for (const id of ids) {
    const snapshot = readJson('content', 'financial-reviews', `${id}.json`);
    let company = {};
    try { company = readJson('content', 'companies', `${id}.json`).company; } catch { /* name falls back to id */ }
    const base = { id, name: company.name || id, ticker: company.ticker };
    const result = assess(snapshot.period, today);
    if (!result) {
      rows.push({ ...base, warning: `cannot read the period "${snapshot.period}"` });
      continue;
    }
    const row = { ...base, ...result, source: snapshot.source, investorPage: company.sources && company.sources[0] && company.sources[0][1] };
    if (result.periodEnded) {
      const check = await checkExchange(company.ticker, parseYearEnd(snapshot.period));
      row.exchange = `${check.status} (${check.detail})`;
      row.filed = check.status === 'filed';
    }
    rows.push(row);
  }
  return rows;
}

function reasonFor(row) {
  if (row.state === 'overdue') return 'the annual report is overdue (more than 150 days after year end).';
  if (row.state === 'results due') return 'audited results should have been filed (more than 60 days after year end).';
  return 'the exchange check found a new results announcement.';
}

const needsUpdate = (row) => !row.warning && (row.state !== 'current' || row.filed);

// A closed issue for the same period means it was handled, so any state counts.
function issueExists(title) {
  const found = JSON.parse(gh('issue', 'list', '--state', 'all', '--search', `"${title}" in:title`,
    '--json', 'title', '--limit', '100'));
  return found.some((i) => i.title === title);
}

function ensureLabel() {
  try {
    gh('label', 'create', LABEL, '--description', 'Company figures need a new annual period', '--color', '0e8a16');
  } catch { /* already exists */ }
}

async function main() {
  const rows = await buildRows();
  const warnings = rows.filter((r) => r.warning);
  const wanted = rows.filter(needsUpdate).map((r) => ({ ...r, reason: reasonFor(r) }));

  console.log(`Date used: ${today.toISOString().slice(0, 10)}${dryRun ? ' (dry run)' : ''}`);
  for (const r of rows) {
    console.log(r.warning
      ? `WARNING ${r.id}: ${r.warning}`
      : `${r.id}: ${r.currentPeriod} -> ${r.nextPeriod}, due ${r.dueDate}, ${r.state}${r.exchange ? `, exchange: ${r.exchange}` : ''}`);
  }
  console.log(`\n${rows.length} companies, ${wanted.length} due or overdue, ${warnings.length} warnings.`);

  let created = 0;
  let skipped = 0;
  let left = 0;
  if (wanted.length && !dryRun) ensureLabel();
  for (const row of wanted) {
    const title = issueTitle(row);
    if (dryRun) {
      console.log(`Would open issue: ${title}`);
    } else if (issueExists(title)) {
      skipped += 1;
    } else if (created >= MAX_NEW_ISSUES) {
      left += 1;
    } else {
      gh('issue', 'create', '--title', title, '--label', LABEL, '--body', issueBody(row));
      created += 1;
      console.log(`Opened issue: ${title}`);
    }
  }
  if (!dryRun && wanted.length) {
    console.log(`Issues opened: ${created}, already existing: ${skipped}, left for next run: ${left}`);
  }

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summaryTable(rows, today.toISOString().slice(0, 10)));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

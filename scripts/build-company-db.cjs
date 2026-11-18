'use strict';

// Build a local, disposable index of the reviewed repository data.
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const { parseYearEnd } = require('./lib/results-calendar.cjs');
const { readQuarterly } = require('./lib/quarterly-records.cjs');

const root = path.resolve(__dirname, '..');
const work = path.join(root, 'work');
const target = path.join(work, 'company-notebook.sqlite');

function readRecords(directory) {
  const abs = path.join(root, 'content', directory);
  return fs.readdirSync(abs).filter(name => name.endsWith('.json')).sort().map(name =>
    [name.slice(0, -5), JSON.parse(fs.readFileSync(path.join(abs, name), 'utf8'))]);
}

function annualPeriodEnd(period) {
  // A changed financial year can have a statement longer or shorter than twelve months.
  const end = parseYearEnd(period);
  if (!end) throw new Error('Cannot index the annual reporting period: ' + period);
  return end.toISOString().slice(0, 10);
}

function populate(file, companies, annual, quarterly) {
  const db = new DatabaseSync(file);
  try {
    db.exec(`
      PRAGMA foreign_keys = ON;
      BEGIN;

      CREATE TABLE companies (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        ticker TEXT,
        listing_label TEXT
      ) STRICT;

      CREATE INDEX companies_by_ticker ON companies(ticker);

      CREATE TABLE financial_reports (
        company_id TEXT NOT NULL REFERENCES companies(id),
        period_type TEXT NOT NULL CHECK (period_type IN ('annual', 'quarter')),
        period_end TEXT NOT NULL,
        basis TEXT NOT NULL,
        source_url TEXT NOT NULL,
        payload TEXT NOT NULL CHECK (json_valid(payload)),
        PRIMARY KEY (company_id, period_type, period_end)
      ) STRICT;

      CREATE INDEX reports_by_period ON financial_reports(period_type, period_end);
    `);

    const company = db.prepare('INSERT INTO companies VALUES (?, ?, ?, ?)');
    for (const [id, { company: entry }] of companies) {
      if (id !== entry.id) throw new Error('Company ID does not match filename: ' + id);
      company.run(id, entry.name, entry.ticker || null, entry.listingLabel || null);
    }

    const report = db.prepare('INSERT INTO financial_reports VALUES (?, ?, ?, ?, ?, ?)');
    for (const [id, record] of annual) {
      report.run(id, 'annual', annualPeriodEnd(record.period), record.basis, record.source, JSON.stringify(record));
    }
    for (const [id, reports] of Object.entries(quarterly)) {
      for (const record of reports) {
        report.run(id, 'quarter', record.periodEnd, record.basis, record.sources[0].url, JSON.stringify(record));
      }
    }

    const counts = db.prepare('SELECT period_type, count(*) AS count FROM financial_reports GROUP BY period_type').all();
    db.exec('COMMIT;');
    return counts;
  } finally {
    db.close();
  }
}

const companies = readRecords('companies');
const annual = readRecords('financial-reviews');
const quarterly = readQuarterly(root, new Set(companies.map(([id]) => id)));
fs.mkdirSync(work, { recursive: true });
const temporaryDirectory = fs.mkdtempSync(path.join(work, '.company-db-'));
try {
  const file = path.join(temporaryDirectory, 'company-notebook.sqlite');
  const counts = populate(file, companies, annual, quarterly);
  fs.renameSync(file, target);
  console.log(`Indexed ${companies.length} companies and reports by period type (${counts.map(row => row.period_type + ': ' + row.count).join(', ')}) in work/company-notebook.sqlite.`);
} finally {
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}

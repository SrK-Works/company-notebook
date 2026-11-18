'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { isDate, readQuarterly } = require('./lib/quarterly-records.cjs');

const nseFilings = 'https://www.nseindia.com/companies-listing/corporate-integrated-filing';
const root = path.resolve(__dirname, '..');

function reviewQueue(companies, quarterly, period) {
  return companies.map(company => {
    const verified = quarterly[company.id]?.find(record => record.periodEnd === period);
    const isOtherListing = company.listingLabel && !company.listingLabel.startsWith('NSE:');
    return {
      id: company.id,
      company: company.name,
      ticker: company.ticker,
      status: verified ? 'verified' : 'needs review',
      filing: verified?.sources[0].url || null,
      exchange: !isOtherListing && company.ticker ? nseFilings + '?symbol=' + encodeURIComponent(company.ticker) : null,
      companySource: company.sources?.[0]?.[1] || null,
    };
  });
}

if (require.main === module) {
  const period = process.argv.find(arg => arg.startsWith('--period='))?.slice(9);
  if (!isDate(period)) {
    console.error('Usage: node scripts/watch-quarters.cjs --period=YYYY-MM-DD [--json]');
    process.exit(2);
  }
  const directory = path.join(root, 'content/companies');
  const companies = fs.readdirSync(directory).filter(name => name.endsWith('.json')).sort()
    .map(name => JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8')).company);
  const quarterly = readQuarterly(root, new Set(companies.map(company => company.id)));
  const rows = reviewQueue(companies, quarterly, period);
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify({ period, rows }, null, 2));
  } else {
    for (const row of rows) {
      console.log([row.company, row.status, row.filing || row.exchange, row.companySource].filter(Boolean).join(' · '));
    }
    const verified = rows.filter(row => row.status === 'verified').length;
    console.log(`\n${period}: ${verified} verified, ${rows.length - verified} need review across ${rows.length} profiles.`);
  }
}

module.exports = { reviewQueue };

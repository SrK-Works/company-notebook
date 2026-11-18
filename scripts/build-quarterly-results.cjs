'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { readQuarterly } = require('./lib/quarterly-records.cjs');

const root = path.resolve(__dirname, '..');
const ids = new Set(fs.readdirSync(path.join(root, 'content/companies'))
  .filter(name => name.endsWith('.json')).map(name => name.slice(0, -5)));
const records = readQuarterly(root, ids);
const latest = Object.fromEntries(Object.entries(records).filter(([, quarters]) => quarters.length)
  .map(([id, [quarter]]) => [id, quarter]));
const banner = '/* Generated from content/financial-reviews/quarterly. */\n';
fs.writeFileSync(path.join(root, 'dist/quarterly-results.js'),
  banner + 'window.QUARTERLY_RESULTS = ' + JSON.stringify(latest, null, 2) + ';\n');
console.log(`Built quarterly results for ${Object.keys(latest).length} companies.`);

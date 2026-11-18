'use strict';

const fs = require('node:fs');
const path = require('node:path');

const DIRECTORY = 'content/financial-reviews/quarterly';
const isText = value => typeof value === 'string' && Boolean(value.trim());

function isDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value);
  return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function sameQuarterLastYear(periodEnd) {
  const [year, month, day] = periodEnd.split('-').map(Number);
  const monthEnd = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lastYearMonthEnd = new Date(Date.UTC(year - 1, month, 0)).getUTCDate();
  const comparisonDay = day === monthEnd ? lastYearMonthEnd : Math.min(day, lastYearMonthEnd);
  return new Date(Date.UTC(year - 1, month - 1, comparisonDay)).toISOString().slice(0, 10);
}

function isSource(source) {
  if (!source || !isText(source.label) || !isText(source.location)) return false;
  try {
    return new URL(source.url).protocol === 'https:';
  } catch {
    return false;
  }
}

function validateRecord(record, expectedPeriod) {
  const errors = [];
  const { periodEnd, comparisonEnd, filedOn, checkedOn, basis, assurance, coverage, sourceUnit, metrics, change, watch, sources } = record;
  if (!isDate(periodEnd) || periodEnd !== expectedPeriod) errors.push('periodEnd must match the ISO date in the filename');
  if (!isDate(comparisonEnd) || !isDate(periodEnd) || comparisonEnd !== sameQuarterLastYear(periodEnd)) {
    errors.push('comparisonEnd must be the same quarter last year');
  }
  if (!isDate(filedOn) || !isDate(checkedOn) || filedOn <= periodEnd || checkedOn < filedOn) {
    errors.push('dates must be in order: quarter ended, filed, checked');
  }
  if (!['Consolidated', 'Standalone'].includes(basis)) errors.push('select a reporting basis');
  if (!['Unaudited', 'Audited'].includes(assurance)) errors.push('label the audit status');
  if (!isText(coverage)) errors.push('describe which operations the figures cover');
  if (!['crore', 'million', 'lakh'].includes(sourceUnit)) errors.push('identify the filing’s rupee unit');
  if (!Array.isArray(metrics) || metrics.length !== 2 || !metrics.every(metric =>
    metric && isText(metric.label) && Number.isFinite(metric.current) && Number.isFinite(metric.previous)
  ) || metrics[0].label === metrics[1].label) errors.push('provide two distinct measures with signed values for both periods');
  if (![change, watch].every(value => isText(value) && value.length <= 240)) {
    errors.push('explain the change and what to watch in at most 240 characters each');
  }
  if (!Array.isArray(sources) || !sources.length || !sources.every(isSource)) {
    errors.push('each source needs a label, HTTPS URL and locator');
  }
  return errors;
}

function readQuarterly(root, companyIds) {
  const directory = path.join(root, DIRECTORY);
  const entries = fs.readdirSync(directory, { withFileTypes: true }).filter(entry => entry.isDirectory());
  return Object.fromEntries(entries.map(({ name: id }) => {
    if (!companyIds.has(id)) throw new Error('Unknown company in quarterly records: ' + id);
    const files = fs.readdirSync(path.join(directory, id)).filter(name => name.endsWith('.json')).sort().reverse();
    const records = files.map(name => {
      const file = path.join(directory, id, name);
      const record = JSON.parse(fs.readFileSync(file, 'utf8'));
      const errors = validateRecord(record, name.slice(0, -5));
      if (errors.length) throw new Error(`${id}/${name}: ${errors.join('; ')}`);
      return record;
    });
    return [id, records];
  }));
}

module.exports = { isDate, readQuarterly, validateRecord };

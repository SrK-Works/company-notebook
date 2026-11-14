'use strict';
// Pure text for the "Update figures" GitHub issue and the run summary table.

const LABEL = 'figures-update';

const issueTitle = (row) => `Update figures: ${row.name} (${row.nextPeriod})`;

function issueBody(row) {
  const lines = [
    `Company id: \`${row.id}\``,
    `Snapshot now shows: ${row.currentPeriod}`,
    `Expected next period: ${row.nextPeriod}`,
    `Results due by: ${row.dueDate} (60 days after year end; annual report usually follows by the AGM, overdue after ${row.overdueDate})`,
    `Why this issue: ${row.reason}`,
    '',
    '## Where to find the filing',
    `- Exchange symbol: ${row.ticker || 'not recorded'}. Look for the audited full-year financial results on NSE or BSE corporate announcements.`,
    `- Company investor page: ${row.investorPage || 'see the sources in content/companies/' + row.id + '.json'}`,
    `- Source used for the current snapshot: ${row.source || 'see content/financial-reviews/' + row.id + '.json'}`,
    '',
    '## What to produce (figures-verifier agent)',
    `1. Update \`content/financial-reviews/${row.id}.json\` and \`content/financial-reviews/${row.id}.evidence.md\` for the new period, following \`content/financial-reviews/AGENTS.md\`. Set \`period\` and \`checked\` (today's date) and transcribe every figure into the evidence file.`,
    `2. Update \`financialNotes\` in \`content/company-lessons/${row.id}.json\` so it agrees with the snapshot. Edit no other lesson section.`,
    '3. Run `npm test` and `node scripts/check-lessons.cjs`.',
    `4. Open a pull request. Put "Closes #<this issue number>" in the description. Never merge it.`,
    '',
    'If the filing is not available yet, comment here with what you checked and stop.',
    '',
    '_Opened by scripts/watch-results.cjs._',
  ];
  return lines.join('\n');
}

function summaryTable(rows, today) {
  const out = [
    `## Results watcher, ${today}`,
    '',
    '| Company | Current period | Next period | Due | State | Exchange check |',
    '| --- | --- | --- | --- | --- | --- |',
  ];
  for (const r of rows) {
    out.push(r.warning
      ? `| ${r.name} | warning | | | ${r.warning} | |`
      : `| ${r.name} | ${r.currentPeriod} | ${r.nextPeriod} | ${r.dueDate} | ${r.state} | ${r.exchange || ''} |`);
  }
  return out.join('\n') + '\n';
}

module.exports = { LABEL, issueTitle, issueBody, summaryTable };

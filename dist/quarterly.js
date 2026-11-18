/* A short, sourced comparison with the same quarter last year. */
window.companyQuarterly = (() => {
  const date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' });
  const amount = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });
  const sourceUnitsPerCrore = { crore: 1, million: 10, lakh: 100 };

  function render(company, safe) {
    const result = window.QUARTERLY_RESULTS?.[company.id];
    if (!result) return '';
    const { periodEnd, comparisonEnd, filedOn, checkedOn, basis, assurance, coverage, change, watch, sourceUnit, metrics, sources } = result;
    const period = date.format(new Date(periodEnd));
    const comparison = date.format(new Date(comparisonEnd));
    const format = value => amount.format(value / sourceUnitsPerCrore[sourceUnit]);
    return `<section class="financial-panel" id="quarterly" aria-labelledby="quarterly-title">
<div class="eyebrow">Quarterly update</div>
<h3 id="quarterly-title">Quarter ended ${period}</h3>
<p class="financial-period">${safe(basis === 'Consolidated' ? 'Group results' : 'Company only')} · ${safe(coverage)} · ${safe(assurance)}</p>
<p>${safe(change)}</p>
<p><strong>What to watch next.</strong> ${safe(watch)}</p>
<details class="financial-notes">
<summary>Compare with the same quarter last year</summary>
<table class="financial-table">
<caption class="sr-only">Quarterly figures in rupees crore</caption>
<thead><tr><th scope="col">₹ crore</th><th scope="col">${period}</th><th scope="col">${comparison}</th></tr></thead>
<tbody>${metrics.map(metric => `<tr><th scope="row">${safe(metric.label)}</th><td>${format(metric.current)}</td><td>${format(metric.previous)}</td></tr>`).join('')}</tbody>
</table>
</details>
<p class="source-note financial-source">${sources.map(({ label, url }) => `<a href="${safe(url)}" target="_blank" rel="noopener">${safe(label)} ↗</a>`).join(' · ')}<br>Filed ${date.format(new Date(filedOn))}. Checked ${date.format(new Date(checkedOn))}.</p>
</section>`;
  }

  return { render };
})();

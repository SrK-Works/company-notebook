/* The company page: photos or product pictures, four quick answers, how the work moves, what helps and
   what could hurt, then the figures and sources. Everything else in the lesson opens under "Go deeper". */
window.shortProfile=(()=>{
 const lesson=c=>window.COMPANY_LESSONS?.[c.id];
 const applies=c=>!!lesson(c);
 const render=(c,h)=>{
  const {safe,mono,saveButton,profileSources}=h,l=lesson(c);
  const photos=(window.PRODUCT_VISUALS?.[c.id]||[]).filter(p=>p.kind==='photo');
  const block=({title,text})=>`<div><h4>${safe(title)}</h4><p>${safe(text)}</p></div>`;
  // A worked example with made-up numbers, always labelled so it cannot be mistaken for the company's figures.
  // When the text is several sentences (a set of numbers), the first sentence leads and the rest become short lines.
  const madeUp=({title,text})=>{const parts=String(text).split(/(?<=[.!?])\s+/).filter(Boolean);const body=parts.length>=4?`<p>${safe(parts[0])}</p><ul>${parts.slice(1).map(x=>`<li>${safe(x)}</li>`).join('')}</ul>`:`<p>${safe(text)}</p>`;return `<aside class="primer-illustration"><div class="primer-illustration-label">Illustration · made-up numbers, not the company’s figures</div><h4>${safe(title)}</h4>${body}</aside>`};
  const tile=(p,i)=>`<a class="sp-tile${i===0?' sp-tile-lead':''}${i>=5?' sp-tile-wide':''}" href="${safe(p.url)}" target="_blank" rel="noopener"><img src="${safe(p.image)}" alt="${safe(p.alt)}" loading="${i<2?'eager':'lazy'}" decoding="async"><span class="sp-cap"><strong>${safe(p.name)}</strong><span>${safe(p.category)}</span></span></a>`;
  const products=c.products||[];
  const visuals=photos.length>=5?`<section class="sp-photos" aria-label="What ${safe(c.name)} does, in photos"><div class="sp-grid">${photos.map(tile).join('')}</div><p class="source-note">Photographs from the company’s own published material (select a photo to open its source), chosen to show the kind of work. They are not a complete list of services.</p></section>`:(window.productShelf?.render(c)||'');
  const older=window.FIGURE_WALKTHROUGHS?.[c.id]?.()||'';
  const deeper=[
   ['The main products and services',`<div class="sp-blocks">${l.groups.map(g=>`<div><h4>${safe(g.title)}</h4><p><strong>What the customer gets:</strong> ${safe(g.examples)}</p><p>${safe(g.explanation)}</p></div>`).join('')}</div>`],
   ['Words worth knowing',`<div class="sp-blocks">${l.basics.map(block).join('')}</div>`],
   ['What makes this business different',`<div class="sp-blocks">${l.specifics.map(block).join('')}</div>`],
   ['What else could go wrong',`<div class="sp-blocks">${l.risks.map(([n,d])=>`<div><h4>${safe(n)}</h4><p>${safe(d)}</p></div>`).join('')}</div>`],
   ['What to check next',`<div class="sp-blocks">${l.watch.map(([q,why,how])=>`<div><h4>${safe(q)}</h4><p>${safe(why)}</p><p class="sp-how"><strong>How to look:</strong> ${safe(how)}</p></div>`).join('')}</div><p class="source-note">Research prompts, not findings.</p>`],
   ['A recent development',`<div class="sp-blocks"><div><h4>${safe(l.context[0])}</h4><p>${safe(l.context[1])}</p></div></div>`],
   ...(l.illustration?.length?[['A made-up example',l.illustration.map(madeUp).join('')]]:[]),
  ];
  const fullList=products.length?`<details class="sp-more portfolio-list" id="products"><summary>All ${products.length} listed products and services</summary><div class="product-grid">${products.map(p=>`<div class="product"><strong>${safe(p[0])}</strong><span>${safe(p[1])}</span></div>`).join('')}</div><p class="source-note">${safe(c.productNote||'Selected offerings, not a complete catalogue.')}</p></details>`:'';
  return `<a class="back" href="#/">← All companies</a>
<div class="profile-head">${mono(c)}<div><div class="eyebrow">${safe(c.tag||c.sector)}</div><h1>${safe(c.name)}</h1><div class="profile-meta">${safe(c.listingLabel||'NSE: '+c.ticker)} &nbsp; / &nbsp; ${safe(c.sector)}</div></div>${saveButton(c)}</div>
<p class="profile-lede">${safe(l.summary)}</p>
${visuals}
<section class="sp-section" id="quick"><div class="number">In one minute</div><h2>What is this business?</h2><div class="sp-quick">${l.quick.map(q=>`<div class="sp-card"><h3>${safe(q.title)}</h3><p>${safe(q.text)}</p></div>`).join('')}</div></section>
<section class="sp-section" id="how"><div class="number">How the work moves</div><h2>${safe(l.stepsTitle||'From the work to the payment.')}</h2><ol class="sp-flow">${l.steps.map(s=>`<li><strong>${safe(s.title)}</strong><span>${safe(s.text)}</span></li>`).join('')}</ol></section>
<section class="sp-section" id="balance"><div class="number">Weighing it up</div><h2>What helps, and what could hurt.</h2><div class="sp-balance"><div class="sp-helps"><h3>What helps</h3>${l.helps.map(block).join('')}</div><div class="sp-hurts"><h3>What could hurt</h3>${l.hurts.map(block).join('')}</div></div><p class="source-note">What the company’s own documents show, not a forecast or advice.</p></section>
<section class="sp-section" id="deeper"><div class="number">If you want more</div><h2>Go deeper.</h2>${deeper.map(([t,body])=>`<details class="sp-more"><summary>${safe(t)}</summary>${body}</details>`).join('')}${fullList}</section>
<section class="sp-section" id="money"><div class="number">The numbers</div><h2>Check the figures.</h2>${window.companyFinancials.render(c)}<details class="sp-more"><summary>How to read these figures</summary>${older}<div class="sp-blocks">${l.financialNotes.map(block).join('')}</div></details></section>
<section class="sp-section" id="sources"><div class="number">Check the original</div><h2>Go straight to the source.</h2>${profileSources(c).map(([name,url])=>`<a class="source-link" href="${safe(url)}" target="_blank" rel="noopener">${safe(name)} ↗</a>`).join('')}<p class="source-note">Business lesson checked ${safe(l.checked)}. Check current filings before making a financial decision. For learning, not a stock recommendation.</p>
<div class="sp-feedback"><span>Did the business make more sense?</span><button class="button secondary" data-feedback="clear" data-company="${c.id}">Yes, clearer now</button><button class="button secondary" data-feedback="unclear" data-company="${c.id}">Still have questions</button><button class="button secondary" data-correction="${c.id}">Suggest a correction</button></div><div id="feedback-form"></div></section>`;
 };
 return {applies,render};
})();

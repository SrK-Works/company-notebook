/* Shared rendering for individually researched company lessons. Existing deep dives are preserved. */
(()=>{
 const lessons=window.COMPANY_LESSONS||{},previous=window.companyPrimer;
 const safe=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const link=([label,url])=>`<a href="${safe(url)}" target="_blank" rel="noopener">${safe(label)} ↗</a>`;
 const sources=l=>`<p class="source-note">Business sources: ${l.sources.map(link).join(' · ')}. Explanations checked ${safe(l.checked)}. Research prompts are questions to investigate, not findings of investment quality.</p>`;
 const blocks=items=>(items||[]).map(({title,text})=>`<h3>${safe(title)}</h3><p>${safe(text)}</p>`).join('');
 for(const [id,l]of Object.entries(lessons)){
  const c=window.COMPANIES.find(c=>c.id===id);if(!c)throw new Error('Unknown company lesson: '+id);
  Object.assign(c,{summary:l.summary,description:l.description,money:l.money,watch:l.watch.map(([q,why])=>[q,why]),risks:l.risks,update:l.context,question:l.quiz[0],answer:l.quiz[1]});
  c.lessonChecked=l.checked;
  if(l.products)c.products=l.products;
  if(l.productNote)c.productNote=l.productNote;
  if(l.listingLabel)c.listingLabel=l.listingLabel;
  if(l.productSource)c.productSource=l.productSource;
  window.COMPANY_OVERVIEWS[id]={customers:l.customers,drivers:l.drivers};
  window.COMPANY_RESEARCH_GUIDES[id]=l.watch.map(([, ,guide])=>guide);
  c.sources=[...l.sources,...c.sources.filter(([,url])=>!l.sources.some(([,newUrl])=>url===newUrl))];
  if(l.financial&&!window.COMPANY_FINANCIALS[id])window.COMPANY_FINANCIALS[id]=l.financial;
  if(l.historicalOfferings&&window.PRODUCT_VISUALS?.[id])window.PRODUCT_VISUALS[id]=window.PRODUCT_VISUALS[id].map(p=>l.historicalOfferings.includes(p.name)?{...p,category:'Historical offering · see dated business-scope explanation'}:p);
 }
 window.companyPrimer={
  skipBusiness(c){return !!lessons[c.id]||!!previous?.skipBusiness(c);},
  contents(c){return lessons[c.id]?[[c.id+'-basics','Products and business basics'],[c.id+'-specifics','How this company works']]:previous?.contents(c)||[];},
  render(c,slot){const l=lessons[c.id];if(!l)return previous?.render(c,slot)||'';
   if(slot==='basics')return `<section class="content-section company-primer" id="${safe(c.id)}-basics"><div class="number">START WITH WHAT IT OFFERS</div><h2>Connect the products to the business.</h2><div class="primer-groups">${l.groups.map(g=>`<div><h3>${safe(g.title)}</h3><p><strong>What the customer gets:</strong> ${safe(g.examples)}</p><p>${safe(g.explanation)}</p></div>`).join('')}</div>${blocks(l.basics)}${sources(l)}</section>`;
   if(slot==='specifics')return `<section class="content-section company-primer" id="${safe(c.id)}-specifics"><div class="number">HOW THIS BUSINESS WORKS</div><h2>Follow the work behind the offering.</h2><ol class="primer-route">${l.steps.map(s=>`<li><strong>${safe(s.title)}</strong><span>${safe(s.text)}</span></li>`).join('')}</ol>${blocks(l.specifics)}${sources(l)}</section>`;
   if(slot==='numbers')return `<div class="primer-number-guide"><h3>Read the figures in this company’s context.</h3>${blocks(l.financialNotes)}<p>Next, check cash generation, funding, investment needs and the price paid for the shares. Understanding the operating business and reading its historical results do not by themselves establish an attractive investment.</p>${l.sources.filter(([label])=>/report|results|investor|financial|filing|prospectus/i.test(label)).map(s=>`<p class="source-note">${link(s)}</p>`).join('')}</div>`;
   return '';
  }
 };
})();

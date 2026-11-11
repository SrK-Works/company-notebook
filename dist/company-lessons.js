/* Puts each company lesson's summary, product list and sources onto its company record,
   so the home page cards, search and the company page all read the same text. */
(()=>{
 const lessons=window.COMPANY_LESSONS||{};
 for(const [id,l]of Object.entries(lessons)){
  const c=window.COMPANIES.find(c=>c.id===id);if(!c)throw new Error('Unknown company lesson: '+id);
  c.summary=l.summary;
  c.lessonChecked=l.checked;
  if(l.products)c.products=l.products;
  if(l.productNote)c.productNote=l.productNote;
  if(l.listingLabel)c.listingLabel=l.listingLabel;
  if(l.productSource)c.productSource=l.productSource;
  c.sources=[...l.sources,...c.sources.filter(([,url])=>!l.sources.some(([,newUrl])=>url===newUrl))];
  if(l.financial&&!window.COMPANY_FINANCIALS[id])window.COMPANY_FINANCIALS[id]=l.financial;
  if(l.historicalOfferings&&window.PRODUCT_VISUALS?.[id])window.PRODUCT_VISUALS[id]=window.PRODUCT_VISUALS[id].map(p=>l.historicalOfferings.includes(p.name)?{...p,category:'Historical offering · see dated business-scope explanation'}:p);
 }
})();

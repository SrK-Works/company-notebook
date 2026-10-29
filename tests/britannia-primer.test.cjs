const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={};c.window=c;vm.createContext(c);
for(const f of ['data','company-expansion','overviews','research-guides','financial-data','product-images','hul-primer','itc-primer','nestle-primer'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const other=o=>JSON.stringify(Object.fromEntries(Object.entries(o).filter(([id])=>id!=='britannia')));
const profiles=JSON.stringify(c.COMPANIES.filter(x=>x.id!=='britannia'));
const guides=other(c.COMPANY_RESEARCH_GUIDES),overviews=other(c.COMPANY_OVERVIEWS),visuals=other(c.PRODUCT_VISUALS),finances=JSON.stringify(c.COMPANY_FINANCIALS);
const previousOutput=['hindustan-unilever','itc','nestle-india'].flatMap(id=>['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(c.COMPANIES.find(x=>x.id===id),slot)));
vm.runInContext(fs.readFileSync('dist/britannia-primer.js','utf8'),c);
const company=c.COMPANIES.find(x=>x.id==='britannia');
test('Britannia preserves all other profiles and earlier walkthroughs',()=>{
 assert.equal(JSON.stringify(c.COMPANIES.filter(x=>x.id!==company.id)),profiles);
 assert.equal(other(c.COMPANY_RESEARCH_GUIDES),guides);assert.equal(other(c.COMPANY_OVERVIEWS),overviews);assert.equal(other(c.PRODUCT_VISUALS),visuals);
 assert.equal(JSON.stringify(c.COMPANY_FINANCIALS),finances);
 assert.deepEqual(['hindustan-unilever','itc','nestle-india'].flatMap(id=>['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(c.COMPANIES.find(x=>x.id===id),slot))),previousOutput);
 assert.equal(c.companyPrimer.skipBusiness(company),true);
 assert.equal(company.watch.length,6);assert.equal(c.COMPANY_RESEARCH_GUIDES[company.id].length,6);
});
test('Britannia separates group profit, approximate category mix and equity-accounted loss',()=>{
 const f=c.COMPANY_FINANCIALS[company.id],p=f.context,near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8);
 assert.equal(f.status,'single');assert.match(f.basis,/Consolidated/);assert.match(f.profitMetric,/attributable to owners/);
 assert.equal(f.rows[0].revenue,19151.59);assert.equal(f.rows[0].profit,2533.49);
 near(p.goods+p.otherOperating,f.rows[0].revenue);near(p.groupPat-p.nonControlling,f.rows[0].profit);
 near(p.geographies.reduce((s,r)=>s+r.revenue,0),f.rows[0].revenue);
 assert.deepEqual(Array.from(p.turnoverMix,r=>r.share),[97,3]);
 assert.ok(p.turnoverMix.every(r=>!('profit' in r)&&!('revenue' in r)));
 assert.ok(p.geographies.every(r=>!('profit' in r)));
 assert.equal(p.jointVenture.loss,59.93);assert.equal(p.jointVenture.shareOfLoss,30.57);assert.equal(p.jointVenture.interest,51);
 const html=c.companyPrimer.render(company,'numbers');
 for(const text of ['~97%','~3%','not a biscuit-only sales split or a profit breakdown','₹18,858.21','₹293.38','₹2,537.01','₹3.52','−₹30.57','entity-level joint-venture result'])assert.ok(html.includes(text),text);
 for(const slot of ['basics','specifics'])assert.ok(!/₹|97%|59\.93|51%|19,151|2,533/.test(c.companyPrimer.render(company,slot)),slot);
});
test('Britannia explains the full food portfolio with clearly labelled bakery illustrations',()=>{
 const basics=c.companyPrimer.render(company,'basics'),specifics=c.companyPrimer.render(company,'specifics');
 for(const text of ['Biscuits and cookies','Bread, cakes and rusk','Dairy','Other snacking formats','Foods'])assert.ok(basics.includes(text),text);
 for(const text of ['Freshness','equity method','stock','utilisation','General trade'])assert.ok(specifics.includes(text),text);
 const visual=c.PRODUCT_VISUALS[company.id];assert.equal(visual.length,13);
 const drawings=visual.filter(x=>x.image.includes('britannia-business-'));assert.equal(drawings.length,3);
 for(const x of drawings){assert.equal(x.kind,'illustration');assert.match(x.alt,/not a product photograph/);assert.ok(fs.existsSync('dist/'+x.image));}
});

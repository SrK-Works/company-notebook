const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={};c.window=c;vm.createContext(c);
for(const f of ['data','company-expansion','overviews','research-guides','financial-data','product-images','hul-primer','itc-primer','nestle-primer','britannia-primer','marico-primer'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const id='avenue-supermarts',other=o=>JSON.stringify(Object.fromEntries(Object.entries(o).filter(([key])=>key!==id)));
const profiles=JSON.stringify(c.COMPANIES.filter(x=>x.id!==id)),guides=other(c.COMPANY_RESEARCH_GUIDES),overviews=other(c.COMPANY_OVERVIEWS),visuals=other(c.PRODUCT_VISUALS),finances=JSON.stringify(c.COMPANY_FINANCIALS);
const ids=['hindustan-unilever','itc','nestle-india','britannia','marico'];
const previous=ids.flatMap(id=>['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(c.COMPANIES.find(x=>x.id===id),slot)));
vm.runInContext(fs.readFileSync('dist/dmart-primer.js','utf8'),c);
const company=c.COMPANIES.find(x=>x.id===id);
test('DMart preserves the other profiles and all earlier walkthroughs and figures',()=>{
 assert.equal(JSON.stringify(c.COMPANIES.filter(x=>x.id!==id)),profiles);
 assert.equal(other(c.COMPANY_RESEARCH_GUIDES),guides);assert.equal(other(c.COMPANY_OVERVIEWS),overviews);assert.equal(other(c.PRODUCT_VISUALS),visuals);assert.equal(JSON.stringify(c.COMPANY_FINANCIALS),finances);
 assert.deepEqual(ids.flatMap(id=>['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(c.COMPANIES.find(x=>x.id===id),slot))),previous);
 assert.equal(c.companyPrimer.skipBusiness(company),true);assert.equal(company.watch.length,6);assert.equal(c.COMPANY_RESEARCH_GUIDES[id].length,6);
});
test('DMart uses annual group figures without inventing category or online profit',()=>{
 const f=c.COMPANY_FINANCIALS[id],p=f.retailContext;
 assert.equal(f.rows[0].revenue,68820.74);assert.equal(f.rows[0].profit,2969.86);assert.equal(f.status,'single');
 assert.ok(Math.abs(p.ownersPat+p.nonControlling-f.rows[0].profit)<1e-8);
 assert.equal(p.parentRevenue,66968.03);assert.equal(p.parentPat,3223.93);assert.equal(p.existingStoreGrowth,10.8);assert.equal(p.storeCount,500);
 const n=c.companyPrimer.render(company,'numbers');
 for(const text of ['₹4.32','₹66,968.03','₹3,223.93','Do not add these overlapping totals','10.8%','quarter ended 31 March 2026','one store temporarily closed','no separate reportable segments'])assert.ok(n.includes(text),text);
 assert.equal(f.rows.length,1);assert.ok(!('readyProfit'in p));
 for(const slot of ['basics','specifics'])assert.ok(!/₹|68,820|2,969|10\.8%|500 stores/.test(c.companyPrimer.render(company,slot)),slot);
});
test('DMart focuses on retail operations and updates the online fulfilment description',()=>{
 const b=c.companyPrimer.render(company,'basics'),s=c.companyPrimer.render(company,'specifics');
 for(const text of ['Foods and groceries','Non-food consumer goods','Other household goods and clothing','DMart Ready','Everyday Low Cost'])assert.ok(b.includes(text),text);
 for(const text of ['gross profit','Inventory','Store maturity','Avenue E-Commerce Limited','not a clean estimate of DMart Ready'])assert.ok(s.includes(text),text);
 const ready=company.products.find(([name])=>name==='DMart Ready');assert.match(ready[1],/fulfilment varies by location/);
 assert.ok(!company.productSource.includes('canary'));
 for(const p of c.PRODUCT_VISUALS[id]){assert.ok(fs.existsSync('dist/'+p.image));assert.ok(!p.alt.includes('brain'));}
 for(const slug of ['daily-essentials','dairy-and-frozen','fruits-and-vegetables'])assert.match(fs.readFileSync(`dist/assets/products/dmart-retail-${slug}.svg`,'utf8'),/Not a product photograph/);
});

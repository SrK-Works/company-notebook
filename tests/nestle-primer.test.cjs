const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={};c.window=c;vm.createContext(c);
for(const f of ['data','company-expansion','overviews','research-guides','financial-data','product-images','hul-primer','itc-primer'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const untouched=JSON.stringify(c.COMPANIES.filter(x=>x.id!=='nestle-india'));
const guides=JSON.stringify(Object.fromEntries(Object.entries(c.COMPANY_RESEARCH_GUIDES).filter(([id])=>id!=='nestle-india')));
const visuals=JSON.stringify(Object.fromEntries(Object.entries(c.PRODUCT_VISUALS).filter(([id])=>id!=='nestle-india')));
const finances=JSON.stringify(c.COMPANY_FINANCIALS);
const previousOutput=['hindustan-unilever','itc'].flatMap(id=>['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(c.COMPANIES.find(x=>x.id===id),slot)));
vm.runInContext(fs.readFileSync('dist/nestle-primer.js','utf8'),c);
const company=c.COMPANIES.find(x=>x.id==='nestle-india');
test('Nestlé extension preserves the other 34 profiles, guides, visuals and earlier walkthroughs',()=>{
 assert.equal(JSON.stringify(c.COMPANIES.filter(x=>x.id!==company.id)),untouched);
 assert.equal(JSON.stringify(Object.fromEntries(Object.entries(c.COMPANY_RESEARCH_GUIDES).filter(([id])=>id!==company.id))),guides);
 assert.equal(JSON.stringify(Object.fromEntries(Object.entries(c.PRODUCT_VISUALS).filter(([id])=>id!==company.id))),visuals);
 assert.equal(JSON.stringify(c.COMPANY_FINANCIALS),finances);
 assert.deepEqual(['hindustan-unilever','itc'].flatMap(id=>['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(c.COMPANIES.find(x=>x.id===id),slot))),previousOutput);
 assert.equal(c.companyPrimer.skipBusiness(company),true);
});
test('Nestlé separates sales by product group from single-segment company profit',()=>{
 const f=c.COMPANY_FINANCIALS[company.id],p=f.productSales;
 assert.equal(f.status,'single');assert.equal(f.rows[0].revenue,231546/10);assert.equal(f.rows[0].profit,35446/10);
 for(const [i,sourceAmount] of [77167.7,72740.1,36381.2,44425.6].entries())assert.ok(Math.abs(p.rows[i].revenue-sourceAmount/10)<1e-8);
 assert.ok(Math.abs(p.rows.reduce((s,r)=>s+r.revenue,0)-p.total)<1e-8);
 assert.ok(Math.abs(p.total+p.otherOperatingRevenue-f.rows[0].revenue)<1e-8);
 assert.ok(p.rows.every(r=>!('profit' in r)&&!('margin' in r)));
 const numbers=c.companyPrimer.render(company,'numbers');
 assert.match(numbers,/sales only/);assert.match(numbers,/not shares of profit/);
 assert.match(numbers,/₹3,544\.60/);assert.match(numbers,/₹23,071\.46/);assert.match(numbers,/₹83\.14/);
 assert.match(numbers,/15 months/);assert.match(numbers,/would invent a profit breakdown/);
 for(const slot of ['basics','specifics'])assert.ok(!/₹|23,154|3,544|77,167/.test(c.companyPrimer.render(company,slot)),slot);
 assert.equal(company.watch.length,6);assert.equal(c.COMPANY_RESEARCH_GUIDES[company.id].length,6);
});
test('Nestlé broadens its offering shelf with labelled original illustrations and valid local assets',()=>{
 const visual=c.PRODUCT_VISUALS[company.id];assert.equal(visual.length,13);
 const drawings=visual.filter(x=>x.image.includes('nestle-business-'));assert.equal(drawings.length,4);
 for(const x of drawings){assert.equal(x.kind,'illustration');assert.match(x.alt,/not a product photograph/);assert.ok(fs.existsSync('dist/'+x.image));}
 const basics=c.companyPrimer.render(company,'basics');
 for(const label of ['Milk Products and Nutrition','Prepared Dishes and Cooking Aids','Powdered and Liquid Beverages','Confectionery','Nestlé Professional'])assert.ok(basics.includes(label),label);
});

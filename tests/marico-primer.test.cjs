const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={};c.window=c;vm.createContext(c);
for(const f of ['data','company-expansion','overviews','research-guides','financial-data','product-images','hul-primer','itc-primer','nestle-primer','britannia-primer'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const other=o=>JSON.stringify(Object.fromEntries(Object.entries(o).filter(([id])=>id!=='marico')));
const profiles=JSON.stringify(c.COMPANIES.filter(x=>x.id!=='marico')),guides=other(c.COMPANY_RESEARCH_GUIDES),overviews=other(c.COMPANY_OVERVIEWS),visuals=other(c.PRODUCT_VISUALS),finances=JSON.stringify(c.COMPANY_FINANCIALS);
const ids=['hindustan-unilever','itc','nestle-india','britannia'];
const previous=ids.flatMap(id=>['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(c.COMPANIES.find(x=>x.id===id),slot)));
const originalImages=Array.from(c.PRODUCT_VISUALS.marico,p=>p.image).sort();
vm.runInContext(fs.readFileSync('dist/marico-primer.js','utf8'),c);
const company=c.COMPANIES.find(x=>x.id==='marico');
test('Marico preserves every other profile, earlier walkthrough and financial record',()=>{
 assert.equal(JSON.stringify(c.COMPANIES.filter(x=>x.id!=='marico')),profiles);
 assert.equal(other(c.COMPANY_RESEARCH_GUIDES),guides);assert.equal(other(c.COMPANY_OVERVIEWS),overviews);assert.equal(other(c.PRODUCT_VISUALS),visuals);
 assert.equal(JSON.stringify(c.COMPANY_FINANCIALS),finances);
 assert.deepEqual(ids.flatMap(id=>['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(c.COMPANIES.find(x=>x.id===id),slot))),previous);
 assert.equal(c.companyPrimer.skipBusiness(company),true);
});
test('Marico keeps product revenue separate from geographical results and reconciles company earnings',()=>{
 const f=c.COMPANY_FINANCIALS.marico,p=f.productRevenue,near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8);
 near(p.rows.reduce((s,r)=>s+r.revenue,0),p.total);near(p.total,f.revenueTotal);
 assert.deepEqual(Array.from(p.rows,r=>r.revenue),[7049,2624,2020,1918]);
 assert.ok(p.rows.every(r=>!('profit'in r)&&!('margin'in r)));
 near(f.profitTotal-p.financeCosts-p.unallocatedNetExpense,p.pbt);near(p.pbt-p.tax,p.groupPat);near(p.groupPat-p.nonControlling,p.ownersPat);
 const n=c.companyPrimer.render(company,'numbers');
 for(const text of ['two views of the same group revenue','Do not add the two tables together','₹16.05 for India','₹24.92 for International','₹2,277.00','₹1,762.00','not a profit share'])assert.ok(n.includes(text),text);
 for(const slot of ['basics','specifics'])assert.ok(!/₹|10,348|13,611|76%|1,661/.test(c.companyPrimer.render(company,slot)),slot);
 assert.equal(company.watch.length,6);assert.equal(c.COMPANY_RESEARCH_GUIDES.marico.length,6);
});
test('Marico teaches its distinctive costs, run-rate definitions and brand rights without losing product images',()=>{
 const b=c.companyPrimer.render(company,'basics'),s=c.companyPrimer.render(company,'specifics');
 for(const text of ['Coconut oil and hair oils','Cooking oils and packaged foods','Grooming and personal care','Consumer products outside India','Parachute and Parachute Advansed are separate brands'])assert.ok(b.includes(text),text);
 for(const text of ['dried flesh from inside a coconut','annualised revenue run-rate','Constant-currency growth','outside Kaya clinics','does not mean Marico owns Kaya’s clinic business'])assert.ok((b+s).includes(text),text);
 assert.deepEqual(Array.from(c.PRODUCT_VISUALS.marico,p=>p.image).sort(),originalImages);
 for(const p of c.PRODUCT_VISUALS.marico){assert.ok(fs.existsSync('dist/'+p.image));assert.equal(p.url,'https://marico.com/india/brands');}
 assert.ok(company.products.some(([name,type])=>name==='Kaya personal care'&&type.includes('rights')));
});

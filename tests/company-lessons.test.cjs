const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={};c.window=c;vm.createContext(c);
const completed=['hindustan-unilever','itc','nestle-india','britannia','marico','avenue-supermarts'];
for(const f of ['data','company-expansion','overviews','research-guides','financial-data','product-images','hul-primer','itc-primer','nestle-primer','britannia-primer','marico-primer','dmart-primer'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const baseline=JSON.parse(JSON.stringify(c.COMPANY_FINANCIALS));
const earlier=JSON.stringify(c.COMPANIES.filter(x=>completed.includes(x.id)));
const output=completed.flatMap(id=>['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(c.COMPANIES.find(x=>x.id===id),slot)));
for(const f of ['profile-lessons','company-lessons'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
test('all remaining companies have individually written lessons and the previous six remain intact',()=>{
 assert.equal(Object.keys(c.COMPANY_LESSONS).length,35);
 assert.deepEqual(Object.keys(c.COMPANY_LESSONS).sort(),Array.from(c.COMPANIES.filter(x=>!completed.includes(x.id)),x=>x.id).sort());
 assert.equal(JSON.stringify(c.COMPANIES.filter(x=>completed.includes(x.id))),earlier);
 assert.deepEqual(completed.flatMap(id=>['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(c.COMPANIES.find(x=>x.id===id),slot))),output);
 for(const [id,f]of Object.entries(baseline))assert.deepEqual(JSON.parse(JSON.stringify(c.COMPANY_FINANCIALS[id])),f,id);
});
test('new lessons have sources, practical mechanics and distinct investigation instructions',()=>{
 const guides=[];
 for(const [id,l]of Object.entries(c.COMPANY_LESSONS)){
  for(const k of ['summary','description','money','customers','drivers','checked'])assert.ok(l[k]?.length>10,id+': '+k);
  assert.ok(l.groups.length>=3&&l.basics.length>=1&&l.steps.length>=3&&l.specifics.length>=3,id);
  assert.equal(l.watch.length,5,id);assert.ok(l.risks.length>=4,id);
  for(const [q,why,how]of l.watch){assert.ok(q&&why&&how.length>90,id);guides.push(how);}
  assert.ok(l.financialNotes.length>=1&&l.sources.length>=2,id);
  for(const [label,url]of l.sources){assert.ok(label,id);assert.equal(new URL(url).protocol,'https:',id);}
  const company=c.COMPANIES.find(x=>x.id===id);
  for(const slot of ['basics','specifics']){
   const html=c.companyPrimer.render(company,slot);assert.ok(html.includes('source-note'),id);
   assert.ok(!/₹|\bINR\s+[\d,]+|\bRs\.?\s+[\d,]+/.test(html),`${id}: financial amount before numbers`);
   assert.ok(!/undefined|NaN/.test(html),id);
  }
 }
 assert.equal(new Set(guides).size,guides.length);
});
test('lesson text is escaped and unverified listing labels can replace an exchange assertion',()=>{
 const l=c.COMPANY_LESSONS['titan-company'],company=c.COMPANIES.find(x=>x.id==='titan-company'),old=l.groups[0].title;
 l.groups[0].title='<img src=x onerror=alert(1)>';
 const html=c.companyPrimer.render(company,'basics');assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img src=x'));
 l.groups[0].title=old;
 for(const id of ['rentomojo','tonbo-imaging']){const company=c.COMPANIES.find(x=>x.id===id);assert.ok(company.listingLabel,id);}
});

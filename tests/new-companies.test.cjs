const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={Intl};c.window=c;vm.createContext(c);
for(const f of ['data','company-expansion','overviews','research-guides','financial-data','product-images','profile-lessons','company-lessons'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const added=['ireda','hcg','fredun-pharmaceuticals','milky-mist','hfcl','genus-power'];

test('each added company has a complete profile, local original illustrations and no unverified financial figures',()=>{
 for(const id of added){
  const company=c.COMPANIES.find(x=>x.id===id);assert.ok(company,id);
  for(const k of ['name','ticker','sector','summary','description','money','question','answer','productSource','productNote'])assert.ok(String(company[k]||'').length>=3,`${id}: ${k}`);
  assert.ok(company.products.length>=7,id+': offerings');
  assert.ok(company.sources.length>=3,id+': sources');
  assert.equal(c.COMPANY_FINANCIALS[id],undefined,id+': figures await a separate verified review');
  const visuals=c.PRODUCT_VISUALS[id];assert.ok(visuals&&visuals.length>=7,id+': visual shelf');
  for(const v of visuals){
   assert.equal(v.kind,'illustration',`${id}: ${v.name}`);
   assert.match(v.alt,/not a product photograph/,`${id}: ${v.name}`);
   assert.ok(fs.existsSync(`dist/${v.image}`),`${id}: missing ${v.image}`);
   assert.ok(fs.readFileSync(`dist/${v.image}`,'utf8').includes('Offering illustration · Company Notebook'),`${id}: labelled`);
  }
  const lesson=c.COMPANY_LESSONS[id];assert.ok(lesson,id+': lesson');
  assert.equal(lesson.checked,'31 October 2026',id);
  assert.ok(lesson.sources.every(([,u])=>new URL(u).protocol==='https:'),id+': https lesson sources');
 }
});

test('listing labels and the sold fertility business are shown accurately',()=>{
 assert.equal(c.COMPANIES.find(x=>x.id==='fredun-pharmaceuticals').listingLabel,'BSE: FREDUN · scrip 539730');
 assert.match(c.COMPANIES.find(x=>x.id==='milky-mist').listingLabel,/listed August 2026/);
 const fertility=c.PRODUCT_VISUALS.hcg.find(v=>v.name==='Fertility treatment (Milann)');
 assert.ok(fertility,'fertility offering is shown');
 assert.match(fertility.category,/^Historical offering/);
 assert.ok(c.PRODUCT_VISUALS.hcg.filter(v=>v!==fertility).every(v=>!/^Historical/.test(v.category)));
});

test('added lessons put figures after the explanation and describe plans as plans',()=>{
 for(const id of added){
  const l=c.COMPANY_LESSONS[id];
  const explanation=JSON.stringify([l.summary,l.description,l.money,l.customers,l.groups,l.basics,l.steps,l.specifics,l.watch,l.risks,l.context,l.quiz]);
  assert.ok(!/₹|\bRs\.?\s*\d|\bINR\s*\d|crore|lakh/i.test(explanation),`${id}: amounts belong only in verified financial figures`);
 }
 assert.match(JSON.stringify(c.COMPANY_LESSONS.hfcl.context),/proposed aerospace purchase/);
 assert.match(JSON.stringify(c.COMPANY_LESSONS['genus-power'].context),/does not state/);
});

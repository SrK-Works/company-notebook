const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={Intl};c.window=c;vm.createContext(c);
for(const f of ['company-data','profile-lessons','company-lessons'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const added=['ireda','hcg','fredun-pharmaceuticals','milky-mist','hfcl','genus-power'];

test('each added company has a complete profile, local original illustrations',()=>{
 for(const id of added){
  const company=c.COMPANIES.find(x=>x.id===id);assert.ok(company,id);
  for(const k of ['name','ticker','sector','summary','productSource','productNote'])assert.ok(String(company[k]||'').length>=3,`${id}: ${k}`);
  for(const k of ['description','money'])assert.ok(String(c.COMPANY_LESSONS[id][k]||'').length>=3,`${id}: lesson ${k}`);
  assert.ok(company.products.length>=7,id+': offerings');
  assert.ok(company.sources.length>=3,id+': sources');
  const visuals=c.PRODUCT_VISUALS[id];assert.ok(visuals&&visuals.length>=7,id+': visual shelf');
  for(const v of visuals){
   assert.ok(['illustration','pack','photo','generic'].includes(v.kind),`${id}: ${v.name}`);
   assert.ok(fs.existsSync(`dist/${v.image}`),`${id}: missing ${v.image}`);
   if(v.kind==='illustration'){
    assert.match(v.alt,/not a product photograph/,`${id}: ${v.name}`);
    assert.ok(fs.readFileSync(`dist/${v.image}`,'utf8').includes('Offering illustration · Company Notebook'),`${id}: labelled`);
   }else{
    assert.match(v.image,/\.webp$/,`${id}: ${v.name}`);
    if(v.kind==='generic'){assert.match(v.credit,/Wikimedia Commons/,`${id}: ${v.name} credit`);assert.match(v.alt,/not the company's own item/,`${id}: ${v.name}`);}
   }
  }
  const lesson=c.COMPANY_LESSONS[id];assert.ok(lesson,id+': lesson');
  // Checked on or after the day these companies were added; a later re-check moves the date forward.
  assert.ok(new Date(lesson.checked)>=new Date('31 October 2026'),id+': checked date');
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

test('added lessons keep money amounts out of the explanation',()=>{
 for(const id of added){
  const l=c.COMPANY_LESSONS[id];
  const explanation=JSON.stringify([l.summary,l.description,l.money,l.customers,l.groups,l.basics,l.steps,l.specifics,l.watch,l.risks,l.context,l.quick,l.helps,l.hurts]);
  assert.ok(!/₹|\bRs\.?\s*\d|\bINR\s*\d|crore|lakh/i.test(explanation),`${id}: amounts belong only in verified financial figures`);
 }
});

const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ctx={Intl,main:{innerHTML:''},document:{},event(){},updateSaved(){},mono:()=>'',saveButton:()=>''};ctx.window=ctx;
vm.createContext(ctx);
for(const f of ['data','company-expansion','overviews','research-guides','financial-data','financials','hul-primer','itc-primer','nestle-primer','britannia-primer','marico-primer','dmart-primer','profile-lessons','company-lessons'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),ctx);
ctx.safe=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
ctx.productShelf={render:()=>'<section id="offerings"></section>',init(){}};
const app=fs.readFileSync('dist/app.js','utf8');
vm.runInContext(app.slice(app.indexOf('const openingSentence='),app.indexOf('\nfunction guide()')),ctx);
vm.runInContext('window.testOpeningSentence=openingSentence;window.testBusinessDetail=businessDetail;',ctx);
test('every company teaches the business and its risks before the financial tables',()=>{
 for(const c of ctx.COMPANIES){ctx.profile(c);const html=ctx.main.innerHTML;const ordered=['offerings','overview','business','products','watch','risks','updates','money','financials','sources'].filter(id=>id!=='business'||!ctx.companyPrimer.skipBusiness(c));let last=-1;
  for(const id of ordered){const positions=[...html.matchAll(new RegExp(`id="${id}"`,'g'))];assert.equal(positions.length,1,`${c.id}: unique ${id}`);assert.ok(positions[0].index>last,`${c.id}: ${id} order`);last=positions[0].index;}
  if(ctx.companyPrimer.skipBusiness(c)){assert.ok(!html.includes('What does this share represent?'));assert.ok(!html.includes('What you own &amp; how it works'));assert.ok(!html.includes('id="business"'));assert.match(html,/01 \/ PRODUCTS & SERVICES/);assert.match(html,/06 \/ CHECK THE ORIGINAL/);}
  assert.equal((html.match(/class="research-hint"/g)||[]).length,c.watch.length,c.id);
  assert.ok(!html.includes('undefined')&&!html.includes('NaN'),c.id);
  assert.ok(html.includes('does not yet provide a verified cash-flow, debt or valuation analysis'),c.id);
  assert.ok(html.includes('ABOUT 1 MINUTE'),c.id);
 }
});
test('investigation guidance is complete and the early business explanation does not repeat itself',()=>{
 assert.equal(Object.keys(ctx.COMPANY_RESEARCH_GUIDES).length,ctx.COMPANIES.length);
 const instructions=[];
 for(const c of ctx.COMPANIES){assert.equal(ctx.COMPANY_RESEARCH_GUIDES[c.id].length,c.watch.length,c.id);for(const text of ctx.COMPANY_RESEARCH_GUIDES[c.id]){assert.ok(text.length>90,c.id);instructions.push(text);}
  const opener=ctx.testOpeningSentence(c.money),detail=ctx.testBusinessDetail(c);assert.ok(detail.length>10,c.id);assert.ok(!detail.includes(opener),c.id);assert.equal((opener+' '+detail).trim(),c.money,c.id);
 }
 assert.equal(new Set(instructions).size,instructions.length);
 assert.match(ctx.companyPrimer.render(ctx.COMPANIES.find(c=>c.id==='glass-wall-systems'),'specifics'),/Retention is money held back/);
 assert.match(ctx.companyPrimer.render(ctx.COMPANIES.find(c=>c.id==='hdfc-bank'),'basics'),/provision is an accounting charge/i);
});

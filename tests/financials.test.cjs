const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const context={window:{},Intl};
vm.createContext(context);
for(const path of ['dist/financial-data.js','dist/financial-expansion.js','dist/financials.js'])vm.runInContext(fs.readFileSync(path,'utf8'),context);
const records=context.window.COMPANY_FINANCIALS;
const render=context.window.companyFinancials.render;
test('every financial record identifies its primary source, period, measure and scope',()=>{
 for(const [id,f]of Object.entries(records)){
  for(const key of ['period','basis','coverage','unit','profitMetric','definition','source','location','checked','notes','insight'])assert.ok(f[key],`${id}: ${key}`);
  assert.equal(new URL(f.source).protocol,'https:');
  assert.equal(new Set(f.rows.map(r=>r.name)).size,f.rows.length);
  for(const r of f.rows){assert.ok(Number.isFinite(r.revenue)&&r.revenue>=0,id);if(f.profitKind==='margin'){assert.equal(r.profit,null);assert.ok(r.margin>=0&&r.margin<=100);}else assert.ok(Number.isFinite(r.profit),id);}
 }
});
test('entered rows reconcile to reported totals within documented source rounding',()=>{
 for(const [id,f]of Object.entries(records))for(const metric of ['revenue','profit'])if(f[metric+'Total']!==undefined){
  const difference=Math.abs(f.rows.reduce((s,r)=>s+r[metric],0)-f[metric+'Total']);
  assert.ok(difference<=(f.roundingTolerance||.02),`${id} ${metric}: ${difference}`);
  if(difference>.02)assert.ok(/rounded/.test(f.notes),id+' must explain the rounding difference');
 }
});
test('losses and a negative combined result remain visibly signed',()=>{
 const html=render({id:'swiggy',name:'Swiggy'});
 assert.ok(html.includes('−3,063'));
 assert.ok(html.includes('−2,265 (loss)'));
 assert.equal((html.match(/>Loss<\/span>/g)||[]).length,3);
 assert.ok(html.includes('same ₹ crore scale'));
});
test('rounded margins are not converted into invented earnings amounts',()=>{
 const html=render({id:'tcs',name:'TCS'});
 assert.ok(html.includes('26.1%'));
 assert.ok(html.includes('Not aggregated'));
 assert.ok(!html.includes('undefined')&&!html.includes('NaN'));
});
test('company totals never advertise a ranking between businesses',()=>{
 for(const id of ['park-medi-world','glass-wall-systems','kanohar-electricals']){
  const html=render({id,name:id});assert.ok(html.includes('What the company totals tell us.'));assert.ok(!html.includes('LARGEST REVENUE'));
 }
});
test('missing verification is distinct from a company not disclosing figures',()=>{
 const html=render({id:'not-covered',name:'Example'});assert.ok(html.includes('does not mean the company does not disclose'));assert.ok(!html.includes('<table'));
});
test('issuer text is escaped and all published records render valid numeric values',()=>{
 for(const id of Object.keys(records)){const html=render({id,name:'<script>Example</script>'});assert.ok(html.includes('&lt;script&gt;Example&lt;/script&gt;'));assert.ok(!html.includes('undefined')&&!html.includes('NaN'));}
});

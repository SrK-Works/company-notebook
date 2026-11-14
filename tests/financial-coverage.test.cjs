const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={Intl};c.window=c;vm.createContext(c);
for(const f of ['company-data','financial-expansion','financials'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
// No company counts or name lists here: adding a company, or verifying one that was pending, must not need a test edit.
test('every company has either a verified snapshot or an explicit pending state',()=>{
 const ids=c.COMPANIES.map(x=>x.id);
 assert.equal(new Set(ids).size,ids.length,'company ids are unique');
 for(const company of c.COMPANIES){
  const record=c.COMPANY_FINANCIALS[company.id],html=c.companyFinancials.render(company);
  if(record){
   assert.ok(html.includes('<table'),company.id+': verified table');
   assert.ok(!html.includes('awaiting verification'),company.id);
   {
    const evidence=fs.readFileSync(`content/financial-reviews/${company.id}.evidence.md`,'utf8');
    assert.ok(evidence.includes(new URL(record.source).hostname),company.id+': source evidence');
    assert.ok(record.location&&record.rows.length,company.id+': identifiable source table');
   }
  }else{
   assert.ok(html.includes('awaiting verification'),company.id+': pending state');
   assert.ok(!html.includes('<table'),company.id+': no invented table');
  }
 }
});
test('every financial review file belongs to a company and has its evidence note',()=>{
 const files=fs.readdirSync('content/financial-reviews').filter(f=>f.endsWith('.json'));
 assert.ok(files.length>0);
 for(const f of files){
  const id=f.slice(0,-5);
  assert.ok(c.COMPANIES.some(x=>x.id===id),id+': no company with this id');
  assert.ok(fs.existsSync(`content/financial-reviews/${id}.evidence.md`),id+': missing evidence note');
  assert.ok(c.COMPANY_FINANCIALS[id],id+': not built into the site');
 }
});
test('bank tables explain total income without presenting it as product sales',()=>{
 for(const id of ['hdfc-bank','icici-bank','state-bank-of-india']){
  const record=c.COMPANY_FINANCIALS[id];
  assert.equal(record.revenueLabel,'Total income',id);
  assert.match(record.incomeDefinition,/interest/i,id);
  const html=c.companyFinancials.render({id,name:id});
  assert.ok(html.includes('Total income<br>'),id);
  assert.ok(!html.includes('Revenue is sales before costs.'),id);
  assert.ok(!html.includes('Largest revenue'),id+': whole-bank totals cannot rank businesses');
 }
});

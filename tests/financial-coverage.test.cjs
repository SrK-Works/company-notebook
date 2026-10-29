const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={Intl};c.window=c;vm.createContext(c);
for(const f of ['data','company-expansion','financial-data'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const original=JSON.stringify(c.COMPANY_FINANCIALS);
const originalIds=Object.keys(c.COMPANY_FINANCIALS);
for(const f of ['financial-expansion','financials'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
test('all 35 companies have verified snapshots and the original 17 are preserved',()=>{
 assert.equal(c.COMPANIES.length,35);
 assert.equal(Object.keys(c.COMPANY_FINANCIALS).length,35);
 const preserved=Object.fromEntries(originalIds.map(id=>[id,c.COMPANY_FINANCIALS[id]]));
 assert.equal(JSON.stringify(preserved),original);
 const files=fs.readdirSync('content/financial-reviews').filter(f=>f.endsWith('.json'));
 assert.equal(files.length,18);
 for(const company of c.COMPANIES){
  const record=c.COMPANY_FINANCIALS[company.id];assert.ok(record,company.id);
  const html=c.companyFinancials.render(company);assert.ok(html.includes('<table'),company.id);
  assert.ok(!html.includes('AWAITING VERIFICATION'),company.id);
  if(!originalIds.includes(company.id)){
   const evidence=fs.readFileSync(`content/financial-reviews/${company.id}.evidence.md`,'utf8');
   assert.ok(evidence.includes(new URL(record.source).hostname),company.id+': source evidence');
   assert.ok(record.location&&record.rows.length,company.id+': identifiable source table');
  }
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
  assert.ok(!html.includes('LARGEST REVENUE'),id+': whole-bank totals cannot rank businesses');
 }
});

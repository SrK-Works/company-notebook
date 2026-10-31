const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={Intl};c.window=c;vm.createContext(c);
for(const f of ['data','company-expansion','financial-data'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const original=JSON.stringify(c.COMPANY_FINANCIALS);
const originalIds=Object.keys(c.COMPANY_FINANCIALS);
for(const f of ['financial-expansion','financials'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const addedLater=['ireda','hcg','fredun-pharmaceuticals','milky-mist','hfcl','genus-power'];
test('the 35 companies with a verified review have snapshots, the original 17 are preserved, and 6 later additions are explicitly pending',()=>{
 assert.equal(c.COMPANIES.length,41);
 assert.equal(Object.keys(c.COMPANY_FINANCIALS).length,35);
 for(const id of addedLater){
  assert.ok(c.COMPANIES.some(x=>x.id===id),id+': profile exists');
  assert.equal(c.COMPANY_FINANCIALS[id],undefined,id+': no unverified figures');
  const html=c.companyFinancials.render(c.COMPANIES.find(x=>x.id===id));
  assert.ok(html.includes('AWAITING VERIFICATION'),id+': pending state');
  assert.ok(!html.includes('<table'),id+': no invented table');
 }
 const preserved=Object.fromEntries(originalIds.map(id=>[id,c.COMPANY_FINANCIALS[id]]));
 assert.equal(JSON.stringify(preserved),original);
 const files=fs.readdirSync('content/financial-reviews').filter(f=>f.endsWith('.json'));
 assert.equal(files.length,18);
 for(const company of c.COMPANIES.filter(x=>!addedLater.includes(x.id))){
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

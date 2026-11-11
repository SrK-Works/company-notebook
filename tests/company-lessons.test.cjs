const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={Intl};c.window=c;vm.createContext(c);
for(const f of ['company-data','financial-data','financial-expansion','financials','figure-walkthroughs','profile-lessons','company-lessons','short-profile'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const safe=v=>String(v).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const helpers={safe,mono:()=>'',saveButton:()=>'',profileSources:co=>co.sources};

test('every company has a lesson, and the lesson’s summary and sources reach the company',()=>{
 const lessonFiles=fs.readdirSync('content/company-lessons').filter(f=>f.endsWith('.json'));
 assert.equal(Object.keys(c.COMPANY_LESSONS).length,lessonFiles.length,'every lesson file is built into the site');
 assert.deepEqual(Object.keys(c.COMPANY_LESSONS).sort(),[...c.COMPANIES.map(x=>x.id)].sort(),'every company has a lesson');
 for(const co of c.COMPANIES){
  const l=c.COMPANY_LESSONS[co.id];
  assert.equal(co.summary,l.summary,co.id);
  for(const [,url]of l.sources)assert.ok(co.sources.some(([,u])=>u===url),co.id+': '+url);
 }
});
test('lessons have sources, practical mechanics and distinct investigation instructions',()=>{
 const guides=[];
 for(const [id,l]of Object.entries(c.COMPANY_LESSONS)){
  for(const k of ['summary','description','money','customers','drivers','checked'])assert.ok(l[k]?.length>10,id+': '+k);
  assert.ok(l.groups.length>=3&&l.basics.length>=1&&l.steps.length>=3&&l.specifics.length>=3,id);
  assert.equal(l.watch.length,5,id);assert.ok(l.risks.length>=4,id);
  for(const [q,why,how]of l.watch){assert.ok(q&&why&&how.length>90,id);guides.push(how);}
  assert.ok(l.financialNotes.length>=1&&l.sources.length>=2,id);
  for(const [label,url]of l.sources){assert.ok(label,id);assert.equal(new URL(url).protocol,'https:',id);}
 }
 assert.equal(new Set(guides).size,guides.length);
});
test('lesson text is escaped and unverified listing labels can replace an exchange assertion',()=>{
 const l=c.COMPANY_LESSONS['titan-company'],company=c.COMPANIES.find(x=>x.id==='titan-company'),old=l.groups[0].title;
 l.groups[0].title='<img src=x onerror=alert(1)>';
 const html=c.shortProfile.render(company,helpers);assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img src=x'));
 l.groups[0].title=old;
 for(const id of ['rentomojo','tonbo-imaging']){const company=c.COMPANIES.find(x=>x.id===id);assert.ok(company.listingLabel,id);}
});

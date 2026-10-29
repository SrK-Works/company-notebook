const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={};c.window=c;vm.createContext(c);
for(const f of ['data','company-expansion','overviews','research-guides','financial-data','product-images','hul-primer'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const untouched=JSON.stringify(c.COMPANIES.filter(x=>x.id!=='itc'));
const guides=JSON.stringify(Object.fromEntries(Object.entries(c.COMPANY_RESEARCH_GUIDES).filter(([id])=>id!=='itc')));
const financials=JSON.stringify(c.COMPANY_FINANCIALS);
const visuals=JSON.stringify(Object.fromEntries(Object.entries(c.PRODUCT_VISUALS).filter(([id])=>id!=='itc')));
const originalItcVisuals=JSON.parse(JSON.stringify(c.PRODUCT_VISUALS.itc));
const hul=c.COMPANIES.find(x=>x.id==='hindustan-unilever');
const hulOutput=['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(hul,slot));
vm.runInContext(fs.readFileSync('dist/itc-primer.js','utf8'),c);
const itc=c.COMPANIES.find(x=>x.id==='itc');
test('ITC extension preserves HUL and all other profiles, visuals, guides and financial records',()=>{
 assert.equal(JSON.stringify(c.COMPANIES.filter(x=>x.id!=='itc')),untouched);
 assert.equal(JSON.stringify(Object.fromEntries(Object.entries(c.COMPANY_RESEARCH_GUIDES).filter(([id])=>id!=='itc'))),guides);
 assert.equal(JSON.stringify(c.COMPANY_FINANCIALS),financials);
 assert.equal(JSON.stringify(Object.fromEntries(Object.entries(c.PRODUCT_VISUALS).filter(([id])=>id!=='itc'))),visuals);
 assert.deepEqual(['basics','specifics','numbers'].map(slot=>c.companyPrimer.render(hul,slot)),hulOutput);
 assert.equal(c.companyPrimer.skipBusiness(itc),true);
});
test('ITC teaches all businesses and avoids invented brand profit or subsidiary attribution',()=>{
 const basics=c.companyPrimer.render(itc,'basics'),specifics=c.companyPrimer.render(itc,'specifics'),numbers=c.companyPrimer.render(itc,'numbers');
 for(const label of ['Cigarettes','Other consumer goods','Agri business','Paperboards, paper and packaging','Technology services through ITC Infotech'])assert.ok(basics.includes(label),label);
 assert.match(specifics,/associate/);assert.match(specifics,/inter-segment revenue/);
 assert.match(numbers,/₹83\.74/);assert.match(numbers,/₹7\.17/);
 assert.match(numbers,/₹90,713/);assert.match(numbers,/₹9,846/);assert.match(numbers,/₹80,867/);
 assert.match(numbers,/not product margins, profit after tax or a shareholder’s return/);
 assert.match(numbers,/Other businesses row is not a proxy/);
 for(const early of [basics,specifics])assert.ok(!/₹|37,100|21,051|83\.74|7\.17/.test(early),'reported figures belong at the end');
 assert.equal(itc.watch.length,6);assert.equal(c.COMPANY_RESEARCH_GUIDES.itc.length,6);
});
test('ITC shelf keeps product photos and labels each new business visual as an original illustration',()=>{
 const current=c.PRODUCT_VISUALS.itc;
 for(const photo of originalItcVisuals)assert.ok(current.some(v=>v.image===photo.image&&v.kind===photo.kind));
 assert.equal(current.length,originalItcVisuals.length+4);
 const added=current.filter(v=>!originalItcVisuals.some(p=>p.image===v.image));
 for(const v of added){assert.equal(v.kind,'illustration');assert.match(v.alt,/not a product photograph/);assert.ok(fs.existsSync('dist/'+v.image));assert.equal(new URL(v.url).hostname,'itcportal.com');}
});

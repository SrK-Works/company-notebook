const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {validateLesson,ownNames}=require('../scripts/check-lessons.cjs');
const c={Intl};c.window=c;vm.createContext(c);
for(const f of ['company-data','financial-data','financial-expansion','financials','figure-walkthroughs','gallery','profile-lessons','company-lessons','short-profile'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const safe=v=>String(v).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const helpers={safe,mono:()=>'<span class="monogram"></span>',saveButton:()=>'<button class="save"></button>',profileSources:co=>co.sources};
const company=c.COMPANIES.find(x=>x.id==='delhivery');
const html=c.shortProfile.render(company,helpers);
const lesson=JSON.parse(fs.readFileSync('content/company-lessons/delhivery.json','utf8'));

test('every company has a lesson, so every company gets the page',()=>{
 for(const co of c.COMPANIES)assert.equal(c.shortProfile.applies(co),true,co.id);
 assert.equal(c.shortProfile.applies({id:'not-a-company'}),false);
});
test('the Delhivery lesson follows the template',()=>{
 const {errors}=validateLesson(lesson,ownNames('delhivery'));
 assert.deepEqual(errors,[]);
 assert.equal(lesson.quiz,undefined);
 const missing={...lesson};delete missing.helps;
 assert.ok(validateLesson(missing,ownNames('delhivery')).errors.some(e=>/helps: section is missing/.test(e)));
 assert.ok(validateLesson({...lesson,layout:'short'},ownNames('delhivery')).errors.some(e=>/unknown section "layout"/.test(e)));
});
test('the short page shows photos, four answers, the flow, helps and hurts, then figures and sources in order',()=>{
 const ids=['quick','how','balance','deeper','money','sources'];
 let last=html.indexOf('class="sp-photos"');assert.ok(last>0);
 for(const id of ids){const at=[...html.matchAll(new RegExp(`id="${id}"`,'g'))];assert.equal(at.length,1,id);assert.ok(at[0].index>last,id+' order');last=at[0].index}
 assert.equal((html.match(/class="sp-card"/g)||[]).length,4);
 assert.equal((html.match(/<ol class="sp-flow">/g)||[]).length,1);
 assert.equal((html.match(/<li><strong>/g)||[]).length,lesson.steps.length);
 assert.equal((html.match(/class="sp-helps"/g)||[]).length,1);
 assert.equal((html.match(/class="sp-hurts"/g)||[]).length,1);
 assert.ok(html.includes('<table'),'verified figures table');
});
test('every photo exists, has a description and opens its source',()=>{
 const photos=(c.PRODUCT_VISUALS.delhivery||[]).filter(p=>p.kind==='photo');
 assert.ok(photos.length>=5,'a short page needs a real photo mosaic');
 assert.equal((html.match(/class="sp-tile/g)||[]).length,photos.length);
 for(const p of photos){assert.ok(fs.existsSync('dist/'+p.image),p.image);assert.ok(p.alt.length>30,p.name);assert.match(p.url,/^https:\/\//)}
 assert.ok(!html.includes('<img src="undefined"'));
});
test('the deeper material is collapsed, the quiz is gone and nothing is undefined',()=>{
 assert.ok((html.match(/<details class="sp-more">/g)||[]).length>=6);
 assert.ok(!/<details[^>]* open/.test(html));
 assert.ok(!html.includes('A quick self-check')&&!html.includes('data-quiz'));
 assert.ok(!html.includes('undefined')&&!html.includes('NaN'));
 assert.ok(html.includes('For learning, not a stock recommendation'));
});
test('lesson sources reach the page and the figures stay in the last sections',()=>{
 for(const [label] of lesson.sources)assert.ok(html.includes(safe(label)),label);
 assert.ok(html.indexOf('id="money"')>html.indexOf('id="balance"'));
 assert.ok(!/₹|crore/.test(html.slice(0,html.indexOf('id="money"')).replace(/<details class="sp-more">[\s\S]*?<\/details>/g,'')),'no amounts before the figures section outside collapsed notes');
});
test('the page router uses the short page and the script is loaded',()=>{
 const app=fs.readFileSync('dist/app.js','utf8'),index=fs.readFileSync('dist/index.html','utf8');
 assert.ok(app.includes('window.shortProfile.render(c,'));
 for(const gone of ['function overview(','function businessSection(','data-quiz','learning-path'])assert.ok(!app.includes(gone),gone);
 assert.ok(index.includes('short-profile.js'));
 assert.ok(index.indexOf('short-profile.js')<index.indexOf('app.js?v'));
});
test('every company gets a complete page: pictures, answers, flow, balance, figures and sources',()=>{
 for(const co of c.COMPANIES.filter(x=>c.shortProfile.applies(x))){
  const page=c.shortProfile.render(co,helpers),id=co.id;
  assert.ok(page.includes('class="sp-photos"')||page.includes('class="visual-shelf"'),id+': photos or product pictures');
  let last=-1;
  for(const s of ['quick','how','balance','deeper','money','sources']){const at=page.indexOf(`id="${s}"`);assert.ok(at>last,`${id}: ${s} in order`);last=at}
  assert.equal((page.match(/class="sp-card"/g)||[]).length,4,id);
  assert.ok(!page.includes('undefined')&&!page.includes('NaN')&&!page.includes('[object'),id);
  assert.ok(!page.includes('From a seller’s shelf')||id==='delhivery',id+': no Delhivery wording on another company');
  if(co.products?.length)assert.ok(page.includes('id="products"'),id+': full product list for the shelf link');
 }
});

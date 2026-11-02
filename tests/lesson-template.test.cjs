const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {validateLesson,template}=require('../scripts/check-lessons.cjs');
const dir='content/company-lessons',ids=fs.readdirSync(dir).filter(f=>f.endsWith('.json')).map(f=>f.slice(0,-5));
const load=id=>JSON.parse(fs.readFileSync(`${dir}/${id}.json`,'utf8'));
const clone=o=>JSON.parse(JSON.stringify(o));
const errorsOf=l=>validateLesson(l).errors;

test('the template covers every section the lessons actually use',()=>{
 const known=new Set([...template.sections,...template.optional].map(s=>s.key));
 for(const id of ids)for(const k of Object.keys(load(id)))assert.ok(known.has(k),`${id} uses "${k}", which the template does not define`);
});
test('every existing lesson follows the template with no errors',()=>{
 for(const id of ids)assert.deepEqual(errorsOf(load(id)),[],`${id} breaks the lesson template`);
});
test('the checker rejects a missing section',()=>{
 const l=clone(load('ireda'));delete l.money;
 assert.ok(errorsOf(l).some(e=>e.startsWith('money: section is missing')));
});
test('the checker rejects the wrong number of research questions',()=>{
 const l=clone(load('ireda'));l.watch=l.watch.slice(0,4);
 assert.ok(errorsOf(l).some(e=>e.startsWith('watch:')));
});
test('the checker keeps money amounts out of the explanation',()=>{
 const l=clone(load('ireda'));l.money+=' It earned ₹500 crore last year.';
 assert.ok(errorsOf(l).some(e=>e.includes('actual amounts belong only in financialNotes')));
 const ok=clone(load('ireda'));ok.financialNotes[0].text+=' Revenue was ₹500 crore.';
 assert.deepEqual(errorsOf(ok),[]);
});
test('the checker rejects insecure or duplicate sources and bad dates',()=>{
 const l=clone(load('ireda'));l.sources[0][1]='http://example.com/x';l.checked='yesterday';
 const e=errorsOf(l);
 assert.ok(e.some(x=>x.startsWith('sources[0]')));assert.ok(e.some(x=>x.startsWith('checked:')));
 const d=clone(load('ireda'));d.sources[1][1]=d.sources[0][1];
 assert.ok(errorsOf(d).some(x=>x.includes('listed twice')));
});
test('the checker rejects placeholders and unknown sections',()=>{
 const l=clone(load('ireda'));l.summary+=' TODO check this';l.extra='x';
 const e=errorsOf(l);assert.ok(e.some(x=>x.includes('placeholder')));assert.ok(e.some(x=>x.includes('unknown section "extra"')));
});
test('the checker warns, without failing, about unexplained jargon and long sentences',()=>{
 const l=clone(load('ireda'));l.description+=' It offers integrated solutions on its platform.';
 const r=validateLesson(l);assert.deepEqual(r.errors,[]);
 assert.ok(r.warnings.some(w=>w.includes('integrated solutions')));assert.ok(r.warnings.some(w=>w.includes('"platform"')));
});
test('an illustration may use made-up amounts only when it says it is fictional',()=>{
 const ok=clone(load('ireda'));ok.illustration=[{title:'A fictional loan, step by step',text:'Imagine a made-up solar project that borrows ₹100 crore at an imaginary rate. These numbers are illustrative only.'}];
 assert.deepEqual(errorsOf(ok),[]);
 const unlabelled=clone(load('ireda'));unlabelled.illustration=[{title:'A loan, step by step',text:'A project borrows ₹100 crore and pays interest each year.'}];
 assert.ok(errorsOf(unlabelled).some(e=>e.startsWith('illustration[0]: must say it is fictional')));
 const elsewhere=clone(load('ireda'));elsewhere.illustration=ok.illustration;elsewhere.money+=' For example ₹100 crore.';
 assert.ok(errorsOf(elsewhere).some(e=>e.startsWith('money:')&&e.includes('actual amounts')));
 const empty=clone(load('ireda'));empty.illustration=[];
 assert.ok(errorsOf(empty).some(e=>e.startsWith('illustration:')));
});

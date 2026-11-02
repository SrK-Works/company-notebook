const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const D=require('../scripts/draft-lesson.cjs'),P=require('../scripts/publish-draft.cjs'),{validateLesson,ownNames}=require('../scripts/check-lessons.cjs');
const real=id=>JSON.parse(fs.readFileSync(`content/company-lessons/${id}.json`,'utf8'));
const clone=o=>JSON.parse(JSON.stringify(o));
const PAGE_A='https://example.com/annual-report',PAGE_B='https://example.com/about';
const pageText=t=>`<html><head><style>p{}</style><script>var x=1</script></head><body><p>${t}</p><p>${'Filler sentence about the business. '.repeat(30)}</p></body></html>`;
const QUOTE_A='IREDA is a government-owned green financing company';
function sandbox(){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'draft-'));
 const paths={root:path.resolve('.'),companies:path.join(dir,'companies'),lessons:path.join(dir,'lessons'),drafts:path.join(dir,'drafts')};
 fs.mkdirSync(paths.companies);fs.mkdirSync(paths.lessons);
 fs.copyFileSync('content/companies/ireda.json',path.join(paths.companies,'ireda.json'));
 return paths;
}
const fakeFetch=pages=>async url=>{
 const body=pages[url];if(body===undefined)return {ok:false,status:404,headers:new Map(),arrayBuffer:async()=>new ArrayBuffer(0)};
 const buf=Buffer.isBuffer(body)?body:Buffer.from(body);
 return {ok:true,status:200,headers:{get:()=>Buffer.isBuffer(body)?'application/pdf':'text/html; charset=utf-8'},arrayBuffer:async()=>buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength)};
};
const pages={[PAGE_A]:pageText(QUOTE_A+', set up to lend for clean-energy projects.'),[PAGE_B]:pageText('About the company and what it does.')};
function modelAnswer(over={}){
 const m=D.toModelShape(real('ireda'));
 m.lesson.sources=[{label:'Annual report',url:PAGE_A},{label:'About page',url:PAGE_B}];
 m.evidence=[{section:'summary',claim:'It is government-owned',sourceUrl:PAGE_A,quote:QUOTE_A}];
 return {...m,...over};
}
function fakeClient(answer,extra={}){
 const calls=[];
 const make=kind=>({stream(params){calls.push({kind,params});return {finalMessage:async()=>({model:'claude-opus-5-5',stop_reason:'end_turn',content:[{type:'text',text:JSON.stringify(answer)}],usage:{input_tokens:10,output_tokens:20},...extra})}}});
 return {calls,messages:make('plain'),beta:{messages:make('beta')}};
}

test('page markup becomes readable text without scripts and styles',()=>{
 const t=D.htmlToText('<style>a{}</style><p>Hello&nbsp;<b>world</b></p><script>alert(1)</script><p>Next &amp; last</p>');
 assert.equal(t,'Hello world\nNext & last');
});
test('a lesson survives the trip to the model\'s answer format and back',()=>{
 const l=real('ireda'),back=D.fromModelShape(D.toModelShape(l),l.checked);
 for(const k of Object.keys(l))assert.deepEqual(back[k],l[k],`${k} changed`);
 assert.deepEqual(validateLesson(back,ownNames('ireda')).errors,[]);
});
test('the answer format is strict and covers every required section',()=>{
 const walk=s=>{if(s.type==='object'){assert.equal(s.additionalProperties,false);assert.deepEqual([...s.required].sort(),Object.keys(s.properties).sort());Object.values(s.properties).forEach(walk)}else if(s.type==='array')walk(s.items)};
 const schema=D.buildSchema();walk(schema);
 const keys=require('../content/lesson-template/template.json').sections.map(s=>s.key).filter(k=>k!=='checked');
 for(const k of keys)assert.ok(schema.properties.lesson.properties[k],`schema lacks ${k}`);
});
test('the prompt carries the project standard, the template and the hard rules',()=>{
 const p=D.buildSystemPrompt();
 assert.ok(p.includes('explain a real business to a first-time reader'));
 assert.ok(p.includes('watch (exactly 5 items)'));
 assert.ok(p.includes('Never invent a customer, contract, price, fee, figure, date or product'));
});
test('evidence is accepted only when the quote is in the source',()=>{
 const sources=[{url:PAGE_A,kind:'text',text:'Intro. IREDA is a government-owned green financing company, set up long ago.'},{url:'https://example.com/r.pdf',kind:'pdf'}];
 const v=D.verifyEvidence([
  {sourceUrl:PAGE_A,quote:'ireda is a government-owned   green financing company'},
  {sourceUrl:PAGE_A,quote:'IREDA is a privately owned lender of everything'},
  {sourceUrl:PAGE_A,quote:'too short'},
  {sourceUrl:'https://example.com/r.pdf',quote:'anything at all in a pdf document'},
  {sourceUrl:'https://elsewhere.com/x',quote:'a quote from a link never provided'},
 ],sources);
 assert.deepEqual(v.map(x=>x.verified),['yes','no','invalid','unchecked','invalid']);
});
test('sources must be https, readable and not cut silently',async()=>{
 await assert.rejects(D.fetchSources(['http://example.com/a'],fakeFetch({})),/https/);
 await assert.rejects(D.fetchSources([PAGE_A],fakeFetch({[PAGE_A]:'<p>tiny</p>'})),/only \d+ characters/);
 await assert.rejects(D.fetchSources([PAGE_A],fakeFetch({})),/HTTP 404/);
 await assert.rejects(D.fetchSources([PAGE_A],fakeFetch({[PAGE_A]:'x '.repeat(250000)})),/Nothing is cut silently/);
 const pdf=await D.fetchSources(['https://example.com/r.pdf'],fakeFetch({'https://example.com/r.pdf':Buffer.from('%PDF-1.7 fake')}));
 assert.equal(pdf[0].kind,'pdf');assert.ok(pdf[0].base64);
});
test('a draft is saved as needing review, with the request built as intended',async()=>{
 const paths=sandbox(),client=fakeClient(modelAnswer());
 const {draft,file}=await D.draftLesson({id:'ireda',sourceUrls:[PAGE_A,PAGE_B],paths,client,fetchImpl:fakeFetch(pages)});
 assert.equal(draft.status,'needs-review');assert.ok(fs.existsSync(file));
 assert.deepEqual(draft.check.errors,[]);
 assert.equal(draft.evidenceSummary.verified,1);
 assert.match(draft.lesson.checked,/^\d{1,2} [A-Z][a-z]+ \d{4}$/);
 assert.equal(fs.existsSync(path.join(paths.lessons,'ireda.json')),false,'a draft must never land where the site reads lessons');
 const {kind,params}=client.calls[0];
 assert.equal(kind,'beta');assert.equal(params.model,'claude-opus-5-5');assert.equal(params.fallbacks,'default');
 assert.deepEqual(params.betas,['server-side-fallback-2026-07-01']);
 assert.equal(params.output_config.format.type,'json_schema');assert.equal(params.thinking.type,'adaptive');
 for(const banned of ['temperature','top_p','top_k'])assert.equal(params[banned],undefined);
 assert.ok(params.messages[0].content.some(b=>b.type==='text'&&b.text.includes(QUOTE_A)));
});
test('fallbacks can be switched off',async()=>{
 const client=fakeClient(modelAnswer());
 await D.draftLesson({id:'ireda',sourceUrls:[PAGE_A,PAGE_B],paths:sandbox(),client,fetchImpl:fakeFetch(pages),fallback:false});
 assert.equal(client.calls[0].kind,'plain');assert.equal(client.calls[0].params.fallbacks,undefined);
});
test('a refusal, a cut-off answer or broken JSON saves nothing',async()=>{
 for(const [extra,pattern] of [[{stop_reason:'refusal',stop_details:{category:'cyber'},content:[]},/declined.*cyber/],[{stop_reason:'max_tokens'},/cut off/]]){
  const paths=sandbox();
  await assert.rejects(D.draftLesson({id:'ireda',sourceUrls:[PAGE_A,PAGE_B],paths,client:fakeClient(modelAnswer(),extra),fetchImpl:fakeFetch(pages)}),pattern);
  assert.equal(fs.existsSync(paths.drafts),false);
 }
 const bad=fakeClient(modelAnswer());bad.beta.messages.stream=()=>({finalMessage:async()=>({stop_reason:'end_turn',content:[{type:'text',text:'not json'}]})});
 await assert.rejects(D.draftLesson({id:'ireda',sourceUrls:[PAGE_A,PAGE_B],paths:sandbox(),client:bad,fetchImpl:fakeFetch(pages)}),/valid JSON/);
});
test('a link the model invented is reported as an error',async()=>{
 const m=modelAnswer();m.lesson.sources[1].url='https://invented.example/page';
 const {draft}=await D.draftLesson({id:'ireda',sourceUrls:[PAGE_A,PAGE_B],paths:sandbox(),client:fakeClient(m),fetchImpl:fakeFetch(pages)});
 assert.ok(draft.check.errors.some(e=>e.includes('not provided')));
});
test('drafting refuses to overwrite published lessons or waiting drafts',async()=>{
 const paths=sandbox(),run=o=>D.draftLesson({id:'ireda',sourceUrls:[PAGE_A,PAGE_B],paths,client:fakeClient(modelAnswer()),fetchImpl:fakeFetch(pages),...o});
 await run({});
 await assert.rejects(run({}),/waiting for review/);
 await run({force:true});
 fs.writeFileSync(path.join(paths.lessons,'ireda.json'),'{}');
 await assert.rejects(run({}),/already has a published lesson/);
 await assert.rejects(D.draftLesson({id:'nope',sourceUrls:[PAGE_A,PAGE_B],paths,client:fakeClient({}),fetchImpl:fakeFetch(pages)}),/No company file/);
 await assert.rejects(D.draftLesson({id:'ireda',sourceUrls:[PAGE_A],paths:sandbox(),client:fakeClient({}),fetchImpl:fakeFetch(pages)}),/at least two sources/);
});
test('the review gate publishes only an approved, error-free draft, once',async()=>{
 const paths=sandbox();
 await D.draftLesson({id:'ireda',sourceUrls:[PAGE_A,PAGE_B],paths,client:fakeClient(modelAnswer()),fetchImpl:fakeFetch(pages)});
 let r=P.publishDraft({id:'ireda',paths});
 assert.equal(r.published,false);assert.equal(fs.existsSync(path.join(paths.lessons,'ireda.json')),false,'no approval, no publishing');
 r=P.publishDraft({id:'ireda',approve:true,paths});
 assert.equal(r.published,true);
 assert.deepEqual(JSON.parse(fs.readFileSync(path.join(paths.lessons,'ireda.json'),'utf8')).sources.map(s=>s[1]),[PAGE_A,PAGE_B]);
 assert.equal(JSON.parse(fs.readFileSync(path.join(paths.drafts,'ireda.json'),'utf8')).status,'published');
 assert.throws(()=>P.publishDraft({id:'ireda',approve:true,paths}),/already has a published lesson|only a draft that needs review/);
});
test('an edited draft that breaks the template cannot be published',async()=>{
 const paths=sandbox();
 await D.draftLesson({id:'ireda',sourceUrls:[PAGE_A,PAGE_B],paths,client:fakeClient(modelAnswer()),fetchImpl:fakeFetch(pages)});
 const f=path.join(paths.drafts,'ireda.json'),d=JSON.parse(fs.readFileSync(f,'utf8'));
 d.lesson.money+=' It earned ₹500 crore last year.';fs.writeFileSync(f,JSON.stringify(d));
 const r=P.publishDraft({id:'ireda',approve:true,paths});
 assert.equal(r.published,false);assert.ok(r.errors.some(e=>e.includes('actual amounts')));
 assert.equal(fs.existsSync(path.join(paths.lessons,'ireda.json')),false);
});

const KEY='test-key-not-real';
const tinyfishFetch=(body,status=200)=>async(url,init)=>{
 assert.equal(url,'https://api.fetch.tinyfish.ai');assert.equal(init.headers['X-API-Key'],KEY);
 assert.deepEqual(JSON.parse(init.body).urls,[PAGE_A]);
 return {ok:status===200,status,json:async()=>body};
};
test('a page the plain fetch cannot read is retried through TinyFish when a key is set',async()=>{
 const text='Readable text from the browser. '.repeat(30);
 const [src]=await D.fetchSources([PAGE_A],fakeFetch({}),{tinyfishKey:KEY,tinyfishFetch:tinyfishFetch({results:[{url:PAGE_A,text}]})});
 assert.equal(src.via,'tinyfish');assert.equal(src.kind,'text');assert.equal(src.text,text.trim());
});
test('without a TinyFish key the error says how to get one',async()=>{
 await assert.rejects(D.fetchSources([PAGE_A],fakeFetch({})),/HTTP 404.*TINYFISH_API_KEY/);
});
test('when TinyFish is blocked too, the error names both reasons and nothing is used',async()=>{
 await assert.rejects(D.fetchSources([PAGE_A],fakeFetch({}),{tinyfishKey:KEY,tinyfishFetch:tinyfishFetch({results:[],errors:[{url:PAGE_A,error:'bot_blocked'}]})}),/HTTP 404.*bot_blocked/);
 await assert.rejects(D.fetchSources([PAGE_A],fakeFetch({}),{tinyfishKey:KEY,tinyfishFetch:tinyfishFetch({},500)}),/TinyFish returned HTTP 500/);
});
test('TinyFish is not tried for a source that is simply too long, and a readable page never needs it',async()=>{
 const never=async()=>{throw new Error('TinyFish should not be called')};
 await assert.rejects(D.fetchSources([PAGE_A],fakeFetch({[PAGE_A]:'x '.repeat(250000)}),{tinyfishKey:KEY,tinyfishFetch:never}),/Nothing is cut silently/);
 const [ok]=await D.fetchSources([PAGE_A],fakeFetch(pages),{tinyfishKey:KEY,tinyfishFetch:never});
 assert.notEqual(ok.via,'tinyfish');
});
test('a draft can be written without the API from an answer file, with every check still applied',async()=>{
 const paths=sandbox(),answer=path.join(path.dirname(paths.drafts),'answer.json');
 fs.writeFileSync(answer,JSON.stringify(modelAnswer()));
 const {draft}=await D.draftLesson({id:'ireda',sourceUrls:[PAGE_A,PAGE_B],paths,client:D.answerFileClient(answer),fetchImpl:fakeFetch(pages),fallback:false});
 assert.equal(draft.status,'needs-review');assert.equal(draft.model,'written in a Claude Code session');
 assert.equal(draft.evidenceSummary.verified,1);assert.deepEqual(draft.check.errors,[]);
 const bad=modelAnswer();bad.evidence=[{section:'summary',claim:'x',sourceUrl:PAGE_A,quote:'A sentence that the page never says anywhere at all'}];
 fs.writeFileSync(answer,JSON.stringify(bad));
 const {draft:d2}=await D.draftLesson({id:'ireda',sourceUrls:[PAGE_A,PAGE_B],paths,client:D.answerFileClient(answer),fetchImpl:fakeFetch(pages),fallback:false,force:true});
 assert.equal(d2.evidenceSummary.notFound,1);
});

test('an illustration travels through the answer format, and an empty one is dropped',()=>{
 const l=clone(real('ireda'));l.illustration=[{title:'A fictional loan',text:'A made-up project borrows ₹100 crore. These numbers are illustrative only.'}];
 const back=D.fromModelShape(D.toModelShape(l),l.checked);
 assert.deepEqual(back.illustration,l.illustration);assert.deepEqual(validateLesson(back,ownNames('ireda')).errors,[]);
 assert.equal('illustration' in D.fromModelShape(D.toModelShape(real('ireda')),'1 January 2026'),false);
 assert.ok(D.buildSchema().properties.lesson.properties.illustration);
 assert.ok(D.buildSystemPrompt().includes('illustration (optional, 1 to 3 items'));
});
test('a quote still matches when the source uses a non-breaking hyphen',()=>{
 const v=D.verifyEvidence([{sourceUrl:PAGE_A,quote:'Liquids delivered strong double-digit growth across brands'}],[{url:PAGE_A,kind:'text',text:'Liquids delivered strong double‑digit growth across brands.'}]);
 assert.equal(v[0].verified,'yes');
});

test('a PDF quote is checked when its extracted text is supplied, and flagged when it is not in that text',async()=>{
 const pdfUrl='https://example.com/faq.pdf',bytes=Buffer.from('%PDF-1.7 fake');
 const [src]=await D.fetchSources([pdfUrl],fakeFetch({[pdfUrl]:bytes}),{pdfText:{[pdfUrl]:'The scheme gives one KWIL share for every one HUL share held on the record date.'}});
 assert.equal(src.kind,'pdf');assert.equal(src.textFromFile,true);
 const v=D.verifyEvidence([
  {sourceUrl:pdfUrl,quote:'gives one KWIL share for every one HUL share held on the record date'},
  {sourceUrl:pdfUrl,quote:'gives two KWIL shares for every one HUL share held by anybody'},
 ],[src]);
 assert.deepEqual(v.map(x=>x.verified),['yes','no']);
 const [bare]=await D.fetchSources([pdfUrl],fakeFetch({[pdfUrl]:bytes}));
 assert.equal(D.verifyEvidence([{sourceUrl:pdfUrl,quote:'any quote that is long enough here'}],[bare])[0].verified,'unchecked');
});

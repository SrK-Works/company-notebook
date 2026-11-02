// Drafts a company lesson from official sources, using the lesson template.
//
//   node scripts/draft-lesson.cjs <company> --source <https url> --source <https url> [options]
//
//   --dry-run        fetch and describe the sources, print the size of the request, call nothing
//   --no-fallback    do not ask the API to retry a declined request on another model
//   --effort <level> low | medium | high | xhigh | max   (default high)
//   --force          draft again even if a lesson or an unreviewed draft already exists
//
// The company must already have content/companies/<company>.json (its identity).
// A draft is written to content/drafts/<company>.json with status "needs-review". It is never
// placed where the site reads lessons from; scripts/publish-draft.cjs does that after a person approves.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {validateLesson,template,ownNames}=require('./check-lessons.cjs');

const MODEL='claude-opus-5-5';
const MAX_TOKENS=32000;
const MAX_SOURCE_CHARS=400000;        // about 100,000 tokens per text source; longer sources are refused, never cut
const MAX_PDF_BYTES=32*1024*1024;     // the API's request limit for PDFs
const MIN_QUOTE_CHARS=20;
const root=path.resolve(__dirname,'..');
const defaultPaths={root,companies:path.join(root,'content/companies'),lessons:path.join(root,'content/company-lessons'),drafts:path.join(root,'content/drafts')};

// ---------- sources ----------
function htmlToText(html){
 return html
  .replace(/<(script|style|noscript|svg)\b[\s\S]*?<\/\1>/gi,' ')
  .replace(/<!--[\s\S]*?-->/g,' ')
  .replace(/<\/(p|div|li|h[1-6]|tr|br|section|article)>/gi,'\n')
  .replace(/<[^>]+>/g,' ')
  .replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'")
  .replace(/&rsquo;|&#8217;/gi,'’').replace(/&lsquo;|&#8216;/gi,'‘').replace(/&ndash;|&#8211;/gi,'–').replace(/&mdash;|&#8212;/gi,'—')
  .replace(/[ \t\f\v ]+/g,' ').replace(/ *\n */g,'\n').replace(/\n{2,}/g,'\n').trim();
}

// An access problem (blocked, error status, an empty page) can be retried through TinyFish. A source that is too big or too long cannot.
class AccessProblem extends Error{}
async function fetchPlain(url,fetchImpl){
 let res;
 try{res=await fetchImpl(url,{headers:{'user-agent':'Mozilla/5.0 (compatible; CompanyNotebookDrafter/1.0)',accept:'text/html,application/pdf,text/plain;q=0.9,*/*;q=0.5'},redirect:'follow',signal:AbortSignal.timeout(45000)})}
 catch(e){throw new AccessProblem(`Could not fetch ${url}: ${e.message}.`)}
 if(!res.ok)throw new AccessProblem(`Could not fetch ${url}: HTTP ${res.status}.`);
 const type=(res.headers.get('content-type')||'').toLowerCase();
 const buf=Buffer.from(await res.arrayBuffer());
 const sha256=crypto.createHash('sha256').update(buf).digest('hex');
 if(type.includes('pdf')||buf.subarray(0,5).toString()==='%PDF-'){
  if(buf.length>MAX_PDF_BYTES)throw new Error(`${url} is ${(buf.length/1048576).toFixed(1)} MB; the limit is 32 MB. Use a smaller document, such as one section of the report.`);
  return {url,kind:'pdf',bytes:buf.length,sha256,buffer:buf};
 }
 const text=type.includes('html')||/^\s*<(!doctype|html)/i.test(buf.subarray(0,200).toString())?htmlToText(buf.toString('utf8')):buf.toString('utf8').trim();
 if(text.length<500)throw new AccessProblem(`${url} gave only ${text.length} characters of text; it may need a browser to load.`);
 return {url,kind:'text',sha256,text};
}
const TINYFISH_FETCH='https://api.fetch.tinyfish.ai';
async function fetchViaTinyfish(url,key,fetchImpl){
 let res;
 try{res=await fetchImpl(TINYFISH_FETCH,{method:'POST',headers:{'X-API-Key':key,'content-type':'application/json'},body:JSON.stringify({urls:[url],format:'markdown',purpose:'Read an official company page so a beginner-friendly lesson can be drafted from it'}),signal:AbortSignal.timeout(90000)})}
 catch(e){throw new AccessProblem(`TinyFish could not be reached: ${e.message}.`)}
 if(!res.ok)throw new AccessProblem(`TinyFish returned HTTP ${res.status}.`);
 const body=await res.json().catch(()=>({}));
 const hit=(body.results||[]).find(r=>r.url===url)||(body.results||[])[0];
 const err=(body.errors||[]).find(e=>e.url===url)||(body.errors||[])[0];
 const text=hit&&typeof hit.text==='string'?hit.text.trim():'';
 if(text.length<500)throw new AccessProblem(`TinyFish could not read it either (${err?(err.error||err.code):'no readable text'}).`);
 return {url,kind:'text',sha256:crypto.createHash('sha256').update(text).digest('hex'),text,via:'tinyfish'};
}
async function fetchSources(urls,fetchImpl=fetch,{tinyfishKey,tinyfishFetch=fetch}={}){
 const out=[];
 for(const url of urls){
  if(!/^https:\/\/[^\s]+\.[^\s]+$/.test(url))throw new Error(`Source must be an https link: ${url}`);
  let src;
  try{src=await fetchPlain(url,fetchImpl)}
  catch(e){
   if(!(e instanceof AccessProblem))throw e;
   if(!tinyfishKey)throw new Error(`${e.message} Add a different source, save the page as text, or set TINYFISH_API_KEY to retry through TinyFish.`);
   try{src=await fetchViaTinyfish(url,tinyfishKey,tinyfishFetch)}
   catch(e2){if(!(e2 instanceof AccessProblem))throw e2;throw new Error(`${e.message} ${e2.message} Add a different source, or save the page as text.`)}
  }
  if(src.kind==='text'&&src.text.length>MAX_SOURCE_CHARS)throw new Error(`${url} has ${src.text.length} characters, over the ${MAX_SOURCE_CHARS} limit. Nothing is cut silently: choose a shorter page or one section.`);
  if(src.kind==='pdf'){const {buffer,...rest}=src;out.push({...rest,base64:buffer.toString('base64')})}
  else out.push({...src,chars:src.text.length});
 }
 return out;
}

// ---------- the answer format ----------
// The API cannot enforce "exactly five items", so counts are written into the prompt and enforced by the checker.
const str={type:'string'};
const obj=props=>({type:'object',properties:props,required:Object.keys(props),additionalProperties:false});
const list=item=>({type:'array',items:item});
function buildSchema(){
 const lesson=obj({
  summary:str,description:str,money:str,customers:str,drivers:str,
  groups:list(obj({title:str,examples:str,explanation:str})),
  basics:list(obj({title:str,text:str})),
  steps:list(obj({title:str,text:str})),
  specifics:list(obj({title:str,text:str})),
  watch:list(obj({question:str,whyItMatters:str,howToInvestigate:str})),
  risks:list(obj({risk:str,howItHurts:str})),
  context:obj({title:str,text:str}),
  quiz:obj({question:str,answer:str}),
  sources:list(obj({label:str,url:str})),
  financialNotes:list(obj({title:str,text:str})),
 });
 const evidence=list(obj({section:str,claim:str,sourceUrl:str,quote:str}));
 return obj({lesson,evidence});
}
// The lesson files use short lists ("tuples") where the answer format uses named fields.
function fromModelShape(m,checked){
 const l=m.lesson;
 return {
  summary:l.summary,description:l.description,money:l.money,customers:l.customers,drivers:l.drivers,
  groups:l.groups,basics:l.basics,steps:l.steps,specifics:l.specifics,
  watch:l.watch.map(w=>[w.question,w.whyItMatters,w.howToInvestigate]),
  risks:l.risks.map(r=>[r.risk,r.howItHurts]),
  context:[l.context.title,l.context.text],
  quiz:[l.quiz.question,l.quiz.answer],
  sources:l.sources.map(s=>[s.label,s.url]),
  financialNotes:l.financialNotes,
  checked,
 };
}
function toModelShape(lesson){
 return {lesson:{
  summary:lesson.summary,description:lesson.description,money:lesson.money,customers:lesson.customers,drivers:lesson.drivers,
  groups:lesson.groups,basics:lesson.basics,steps:lesson.steps,specifics:lesson.specifics,
  watch:lesson.watch.map(([question,whyItMatters,howToInvestigate])=>({question,whyItMatters,howToInvestigate})),
  risks:lesson.risks.map(([risk,howItHurts])=>({risk,howItHurts})),
  context:{title:lesson.context[0],text:lesson.context[1]},
  quiz:{question:lesson.quiz[0],answer:lesson.quiz[1]},
  sources:lesson.sources.map(([label,url])=>({label,url})),
  financialNotes:lesson.financialNotes,
 },evidence:[]};
}

// ---------- the prompt ----------
function sectionGuide(){
 return template.sections.filter(s=>s.key!=='checked').map(s=>{
  const size=s.type==='text'?`${s.minChars} to ${s.maxChars} characters`:s.type==='pair'?'exactly one title and one text':s.minItems===s.maxItems?`exactly ${s.minItems} items`:`${s.minItems} to ${s.maxItems} items`;
  return `- ${s.key} (${size}). Answers: ${s.answers} ${s.write}`;
 }).join('\n');
}
function buildSystemPrompt(paths=defaultPaths){
 const read=f=>fs.readFileSync(path.join(paths.root,f),'utf8');
 const example=read('content/company-lessons/refex-industries.json');
 return [
  'You draft one company lesson for a notebook that explains real businesses to first-time investors. A person will review your draft before anyone reads it, and the sources you are given are the only facts you may use.',
  '## The project\'s standard for every explanation\n'+read('AGENTS.md'),
  '## Rules for lessons\n'+read('content/company-lessons/AGENTS.md'),
  `## The lesson format\nWrite every section below. ${template.reader}\n${sectionGuide()}`,
  `## Hard rules\n- Use only facts that the provided sources state. If the sources do not say it, leave it out. Never invent a customer, contract, price, fee, figure, date or product.\n- Put money amounts only in financialNotes, and only amounts a source states, together with its period, unit and whether it is standalone or consolidated. Never allocate company profit to a brand or product.\n- Repeat risks only as far as a source supports them. Do not suggest wrongdoing unless a filing says so. Describe plans as plans.\n- Every link in sources must be one of the provided source links. Use the label to say what the source is.\n- Define every abbreviation and technical term where it first appears. Avoid the words ${template.rules.jargonToExplain.map(j=>'"'+j+'"').join(', ')} unless you explain them in plain words beside them.\n- Evidence: for each factual claim in summary, description, money, customers, risks and context, give the section, the claim, the source link and a short quote copied exactly, character for character, from a source that is text. Quotes are 20 to 300 characters long. Evidence is how the reviewer checks you, so never paraphrase inside a quote.`,
  '## An example of the voice and depth wanted (a different company; do not reuse its facts)\n'+example,
 ].join('\n\n');
}
function buildUserContent(company,sources){
 const blocks=[{type:'text',text:`Company: ${company.name} (ticker ${company.ticker}, sector ${company.sector}).\nThe sources below are the only facts you may use.`}];
 for(const s of sources){
  if(s.kind==='pdf')blocks.push({type:'text',text:`Source link: ${s.url} (a PDF document, attached next)`},{type:'document',source:{type:'base64',media_type:'application/pdf',data:s.base64}});
  else blocks.push({type:'text',text:`<source link="${s.url}">\n${s.text}\n</source>`});
 }
 blocks.push({type:'text',text:'Write the lesson for this company now, following the format and the hard rules.'});
 return blocks;
}

// ---------- checking the model's evidence against the sources ----------
const norm=t=>t.replace(/[’‘`]/g,"'").replace(/[“”]/g,'"').replace(/[–—−]/g,'-').replace(/ /g,' ').replace(/\s+/g,' ').trim().toLowerCase();
function verifyEvidence(evidence,sources){
 const byUrl=new Map(sources.map(s=>[s.url,s]));
 const normalised=new Map(sources.filter(s=>s.kind==='text').map(s=>[s.url,norm(s.text)]));
 return evidence.map(e=>{
  const src=byUrl.get(e.sourceUrl);
  if(!src)return {...e,verified:'invalid',note:'cites a link that was not provided'};
  if(src.kind==='pdf')return {...e,verified:'unchecked',note:'PDF text is not available to the checker; a person must find this in the document'};
  const q=norm(e.quote||'');
  if(q.length<MIN_QUOTE_CHARS)return {...e,verified:'invalid',note:`quote is shorter than ${MIN_QUOTE_CHARS} characters`};
  return normalised.get(e.sourceUrl).includes(q)?{...e,verified:'yes'}:{...e,verified:'no',note:'the quote does not appear in the source'};
 });
}

// ---------- calling the model ----------
function today(){return new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});}
async function requestDraft({client,company,sources,effort='high',fallback=true,paths=defaultPaths}){
 const params={
  model:MODEL,max_tokens:MAX_TOKENS,
  thinking:{type:'adaptive'},
  output_config:{effort,format:{type:'json_schema',schema:buildSchema()}},
  system:[{type:'text',text:buildSystemPrompt(paths),cache_control:{type:'ephemeral'}}],
  messages:[{role:'user',content:buildUserContent(company,sources)}],
 };
 const stream=fallback
  ?client.beta.messages.stream({...params,betas:['server-side-fallback-2026-07-01'],fallbacks:'default'})
  :client.messages.stream(params);
 return stream.finalMessage();
}

async function draftLesson({id,sourceUrls,paths=defaultPaths,client,fetchImpl,tinyfishKey,tinyfishFetch,effort,fallback=true,force=false,now=()=>new Date().toISOString()}){
 const companyFile=path.join(paths.companies,id+'.json');
 if(!fs.existsSync(companyFile))throw new Error(`No company file for "${id}". Create content/companies/${id}.json first; the lesson needs the company's identity.`);
 const company=JSON.parse(fs.readFileSync(companyFile,'utf8')).company;
 const draftFile=path.join(paths.drafts,id+'.json');
 if(!force&&fs.existsSync(path.join(paths.lessons,id+'.json')))throw new Error(`${id} already has a published lesson. Use --force to draft a replacement.`);
 if(!force&&fs.existsSync(draftFile)&&JSON.parse(fs.readFileSync(draftFile,'utf8')).status==='needs-review')throw new Error(`${id} already has a draft waiting for review (content/drafts/${id}.json). Review it, or use --force to replace it.`);
 if(sourceUrls.length<2)throw new Error('Give at least two sources (--source <https link>), with a primary company or exchange document first.');
 const sources=await fetchSources(sourceUrls,fetchImpl,{tinyfishKey,tinyfishFetch});
 const message=await requestDraft({client,company,sources,effort,fallback,paths});
 if(message.stop_reason==='refusal')throw new Error(`The model declined to draft this lesson (category: ${message.stop_details?.category??'not given'}). Nothing was saved.`);
 if(message.stop_reason==='max_tokens')throw new Error('The draft was cut off at the length limit, so nothing was saved. Try fewer or shorter sources.');
 const text=message.content.filter(b=>b.type==='text').map(b=>b.text).join('');
 let parsed;try{parsed=JSON.parse(text)}catch{throw new Error('The model did not return valid JSON, so nothing was saved.')}
 const lesson=fromModelShape(parsed,today());
 const problems=[];
 const allowed=new Set(sources.map(s=>s.url));
 for(const [,url] of lesson.sources)if(!allowed.has(url))problems.push(`sources: the model listed a link that was not provided: ${url}`);
 const evidence=verifyEvidence(parsed.evidence||[],sources);
 const check=validateLesson(lesson,ownNames(id));
 check.errors.push(...problems);
 const draft={
  status:'needs-review',company:id,draftedAt:now(),model:message.model||MODEL,
  sources:sources.map(({url,kind,sha256,chars,bytes,via})=>({url,kind,sha256,...(chars?{chars}:{}),...(bytes?{bytes}:{}),...(via?{via}:{})})),
  lesson,evidence,
  evidenceSummary:{verified:evidence.filter(e=>e.verified==='yes').length,unchecked:evidence.filter(e=>e.verified==='unchecked').length,notFound:evidence.filter(e=>e.verified==='no'||e.verified==='invalid').length},
  check,
  usage:message.usage||null,
 };
 fs.mkdirSync(paths.drafts,{recursive:true});
 fs.writeFileSync(draftFile,JSON.stringify(draft,null,2)+'\n');
 return {draft,file:draftFile};
}

// For drafting without the API: a person (or a Claude Code session) writes the answer in the same format and this stands in for the model.
function answerFileClient(file){
 const make=()=>({stream(){return {finalMessage:async()=>({model:'written in a Claude Code session',stop_reason:'end_turn',content:[{type:'text',text:fs.readFileSync(file,'utf8')}],usage:null})}}});
 return {messages:make(),beta:{messages:make()}};
}

module.exports={answerFileClient,fetchViaTinyfish,MODEL,htmlToText,fetchSources,buildSchema,fromModelShape,toModelShape,buildSystemPrompt,buildUserContent,verifyEvidence,draftLesson,defaultPaths};

if(require.main===module){
 (async()=>{
  const args=process.argv.slice(2);
  const take=flag=>args.flatMap((a,i)=>a===flag?[args[i+1]]:[]);
  const valued=['--source','--effort','--answer','--dump-sources'];
  const id=args.find((a,i)=>!a.startsWith('--')&&(i===0||!valued.includes(args[i-1])));
  if(!id){console.error('Usage: node scripts/draft-lesson.cjs <company> --source <https link> --source <https link> [--dry-run] [--dump-sources <folder>] [--answer <file>] [--no-fallback] [--no-tinyfish] [--effort high] [--force]');process.exit(2)}
  const sourceUrls=take('--source'),effort=take('--effort')[0]||'high',answerFile=take('--answer')[0],dumpDir=take('--dump-sources')[0];
  const tinyfishKey=args.includes('--no-tinyfish')?undefined:process.env.TINYFISH_API_KEY||undefined;
  try{
   if(args.includes('--dry-run')||dumpDir){
    const company=JSON.parse(fs.readFileSync(path.join(defaultPaths.companies,id+'.json'),'utf8')).company;
    const sources=await fetchSources(sourceUrls,fetch,{tinyfishKey});
    if(dumpDir){
     fs.mkdirSync(dumpDir,{recursive:true});
     sources.forEach((s,i)=>{const f=path.join(dumpDir,`source-${i+1}.${s.kind==='pdf'?'pdf':'txt'}`);fs.writeFileSync(f,s.kind==='pdf'?Buffer.from(s.base64,'base64'):s.text);console.log(`saved ${f}  <-  ${s.url}${s.via?' (read through TinyFish)':''}`)});
    }
    if(args.includes('--dry-run')){
     const system=buildSystemPrompt(),user=buildUserContent(company,sources);
     const chars=system.length+user.filter(b=>b.type==='text').reduce((n,b)=>n+b.text.length,0);
     console.log(`\nDry run for ${company.name}. Nothing was sent to the API and no draft was saved.\n`);
     sources.forEach(s=>console.log(`  ${s.kind==='pdf'?'PDF ':'text'}  ${s.kind==='pdf'?(s.bytes/1048576).toFixed(1)+' MB':s.chars+' characters'}${s.via?'  (via TinyFish)':''}  ${s.url}`));
     console.log(`\nRequest text: about ${chars} characters, roughly ${Math.round(chars/4)} tokens, plus any PDF pages.\nModel: ${MODEL}, effort ${effort}, up to ${MAX_TOKENS} output tokens.`);
    }
    return;
   }
   let client;
   if(answerFile)client=answerFileClient(answerFile);
   else{const Anthropic=require('@anthropic-ai/sdk');client=new (Anthropic.default||Anthropic)()}
   const {draft,file}=await draftLesson({id,sourceUrls,client,tinyfishKey,effort,fallback:!answerFile&&!args.includes('--no-fallback'),force:args.includes('--force')});
   const e=draft.evidenceSummary;
   console.log(`Draft saved: ${path.relative(root,file)} (status: ${draft.status})`);
   console.log(`Checker: ${draft.check.errors.length} errors, ${draft.check.warnings.length} warnings.`);
   console.log(`Evidence: ${e.verified} quotes found in the sources, ${e.unchecked} in PDFs to check by hand, ${e.notFound} not found.`);
   draft.check.errors.forEach(x=>console.log('  ERROR  '+x));
   if(draft.usage)console.log(`Tokens: ${draft.usage.input_tokens} in, ${draft.usage.output_tokens} out.`);
   console.log('\nNothing is live. Read the draft, fix anything wrong, then: node scripts/publish-draft.cjs '+id+' --approve');
  }catch(err){console.error('\n'+err.message);process.exit(1)}
 })();
}

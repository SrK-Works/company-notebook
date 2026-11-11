// Checks company lessons against content/lesson-template/template.json.
//   node scripts/check-lessons.cjs                 check every lesson, list errors and warnings
//   node scripts/check-lessons.cjs ireda tcs       check only these companies
//   node scripts/check-lessons.cjs --strict        warnings also fail
// Errors mean the lesson breaks the format and must not be published.
// Warnings mean a person should read that sentence before publishing; the checker cannot judge clarity.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const template=JSON.parse(fs.readFileSync(path.join(root,'content/lesson-template/template.json'),'utf8'));
const lessonDir=path.join(root,'content/company-lessons');
const MONTHS='January|February|March|April|May|June|July|August|September|October|November|December';
const DATE=new RegExp(`^\\d{1,2} (${MONTHS}) \\d{4}$`);
const isText=v=>typeof v==='string'&&v.trim().length>0;
const sentences=t=>t.split(/(?<=[.!?])\s+/).filter(Boolean);

// Every piece of text in a lesson with the section it sits in, so rules can say where the problem is.
function* texts(lesson){
 for(const [key,v] of Object.entries(lesson)){
  if(key==='sources'||key==='financial'||key==='checked'||key==='historicalOfferings'||key==='products')continue;
  const walk=function*(x,where){
   if(typeof x==='string')yield [where,x];
   else if(Array.isArray(x))for(const [i,y] of x.entries())yield* walk(y,`${where}[${i}]`);
   else if(x&&typeof x==='object')for(const [k,y] of Object.entries(x))yield* walk(y,`${where}.${k}`);
  };
  yield* walk(v,key);
 }
}

// ownNames: words that are the company's own name or brands (from its company file), so they are not flagged as undefined jargon.
function validateLesson(lesson,ownNames=[]){
 const errors=[],warnings=[],R=template.rules;
 const sectionKeys=template.sections.map(s=>s.key),optionalKeys=template.optional.map(o=>o.key);
 for(const k of Object.keys(lesson))if(!sectionKeys.includes(k)&&!optionalKeys.includes(k))errors.push(`unknown section "${k}"`);
 for(const s of template.sections){
  const v=lesson[s.key],at=s.key;
  if(v===undefined){errors.push(`${at}: section is missing`);continue}
  if(s.type==='text'){
   if(!isText(v)){errors.push(`${at}: must be text`);continue}
   if(v.length<s.minChars)errors.push(`${at}: ${v.length} characters is too short (minimum ${s.minChars})`);
   if(v.length>s.maxChars)errors.push(`${at}: ${v.length} characters is too long (maximum ${s.maxChars})`);
  }else if(s.type==='date'){
   if(!isText(v)||!DATE.test(v))errors.push(`${at}: must look like "31 October 2026"`);
  }else if(s.type==='pair'){
   if(!Array.isArray(v)||v.length!==2||!v.every(isText))errors.push(`${at}: must be two non-empty text parts (${s.tupleLabels.join(', ')})`);
  }else if(s.type==='list'||s.type==='tuples'){
   if(!Array.isArray(v)){errors.push(`${at}: must be a list`);continue}
   if(v.length<s.minItems||v.length>s.maxItems)errors.push(`${at}: has ${v.length} items, needs ${s.minItems===s.maxItems?s.minItems:s.minItems+' to '+s.maxItems}`);
   v.forEach((item,i)=>{
    if(s.type==='list'){
     for(const f of s.itemShape)if(!isText(item&&item[f]))errors.push(`${at}[${i}]: "${f}" is missing or empty`);
     for(const f of Object.keys(item||{}))if(!s.itemShape.includes(f))errors.push(`${at}[${i}]: unexpected field "${f}"`);
     if(s.maxChars&&isText(item&&item.text)&&item.text.length>s.maxChars)errors.push(`${at}[${i}]: ${item.text.length} characters is too long (maximum ${s.maxChars})`);
    }else if(!Array.isArray(item)||item.length!==s.tupleLength||!item.every(isText)){
     errors.push(`${at}[${i}]: needs ${s.tupleLength} non-empty parts (${s.tupleLabels.join(', ')})`);
    }
   });
  }
 }
 // optional worked example with made-up numbers: must be labelled as fictional
 if(lesson.illustration!==undefined){
  const il=template.optional.find(o=>o.key==='illustration'),label=new RegExp(R.illustrationLabelPattern,'i'),v=lesson.illustration;
  if(!Array.isArray(v)||v.length<il.minItems||v.length>il.maxItems)errors.push(`illustration: needs ${il.minItems} to ${il.maxItems} items`);
  else v.forEach((item,i)=>{
   for(const f of il.itemShape)if(!isText(item&&item[f]))errors.push(`illustration[${i}]: "${f}" is missing or empty`);
   if(isText(item&&item.title)&&isText(item&&item.text)&&!label.test(item.title+' '+item.text))errors.push(`illustration[${i}]: must say it is fictional or illustrative`);
  });
 }
 // optional heading above the steps
 if(lesson.stepsTitle!==undefined){const o=template.optional.find(o=>o.key==='stepsTitle');if(!isText(lesson.stepsTitle)||lesson.stepsTitle.length>o.maxChars)errors.push(`stepsTitle: must be text of at most ${o.maxChars} characters`)}
 // sources
 if(Array.isArray(lesson.sources)){
  const urls=lesson.sources.map(x=>x&&x[1]);
  urls.forEach((u,i)=>{if(!isText(u)||!/^https:\/\/[^\s]+\.[^\s]+/.test(u))errors.push(`sources[${i}]: link must start with https://`)});
  if(new Set(urls).size!==urls.length)errors.push('sources: the same link is listed twice');
 }
 // rules that apply to all prose
 const amount=new RegExp(R.amountPattern,'i'),placeholder=new RegExp(R.placeholderPattern,'i');
 const jargon=R.jargonToExplain,allowed=new Set([...R.allowedAbbreviations,...ownNames]);
 const seenAbbr=new Set();
 for(const [where,text] of texts(lesson)){
  const section=where.split(/[\[.]/)[0];
  if(!R.amountsOnlyIn.includes(section)&&amount.test(text))errors.push(`${where}: actual amounts belong only in financialNotes`);
  if(placeholder.test(text))errors.push(`${where}: contains placeholder text`);
  for(const j of jargon)if(new RegExp(`\\b${j}\\b`,'i').test(text))warnings.push(`${where}: "${j}" needs a concrete explanation, not another label`);
  for(const sentence of sentences(text)){
   const n=sentence.split(/\s+/).length;
   if(n>R.maxSentenceWords)warnings.push(`${where}: a ${n}-word sentence is hard for a beginner; split it ("${sentence.slice(0,50)}…")`);
  }
  for(const m of text.matchAll(/\b[A-Z]{2,6}\b/g)){
   const a=m[0];if(allowed.has(a)||seenAbbr.has(a))continue;seenAbbr.add(a);
   const before=text.slice(Math.max(0,m.index-3),m.index),after=text.slice(m.index+a.length,m.index+a.length+3);
   const defined=before.includes('(')||/^\s*\(/.test(after)||/^\)/.test(after);
   if(!defined)warnings.push(`${where}: "${a}" appears without a definition beside it`);
  }
 }
 return {errors,warnings};
}

function ownNames(id){
 const file=path.join(root,'content/companies',id+'.json');
 if(!fs.existsSync(file))return [];
 const r=JSON.parse(fs.readFileSync(file,'utf8')),c=r.company;
 const words=[c.name,c.ticker,c.listingLabel,...(c.aliases||[]),...r.offerings.map(o=>o.name)].filter(Boolean).join(' ');
 return [...new Set((words.match(/\b[A-Z]{2,6}\b/g)||[]).concat((words.toUpperCase().match(/\b[A-Z]{2,6}\b/g)||[])))];
}
function loadAll(only=[]){
 return fs.readdirSync(lessonDir).filter(f=>f.endsWith('.json')).map(f=>f.slice(0,-5)).filter(id=>!only.length||only.includes(id))
  .map(id=>[id,JSON.parse(fs.readFileSync(path.join(lessonDir,id+'.json'),'utf8'))]);
}

module.exports={validateLesson,template,ownNames};

if(require.main===module){
 const args=process.argv.slice(2),strict=args.includes('--strict'),only=args.filter(a=>!a.startsWith('--'));
 const all=loadAll(only);
 if(only.length&&all.length!==only.length)throw new Error('Unknown company: '+only.filter(o=>!all.some(([id])=>id===o)).join(', '));
 let bad=0,warned=0,errCount=0,warnCount=0;
 for(const [id,lesson] of all){
  const {errors,warnings}=validateLesson(lesson,ownNames(id));
  errCount+=errors.length;warnCount+=warnings.length;
  if(errors.length)bad++;if(warnings.length)warned++;
  if(errors.length||warnings.length){
   console.log(`\n${id}`);
   errors.forEach(e=>console.log('  ERROR  '+e));
   warnings.forEach(w=>console.log('  warn   '+w));
  }
 }
 console.log(`\nChecked ${all.length} lessons: ${errCount} errors in ${bad} lessons, ${warnCount} warnings in ${warned} lessons.`);
 if(errCount||(strict&&warnCount))process.exit(1);
}

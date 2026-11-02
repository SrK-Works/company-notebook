// The review gate. Moves an approved draft into content/company-lessons/ where the site reads it.
//
//   node scripts/publish-draft.cjs <company>             show what would happen; change nothing
//   node scripts/publish-draft.cjs <company> --approve   publish it
//
// A draft is published only if a person approves with --approve, it still passes the lesson checker
// right now (the person may have edited it), and it has not been published already.
const fs=require('node:fs'),path=require('node:path');
const {validateLesson,ownNames}=require('./check-lessons.cjs');
const root=path.resolve(__dirname,'..');
const defaultPaths={root,companies:path.join(root,'content/companies'),lessons:path.join(root,'content/company-lessons'),drafts:path.join(root,'content/drafts')};

function publishDraft({id,approve=false,paths=defaultPaths,now=()=>new Date().toISOString()}){
 const draftFile=path.join(paths.drafts,id+'.json');
 if(!fs.existsSync(draftFile))throw new Error(`No draft for "${id}" in content/drafts/.`);
 const draft=JSON.parse(fs.readFileSync(draftFile,'utf8'));
 if(draft.status!=='needs-review')throw new Error(`Draft status is "${draft.status}"; only a draft that needs review can be published.`);
 const lessonFile=path.join(paths.lessons,id+'.json');
 if(fs.existsSync(lessonFile))throw new Error(`${id} already has a published lesson. Edit that file, or remove it first if this draft should replace it.`);
 const {errors,warnings}=validateLesson(draft.lesson,ownNames(id));
 const e=draft.evidenceSummary||{};
 const report={id,errors,warnings,evidence:{verified:e.verified||0,unchecked:e.unchecked||0,notFound:e.notFound||0},published:false};
 if(errors.length)return report;
 if(!approve)return report;
 fs.writeFileSync(lessonFile,JSON.stringify(draft.lesson,null,2)+'\n');
 fs.writeFileSync(draftFile,JSON.stringify({...draft,status:'published',publishedAt:now()},null,2)+'\n');
 report.published=true;
 return report;
}

module.exports={publishDraft,defaultPaths};

if(require.main===module){
 const args=process.argv.slice(2),id=args.find(a=>!a.startsWith('--'));
 if(!id){console.error('Usage: node scripts/publish-draft.cjs <company> [--approve]');process.exit(2)}
 try{
  const r=publishDraft({id,approve:args.includes('--approve')});
  console.log(`${id}: ${r.errors.length} errors, ${r.warnings.length} warnings; evidence ${r.evidence.verified} found, ${r.evidence.unchecked} to check by hand, ${r.evidence.notFound} not found.`);
  r.errors.forEach(x=>console.log('  ERROR  '+x));
  r.warnings.forEach(x=>console.log('  warn   '+x));
  if(r.errors.length){console.log('\nNot published. Fix the errors in the draft file first.');process.exit(1)}
  if(!r.published){console.log('\nNothing changed. Read the draft, then add --approve to publish it.');process.exit(0)}
  console.log(`\nPublished to content/company-lessons/${id}.json. Next: node scripts/build-company-lessons.cjs, then node --test tests/`);
 }catch(err){console.error('\n'+err.message);process.exit(1)}
}

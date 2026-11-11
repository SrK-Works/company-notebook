#!/usr/bin/env node
// Builds the three generated site bundles from content/. They are not stored in git:
// tests and the deploy build them, so separate changes never collide in a generated file.
//   node scripts/build.cjs             build everything
//   node scripts/build.cjs --stamp X   also replace ?v=dev in dist/index.html with ?v=X (used by the deploy)
const {execFileSync}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
for(const s of ['build-company-data','build-company-lessons','build-financial-reviews'])
 execFileSync(process.execPath,[path.join(__dirname,s+'.cjs')],{stdio:'inherit',cwd:root});
const i=process.argv.indexOf('--stamp');
if(i>0){
 const stamp=String(process.argv[i+1]||'').replace(/[^\w-]/g,'').slice(0,12);
 if(!stamp)throw new Error('--stamp needs a value, for example the commit id');
 const file=path.join(root,'dist/index.html');
 fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace(/\?v=dev"/g,`?v=${stamp}"`));
 console.log(`Stamped dist/index.html with v=${stamp}.`);
}

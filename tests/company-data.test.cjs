const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const dir='content/companies',files=fs.readdirSync(dir).filter(f=>f.endsWith('.json'));
const records=files.map(f=>[f.slice(0,-5),JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'))]);
const lessonIds=fs.readdirSync('content/company-lessons').filter(f=>f.endsWith('.json')).map(f=>f.slice(0,-5));
const required=['id','name','ticker','sector','initial','color','bg','tag','summary','description','products','money','ownership','watch','risks','sources','update','question','answer'];

test('the generated company bundle matches the per-company files',()=>{
 execFileSync('node',['scripts/build-company-data.cjs','--check'],{stdio:'pipe'});
});
test('every company file is complete and named after its company',()=>{
 for(const [id,r] of records){
  assert.equal(r.company.id,id);
  for(const k of required)assert.ok(r.company[k]!==undefined&&r.company[k]!=='',`${id} is missing ${k}`);
  assert.ok(r.offerings.length>0,`${id} has no offering cards`);
  for(const o of r.offerings)for(const k of ['name','category','image','url','kind','alt'])assert.ok(o[k],`${id}: offering "${o.name}" is missing ${k}`);
 }
});
test('company order numbers are unique and every lesson has a company file',()=>{
 assert.equal(new Set(records.map(([,r])=>r.order)).size,records.length);
 for(const id of lessonIds)assert.ok(records.some(([rid])=>rid===id),`lesson ${id} has no company file`);
});
test('offering images point to files that exist',()=>{
 for(const [id,r] of records)for(const o of r.offerings)assert.ok(fs.existsSync(path.join('dist',o.image)),`${id}: missing image ${o.image}`);
});

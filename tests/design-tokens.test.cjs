const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const css=fs.readFileSync('dist/style.css','utf8');
const index=fs.readFileSync('dist/index.html','utf8');
test('every colour or size token the stylesheet uses is defined',()=>{
 const defined=new Set([...css.matchAll(/(--[a-z0-9-]+):/g)].map(m=>m[1]));
 const runtime=new Set(['--company-color','--company-bg']);// set inline per company
 for(const [,name] of css.matchAll(/var\((--[a-z0-9-]+)/g))assert.ok(defined.has(name)||runtime.has(name),`${name} is used but never defined`);
});
test('dark mode redefines the colour tokens instead of restyling components',()=>{
 const dark=css.match(/html\[data-theme="dark"\]\{([^}]*)\}/);assert.ok(dark,'one dark token block');
 for(const t of ['--ground','--surface','--tint','--ink','--muted','--line','--accent','--on-accent'])assert.ok(dark[1].includes(t+':'),t);
 assert.ok(!/html\[data-theme="dark"\] \.(card|content-section|sp-section|chip|search)\b/.test(css),'components follow the tokens');
});
test('the page uses the top bar and has no leftover sidebar or dark-style picker',()=>{
 assert.match(index,/<header class="bar">/);
 for(const gone of ['class="sidebar','dark-themes.css','theme-variants.js','data-sidebar-toggle'])assert.ok(!index.includes(gone),gone);
 assert.ok(!fs.readFileSync('dist/app.js','utf8').includes('sidebarToggle'));
});

const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const css=fs.readFileSync('dist/dark-themes.css','utf8');
const options=['a','b','c'];
// Tokens that already exist for every theme in style.css, or are set per element by the page.
const provided=new Set(['company-color']);
const variantBlock=o=>{const m=css.match(new RegExp(`html\\[data-theme="dark"\\]\\[data-dark="${o}"\\]\\{([^}]*)\\}`));assert.ok(m,`option ${o} is defined`);return m[1]};
const defined=block=>new Set([...block.matchAll(/--([a-z0-9-]+):/g)].map(m=>m[1]));
const sharedStart=css.indexOf('/* ---------- the shared rules');
const shared=css.slice(sharedStart,css.indexOf('/* ---------- the Dark style picker'));
// tokens set inside the shared rules themselves (for example --sp-help) count as defined
const setByShared=defined(shared);
const used=[...new Set([...shared.matchAll(/var\(--([a-z0-9-]+)\)/g)].map(m=>m[1]))].filter(t=>!provided.has(t)&&!setByShared.has(t));

test('every dark option sets every colour and size the shared rules use',()=>{
 assert.ok(used.length>20,'the shared rules use a real set of tokens');
 for(const o of options){
  const d=defined(variantBlock(o));
  for(const t of used)assert.ok(d.has(t),`option ${o} does not set --${t}`);
 }
});
test('the options are loaded by the page and offered in the picker',()=>{
 const index=fs.readFileSync('dist/index.html','utf8'),js=fs.readFileSync('dist/theme-variants.js','utf8');
 assert.ok(index.includes('dark-themes.css')&&index.includes('theme-variants.js'));
 for(const o of ['classic',...options])assert.ok(js.includes(`['${o}'`),`picker offers ${o}`);
 assert.match(index,/data-dark=d/,'the saved option is applied before the page paints');
});
test('the original dark mode is left in place as the Current option',()=>{
 const base=fs.readFileSync('dist/style.css','utf8');
 assert.ok(base.includes('html[data-theme="dark"]{--blue:#d7b878'));
 assert.ok(!/data-dark/.test(base),'style.css does not know about the options');
});
test('icons are drawn as SVG instead of text symbols',()=>{
 const index=fs.readFileSync('dist/index.html','utf8'),app=fs.readFileSync('dist/app.js','utf8');
 for(const g of ['▦','▱','◷','◐','▤'])assert.ok(!index.includes(g),`index.html still has ${g}`);
 for(const g of ['▱','▣','⌕','☀'])assert.ok(!app.includes(g),`app.js still has ${g}`);
 assert.ok(app.includes('ICON.bookmark')&&app.includes('ICON.sun')&&app.includes('ICON.moon'));
});

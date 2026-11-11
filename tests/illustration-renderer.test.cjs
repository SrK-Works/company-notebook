const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const real=id=>JSON.parse(fs.readFileSync(`content/company-lessons/${id}.json`,'utf8'));
const safe=v=>String(v).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const helpers={safe,mono:()=>'',saveButton:()=>'',profileSources:co=>co.sources};
// Render one company page with the given lessons in place of the built ones.
function page(lessons,id){
 const c={Intl};c.window=c;vm.createContext(c);
 for(const f of ['company-data','financial-data','financial-expansion','financials','figure-walkthroughs'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
 c.COMPANY_LESSONS=lessons;
 for(const f of ['company-lessons','short-profile'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
 return c.shortProfile.render(c.COMPANIES.find(x=>x.id===id),helpers);
}
const withIllustration=items=>({...real('ireda'),illustration:items});
const SET='These numbers are fictional. A made-up project borrows ₹100. It pays ₹8 interest. The lender keeps ₹3 after its own costs.';

test('a lesson with an illustration shows it under Go deeper, labelled as made up',()=>{
 const html=page({ireda:withIllustration([{title:'A fictional loan',text:SET}])},'ireda');
 assert.ok(html.includes('<summary>A made-up example</summary>'));
 assert.ok(html.includes('class="primer-illustration"'));
 assert.ok(html.includes('Illustration · made-up numbers, not the company’s figures'));
 assert.ok(html.includes('<h4>A fictional loan</h4>'));
 assert.ok(html.indexOf('primer-illustration')>html.indexOf('id="deeper"')&&html.indexOf('primer-illustration')<html.indexOf('id="money"'),'the example sits under Go deeper, before the real figures');
});
test('a set of numbers becomes short lines, and a short text stays a paragraph',()=>{
 const lines=page({ireda:withIllustration([{title:'A',text:SET}])},'ireda');
 assert.ok(lines.includes('<p>These numbers are fictional.</p><ul><li>A made-up project borrows ₹100.</li>'));
 const short=page({ireda:withIllustration([{title:'A',text:'This is a fictional example. It has two sentences.'}])},'ireda');
 assert.ok(short.includes('<p>This is a fictional example. It has two sentences.</p></aside>'));
});
test('a lesson without an illustration has no made-up example',()=>{
 const without=page({ireda:real('ireda')},'ireda');
 assert.ok(!without.includes('primer-illustration')&&!without.includes('A made-up example'));
});
test('several illustrations render in order, and the rest of the page is unchanged',()=>{
 const l=withIllustration([{title:'First fictional example',text:'A fictional one.'},{title:'Second fictional example',text:'A fictional two.'}]);
 const html=page({ireda:l},'ireda'),plain=page({ireda:real('ireda')},'ireda');
 assert.equal((html.match(/class="primer-illustration"/g)||[]).length,2);
 assert.ok(html.indexOf('First fictional example')<html.indexOf('Second fictional example'));
 const cut=h=>h.replace(/<details class="sp-more"><summary>A made-up example<\/summary>[\s\S]*?<\/details>/,'');
 assert.equal(cut(html),plain);
});
test('illustration text cannot inject markup',()=>{
 const html=page({ireda:withIllustration([{title:'<img src=x onerror=alert(1)>',text:'A fictional <script>alert(1)</script> example.'}])},'ireda');
 assert.ok(!html.includes('<img src=x')&&!html.includes('<script>alert'));
 assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
});
test('the page loads every script in dist, and every script it loads exists',()=>{
 const index=fs.readFileSync('dist/index.html','utf8');
 const loaded=[...index.matchAll(/<script defer src="([^"?]+)\?v=dev"><\/script>/g)].map(m=>m[1]);
 for(const f of loaded)assert.ok(fs.existsSync('dist/'+f),f+' is loaded but missing');
 for(const f of fs.readdirSync('dist').filter(f=>f.endsWith('.js')))assert.ok(loaded.includes(f),f+' exists but is never loaded');
 assert.ok(/style\.css\?v=dev\"/.test(index),'every file is stamped by the deploy, so the source keeps ?v=dev');
 assert.ok(!/\?v=(?!dev")/.test(index),'no hand-written version numbers left');
 assert.ok(fs.readFileSync('dist/style.css','utf8').includes('.primer-illustration'));
});

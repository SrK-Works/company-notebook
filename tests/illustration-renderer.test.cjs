const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const real=id=>JSON.parse(fs.readFileSync(`content/company-lessons/${id}.json`,'utf8'));
function page(lessons,slot,id){
 const c={};c.window=c;vm.createContext(c);
 for(const f of ['company-data','overviews','research-guides','financial-data'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
 c.COMPANY_LESSONS=lessons;
 vm.runInContext(fs.readFileSync('dist/company-lessons.js','utf8'),c);
 return c.companyPrimer.render(c.COMPANIES.find(x=>x.id===id),slot);
}
const withIllustration=items=>({...real('ireda'),illustration:items});
const SET='These numbers are fictional. A made-up project borrows ₹100. It pays ₹8 interest. The lender keeps ₹3 after its own costs.';

test('a lesson with an illustration shows it in the basics section, labelled as made up',()=>{
 const html=page({ireda:withIllustration([{title:'A fictional loan',text:SET}])},'basics','ireda');
 assert.ok(html.includes('class="primer-illustration"'));
 assert.ok(html.includes('Illustration · made-up numbers, not the company’s figures'));
 assert.ok(html.includes('<h3>A fictional loan</h3>'));
 assert.ok(html.indexOf('primer-illustration')<html.indexOf('source-note'),'the example comes before the sources line');
});
test('a set of numbers becomes short lines, and a short text stays a paragraph',()=>{
 const lines=page({ireda:withIllustration([{title:'A',text:SET}])},'basics','ireda');
 assert.ok(lines.includes('<p>These numbers are fictional.</p><ul><li>A made-up project borrows ₹100.</li>'));
 const short=page({ireda:withIllustration([{title:'A',text:'This is a fictional example. It has two sentences.'}])},'basics','ireda');
 assert.ok(short.includes('<p>This is a fictional example. It has two sentences.</p></aside>'));
 assert.ok(!short.includes('<ul>'));
});
test('a lesson without an illustration renders exactly as before',()=>{
 const without=page({ireda:real('ireda')},'basics','ireda');
 assert.ok(!without.includes('primer-illustration'));
 assert.ok(without.includes('id="ireda-basics"')&&without.includes('source-note'));
});
test('several illustrations render in order, and the other sections are untouched',()=>{
 const l=withIllustration([{title:'First fictional example',text:'A fictional one.'},{title:'Second fictional example',text:'A fictional two.'}]);
 const html=page({ireda:l},'basics','ireda');
 assert.equal((html.match(/class="primer-illustration"/g)||[]).length,2);
 assert.ok(html.indexOf('First fictional example')<html.indexOf('Second fictional example'));
 assert.equal(page({ireda:l},'specifics','ireda'),page({ireda:real('ireda')},'specifics','ireda'));
 assert.equal(page({ireda:l},'numbers','ireda'),page({ireda:real('ireda')},'numbers','ireda'));
});
test('illustration text cannot inject markup',()=>{
 const html=page({ireda:withIllustration([{title:'<img src=x onerror=alert(1)>',text:'A fictional <script>alert(1)</script> example.'}])},'basics','ireda');
 assert.ok(!html.includes('<img src=x')&&!html.includes('<script>alert'));
 assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
});
test('the page stylesheet and script versions were bumped so browsers fetch the new renderer',()=>{
 const index=fs.readFileSync('dist/index.html','utf8');
 assert.ok(index.includes('company-lessons.js?v=20261103-2')&&index.includes('style.css?v=20261103-1'));
 assert.ok(fs.readFileSync('dist/style.css','utf8').includes('.primer-illustration'));
});

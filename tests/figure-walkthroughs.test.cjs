const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={Intl};c.window=c;vm.createContext(c);
for(const f of ['company-data','financial-data','financial-expansion','figure-walkthroughs'])vm.runInContext(fs.readFileSync(`dist/${f}.js`,'utf8'),c);
const walk=id=>c.FIGURE_WALKTHROUGHS[id]();
const has=(id,texts)=>{const html=walk(id);for(const t of texts)assert.ok(html.includes(t),`${id}: ${t}`)};

test('six companies keep their plain-language figure walkthroughs, and nothing else needs one',()=>{
 assert.deepEqual(Object.keys(c.FIGURE_WALKTHROUGHS).sort(),['avenue-supermarts','britannia','hindustan-unilever','itc','marico','nestle-india']);
 for(const id of Object.keys(c.FIGURE_WALKTHROUGHS)){
  const html=walk(id);
  assert.ok(html.length>500,id);
  assert.ok(!/undefined|NaN/.test(html),id);
  assert.match(html,/source-note/,id+': cites its source');
 }
});
test('HUL explains segment margin per ₹100 without calling it profit after tax',()=>{
 has('hindustan-unilever',['₹19.10','₹27.76']);
 assert.match(walk('hindustan-unilever'),/not<\/strong> profit after tax/);
});
test('ITC separates cigarettes from other goods and explains internal sales',()=>{
 has('itc',['₹83.74','₹7.17','₹90,713','₹9,846','₹80,867','not product margins, profit after tax or a shareholder’s return','Other businesses row is not a proxy']);
});
test('Nestlé India shows product-group sales without inventing profits, and flags the 15-month year',()=>{
 has('nestle-india',['sales only','not shares of profit','₹3,544.60','₹23,071.46','₹83.14','15 months','would invent a profit breakdown']);
});
test('Britannia’s mix is approximate and its cheese joint venture is a share of a result',()=>{
 has('britannia',['~97%','~3%','not a biscuit-only sales split or a profit breakdown','₹18,858.21','₹293.38','₹2,537.01','₹3.52','−₹30.57','entity-level joint-venture result']);
});
test('Marico’s two revenue views are not added together',()=>{
 has('marico',['two views of the same group revenue','Do not add the two tables together','₹16.05 for India','₹24.92 for International','₹2,277.00','₹1,762.00','not a profit share']);
});
test('DMart keeps parent and group totals apart and invents no online profit',()=>{
 has('avenue-supermarts',['₹4.32','₹66,968.03','₹3,223.93','Do not add these overlapping totals','10.8%','quarter ended 31 March 2026','one store temporarily closed','no separate reportable segments']);
});

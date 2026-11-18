const ICON={search:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',note:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 8.5h6M9 12h6M9 15.5h3.5"/></svg>',moon:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.6 6.6 0 0 0 9.7 9.7z"/></svg>',sun:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',bookmark:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-4-6.5 4v-16a1 1 0 0 1 1-1z"/></svg>',bookmarkFilled:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-4-6.5 4v-16a1 1 0 0 1 1-1z"/></svg>'};
const main=document.querySelector('main');
const safe=(v)=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const searchText=(v)=>String(v).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function matchingCompanies(companies, query) {
  if (!query.trim()) return companies;
  const term = searchText(query);
  if (!term) return [];
  const exactTicker = companies.filter(company => searchText(company.ticker) === term);
  if (exactTicker.length) return exactTicker;
  return companies.filter(company => {
    const fields = [company.name, company.ticker, ...(company.aliases || []), ...company.products.flat()];
    return fields.some(value => {
      const field = ' ' + searchText(value) + ' ';
      return field.includes(' ' + term + ' ') || (term.length >= 2 && field.includes(' ' + term));
    });
  });
}
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
const themeToggle=document.querySelector('[data-theme-toggle]');
const themeMedia=window.matchMedia('(prefers-color-scheme: dark)');
function preferredTheme(){try{const savedTheme=localStorage.getItem('cn-theme');if(savedTheme==='light'||savedTheme==='dark')return savedTheme}catch{}return themeMedia.matches?'dark':'light'}
function applyTheme(theme,save=false){const dark=theme==='dark';document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;themeToggle.setAttribute('aria-pressed',dark);themeToggle.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} mode`);themeToggle.querySelector('[aria-hidden]').innerHTML=dark?ICON.sun:ICON.moon;themeToggle.querySelector('[data-theme-label]').textContent=dark?'Light mode':'Dark mode';document.querySelector('#theme-color')?.setAttribute('content',dark?'#0c0c0d':'#efeeeb');if(save){try{localStorage.setItem('cn-theme',theme)}catch{}}}
applyTheme(preferredTheme());
themeToggle.addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark',true));
themeMedia.addEventListener?.('change',()=>{try{if(!localStorage.getItem('cn-theme'))applyTheme(themeMedia.matches?'dark':'light')}catch{}});
let saved=read('cn-saved',[]);if(!Array.isArray(saved))saved=[];let sector = 'All companies', query = '';
const sectors = ['All companies', ...new Set(COMPANIES.map(company => company.sector))];
let searchSave;
function rememberList() {
  clearTimeout(searchSave);
  history.replaceState({ ...history.state, companyList: { query, sector } }, '');
}
function rememberSearch() {
  clearTimeout(searchSave);
  const url = location.href;
  searchSave = setTimeout(() => { if (location.href === url) rememberList(); }, 250);
}

function persist(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{toast('Your browser could not save this on this device.');return false}}
function event(name,company){const entries=read('cn-events',[]);persist('cn-events',[...(Array.isArray(entries)?entries:[]),{name,company,time:new Date().toISOString()}].slice(-500))}
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('visible'),3500)}
function updateSaved(){document.querySelector('#saved-count').textContent=saved.length;document.querySelectorAll('[data-save]').forEach(b=>{const yes=saved.includes(b.dataset.save);b.classList.toggle('saved',yes);b.setAttribute('aria-pressed',yes);b.setAttribute('aria-label',`${yes?'Remove':'Save'} ${window.COMPANIES.find(c=>c.id===b.dataset.save)?.name} ${yes?'from':'to'} reading list`);b.innerHTML=yes?ICON.bookmarkFilled:ICON.bookmark})}
function toggleSaved(id){const was=saved.includes(id);saved=was?saved.filter(x=>x!==id):[...saved,id];const ok=persist('cn-saved',saved);event(was?'unsave':'save',id);updateSaved();if(location.hash==='#/saved')list(true);if(ok)toast(was?'Removed from your reading list':'Saved to your reading list on this device')}
function mono(c){return `<span class="monogram${c.logo?` has-logo logo-${safe(c.id)}`:''}" style="--company-color:${c.color};--company-bg:${c.bg}">${c.logo?`<img src="${safe(c.logo)}" alt="" loading="lazy" decoding="async">`:safe(c.initial)}</span>`}
function saveButton(c){return `<button class="save" data-save="${c.id}" aria-label="Save ${safe(c.name)} to reading list" aria-pressed="false">${ICON.bookmark}</button>`}
function card(c){return `<article class="card"><div class="card-top">${mono(c)}${saveButton(c)}</div><div class="category">${safe(c.sector)}</div><h3><a href="#/company/${c.id}">${safe(c.name)}</a></h3><span class="ticker">${safe(c.listingLabel||'NSE: '+c.ticker)}</span><p>${safe(c.summary)}</p><div class="brand-row">${c.products.slice(0,3).map(p=>`<span class="brand">${safe(p[0])}</span>`).join('')}</div><div class="card-bottom"><a href="#/company/${c.id}">Understand the business <span>↗</span></a></div></article>`}
function list(onlySaved=false){document.title=(onlySaved?'Reading list':'Explore companies')+' — Company Notebook';main.innerHTML=`<div class="intro"><div><div class="eyebrow">${onlySaved?'Your personal shelf':'Know the business. Then the stock.'}</div><h1>${onlySaved?'Your reading list.':'Familiar products.<br><span class="soft">Discover their businesses.</span>'}</h1><p>${onlySaved?'A little research, at your own pace. Saved on this device.':'Start with a name you know. Explore what it sells, how it earns money, and what deserves a closer look.'}</p></div><div class="index-number">${String(onlySaved?saved.length:COMPANIES.length).padStart(2,'0')}<small>companies to explore</small></div></div><div class="search-wrap"><span aria-hidden="true">${ICON.search}</span><input class="search" id="search" type="search" aria-label="Search by company, brand or ticker" placeholder="Search a company, brand or ticker…" value="${safe(query)}"></div><div class="filters" aria-label="Filter by business type">${sectors.map(s=>`<button class="chip ${sector===s?'active':''}" data-sector="${safe(s)}" aria-pressed="${sector===s}">${safe(s)}</button>`).join('')}</div><div class="section-row"><h2>${onlySaved?'Saved companies':'Explore the collection'}</h2><span id="result-count" aria-live="polite"></span></div><div id="results"></div><div class="learning-strip"><span class="icon">${ICON.note}</span><div><h3>A great product is only the beginning.</h3><p>Learn the five questions to ask before forming an opinion about a business.</p></div><a href="#/guide">Read the starter guide ↗</a></div>`;filterResults(onlySaved);document.querySelector('#search').addEventListener('input',e=>{query=e.target.value;rememberSearch();filterResults(onlySaved)})}
function filterResults(onlySaved){const companies=matchingCompanies(COMPANIES.filter(c=>(!onlySaved||saved.includes(c.id))&&(sector==='All companies'||c.sector===sector)),query);document.querySelector('#result-count').textContent=`${companies.length} ${companies.length===1?'company':'companies'} · Curated for beginners`;document.querySelector('#results').innerHTML=companies.length?`<div class="cards">${companies.map(card).join('')}</div>`:`<div class="empty"><h2>${onlySaved&&!saved.length?'Your next discovery belongs here.':'No companies found.'}</h2><p>${onlySaved&&!saved.length?'Save a company using the bookmark button to find it here later.':`Try another company or brand, or clear your filters. We currently cover ${COMPANIES.length} companies.`}</p><button class="button secondary" data-clear>Clear filters</button> ${!onlySaved?'<button class="button" data-request>Request coverage</button>':'<a class="button" href="#/">Explore companies</a>'}<div id="coverage-form"></div></div>`;updateSaved()}
function profileSources(c){const f=window.COMPANY_FINANCIALS?.[c.id];if(!f)return c.sources;const extra=[[`${f.period.split(' · ')[0]} financial disclosure`,f.source],...(f.announcement?[['Company results announcement',f.announcement]]:[])];return [...c.sources,...extra.filter(([,url])=>!c.sources.some(([,existing])=>existing===url))]}
function profile(c){document.title=c.name+' — Company Notebook';event('profile_open',c.id);if(!window.shortProfile.applies(c)){main.innerHTML='<div class="empty"><h1>This company’s page is not ready yet.</h1><a class="button" href="#/">Explore companies</a></div>';return}main.innerHTML=window.shortProfile.render(c,{safe,mono,saveButton,profileSources});window.productShelf.init();updateSaved()}
function stockMetricsSection() {
  const metrics = [
    ['Market cap', 'The market value of all the company’s shares. Multiply the current share price by the total shares outstanding. Use it to understand company size.'],
    ['Earnings per share (EPS)', 'How much profit belongs to each ordinary share. Basic EPS divides that profit by the average number of shares during the period. A loss produces negative EPS.'],
    ['Price-to-earnings (P/E)', 'Share price divided by earnings per share. A ₹200 share with ₹10 in annual EPS trades at 20× earnings. P/E is hard to interpret when earnings are near zero or negative.'],
    ['Industry P/E', 'A P/E benchmark for a group of similar companies. Use it to ask why one company trades at a different price relative to earnings. Compare ratios that use the same earnings period.'],
    ['Book value per share', 'Take what the company owns minus what it owes, using the values in its accounts. Divide the amount belonging to ordinary shareholders by the number of ordinary shares.'],
    ['Price-to-book (P/B)', 'Share price divided by book value per share. At 2×, the market price is twice the accounting value per share. This can be useful for comparing similar banks alongside the quality of their loans.'],
    ['Face value', 'The nominal amount assigned to a share for company records. A share with a ₹10 face value can trade at ₹200. A stock split can reduce face value as it increases the share count.'],
    ['Debt-to-equity (D/E)', 'Borrowings divided by shareholders’ equity, the amount belonging to shareholders in the accounts. A ratio of 0.5 means ₹50 of debt for every ₹100 of equity. Compare similar businesses because borrowing needs vary by industry.'],
    ['Return on equity (ROE)', 'Annual profit as a percentage of average shareholders’ equity. At 15%, the company earned ₹15 for every ₹100 of that equity. More borrowing can raise ROE, so check debt alongside it.'],
    ['EV/EBITDA', 'Compares enterprise value with EBITDA, which is earnings before interest, taxes, depreciation and amortisation. Those last two are accounting charges for using long-term assets. A simple estimate of enterprise value is market cap plus debt minus cash. Compare similar businesses and check how much they spend on equipment separately.'],
    ['Dividend yield', 'Dividends paid per share over the past year divided by today’s share price, shown as a percentage. ₹4 on a ₹200 share is a 2% yield. Future dividends can change.'],
    ['Free cash flow', 'A common measure of cash left after running the business and spending on long-term assets such as equipment. Check a few years because a large factory purchase can reduce it in a single year.']
  ];
  return `<section class="content-section" aria-labelledby="stock-metrics">
    <h2 id="stock-metrics">Key numbers when comparing stocks</h2>
    <p>Open any term to see what it measures and how to read it. Compare similar businesses and check the period each figure covers.</p>
    ${metrics.map(([term, explanation]) => `<details class="glossary"><summary>${safe(term)}</summary><p>${safe(explanation)}</p></details>`).join('')}
    <p class="source-note"><a href="https://investor.sebi.gov.in/understandings_shares.html">SEBI’s guide to shares</a> · <a href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/definitions.html">NYU Stern’s ratio definitions</a></p>
  </section>`;
}

function guide(){document.title='Starter guide — Company Notebook';main.innerHTML=`<div class="guide"><div class="eyebrow">The beginner’s notebook</div><h1>Understand the business.<br>Build your own questions.</h1><p class="profile-lede">Five questions to make company research less intimidating.</p>${[['What is the customer paying for?','Start with a simple sentence: this company earns money by selling ___ to ___. For a service business, think about the problem it solves.'],['Where does most of the money come from?','Look beyond the most recognisable brand. Revenue measures sales; profit is what remains after relevant costs. A large division by sales is not necessarily the largest source of profit.'],['What would help it grow?','More customers, higher prices, new products and greater efficiency can have different effects. Ask which explanation is supported by the company’s reports.'],['What could weaken the business?','Consider competitors, customer demand, costs and debt. Read the risks alongside the opportunity, and look for evidence that could change your view.'],['What am I still missing?','A business profile is an introduction. Financial statements, cash flow, debt, management and valuation need further research. Understanding a product does not establish whether a share is attractively priced.']].map(([h,p])=>`<section class="content-section"><h2>${h}</h2><p>${p}</p></section>`).join('')}<section class="content-section"><h2>A few useful words</h2>${[['Revenue','Money earned from selling goods or services, before subtracting expenses.'],['Operating margin','Operating profit as a percentage of revenue. Check how the company defines operating profit.'],['Cash flow','Cash moving into and out of a business. Reported profit and cash generated can differ.'],['Subsidiary','A company controlled by another company. Ownership percentage and financial reporting treatment matter.'],['Valuation','An assessment of what a business or its shares are worth, based on assumptions and evidence.'],['Reporting period','The dates covered by a financial result. It is different from the date you read the page.']].map(([h,p])=>`<details class="glossary"><summary>${h}</summary><p>${p}</p></details>`).join('')}</section>${stockMetricsSection()}<section class="content-section"><h2>Your pilot data</h2><p>Reading-list choices, feedback and basic reading events are stored only in this browser. Nothing is submitted to a research team automatically.</p><div class="feedback-actions"><button class="button" data-export>Export pilot feedback</button><button class="button secondary" data-reset>Clear pilot feedback</button></div><p class="source-note">Clearing feedback removes feedback and reading events. Your saved reading list stays intact.</p></section><a class="button" href="#/">Explore the companies ↗</a></div>`}
function route() {
  window.productShelf.cleanup();
  const hash = location.hash || '#/';
  const remembered = history.state?.companyList;
  query = remembered?.query ?? '';
  sector = sectors.includes(remembered?.sector) ? remembered.sector : 'All companies';
  document.querySelectorAll('nav a').forEach(link => {
    const current = link.hash === hash;
    link.classList.toggle('active', current || (link.id === 'explore-nav' && hash.startsWith('#/company/')));
    if (current) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (hash === '#/saved') list(true);
  else if (hash === '#/guide') guide();
  else if (hash.startsWith('#/company/')) {
    const company = COMPANIES.find(c => c.id === hash.split('/')[2]);
    if (company) profile(company);
    else {
      document.title = 'Company not found — Company Notebook';
      main.innerHTML = '<div class="empty"><h1>Company not found.</h1><p>This profile is not in our collection yet.</p><a class="button" href="#/">Explore companies</a></div>';
    }
  } else list();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  updateSaved();
}
document.addEventListener('click',e=>{const b=e.target.closest('button,a');if(!b)return;if(b.matches('a[href^="#/"]')&&document.querySelector('#search'))rememberList();if(b.dataset.save)toggleSaved(b.dataset.save);if(b.dataset.sector){sector=b.dataset.sector;rememberList();document.querySelectorAll('[data-sector]').forEach(x=>{x.classList.toggle('active',x.dataset.sector===sector);x.setAttribute('aria-pressed',x.dataset.sector===sector)});filterResults(location.hash==='#/saved')}if(b.hasAttribute('data-clear')){query='';sector='All companies';rememberList();list(location.hash==='#/saved')}if(b.dataset.scroll){e.preventDefault();document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'})}if(b.dataset.feedback){const stored=recordFeedback({company:b.dataset.company,rating:b.dataset.feedback});if(b.dataset.feedback==='unclear')feedbackForm('question',b.dataset.company);else if(stored)toast('Feedback saved on this device. Thank you.')}if(b.dataset.correction)feedbackForm('correction',b.dataset.correction);if(b.hasAttribute('data-request'))feedbackForm('coverage',query);if(b.hasAttribute('data-export')){const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),feedback:read('cn-feedback',[]),events:read('cn-events',[])},null,2)],{type:'application/json'});const a=document.createElement('a');const url=URL.createObjectURL(blob);a.href=url;a.download='company-notebook-pilot.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}if(b.hasAttribute('data-reset')){const feedbackCleared=persist('cn-feedback',[]);const eventsCleared=persist('cn-events',[]);if(feedbackCleared&&eventsCleared)toast('Pilot feedback and reading events cleared')}});
function recordFeedback(value){const prior=read('cn-feedback',[]);return persist('cn-feedback',[...(Array.isArray(prior)?prior:[]),{...value,time:new Date().toISOString()}])}
function feedbackForm(type,company){const target=document.querySelector(type==='coverage'?'#coverage-form':'#feedback-form');target.innerHTML=`<form class="feedback-box"><label for="feedback-text">${type==='coverage'?'Which company or brand should we cover?':type==='correction'?'What should be corrected? Please include a source if possible.':'What is still unclear?'}</label><textarea id="feedback-text" required maxlength="2000"></textarea><button class="button" type="submit">Save feedback on this device</button></form>`;const field=target.querySelector('textarea');if(type==='coverage')field.value=company;field.focus();target.querySelector('form').onsubmit=e=>{e.preventDefault();if(!field.value.trim())return;if(recordFeedback({type,company,text:field.value.trim()})){target.innerHTML='<p class="note">Saved locally. You can export feedback from the starter guide.</p>';toast('Feedback saved on this device')}}}
window.addEventListener('hashchange',route);route();
// The same reading-list actions are available to compatible browser assistants.
const modelContext=document.modelContext;
if(modelContext?.registerTool){
 const lifecycle=new AbortController();
 const definitions=[{
  name:'list_companies',title:'Find covered companies',description:'Read the company collection and current device-local reading-list status. Optionally search company, brand or ticker.',inputSchema:{type:'object',properties:{query:{type:'string'}},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},
  execute(input){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>k!=='query')||(input.query!==undefined&&typeof input.query!=='string'))throw new Error('Expected an optional text query.');return matchingCompanies(COMPANIES,input.query||'').map(c=>({id:c.id,name:c.name,ticker:c.listingLabel?null:c.ticker,...(c.listingLabel?{listingStatus:c.listingLabel}:{}),saved:saved.includes(c.id)}))}
 },{
  name:'set_reading_list',title:'Save or remove a company',description:'Save a covered company to, or remove it from, the device-local reading list and update visible bookmark controls.',inputSchema:{type:'object',properties:{companyId:{type:'string'},saved:{type:'boolean'}},required:['companyId','saved'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},
  execute(input){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['companyId','saved'].includes(k))||typeof input.saved!=='boolean'||!COMPANIES.some(c=>c.id===input.companyId))throw new Error('A covered companyId and boolean saved are required.');if(saved.includes(input.companyId)!==input.saved)toggleSaved(input.companyId);return {companyId:input.companyId,saved:saved.includes(input.companyId)}}
 }];
 for(const tool of definitions){try{Promise.resolve(modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{})}catch{}}
 window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
// Track completion locally when a reader reaches the source section.
let completionObserver;
const baseRoute=route;
function observeReading(){completionObserver?.disconnect();const el=document.querySelector('#sources');if(!el||!('IntersectionObserver' in window))return;const id=location.hash.split('/')[2];completionObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){event('profile_completed',id);completionObserver.disconnect()}},{threshold:.2});completionObserver.observe(el)}
window.addEventListener('hashchange',observeReading);observeReading();
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();main.focus();main.scrollIntoView()});
/* Calm entrance: sections and cards fade up a little as they come into view. Skipped for reduced motion. */
(()=>{const main=document.querySelector('#main');if(!main||!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const sel='.content-section,.sp-section,.sp-photos,.visual-shelf,.card,.learning-strip';
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -6% 0px'});
const tag=()=>main.querySelectorAll(sel).forEach(el=>{if(!el.classList.contains('reveal')){el.classList.add('reveal');io.observe(el)}});
new MutationObserver(tag).observe(main,{childList:true,subtree:true});tag()})();

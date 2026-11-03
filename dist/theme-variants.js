/* Lets you try the dark mode options. Choose with the sidebar buttons or open the site with ?dark=a, ?dark=b or ?dark=c.
   Delete this file, dark-themes.css and the picker once one option is chosen. */
(()=>{
 const options=[['classic','Current','#d7b878'],['a','Graphite','#6f90ff'],['b','Editorial','#e4835a'],['c','Midnight','#ff7d5c']];
 const valid=options.map(o=>o[0]);
 const root=document.documentElement;
 const stored=()=>{try{return localStorage.getItem('cn-dark')}catch{return null}};
 const fromUrl=new URLSearchParams(location.search).get('dark');
 function apply(choice,save){
  if(!valid.includes(choice))choice='classic';
  if(choice==='classic')root.removeAttribute('data-dark');else root.dataset.dark=choice;
  if(save){try{localStorage.setItem('cn-dark',choice)}catch{}}
  document.querySelectorAll('[data-dark-choice]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.darkChoice===choice));
  syncThemeColor();
 }
 // keep the browser's address-bar colour matched to the page background
 function syncThemeColor(){
  const meta=document.querySelector('#theme-color');if(!meta)return;
  requestAnimationFrame(()=>{const bg=getComputedStyle(document.body).backgroundColor;if(bg)meta.setAttribute('content',bg)});
 }
 const nav=document.querySelector('.sidebar nav');
 if(nav){
  const box=document.createElement('div');box.className='dark-styles';box.setAttribute('role','group');box.setAttribute('aria-label','Dark style');
  box.innerHTML='<span>Dark style (trying options)</span>'+options.map(([id,name,dot])=>`<button type="button" data-dark-choice="${id}" aria-pressed="false"><i style="background:${dot}"></i>${name}</button>`).join('');
  nav.after(box);
  box.addEventListener('click',e=>{const b=e.target.closest('[data-dark-choice]');if(b)apply(b.dataset.darkChoice,true)});
 }
 new MutationObserver(syncThemeColor).observe(root,{attributes:true,attributeFilter:['data-theme']});
 apply(valid.includes(fromUrl)?fromUrl:stored(),Boolean(fromUrl&&valid.includes(fromUrl)));
})();

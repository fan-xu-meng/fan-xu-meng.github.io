(()=>{const nodes=[...document.querySelectorAll('.publication')],q=document.getElementById('pub-search'),year=document.getElementById('year-filter'),lead=document.getElementById('lead-filter'),counter=document.getElementById('pub-counter'),empty=document.getElementById('pub-empty');
function refresh(){let shown=0;for(const el of nodes){const ok=(!q.value||el.dataset.search.includes(q.value.trim().toLowerCase()))&&(year.value==='all'||el.dataset.year===year.value)&&(lead.getAttribute('aria-pressed')!=='true'||el.dataset.group!=='collab');el.hidden=!ok;if(ok)shown++;}
for(const g of document.querySelectorAll('.publication-year,.pub-group'))g.hidden=![...g.querySelectorAll('.publication')].some(p=>!p.hidden);
counter.textContent=shown+' of '+nodes.length+' publications';empty.hidden=shown!==0;}
q.addEventListener('input',refresh);year.addEventListener('change',refresh);lead.addEventListener('click',()=>{lead.setAttribute('aria-pressed',lead.getAttribute('aria-pressed')==='true'?'false':'true');refresh();});
document.getElementById('footer-year').textContent=new Date().getFullYear();
const nav=[...document.querySelectorAll('.top nav a')],regions=nav.map(x=>document.querySelector(x.getAttribute('href')));let queued=false;
function active(){queued=false;let id='home';for(const s of regions){if(s&&s.getBoundingClientRect().top<=160)id=s.id;}
for(const a of nav){const on=a.getAttribute('href')==='#'+id;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}}
window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(active)}},{passive:true});window.addEventListener('resize',active);active();})();
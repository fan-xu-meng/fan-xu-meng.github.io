
(function(){
const input=document.getElementById("pub-search"),year=document.getElementById("pub-year-filter"),selected=document.getElementById("pub-selected-filter"),count=document.getElementById("pub-count"),none=document.getElementById("pub-no-results");
const entries=Array.from(document.querySelectorAll(".pub-entry"));
const groups=Array.from(document.querySelectorAll(".publication-year"));
function refresh(){
const q=input.value.trim().toLowerCase(),y=year.value,only=selected.getAttribute("aria-pressed")==="true";
let visible=0;
for(const item of entries){
const show=(!q||item.dataset.pubSearch.includes(q))&&(y==="all"||item.dataset.pubYear===y)&&(!only||item.dataset.pubSelected==="true");
item.hidden=!show;if(show)visible++;
}
for(const group of groups){group.hidden=!Array.from(group.querySelectorAll(".pub-entry")).some(item=>!item.hidden);}
count.textContent=visible+" of "+entries.length+" publications shown";none.style.display=visible?"none":"block";
}
input.addEventListener("input",refresh);
year.addEventListener("change",refresh);
selected.addEventListener("click",()=>{selected.setAttribute("aria-pressed",selected.getAttribute("aria-pressed")==="true"?"false":"true");refresh();});
})();


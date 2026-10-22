(function () {
"use strict";
// Five lead-author works only. Set "coverImage" or "figureImage" to an approved real image URL
// in the future; the original illustrations below will remain the fallback.
var catalog = [
 {doi:"s41929-026-01595-8", name:"Nature Catalysis", mast:"nature<small>catalysis</small>", year:"2026",
  dark:"#10304a",mid:"#24607d",light:"#83aebd",left:"CH₃OH",center:"Pt–Oₓ",right:"HCOO⁻",note:"¹⁸O exchange · oxygen migration",type:"cluster"},
 {doi:"D5EE00452G", name:"Energy & Environmental Science",mast:"Energy &amp;<small>Environmental Science</small>",year:"2025",
  dark:"#183c4a",mid:"#197477",light:"#8ac7a7",left:"CH₃OH",center:"Pt / Ni(OH)₂",right:"HCOO⁻ + H₂",note:"Electrorefinery · reduced CO₂ emissions",type:"electrode"},
 {doi:"sciadv.adh9487",name:"Science Advances",mast:"Science<small>Advances</small>",year:"2023",
  dark:"#1a355a",mid:"#346f9c",light:"#a1c5da",left:"CH₃OH",center:"Lattice oxygen",right:"HCOO⁻",note:"O 2p-band descriptor",type:"lattice"},
 {doi:"j.esci.2022.02.001",name:"eScience",mast:"eScience",year:"2022",
  dark:"#193f4e",mid:"#317f8d",light:"#9bced5",left:"CH₃OH",center:"LaCo₁₋ₓFeₓO₃",right:"HCOO⁻",note:"Perovskite Fe/Co substitution",type:"lattice"},
 {doi:"acs.macromol.0c01425",name:"Macromolecules",mast:"Macro<small>molecules</small>",year:"2020",
  dark:"#292b4b",mid:"#665887",light:"#b7aad1",left:"Flat GO",center:"Folded GO",right:"Crumpled GO",note:"2D macromolecular conformation scaling",type:"sheet"}
];
function el(tag,cls){var n=document.createElement(tag);if(cls)n.className=cls;return n;}
function coverSvg(i){
 return '<svg class="pub-cover-art" viewBox="0 0 220 230" aria-hidden="true">'+
 '<path d="M-30 205 C50 54 100 227 250 42" fill="none" stroke="#fff" stroke-opacity=".21" stroke-width="27"/>'+
 '<path d="M-30 218 C40 72 120 231 251 64" fill="none" stroke="#fff" stroke-opacity=".23" stroke-width="3"/>'+
 (i===4?'<path d="M12 148 Q42 89 79 136 T154 116 T219 147" fill="none" stroke="#ded6fa" stroke-width="3"/>':
 '<path d="M32 154 L82 184 L124 123 L169 156 L204 98" fill="none" stroke="#e4f5ff" stroke-opacity=".8" stroke-width="3"/>'+
 [[32,154],[82,184],[124,123],[169,156],[204,98]].map(function(p,j){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(j%2?8:11)+'" fill="'+(j%2?"#ffc2a5":"#d9f1fb")+'"/>';}).join(""))+'</svg>';
}
function figureSvg(p,i){
var mid=p.type==="sheet"?"#918bbd":p.type==="electrode"?"#5caa9c":"#739fb8";
var out='<svg viewBox="0 0 440 260" role="img" aria-label="Original illustrative schematic for '+p.name+' paper" xmlns="http://www.w3.org/2000/svg">'+
 '<defs><linearGradient id="paper-grad-'+i+'" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#f9fcfe"/><stop offset="1" stop-color="#ecf6fa"/></linearGradient>'+
 '<marker id="paper-arr-'+i+'" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#c78d5b"/></marker></defs>'+
 '<rect width="440" height="260" rx="11" fill="url(#paper-grad-'+i+')"/>'+
 '<text x="18" y="28" fill="#587b93" font-size="11" font-weight="700" letter-spacing="1.3">RESEARCH CONCEPT · '+p.year+'</text>';
if(p.type==="sheet"){
 out+='<path d="M30 100 L122 94 L132 158 L38 166 Z" fill="#abd3df" stroke="#6198af" stroke-width="2.4"/>'+
 '<path d="M167 120 Q200 63 232 113 Q205 140 243 165 L193 166 Q153 153 167 120" fill="#c5c4e1" stroke="#918bbd" stroke-width="2.4"/>'+
 '<path d="M318 130 Q315 89 348 96 Q395 104 386 142 Q397 176 355 180 Q318 177 318 130" fill="#acd6de" stroke="#79a9b4" stroke-width="2.4"/>'+
 '<path d="M133 127 H159 M245 127 H303" stroke="#c78d5b" stroke-width="3" fill="none" marker-end="url(#paper-arr-'+i+')"/>';
}else{
 out+='<g stroke="#a3bcca" stroke-width="2">';
 for(var k=0;k<5;k++){out+='<path d="M'+(172+k*18)+' 95 L'+(172+k*18)+' 161"/>';}
 out+='</g>';
 for(var r=0;r<4;r++)for(var c=0;c<5;c++){
  var x=174+c*19,y=104+r*20;
  out+='<circle cx="'+x+'" cy="'+y+'" r="7.5" fill="'+((r+c)%3===0?"#d6857d":mid)+'" stroke="#fff" stroke-width="1"/>';
 }
 if(p.type==="cluster")out+='<circle cx="209" cy="86" r="12" fill="#e47e76"/><circle cx="233" cy="77" r="7" fill="#dddfe1"/>';
 if(p.type==="electrode")out+='<rect x="166" y="170" width="96" height="8" rx="4" fill="#7ab7a7"/>';
 out+='<path d="M97 128 H157 M273 128 H339" fill="none" stroke="#c78d5b" stroke-width="4" marker-end="url(#paper-arr-'+i+')"/>';
}
out+='<text x="68" y="193" text-anchor="middle" font-size="16" font-weight="700" fill="#40647c">'+p.left+'</text>'+
 '<text x="220" y="211" text-anchor="middle" font-size="13" font-weight="700" fill="#46677d">'+p.center+'</text>'+
 '<text x="373" y="193" text-anchor="middle" font-size="15" font-weight="700" fill="#40647c">'+p.right+'</text>'+
 '<text x="220" y="245" text-anchor="middle" font-size="11" fill="#6e899c">'+p.note+'</text></svg>';
return out;
}
var entries=document.querySelectorAll('article.pub-entry[data-pub-selected="true"]');
if(entries.length!==5)return;
entries.forEach(function(card){
 var link=card.querySelector(".pub-title a");
 if(!link)return;
 var url=link.getAttribute("href")||"";
 var i=catalog.findIndex(function(p){return url.toLowerCase().includes(p.doi.toLowerCase());});
 if(i<0)return;
 var p=catalog[i];
 var authors=card.querySelector(".pub-authors"),title=card.querySelector(".pub-title"),
 citation=card.querySelector(".pub-citation"),meta=card.querySelector(".pub-meta"),
 summary=card.querySelector(".pub-summary"),links=card.querySelector(".pub-links");
 if(!authors||!title||!citation||!meta||!links)return;
 var coverLink=el("a","pub-cover-link");
 coverLink.href=link.href;coverLink.target="_blank";coverLink.rel="noopener noreferrer";
 coverLink.setAttribute("aria-label","Open "+p.name+" publication");
 var tile=el("div","pub-cover-tile");tile.style.setProperty("--c-dark",p.dark);
 tile.style.setProperty("--c-mid",p.mid);tile.style.setProperty("--c-light",p.light);
 tile.setAttribute("role","img");tile.setAttribute("aria-label","Illustrative journal cover tile; not the official publisher cover");
 var brow=el("span","pub-cover-eyebrow");brow.textContent="RESEARCH HIGHLIGHT";
 var mast=el("span","pub-cover-masthead");mast.innerHTML=p.mast;
 var art=el("span");art.innerHTML=coverSvg(i);
 var foot=el("span","pub-cover-foot");foot.textContent=p.year+" · PUBLICATION";
 tile.append(brow,mast,art,foot);coverLink.append(tile);
 var main=el("div","pub-showcase-main");main.append(authors,title,citation,meta);
 if(summary)main.append(summary);
 main.append(links);
 var figure=el("figure","pub-showcase-graphic");
 var graphic=el("div","pub-showcase-illustration");graphic.innerHTML=figureSvg(p,i);
 var cap=el("figcaption");cap.textContent="Illustrative research schematic";
 figure.append(graphic,cap);
 card.replaceChildren(coverLink,main,figure);
 card.classList.add("pub-showcase");
});
})();

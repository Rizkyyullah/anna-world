(()=>{
	const D=window.ANNA,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
	const reduced=matchMedia("(prefers-reduced-motion:reduce)").matches;
	const h=(t,a={},...k)=>{const e=document.createElement(t);for(const[n,v]of Object.entries(a)){if(v==null||v===false)continue;if(n==="text")e.textContent=v;else if(n.startsWith("on"))e.addEventListener(n.slice(2),v);else e.setAttribute(n,v)}e.append(...k.filter(Boolean));return e};
	const rot=i=>(i*5%9-4)+"deg";
	const replay=el=>{el.classList.remove("fade");void el.offsetWidth;el.classList.add("fade")};
	
	function polaroid(p,i,{root="figure",cap=true,eager=false}={}){
	  const im=h("img",{src:p.src,alt:p.alt||p.cap||"",width:800,height:1000,decoding:"async",loading:eager?"eager":"lazy",fetchpriority:eager?"high":null});
	  const ph=h("span",{class:"photo","data-n":String(i+1).padStart(2,"0")},im);
	  im.addEventListener("error",()=>{im.remove();ph.classList.add("ph")});
	  return h(root,{class:"polaroid",style:"--r:"+rot(i),type:root==="button"?"button":null},ph,cap&&h("span",{class:"cap",text:p.cap}));
	}
	
	$("#intro").textContent=D.site.intro;
	$("#stack").append(...D.photos.slice(0,3).map((p,i)=>polaroid(p,i,{cap:false,eager:true})));
	$("#yr").textContent=new Date().getFullYear();
	
	$("#notes").append(...D.about.map((x,i)=>h("article",{class:"note",style:"--r:"+(i%2?1.6:-1.8)+"deg"},h("h3",{text:x.t}),h("p",{text:x.d}))));
	
	const burger=$("#burger"),menu=$("#menu");
	const closeMenu=()=>{menu.classList.remove("open");burger.setAttribute("aria-expanded","false")};
	burger.addEventListener("click",()=>burger.setAttribute("aria-expanded",menu.classList.toggle("open")));
	menu.addEventListener("click",e=>{if(e.target.closest("a"))closeMenu()});
	document.addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.classList.contains("open")){closeMenu();burger.focus()}});
	const links=$$("#menu a");
	const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;links.forEach(a=>a.hash==="#"+en.target.id?a.setAttribute("aria-current","true"):a.removeAttribute("aria-current"))}),{rootMargin:"-40% 0px -55% 0px"});
	$$("#home,main section").forEach(s=>io.observe(s));
	
	let cur="All",list=[],idx=0;
	const grid=$("#grid"),fl=$("#filters"),lb=$("#lb");
		
	function show(i){
	  idx=(i+list.length)%list.length;const p=list[idx];
	  $("#lb-slot").replaceChildren(polaroid(p,idx));
	  $("#lb-meta").textContent=[p.date,p.desc].filter(Boolean).join(" - ");
	  $("#lb-count").textContent=(idx+1)+" / "+list.length;
	  if(!lb.open)lb.showModal();
	}
		
	function renderGrid(){
	  list=D.photos.filter(p=>cur==="All"||p.cat===cur);
	  grid.replaceChildren(...list.map((p,i)=>{const b=polaroid(p,i,{root:"button"});b.setAttribute("aria-label","Open photo: "+p.cap);b.addEventListener("click",()=>show(i));return b}));
	  replay(grid);
	}
		
	["All",...D.categories].forEach(c=>fl.append(h("button",{class:"chip",type:"button","aria-pressed":String(c==="All"),onclick:e=>{cur=c;$$(".chip",fl).forEach(b=>b.setAttribute("aria-pressed",String(b===e.currentTarget)));renderGrid()}},c)));
	renderGrid();
	$("#lb-prev").addEventListener("click",()=>show(idx-1));
	$("#lb-next").addEventListener("click",()=>show(idx+1));
	$("#lb-close").addEventListener("click",()=>lb.close());
	lb.addEventListener("click",e=>{if(e.target===lb)lb.close()});
	lb.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")show(idx-1);if(e.key==="ArrowRight")show(idx+1)});
	
	$("#dreams-list").append(...D.dreams.map(g=>h("div",{class:"dgroup"},h("h3",{text:g.t}),h("div",{class:"stickies"},...g.items.map((x,i)=>h("article",{class:"sticky",style:"--r:"+((i*7+g.t.length)%5-2)+"deg"},x.img&&h("img",{src:x.img,alt:x.t,width:400,height:300,loading:"lazy",decoding:"async"}),h("h4",{text:x.t}),h("p",{text:x.d}),x.status&&h("span",{class:"tag",text:x.status})))))));
	
	const qc=$("#qcats"),slip=$("#slip"),cats=Object.keys(D.quotes);
	let qcat=cats[0],last=-1;
	
	function pick(){
	  const a=D.quotes[qcat];let i;
	  do{i=Math.floor(Math.random()*a.length)}while(a.length>1&&i===last);
	  last=i;slip.classList.add("swap");
	  setTimeout(()=>{slip.textContent=a[i];slip.classList.remove("swap")},reduced?0:200);
	}
	
	cats.forEach(k=>qc.append(h("button",{class:"chip",type:"button","aria-pressed":String(k===qcat),onclick:e=>{qcat=k;last=-1;$$(".chip",qc).forEach(b=>b.setAttribute("aria-pressed",String(b===e.currentTarget)));pick()}},k)));
	$("#pick").addEventListener("click",pick);
	pick();
	
	const lt=$("#ltabs"),paper=$("#paper");
	
	function letter(i){
	  const l=D.letters[i];
	  $$(".chip",lt).forEach((b,j)=>b.setAttribute("aria-pressed",String(j===i)));
	  paper.replaceChildren(l.img&&h("img",{class:"deco",src:l.img,alt:"",width:240,height:240,loading:"lazy",decoding:"async"}),h("h3",{text:l.title}),l.date&&h("time",{text:l.date}),...l.text.split("\n\n").map(t=>h("p",{text:t})));
	  replay(paper);
	}
	
	D.letters.forEach((l,i)=>lt.append(h("button",{class:"chip",type:"button","aria-pressed":"false",onclick:()=>letter(i)},l.tab||l.title)));
	letter(0);
	
	$("#love-list").append(...D.loves.map((c,i)=>h("article",{class:"note",style:"--r:"+(i%2?1.4:-1.4)+"deg"},h("h3",{text:c.t}),c.items.length?h("ul",{},...c.items.map(x=>h("li",{text:x}))):h("p",{class:"empty",text:"Waiting for Anna to fill this in."}))));
	
	const M=D.music,au=new Audio(),pl=$("#player"),pb=$("#play"),st=$("#pstat"),sk=$("#seek"),vol=$("#vol"),mu=$("#mute");
	const fmt=s=>isFinite(s)?(s/60|0)+":"+String(s%60|0).padStart(2,"0"):"0:00";
	
	au.preload="none";au.loop=true;au.volume=+vol.value;au.src=M.src;
	$("#ptitle").textContent=M.title;$("#partist").textContent=M.artist;
	
	const setP=on=>{pl.classList.toggle("playing",on);pb.innerHTML=on?"&#10074;&#10074;":"&#9654;";pb.setAttribute("aria-label",on?"Pause music":"Play music")};
	
	pb.addEventListener("click",()=>{st.textContent="";au.paused?au.play().catch(()=>{}):au.pause()});
	au.addEventListener("play",()=>setP(true));
	au.addEventListener("pause",()=>setP(false));
	au.addEventListener("error",()=>{setP(false);st.textContent="Music file not found. See README to add one."});
	au.addEventListener("loadedmetadata",()=>{sk.max=au.duration;$("#dur").textContent=fmt(au.duration)});
	au.addEventListener("timeupdate",()=>{sk.value=au.currentTime;$("#cur").textContent=fmt(au.currentTime)});
	sk.addEventListener("input",()=>{au.currentTime=sk.value});
	vol.addEventListener("input",()=>{au.volume=+vol.value;au.muted=false;mu.textContent="Mute"});
	mu.addEventListener("click",()=>{au.muted=!au.muted;mu.textContent=au.muted?"Unmute":"Mute"});
})();

// =====================================
// PERSONAL CONTENT  (edit freely)
// =====================================
const PREVIEW_MODE = false;               // set false when you deploy
const UNLOCK_AT = new Date('2026-12-02T00:00:00+05:30');

const LETTER = "Happy birthday meri pyari si behn ki lodi aur merko ni pata me kya likhu but me likh rha hu kyuki me tere se boht pyar krta hu aur tu bss meri h or meri hi rehna baaki sab me sambhaal lunga mommy jiiii I love you soo much meri kuchupuchu me tere se kitna pyar krta hu bc merko khud ni pata merko bss itna pata h me boht zyada hi krta hu or humesha bss tere saath rehna chahta hu kuch bhi hojaye fir kyuki tu tu h yrr tu mera sab kuch h tu meri jaan h mera baccha h loml h meri detective kuchupuchu h, merko ni pata me or kya likhu bss yaad rakhna ki I LOVE YOU SO MUCH AND YOU ARE MY BABY";

const reasons = [  // "Things I love about you" cards. Add more freely.
  {t:'YOUR LAUGH', d:'[WRITE SOMETHING HERE]'},
  {t:'YOUR RANDOMNESS', d:'[WRITE SOMETHING HERE]'},
  {t:'THE WAY YOU ARE', d:'[WRITE SOMETHING HERE]'},
  {t:'THE LITTLE THINGS', d:'[WRITE SOMETHING HERE]'},
  {t:'MY BAUNI', d:'[WRITE SOMETHING HERE]'},
  {t:'MY NOOR SE BHARA TAARA', d:'[WRITE SOMETHING HERE]'},
  {t:'MY DETECTIVE KUCHUPUCHU', d:'[WRITE SOMETHING HERE]'},
];

const memories = Array.from({length:8},(_,i)=>({   // replace fields; add img:'assets/photos/x.jpg'
  img:'', date:'[DATE]', title:'[TITLE '+(i+1)+']', caption:'[CAPTION]', story:'[STORY]'
}));

const whyLines = [
  ["I don't know."],["Why do I love you?"],
  ["Not because there aren't things I love about you. There are too many."],
  ["Because if I give myself one reason..."],["...that reason could someday disappear."],
  ["But the love?"],["I never want that to disappear."],["So I stopped trying to find a reason."],
  ["I just love you.","hot"],["And I hope you always know that."]
];

const SECRET = { question:'I love you', right:'Exactly detective kuchupuchu.', wrong:'Bhag bkl galat h.' };
const eggs = [  // hidden objects: where (section id), position, message
  {ch:'★', sec:'home',   x:'12%', y:'22%', msg:'You found a star. Noor se bhara taara, obviously.'},
  {ch:'♡', sec:'story',  x:'88%', y:'12%', msg:'[SECRET NOTE #2]'},
  {ch:'☾', sec:'memes',  x:'92%', y:'85%', msg:'[SECRET NOTE #3]'},
  {ch:'👺', sec:'old',    x:'4%',  y:'90%', msg:'Goblin was here. Bhadwa approves.'},
  {ch:'BKL',sec:'final',  x:'6%',  y:'12%', msg:'BKL. Yes. You. Hi.'},
];
const FINAL_SURPRISE = '[YOUR FINAL SECRET MESSAGE GOES HERE]';
// Mini-games (optional, not wired yet): quiz / memory / hearts / choose-one
const quizzes = { knowUs:[], memory:[], hearts:5, chooseOne:[] };
// =====================================

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const calm = matchMedia('(prefers-reduced-motion:reduce)').matches;
const toast = m => { const t=$('#toast'); t.textContent=m; t.classList.add('on'); clearTimeout(toast.h); toast.h=setTimeout(()=>t.classList.remove('on'),3200); };

function burst(e){ if(calm) return; for(let i=0;i<14;i++){ const s=document.createElement('span'); s.className='pop'; s.textContent='♡';
  s.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;color:#D58A9E;--x:${Math.random()*240-120}px;--y:${Math.random()*-220-20}px`;
  document.body.append(s); setTimeout(()=>s.remove(),1200);} }

// Stars: one canvas, drawn once (twinkle via slow redraw only if motion allowed)
(function(){ const c=$('#stars'),x=c.getContext('2d'); let S=[];
  const size=()=>{c.width=innerWidth;c.height=innerHeight;S=Array.from({length:140},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.3+.2,p:Math.random()*6}))};
  const draw=t=>{x.clearRect(0,0,c.width,c.height);S.forEach(s=>{x.globalAlpha=.4+.6*Math.abs(Math.sin(t/1800+s.p));x.fillStyle='#F2DDE3';x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()});if(!calm)setTimeout(()=>requestAnimationFrame(draw),90)};
  addEventListener('resize',size);size();requestAnimationFrame(draw);})();

// Countdown / unlock
function unlock(){ $('#lock').hidden=true; $('#site').hidden=false; init(); }
if(PREVIEW_MODE || Date.now()>=UNLOCK_AT) unlock(); else {
  const U=[['DAYS',864e5],['HOURS',36e5],['MINUTES',6e4],['SECONDS',1e3]];
  const tick=()=>{ let d=UNLOCK_AT-Date.now(); if(d<=0){ clearInterval(iv); $('#lock').style.transition='opacity 2s'; $('#lock').style.opacity=0; setTimeout(unlock,2000); return; }
    $('#cd').innerHTML=U.map(([n,m])=>{const v=Math.floor(d/m);d-=v*m;return `<div>${String(v).padStart(2,'0')}<small>${n}</small></div>`}).join(''); };
  const iv=setInterval(tick,1000); tick();
}

function init(){
  // Music (never autoplays; user opt-in)
  const a=$('#song'), mb=$('#music');
  mb.onclick=()=>{ const on=a.paused; (on?a.play():Promise.resolve(a.pause())).then(()=>{mb.textContent=on?'♫ MUSIC · ON':'♫ MUSIC · OFF';mb.setAttribute('aria-pressed',on)}).catch(()=>toast('Add assets/music/harleys-in-hawaii.mp3 to play music.')); };
  // Nav
  const m=$('#menu'), b=$('#burger');
  b.onclick=()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)}; m.onclick=e=>{if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded',false)}};
  // Letter
  $('#letterText').textContent=LETTER;
  $('#openLetter').onclick=()=>{$('#letterModal').hidden=false;$('#letterModal .x').focus()};
  // Cards
  $('#cards').innerHTML=reasons.map(r=>`<button class="card" aria-expanded="false"><b>${r.t}</b><p>${r.d}</p></button>`).join('');
  $$('.card').forEach(c=>c.onclick=()=>{const o=c.classList.toggle('open');c.setAttribute('aria-expanded',o)});
  // Memories
  $('#polaroids').innerHTML=memories.map((o,i)=>`<button class="pol" data-i="${i}" aria-label="Open memory: ${o.title}"><div class="ph">${o.img?`<img loading="lazy" src="${o.img}" alt="${o.title}" style="width:100%;height:100%;object-fit:cover">`:'[PHOTO]'}</div><p class="hand">${o.date}</p></button>`).join('');
  $$('.pol').forEach(p=>p.onclick=()=>{const o=memories[p.dataset.i];
    $('#mmImg').innerHTML=o.img?`<img src="${o.img}" alt="${o.title}" style="width:100%">`:'[PHOTO]';
    $('#mmDate').textContent=o.date;$('#mmTitle').textContent=o.title;$('#mmCap').textContent=o.caption;$('#mmStory').textContent=o.story;$('#memModal').hidden=false;$('#memModal .x').focus()});
  $$('[data-close]').forEach(x=>x.onclick=()=>x.closest('[role=dialog]').hidden=true);
  addEventListener('keydown',e=>{if(e.key==='Escape')$$('[role=dialog]').forEach(d=>d.hidden=true)});
  // Why: slow reveal
  $('#whyLines').innerHTML=whyLines.map(l=>`<p class="ln ${l[1]||''}">${l[0]}</p>`).join('');
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.6});
  $$('.ln').forEach(l=>io.observe(l));
  // Secret question (answer lives only in config, never shown)
  const check=()=>{const v=$('#ans').value.trim().toLowerCase().replace(/[^a-z ]/g,'');const ok=v===SECRET.question.toLowerCase();$('#res').textContent=ok?SECRET.right:SECRET.wrong;};
  $('#go').onclick=check; $('#ans').onkeydown=e=>{if(e.key==='Enter')check()};
  // Easter eggs
  eggs.forEach(g=>{const s=document.getElementById(g.sec);if(!s)return;const b=document.createElement('button');b.className='egg';b.textContent=g.ch;b.setAttribute('aria-label','A hidden thing');b.style.left=g.x;b.style.top=g.y;
    b.onclick=e=>{burst(e);toast(g.msg);b.style.opacity=.15};s.append(b)});
  // Final
  $('#last').onclick=e=>{burst(e);$('#lastMsg').textContent=FINAL_SURPRISE;e.target.hidden=true};
}

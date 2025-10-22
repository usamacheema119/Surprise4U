
// script.js
const nameEl = document.getElementById('name');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const result = document.getElementById('result');
const hearts = document.getElementById('hearts');
const pets = document.getElementById('pets');
const bgm = document.getElementById('bgm');
const loader = document.getElementById('loader');
const stage = document.getElementById('stage');

// simple fade-out loader
window.addEventListener('load', ()=>{
  setTimeout(()=> {
    loader.style.transition = 'opacity 700ms ease';
    loader.style.opacity = 0;
    setTimeout(()=> loader.style.display = 'none', 800);
    stage.removeAttribute('aria-hidden');
    // fade in name
    setTimeout(()=>{ nameEl.style.opacity = 1; nameEl.style.transform = 'translateY(0)'; }, 400);
    // attempt to autoplay bgm
    bgm.play().catch(()=>{ /* blocked until user gesture */ });
    // start floating kittens/petals
    startFloating();
  }, 900);
});

// spawn floating element helper (kitty or petal)
function spawnElement(type){
  const el = document.createElement('div');
  if(type === 'kitty'){
    el.className = 'kitty';
    el.innerHTML = kittenSVG();
    const size = 48 + Math.random()*36;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
  } else {
    el.className = 'petal';
    el.innerHTML = petalSVG();
    const size = 20 + Math.random()*28;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
  }
  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight + 40;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  document.body.appendChild(el);

  // animate up and fade
  const duration = 6000 + Math.random()*6000;
  const driftX = (Math.random()-0.5) * 300;
  el.animate([
    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
    { transform: `translate(${driftX}px, -${window.innerHeight+200}px) rotate(${Math.random()*360}deg)`, opacity: 0.02 }
  ], {
    duration: duration,
    easing: 'linear'
  });
  setTimeout(()=> el.remove(), duration + 200);
}

// periodic spawn
let floatInterval;
function startFloating(){
  floatInterval = setInterval(()=>{
    spawnElement(Math.random() < 0.55 ? 'kitty' : 'petal');
  }, 800);
}

// kitten SVG (cute cartoon)
function kittenSVG(){
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#ffd6e8"/><stop offset="1" stop-color="#ffb3d0"/></linearGradient>
  </defs>
  <g transform="translate(10,8)">
    <ellipse cx="50" cy="60" rx="36" ry="34" fill="url(#g1)"/>
    <circle cx="36" cy="46" r="6" fill="#fff"/>
    <circle cx="64" cy="46" r="6" fill="#fff"/>
    <circle cx="36" cy="46" r="3" fill="#4a2f2f"/>
    <circle cx="64" cy="46" r="3" fill="#4a2f2f"/>
    <path d="M42 66 q8 8 16 0" stroke="#4a2f2f" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="30" cy="28" rx="12" ry="10" fill="#ffd6e8"/>
    <ellipse cx="70" cy="28" rx="12" ry="10" fill="#ffd6e8"/>
    <circle cx="25" cy="22" r="3" fill="#ff9fc6"/>
    <circle cx="75" cy="22" r="3" fill="#ff9fc6"/>
  </g>
</svg>`;
}

// petal SVG (peony-like)
function petalSVG(){
  return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M32 6 C24 6 18 12 16 20 C12 28 18 34 26 36 C34 38 40 34 44 28 C50 20 48 12 40 8 C36 6 34 6 32 6 Z" fill="#ffd6e8" />
  </svg>`;
}

// yes button behavior
yesBtn.addEventListener('click', async ()=>{
  try { await bgm.play(); } catch(e){}
  result.textContent = "Yay! Can't wait 😍🎬 Can’t wait for our movie night, my future wife 💞";
  yesBtn.disabled = true;
  noBtn.disabled = true;
  // big shower of kittens/hearts
  for(let i=0;i<28;i++){
    setTimeout(()=> spawnElement('kitty'), i*80);
    setTimeout(()=> spawnElement('petal'), i*60);
  }
});

// no button dodge behavior
noBtn.addEventListener('mouseover', ()=>{
  if(noBtn.disabled) return;
  const nx = Math.random()*(window.innerWidth - noBtn.offsetWidth - 40) + 20;
  const ny = Math.random()*(window.innerHeight - noBtn.offsetHeight - 140) + 80;
  noBtn.style.position = 'absolute';
  noBtn.style.left = nx + 'px';
  noBtn.style.top = ny + 'px';
});

// click no shows playful text
noBtn.addEventListener('click', ()=>{
  result.textContent = "You can't say no to me 😄 — press 'Of course' when you're ready!";
});

// reset position on resize
window.addEventListener('resize', ()=>{
  noBtn.style.position = '';
  noBtn.style.left = '';
  noBtn.style.top = '';
});

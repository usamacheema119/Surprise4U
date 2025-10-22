// Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const invite = document.getElementById('invite');
const rewardCard = document.getElementById('rewardCard');
const bgm = document.getElementById('bg-music');
const floatingContainer = document.getElementById('floating-elements');
const closeReward = document.getElementById('closeReward');

// Safety: if close button doesn't exist (older versions), get it
if (!closeReward) {
  // create a fallback close button behaviour (escape to hide)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideReward();
  });
}

// YES click: fade invite, show reward card with animation
yesBtn.addEventListener('click', () => {
  invite.style.opacity = '0';
  // after fade, hide invite and show reward
  setTimeout(() => {
    invite.classList.add('hidden');
    showReward();
  }, 700);
});

// Show reward function
function showReward() {
  // try play music
  bgm.play().catch(()=>{ /* autoplay blocked—play on user gesture later */ });

  // show reward overlay
  rewardCard.classList.remove('hidden');
  // trigger inner animation
  setTimeout(()=> rewardCard.classList.add('show'), 40);

  // spawn extra kittens and petals for celebration
  for (let i=0;i<28;i++){
    setTimeout(()=> spawnRandomFloating(), i*90);
  }
}

// Hide reward
function hideReward() {
  rewardCard.classList.remove('show');
  setTimeout(()=> rewardCard.classList.add('hidden'), 500);
  // bring back invite if needed
  invite.classList.remove('hidden');
  setTimeout(()=> invite.style.opacity = '1', 120);
}

// close button if present
const closeBtn = document.getElementById('closeReward');
if (closeBtn) closeBtn.addEventListener('click', hideReward);

// NO button: run away on hover/touchstart
function moveNoButton() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = 'absolute';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}
noBtn.addEventListener('mouseenter', moveNoButton);
// for mobile: move on touchstart as well
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoButton(); });

// Floating kittens & peonies: higher frequency
const emojis = ["🐱","🌸","🐾","💞","🌷","🐈","🌺","🐱","🌸","🐱"];

function spawnRandomFloating() {
  const el = document.createElement('div');
  el.className = 'floating';
  el.style.left = Math.random() * 100 + 'vw';
  el.style.animationDuration = (4 + Math.random()*6) + 's';
  el.style.fontSize = (20 + Math.random()*36) + 'px';
  el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  floatingContainer.appendChild(el);
  // remove after animation
  setTimeout(()=> el.remove(), 14000);
}

// continuous spawn more often for premium feel
const spawnInterval = setInterval(spawnRandomFloating, 350);

// Responsive safety on resize -> allow noBtn to reset
window.addEventListener('resize', ()=> {
  noBtn.style.position = '';
  noBtn.style.left = '';
  noBtn.style.top = '';
});

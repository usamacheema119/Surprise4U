// Background music setup 🎵
const music = document.getElementById("bg-music");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const container = document.querySelector(".container");
const finalMessage = document.getElementById("finalMessage");
const floatingContainer = document.getElementById("floating-elements");

// When clicking "Yes"
yesBtn.addEventListener("click", () => {
  container.style.opacity = "0";
  setTimeout(() => {
    container.classList.add("hidden");
    finalMessage.classList.remove("hidden");
    music.play();
  }, 1000);
});

// Runaway No button 🏃‍♀️💨
noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

// Floating emojis: kittens + hearts + peonies 🌸🐱💞
const emojis = ["🐱", "🌸", "🐾", "💞", "🌷"];

function createFloatingEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("floating");
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.animationDuration = 8 + Math.random() * 5 + "s";
  emoji.style.fontSize = 24 + Math.random() * 26 + "px";
  floatingContainer.appendChild(emoji);
  setTimeout(() => emoji.remove(), 12000);
}

setInterval(createFloatingEmoji, 600);

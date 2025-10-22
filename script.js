// Background Music
const music = document.getElementById("bg-music");
document.querySelector(".yes-btn").addEventListener("click", () => {
  music.play();
  alert("Yay! 💞 See you at 9 PM Sunday — Movie: Pride and Prejudice 🎬");
});

// Runaway "No" Button 🏃‍♀️💨
const noBtn = document.querySelector(".no-btn");
noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

// Floating kittens 🐱 + peonies 🌸
const floatingContainer = document.getElementById("floating-elements");
const emojis = ["🐱", "🌸", "🐾", "🌷", "💞"];

function createFloatingEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("floating");
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.animationDuration = 8 + Math.random() * 5 + "s";
  emoji.style.fontSize = 24 + Math.random() * 20 + "px";
  floatingContainer.appendChild(emoji);

  setTimeout(() => emoji.remove(), 10000);
}

setInterval(createFloatingEmoji, 700);

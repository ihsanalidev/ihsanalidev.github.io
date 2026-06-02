/* ============================================
   carousel.js
   Semua ID element pakai prefix "c-" agar
   tidak konflik dengan JS lain di portfolio
============================================ */

const carouselItems = [
  {
    label: "Calisthenics",
    badge: "Bodyweight",
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=440&q=80"
  },
  {
    label: "Strength",
    badge: "Weights",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=440&q=80"
  },
  {
    label: "Cardio",
    badge: "Endurance",
    img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=440&q=80"
  },
  {
    label: "Yoga",
    badge: "Flexibility",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=440&q=80"
  },
  {
    label: "HIIT",
    badge: "Intensity",
    img: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=440&q=80"
  },
];

const C_DURATION = 2000;
const C_N = carouselItems.length;

let cCur      = 0;
let cPlaying  = true;
let cProgress = 0;
let cLast     = null;

const cStage    = document.getElementById('c-stage');
const cDotsEl   = document.getElementById('c-dots');
const cBarEl    = document.getElementById('c-bar');
const cPauseBtn = document.getElementById('c-pause');

/* ── Build cards ── */
const cCardEls = carouselItems.map((item) => {
  const card = document.createElement('div');
  card.className = 'c-card';
  card.innerHTML = `
    <img src="${item.img}" alt="${item.label}" loading="lazy">
    <div class="c-card-badge">${item.badge}</div>
    <div class="c-card-label">${item.label}</div>
  `;
  cStage.appendChild(card);
  return card;
});

/* ── Build dots ── */
const cDotEls = carouselItems.map((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'c-dot';
  dot.addEventListener('click', () => cGo(i));
  cDotsEl.appendChild(dot);
  return dot;
});

/* ── Tentukan posisi tiap kartu ── */
function cGetState(i) {
  const d = (i - cCur + C_N) % C_N;
  if (d === 0)       return 'center';
  if (d === 1)       return 'right';
  if (d === C_N - 1) return 'left';
  return 'hide';
}

/* ── Update tampilan ── */
function cRender() {
  cCardEls.forEach((el, i) => {
    el.className = 'c-card state-' + cGetState(i);
  });
  cDotEls.forEach((dot, i) => {
    dot.className = 'c-dot' + (i === cCur ? ' on' : '');
  });
}

/* ── Pindah ke slide tertentu ── */
function cGo(index) {
  cCur = index;
  cProgress = 0;
  cRender();
}

/* ── Loop animasi auto-play ── */
function cTick(ts) {
  if (cPlaying) {
    if (!cLast) cLast = ts;
    const dt = ts - cLast;
    cLast = ts;

    cProgress += dt;
    cBarEl.style.width = Math.min(cProgress / C_DURATION * 100, 100) + '%';

    if (cProgress >= C_DURATION) {
      cCur = (cCur + 1) % C_N;
      cProgress = 0;
      cRender();
    }
  }
  requestAnimationFrame(cTick);
}

/* ── Tombol next ── */
document.getElementById('c-next').addEventListener('click', () => {
  cCur = (cCur + 1) % C_N;
  cProgress = 0;
  cRender();
});

/* ── Tombol prev ── */
document.getElementById('c-prev').addEventListener('click', () => {
  cCur = (cCur - 1 + C_N) % C_N;
  cProgress = 0;
  cRender();
});

/* ── Tombol pause/play ── */
cPauseBtn.addEventListener('click', () => {
  cPlaying = !cPlaying;
  cPauseBtn.innerHTML = cPlaying ? '&#9646;&#9646;' : '&#9654;';
  if (cPlaying) cLast = null;
});

/* ── Init ── */
cRender();
requestAnimationFrame(cTick);

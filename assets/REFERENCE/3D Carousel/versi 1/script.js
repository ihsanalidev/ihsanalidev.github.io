const items = [
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

const DURATION = 2000;
const N = items.length;

let cur = 0;
let playing = true;
let progress = 0;
let last = null;

const stage   = document.getElementById('stage');
const dotsEl  = document.getElementById('dots');
const barEl   = document.getElementById('bar');
const pauseBtn = document.getElementById('pause');

/* ── Build cards ── */
const cardEls = items.map((item) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${item.img}" alt="${item.label}" loading="lazy">
    <div class="card-badge">${item.badge}</div>
    <div class="card-label">${item.label}</div>
  `;
  stage.appendChild(card);
  return card;
});

/* ── Build dots ── */
const dotEls = items.map((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.addEventListener('click', () => go(i));
  dotsEl.appendChild(dot);
  return dot;
});

/* ── Helpers ── */
function getState(i) {
  const d = (i - cur + N) % N;
  if (d === 0)     return 'center';
  if (d === 1)     return 'right';
  if (d === N - 1) return 'left';
  return 'hide';
}

function render() {
  cardEls.forEach((el, i) => {
    el.className = 'card state-' + getState(i);
  });
  dotEls.forEach((dot, i) => {
    dot.className = 'dot' + (i === cur ? ' on' : '');
  });
}

function go(index) {
  cur = index;
  progress = 0;
  render();
}

/* ── Animation loop ── */
function tick(ts) {
  if (playing) {
    if (!last) last = ts;
    const dt = ts - last;
    last = ts;

    progress += dt;
    barEl.style.width = Math.min(progress / DURATION * 100, 100) + '%';

    if (progress >= DURATION) {
      cur = (cur + 1) % N;
      progress = 0;
      render();
    }
  }
  requestAnimationFrame(tick);
}

/* ── Controls ── */
document.getElementById('next').addEventListener('click', () => {
  cur = (cur + 1) % N;
  progress = 0;
  render();
});

document.getElementById('prev').addEventListener('click', () => {
  cur = (cur - 1 + N) % N;
  progress = 0;
  render();
});

pauseBtn.addEventListener('click', () => {
  playing = !playing;
  pauseBtn.innerHTML = playing ? '&#9646;&#9646;' : '&#9654;';
  if (playing) last = null;
});

/* ── Init ── */
render();
requestAnimationFrame(tick);

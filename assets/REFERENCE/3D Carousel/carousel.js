// ── DATA ──────────────────────────────────────
const CX_ITEMS = [
  { label: "Calisthenics", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=440&q=80" },
  { label: "Strength",     img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=440&q=80" },
  { label: "Cardio",       img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=440&q=80" },
  { label: "Yoga",         img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=440&q=80" },
  { label: "HIIT",         img: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=440&q=80" },
];

const CX_DURATION = 2000; // ganti angka ini untuk ubah kecepatan (ms)

// ── STATE ─────────────────────────────────────
const N   = CX_ITEMS.length;
let cur   = 0;
let play  = true;
let prog  = 0;
let last  = null;

// ── ELEMENT ───────────────────────────────────
const stage   = document.getElementById('cx-stage');
const dotsEl  = document.getElementById('cx-dots');
const barEl   = document.getElementById('cx-bar');
const pauseBtn = document.getElementById('cx-pause');

// ── BUILD CARDS ───────────────────────────────
const cards = CX_ITEMS.map(item => {
  const el = document.createElement('div');
  el.className = 'cx-card';
  el.innerHTML = `<img src="${item.img}" alt="${item.label}"><div class="cx-label">${item.label}</div>`;
  stage.appendChild(el);
  return el;
});

// ── BUILD DOTS ────────────────────────────────
const dots = CX_ITEMS.map((_, i) => {
  const d = document.createElement('div');
  d.className = 'cx-dot';
  d.onclick = () => go(i);
  dotsEl.appendChild(d);
  return d;
});

// ── RENDER ────────────────────────────────────
function render() {
  cards.forEach((el, i) => {
    const diff = (i - cur + N) % N;
    if (diff === 0)     el.className = 'cx-card cx-center';
    else if (diff === 1) el.className = 'cx-card cx-right';
    else if (diff === N - 1) el.className = 'cx-card cx-left';
    else el.className = 'cx-card cx-hide';
  });
  dots.forEach((d, i) => {
    d.className = 'cx-dot' + (i === cur ? ' cx-on' : '');
  });
}

function go(i) { cur = i; prog = 0; render(); }

// ── AUTO PLAY ─────────────────────────────────
function tick(ts) {
  if (play) {
    if (!last) last = ts;
    prog += ts - last;
    last = ts;
    barEl.style.width = Math.min(prog / CX_DURATION * 100, 100) + '%';
    if (prog >= CX_DURATION) { cur = (cur + 1) % N; prog = 0; render(); }
  }
  requestAnimationFrame(tick);
}

// ── CONTROLS ──────────────────────────────────
document.getElementById('cx-next').onclick = () => { cur = (cur + 1) % N; prog = 0; render(); };
document.getElementById('cx-prev').onclick = () => { cur = (cur - 1 + N) % N; prog = 0; render(); };
pauseBtn.onclick = () => {
  play = !play;
  pauseBtn.innerHTML = play ? '&#9646;&#9646;' : '&#9654;';
  if (play) last = null;
};

// ── INIT ──────────────────────────────────────
render();
requestAnimationFrame(tick);

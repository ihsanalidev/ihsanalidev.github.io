// Memanggil header dan footer
// ✅ TARUH INI DI BARIS PERTAMA script.js
class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="dark-mode">
          <button class="button-dark-mode" onclick="toggleDarkMode()">
            <i class="fa-regular fa-moon fa-2x"></i>
          </button>
        </div>
        <div class="navbar">
          <nav class="navbar-top">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#other">Other</a></li>
            </ul>
          </nav>
        </div>
        <button id="openContactBtn" class="openContactBtn">Get in Touch</button>
        <div id="contactModal" class="modal-overlay">
          <div class="modal-content">
            <span class="close-btn" id="closeContactBtn">&times;</span>
            <h2>Get in touch</h2>
            <p>Let's build something great together.</p>
            <div class="modal-options">
              <div class="card-call" onclick="window.open('https://calendly.com/username', '_blank')">
                <i class="fa-regular fa-calendar"></i>
                <h4>Book a call</h4>
                <p>30 Min Call</p>
              </div>
              <div class="card-email">
                <i class="fa-regular fa-envelope"></i>
                <h4>Email me</h4>
                <p>Open Gmail</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;









    // this.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //   anchor.addEventListener("click", function(e) {
    //     e.preventDefault();
    //     const target = document.querySelector(this.getAttribute("href"));
    //     if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    //   });
    // });








    // ✅ Event listener modal dipasang DI SINI, setelah innerHTML selesai
    const modal = this.querySelector('#contactModal');
    const openBtn = this.querySelector('#openContactBtn');
    const closeBtn = this.querySelector('#closeContactBtn');

    openBtn.addEventListener('click', () => modal.style.display = 'flex');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
}

class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="container-footer">
          <div class="text-copyright">
            <h2 class="footer-text">IA • © 2026 Ihsanalidev</h2>
          </div>
          <div class="icon-footer">
            <a href="https://github.com/ihsanalidev" target="_blank"><i class="fa-brands fa-github fa-2x"></i></a>
            <a href="https://www.linkedin.com/in/ihsan-ali-suwarno/" target="_blank"><i class="fa-brands fa-linkedin-in fa-2x"></i></a>
            <a href="mailto:ihsanaliwork@gmail.com" target="_blank"><i class="fa-regular fa-envelope fa-2x"></i></a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("my-header", MyHeader);
customElements.define("my-footer", MyFooter);
































// ketika dihover maka akan menyala area yang dihover
document.addEventListener('mousemove', function(e) {
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({
        behavior: "smooth"
      });
  });
});








// 3d curve js tag canvas
document.addEventListener("DOMContentLoaded", function () {

  document.addEventListener("mousemove", function (e) {
    document.body.style.setProperty("--mouse-x", e.clientX + "px");
    document.body.style.setProperty("--mouse-y", e.clientY + "px");
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  if (window.TagCanvas) {
    try {
      TagCanvas.Start("myCanvas", "tags", {
        textColour: null,
        outlineColour: "transparent",
        reverse: true,
        depth: 0.9,
        maxSpeed: 0.03,
        initial: [0.1, -0.1],
        dragControl: true,
        wheelZoom: false,
        imageScale: 1,
        imageMode: "image",
        noSelect: true,
        freezeActive: false,
        shuffleTags: true,
        shape: "sphere"
      });

      console.log("TagCanvas running");
    } catch (e) {
      console.error("TagCanvas error:", e);
    }
  } else {
    console.error("TagCanvas not loaded");
  }

});

// Sphere Wrapper
// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
//   75,
//   1,
//   0.1,
//   1000
// );

// camera.position.z = 4;

// const renderer = new THREE.WebGLRenderer({
//   canvas: document.getElementById("globe3d"),
//   alpha: true,
//   antialias: true
// });

// renderer.setSize(550, 550);
const globe3dCanvas = document.getElementById("globe3d");
if (globe3dCanvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({
    canvas: globe3dCanvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(550, 550);
}









// 3D Carousel
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















// Minicards 
const miniCard2 = document.querySelector('.mini-card-2');
const btn = document.querySelector('.button-hover-to-read-more');

miniCard2.addEventListener('mouseenter', () => {
  btn.style.visibility = 'hidden';
  btn.style.opacity = '0';
});

miniCard2.addEventListener('mouseleave', () => {
  btn.style.visibility = 'visible';
  btn.style.opacity = '1';
});





















// button dark-mode light-mode
function toggleDarkMode() {
    const body = document.body;
    const buttonIcon = document.querySelector('.button-dark-mode i');

    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        buttonIcon.className = "fa-solid fa-sun fa-2x";
    } else {
        buttonIcon.className = "fa-regular fa-moon fa-2x";
    }
}






// cta book a call
const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openContactBtn');
const closeBtn = document.getElementById('closeContactBtn');

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});









/* ============ THE IMPLANT STANDARD — shared JS ============ */

// ---- mobile menu ----
const burger = document.getElementById('burger');
const mMenu = document.getElementById('mMenu');
if (burger && mMenu) {
  burger.addEventListener('click', () => {
    const open = mMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mMenu.classList.remove('open'); burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  }));
}

// ---- reveal on scroll ----
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// ---- before/after sliders ----
document.querySelectorAll('.ba-slider').forEach(sl => {
  const after = sl.querySelector('.ba-after'), handle = sl.querySelector('.ba-handle');
  const set = x => {
    const r = sl.getBoundingClientRect();
    let p = Math.min(Math.max((x - r.left) / r.width, 0.02), 0.98) * 100;
    after.style.clipPath = `inset(0 0 0 ${p}%)`;
    handle.style.left = p + '%';
  };
  let drag = false;
  sl.addEventListener('pointerdown', e => { drag = true; sl.setPointerCapture(e.pointerId); set(e.clientX); e.preventDefault(); });
  sl.addEventListener('pointermove', e => { if (drag) set(e.clientX); });
  sl.addEventListener('pointerup', () => drag = false);
  sl.addEventListener('pointercancel', () => drag = false);
  // touch fallback for browsers with partial pointer-event support
  sl.addEventListener('touchstart', e => { set(e.touches[0].clientX); }, { passive: true });
  sl.addEventListener('touchmove', e => { set(e.touches[0].clientX); }, { passive: true });
});

// ---- open now (Australia/Melbourne) ----
// hours: [openMinutes, closeMinutes] per weekday (0=Sun ... 6=Sat), null = closed
const HOURS = {
  stkilda:  { name: 'St Kilda',  tel: '+61395344017', days: { 1:[540,1080],2:[540,1080],3:[540,1080],4:[540,1080],5:[540,1080],6:[540,960],0:null } },
  parkdale: { name: 'Parkdale',  tel: '+61370366855', days: { 1:[510,1080],2:[510,1080],3:[510,1080],4:[510,1080],5:[510,1080],6:[540,780],0:null } }
};
function melNow() {
  const parts = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Melbourne', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
  const get = t => parts.find(p => p.type === t).value;
  const wdMap = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };
  return { day: wdMap[get('weekday')], mins: parseInt(get('hour'),10) * 60 + parseInt(get('minute'),10) };
}
function isOpen(loc) {
  const { day, mins } = melNow();
  const h = HOURS[loc].days[day];
  return !!(h && mins >= h[0] && mins < h[1]);
}
function refreshOpenStatus() {
  // per-location chips
  document.querySelectorAll('[data-open-loc]').forEach(el => {
    const loc = el.getAttribute('data-open-loc');
    const open = isOpen(loc);
    el.classList.toggle('is-open', open);
    const t = el.querySelector('.st-text');
    if (t) t.textContent = open ? 'Open now' : 'Closed';
  });
  // header pill: open if either location open
  const pill = document.getElementById('openPill');
  if (pill) {
    const anyOpen = isOpen('stkilda') || isOpen('parkdale');
    pill.classList.toggle('is-open', anyOpen);
    pill.querySelector('.st-text').textContent = anyOpen ? 'Open now' : 'Closed now';
  }
}
refreshOpenStatus();
setInterval(refreshOpenStatus, 60000);

// ---- dentist tabs ----
const docTabs = document.querySelectorAll('.doc-tab');
docTabs.forEach(tab => tab.addEventListener('click', () => {
  docTabs.forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.doc-panel').forEach(p => p.classList.remove('active'));
  tab.classList.add('active');
  document.getElementById(tab.getAttribute('data-panel')).classList.add('active');
}));

// ---- qualify modal ----
const veil = document.getElementById('qualifyVeil');
if (veil) {
  const modal = veil.querySelector('.modal');
  const openModal = () => { veil.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeModal = () => { veil.classList.remove('open'); document.body.style.overflow = ''; };
  document.querySelectorAll('[data-modal="qualify"]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); openModal(); }));
  veil.querySelector('.modal-x').addEventListener('click', closeModal);
  veil.addEventListener('click', e => { if (e.target === veil) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  const form = document.getElementById('qualifyForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    // TODO (GYA): wire to SmileOx intake endpoint / API before launch.
    // const data = Object.fromEntries(new FormData(form).entries());
    // fetch('/api/qualify-lead', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)});
    modal.classList.add('sent');
  });
}

// ---- side scroll nav (index) ----
const sideNav = document.getElementById('sideNav');
if (sideNav) {
  const links = [...sideNav.querySelectorAll('a')];
  const targets = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const spy = () => {
    let current = targets[0], mid = window.innerHeight * 0.4;
    for (const t of targets) {
      if (t.getBoundingClientRect().top <= mid) current = t;
    }
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current.id));
    // flip contrast when over a light section
    sideNav.classList.toggle('on-light', current.classList.contains('sec-light'));
  };
  document.addEventListener('scroll', spy, { passive: true });
  spy();
}


// ---- BA slider intro nudge (shows it's draggable) ----
const baIO = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const sl = e.target, after = sl.querySelector('.ba-after'), handle = sl.querySelector('.ba-handle');
  baIO.unobserve(sl);
  let p = 50; const to = [38, 62, 50]; let i = 0;
  const stepAnim = () => {
    if (i >= to.length) return;
    const target = to[i++]; const from = p; const t0 = performance.now();
    const tick = now => {
      const k = Math.min((now - t0) / 450, 1);
      p = from + (target - from) * (0.5 - Math.cos(Math.PI * k) / 2);
      after.style.clipPath = `inset(0 0 0 ${p}%)`; handle.style.left = p + '%';
      if (k < 1) requestAnimationFrame(tick); else setTimeout(stepAnim, 120);
    };
    requestAnimationFrame(tick);
  };
  setTimeout(stepAnim, 350);
}), { threshold: .5 });
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.ba-slider').forEach(sl => baIO.observe(sl));
}

/* ============================================================
   TRABZON MERKEZ FEN LİSESİ — JAVASCRIPT
   ============================================================ */

// Navbar scroll efekti
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Mezunlar filtre
const filterBtns = document.querySelectorAll('.filter-btn');
const alumniCards = document.querySelectorAll('.alumni-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    alumniCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp .4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Intersection Observer — timeline ve kart animasyonları
const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll(
  '.timeline-card, .alumni-card, .campus-card, .stats-card, .ach-category, .contact-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  revealObserver.observe(el);
});

// Aktif nav linki scroll'a göre
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.background = '';
        a.style.color = '';
        if (a.getAttribute('href') === '#' + id) {
          a.style.background = 'rgba(200,169,81,.15)';
          a.style.color = '#c8a951';
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => activeObserver.observe(s));

// Sayaç animasyonu (stats)
const statsNums = document.querySelectorAll('.stats-num');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.dataset.target;
      if (!raw) return;
      const target = parseInt(raw, 10);
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        const plus = el.textContent.includes('+') ? '+' : '';
        const tilde = el.textContent.startsWith('~') ? '~' : '';
        el.textContent = tilde + current + plus;
      }, 22);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statsNums.forEach(el => countObserver.observe(el));

// Uçan manolya yaprakçıkları
(function() {
  const INTERVAL = 1100;
  const MAX = 16;
  let count = 0;

  function spawnPetal() {
    if (count >= MAX) return;
    count++;
    const p = document.createElement('div');
    p.className = 'falling-petal';
    const size = 7 + Math.random() * 9;
    const startX = Math.random() * 100;
    const dur = 7 + Math.random() * 8;
    const delay = Math.random() * 1.2;
    const drift = (-35 + Math.random() * 70).toFixed(1);
    const rot = (Math.random() * 380).toFixed(1);
    const opacity = (0.22 + Math.random() * 0.32).toFixed(2);
    p.style.cssText = `width:${size}px;height:${(size*1.65).toFixed(1)}px;left:${startX.toFixed(1)}vw;animation-duration:${dur.toFixed(1)}s;animation-delay:${delay.toFixed(2)}s;--drift:${drift}px;--rot:${rot}deg;opacity:${opacity}`;
    document.body.appendChild(p);
    setTimeout(() => { p.remove(); count--; }, (dur + delay + 0.5) * 1000);
  }

  for (let i = 0; i < 6; i++) setTimeout(spawnPetal, i * 350);
  setInterval(spawnPetal, INTERVAL);
})();

// Manolya ağacı kök paralaks — köklerin aşağıya doğru takip efekti
(function() {
  const TREE_TOTAL_VH = 260; // CSS'deki height: 260vh
  const TREE_EXTRA_VH = TREE_TOTAL_VH - 100; // 160vh extra (kökler)

  function updateTree() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const progress = Math.min(window.scrollY / maxScroll, 1);
    const offsetPx = progress * (TREE_EXTRA_VH / 100) * window.innerHeight;
    document.documentElement.style.setProperty('--tree-offset', `-${offsetPx.toFixed(2)}px`);
  }

  window.addEventListener('scroll', updateTree, { passive: true });
  window.addEventListener('resize', updateTree, { passive: true });
  updateTree();
})();

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

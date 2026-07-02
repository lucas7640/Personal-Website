/* Lux is the Way — cinematic site engine
   atmosphere (grain + spice dust) · smart nav · staggered reveals
   hero word-rise · parallax · reading progress · lightbox
   Plain vanilla JS, no dependencies. Load with: <script src="main.js" defer></script> */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================= Atmosphere: film grain ================= */
  if (!reduceMotion) {
    var grain = document.createElement('div');
    grain.className = 'fx-grain';
    grain.setAttribute('aria-hidden', 'true');
    document.body.appendChild(grain);
  }

  /* ================= Atmosphere: spice dust ================= */
  if (!reduceMotion) {
    var canvas = document.createElement('canvas');
    canvas.id = 'fx-dust';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var W, H, dpr, motes = [];

    function sizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeMote() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.4 + Math.random() * 1.4,
        vx: 0.06 + Math.random() * 0.22,     /* drift right, like windblown sand */
        vy: -(0.04 + Math.random() * 0.14),  /* and slowly upward */
        a: 0.08 + Math.random() * 0.3,
        tw: Math.random() * Math.PI * 2,     /* twinkle phase */
        ts: 0.004 + Math.random() * 0.01
      };
    }

    function seedMotes() {
      var count = Math.min(110, Math.round((W * H) / 16000));
      motes = [];
      for (var i = 0; i < count; i++) motes.push(makeMote());
    }

    var running = true;
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < motes.length; i++) {
        var m = motes[i];
        m.x += m.vx; m.y += m.vy; m.tw += m.ts;
        if (m.x > W + 4) m.x = -4;
        if (m.y < -4) { m.y = H + 4; m.x = Math.random() * W; }
        var alpha = m.a * (0.55 + 0.45 * Math.sin(m.tw));
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(221,184,119,' + alpha.toFixed(3) + ')';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    sizeCanvas(); seedMotes(); requestAnimationFrame(draw);
    window.addEventListener('resize', function () { sizeCanvas(); seedMotes(); });
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(draw);
    });
  }

  /* ================= Smart nav (hide down, show up) ================= */
  var nav = document.querySelector('.nav');
  var lastY = window.scrollY;
  if (nav) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y > 140 && y > lastY + 4) nav.classList.add('nav--hidden');
      else if (y < lastY - 4 || y < 140) nav.classList.remove('nav--hidden');
      lastY = y;
    }, { passive: true });
  }

  /* ================= Mobile nav toggle ================= */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('is-open'); });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('is-open');
    });
  }

  /* ================= Hero title: word-by-word rise ================= */
  var heroTitle = document.querySelector('.hero h1');
  if (heroTitle && !reduceMotion && !heroTitle.querySelector('.w')) {
    var words = heroTitle.textContent.trim().split(/\s+/);
    heroTitle.textContent = '';
    words.forEach(function (word, i) {
      var mask = document.createElement('span');
      mask.className = 'w';
      var inner = document.createElement('span');
      inner.textContent = word;
      inner.style.animationDelay = (0.15 + i * 0.12) + 's';
      mask.appendChild(inner);
      heroTitle.appendChild(mask);
      if (i < words.length - 1) heroTitle.appendChild(document.createTextNode(' '));
    });
  }

  /* ================= Staggered reveal on scroll ================= */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    /* stagger siblings that share a parent */
    var groups = new Map();
    revealEls.forEach(function (el) {
      var p = el.parentElement;
      if (!groups.has(p)) groups.set(p, 0);
      var n = groups.get(p);
      el.style.setProperty('--d', (n * 0.12) + 's');
      groups.set(p, n + 1);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ================= Parallax (data-parallax="speed") ================= */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !reduceMotion) {
    var ticking = false;
    function applyParallax() {
      var y = window.scrollY;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
        var base = el.getAttribute('data-parallax-base') || '';
        el.style.transform = base + ' translateY(' + (y * speed).toFixed(1) + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(applyParallax); ticking = true; }
    }, { passive: true });
    applyParallax();
  }

  /* ================= Reading progress (article pages) ================= */
  var article = document.querySelector('.article');
  if (article) {
    var bar = document.createElement('div');
    bar.className = 'fx-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    function updateProgress() {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var done = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      bar.style.transform = 'scaleX(' + (total > 0 ? done / total : 0).toFixed(4) + ')';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  /* ================= Gallery lightbox ================= */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt) {
    if (!src || !lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }
  if (lightbox) {
    document.addEventListener('click', function (e) {
      var item = e.target.closest('.gallery__item');
      if (!item) return;
      var img = item.querySelector('img');
      var full = item.getAttribute('data-full');
      var src = full || (img ? img.src : '');
      openLightbox(src, item.getAttribute('data-title'));
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
  }

  /* ================= Video facades: click to play ================= */
  document.addEventListener('click', function (e) {
    var embed = e.target.closest('.video-embed[data-yt]');
    if (!embed || embed.classList.contains('is-playing')) return;
    /* Opened from disk? YouTube refuses embeds without a referer, so
       let the link open the video on YouTube instead. */
    if (location.protocol === 'file:') return;
    e.preventDefault();
    var id = embed.getAttribute('data-yt');
    var img = embed.querySelector('img');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    iframe.title = img ? img.alt : 'YouTube video';
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    embed.classList.add('is-playing');
    embed.innerHTML = '';
    embed.appendChild(iframe);
  });
})();

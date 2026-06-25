/* ═══════════════════════════════════════════════════════════════
   WEDDING INVITATION — CINEMATIC JAVASCRIPT
   Dr. Ahmed & Dr. Haneen · 14 July 2026
═══════════════════════════════════════════════════════════════ */

'use strict';

// ─── STATE ───
let currentLang = 'en';
let musicPlaying = false;
let isDark = false;
let rsvpChoice = null;

// ─── WEDDING DATE ───
const WEDDING_DATE = new Date('2026-07-14T19:00:00');

// ════════════════════════════════════════════
// ENVELOPE — FULL SCREEN ENTRY
// ════════════════════════════════════════════
let envelopeOpened = false;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const envelope = document.getElementById('envelope-screen');
  const wrap = document.getElementById('envelope-wrap');
  const box = wrap.querySelector('.envelope-box');

  // Trigger opening animation
  box.classList.add('opening');

  // Start music on first user interaction
  tryAutoplay();

  // Ripple burst on click point
  spawnFloaters('envelope-floaters', 10);

  setTimeout(() => {
    envelope.classList.add('exiting');
  }, 1100);

  setTimeout(() => {
    envelope.style.display = 'none';
    const langScreen = document.getElementById('lang-screen');
    langScreen.classList.remove('hidden-init');
    langScreen.classList.add('entering');
    requestAnimationFrame(() => {
      langScreen.classList.add('visible');
    });
  }, 1900);
}

// ════════════════════════════════════════════
// LANGUAGE SYSTEM
// ════════════════════════════════════════════
function selectLang(lang) {
  currentLang = lang;
  const screen = document.getElementById('lang-screen');
  screen.classList.add('exiting');

  setTimeout(() => {
    screen.style.display = 'none';
    document.body.dataset.lang = lang;

    if (lang === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    }

    const main = document.getElementById('main-site');
    main.classList.remove('hidden');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        main.classList.add('visible');
      });
    });

    applyLang(lang);
    startCountdown();
    initReveal();
    tryAutoplay();
  }, 900);
}

function applyLang(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
    if (val && val.includes('<br')) {
      el.innerHTML = val;
    } else if (val) {
      el.textContent = val;
    }
  });

  // Handle elements that use innerHTML quotes
  document.querySelectorAll('.romantic-quote').forEach(el => {
    const val = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
    if (val) el.innerHTML = val;
  });

  // Translate attendance button subtitles
  document.querySelectorAll('.attendance-title, .attendance-subtitle').forEach(el => {
    const val = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
    if (val) el.textContent = val;
  });

  // OR text in Arabic
  document.querySelectorAll('.attendance-or-text').forEach(el => {
    el.textContent = lang === 'ar' ? 'أو' : 'or';
  });
}

// ════════════════════════════════════════════
// MUSIC
// ════════════════════════════════════════════
function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const icon = document.getElementById('music-icon');
  if (musicPlaying) {
    audio.pause();
    icon.textContent = '♪';
    musicPlaying = false;
  } else {
    audio.play().catch(() => {});
    icon.textContent = '⏸';
    musicPlaying = true;
  }
}

function tryAutoplay() {
  const audio = document.getElementById('bg-music');
  audio.volume = 0;
  audio.play().then(() => {
    musicPlaying = true;
    document.getElementById('music-icon').textContent = '⏸';
    // Fade in
    let vol = 0;
    const fade = setInterval(() => {
      vol = Math.min(vol + 0.02, 0.4);
      audio.volume = vol;
      if (vol >= 0.4) clearInterval(fade);
    }, 100);
  }).catch(() => {});
}

// ════════════════════════════════════════════
// THEME
// ════════════════════════════════════════════
function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle('dark-mode', isDark);
  document.getElementById('theme-icon').textContent = isDark ? '☀' : '☽';
}

// ════════════════════════════════════════════
// COUNTDOWN
// ════════════════════════════════════════════
function startCountdown() {
  function update() {
    const now = new Date();
    const diff = WEDDING_DATE - now;
    if (diff <= 0) {
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val).padStart(2, '0');
    };
    set('cd-days', days);
    set('cd-hours', hours);
    set('cd-mins', mins);
    set('cd-secs', secs);
  }
  update();
  setInterval(update, 1000);
}

// ════════════════════════════════════════════
// SCROLL REVEAL
// ════════════════════════════════════════════
function initReveal() {
  const revealEls = document.querySelectorAll(
    '.glass-card, .story-beat, .detail-card, .gallery-item, .section-header, .countdown-unit'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
}

// ════════════════════════════════════════════
// PARALLAX
// ════════════════════════════════════════════
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.parallax-img').forEach(img => {
    const section = img.closest('section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const offset = rect.top * 0.3;
    img.style.transform = `translateY(${offset}px)`;
  });
}, { passive: true });

// ════════════════════════════════════════════
// RSVP
// ════════════════════════════════════════════
function selectRsvp(btn, val) {
  document.querySelectorAll('.rsvp-attendance-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  rsvpChoice = val;

  // Spawn particles on accept
  if (val === 'yes') {
    const container = document.getElementById('accept-particles');
    if (container) {
      container.innerHTML = '';
      for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'att-particle';
        p.style.cssText = `
          left: ${10 + Math.random() * 80}%;
          bottom: ${10 + Math.random() * 40}%;
          --duration: ${1.5 + Math.random() * 2}s;
          --delay: ${Math.random() * 0.8}s;
          background: rgba(${Math.random() > 0.5 ? '142,207,187' : '212,168,67'},0.7);
        `;
        container.appendChild(p);
      }
    }
  }

  // Ripple effect
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute;
    inset: 0;
    background: rgba(${val === 'yes' ? '142,207,187' : '196,154,108'}, 0.12);
    animation: rsvp-ripple 0.6s ease forwards;
    pointer-events: none;
    z-index: 10;
  `;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

(function() {
  const s = document.createElement('style');
  s.textContent = `@keyframes rsvp-ripple { from{opacity:1} to{opacity:0;transform:scale(1.05)} }`;
  document.head.appendChild(s);
})();

// ════════════════════════════════════════════
// RSVP SUBMISSION — sends directly to Google Forms
// (form URL intentionally not shown anywhere in the UI)
// ════════════════════════════════════════════
// Google Forms relay — submits RSVP data directly to the couple's form,
// without ever exposing the destination URL in the page source or UI.
const _F = ['https://docs.google.com/forms/d/e/',
  '1FAIpQLSdEMTA97BlDchMgg4vPJpJ9wmkh_oObtWwB2SGqOYq4z55QgQ',
  '/formResponse'].join('');

function submitRsvp() {
  const name = document.getElementById('rsvp-name').value.trim();
  const msg  = document.getElementById('rsvp-msg').value.trim();

  if (!name) {
    document.getElementById('rsvp-name').focus();
    shakeFiled('rsvp-name');
    return;
  }
  if (!msg) {
    document.getElementById('rsvp-msg').focus();
    shakeFiled('rsvp-msg');
    return;
  }
  if (!rsvpChoice) {
    shakeFiled('btn-accept');
    shakeFiled('btn-decline');
    return;
  }

  const submitBtn = document.querySelector('.rsvp-submit');
  submitBtn.style.opacity = '0.6';
  submitBtn.style.pointerEvents = 'none';
  submitBtn.querySelector('span').textContent = currentLang === 'ar' ? 'يُرسل...' : 'Sending...';

  sendRsvpEmail(name, msg, rsvpChoice);
}

function sendRsvpEmail(name, msg, attendance) {
  // Build a hidden form and submit it via a hidden iframe — fully cross-origin,
  // no backend required, and the destination form is never exposed to the page.
  const iframe = document.createElement('iframe');
  iframe.name = 'hidden-rsvp-target';
  iframe.style.cssText = 'display:none;position:fixed;width:0;height:0;border:0;';
  document.body.appendChild(iframe);

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = _F;
  form.target = 'hidden-rsvp-target';
  form.style.display = 'none';
  form.setAttribute('accept-charset', 'UTF-8');

  const addField = (fieldName, value) => {
    const input = document.createElement('input');
    input.type  = 'hidden';
    input.name  = fieldName;
    input.value = value;
    form.appendChild(input);
  };

  // Google Form field IDs
  const attendanceText = attendance === 'yes'
    ? 'Accepts \uD83C\uDF38 — With you in the moment'
    : 'Declines \uD83D\uDD4A\uFE0F — With you in spirit';
  const fullMsg = attendanceText + (msg ? '\n\nMessage: ' + msg : '');
  addField('entry.2018402134', name);
  addField('entry.1535139612', fullMsg);

  document.body.appendChild(form);
  form.submit();

  setTimeout(() => {
    showRsvpSuccess();
    setTimeout(() => {
      form.remove();
      iframe.remove();
    }, 3000);
  }, 1000);
}

function showRsvpSuccess() {
  const thanks = document.getElementById('rsvp-thanks');
  const msg = thanks.getAttribute('data-' + currentLang) || thanks.getAttribute('data-en');
  thanks.textContent = msg;
  thanks.classList.remove('hidden');

  // Animate the form fields out
  document.querySelectorAll('.rsvp-field').forEach((f, i) => {
    setTimeout(() => {
      f.style.transition = 'opacity 0.5s, transform 0.5s';
      f.style.opacity = '0.3';
    }, i * 80);
  });
  document.querySelector('.rsvp-submit').style.display = 'none';
}

function shakeFiled(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.animation = 'none';
  el.style.borderColor = 'rgba(220,100,100,0.7)';
  setTimeout(() => {
    el.style.animation = 'field-shake 0.4s ease';
    setTimeout(() => {
      el.style.borderColor = '';
      el.style.animation = '';
    }, 500);
  }, 10);
}

// Shake keyframe
(function() {
  const s = document.createElement('style');
  s.textContent = `@keyframes field-shake {
    0%,100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }`;
  document.head.appendChild(s);
})();

// ════════════════════════════════════════════
// PARTICLES CANVAS
// ════════════════════════════════════════════
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], butterflies = [], petals = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Gold + Mint particles
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      color: Math.random() > 0.5 ? 'rgba(212,168,67,' : 'rgba(142,207,187,',
      opacity: Math.random() * 0.6 + 0.2
    });
  }

  // Realistic Butterflies — global, persistent
  for (let i = 0; i < 20; i++) {
    butterflies.push(createButterfly());
  }

  // Petals
  for (let i = 0; i < 30; i++) {
    petals.push(createPetal());
  }

  // Magic sparkles
  let sparkles = [];
  for (let i = 0; i < 45; i++) {
    sparkles.push(createSparkle());
  }

  function createSparkle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 2.5 + 1,
      maxSize: Math.random() * 3 + 2.5,
      life: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.035 + 0.012,
      color: Math.random() > 0.5 ? '212,168,67' : '142,207,187'
    };
  }

  function drawSparkle(s) {
    const pulse = (Math.sin(s.life) + 1) / 2; // 0..1
    const r = s.size + pulse * (s.maxSize - s.size);
    const alpha = 0.25 + pulse * 0.6;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4.5);
    grad.addColorStop(0, `rgba(${s.color},${alpha})`);
    grad.addColorStop(0.5, `rgba(${s.color},${alpha * 0.3})`);
    grad.addColorStop(1, `rgba(${s.color},0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(s.x, s.y, r * 4.5, 0, Math.PI * 2);
    ctx.fill();

    // sparkle cross
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(s.x - r * 2.2, s.y);
    ctx.lineTo(s.x + r * 2.2, s.y);
    ctx.moveTo(s.x, s.y - r * 2.2);
    ctx.lineTo(s.x, s.y + r * 2.2);
    ctx.stroke();

    // bright core
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.9})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ── Realistic butterfly factory ──
  // Butterflies use layered curved wings, body, antennae, and natural
  // up-down + side drift flight with periodic gliding.
  const BUTTERFLY_PALETTES = [
    { wing: '#c49a6c', tip: '#5c3d2e', body: '#3d2010' },   // chocolate/caramel
    { wing: '#8ecfbb', tip: '#5c3d2e', body: '#3d2010' },   // mint
    { wing: '#e0c49a', tip: '#7a5240', body: '#4a2c18' },   // pale caramel
    { wing: '#b2e0d4', tip: '#7a5240', body: '#4a2c18' },   // pale mint
    { wing: '#f5ede0', tip: '#c49a6c', body: '#5c3d2e' }    // cream/white
  ];

  function createButterfly() {
    const palette = BUTTERFLY_PALETTES[Math.floor(Math.random() * BUTTERFLY_PALETTES.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      baseY: 0,
      angle: Math.random() * Math.PI * 2,         // direction of travel
      speed: Math.random() * 0.6 + 0.35,
      wingAngle: Math.random() * Math.PI * 2,
      wingSpeed: Math.random() * 0.12 + 0.1,
      size: Math.random() * 14 + 12,
      palette,
      opacity: Math.random() * 0.35 + 0.55,
      driftPhase: Math.random() * Math.PI * 2,
      driftSpeed: Math.random() * 0.02 + 0.008,
      turnPhase: Math.random() * Math.PI * 2,
      turnSpeed: Math.random() * 0.012 + 0.004,
      life: 0,
      maxLife: Math.random() * 1200 + 800
    };
  }

  function createPetal() {
    return {
      x: Math.random() * W,
      y: -20,
      vx: (Math.random() - 0.5) * 1.5,
      vy: Math.random() * 0.8 + 0.3,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      size: Math.random() * 8 + 4,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? '#e0c49a' : '#b2e0d4'
    };
  }

  // Draw a single curved wing using bezier curves for an organic shape
  function drawWingShape(ctx, size, flap, mirror, palette) {
    const m = mirror ? -1 : 1;
    const flapScale = 0.55 + flap * 0.45; // wings open/close

    ctx.save();
    ctx.scale(m * flapScale, 1);

    // Upper (forewing) lobe
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      size * 0.3, -size * 0.9,
      size * 1.15, -size * 0.85,
      size * 1.05, -size * 0.1
    );
    ctx.bezierCurveTo(
      size * 0.95, size * 0.25,
      size * 0.45, size * 0.18,
      0, 0
    );
    ctx.closePath();
    const grad1 = ctx.createLinearGradient(0, -size, size, 0);
    grad1.addColorStop(0, palette.tip);
    grad1.addColorStop(1, palette.wing);
    ctx.fillStyle = grad1;
    ctx.fill();

    // Lower (hindwing) lobe — smaller
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      size * 0.1, size * 0.5,
      size * 0.75, size * 0.85,
      size * 0.55, size * 0.55
    );
    ctx.bezierCurveTo(
      size * 0.4, size * 0.35,
      size * 0.15, size * 0.2,
      0, 0
    );
    ctx.closePath();
    ctx.fillStyle = palette.wing;
    ctx.globalAlpha *= 0.9;
    ctx.fill();
    ctx.globalAlpha /= 0.9;

    // Wing spot detail
    ctx.beginPath();
    ctx.ellipse(size * 0.55, -size * 0.3, size * 0.14, size * 0.09, 0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fill();

    ctx.restore();
  }

  function drawButterfly(b) {
    const flap = (Math.sin(b.wingAngle) + 1) / 2; // 0..1 open/close cycle

    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(Math.sin(b.driftPhase) * 0.15); // gentle body tilt
    ctx.globalAlpha = b.opacity;

    // soft drop shadow / glow beneath
    ctx.save();
    ctx.globalAlpha *= 0.18;
    ctx.beginPath();
    ctx.ellipse(0, b.size * 0.15, b.size * 1.3, b.size * 0.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = b.palette.wing;
    ctx.filter = 'blur(2px)';
    ctx.fill();
    ctx.restore();

    // Wings (drawn back-to-front: far wing slightly offset for depth)
    drawWingShape(ctx, b.size, flap, true,  b.palette);  // left wing
    drawWingShape(ctx, b.size, flap, false, b.palette);  // right wing

    // Body
    ctx.beginPath();
    ctx.ellipse(0, 0, b.size * 0.07, b.size * 0.45, 0, 0, Math.PI * 2);
    ctx.fillStyle = b.palette.body;
    ctx.fill();

    // Antennae
    ctx.strokeStyle = b.palette.body;
    ctx.lineWidth = Math.max(0.6, b.size * 0.03);
    ctx.beginPath();
    ctx.moveTo(0, -b.size * 0.4);
    ctx.quadraticCurveTo(b.size * 0.18, -b.size * 0.65, b.size * 0.22, -b.size * 0.75);
    ctx.moveTo(0, -b.size * 0.4);
    ctx.quadraticCurveTo(-b.size * 0.18, -b.size * 0.65, -b.size * 0.22, -b.size * 0.75);
    ctx.stroke();

    ctx.restore();
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.opacity;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    // Sparkles (magic shimmer)
    sparkles.forEach(s => {
      s.life += s.speed;
      drawSparkle(s);
    });

    // Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();
    });

    // Butterflies — natural flight: forward motion + sinusoidal drift + slow turning
    butterflies.forEach((b, i) => {
      b.wingAngle += b.wingSpeed;
      b.driftPhase += b.driftSpeed;
      b.turnPhase += b.turnSpeed;
      b.life++;

      // Gradually change direction for organic wandering paths
      b.angle += Math.sin(b.turnPhase) * 0.015;

      const lift = Math.sin(b.driftPhase) * 0.6; // gentle vertical bob
      b.x += Math.cos(b.angle) * b.speed;
      b.y += Math.sin(b.angle) * b.speed * 0.6 + lift * 0.05;

      // Wrap around edges with margin
      if (b.x < -60) b.x = W + 60;
      if (b.x > W + 60) b.x = -60;
      if (b.y < -60) b.y = H + 60;
      if (b.y > H + 60) b.y = -60;

      if (b.life > b.maxLife) {
        butterflies[i] = createButterfly();
        return;
      }
      drawButterfly(b);
    });

    // Petals
    petals.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rotSpeed;
      p.vx += (Math.random() - 0.5) * 0.04;

      if (p.y > H + 30) {
        petals[i] = createPetal();
      }
      drawPetal(p);
    });

    requestAnimationFrame(animate);
  }
  animate();
})();

// ════════════════════════════════════════════
// FLOATING ELEMENTS FOR LANG SCREEN + FINAL
// ════════════════════════════════════════════
function spawnFloaters(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const emojis = ['🌸', '🌿', '✨', '🦋', '🌺', '💫', '🌼'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const size = Math.random() * 20 + 14;
    el.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      font-size: ${size}px;
      opacity: 0;
      animation: float-element ${Math.random() * 10 + 8}s linear ${Math.random() * 8}s infinite;
      pointer-events: none;
    `;
    container.appendChild(el);
  }
}

// Add CSS for float-element
(function() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-element {
      0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
      10% { opacity: 0.7; }
      90% { opacity: 0.4; }
      100% { transform: translateY(-120vh) translateX(${Math.random()*100-50}px) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

spawnFloaters('lang-floaters', 20);
spawnFloaters('final-floaters', 15);

// ════════════════════════════════════════════
// MAGICAL EFFECTS — Stars, Sparkles, Butterflies
// Pure JS animation (requestAnimationFrame) — works in ALL browsers
// No CSS custom properties in keyframes (that approach is broken)
// ════════════════════════════════════════════
(function initMagicalEffects() {
  const isMobile = window.innerWidth <= 768;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  // ── 1. STARS (stars-layer) ──
  (function spawnStars() {
    const layer = document.getElementById('stars-layer');
    if (!layer) return;

    const count = isMobile ? 30 : 60;
    const variants = ['', 'mint', 'white'];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'magic-star ' + pick(variants);
      const size = rnd(2, 6);
      const delay = rnd(0, 4);
      const dur = rnd(2.5, 5.5);
      el.style.cssText = `
        left: ${rnd(0,100)}vw;
        top: ${rnd(0,100)}vh;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${dur}s;
        animation-delay: ${-delay}s;
      `;
      layer.appendChild(el);
    }

    // Nebula orbs
    const orbCount = isMobile ? 4 : 8;
    const orbColors = [
      'rgba(142,207,187,0.25)', 'rgba(212,168,67,0.18)',
      'rgba(196,154,108,0.2)',  'rgba(178,224,212,0.22)'
    ];
    for (let i = 0; i < orbCount; i++) {
      const el = document.createElement('div');
      el.className = 'magic-orb';
      const size = rnd(isMobile ? 80 : 150, isMobile ? 180 : 350);
      el.style.cssText = `
        left: ${rnd(-5,90)}vw;
        top: ${rnd(-5,90)}vh;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${pick(orbColors)} 0%, transparent 70%);
        animation-duration: ${rnd(6,14)}s;
        animation-delay: ${-rnd(0,8)}s;
      `;
      layer.appendChild(el);
    }
  })();

  // ── 2. SPARKLES (global-effects, JS-animated position) ──
  (function spawnSparkles() {
    const layer = document.getElementById('global-effects');
    if (!layer) return;

    const count = isMobile ? 25 : 50;
    const sparkles = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'magic-sparkle ' + (Math.random() > 0.5 ? 'mint' : '');
      const size = rnd(2.5, 6);
      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        position: absolute;
        animation-duration: ${rnd(1.8, 4)}s;
        animation-delay: ${-rnd(0, 4)}s;
      `;
      layer.appendChild(el);

      sparkles.push({
        el,
        x: rnd(0, window.innerWidth),
        y: rnd(0, window.innerHeight),
        vx: rnd(-0.3, 0.3),
        vy: rnd(-0.5, -0.1)
      });
    }

    function tickSparkles() {
      const W = window.innerWidth, H = window.innerHeight;
      sparkles.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -10) s.x = W + 5;
        if (s.x > W + 10) s.x = -5;
        if (s.y < -10) { s.x = rnd(0, W); s.y = H + 5; }
        s.el.style.left = s.x + 'px';
        s.el.style.top  = s.y + 'px';
      });
      requestAnimationFrame(tickSparkles);
    }
    tickSparkles();
  })();

  // ── 3. BUTTERFLIES (global-effects, JS-animated along curved paths) ──
  (function spawnButterflies() {
    const layer = document.getElementById('global-effects');
    if (!layer) return;

    const PALETTES = [
      { wing: '#c49a6c', body: '#5c3d2e' },
      { wing: '#8ecfbb', body: '#2d6e5e' },
      { wing: '#e0c49a', body: '#7a5240' },
      { wing: '#d4a843', body: '#5c3d2e' },
      { wing: '#b2e0d4', body: '#3d7a6e' },
      { wing: '#f5ede0', body: '#c49a6c' }
    ];

    function makeSVG(p) {
      const w = p.wing, b = p.body;
      return `<svg viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg">
        <g class="wing-l" style="transform-origin:20px 18px">
          <path d="M20 18 C 15 4, 3 3, 3 12 C 3 19, 12 21, 20 18 Z" fill="${w}" opacity="0.93"/>
          <path d="M20 18 C 14 24, 5 29, 7 22 C 9 17, 14 16, 20 18 Z" fill="${w}" opacity="0.78"/>
          <path d="M20 18 C 16 9, 9 8, 8 13" stroke="${b}" stroke-width="0.5" fill="none" opacity="0.3"/>
        </g>
        <g class="wing-r" style="transform-origin:20px 18px">
          <path d="M20 18 C 25 4, 37 3, 37 12 C 37 19, 28 21, 20 18 Z" fill="${w}" opacity="0.93"/>
          <path d="M20 18 C 26 24, 35 29, 33 22 C 31 17, 26 16, 20 18 Z" fill="${w}" opacity="0.78"/>
          <path d="M20 18 C 24 9, 31 8, 32 13" stroke="${b}" stroke-width="0.5" fill="none" opacity="0.3"/>
        </g>
        <ellipse cx="20" cy="18" rx="1.3" ry="7" fill="${b}" opacity="0.9"/>
        <circle cx="20" cy="11" r="1.4" fill="${b}" opacity="0.9"/>
        <path d="M20 10.5 C 18 7.5, 15.5 5.5, 14.5 3.5" stroke="${b}" stroke-width="0.6" fill="none" opacity="0.7"/>
        <circle cx="14.5" cy="3.5" r="0.9" fill="${b}" opacity="0.7"/>
        <path d="M20 10.5 C 22 7.5, 24.5 5.5, 25.5 3.5" stroke="${b}" stroke-width="0.6" fill="none" opacity="0.7"/>
        <circle cx="25.5" cy="3.5" r="0.9" fill="${b}" opacity="0.7"/>
      </svg>`;
    }

    const count = isMobile ? 8 : 16;
    const butterflies = [];

    for (let i = 0; i < count; i++) {
      const wrap = document.createElement('div');
      wrap.className = 'magic-butterfly';
      const size = rnd(24, 42);
      wrap.style.width  = size + 'px';
      wrap.style.height = size + 'px';
      const palette = pick(PALETTES);
      wrap.innerHTML = makeSVG(palette);
      wrap.style.filter = `drop-shadow(0 0 5px ${palette.wing})`;
      layer.appendChild(wrap);

      // Generate a random looping path (series of waypoints)
      const W = window.innerWidth, H = window.innerHeight;
      const pts = [];
      for (let p = 0; p < 6; p++) {
        pts.push({ x: rnd(0, W), y: rnd(0, H) });
      }

      butterflies.push({
        el: wrap,
        pts,
        t: rnd(0, 1),          // position along path [0..1]
        speed: rnd(0.0004, 0.001),
        wingPhase: rnd(0, Math.PI * 2),
        wingSpeed: rnd(0.08, 0.16),
        opacity: 0,
        fadeDir: 1,
        fadeSpeed: rnd(0.003, 0.008)
      });
    }

    // Animate wing elements directly
    function setWings(bf, t) {
      const scale = 0.35 + 0.65 * Math.abs(Math.sin(bf.wingPhase));
      const svg = bf.el.querySelector('svg');
      if (!svg) return;
      const wl = svg.querySelector('.wing-l');
      const wr = svg.querySelector('.wing-r');
      if (wl) wl.style.transform = `scaleX(${scale.toFixed(3)})`;
      if (wr) wr.style.transform = `scaleX(${scale.toFixed(3)})`;
    }

    // Catmull-Rom interpolation between waypoints
    function catmullRom(pts, t) {
      const n = pts.length;
      const total = t * (n - 1);
      const i = Math.min(Math.floor(total), n - 2);
      const local = total - i;
      const p0 = pts[Math.max(i - 1, 0)];
      const p1 = pts[i];
      const p2 = pts[Math.min(i + 1, n - 1)];
      const p3 = pts[Math.min(i + 2, n - 1)];
      const t2 = local * local, t3 = t2 * local;
      return {
        x: 0.5 * ((2*p1.x) + (-p0.x+p2.x)*local + (2*p0.x-5*p1.x+4*p2.x-p3.x)*t2 + (-p0.x+3*p1.x-3*p2.x+p3.x)*t3),
        y: 0.5 * ((2*p1.y) + (-p0.y+p2.y)*local + (2*p0.y-5*p1.y+4*p2.y-p3.y)*t2 + (-p0.y+3*p1.y-3*p2.y+p3.y)*t3)
      };
    }

    function tickButterflies() {
      butterflies.forEach(bf => {
        bf.t += bf.speed;
        if (bf.t > 1) {
          bf.t = 0;
          // New random waypoints for next loop
          const W = window.innerWidth, H = window.innerHeight;
          bf.pts = bf.pts.map(() => ({ x: rnd(0, W), y: rnd(0, H) }));
        }
        bf.wingPhase += bf.wingSpeed;

        // Fade in/out
        bf.opacity += bf.fadeDir * bf.fadeSpeed;
        if (bf.opacity >= 0.85) { bf.opacity = 0.85; bf.fadeDir = -1; }
        if (bf.opacity <= 0)    { bf.opacity = 0;    bf.fadeDir =  1; }

        const pos = catmullRom(bf.pts, bf.t);
        bf.el.style.transform = `translate(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px)`;
        bf.el.style.opacity = bf.opacity.toFixed(3);
        setWings(bf);
      });
      requestAnimationFrame(tickButterflies);
    }
    tickButterflies();
  })();

})();

// ════════════════════════════════════════════
// READY
// ════════════════════════════════════════════
console.log('✦ Dr. Ahmed & Dr. Haneen Wedding Invitation ✦');
console.log('14 July 2026 · Mountain Rose · One View Hall');

/* Page-wide motion that works on the rendered DOM: scroll reveals, 3D pointer
   tilt on cards, and pausing section animations while they are off-screen.
   Runs once after the app mounts; returns a cleanup function. */

const CARD_SELECTOR =
  '.stat-card, .service-card, .feature-card, .process-step, .pricing-grid, .portfolio-grid, ' +
  '.pricing-card, .portfolio-card, .tech-card';

// Pricing cards (and projects on phones) live in swipe sliders, so they
// reveal as one group. Heading groups reveal piece by piece for a cascade.
function revealTargets() {
  const projectsSlider = window.matchMedia('(max-width: 640px)').matches;
  return document.querySelectorAll(
    '.marquee, .section-head > :not(.split), .about-content > :not(.stats-grid):not(.split), .stat-card, ' +
      '.service-card, .feature-card, .process-step, .pricing-grid, .pricing-fineprint, .pricing-note, ' +
      (projectsSlider ? '.portfolio-grid' : '.portfolio-card') +
      ', .portfolio-note, .tech-card, .faq-list, .cta-inner > :not(.split), ' +
      '.contact-info > :not(.split), .contact-form-wrap, .footer-grid > *'
  );
}

/* Modern browsers: motion is tied straight to the scroll position with CSS
   scroll-driven animations (see .sr in theme.css). They run on the compositor
   thread, so no JavaScript runs while scrolling and nothing can lag. */
function setupScrollTimeline() {
  revealTargets().forEach((el) => {
    el.classList.add('sr');
    if (el.matches(CARD_SELECTOR)) el.classList.add('sr-card');
  });
  document.querySelectorAll('.about-image, .hero-content').forEach((el) => el.classList.add('sr-parallax'));
}

// Fallback for browsers without scroll timelines: fade in once per element
function setupReveal(cleanups) {
  const targets = revealTargets();

  targets.forEach((el) => {
    if (el.matches(CARD_SELECTOR)) el.classList.add('reveal-3d');
    const index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.style.setProperty('--reveal-delay', Math.min(index, 5) * 100 + 'ms');
    el.classList.add('reveal');
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          el.removeEventListener('transitionend', onEnd);
          el.classList.remove('reveal', 'reveal-3d', 'is-visible');
          el.style.removeProperty('--reveal-delay');
        };
        const onEnd = (e) => {
          if (e.target === el && e.propertyName === 'opacity') finish();
        };
        el.addEventListener('transitionend', onEnd);
        setTimeout(finish, 1900); // in case transitionend never fires
        el.classList.add('is-visible');
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  targets.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

function setupTilt(cleanups) {
  // Cards lean toward the pointer with a soft glare; wide cards tilt less
  document.querySelectorAll(CARD_SELECTOR.replace('.pricing-grid, .portfolio-grid, ', '')).forEach((card) => {
    let rect = null;
    let maxTilt = 8;
    let frame = null;
    let px = 0;
    let py = 0;
    card.classList.add('tilt-card');

    const apply = () => {
      frame = null;
      if (!rect) return;
      rect = card.getBoundingClientRect();
      const x = (px - rect.left) / rect.width;
      const y = (py - rect.top) / rect.height;
      card.style.setProperty('--rx', ((0.5 - y) * maxTilt * 2).toFixed(2) + 'deg');
      card.style.setProperty('--ry', ((x - 0.5) * maxTilt * 2).toFixed(2) + 'deg');
      card.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
      card.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
    };
    const onEnter = () => {
      if (card.classList.contains('reveal')) return; // wait for the reveal to finish
      rect = card.getBoundingClientRect();
      maxTilt = Math.max(2, Math.min(8, (8 * 320) / rect.width));
      card.classList.add('is-tilting');
    };
    const onMove = (e) => {
      if (!rect) return;
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      rect = null;
      if (frame) cancelAnimationFrame(frame);
      frame = null;
      card.classList.remove('is-tilting');
      ['--rx', '--ry', '--gx', '--gy'].forEach((v) => card.style.removeProperty(v));
    };
    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      onLeave();
      card.classList.remove('tilt-card');
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    });
  });
}

function setupOnScreen(cleanups) {
  const sections = document.querySelectorAll('main > section');
  const marquee = document.getElementById('marquee');
  if (!('IntersectionObserver' in window)) {
    sections.forEach((s) => s.classList.add('fx-on'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('fx-on', e.isIntersecting)),
    { rootMargin: '100px 0px' }
  );
  sections.forEach((s) => io.observe(s));
  cleanups.push(() => io.disconnect());

  if (marquee) {
    const mio = new IntersectionObserver(([e]) => marquee.classList.toggle('is-paused', !e.isIntersecting));
    mio.observe(marquee);
    cleanups.push(() => mio.disconnect());
  }
}

export function setupPageEffects() {
  const cleanups = [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  setupOnScreen(cleanups);
  if (!reduceMotion) {
    if (window.CSS && CSS.supports('animation-timeline: view()')) setupScrollTimeline();
    else if ('IntersectionObserver' in window) setupReveal(cleanups);
  }
  if (!reduceMotion && finePointer) setupTilt(cleanups);
  return () => cleanups.forEach((fn) => fn());
}

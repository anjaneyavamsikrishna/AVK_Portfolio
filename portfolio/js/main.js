(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Theme toggle (remembers choice)
  const root = document.documentElement;
  try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
  if (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';
  $('#theme').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // Scroll progress bar + sticky nav style
  const bar = $('#progress'), nav = $('#nav');
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    nav.classList.toggle('scrolled', scrollY > 20);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Typing role text – edit this list
  const roles = ['AI/ML Engineer'];
  const el = $('#role');
  if (reduce) { el.textContent = roles[0]; }
  else {
    let r = 0, c = 0, del = false;
    (function tick() {
      const word = roles[r];
      el.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
      if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 40 : 85);
    })();
  }

  // Scroll reveal + count-up numbers
  $$('.chips li').forEach((li, i) => li.style.setProperty('--i', i));
  const count = n => {
    const to = +n.dataset.count;
    if (reduce) { n.textContent = to; return; }
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 1400, 1);
      n.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    $$('[data-count]', e.target).forEach(count);
    const t = e.target; setTimeout(() => { t.style.transitionDelay = ''; }, 1400);
    io.unobserve(e.target);
  }), { threshold: .15 });
  $$('.reveal').forEach((n, i) => { n.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(n); });

  // Cursor glow on project cards
  $$('.project').forEach(card => card.addEventListener('pointermove', e => {
    const b = card.getBoundingClientRect();
    card.style.setProperty('--x', e.clientX - b.left + 'px');
    card.style.setProperty('--y', e.clientY - b.top + 'px');
  }));

  // Highlight active nav link
  const links = $$('nav a');
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('section[id]').forEach(s => so.observe(s));
})();

/* Join popup: opens once per browser session after the visitor scrolls ~35% down the page.
   Closes with the X button, "Maybe later", the backdrop or the Escape key. Keeps focus inside while open. */
(() => {
  const pop = document.getElementById('join-pop');
  if (!pop) return;
  const SEEN_KEY = 'rrs-join-popup-seen';
  try { if (sessionStorage.getItem(SEEN_KEY)) return; } catch (e) { /* storage unavailable: still work */ }

  const card = pop.querySelector('.join-pop-card');
  const closeBtn = pop.querySelector('.join-pop-close');
  let opened = false, lastFocus = null, hideTimer = null;

  function open() {
    if (opened) return;
    opened = true;
    window.removeEventListener('scroll', onScroll);
    lastFocus = document.activeElement;
    clearTimeout(hideTimer);
    pop.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => pop.classList.add('is-open')));
    closeBtn.focus({ preventScroll: true });
  }

  function close() {
    if (!opened) return;
    pop.classList.remove('is-open');
    document.body.style.overflow = '';
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* ignore */ }
    hideTimer = setTimeout(() => { pop.hidden = true; }, 550);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true });
  }

  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0 && window.scrollY / max >= 0.35) setTimeout(open, 700);
  }

  pop.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));

  document.addEventListener('keydown', e => {
    if (!opened || pop.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') {
      const items = [...card.querySelectorAll('a[href], button:not([disabled])')];
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

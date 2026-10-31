/* Reveal icons once as they enter view; leave them visible without JS or motion. */
(()=>{
  const selectors = [
    '.logo-icon img', '.racing-value-icon img', '.our-values .value-icon img',
    '.experience-icon img', 'svg:not(.svg-defs)', '.experience-card a span',
    '.text-button span', '.enquiry-submit span', '.footer-invite a span', '.collage-badge span'
  ];
  const icons = [...document.querySelectorAll(selectors.join(','))];
  icons.forEach((icon, i) => { icon.classList.add('icon-motion'); icon.style.setProperty('--icon-delay', `${(i % 4) * 55}ms`); });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('icon-revealed'); observer.unobserve(entry.target); }
    });
  }, {threshold: .15});
  icons.forEach(icon => observer.observe(icon));
})();

/* Progressive enhancement: content remains visible if JS or IntersectionObserver is unavailable. */
(()=>{
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const logos = [...document.querySelectorAll('.header-outer .logo')];
  function sizeLogo(){
    logos.forEach(logo=>{
      const mark=logo.querySelector('.logo-icon'), word=logo.querySelector('span:last-child');
      if (!mark || !word || !logo.getClientRects().length) return;
      const travel=Math.max(0, logo.getBoundingClientRect().width-mark.getBoundingClientRect().width);
      logo.style.setProperty('--logo-run', travel+'px');
    });
  }
  sizeLogo();
  window.addEventListener('resize', sizeLogo, {passive:true});
  window.addEventListener('hashchange', ()=>requestAnimationFrame(sizeLogo));
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(sizeLogo);
  if(motion.matches || !('IntersectionObserver' in window)) return;
  const blocks=[...document.querySelectorAll('main > section > .wrap, .site-footer > .wrap')];
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('section-in-view');observer.unobserve(entry.target);}
    });
  },{rootMargin:'0px 0px -35px 0px',threshold:0});
  blocks.forEach(block=>{block.classList.add('section-reveal');observer.observe(block);});
})();

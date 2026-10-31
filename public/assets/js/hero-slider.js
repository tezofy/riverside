/* Five-slide hero: keyboard-operable controls with a pause option. */
(()=>{
 const hero=document.querySelector('.new-home-hero');
 if(!hero)return;
 const slides=Array.from(hero.querySelectorAll('.hero-slide'));
 const dots=Array.from(hero.querySelectorAll('.hero-dot'));
 const pause=hero.querySelector('.hero-pause');
 if(slides.length!==5||dots.length!==5||!pause)return;
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,paused=motion.matches,hovered=false,focused=false;
 function paint(){slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===current));dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current)));pause.textContent=paused?'Play':'Pause';pause.setAttribute('aria-label',paused?'Play automatic slideshow':'Pause automatic slideshow')}
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>{current=i;paint()}));
 pause.addEventListener('click',()=>{paused=!paused;paint()});
 hero.addEventListener('mouseenter',()=>{hovered=true});hero.addEventListener('mouseleave',()=>{hovered=false});
 hero.addEventListener('focusin',()=>{focused=true});hero.addEventListener('focusout',event=>{if(!hero.contains(event.relatedTarget))focused=false});
 setInterval(()=>{if(!paused&&!hovered&&!focused&&!document.hidden&&hero.getClientRects().length){current=(current+1)%slides.length;paint()}},6000);
 paint();
})();

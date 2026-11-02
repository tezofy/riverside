/* ABOUT RIVERSIDE collage — images change at random from time to time.
   The original horse photo stays in the rotation. */
(function () {
  var section = document.querySelector('.collage-section');
  if (!section) return;
  var slots = {
    tall: section.querySelector('img.collage-tall'),
    top: section.querySelector('img.collage-top'),
    bottom: section.querySelector('img.collage-bottom')
  };
  if (!slots.tall || !slots.top || !slots.bottom) return;

  var pools = {
    tall: [
      'assets/images/about-riverside-hero.webp',
      'assets/images/story-main-horse.jpg'          // original horse photo
    ],
    top: [
      'assets/images/grandstand.jpg',
      'assets/images/card-race-2.jpg',
      'assets/images/racecourse.jpg'
    ],
    bottom: [
      'assets/images/card-race-2.jpg',
      'assets/images/grandstand.jpg',
      'assets/images/racecourse.jpg'
    ]
  };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function srcOf(img) { return img.getAttribute('src'); }
  function shownSrcs() { return Object.keys(slots).map(function (k) { return srcOf(slots[k]); }); }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

  function swap(slotName, nextSrc) {
    var img = slots[slotName];
    var pre = new Image();
    pre.onload = function () {
      if (reduceMotion) { img.setAttribute('src', nextSrc); return; }
      img.style.transition = 'opacity .6s ease';
      img.style.opacity = '0';
      setTimeout(function () {
        img.setAttribute('src', nextSrc);
        img.style.opacity = '1';
      }, 620);
    };
    pre.src = nextSrc;
  }

  // one random change: random slot, random image not already on screen
  function randomChange() {
    if (document.hidden) return;
    var names = Object.keys(slots);
    var slot = pick(names);
    var now = shownSrcs();
    var options = pools[slot].filter(function (s) { return now.indexOf(s) === -1 && s !== srcOf(slots[slot]); });
    if (!options.length) options = pools[slot].filter(function (s) { return s !== srcOf(slots[slot]); });
    if (!options.length) return;
    swap(slot, pick(options));
  }

  // random starting picture for the tall slot (hero or original horse)
  var first = pick(pools.tall);
  if (first !== srcOf(slots.tall)) swap('tall', first);

  function schedule() {
    setTimeout(function () { randomChange(); schedule(); }, 12000 + Math.random() * 8000);
  }
  schedule();
})();

/* Builds a seamless, endlessly scrolling ticker from the trust band under the hero.
   Editors change the four items once in the HTML; this script duplicates them.
   Copies are hidden from screen readers (aria-hidden) so the content is read once. */
(function () {
  'use strict';
  var panel = document.querySelector('.racing-values-panel');
  if (!panel || !window.matchMedia) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SPEED = 55; /* pixels per second */
  var items = Array.prototype.slice.call(panel.children);
  if (!items.length) return;

  var track = document.createElement('div');
  track.className = 'rv-track';
  var set = document.createElement('div');
  set.className = 'rv-set';
  items.forEach(function (el) { set.appendChild(el); });
  track.appendChild(set); /* in the DOM so it can be measured */
  panel.appendChild(track);
  panel.classList.add('is-marquee');

  function copyOf(src) {
    var c = src.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    c.querySelectorAll('[id]').forEach(function (el) { el.removeAttribute('id'); });
    return c;
  }

  function build() {
    var setW = set.getBoundingClientRect().width;
    if (!setW) return;
    /* k sets fill one half of the track; the panel is always covered */
    var k = Math.max(1, Math.ceil(panel.clientWidth / setW));

    track.innerHTML = '';
    var halfA = document.createElement('div');
    var halfB = document.createElement('div');
    halfA.className = 'rv-half';
    halfB.className = 'rv-half';
    halfB.setAttribute('aria-hidden', 'true');

    halfA.appendChild(set);
    for (var i = 1; i < k; i++) halfA.appendChild(copyOf(set));
    for (var j = 0; j < k; j++) halfB.appendChild(copyOf(set));

    track.appendChild(halfA);
    track.appendChild(halfB);
    track.style.setProperty('--rv-duration', ((k * setW) / SPEED).toFixed(2) + 's');
  }

  var timer;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(build, 150);
  });
  build();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
})();

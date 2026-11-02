/* Home page: highlight "Our horses" / "The experience" in the nav while that section is in view. */
(function () {
  var nav = document.getElementById('navigation');
  if (!nav) return;
  var home = nav.querySelector('a[href="index.html"]');
  var items = ['horses', 'experience'].map(function (id) {
    return { el: document.getElementById(id), link: nav.querySelector('a[href="#' + id + '"]') };
  }).filter(function (it) { return it.el && it.link; });
  var ticking = false;

  function setActive(link) {
    nav.querySelectorAll('a.active').forEach(function (a) { a.classList.remove('active'); });
    if (link) link.classList.add('active');
  }

  function update() {
    ticking = false;
    var line = window.innerHeight * 0.4, current = null;
    items.forEach(function (it) {
      var r = it.el.getBoundingClientRect();
      if (r.top <= line) current = it;
    });
    setActive(current ? current.link : home);
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

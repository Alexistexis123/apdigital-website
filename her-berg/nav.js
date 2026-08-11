/* Her-berg: compact mobiel menu. Bouwt de hamburger-knop en het uitklappaneel,
   zodat de header op mobiel laag blijft tijdens het scrollen. */
(function () {
  var header = document.querySelector('.site-header');
  var inner = header && header.querySelector('.header-inner');
  var nav = header && header.querySelector('.site-nav');
  if (!header || !inner || !nav) { return; }

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Open menu' : 'Menu openen');
  btn.innerHTML = '<span></span><span></span><span></span>';
  inner.insertBefore(btn, nav);

  var close = function () {
    header.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', function () {
    var open = header.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) { close(); }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) { close(); }
  });
})();

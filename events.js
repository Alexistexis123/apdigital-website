// AP Digital - conversion event tracking
// Stuurt key user actions naar Vercel Analytics
(function () {
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

  function track(name, props) {
    try { window.va('event', { name: name, data: props || {} }); } catch (e) {}
  }

  function pagePath() { return window.location.pathname; }

  // 1. WhatsApp click
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="wa.me"]');
    if (link) {
      var location = link.closest('nav') ? 'nav' : (link.closest('section')?.id || 'body');
      track('whatsapp_click', { location: location, page: pagePath() });
    }
  }, { passive: true });

  // 2. Email click (mailto:)
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="mailto:"]');
    if (link) track('email_click', { page: pagePath() });
  }, { passive: true });

  // 3. Phone click (tel:)
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="tel:"]');
    if (link) track('tel_click', { page: pagePath() });
  }, { passive: true });

  // 4. CTA: elke click op contact-link
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="contact"]');
    if (!link) return;
    var location = link.closest('nav') ? 'nav' : 'body';
    track('cta_click', {
      label: (link.textContent || '').trim().slice(0, 60),
      location: location,
      page: pagePath()
    });
  }, { passive: true });

  // 5. Pakket card click (pakketten.html)
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.pkg');
    if (card && !e.target.closest('a')) {
      var name = card.querySelector('.pkg-name')?.textContent?.trim() || 'unknown';
      track('pakket_card_click', { pakket: name });
    }
  }, { passive: true });

  // 6. Service card click (diensten.html)
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.svc-card');
    if (card && !e.target.closest('a')) {
      var name = card.querySelector('h3')?.textContent?.trim() || 'unknown';
      track('svc_card_click', { service: name });
    }
  }, { passive: true });

  // 7. FAQ open
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        var q = item.querySelector('summary')?.textContent?.trim() || 'unknown';
        track('faq_open', { question: q });
      }
    });
  });

  // 8. Abo (onderhoud) card CTA
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.abo-card');
    if (card && e.target.closest('.flip-cta')) {
      var name = card.querySelector('.abo-name')?.textContent?.trim() || 'unknown';
      track('abo_click', { abo: name });
    }
  }, { passive: true });

  // 9. Portfolio card click (homepage hero carousel)
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.hc-card');
    if (card) {
      var name = card.querySelector('h3')?.textContent?.trim() || 'unknown';
      track('portfolio_click', { project: name, page: pagePath() });
    }
  }, { passive: true });

  // 10. Specialisatie pill click (homepage)
  document.addEventListener('click', function (e) {
    var link = e.target.closest('.specialisaties-list a');
    if (link) {
      track('specialisatie_click', {
        label: (link.textContent || '').trim(),
        href: link.getAttribute('href') || ''
      });
    }
  }, { passive: true });

  // 11. Contact form submit (succesvolle)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function () {
      var observer = new MutationObserver(function () {
        var success = document.getElementById('formSuccess');
        if (success && getComputedStyle(success).display !== 'none') {
          var dienst = document.getElementById('looking_for')?.value || 'unknown';
          var urlPakket = new URLSearchParams(window.location.search).get('pakket') || '';
          var urlAbo = new URLSearchParams(window.location.search).get('abo') || '';
          track('form_submit', {
            dienst_interesse: dienst,
            pakket_van_url: urlPakket,
            abo_van_url: urlAbo
          });
          observer.disconnect();
        }
      });
      observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
      setTimeout(function () { observer.disconnect(); }, 10000);
    });
  }

  // 12. Scroll depth (50% en 90%)
  var scrollPoints = { 50: false, 90: false };
  window.addEventListener('scroll', function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    var pct = Math.round((window.scrollY / max) * 100);
    Object.keys(scrollPoints).forEach(function (p) {
      if (!scrollPoints[p] && pct >= p) {
        scrollPoints[p] = true;
        track('scroll_depth', { depth: p + '%', page: pagePath() });
      }
    });
  }, { passive: true });
})();

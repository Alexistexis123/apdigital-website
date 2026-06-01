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

  // 13. Floating WhatsApp-knop (alle paginas, laagdrempelig contact)
  (function () {
    if (document.getElementById('waFloat')) return;
    var msg = encodeURIComponent('Hoi AP Digital, ik heb een vraag.');
    var a = document.createElement('a');
    a.id = 'waFloat';
    a.href = 'https://wa.me/31614160265?text=' + msg;
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Stuur ons een WhatsApp-bericht');
    a.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.728-.979a9.836 9.836 0 003.749 1.272zm5.43-6.62c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
    a.addEventListener('click', function () { track('whatsapp_float_click', { page: pagePath() }); });
    document.body.appendChild(a);
    var style = document.createElement('style');
    style.textContent = '#waFloat{position:fixed;right:20px;bottom:20px;z-index:9999;width:56px;height:56px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,0,0,.35);transition:transform .2s ease,box-shadow .2s ease;}#waFloat:hover{transform:scale(1.08);box-shadow:0 8px 26px rgba(0,0,0,.45);}@media(max-width:600px){#waFloat{right:16px;bottom:16px;width:52px;height:52px;}}';
    document.head.appendChild(style);
  })();
})();

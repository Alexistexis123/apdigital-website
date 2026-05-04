// AP Digital - conversion event tracking
// Stuurt key user actions naar Vercel Analytics
(function () {
  // Vercel Analytics queue (geladen via /_vercel/insights/script.js)
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

  function track(name, props) {
    try { window.va('event', { name: name, data: props || {} }); } catch (e) {}
  }

  // 1. WhatsApp click tracking
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="wa.me"]');
    if (link) {
      var location = link.closest('section')?.id || link.closest('nav') ? 'nav' : 'page';
      track('whatsapp_click', { location: location, page: window.location.pathname });
    }
  }, { passive: true });

  // 2. Email click tracking (mailto:)
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="mailto:"]');
    if (link) track('email_click', { page: window.location.pathname });
  }, { passive: true });

  // 3. CTA: "Vraag offerte aan" tracking
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="contact"]');
    if (!link) return;
    var text = (link.textContent || '').trim().toLowerCase();
    if (text.indexOf('offerte') > -1 || text.indexOf('praat') > -1 || text.indexOf('kies') > -1) {
      track('cta_click', { label: link.textContent.trim(), page: window.location.pathname });
    }
  }, { passive: true });

  // 4. Pakket card flip
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.pkg');
    if (card && !e.target.closest('.flip-close, a')) {
      var name = card.querySelector('.pkg-name')?.textContent?.trim() || 'unknown';
      track('pakket_flip', { pakket: name });
    }
  }, { passive: true });

  // 5. Service card flip
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.service-card');
    if (card && !e.target.closest('.flip-close, a')) {
      var name = card.querySelector('h3')?.textContent?.trim() || 'unknown';
      track('service_flip', { service: name });
    }
  }, { passive: true });

  // 6. FAQ open
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        var q = item.querySelector('summary')?.textContent?.trim() || 'unknown';
        track('faq_open', { question: q });
      }
    });
  });

  // 7. Abo card click
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.abo-card');
    if (card && e.target.closest('.flip-cta')) {
      var name = card.querySelector('.abo-name')?.textContent?.trim() || 'unknown';
      track('abo_click', { abo: name });
    }
  }, { passive: true });

  // 8. Contact form submit (succesvolle)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function () {
      // Wacht tot daadwerkelijke submit success (form-success class wordt zichtbaar)
      var observer = new MutationObserver(function () {
        var success = document.getElementById('formSuccess');
        if (success && getComputedStyle(success).display !== 'none') {
          var pkg = document.getElementById('package')?.value || 'unknown';
          track('form_submit', { pakket_interesse: pkg });
          observer.disconnect();
        }
      });
      observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
      // Stop observer na 10 sec voor zekerheid
      setTimeout(function () { observer.disconnect(); }, 10000);
    });
  }

  // 9. Scroll depth (50% en 90%)
  var scrollPoints = { 50: false, 90: false };
  window.addEventListener('scroll', function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = Math.round((window.scrollY / max) * 100);
    Object.keys(scrollPoints).forEach(function (p) {
      if (!scrollPoints[p] && pct >= p) {
        scrollPoints[p] = true;
        track('scroll_depth', { depth: p + '%', page: window.location.pathname });
      }
    });
  }, { passive: true });
})();

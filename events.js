// AP Digital - conversion event tracking
// Stuurt key user actions naar Vercel Analytics

// ===== Google Ads + Consent Mode v2 + cookiebanner =====
// Vul GADS_ID + labels in zodra het Ads-account en de conversieacties bestaan.
// Zolang GADS_ID leeg is verandert er NIETS: geen tag, geen cookies, geen banner.
(function () {
  var GADS_ID = 'AW-18207337778';      // Google-tag ID account AP Digital (102-869-9452)
  var GA4_ID = 'G-K7ZLJ842BM';         // GA4 meet-ID property apdigital.nl
  var LEAD_LABEL = 'DOggCKue-rccELLa9-1D';   // conversielabel "Leadformulier indienen"
  var PHONE_LABEL = 'XGZVCLq_6rscELLa9-1D';  // conversielabel "Telefoonklik"
  var EMAIL_LABEL = 'AaYbCL2_6rscELLa9-1D';  // conversielabel "E-mailklik"
  var WA_LABEL = 'AiiACP-Y7LscELLa9-1D';     // conversielabel "WhatsApp-klik"

  // Geen ID = niets doen. apAdsConversion blijft een veilige no-op.
  if (!GADS_ID) { window.apAdsConversion = function () {}; return; }

  // Alleen op de echte productie-host meten. Zo vuurt de tag niet op Vercel-
  // preview-URL's, localhost of Electron-webviews (anders meldt GA4 "extra
  // domeinen" en vervuilt intern/preview-verkeer je cijfers).
  if (location.hostname.indexOf('apdigital.nl') === -1) {
    window.apAdsConversion = function () {};
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  // Consent Mode v2, regionaal. Binnen de EEA (+ VK/Zwitserland) standaard alles
  // geweigerd tot toestemming (AVG-plicht). Daarbuiten standaard toegestaan, anders
  // telt Google daar 100% als "denied" en meet je niets (GA4-tagdiagnose-melding).
  var EEA = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT',
    'LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'];
  // Globale default = toegestaan (geldt buiten de EEA-regio's hieronder).
  gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  });
  // Regio-specifieke default = geweigerd tot toestemming (EEA + VK/CH).
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
    region: EEA
  });
  gtag('set', 'url_passthrough', true);
  gtag('set', 'ads_data_redaction', true);

  function loadGtag() {
    if (!document.getElementById('gtag-js')) {
      var s = document.createElement('script');
      s.id = 'gtag-js';
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GADS_ID;
      document.head.appendChild(s);
      gtag('js', new Date());
      gtag('config', GADS_ID);
      if (GA4_ID) gtag('config', GA4_ID);
    }
  }

  function grantConsent() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
    loadGtag();
  }

  // Laad de Google-tag ALTIJD (consent standaard denied) zodat Google de tag detecteert
  // en cookieless conversion modeling werkt; echte cookies pas na toestemming.
  loadGtag();
  var choice = null;
  try { choice = localStorage.getItem('ap_consent'); } catch (e) {}
  if (choice === 'granted') grantConsent();

  // Conversie afvuren (alleen als er een label is). Wordt aangeroepen vanuit events hieronder.
  window.apAdsConversion = function (type) {
    var labels = { whatsapp: WA_LABEL, tel: PHONE_LABEL, email: EMAIL_LABEL, lead: LEAD_LABEL };
    var label = Object.prototype.hasOwnProperty.call(labels, type) ? labels[type] : LEAD_LABEL;
    if (window.gtag && label) gtag('event', 'conversion', { send_to: GADS_ID + '/' + label });
  };

  // Cookiebanner: alleen tonen als er nog geen keuze is gemaakt.
  if (!choice) {
    var build = function () {
      if (document.getElementById('ap-consent')) return;
      var st = document.createElement('style');
      st.textContent = '#ap-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;background:#0a1628;color:#e7eefb;border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:18px 20px;box-shadow:0 12px 40px rgba(0,0,0,.4);font:15px/1.5 system-ui,sans-serif;}#ap-consent p{margin:0 0 12px;}#ap-consent a{color:#f08a5d;}#ap-consent .ap-c-btns{display:flex;gap:10px;flex-wrap:wrap;}#ap-consent button{cursor:pointer;border:0;border-radius:10px;padding:10px 18px;font-weight:600;font-size:14px;}#ap-consent .ap-ok{background:#f08a5d;color:#0a1628;}#ap-consent .ap-no{background:transparent;color:#e7eefb;border:1px solid rgba(255,255,255,.25);}';
      document.head.appendChild(st);
      var bar = document.createElement('div');
      bar.id = 'ap-consent';
      bar.setAttribute('role', 'dialog');
      bar.setAttribute('aria-label', 'Cookietoestemming');
      bar.innerHTML = '<p>We gebruiken cookies om te meten welke advertenties aanvragen opleveren. Hulp nodig? Zie ons <a href="/privacy">privacybeleid</a>.</p><div class="ap-c-btns"><button class="ap-ok" data-c="ok">Accepteren</button><button class="ap-no" data-c="no">Alleen noodzakelijk</button></div>';
      document.body.appendChild(bar);
      bar.addEventListener('click', function (e) {
        var c = e.target.getAttribute('data-c');
        if (!c) return;
        try { localStorage.setItem('ap_consent', c === 'ok' ? 'granted' : 'denied'); } catch (e) {}
        if (c === 'ok') grantConsent();
        bar.remove();
      });
    };
    if (document.body) build();
    else document.addEventListener('DOMContentLoaded', build);
  }
})();

// AP Digital - conversion event tracking
// Stuurt key user actions naar Vercel Analytics
(function () {
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

  function track(name, props) {
    try { window.va('event', { name: name, data: props || {} }); } catch (e) {}
    try { if (typeof window.gtag === 'function') window.gtag('event', name, props || {}); } catch (e) {}
  }

  function pagePath() { return window.location.pathname; }

  // 1. WhatsApp click
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="wa.me"]');
    if (link) {
      var location = link.closest('nav') ? 'nav' : (link.closest('section')?.id || 'body');
      track('whatsapp_click', { location: location, page: pagePath() });
      if (window.apAdsConversion) window.apAdsConversion('whatsapp');
    }
  }, { passive: true });

  // 2. Email click (mailto:)
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="mailto:"]');
    if (link) {
      track('email_click', { page: pagePath() });
      if (window.apAdsConversion) window.apAdsConversion('email');
    }
  }, { passive: true });

  // 3. Phone click (tel:)
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="tel:"]');
    if (link) {
      track('tel_click', { page: pagePath() });
      if (window.apAdsConversion) window.apAdsConversion('tel');
    }
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
          if (window.apAdsConversion) window.apAdsConversion('lead');
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

  // 13. WhatsApp-knop in de nav, naast "Plan kennismaking" (alle paginas)
  (function () {
    if (document.getElementById('waNav')) return;
    var navCta = document.querySelector('.nav .nav-cta') || document.querySelector('.nav-cta');
    if (!navCta) return;
    var msg = encodeURIComponent('Hoi AP Digital, ik heb een vraag.');
    var wa = '<svg width="22" height="22" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.4-5-3.8-10.5-6.6z"/></svg>';
    var a = document.createElement('a');
    a.id = 'waNav';
    a.href = 'https://wa.me/31614160265?text=' + msg;
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Stuur ons een WhatsApp-bericht');
    a.innerHTML = wa;
    a.addEventListener('click', function () { track('whatsapp_nav_click', { page: pagePath() }); if (window.apAdsConversion) window.apAdsConversion('whatsapp'); });
    // groepeer WhatsApp + Plan kennismaking rechts, naast elkaar
    var grp = document.createElement('div');
    grp.id = 'navActions';
    navCta.parentNode.insertBefore(grp, navCta);
    grp.appendChild(a);
    grp.appendChild(navCta);
    var style = document.createElement('style');
    style.textContent = '#navActions{display:flex;align-items:center;gap:14px;}#waNav{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:12px;background:var(--accent);color:var(--bg-0);flex:0 0 auto;transition:transform .2s ease,box-shadow .2s ease;}#waNav:hover{transform:translateY(-1px);box-shadow:0 0 24px var(--accent-glow);}@media(max-width:860px){#waNav{display:none;}}';
    document.head.appendChild(style);
    // ook in mobiel menu
    var mob = document.getElementById('navMobile');
    if (mob && !document.getElementById('waMob')) {
      var m = document.createElement('a');
      m.id = 'waMob';
      m.href = a.href; m.target = '_blank'; m.rel = 'noopener';
      m.textContent = 'WhatsApp';
      m.addEventListener('click', function () { track('whatsapp_nav_click', { page: pagePath() }); });
      mob.appendChild(m);
    }
  })();
})();

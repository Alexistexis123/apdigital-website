// Generator apdigital.nl (herstart, bouw 11-2026). Draai vanuit de repo-root: node _bron/build.mjs
// - Nieuwe pagina's (home, portfolio, pijlers, over, contact, gratis concept, diensten, pakketten, 24 stadspagina's,
//   app-laten-maken-arnhem, 404) komen uit de templates hieronder, in de stijl van het goedgekeurde ontwerp.
// - Overige pagina's (blogs, sectorpagina's, cases, juridisch) houden hun inhoud uit _bron/oud/ en krijgen de nieuwe
//   kop, voet en stijl. Tekstfixes staan in FIXES.
// - Schrijft ook sitemap.xml. _bron/ zelf gaat niet mee naar Vercel (.vercelignore).
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { projecten, pijlers, verhalen, team } from './data.mjs'

const D = dirname(fileURLToPath(import.meta.url))
const ROOT = join(D, '..')
const OUD = join(D, 'oud')
const SITE = 'https://apdigital.nl'
const VANDAAG = process.env.BOUWDATUM || new Date().toISOString().slice(0, 10)
const V = '5' // cache-buster site.css / site.js
const VM = '1' // cache-buster home-motion.js (de css-versie staat in het script zelf)
const steden = JSON.parse(readFileSync(join(D, 'steden.json'), 'utf8'))
const oud = f => readFileSync(join(OUD, f), 'utf8')
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const kaal = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

const TEL = '06 1416 0265', TEL_HREF = 'tel:+31614160265', MAIL = 'info@apdigital.nl'
const WA = (t = 'Hoi AP Digital, ik heb een vraag.') => `https://wa.me/31614160265?text=${encodeURIComponent(t)}`
const P = { websites: '/websites-laten-maken', apps: '/apps-laten-maken', automatisering: '/processen-automatiseren' }
// Twee takken (go Alex 10-11-2026, ontwerp 09-11): tak 1 = vindbaar in Google en AI (maandpakket, websites zijn de basis),
// tak 2 = software en automatisering (apps + automatisering). De pijlerpagina's blijven bestaan als verdieping.
const T1 = '/vindbaar-in-google-en-ai', T2 = '/software-en-automatisering', CHECK = '/gratis-check'
const TAK_VAN = { websites: 't1', apps: 't2', automatisering: 't2' }

// Afmetingen van de schermen (tegen verspringen bij laden)
const MAAT = { d: [1200, 750], dl: [1440, 900], m: [390, 844], ml: [420, 909] }
const maat = f => {
  if (/postleads-dashboard/.test(f)) return [1440, 961]
  if (/urenapp/.test(f)) return [534, 526]
  if (/(casa5|florent|herbergen|jacobs|jmc|marketingfit|rhscooter)-d/.test(f)) return MAAT.d
  if (/(casa5|florent|herbergen|jacobs)-m/.test(f)) return MAAT.m
  if (/-m\.webp|baby|pt-/.test(f)) return MAAT.ml
  return MAAT.dl
}
const img = (f, alt, extra = '') => { const [w, h] = maat(f); return `<img src="/img/werk/${f}" alt="${esc(alt)}" width="${w}" height="${h}" decoding="async" loading="lazy"${extra} />` }

const ICO = {
  websites: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/></svg>',
  apps: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
  automatisering: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M4 17h6M14 7a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM10 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM16 17h4"/></svg>',
}

// ---------- JSON-LD ----------
const BEDRIJF = {
  '@type': 'LocalBusiness', '@id': `${SITE}/#business`, name: 'AP Digital', legalName: 'AP Digital',
  identifier: { '@type': 'PropertyValue', propertyID: 'KVK', value: '42080619' },
  url: `${SITE}/`, email: MAIL, telephone: '+31614160265', priceRange: '€€',
  address: { '@type': 'PostalAddress', addressLocality: 'Arnhem', addressCountry: 'NL' },
}
const ld = o => `<script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', ...o }, null, 2)}\n</script>`
const kruimelLd = items => ld({ '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ...items].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u })) })
const faqLd = faq => ld({ '@type': 'FAQPage', mainEntity: faq.map(([v, a]) => ({ '@type': 'Question', name: kaal(v), acceptedAnswer: { '@type': 'Answer', text: kaal(a) } })) })
const dienstLd = (naam, beschrijving, pad, extra = {}) => ld({ '@type': 'Service', name: naam, serviceType: naam, description: beschrijving, provider: { '@id': `${SITE}/#business` }, areaServed: { '@type': 'Country', name: 'Nederland' }, url: SITE + pad, ...extra })

// ---------- kop en voet ----------
function kop(actief) {
  const a = TAK_VAN[actief] || actief
  const l = (href, t, k) => `<a href="${href}"${a === k ? ' class="actief" aria-current="page"' : ''}>${t}</a>`
  return `<a class="skip-link" href="#main">Naar de inhoud</a>
<header class="kop"><div class="wrap">
  <a class="logo" href="/"><span class="blok">AP</span><span class="woord">AP Digital</span></a>
  <nav class="nav" id="nav" aria-label="Hoofdmenu">
    ${l(T1, 'Vindbaar in Google en AI', 't1')}
    ${l(T2, 'Software en automatisering', 't2')}
    ${l('/portfolio', 'Portfolio', 'portfolio')}
    ${l('/over', 'Over ons', 'over')}
    <a class="knop" href="${CHECK}"${a === 'check' ? ' aria-current="page"' : ''}>Gratis check</a>
  </nav>
  <button class="hamburger" id="hamburger" type="button" aria-label="Menu" aria-controls="nav" aria-expanded="false"><span></span><span></span><span></span></button>
</div></header>`
}

function voet() {
  return `<footer class="voet"><div class="wrap">
  <div class="kolommen">
    <div>
      <a class="logo" href="/"><span class="blok">AP</span><span class="woord">AP Digital</span></a>
      <div class="tagline"><span class="wit">Digitaal werk</span> dat gewoon werkt.</div>
      <p style="font-size:15px">Vindbaar in Google en AI, en software op maat. Gebouwd in Arnhem.</p>
    </div>
    <div><p class="kop4">Vindbaar in Google en AI</p><a href="${T1}#pakketten">Maandpakketten</a><a href="${CHECK}">Gratis check</a><a href="${P.websites}">Website laten maken</a><a href="/pakketten">Websitepakketten</a><a href="/website-redesign">Website vernieuwen</a><a href="/onderhoud-en-hosting">Onderhoud en hosting</a></div>
    <div><p class="kop4">Software en automatisering</p><a href="${T2}">Overzicht</a><a href="${P.apps}">Apps op maat</a><a href="${P.automatisering}">Processen automatiseren</a><a href="/app-laten-maken-arnhem">App laten maken in Arnhem</a></div>
    <div><p class="kop4">AP Digital</p><a href="/portfolio">Portfolio</a><a href="/over">Over ons</a><a href="/diensten">Diensten</a><a href="/blog">Blog</a><a href="/gratis-concept">Je gratis concept</a><a href="/contact">Contact</a><a href="mailto:${MAIL}">${MAIL}</a><a href="${TEL_HREF}">${TEL}</a><a href="${WA()}" target="_blank" rel="noopener">WhatsApp</a></div>
  </div>
  <div class="voet-steden"><p class="kop4">Website laten maken in</p><ul class="stad-lijst">${[...steden].sort((a, b) => a.naam.localeCompare(b.naam)).map(s => `<li><a href="/${s.slug}">${s.naam}</a></li>`).join('')}</ul></div>
  <div class="klein-tekst"><span>© 2026 AP Digital · KVK 42080619 · Arnhem</span><span><a href="/privacy" style="display:inline">Privacy</a> · <a href="/voorwaarden" style="display:inline">Voorwaarden</a></span></div>
</div></footer>
<div class="vast-cta"><a class="knop" href="${CHECK}">Gratis check</a><a class="knop-2" href="${TEL_HREF}" aria-label="Bel AP Digital">Bel</a></div>`
}

const METEN = `<script defer src="/site.js?v=${V}"></script>
<script defer src="/_vercel/insights/script.js"></script>
<script defer src="/_vercel/speed-insights/script.js"></script>
<script defer src="/events.js"></script>
<script>
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "wlzolill5t");
</script>`

function pagina({ pad, titel, beschrijving, actief = '', body, jsonld = [], og = {}, kopExtra = '', voetExtra = '', noindex = false, bodyKlasse = '' }) {
  const url = SITE + (pad === '/' ? '/' : pad)
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(titel)}</title>
<meta name="description" content="${esc(beschrijving)}" />
${noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`}
<meta property="og:title" content="${esc(og.titel || titel)}" />
<meta property="og:description" content="${esc(og.beschrijving || beschrijving)}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="${og.type || 'website'}" />
<meta property="og:locale" content="nl_NL" />
<meta property="og:site_name" content="AP Digital" />
<meta property="og:image" content="${SITE}/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="AP Digital, websites, apps en automatisering" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${SITE}/og-image.png" />
<meta name="theme-color" content="#0A0A0A" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preload" href="/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="/site.css?v=${V}" />
${jsonld.join('\n')}
${kopExtra}
<script>document.documentElement.classList.add('js')</script>
</head>
<body${bodyKlasse ? ` class="${bodyKlasse}"` : ''}>
${kop(actief)}
<main id="main" tabindex="-1">
${body}
</main>
${voet()}
${METEN}${voetExtra}
</body>
</html>
`
}

// ---------- bouwstenen ----------
function beeld(p, rustig = false) {
  if (p.beeld === 'telefoons') {
    return `<div class="beeld telefoons">${p.telefoons.map((f, i) => `<div class="tel tel-${i + 1}">${img(f, i === 0 ? p.alt : '')}</div>`).join('')}</div>`
  }
  if (p.beeld === 'telefoon') {
    return `<div class="beeld" style="display:grid;place-items:center;background:radial-gradient(closest-side,rgba(255,214,10,.12),#141414)"><div class="telefoon" style="width:44%;margin-top:26px;box-shadow:none">${img(p.img, p.alt, ' style="aspect-ratio:534/520"')}</div></div>`
  }
  const mini = p.mobiel && !rustig ? `<div class="mini">${img(p.mobiel, '')}</div>` : ''
  if (p.galerij && !rustig) {
    const beelden = p.galerij.map((g, i) => img(g[0], g[2], ` class="g-beeld${i ? '' : ' aan'}"`)).join('')
    const knoppen = p.galerij.map((g, i) => `<button type="button"${i ? '' : ' class="aan"'} data-i="${i}" aria-label="Toon scherm ${g[1]}">${g[1]}</button>`).join('')
    return `<div class="beeld galerij" data-galerij>${beelden}${mini}<div class="g-knoppen">${knoppen}</div></div>`
  }
  return `<div class="beeld">${img(p.img, p.alt)}${mini}</div>`
}

let kaartTeller = 0
function kaart(p, { rustig = false, klasse = '' } = {}) {
  const status = p.status ? `<span class="pil geel">${p.status}</span>` : ''
  const extern = p.url && /^https?:|^\/casa5/.test(p.url)
  const links = [
    p.url ? `<a class="link" href="${p.url}"${extern ? ' target="_blank" rel="noopener"' : ''}>${p.linktekst || 'Bekijk de site'} ↗</a>` : `<span class="link stil">${p.geenlink || 'Demo op aanvraag'}</span>`,
    p.caseUrl ? `<a class="link" href="${p.caseUrl}">Lees de case →</a>` : '',
  ].join('')
  const v = verhalen[p.id] || null
  const kl = `case${v ? ' verhaal-case' : ''}${klasse ? ' ' + klasse : ''}`
  if (!v) {
    return `<article class="${kl}" data-pijler="${p.pijler}" data-reveal>
  ${beeld(p, rustig)}
  <div class="tekst">
    <div class="meta"><span class="pil">${p.soort}</span>${status}</div>
    <h3>${p.titel}</h3>
    <p>${p.kort}</p>
    ${p.cijfer ? `<div class="bewijs klein-bewijs"><strong>${p.cijfer[0]}</strong><span>${p.cijfer[1]}</span></div>` : ''}
    <div class="gebouwd">${p.gebouwd.map(g => `<span>${g}</span>`).join('')}</div>
    <div class="links">${links}</div>
  </div>
</article>`
  }
  const vid = `v-${p.id}-${++kaartTeller}`
  const cijfer = v.cijfer ? `<div class="bewijs"><strong${/^[\d.]+$/.test(v.cijfer[0]) ? ` data-tel="${v.cijfer[0].replace(/\./g, '')}"` : ''}>${v.cijfer[0]}</strong><span>${v.cijfer[1]}</span></div>` : ''
  return `<article class="${kl}" data-pijler="${p.pijler}" data-reveal>
  ${beeld(p, rustig)}
  <div class="verhaal" id="${vid}">
    <div><small>01 · Het probleem</small><p>${v.probleem}</p></div>
    <div><small>02 · Wat we bouwden</small><p>${v.gebouwd}</p></div>
    <div><small>03 · Wat het opleverde</small><p>${v.opgeleverd}</p></div>
  </div>
  <div class="tekst">
    <div class="meta"><span class="pil">${p.soort}</span>${status}</div>
    <h3>${p.titel}</h3>
    <p>${p.kort}</p>
    ${cijfer}
    <button type="button" class="verhaal-knop" aria-expanded="false" aria-controls="${vid}"><span class="dicht">Lees het hele verhaal</span><span class="open">Verhaal sluiten</span></button>
    <div class="links">${links}</div>
  </div>
</article>`
}
const proj = id => projecten.find(p => p.id === id)
const perPijler = k => projecten.filter(p => p.pijler === k)
const uitgelicht = k => perPijler(k).filter(p => p.top)
const rest = k => perPijler(k).filter(p => !p.top)

const ctaBand = (titel = 'Benieuwd wat er bij jou <span class="serif">te winnen valt?</span>', tekst = 'In een kennismaking kijken we samen naar je site en je werkdag. Je hoort eerlijk wat zin heeft en wat niet.', href = '/contact') => `
<section class="sectie smal"><div class="wrap"><div class="cta-band">
  <div><h2>${titel}</h2><p>${tekst}</p></div>
  <div class="acties"><a class="knop" href="${href}">Plan een gratis kennismaking</a><a class="tel" href="${TEL_HREF}">of bel ${TEL}</a></div>
</div></div></section>`

const stappen = `
<ol class="stappen">
  <li class="stap" data-reveal><div class="nr">01</div><h3>Jij vertelt waar het knelt</h3><p>Aan de telefoon of aan tafel. Wat kost je tijd, wat loopt vast, wat wil je anders.</p></li>
  <li class="stap" data-reveal><div class="nr">02</div><h3>Wij zeggen wat we zouden bouwen</h3><p>En wat we níet zouden doen. Soms is een betere site genoeg, soms is het een app.</p></li>
  <li class="stap" data-reveal><div class="nr">03</div><h3>Je krijgt het op papier</h3><p>Wat we bouwen, wanneer het af is en wat het kost. Pas na jouw ja beginnen we.</p></li>
  <li class="stap" data-reveal><div class="nr">04</div><h3>We bouwen, jij kijkt mee</h3><p>Je ziet tussendoor wat er staat. Daarna live, en we blijven bereikbaar.</p></li>
</ol>`

const faqBlok = (faq, kop = 'Veel gesteld') => `
<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Vragen</div><h2 style="margin-top:12px">${kop}</h2></div>
  <div class="faq">${faq.map(f => `<details class="faq-item"><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}</div>
</div></section>`

const STARTER = ['1 tot 3 pagina\'s', 'Template met je huisstijl', 'Mobiel geoptimaliseerd', 'Basis-SEO: titels, meta en sitemap', 'Contactformulier met spamfilter', 'Snelle laadtijd, 90+ op mobiel', 'Live binnen 7 dagen', '30 dagen bugfix-support']

// Formulier: ids en velden zoals events.js ze verwacht (contactForm, formSuccess, looking_for).
// check: true = formulier van /gratis-check (website + zoekterm, e-mail verplicht, eigen onderwerp en bedankregel).
function formulier({ knop = 'Plan mijn kennismaking', keuzes = true, stad = '', vraag = 'Je vraag in een paar zinnen', standaard = '', check = false } = {}) {
  const extra = check ? ' data-mail="verplicht" data-onderwerp="Aanvraag gratis check via AP Digital"' : ''
  const mailFout = check ? 'Vul je e-mailadres in, daar sturen we de check naartoe' : 'Vul een e-mailadres of telefoonnummer in'
  const bedankt = check
    ? '<h3>Aanvraag binnen. Bedankt!</h3><p>Je gratis check staat binnen 5 werkdagen in je mailbox.</p>'
    : '<h3>Verstuurd. Bedankt!</h3><p>We reageren binnen 1 werkdag, meestal sneller.</p>'
  return `<form class="form" id="contactForm" novalidate${extra}>
  <input type="hidden" id="pakket" name="pakket" value="" />
  <input type="hidden" id="abo" name="abo" value="" />
  ${stad ? `<input type="hidden" id="stad" name="stad" value="${stad}" />` : ''}
  <input type="hidden" id="looking_for" name="looking_for" value="${standaard}" />
  <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
  <div id="formFields" style="display:grid;gap:16px">
    <div class="rij2"><label class="veld">Naam<input id="name" name="name" autocomplete="name" required /><span class="veld-fout">Vul je naam in</span></label><label class="veld">Bedrijf<input id="company" name="company" autocomplete="organization" /></label></div>
    ${check ? '<label class="veld">Je website<input id="website" name="website" type="url" inputmode="url" autocomplete="url" placeholder="jouwbedrijf.nl" /></label>' : ''}
    <div class="rij2"><label class="veld">Telefoon<input id="phone" name="phone" type="tel" autocomplete="tel" /></label><label class="veld">E-mail<input id="email" name="email" type="email" autocomplete="email"${check ? ' required' : ''} /><span class="veld-fout">${mailFout}</span></label></div>
    ${keuzes ? `<div><span style="display:block;font-size:14px;color:var(--tekst);margin-bottom:8px">Waar gaat het over?</span>
      <div class="keuzes"><label><input type="checkbox" name="over" value="websites" />Website</label><label><input type="checkbox" name="over" value="apps" />App</label><label><input type="checkbox" name="over" value="automatisering" />Automatisering</label><label><input type="checkbox" name="over" value="weet-niet" />Weet ik nog niet</label></div></div>` : ''}
    ${check ? '<label class="veld">Waar wil je op gevonden worden?<input id="zoekterm" name="zoekterm" placeholder="bijv. loodgieter Velp" /></label>' : `<label class="veld">${vraag}<textarea id="message" name="message" rows="4"></textarea></label>`}
    <button class="knop" type="submit">${knop}</button>
    <p class="klein-tekst">We gebruiken je gegevens alleen om contact met je op te nemen. Zie ons <a class="tekst-link" href="/privacy">privacybeleid</a>.</p>
  </div>
  <div class="form-success" id="formSuccess" role="status"><div class="vink"></div>${bedankt}</div>
</form>`
}

const contactRegels = (waTekst) => `<div class="contact-regels">
  <a href="${TEL_HREF}"><small>Bellen</small>${TEL}</a>
  <a href="${WA(waTekst)}" target="_blank" rel="noopener"><small>WhatsApp</small>Stuur een bericht</a>
  <a href="mailto:${MAIL}"><small>Mail</small>${MAIL}</a>
</div>`

// ---------- HOME ----------
const machine = `
<div class="machine plan-in ingepland doc-in mail-in" id="machine" data-stap="0" role="img" aria-label="Voorbeeld met nepdata: een aanvraag komt binnen via de website, staat daarna in de planning en levert vanzelf een offerte en een mail op.">
  <div class="m-raam m-site" data-raam="1">
    <div class="m-balk"><i></i><i></i><i></i><span>jouwbedrijf.nl/offerte</span></div>
    <div class="m-inhoud">
      <div class="m-kop">Offerte aanvragen</div>
      <div class="m-veld"><small>Naam</small><span data-typ="M. de Vries">M. de Vries</span></div>
      <div class="m-veld"><small>Klus</small><span data-typ="Schilderwerk buiten">Schilderwerk buiten</span></div>
      <div class="m-veld m-veld-plaats"><small>Plaats</small><span data-typ="Velp">Velp</span></div>
      <div class="m-knop">Aanvraag versturen</div>
    </div>
  </div>
  <div class="m-draad vol" data-draad="1"><b></b></div>
  <div class="m-raam m-plan" data-raam="2">
    <div class="m-balk"><i></i><i></i><i></i><span>Planning · deze week</span></div>
    <div class="m-inhoud">
      <div class="m-week">
        <div><small>ma</small><i></i><i class="l"></i></div>
        <div><small>di</small><i class="l"></i></div>
        <div><small>wo</small><i></i><i></i></div>
        <div class="m-do"><small>do</small><i class="l"></i><b class="m-nieuw"><em>De Vries</em><span>Velp</span></b></div>
        <div><small>vr</small><i></i></div>
      </div>
      <div class="m-status"><span class="m-pil">Nieuwe aanvraag</span><span class="m-pil ok">Ingepland do 08:00</span></div>
    </div>
  </div>
  <div class="m-draad vol" data-draad="2"><b></b></div>
  <div class="m-raam m-offerte" data-raam="3">
    <div class="m-balk"><i></i><i></i><i></i><span>Offerte · automatisch</span></div>
    <div class="m-inhoud">
      <div class="m-doc">
        <div class="m-doc-kop"><span class="m-logo"></span><div><b>Offerte</b><small>M. de Vries · Velp</small></div></div>
        <i style="--w:86%"></i><i style="--w:64%"></i><i style="--w:74%"></i><i class="m-tot" style="--w:40%"></i>
      </div>
      <div class="m-mail"><span class="m-vink"></span><div><b>Mail verstuurd</b><small>Offerte staat in de inbox van M. de Vries</small></div></div>
    </div>
  </div>
</div>
<ol class="m-stappen" aria-hidden="true">
  <li class="aan" data-s="1"><b>01</b>Aanvraag via je website</li>
  <li class="aan" data-s="2"><b>02</b>Staat meteen in je planning</li>
  <li class="aan" data-s="3"><b>03</b>Offerte en mail gaan vanzelf de deur uit</li>
</ol>`

// Cijfers met bron (bron staat in het ontwerp en in de vault, niet op de site).
const cijfers = [
  ['100', 'van 100 voor de SEO-basis in Google Lighthouse, Flo-Rent en RH Scooter'],
  ['52', 'oude adressen van Flo-Rent netjes doorgestuurd, plek in Google behouden'],
  ['5', 'dagen van eerste gesprek tot live, voor de B&amp;B-site van Casa 5'],
  ['13.337', 'kaarten van de PostLeads-machine bij mensen op de mat, in 19 weken'],
]

// Reviews: zoals ze op 05-11-2026 op de live site stonden (5,0, 3 reviews). Vlak voor livegang opnieuw checken.
const REVIEWS = { score: '5,0', aantal: 3, items: [
  ['Topbedrijf! Vanaf de eerste stap tot en met de oplevering ben ik ontzettend goed geholpen. Alles werd duidelijk uitgelegd en er werd echt met mij meegedacht. Een ervaren en professionele man die goed luistert naar de wensen van de klant en deze perfect weet om te zetten in een prachtige website. Ik raad dit bedrijf dan ook aan iedereen aan. Bedankt voor onze topwebsite!', 'RH Scooter Service Arnhem'],
  ['Top ervaring met APDigital. Duidelijke communicatie, snel geschakeld en het resultaat mag er zijn: professioneel, snel en werkt perfect op desktop en mobiel. Er werd ook goed meegedacht, ze doen meer dan alleen uitvoeren. Aanrader voor iedereen die een betrouwbare partij zoekt voor een nieuwe website.', 'Laisser-faire'],
  ['Fantastische service!', 'Gijs R.'],
] }
const reviewsBlok = `
<section class="sectie smal" id="reviews"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Wat klanten zeggen</div><h2 style="margin-top:12px">Reviews op <span class="serif">Google.</span></h2></div><a class="knop-2" href="https://maps.google.com/?cid=7229055669262186351" target="_blank" rel="noopener">Bekijk ons Google-profiel ↗</a></div>
  <div class="reviews-top"><strong>${REVIEWS.score}</strong><span class="sterren" role="img" aria-label="5 van 5 sterren">★★★★★</span><span>op Google (${REVIEWS.aantal} reviews)</span></div>
  <div class="reviews">${REVIEWS.items.map((r, i) => `<figure data-reveal style="--d:${i * 80}ms"><span class="sterren" role="img" aria-label="5 sterren">★★★★★</span><blockquote>${r[0]}</blockquote><figcaption>${r[1]}<span>Google-review</span></figcaption></figure>`).join('')}</div>
</div></section>`

// ---------- TWEE TAKKEN: gedeelde blokken (uit het ontwerp van 09-11, zonder ontwerpnotities) ----------
// Indeling per tak. Tak 1 = websites (de basis) + het meetwerk. Tak 2 = apps + automatisering.
const TAK = {
  t1: { top: ['florent', 'herbergen', 'casa5', 'jacobs'], meer: ['rhscooter', 'marketingfit', 'jmc', 'geo-monitor', 'seo-rapport'] },
  t2: { top: ['moveflow', 'urenapp', 'postleads-machine', 'cockpit'], meer: ['kassa', 'postleads-dashboard', 'social-manager', 'occasioniq', 'ptapp', 'babyapp'] },
}
const AIS = ['ChatGPT', 'Gemini', 'Perplexity', 'Google AI-overzicht', 'Google AI-modus', 'Copilot', 'Meta AI']

// Voorbeeld van de gratis check, volledig nepdata (verzonnen installateur).
const checkKaart = `
<div class="check-kaart" role="img" aria-label="Voorbeeld met nepdata: de gratis check van een verzonnen installatiebedrijf in Velp">
  <div class="ck-kop">
    <span class="ck-logo">AP</span>
    <div><b>Gratis check</b><small>voorbeeld-installatie.nl · nepdata</small></div>
    <div class="ck-score"><strong>2<em>/7</em></strong><small>AI's noemen je</small></div>
  </div>
  <div class="ck-twee">
    <div class="ck-blok">
      <small>Google · positie</small>
      <div class="ck-rij"><span>loodgieter velp</span><b class="ok">#6</b></div>
      <div class="ck-rij"><span>cv-ketel vervangen arnhem</span><b class="mid">#23</b></div>
      <div class="ck-rij"><span>installateur in de buurt</span><b class="nee">niet in top 50</b></div>
    </div>
    <div class="ck-blok">
      <small>AI's · "Welke installateur in Velp raad je aan?"</small>
      ${AIS.map((a, i) => `<div class="ck-rij"><span>${a}</span><b class="${[1, 3].includes(i) ? 'ok' : 'nee'}">${[1, 3].includes(i) ? 'genoemd' : 'niet genoemd'}</b></div>`).join('')}
    </div>
  </div>
  <div class="ck-gaten">
    <small>De 3 grootste gaten</small>
    <ol><li>Geen eigen pagina voor cv-ketels, terwijl daar het meest op gezocht wordt</li><li>Google-profiel mist foto's en diensten</li><li>4 reviews, de grootste concurrent heeft er 41</li></ol>
  </div>
</div>`

const AI_STROOK = `<div class="ai-strook">${['Google-posities', 'Search Console', 'Techniek en snelheid', ...AIS].map(a => `<span>${a}</span>`).join('')}</div>`

// Maandpakketten. Standaard bij livegang 10-11 (Alex heeft de beslispunten nog niet beantwoord, later aan te passen):
// prijzen excl. btw, nulmeting zit bij de start in het pakket, Vol = 2 pagina's per maand, socialposts voor de eigen accounts van de klant.
const MAANDPAKKETTEN = [
  { naam: 'Basis', prijs: '149', kop: 'Je weet waar je staat.', tekst: 'Elke maand gemeten en de kleine dingen gefixt. Voor wie zijn plek wil houden.', punten: ['Elke maand gemeten in Google en 7 AI\'s', 'Maandrapport van 2 pagina\'s', 'Google-bedrijfsprofiel bijhouden, 1 post per maand', 'Kleine fixes aan je site'] },
  { naam: 'Groei', prijs: '299', uitgelicht: true, kop: 'Elke maand een stap vooruit.', tekst: 'Nieuwe inhoud en beter vindbaar in je eigen regio.', punten: ['Alles uit Basis', '1 nieuwe pagina of artikel per maand', '1 actie voor lokale vindbaarheid of vermeldingen', '8 socialposts per maand voor je eigen accounts'] },
  { naam: 'Vol', prijs: '499', kop: 'Hard groeien.', tekst: 'Meer inhoud, actief reviews verzamelen en je advertenties erbij.', punten: ['Alles uit Groei', '2 nieuwe pagina\'s of artikelen per maand', 'Elke maand een review-actie', 'Advertentiebeheer (budget betaal je apart)'] },
]
const pakketKaarten = ({ kort = false, hosting = false } = {}) => `
<div class="mp-grid">${MAANDPAKKETTEN.map((p, i) => `<div class="mp${p.uitgelicht ? ' uitgelicht' : ''}" data-reveal style="--d:${i * 80}ms">
  ${p.uitgelicht ? '<span class="pil-los mp-pil">Onze aanrader</span>' : ''}
  <div class="mp-naam">${p.naam}</div>
  <div class="mp-prijs">€${p.prijs}<small> per maand</small></div>
  ${kort ? '' : `<h3>${p.kop}</h3><p>${p.tekst}</p>`}
  <ul class="vinklijst">${p.punten.map(x => `<li>${x}</li>`).join('')}</ul>
  <a class="${p.uitgelicht ? 'knop' : 'knop-2'}" href="${CHECK}?pakket=${p.naam}">Begin met de gratis check</a>
</div>`).join('')}</div>
<p class="mp-onder">Prijzen per maand, excl. btw. De nulmeting bij de start zit in het pakket. Minimaal 3 maanden, daarna per maand opzegbaar.${hosting ? ' Hosting en domein regelen we apart, zie <a class="tekst-link" href="/onderhoud-en-hosting">onderhoud en hosting</a>.' : ''}</p>`

const GRENS = [
  ['Geen garantie op posities', 'Google en de AI\'s bepalen zelf wie ze laten zien. Wat we wel beloven: elke maand meten, verbeteren en laten zien wat het deed.'],
  ['Foto\'s en feiten lever jij', 'Wij schrijven de teksten en bouwen de pagina\'s. Jij levert de foto\'s en checkt of de feiten kloppen.'],
  ['Nieuwe site of grote verbouwing', 'Valt niet onder het pakket. Daarvoor krijg je een aparte offerte, vóór we beginnen.'],
  ['Advertentiebudget betaal je apart', 'Bij Vol beheren we je advertenties. Wat je bij Google of Meta uitgeeft, betaal je zelf aan hen.'],
  ['Minimaal 3 maanden', 'Vindbaarheid groeit niet in een week. Daarom minimaal 3 maanden, daarna per maand opzegbaar.'],
]
const grensBlok = `
<div class="mp-grens" data-reveal>
  <h3>Wat er wel en niet onder valt</h3>
  <dl>${GRENS.map(g => `<div><dt>${g[0]}</dt><dd>${g[1]}</dd></div>`).join('')}</dl>
</div>`

const maandStappen = `
<ol class="stappen">
  <li class="stap" data-reveal><div class="nr">01</div><h3>Gratis check</h3><p>Eén pagina: hoe sta je nu in Google en in de AI's, en wat zijn de 3 grootste gaten.</p></li>
  <li class="stap" data-reveal><div class="nr">02</div><h3>Nulmeting</h3><p>Bij de start, in het pakket: 12 vragen die jouw klanten echt stellen, 20 zoektermen en 3 concurrenten. Daar meten we vanaf dan tegen.</p></li>
  <li class="stap" data-reveal><div class="nr">03</div><h3>Elke maand verbeteren</h3><p>Wat het meeste oplevert eerst: pagina's, je Google-profiel, vermeldingen en reviews.</p></li>
  <li class="stap" data-reveal><div class="nr">04</div><h3>Rapport van 2 pagina's</h3><p>Waar je nu staat, vorige maand en je doel. Wat we deden en wat volgende maand komt.</p></li>
</ol>`

const ctaKnop = (titel, tekst, href, knop) => `
<section class="sectie smal"><div class="wrap"><div class="cta-band">
  <div><h2>${titel}</h2><p>${tekst}</p></div>
  <div class="acties"><a class="knop" href="${href}">${knop}</a><a class="tel" href="${TEL_HREF}">of bel ${TEL}</a></div>
</div></div></section>`
const ctaCheck = ctaKnop('Hoe vindbaar ben jij <span class="serif">nu echt?</span>', 'Doe de gratis check. Je krijgt één pagina terug met waar je staat in Google en de AI\'s, en de 3 grootste gaten. Kost niets, verplicht tot niets.', CHECK, 'Doe de gratis check')
const ctaKennis = ctaKnop('Loopt je bedrijf vast op <span class="serif">handwerk en lijstjes?</span>', 'In een gratis gesprek kijken we naar je werkdag. Je hoort eerlijk wat zin heeft om te bouwen, en wat niet. Daarna krijg je een vaste prijs op papier.', '/contact?over=apps', 'Plan een gratis kennismaking')

const takKaarten = (svc = false) => `
  <div class="takken specialisaties-list">
    <a class="tak tak-1${svc ? ' svc-card' : ''}" href="${T1}" data-reveal>
      <div class="tak-nr">01</div>
      <div class="label geel">Het maandpakket</div>
      <h3>Vindbaar in Google en AI</h3>
      <p>Je site is de basis. Elke maand meten we waar je staat, maken we je beter vindbaar en laten we zien wat het deed.</p>
      <ul><li>Gemeten in Google en 7 AI's</li><li>Elke maand verbeteringen</li><li>Rapport van 2 pagina's</li></ul>
      <div class="tak-prijs">vanaf €149 per maand, excl. btw</div>
      <span class="meer">Bekijk de pakketten →</span>
    </a>
    <a class="tak tak-2${svc ? ' svc-card' : ''}" href="${T2}" data-reveal style="--d:90ms">
      <div class="tak-nr">02</div>
      <div class="label">Op maat</div>
      <h3>Software en automatisering</h3>
      <p>Apps die passen op hoe jouw bedrijf werkt, en werk dat elke week terugkomt laten we vanzelf lopen.</p>
      <ul><li>Planning, uren en klantportalen</li><li>Rapportages en mails die zichzelf maken</li><li>Eén overzicht voor alles</li></ul>
      <div class="tak-prijs">Vaste prijs na een gratis gesprek</div>
      <span class="meer">Meer over software →</span>
    </a>
  </div>`

// Blok "daarna vindbaar blijven" op de websitepagina's (stadspagina's en /websites-laten-maken).
const vindbaarBlok = `
<section class="sectie smal"><div class="wrap"><div class="tip">
  <div class="label geel">Daarna</div>
  <h2>Daarna vindbaar blijven?</h2>
  <p>Een nieuwe site is de basis. Met een vast maandpakket meten we elke maand hoe je staat in Google en in AI's als ChatGPT, en maken we je stap voor stap beter vindbaar. Vanaf €149 per maand, excl. btw.</p>
  <div class="knoppen-rij" style="margin-top:18px"><a class="knop-2" href="${T1}">Vindbaar in Google en AI →</a><a class="knop-2" href="${CHECK}">Doe de gratis check →</a></div>
</div></div></section>`

const home = pagina({
  pad: '/',
  titel: 'Vindbaar in Google en AI, websites vanaf €299 | AP Digital',
  beschrijving: 'AP Digital zorgt dat klanten je vinden in Google en in AI\'s als ChatGPT, met een vast maandpakket vanaf €149. Plus software en automatisering op maat.',
  og: { titel: 'AP Digital | Vindbaar in Google en AI, software op maat', beschrijving: 'Digitaal werk dat gewoon werkt. Gevonden worden in Google en AI, plus software en automatisering op maat. Uit Arnhem.' },
  actief: 'home',
  kopExtra: '<meta name="google-site-verification" content="CgNNQrAZwi1S_UNIU0qI0KRWeE4KUXG3Hbb" />',
  // Beweging op de homepage (veld in de hero, koppen per woord, stappen, kaartstapel). Alleen hier geladen; laadt zelf home-motion.css.
  voetExtra: `
<script defer src="/home-motion.js?v=${VM}"></script>`,
  jsonld: [
    ld({ ...BEDRIJF, description: 'AP Digital uit Arnhem zorgt dat bedrijven gevonden worden in Google en in AI\'s, en bouwt websites, software en automatisering op maat.', areaServed: [{ '@type': 'City', name: 'Arnhem' }, { '@type': 'City', name: 'Ede' }, { '@type': 'City', name: 'Nijmegen' }, { '@type': 'City', name: 'Wageningen' }, { '@type': 'Country', name: 'Nederland' }], sameAs: ['https://wa.me/31614160265'] }),
    ld({ '@type': 'WebSite', url: `${SITE}/`, name: 'AP Digital', publisher: { '@id': `${SITE}/#business` }, inLanguage: 'nl-NL' }),
    kruimelLd([]),
  ],
  body: `
<section class="hero2"><div class="wrap">
  <div class="hero-kop">
    <div>
      <div class="label geel">Vindbaar in Google en AI · Software op maat</div>
      <h1><span class="streep">Gevonden worden.</span> <span class="serif">In Google én in AI.</span></h1>
    </div>
    <div class="hero-rechts">
      <p class="lead">Je klanten zoeken in Google, en ze vragen het ook aan ChatGPT. Wij zorgen dat ze jou daar vinden. Elke maand gemeten, verbeterd en in twee pagina's uitgelegd. Voor een vast bedrag per maand.</p>
      <div class="knoppen-rij"><a class="knop" href="${CHECK}">Doe de gratis check</a><a class="knop-2" href="${T1}#pakketten">Bekijk de pakketten</a></div>
    </div>
  </div>
  <div class="hero-check">${checkKaart}</div>
  <p class="m-uitleg">Zo ziet de gratis check eruit. <span>Voorbeeld met nepdata.</span></p>
</div></section>

<div class="tape" aria-hidden="true"><div class="tape-rol"><span>Vindbaar in Google</span><span>Vindbaar in AI</span><span>Vast bedrag per maand</span><span>Software op maat</span><span>Gebouwd in Arnhem</span><span>Eén aanspreekpunt</span><span>Vindbaar in Google</span><span>Vindbaar in AI</span><span>Vast bedrag per maand</span><span>Software op maat</span><span>Gebouwd in Arnhem</span><span>Eén aanspreekpunt</span></div></div>

<section class="sectie"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Wat we doen</div><h2 style="margin-top:12px">Twee dingen. <span class="serif">Die doen we goed.</span></h2><p class="lead">De meeste klanten komen om beter gevonden te worden. Loop je daarna vast op Excel, papier of dubbel overtypen, dan bouwen we dat er gewoon achteraan.</p></div></div>
  ${takKaarten()}
</div></section>

<section class="sectie cijfer-sectie raster"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Het maandpakket</div><h2 style="margin-top:12px">Elke maand <span class="serif">dezelfde vier stappen.</span></h2></div><a class="knop-2" href="${T1}">Hoe het werkt →</a></div>
  ${maandStappen}
  <div class="label sub" style="margin:40px 0 14px">Wat we elke maand meten</div>
  ${AI_STROOK}
</div></section>

<section class="sectie" id="pakketten"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Pakketten</div><h2 style="margin-top:12px">Een vast bedrag <span class="serif">per maand.</span></h2><p class="lead">Elk pakket begint met een nulmeting, die zit bij de start in het pakket. Daarna meten en verbeteren we elke maand, en zie je in twee pagina's wat het deed.</p></div><a class="knop-2" href="${T1}#grens">Wat er wel en niet onder valt →</a></div>
  ${pakketKaarten({ kort: true })}
</div></section>

<section class="sectie" id="verhalen"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Uitgelicht werk</div><h2 style="margin-top:12px">Twee takken, <span class="serif">echte projecten.</span></h2><p class="lead">Wat er mis was, wat we bouwden en wat het opleverde. Open een project voor het hele verhaal.</p></div><a class="knop-2" href="/portfolio">Alle projecten →</a></div>
  <div class="tak-kop"><span>01 · Vindbaar in Google en AI</span></div>
  <div class="cases">${['florent', 'geo-monitor'].map(id => kaart(proj(id), { klasse: 'hc-card' })).join('')}</div>
  <div class="tak-kop"><span>02 · Software en automatisering</span></div>
  <div class="cases">${['moveflow', 'postleads-machine'].map(id => kaart(proj(id), { rustig: id === 'moveflow', klasse: 'hc-card' })).join('')}</div>
</div></section>

<section class="sectie cijfer-sectie raster"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">In cijfers</div><h2 style="margin-top:12px">Geen beloftes. <span class="serif">Dit staat er al.</span></h2></div></div>
  <div class="cijfers">
    ${cijfers.map((c, i) => `<div data-reveal style="--d:${i * 80}ms"><strong${/^[\d.]+$/.test(c[0]) ? ` data-tel="${c[0].replace(/\./g, '')}"` : ''}>${c[0]}</strong><span>${c[1]}</span></div>`).join('')}
  </div>
</div></section>

<section class="sectie raster"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Waarom wij</div><h2 style="margin-top:12px">Geen <s class="doorhaal">webbureau.</s> <span class="serif">Bouwers die meten.</span></h2></div></div>
  <div class="drie">
    <div data-reveal><div class="nr">01</div><h3>Elke maand gemeten</h3><p>Niet "het gaat goed", maar dezelfde vragen en zoektermen naast vorige maand. Zo zie je zwart op wit of het werkt.</p></div>
    <div data-reveal style="--d:90ms"><div class="nr">02</div><h3>Site en systeem uit één hand</h3><p>Een aanvraag via je site is stap één. Dat die daarna vanzelf in je planning staat, is stap twee. Wij doen allebei.</p></div>
    <div data-reveal style="--d:180ms"><div class="nr">03</div><h3>Je belt met wie het bouwt</h3><p>Geen accountmanager ertussen. Wie je aan de lijn hebt, doet het werk zelf.</p></div>
  </div>
</div></section>
${reviewsBlok}
${ctaCheck}
`,
})

// ---------- TAK 1: VINDBAAR IN GOOGLE EN AI ----------
const t1Faq = [
  ['Waarom zou ik in AI\'s willen staan?', 'Omdat je klanten het daar ook vragen. Wie ChatGPT of Google vraagt om een goede installateur of kapper in de buurt, krijgt een paar namen. Wij zorgen dat de jouwe daar een eerlijke kans maakt.'],
  ['Hoe snel zie ik verschil?', 'Google en de AI\'s hebben tijd nodig om veranderingen op te pikken. Reken op een paar maanden. Daarom meten we elke maand en starten we met minimaal 3 maanden.'],
  ['Heb ik een nieuwe website nodig?', 'Niet altijd. Is je site goed genoeg om op te bouwen, dan werken we daarop verder. Is hij dat niet, dan zeggen we dat na de check. Een nieuwe site valt buiten het pakket: daarvoor krijg je een aparte offerte, een instapsite kost vanaf €299.'],
  ['Wat krijg ik bij de gratis check?', 'Eén pagina: hoe je nu in Google staat op een paar belangrijke zoektermen, of de 7 AI\'s je noemen als iemand om een bedrijf zoals het jouwe vraagt, en de 3 grootste gaten. Binnen 5 werkdagen in je mailbox, en je zit nergens aan vast.'],
  ['Kost de nulmeting extra?', 'Nee. De nulmeting bij de start zit in het pakket, er komen geen aparte kosten bij.'],
  ['Wat staat er in het maandrapport?', 'Twee pagina\'s in gewone taal: waar je nu staat, vorige maand en je doel. Wat we deden en wat we volgende maand gaan doen.'],
  ['Kan ik opzeggen?', 'Na de eerste 3 maanden kun je per maand opzeggen.'],
]
const tak1 = pagina({
  pad: T1,
  titel: 'Vindbaar in Google en AI, vanaf €149 per maand | AP Digital',
  beschrijving: 'Gevonden worden in Google en in AI\'s als ChatGPT, Gemini en Perplexity. Elke maand gemeten, verbeterd en in een rapport van 2 pagina\'s. Begin met de gratis check.',
  actief: 't1',
  jsonld: [
    dienstLd('Vindbaar in Google en AI', 'Maandpakket: elke maand meten hoe een bedrijf staat in Google en in 7 AI\'s, verbeteren wat het meeste oplevert en een rapport van 2 pagina\'s.', T1, {
      offers: MAANDPAKKETTEN.map(p => ({ '@type': 'Offer', name: `${p.naam} maandpakket`, price: p.prijs, priceCurrency: 'EUR', priceSpecification: { '@type': 'UnitPriceSpecification', price: p.prijs, priceCurrency: 'EUR', unitCode: 'MON', valueAddedTaxIncluded: false }, seller: { '@id': `${SITE}/#business` } })),
    }),
    faqLd(t1Faq), kruimelLd([['Vindbaar in Google en AI', T1]]),
  ],
  body: `
<section class="pkop raster"><div class="wrap twee t1-kop">
  <div>
    <div class="label geel">01 · Vindbaar in Google en AI</div>
    <h1>Gevonden worden, <span class="serif">elke maand een beetje beter.</span></h1>
    <p class="lead">Een goede site is de basis. Maar klanten moeten je ook vinden: in Google, en als ze een AI om advies vragen. Wij meten elke maand waar je staat, verbeteren wat het meeste oplevert en laten in twee pagina's zien wat het deed.</p>
    <div class="knoppen-rij" style="margin-top:26px"><a class="knop" href="${CHECK}">Doe de gratis check</a><a class="knop-2" href="#pakketten">Bekijk de pakketten</a></div>
  </div>
  <div class="t1-beeld">${checkKaart}<p class="m-uitleg" style="margin-top:12px">Voorbeeld van de gratis check. <span>Nepdata.</span></p></div>
</div></section>

<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Herken je dit?</div><h2 style="margin-top:12px">Je site staat er. <span class="serif">Maar wie vindt hem?</span></h2></div>
  <ul class="vinklijst" style="grid-template-columns:1fr"><li>Je staat niet op de eerste pagina bij wat klanten intypen</li><li>Vraag je ChatGPT om een bedrijf zoals het jouwe, dan noemt hij de concurrent</li><li>Je site is af, maar niemand kijkt er nog naar om</li><li>Je weet niet of je site je iets oplevert</li></ul>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Wat we elke maand doen</div><h2 style="margin-top:12px">Meten, verbeteren, <span class="serif">uitleggen.</span></h2></div></div>
  <div class="drie">
    <div><div class="nr">01</div><h3>Meten</h3><p>Dezelfde vragen en zoektermen als vorige maand, in Google en in 7 AI's. Plus je cijfers uit Google Search Console en een check van de techniek.</p></div>
    <div><div class="nr">02</div><h3>Verbeteren</h3><p>Wat het meeste oplevert eerst: nieuwe pagina's of artikelen, je Google-bedrijfsprofiel, vermeldingen op andere sites en reviews.</p></div>
    <div><div class="nr">03</div><h3>Uitleggen</h3><p>Een rapport van 2 pagina's in gewone taal: waar je staat, wat we deden en wat volgende maand komt.</p></div>
  </div>
  <div class="label sub" style="margin:36px 0 14px">Waar we meten</div>
  ${AI_STROOK}
</div></section>

<section class="sectie smal" id="gratis-check"><div class="wrap"><div class="concept-band check-band" data-reveal>
  <div class="concept-tekst">
    <div class="label geel">Gratis check</div>
    <h2 style="margin-top:12px">Begin met <span class="serif">de gratis check.</span></h2>
    <p>Je krijgt één pagina terug: hoe je nu in Google staat, of de AI's je noemen, en de 3 grootste gaten. Binnen 5 werkdagen in je mailbox. Kijken kost niets en verplicht je tot niets.</p>
    <div class="knoppen-rij" style="margin-top:22px"><a class="knop" href="${CHECK}">Vraag de gratis check aan</a></div>
  </div>
  <ol class="check-lijst"><li><b>Google</b>Waar sta je op de zoektermen die tellen?</li><li><b>7 AI's</b>Noemen ze je als iemand om een bedrijf zoals het jouwe vraagt?</li><li><b>3 gaten</b>Wat het meeste oplevert als je het oplost.</li></ol>
</div></div></section>

<section class="sectie" id="pakketten"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Pakketten</div><h2 style="margin-top:12px">Kies hoe hard <span class="serif">je wilt groeien.</span></h2><p class="lead">Elk pakket begint met een nulmeting: 12 vragen die jouw klanten echt stellen, 20 zoektermen en 3 concurrenten. Die zit bij de start in het pakket. Daar meten we elke maand tegen.</p></div></div>
  ${pakketKaarten({ hosting: true })}
  <div id="grens">${grensBlok}</div>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Zo ziet het eruit</div><h2 style="margin-top:12px">Het rapport en <span class="serif">de meting.</span></h2><p class="lead">Elke maand twee pagina's in gewone taal. Hieronder een voorbeeld met een verzonnen klant.</p></div></div>
  <div class="cases">${['seo-rapport', 'geo-monitor'].map(id => kaart(proj(id))).join('')}</div>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="tip">
    <div class="label geel">De basis</div>
    <h2>Eerst een betere site nodig?</h2>
    <p>Is je huidige site niet goed genoeg om op te bouwen, dan maken we eerst een nieuwe. Een instapsite kost vanaf €299 en staat binnen 7 dagen live. Daarna houdt het maandpakket hem vindbaar.</p>
    <div class="knoppen-rij" style="margin-top:18px"><a class="knop-2" href="${P.websites}">Website laten maken →</a><a class="knop-2" href="/pakketten">Websitepakketten →</a><a class="knop-2" href="${P.websites}#regio">In jouw regio →</a></div>
  </div>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Websites die we bouwden</div><h2 style="margin-top:12px">De basis, <span class="serif">in het echt.</span></h2></div><a class="knop-2" href="/portfolio#t1">Heel het portfolio →</a></div>
  <div class="klein">${['florent', 'herbergen', 'rhscooter'].map(id => kaart(proj(id), { rustig: true })).join('')}</div>
</div></section>
${faqBlok(t1Faq)}
${ctaCheck}
`,
})

// ---------- TAK 2: SOFTWARE EN AUTOMATISERING ----------
const t2Faq = [
  ['Werkt het op telefoon en computer?', 'De apps in ons portfolio werken in de browser, op telefoon en computer, zonder app store.'],
  ['Moet ik alles uit handen geven?', 'Nee. Bij de automatiseringen in ons portfolio zit steeds een moment waarop een mens kijkt of goedkeurt.'],
  ['Werkt het met mijn huidige systemen?', 'Vaak wel. In het gratis gesprek kijken we welke systemen je gebruikt en wat daarmee te koppelen is. Kan het niet netjes, dan zeggen we dat ook.'],
  ['Wat als we later meer willen?', 'Dan bouwen we door op wat er staat. Zo zijn de apps in ons portfolio ook gegroeid.'],
  ['Wat kost het?', 'Dat hangt af van wat het moet doen. Na een gratis gesprek krijg je een vaste prijs op papier, vóór we beginnen. Geen uurtje-factuurtje en geen open eind.'],
]
const tak2 = pagina({
  pad: T2,
  titel: 'Software op maat en automatisering | AP Digital',
  beschrijving: 'Apps die passen op hoe jouw bedrijf werkt en werk dat vanzelf loopt: planning, uren, klantportaal, rapportages. Gebouwd voor Jacobs Heteren, nu voor jouw bedrijf.',
  actief: 't2',
  jsonld: [dienstLd('Software op maat en automatisering', 'Apps op maat en automatisering van terugkerend werk: planning, uren, klantportalen, rapportages en koppelingen. Vaste prijs na een gratis gesprek.', T2), faqLd(t2Faq), kruimelLd([['Software en automatisering', T2]])],
  body: `
<section class="hero2 t2-hero"><div class="wrap">
  <div class="label geel">02 · Software en automatisering</div>
  <h1 style="max-width:900px">Software die past op <span class="serif">hoe jouw bedrijf werkt.</span></h1>
  <div class="hero-rechts">
    <p class="lead">Een app voor je planning, uren of klanten. Of werk dat elke week terugkomt en vanzelf moet lopen. Gebouwd voor Jacobs Heteren, waar het elke dag draait. Nu voor jouw bedrijf.</p>
    <div class="knoppen-rij"><a class="knop" href="/contact?over=apps">Plan een gratis kennismaking</a><a class="knop-2" href="#werk">Bekijk voorbeelden</a></div>
  </div>
  ${machine}
  <p class="m-uitleg">Zo loopt een aanvraag als je site, planning en offertes aan elkaar hangen. <span>Voorbeeld met nepdata.</span></p>
</div></section>

<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Herken je dit?</div><h2 style="margin-top:12px">Je bedrijf draait op <span class="serif">Excel en losse briefjes.</span></h2></div>
  <ul class="vinklijst" style="grid-template-columns:1fr"><li>Hetzelfde wordt twee of drie keer overgetypt</li><li>Uren, planning of voorraad staan in verschillende lijsten</li><li>Elke week dezelfde mails en rapportages, met de hand</li><li>Als jij er niet bent, blijft het liggen</li></ul>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Wat we bouwen</div><h2 style="margin-top:12px">Twee soorten werk, <span class="serif">één bouwer.</span></h2></div></div>
  <div class="takken takken-gelijk">
    <a class="tak" href="${P.apps}" data-reveal>
      <div class="label">Apps op maat</div>
      <h3>Software voor de werkvloer</h3>
      <p>Je eigen stappen en je eigen woorden, op telefoon en computer.</p>
      <ul><li>Planning, dossiers en werkbonnen</li><li>Uren, verlof en declaraties</li><li>Klantportaal, kassa en voorraad</li></ul>
      <span class="meer">Meer over apps →</span>
    </a>
    <a class="tak" href="${P.automatisering}" data-reveal style="--d:90ms">
      <div class="label">Processen en automatisering</div>
      <h3>Werk dat vanzelf loopt</h3>
      <p>Met jou als controle in plaats van als uitvoerder.</p>
      <ul><li>Gegevens ophalen en koppelen</li><li>Mails, posts en rapporten op vaste momenten</li><li>Eén dashboard in plaats van tien tabbladen</li></ul>
      <span class="meer">Meer over automatisering →</span>
    </a>
  </div>
</div></section>

<section class="sectie smal" id="werk"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Voorbeelden</div><h2 style="margin-top:12px">Zo ziet dat er <span class="serif">in het echt uit.</span></h2></div><a class="knop-2" href="/portfolio#t2">Heel het portfolio →</a></div>
  <div class="cases">${TAK.t2.top.map(id => kaart(proj(id))).join('')}</div>
  <div class="label sub" style="margin:40px 0 16px">Meer software en automatisering</div>
  <div class="klein">${TAK.t2.meer.map(id => kaart(proj(id))).join('')}</div>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Aanbod</div><h2 style="margin-top:12px">Wat het kost</h2><p class="lead">Geen uurtje-factuurtje en geen open eind. Na een gratis gesprek krijg je een vaste prijs op papier, vóór we beginnen.</p></div></div>
  <div class="aanbod">${[['Verkenning', 'Samen uitzoeken wat het moet doen en wat niet.'], ['Eerste versie', 'Een werkende app of automatisering voor het belangrijkste proces.'], ['Doorbouwen en beheer', 'Uitbreiden op wat je team in de praktijk nodig heeft, en draaiend houden.']].map(a => `<div><h3>${a[0]}</h3><p>${a[1]}</p><div class="aanbod-prijs"><strong>Vaste prijs</strong><span>na een gratis gesprek</span></div></div>`).join('')}</div>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Zo werken we</div><h2 style="margin-top:12px">Vier gesprekken, <span class="serif">geen verrassingen.</span></h2></div></div>
  ${stappen}
</div></section>
${faqBlok(t2Faq)}
${ctaKennis}
`,
})

// ---------- GRATIS CONCEPT (blok) ----------
const conceptBlok = `
<section class="sectie smal"><div class="wrap"><div class="concept-band" data-reveal>
  <div class="concept-tekst">
    <div class="label geel">Gratis concept</div>
    <h2 style="margin-top:12px">We hebben al een concept <span class="serif">voor je klaargezet.</span></h2>
    <p>Hebben we je gebeld? Dan hebben we vooraf alvast een ontwerp van je nieuwe voorpagina gemaakt, met je eigen logo, kleuren en foto's. Kijken kost niets en verplicht je tot niets.</p>
    <div class="knoppen-rij" style="margin-top:22px"><a class="knop" href="/gratis-concept">Bekijk hoe het werkt</a></div>
  </div>
  <div class="concept-beeld" aria-hidden="true"><div class="concept-scherm"><div class="m-balk"><i></i><i></i><i></i><span>jouwbedrijf.nl · concept</span></div><div class="concept-skelet"><div class="sk-nav"><b></b><i></i><i></i><i></i><em></em></div><div class="sk-hero"><div><i style="--w:88%"></i><i style="--w:70%"></i><i class="dun" style="--w:80%"></i><i class="dun" style="--w:60%"></i><em></em></div><div class="sk-foto"></div></div><div class="sk-rij"><span></span><span></span><span></span></div></div><span class="concept-stempel">Concept · voor jou klaargezet</span></div></div>
</div></div></section>`

const stadRaster = `<ul class="stad-raster">${steden.map(s => `<li><a href="/${s.slug}"><b>${s.naam}</b><span>${s.hubRegel}</span></a></li>`).join('')}</ul>`

// ---------- PIJLERPAGINA ----------
const PIJLER_META = {
  websites: { titel: 'Website laten maken | AP Digital, vast tarief en live in 7 dagen', beschrijving: 'Website laten maken voor ondernemers in heel Midden- en Oost-Nederland. Snel live, vaste prijs vanaf 299 euro en goed vindbaar via Google. Bekijk je regio.', dienst: 'Website laten maken' },
  apps: { titel: 'App laten maken op maat | AP Digital', beschrijving: 'Een app die past op hoe jouw bedrijf werkt: planning, uren, klantportaal of kassa. Gebouwd voor Jacobs Heteren, nu voor jouw bedrijf. Vaste prijs na een gratis gesprek.', dienst: 'App laten maken' },
  automatisering: { titel: 'Processen automatiseren voor je bedrijf | AP Digital', beschrijving: 'Werk dat elke week terugkomt laten we automatisch lopen: rapportages, mails, koppelingen en één dashboard. Vaste prijs na een gratis gesprek.', dienst: 'Processen automatiseren' },
}
function pijlerPagina(p) {
  const top = uitgelicht(p.key), meer = rest(p.key), m = PIJLER_META[p.key]
  const extra = {
    websites: `
<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Meer over websites</div><h2 style="margin-top:12px">Precies wat <span class="serif">jij nodig hebt.</span></h2></div></div>
  <ul class="stad-lijst">${[['/website-redesign', 'Bestaande site vernieuwen'], ['/onderhoud-en-hosting', 'Onderhoud en hosting'], ['/pakketten', 'Pakketten en prijzen'], ['/restaurant-websites', 'Restaurant websites'], ['/bb-websites', 'B&amp;B websites'], ['/gratis-concept', 'Je gratis concept']].map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>
</div></section>
${vindbaarBlok}
<section class="sectie smal" id="regio"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">In jouw regio</div><h2 style="margin-top:12px">Website laten maken <span class="serif">bij jou in de buurt.</span></h2><p class="lead">We werken voor ondernemers door heel Midden- en Oost-Nederland, en verder. Kies je plaats voor de aanpak in jouw regio.</p></div></div>
  ${stadRaster}
</div></section>`,
    apps: `
<section class="sectie smal"><div class="wrap">
  <div class="tip"><div class="label">In de regio Arnhem</div><h2>App laten maken in Arnhem?</h2><p>Voor ondernemers in en rond Arnhem komen we ook gewoon langs. <a class="tekst-link" href="/app-laten-maken-arnhem">Lees hoe we dat aanpakken in Arnhem</a>.</p></div>
</div></section>`,
    automatisering: '',
  }[p.key]
  return pagina({
    pad: P[p.key], titel: m.titel, beschrijving: m.beschrijving, actief: p.key,
    jsonld: [dienstLd(m.dienst, kaal(p.kort), P[p.key]), faqLd(p.faq), kruimelLd([[p.naam, P[p.key]]])],
    body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">${p.label}</div>
  <h1>${p.h1}</h1>
  <p class="lead">${p.intro}</p>
  <div class="knoppen-rij" style="margin-top:26px"><a class="knop" href="/contact?over=${p.key}">Plan een gratis kennismaking</a><a class="knop-2" href="#werk">Bekijk voorbeelden</a></div>
</div></section>

<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Herken je dit?</div><h2 style="margin-top:12px">${p.pijnKop}</h2></div>
  <ul class="vinklijst" style="grid-template-columns:1fr">${p.pijn.map(x => `<li>${x}</li>`).join('')}</ul>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Wat we bouwen</div><h2 style="margin-top:12px">${p.watKop}</h2></div></div>
  <div class="drie">${p.wat.map((w, i) => `<div><div class="nr">0${i + 1}</div><h3>${w[0]}</h3><p>${w[1]}</p></div>`).join('')}</div>
</div></section>

<section class="sectie smal" id="werk"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Voorbeelden</div><h2 style="margin-top:12px">Zo ziet dat er <span class="serif">in het echt uit.</span></h2></div><a class="knop-2" href="/portfolio#${TAK_VAN[p.key]}">Heel het portfolio →</a></div>
  <div class="cases">${top.map(x => kaart(x)).join('')}</div>
  ${meer.length ? `<div class="label sub" style="margin:40px 0 16px">Meer ${p.naam.toLowerCase()}</div><div class="klein">${meer.map(x => kaart(x)).join('')}</div>` : ''}
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Aanbod</div><h2 style="margin-top:12px">Wat het kost</h2><p class="lead">${p.key === 'websites' ? 'Een instapsite kost vanaf €299 en staat binnen 7 dagen live. Wil je meer, dan krijg je na een gratis gesprek een vaste prijs, vóór we beginnen.' : 'Geen uurtje-factuurtje en geen open eind. Na een gratis gesprek krijg je een vaste prijs op papier, vóór we beginnen.'}</p></div></div>
  <div class="aanbod">${p.aanbod.map(a => `<div><h3>${a[0]}</h3><p>${a[1]}</p><div class="aanbod-prijs"><strong>${a[2] || 'Vaste prijs'}</strong><span>${a[3] || 'na een gratis gesprek'}</span></div></div>`).join('')}</div>
  ${p.aanbodGrens ? `<div class="aanbod-grens"><h3>${p.aanbodGrens.kop}</h3><ul class="vinklijst">${p.aanbodGrens.punten.map(x => `<li>${x}</li>`).join('')}</ul><p>${p.aanbodGrens.meer} <a class="tekst-link" href="/pakketten">Bekijk alle pakketten</a></p></div>` : ''}
</div></section>

${p.key === 'websites' ? conceptBlok : ''}
<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Zo werken we</div><h2 style="margin-top:12px">In vier stappen</h2></div></div>
  ${stappen}
</div></section>
${extra}
${faqBlok(p.faq)}
${ctaBand(p.cta, undefined, `/contact?over=${p.key}`)}
`,
  })
}

// ---------- PORTFOLIO (per tak) ----------
const portfolioBlok = (id, label, naam, href, linkTekst, lijst) => `
  <section class="pijlerblok" id="${id}" data-blok="${id}">
    <div class="sectie-kop" style="margin-bottom:24px"><div><div class="label">${label}</div><h2 style="margin-top:10px">${naam}</h2></div><a class="knop-2" href="${href}">${linkTekst} →</a></div>
    <div class="cases">${lijst.top.map(x => kaart(proj(x))).join('')}</div>
    <div class="label sub">Meer ${naam.toLowerCase()}</div>
    <div class="klein">${lijst.meer.map(x => kaart(proj(x))).join('')}</div>
  </section>`
const portfolio = pagina({
  pad: '/portfolio',
  titel: 'Portfolio: vindbaar online en software op maat | AP Digital',
  beschrijving: 'Websites die gevonden worden en software waar bedrijven dagelijks op draaien, van Flo-Rent tot MoveFlow. Met wat er mis was, wat we bouwden en wat het opleverde.',
  actief: 'portfolio',
  jsonld: [kruimelLd([['Portfolio', '/portfolio']])],
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Portfolio</div>
  <h1>Wat we bouwden, <span class="serif">per tak.</span></h1>
  <p class="lead">Websites die de basis zijn om gevonden te worden, en software waar bedrijven elke dag op draaien. Bovenaan per tak de sterkste, daaronder de rest.</p>
</div></section>
<div class="wrap">
  <div class="tabs" role="tablist" aria-label="Filter op tak"><button class="aan" data-filter="alles">Alles</button><button data-filter="t1">Vindbaar in Google en AI</button><button data-filter="t2">Software en automatisering</button></div>
  ${portfolioBlok('t1', '01 · Vindbaar in Google en AI', 'Websites en vindbaarheid', T1, 'Over vindbaar in Google en AI', TAK.t1)}
  ${portfolioBlok('t2', '02 · Software en automatisering', 'Software en automatisering', T2, 'Over software en automatisering', TAK.t2)}
</div>
${ctaCheck}
`,
})

// ---------- OVER ----------
const persoon = (t, i) => `
<section class="sectie smal"><div class="wrap twee persoon${i % 2 ? ' omgekeerd' : ''}">
  <div class="persoon-foto"><img src="${t.foto}" alt="${t.naam}" width="600" height="750" loading="${i ? 'lazy' : 'eager'}" decoding="async" /></div>
  <div>
    <div class="label">${t.naam} · ${t.rol}</div>
    <h2 style="margin:12px 0 16px">${t.kop}</h2>
    ${t.tekst.map(x => `<p>${x}</p>`).join('')}
  </div>
</div></section>`
const over = pagina({
  pad: '/over',
  titel: 'Over AP Digital en Alexander Prijs | Arnhem',
  beschrijving: 'Wie er achter AP Digital zit: bouwen voor de werkvloer, eerst bij Jacobs Heteren, nu voor jouw bedrijf. Websites, apps en automatisering uit Arnhem.',
  actief: 'over',
  jsonld: [ld({ '@type': 'AboutPage', name: 'Over AP Digital', url: `${SITE}/over`, about: { '@id': `${SITE}/#business` } }), ld({ '@type': 'Person', name: 'Alexander Prijs', jobTitle: 'Oprichter AP Digital', worksFor: { '@id': `${SITE}/#business` }, url: `${SITE}/over` }), kruimelLd([['Over ons', '/over']])],
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Over ons</div>
  <h1>Gebouwd op de werkvloer, <span class="serif">niet in een vergaderzaal.</span></h1>
  <p class="lead">AP Digital komt uit Arnhem. We bouwen websites, apps en automatisering voor bedrijven waar het werk buiten de deur gebeurt: op de weg, op de bouw, in de winkel.</p>
</div></section>
${team.map(persoon).join('')}
${ctaBand()}
`,
})

// ---------- CONTACT (kennismaking) ----------
const contact = pagina({
  pad: '/contact',
  titel: 'Contact en gratis kennismaking | AP Digital Arnhem',
  beschrijving: 'Plan een gratis kennismaking met AP Digital uit Arnhem. Over een nieuwe website, een app op maat of het automatiseren van terugkerend werk. Bel, mail of WhatsApp.',
  actief: 'kennis',
  jsonld: [ld({ '@type': 'ContactPage', name: 'Contact AP Digital', url: `${SITE}/contact`, about: { '@id': `${SITE}/#business` } }), kruimelLd([['Contact', '/contact']])],
  body: `
<section class="pkop raster"><div class="wrap twee">
  <div>
    <div class="label geel">Gratis kennismaking</div>
    <h1>Even <span class="serif">kennismaken?</span></h1>
    <p class="lead">Vertel kort waar je mee zit. We bellen je terug en kijken samen wat zin heeft: een nieuwe site, een app of iets automatiseren. Of niets, dat hoor je dan ook.</p>
    ${contactRegels()}
    <p style="margin-top:22px;font-size:15px">Hebben we jou gebeld over een gratis concept? <a href="/gratis-concept" style="color:var(--geel)">Zo bekijk je het →</a></p>
  </div>
  ${formulier()}
</div></section>
`,
})

// ---------- GRATIS CONCEPT ----------
const conceptFaq = [
  ['Wat kost het concept?', 'Niets. Het is een ontwerp van je voorpagina, geen complete site. Bevalt het, dan bouwen we de hele site vanaf €299. Je zit nergens aan vast.'],
  ['Staat het concept online?', 'Op een verborgen adres dat alleen jij krijgt. Google ziet het niet.'],
  ['Niet gebeld, wel interesse?', 'Plan een gratis kennismaking. Dan kijken we eerst samen naar je site.'],
]
const gratisConcept = pagina({
  pad: '/gratis-concept',
  titel: 'Gratis website-concept voor jouw bedrijf | AP Digital',
  beschrijving: 'Hebben we je gebeld? Dan ligt er al een gratis ontwerp van je nieuwe voorpagina klaar, in je eigen huisstijl. Bekijken kost niets en verplicht je tot niets.',
  actief: 'websites',
  jsonld: [faqLd(conceptFaq), kruimelLd([['Websites', P.websites], ['Gratis concept', '/gratis-concept']])],
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Gratis concept</div>
  <h1>We hebben al een concept <span class="serif">voor je klaargezet.</span></h1>
  <p class="lead">Hebben we je gebeld? Dan ligt er al een ontwerp van je nieuwe voorpagina klaar, in je eigen logo, kleuren en foto's. Je krijgt de link van ons, per mail of WhatsApp.</p>
  <div class="knoppen-rij" style="margin-top:26px"><a class="knop" href="/contact?over=websites">Bespreek je concept</a><a class="knop-2" href="${TEL_HREF}">Bel ${TEL}</a></div>
</div></section>
<section class="sectie smal"><div class="wrap">
  <ol class="stappen">
    <li class="stap" data-reveal><div class="nr">01</div><h3>We kijken naar je site</h3><p>Voor we bellen, bekijken we je huidige site op telefoon en computer.</p></li>
    <li class="stap" data-reveal><div class="nr">02</div><h3>We maken een concept</h3><p>Een ontwerp van je voorpagina, in je eigen huisstijl, met je eigen foto's. Geen stockbeeld.</p></li>
    <li class="stap" data-reveal><div class="nr">03</div><h3>Jij bekijkt het</h3><p>Op je telefoon, wanneer het jou uitkomt. Je zit nergens aan vast.</p></li>
    <li class="stap" data-reveal><div class="nr">04</div><h3>Bevalt het?</h3><p>Dan maken we er een echte site van. Een instapsite kost vanaf €299 en staat binnen 7 dagen live.</p></li>
  </ol>
  <p class="concept-grens">Het concept is een ontwerp van je voorpagina, geen complete site. Bevalt het, dan bouwen we de hele site vanaf €299.</p>
</div></section>
${faqBlok(conceptFaq, 'Over het concept')}
${ctaBand('Zin om je concept <span class="serif">samen door te lopen?</span>', undefined, '/contact?over=websites')}
`,
})

// ---------- DIENSTEN (overzicht, twee takken) ----------
const diensten = pagina({
  pad: '/diensten',
  titel: 'Diensten: vindbaar in Google en AI, software op maat | AP Digital',
  beschrijving: 'Twee dingen uit één hand: vindbaar in Google en AI met een vast maandpakket vanaf €149, en software en automatisering op maat. Websites vanaf €299.',
  jsonld: [kruimelLd([['Diensten', '/diensten']])],
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Diensten</div>
  <h1>Twee dingen, <span class="serif">uit één hand.</span></h1>
  <p class="lead">Gevonden worden in Google en in AI's, met een vast maandpakket. En software die past op hoe je bedrijf werkt, plus automatisering voor het handwerk ertussen. Je kunt met één beginnen en later doorbouwen.</p>
</div></section>
<section class="sectie smal"><div class="wrap">
  ${takKaarten(true)}
</div></section>
<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Verder lezen</div><h2 style="margin-top:12px">Per onderwerp</h2></div></div>
  <ul class="stad-lijst">${[[CHECK, 'Gratis check'], [P.websites, 'Website laten maken'], ['/pakketten', 'Websitepakketten'], ['/website-redesign', 'Bestaande site vernieuwen'], ['/onderhoud-en-hosting', 'Onderhoud en hosting'], ['/restaurant-websites', 'Restaurant websites'], ['/bb-websites', 'B&amp;B websites'], [P.apps, 'Apps op maat'], [P.automatisering, 'Processen automatiseren'], ['/app-laten-maken-arnhem', 'App laten maken in Arnhem'], ['/gratis-concept', 'Je gratis concept']].map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>
</div></section>
<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Zo werken we</div><h2 style="margin-top:12px">In vier stappen</h2></div></div>
  ${stappen}
</div></section>
${ctaBand()}
`,
})

// ---------- PAKKETTEN ----------
const PAKKETTEN = [
  { naam: 'Starter', kop: 'Online in een week.', tekst: 'Voor kleine bedrijven of net opgestart. Een strakke site die werkt.', prijs: '€299', punten: STARTER, knop: ['Vraag website aan', '/contact?over=websites&pakket=Starter'] },
  { naam: 'Groei', kop: 'Groeit mee met je bedrijf.', tekst: 'Meer pagina\'s, ontwerp op maat binnen je huisstijl en beter vindbaar.', prijs: '€499', uitgelicht: true, punten: ['5 tot 7 pagina\'s', 'Ontwerp op maat binnen je huisstijl', 'Mobiel geoptimaliseerd, getest op echte toestellen', 'SEO-basis plus zoekwoordonderzoek en koppeling Search Console', 'Contactformulier met routing naar je inbox', 'Snelle laadtijd, 90+ op mobiel en desktop', 'Live binnen 7 tot 14 dagen', '60 dagen bugfix-support en 1 ronde tekstaanpassingen'], knop: ['Vraag website aan', '/contact?over=websites&pakket=Groei'] },
  { naam: 'Premium', kop: 'Volledig op maat gebouwd.', tekst: 'Voor een grotere site met eigen ontwerp en extra functies.', prijs: '€999', punten: ['8+ pagina\'s, structuur op maat', 'Volledig ontwerp op maat, geen template', 'Mobiel geoptimaliseerd, getest op echte toestellen', 'SEO-basis plus zoekwoordonderzoek, on-page optimalisatie, Search Console', 'Contactformulier plus extra conversie-elementen (offerte, boeking, leadmagnet)', 'Snelle laadtijd, 95+ op mobiel en desktop', 'Live binnen 3 tot 6 weken', '90 dagen bugfix-support en 2 rondes inhoudelijke aanpassingen'], knop: ['Plan kennismaking', '/contact?over=websites&pakket=Premium'] },
]
const ABO = [
  { naam: 'Brons', prijs: '€49,99', punten: ['1 aanpassing per maand', 'Maandelijkse check', 'WhatsApp-support'] },
  { naam: 'Zilver', prijs: '€99,99', populair: true, punten: ['3 aanpassingen per maand', '1 extra pagina per maand', 'Alles uit Brons'] },
  { naam: 'Goud', prijs: '€199,99', punten: ['5 aanpassingen per maand', '2 tot 3 extra pagina\'s per maand', 'Maandelijks SEO-rapport', 'Maandelijks performance-rapport', 'Per kwartaal een upgrade-ronde', 'Alles uit Zilver'] },
]
// FAQ 1-op-1 van de oude pakkettenpagina. Gewijzigd: bugfix-antwoord volgt nu de pakketten (30/60/90 dagen) i.p.v. "eerste jaar gratis".
// Besluit Alex 05-11: hosting en domein zitten NIET bij de websiteprijs, die regelen we apart (aanbod: /onderhoud-en-hosting).
const PAKKET_FAQ = [
  ['Wat zit er allemaal bij de prijs?', 'Ontwerp, bouw en basis SEO, zoals per pakket hierboven staat. Hosting en domein regelen we apart, bijvoorbeeld via <a class="tekst-link" href="/onderhoud-en-hosting">onderhoud en hosting</a>. Geen verborgen kosten.'],
  ['Wat als ik later wijzigingen wil?', 'Aanpassingen tegen uurtarief (€85), of via een maandabonnement (Brons vanaf €49,99, Zilver €99,99, Goud €199,99). Zo blijft je site fris zonder verrassingen.'],
  ['Hoe regel ik hosting en domein?', 'Zelf, bij een partij naar keuze, of via ons met een maandabonnement: daar zitten hosting, SSL en domeinbeheer in. Zie <a class="tekst-link" href="/onderhoud-en-hosting">onderhoud en hosting</a>.'],
  ['Hoe lang duurt het echt?', 'Starter binnen 7 dagen, vaak sneller. Groei tussen 7 en 14 dagen. Premium 3 tot 6 weken, afhankelijk van de omvang.'],
  ['Wat moet ik aanleveren?', 'Wij regelen de basis: logo, tekst en beelden. Heb je eigen materiaal? Lever het aan. Geen foto\'s of video\'s? Wij schieten ze tegen meerprijs. Hoe minimaal of betrokken je wil zijn is aan jou.'],
  ['Krijg ik de website in eigen beheer?', 'Ja. Bij alle pakketten kan een CMS, dan beheer je tekst en foto\'s zelf. Liever niet zelf? Wij doen het via uurtarief of het maandabonnement.'],
  ['Wat als de website later niet goed werkt?', 'Na oplevering lossen we bugs gratis op: 30 dagen bij Starter, 60 dagen bij Groei en 90 dagen bij Premium. Daarna valt onderhoud onder het maandabonnement, of we lossen het op tegen uurtarief.'],
  ['En apps of automatisering?', 'Daar werken we niet met vaste pakketten. Na een gratis gesprek krijg je een vaste prijs op papier, vóór we beginnen. Zie <a class="tekst-link" href="/apps-laten-maken">apps</a> en <a class="tekst-link" href="/processen-automatiseren">automatisering</a>.'],
  ['Werken jullie ook voor bedrijven buiten Gelderland?', 'Ja, heel Nederland. We werken remote, locatie maakt niet uit. Voor klanten in de regio (Arnhem, Ede, Nijmegen, Wageningen) komen we ook gewoon langs.'],
]
const pakketten = pagina({
  pad: '/pakketten',
  titel: 'Website pakketten vanaf €299 | AP Digital',
  beschrijving: 'Bekijk onze website pakketten voor ondernemers. Snel live, professioneel gebouwd en gericht op vertrouwen, conversie en online groei.',
  actief: 'websites',
  jsonld: [
    ld({ '@type': 'OfferCatalog', name: 'Website pakketten AP Digital', url: `${SITE}/pakketten`, itemListElement: PAKKETTEN.map(p => ({ '@type': 'Offer', name: `${p.naam} website`, priceCurrency: 'EUR', price: p.prijs.replace(/\D/g, ''), priceSpecification: { '@type': 'PriceSpecification', minPrice: p.prijs.replace(/\D/g, ''), priceCurrency: 'EUR' }, seller: { '@id': `${SITE}/#business` } })) }),
    faqLd(PAKKET_FAQ), kruimelLd([['Pakketten', '/pakketten']]),
  ],
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Pakketten en prijzen</div>
  <h1>Website pakketten <span class="serif">voor ondernemers.</span></h1>
  <p class="lead">Kies een pakket dat past bij je fase. Van een snelle instapsite tot een grotere site met extra pagina's, SEO en conversie-opbouw. Je weet vooraf wat je betaalt.</p>
</div></section>
<section class="sectie smal" style="padding-top:20px"><div class="wrap">
  <div class="pkgs">${PAKKETTEN.map(p => `<div class="pkg${p.uitgelicht ? ' uitgelicht' : ''}" data-reveal>${p.uitgelicht ? '<span class="pil-los">Meest gekozen</span>' : ''}<div class="pkg-name">${p.naam}</div><h3>${p.kop}</h3><p>${p.tekst}</p><div class="pkg-prijs"><small>vanaf </small>${p.prijs}</div><ul class="vinklijst">${p.punten.map(x => `<li>${x}</li>`).join('')}</ul><a class="${p.uitgelicht ? 'knop' : 'knop-2'}" href="${p.knop[1]}">${p.knop[0]}</a></div>`).join('')}</div>
  <div class="uitleg-blok">Apps en automatisering vallen niet onder deze pakketten. Daar krijg je na een gratis gesprek een vaste prijs, vóór we beginnen. <a class="tekst-link" href="/apps-laten-maken">Apps</a> · <a class="tekst-link" href="/processen-automatiseren">Automatisering</a><br />Daarna vindbaar blijven in Google en AI? Dat is een apart maandpakket, vanaf €149 per maand excl. btw. <a class="tekst-link" href="${T1}">Bekijk de maandpakketten</a></div>
</div></section>
<section class="sectie smal" id="abonnementen"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Onderhoud</div><h2 style="margin-top:12px">Houd je site <span class="serif">fris.</span></h2><p class="lead">Maandabonnementen voor doorlopend onderhoud en kleine wijzigingen. Eén vaste prijs, zonder verrassingen.</p></div></div>
  <div class="abo-grid">${ABO.map(a => `<div class="abo-card" data-reveal>${a.populair ? '<span class="pil-los">Populair</span>' : ''}<div class="abo-name">${a.naam}</div><div class="abo-price">${a.prijs} <small>per maand</small></div><ul class="vinklijst">${a.punten.map(x => `<li>${x}</li>`).join('')}</ul><a class="knop-2 flip-cta" href="/contact?abo=${a.naam}">Vraag aan</a></div>`).join('')}</div>
  <div class="uitleg-blok">Een aanpassing is één wijziging op je site. Denk aan tekst aanpassen, foto vervangen, prijs of openingstijden bijwerken, of een blogpost plaatsen. Grotere veranderingen (nieuwe pagina of redesign) doen we apart op uurtarief of via Goud. Niet-gebruikte aanpassingen vervallen aan het eind van de maand.</div>
</div></section>
${faqBlok(PAKKET_FAQ, 'Veel gestelde vragen')}
${ctaBand('Niet zeker welk pakket <span class="serif">past?</span>', 'Plan een gratis kennismaking. Dan kijken we samen wat je nodig hebt en voorkom je dat je te veel betaalt.')}
`,
})

// ---------- GRATIS CHECK ----------
// Formulier: zelfde Web3Forms-route en id's als /contact (contactForm, formSuccess, looking_for), dus events.js telt de aanvraag.
const checkFaq = [
  ['Wat kost de check?', 'Niets. Het is één pagina met waar je nu staat en de 3 grootste gaten. Wil je daarna verder, dan begint het maandpakket met een volledige nulmeting, die zit bij de start in het pakket.'],
  ['Wanneer krijg ik de check?', 'Binnen 5 werkdagen in je mailbox.'],
  ['Wat moet ik aanleveren?', 'Alleen je website en waar je gevonden wilt worden. De rest zoeken we zelf uit.'],
  ['Zit ik ergens aan vast?', 'Nee. Je krijgt de check, en jij beslist of je er iets mee doet.'],
]
const gratisCheck = pagina({
  pad: CHECK,
  titel: 'Gratis check: hoe vindbaar ben je in Google en AI? | AP Digital',
  beschrijving: 'Gratis en vrijblijvend: één pagina met hoe je nu in Google staat, of AI\'s als ChatGPT je noemen, en de 3 grootste gaten. Binnen 5 werkdagen in je mailbox.',
  actief: 'check',
  jsonld: [faqLd(checkFaq), kruimelLd([['Vindbaar in Google en AI', T1], ['Gratis check', CHECK]])],
  body: `
<section class="pkop raster"><div class="wrap twee">
  <div>
    <div class="label geel">Gratis check</div>
    <h1>Hoe vindbaar ben je <span class="serif">nu echt?</span></h1>
    <p class="lead">Vul je website in. Je krijgt één pagina terug: hoe je nu in Google staat, of de AI's je noemen als iemand om een bedrijf zoals het jouwe vraagt, en de 3 grootste gaten.</p>
    <ul class="vinklijst" style="grid-template-columns:1fr;margin-top:24px"><li>Gratis en vrijblijvend</li><li>Gemeten in Google en 7 AI's</li><li>In gewone taal, op één pagina</li><li>Binnen 5 werkdagen in je mailbox</li></ul>
  </div>
  ${formulier({ knop: 'Vraag mijn gratis check aan', keuzes: false, standaard: 'Gratis check', check: true })}
</div></section>
<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Wat je krijgt</div><h2 style="margin-top:12px">Eén pagina, <span class="serif">zo ziet hij eruit.</span></h2></div></div>
  <div class="check-groot">${checkKaart}</div>
  <p class="m-uitleg" style="margin-top:12px">Voorbeeld met nepdata, verzonnen bedrijf.</p>
  <p class="concept-grens">De check is een momentopname op één pagina, geen volledig plan. De volledige nulmeting (12 vragen, 20 zoektermen en 3 concurrenten) is de start van een maandpakket en zit daarin.</p>
</div></section>
<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Daarna</div><h2 style="margin-top:12px">Zo gaat het <span class="serif">als je verder wilt.</span></h2></div><a class="knop-2" href="${T1}#pakketten">Bekijk de pakketten →</a></div>
  ${maandStappen}
</div></section>
${faqBlok(checkFaq, 'Over de check')}
`,
})

// ---------- STADSPAGINA'S ----------
const stadVoorbeelden = ['florent', 'herbergen', 'rhscooter'].map(id => kaart(proj(id), { rustig: true })).join('')
function stadPagina(s) {
  const waTekst = `Hoi AP Digital, ik wil een website laten maken in ${s.naam}.`
  const anderen = steden.filter(x => x.slug !== s.slug)
  return pagina({
    pad: '/' + s.slug, titel: s.title, beschrijving: s.description, actief: 'websites',
    og: { titel: s.ogTitle, beschrijving: s.ogDescription },
    jsonld: [
      kruimelLd([['Websites laten maken', P.websites], [`Website laten maken in ${s.naam}`, '/' + s.slug]]),
      ld({ '@type': 'Service', serviceType: `Website laten maken in ${s.naam}`, name: `Website laten maken ${s.naam}`, description: s.serviceDescription, provider: BEDRIJF, areaServed: { '@type': 'City', name: s.naam }, url: `${SITE}/${s.slug}` }),
    ],
    body: `
<section class="pkop raster"><div class="wrap">
  <div class="kruimel"><a href="${P.websites}">Websites</a><span>/</span>${s.naam}</div>
  <h1>Website laten maken in <span class="serif">${s.naam}</span></h1>
  <p class="kicker">${s.kicker}</p>
  <p class="lead">${s.lead}</p>
  <div class="knoppen-rij" style="margin-top:26px"><a class="knop" href="#offerte">Vraag een gratis offerte aan</a><a class="knop-2" href="${WA(waTekst)}" target="_blank" rel="noopener">WhatsApp ons</a><a class="knop-2" href="${TEL_HREF}">Bel ${TEL}</a></div>
  <ul class="feiten"><li><strong>Live binnen 7 dagen</strong></li><li>Vaste prijs <strong>vanaf €299</strong></li><li>Reactie binnen 1 werkdag</li><li>Gebouwd in Arnhem</li></ul>
</div></section>

<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Ondernemen in ${s.naam}</div><h2 style="margin-top:12px">${s.waarom.kop}</h2></div>
  <div class="prose">${s.waarom.p.map(x => `<p>${x}</p>`).join('')}</div>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Wat je krijgt</div><h2 style="margin-top:12px">Een instapsite <span class="serif">vanaf €299.</span></h2></div><a class="knop-2" href="/pakketten">Alle pakketten →</a></div>
  <div class="aanbod-grens" style="margin-top:0"><h3>Dit zit in de instapsite</h3><ul class="vinklijst">${STARTER.map(x => `<li>${x}</li>`).join('')}</ul><p>Meer nodig? Alles daarboven valt onder Groei, vanaf €499.</p></div>
  <div class="prose" style="margin-top:34px"><h3 style="margin-bottom:10px">${s.prijs.kop}</h3>${s.prijs.p.map(x => `<p>${x}</p>`).join('')}</div>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Voorbeelden</div><h2 style="margin-top:12px">Websites die we <span class="serif">bouwden.</span></h2></div><a class="knop-2" href="/portfolio#t1">Heel het portfolio →</a></div>
  <div class="klein">${stadVoorbeelden}</div>
</div></section>

<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Voor wie</div><h2 style="margin:12px 0 16px">${s.voorWie.kop}</h2><div class="prose">${s.voorWie.p.map(x => `<p>${x}</p>`).join('')}</div></div>
  <div class="tip"><div class="label geel">Tip</div><h2>${s.tip.kop}</h2>${s.tip.p.map(x => `<p>${x}</p>`).join('')}</div>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Meer dan een website</div><h2 style="margin-top:12px">Loopt je bedrijf vast op <span class="serif">Excel en losse lijstjes?</span></h2><p class="lead">Dan bouwen we dat er gewoon achteraan. Een app die past op je werk, of automatisering voor het handwerk dat elke week terugkomt. Zo draait het al elke dag bij Jacobs Heteren.</p></div></div>
  <div class="knoppen-rij"><a class="knop-2" href="${T2}">Software en automatisering →</a><a class="knop-2" href="${P.apps}">Apps op maat →</a><a class="knop-2" href="${P.automatisering}">Processen automatiseren →</a></div>
</div></section>
${vindbaarBlok}

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Zo werken we</div><h2 style="margin-top:12px">Van eerste gesprek <span class="serif">tot live.</span></h2></div></div>
  ${stappen}
</div></section>

<section class="sectie smal" id="offerte"><div class="wrap twee">
  <div>
    <div class="label geel">Offerte</div>
    <h2 style="margin:12px 0 16px">${s.slot.kop}</h2>
    <p>Vertel kort wat je nodig hebt. Je hoort binnen 1 werkdag van ons, met een vaste prijs vooraf en zonder verkooppraatje. Heb je al een site? Zet de link erbij, dan kijken we er eerst naar.</p>
    ${contactRegels(waTekst)}
  </div>
  ${formulier({ knop: 'Vraag offerte aan', keuzes: false, stad: s.naam, vraag: 'Wat heb je nodig?', standaard: 'Website laten maken' })}
</div></section>

<section class="sectie smal" style="padding-top:0"><div class="wrap">
  <div class="label" style="margin-bottom:14px">Ook in de buurt en daarbuiten</div>
  <ul class="stad-lijst">${anderen.map(x => `<li><a href="/${x.slug}">${x.naam}</a></li>`).join('')}</ul>
</div></section>
`,
  })
}

// ---------- APP LATEN MAKEN ARNHEM ----------
const appArnhemFaq = [
  ['Web-app of een echte app in de App Store?', 'Voor de meeste bedrijven is een web-app de slimste keuze. Die werkt op iPhone, Android en desktop vanuit een en dezelfde code, en je kunt hem op het startscherm zetten als een gewone app. Een native app in de App Store is alleen nodig bij zware eisen zoals offline gebruik of camera- en sensorfuncties. We adviseren eerlijk welke kant het op moet, voordat je iets bouwt.'],
  ['Wat kost een app laten maken?', 'Dat hangt af van wat de app moet doen. Na een gratis gesprek krijg je een vaste prijs op papier, vóór we beginnen. Geen uurtje-factuurtje en geen open eind.'],
  ['Hoe lang duurt het om een app te bouwen?', 'Dat spreken we af in het voorstel. We beginnen liever met een kleine werkende versie en bouwen daarna stap voor stap uit op basis van wat in de praktijk werkt, in plaats van maanden vooraf te plannen.'],
  ['Kan de app koppelen met mijn bestaande software?', 'Ja. We koppelen aan systemen die je al gebruikt, zoals je boekhouding, agenda, e-mail of een bestaande database. Zo hoef je niets dubbel in te voeren en blijft alles op een plek kloppen.'],
  ['Werken jullie ook buiten Arnhem?', 'Ja, heel Nederland. We werken remote, dus locatie maakt niet uit. Voor klanten in de regio Arnhem, Ede, Nijmegen en Wageningen komen we ook gewoon langs.'],
]
const appArnhem = pagina({
  pad: '/app-laten-maken-arnhem',
  titel: 'App laten maken in Arnhem | vaste prijs, snel live | AP Digital',
  beschrijving: 'App of web app laten maken in Arnhem? AP Digital bouwt web-apps, klantenportalen en interne tools die een proces echt simpeler maken. Vaste prijs, eerlijk advies.',
  actief: 'apps',
  jsonld: [dienstLd('App laten maken in Arnhem', 'Web-apps, klantenportalen en interne tools voor ondernemers in Arnhem en omgeving, gebouwd rond het proces dat beter moet. Vaste prijs na een gratis gesprek.', '/app-laten-maken-arnhem', { areaServed: { '@type': 'City', name: 'Arnhem' } }), faqLd(appArnhemFaq), kruimelLd([['Apps', P.apps], ['App laten maken in Arnhem', '/app-laten-maken-arnhem']])],
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="kruimel"><a href="${P.apps}">Apps</a><span>/</span>Arnhem</div>
  <h1>App laten maken in Arnhem die een proces <span class="serif">echt simpeler maakt.</span></h1>
  <p class="lead">Voor ondernemers in Arnhem en omgeving die een handmatig proces willen automatiseren of klanten een eigen portaal willen geven. Geen dure app die niemand opent, maar een tool die je elke dag gebruikt. We adviseren eerlijk welke kant het op moet voordat je iets bouwt.</p>
  <div class="knoppen-rij" style="margin-top:26px"><a class="knop" href="/contact?over=apps">Plan een gratis kennismaking</a><a class="knop-2" href="#werk">Bekijk voorbeelden</a></div>
</div></section>

<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Herken je dit?</div><h2 style="margin-top:12px">Waar de meeste app-plannen <span class="serif">op vastlopen.</span></h2><p style="margin-top:16px">Veel ondernemers lopen al een tijd rond met een idee, maar de drempel is hoog. Vaak terecht, want de meeste app-trajecten gaan op een van deze punten mis.</p></div>
  <ul class="vinklijst" style="grid-template-columns:1fr">
    <li><strong style="color:var(--wit)">Te zwaar opgezet.</strong> Een bureau begint meteen over een native app, terwijl een eenvoudige web-app hetzelfde probleem oplost voor een fractie van de prijs.</li>
    <li><strong style="color:var(--wit)">Het proces blijft handmatig.</strong> Offertes, planning of voorraad gaan nog via Excel, papier en losse appjes. Fouten en dubbel werk sluipen erin.</li>
    <li><strong style="color:var(--wit)">Geen idee waar te beginnen.</strong> Wel een idee, maar geen technische partner die meedenkt over wat haalbaar en betaalbaar is.</li>
    <li><strong style="color:var(--wit)">Gebouwd en daarna stil.</strong> De app is af, maar er is niemand die hem onderhoudt of meegroeit als het bedrijf verandert.</li>
  </ul>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Wat wij anders doen</div><h2 style="margin-top:12px">Eerst het proces, <span class="serif">dan de app.</span></h2></div></div>
  <div class="drie">
    <div><div class="nr">01</div><h3>Web-app, tenzij het echt anders moet</h3><p>Werkt op iPhone, Android en desktop vanuit een code. Op het startscherm te zetten als een gewone app, zonder App Store-gedoe.</p></div>
    <div><div class="nr">02</div><h3>Eerst het proces, dan de app</h3><p>We kijken naar wat je nu handmatig doet en automatiseren juist dat. Geen functies die er goed uitzien maar niemand gebruikt.</p></div>
    <div><div class="nr">03</div><h3>Vaste prijs vooraf</h3><p>Je weet wat het kost voordat we beginnen. Geen open eind, geen verrassingen op de factuur.</p></div>
    <div><div class="nr">04</div><h3>Getest op een echte werkvloer</h3><p>Onze apps draaien elke dag bij Jacobs Heteren, met kantoor, planners en de ploeg op de weg. Wat niet handig werkt, horen we meteen.</p></div>
    <div><div class="nr">05</div><h3>Snel een eerste werkende versie</h3><p>Liever snel iets dat draait en daarna uitbouwen op basis van de praktijk, dan een dik plan vooraf.</p></div>
    <div><div class="nr">06</div><h3>Onderhoud en doorontwikkeling</h3><p>Via een maandabonnement houden we de app actueel en bouwen we mee als je bedrijf verandert.</p></div>
  </div>
</div></section>

<section class="sectie smal" id="werk"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Voorbeelden</div><h2 style="margin-top:12px">Apps die we <span class="serif">bouwden.</span></h2></div><a class="knop-2" href="${P.apps}">Meer over apps →</a></div>
  <div class="cases">${['moveflow', 'urenapp'].map(id => kaart(proj(id))).join('')}</div>
</div></section>

<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Wat we voor je bouwen</div><h2 style="margin:12px 0 16px">De meeste vraag zit in <span class="serif">tools voor binnen.</span></h2><p>Tools die intern tijd besparen of klanten beter bedienen. Ook benieuwd naar een nieuwe site? Kijk dan bij <a class="tekst-link" href="/websites-laten-maken-arnhem">websites laten maken in Arnhem</a> of het <a class="tekst-link" href="/diensten">dienstenoverzicht</a>.</p></div>
  <ul class="vinklijst">
    <li>Klantenportaal met eigen login en dossier</li><li>Intern dashboard voor planning of voorraad</li><li>Urenregistratie en werkbonnen</li><li>Offerte- of aanvraagtool met automatische mail</li><li>Boekings- of reserveringssysteem</li><li>Koppeling tussen systemen die nu los staan</li><li>Veilige login en gebruikersrollen</li><li>Hosting, onderhoud en updates</li>
  </ul>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Hoe het werkt</div><h2 style="margin-top:12px">In vier stappen</h2></div></div>
  <ol class="stappen">
    <li class="stap"><div class="nr">01</div><h3>Kennismaking</h3><p>We bespreken het proces dat beter moet en kijken of een app de juiste oplossing is. Soms is het antwoord eerlijk gezegd nee.</p></li>
    <li class="stap"><div class="nr">02</div><h3>Voorstel met vaste prijs</h3><p>Je krijgt een helder voorstel: wat we bouwen, wat het kost en wanneer het klaar is.</p></li>
    <li class="stap"><div class="nr">03</div><h3>Bouwen in stappen</h3><p>Eerst een werkende versie voor het belangrijkste proces, daarna uitbouwen op basis van wat in de praktijk werkt.</p></li>
    <li class="stap"><div class="nr">04</div><h3>Live en onderhoud</h3><p>De app gaat live, wij houden hem draaiend en bouwen mee als je bedrijf groeit.</p></li>
  </ol>
</div></section>
${faqBlok(appArnhemFaq, 'Veel gestelde vragen')}
${ctaBand('Een idee dat je al een tijd <span class="serif">uitstelt?</span>', 'Leg het in een kort gesprek voor. We zeggen eerlijk of een app de moeite waard is. Daarna krijg je een vaste prijs op papier.', '/contact?over=apps')}
`,
})

// ---------- 404 ----------
const nietGevonden = pagina({
  pad: '/404', titel: '404, pagina niet gevonden | AP Digital', beschrijving: 'Deze pagina bestaat niet. Maar je website wel binnen 7 dagen, vanaf €299.', noindex: true,
  body: `
<section class="pkop raster nietgevonden"><div class="wrap">
  <div class="label geel">404</div>
  <h1>Deze pagina <span class="serif">bestaat niet.</span></h1>
  <p class="lead">Misschien is hij verhuisd of klopt de link niet. Hieronder vind je de weg terug.</p>
  <div class="knoppen-rij" style="margin-top:26px"><a class="knop" href="/">Naar de homepage</a><a class="knop-2" href="/portfolio">Bekijk ons werk</a><a class="knop-2" href="/contact">Contact</a></div>
</div></section>
`,
})

// ---------- OUDE PAGINA'S IN NIEUWE KOP, VOET EN STIJL ----------
// Tekstfixes voor alle oude pagina's (ook in JSON-LD en meta). Elke regel: [zoek, vervang, waarom].
const FIXES = [
  [/href="\/webshops"/g, `href="${P.websites}"`, '/webshops krijgt een 301 naar /websites-laten-maken'],
  [/href="\/horeca-websites"/g, 'href="/restaurant-websites"', '/horeca-websites krijgt een 301 naar /restaurant-websites'],
  [/href="\/casa5\/"/g, 'href="/casa5"', 'zonder slash, anders een extra doorverwijzing'],
  [/href="\/diensten#websites"/g, `href="${P.websites}"`, 'pijlerpagina Websites'],
  [/href="https:\/\/apdigital\.nl\/webshops"/g, `href="${SITE}${P.websites}"`, '301'],
  [/href="(https:\/\/apdigital\.nl)?\/marketing-fit"([^>]*)>apdigital\.nl\/marketing-fit</g, 'href="https://marketing-fit.nl/"$2>marketing-fit.nl<', 'Marketing Fit staat live op eigen domein'],
  [/href="(https:\/\/apdigital\.nl)?\/marketing-fit"/g, 'href="https://marketing-fit.nl/"', 'Marketing Fit staat live op eigen domein'],
  [/Een web-app of klantportaal start vanaf 2\.500 euro\./g, 'Voor een web-app of klantportaal krijg je na een gratis gesprek een vaste prijs.', 'besluit Alex 05-11: apps zonder bedrag'],
  [/Webshops en maatwerk op offerte, web-apps vanaf 2\.500 euro/g, 'Webshops en maatwerk op offerte, web-apps een vaste prijs na een gratis gesprek', 'besluit Alex 05-11: apps zonder bedrag'],
  [/web-apps starten vanaf 2\.500 euro/g, 'voor web-apps krijg je na een gratis gesprek een vaste prijs', 'besluit Alex 05-11: apps zonder bedrag'],
  // Besluit Alex 05-11: hosting en domein zitten niet bij de websiteprijs, die regelen we apart.
  [/ Hosting en domein voor het eerste jaar zitten erbij in\./g, ' Hosting en domein regelen we apart, bijvoorbeeld via <a href="/onderhoud-en-hosting">onderhoud en hosting</a>.', 'hosting/domein apart (besluit Alex 05-11)'],
  [/<li>Hosting, domein en SSL eerste jaar inbegrepen<\/li>/g, '<li>Hosting en domein regelen we apart, via <a href="/onderhoud-en-hosting">onderhoud en hosting</a> of bij een partij naar keuze</li>', 'hosting/domein apart (besluit Alex 05-11)'],
  [/Logo, foto, tekst, contactformulier, hosting en domein eerste jaar inbegrepen\./g, 'Logo, foto, tekst en contactformulier. Hosting en domein regelen we apart.', 'hosting/domein apart (besluit Alex 05-11)'],
  [/\s*<li>Hosting voor het eerste jaar, vanaf jaar 2 vaak rond 12 tot 18 euro per maand\.<\/li>\s*<li>Domeinregistratie voor het eerste jaar, daarna ongeveer 12 euro per jaar\.<\/li>/g, '\n      <li>Hosting en domein zitten niet in de pakketprijs. Die regelen we apart, bijvoorbeeld via <a href="/onderhoud-en-hosting">onderhoud en hosting</a>.</li>', 'hosting/domein apart (besluit Alex 05-11)'],
  [/Bij elk pakket dat we leveren zitten een paar zaken standaard inbegrepen\. Dat scheelt verrassingen achteraf\./g, 'Bij elk pakket zitten een paar zaken standaard, en één ding regelen we apart. Dat scheelt verrassingen achteraf.', 'hosting/domein apart (besluit Alex 05-11)'],
  [/Is hosting en domein bij de prijs inbegrepen\?/g, 'Zitten hosting en domein bij de prijs?', 'hosting/domein apart (besluit Alex 05-11)'],
  [/Bij ons zit hosting en domein voor het eerste jaar standaard in elk pakket\. Vanaf jaar 2 reken je op ongeveer 12 tot 30 euro per maand voor hosting en 12 euro per jaar voor je domein\./g, 'Nee. Hosting en domein regelen we apart van de bouw. Wil je dat wij het voor je regelen, kijk dan bij <a href="/onderhoud-en-hosting">onderhoud en hosting</a>.', 'hosting/domein apart (besluit Alex 05-11)'],
  [/ Hosting en domein zitten het eerste jaar in elk pakket\./g, ' Hosting en domein regelen we apart, zie <a href="/onderhoud-en-hosting">onderhoud en hosting</a>.', 'hosting/domein apart (besluit Alex 05-11)'],
  [/ Hosting en domein eerste jaar inbegrepen\./g, ' Hosting en domein regelen we apart.', 'hosting/domein apart (besluit Alex 05-11)'],
  // Voorwaarden art. 8 (juridisch, concept ter goedkeuring Alex voor livegang).
  [/<p>Bij elk pakket is hosting en domein voor één jaar inbegrepen\. Na het eerste jaar kan de klant kiezen:<\/p>\s*<ul>\s*<li>Doorlopende hosting via AP Digital tegen jaartarief \(op aanvraag\)<\/li>\s*<li>Zelf overnemen van hosting en domein, met technische ondersteuning bij overdracht<\/li>\s*<\/ul>/g, '<p>Hosting en domein vallen niet onder de prijs van een website of pakket en worden apart geregeld. De klant kan kiezen:</p>\n      <ul>\n        <li>Hosting en domein via AP Digital, met een maandabonnement of tegen een tarief op aanvraag</li>\n        <li>Hosting en domein zelf afnemen bij een partij naar keuze, met technische ondersteuning van AP Digital bij het koppelen van de website</li>\n      </ul>', 'voorwaarden art. 8 (besluit Alex 05-11, ter goedkeuring)'],
  // Voorwaarden art. 7 versie 1.2 (go Alex 10-11, bron vault Areas/AP Digital/voorwaarden-art7-concept.md).
  [/<h2>7\. Eigendomsrecht en gebruik<\/h2>\s*<p>Na volledige betaling ontvangt de klant het gebruiksrecht[\s\S]*?<p>AP Digital mag het project gebruiken in haar portfolio, tenzij de klant hier schriftelijk bezwaar tegen maakt\.<\/p>/g, `<h2>7. Eigendom en gebruik</h2>
      <p>7.1 Na volledige betaling is van de klant: de website of app die voor hem is gemaakt, de teksten, foto's en ander materiaal dat voor hem is gemaakt, de pagina's en content uit een maandpakket, de rapporten en zijn eigen gegevens.</p>
      <p>7.2 AP Digital blijft eigenaar van haar eigen bouwstenen: templates, generatoren, meet- en rapportsystemen, en code en onderdelen die AP Digital bij meerdere klanten gebruikt. De klant krijgt een blijvend gebruiksrecht op deze bouwstenen voor zover ze in zijn eigen website of app zitten. Hij mag ze niet los doorverkopen of in een ander product gebruiken.</p>
      <p>7.3 Bij maatwerksoftware (een app of automatisering) krijgt de klant na volledige betaling de broncode van zijn eigen toepassing. AP Digital mag dezelfde bouwstenen en kennis gebruiken voor andere opdrachten.</p>
      <p>7.4 Stopt de samenwerking, dan levert AP Digital op verzoek binnen 14 dagen de bestanden van de website of app, de content en de laatste rapporten aan. Hosting en domein dragen we over zoals in artikel 8 staat. Extra werk bij de overdracht, zoals verhuizen naar een andere partij, rekenen we tegen ons uurtarief.</p>
      <p>7.5 De klant blijft verantwoordelijk voor het materiaal dat hij zelf aanlevert (teksten, foto's, logo's). Bij geschillen over auteursrecht op dat materiaal is de klant aansprakelijk.</p>
      <p>7.6 AP Digital mag het project gebruiken in haar portfolio, tenzij de klant hier schriftelijk bezwaar tegen maakt.</p>`, 'voorwaarden art. 7 v1.2 (go Alex 10-11)'],
  // Blogs gelijk met art. 7 v1.2: eigendom na volledige betaling, bestanden op verzoek binnen 14 dagen, hosting en domein volgens art. 8.
  [/<li>Volledig eigenaarschap\. De site is van jou, je zit niet vast aan ons\.<\/li>/g, '<li>Eigendom na betaling. Na volledige betaling is de site van jou, je zit niet vast aan ons.</li>', 'gelijk met voorwaarden art. 7 v1.2'],
  [/<li>Volledig eigenaarschap, geen lock in\.<\/li>/g, '<li>Na volledige betaling is de site van jou, geen lock in.</li>', 'gelijk met voorwaarden art. 7 v1.2'],
  [/Ja\. Je krijgt de bronbestanden, hosting en domein op jouw naam\. Je zit nergens aan vast en kan altijd wisselen\./g, 'Ja, na volledige betaling is de site van jou. Stop je met ons, dan leveren we op verzoek binnen 14 dagen de bestanden aan. Je zit nergens aan vast en kan altijd wisselen.', 'gelijk met voorwaarden art. 7 v1.2'],
  [/Bij ons altijd, ja\. Je site is van jou\. Wij geven toegang tot hosting, domein en bronbestanden zodat je nooit vastzit aan ons\./g, 'Ja. Na volledige betaling is je site van jou. Stop je met ons, dan leveren we op verzoek binnen 14 dagen de bestanden aan, zodat je nooit vastzit aan ons.', 'gelijk met voorwaarden art. 7 v1.2'],
  // Komt alleen voor in voorwaarden.html.
  [/<div class="updated">Versie 1\.0, 4 mei 2026<\/div>/g, '<div class="updated">Versie 1.2, 10 november 2026</div>', 'voorwaarden v1.2 (go Alex 10-11)'],
  [/\s*[—–]\s*/g, ', ', 'geen em-dashes'],
]
const FIX_LOG = {}
function fix(html, f) {
  for (const [re, nieuw, waarom] of FIXES) {
    const n = (html.match(re) || []).length
    if (n) { FIX_LOG[f] = FIX_LOG[f] || []; FIX_LOG[f].push(`${n}x ${waarom}`) }
    html = html.replace(re, nieuw)
  }
  return html
}
// oklch-kleuren uit de oude stijlregels omzetten naar de huisstijl (grijs of geel).
function oklchNaar(css) {
  return css.replace(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+))?\s*\)/g, (_, L, C, h, a) => {
    const alfa = a === undefined ? 1 : +a
    if (+C > 0.08) return `rgba(255,214,10,${alfa})`
    const y = Math.pow(+L, 3), s = y <= 0.0031308 ? 12.92 * y : 1.055 * Math.pow(y, 1 / 2.4) - 0.055
    const g = Math.max(0, Math.min(255, Math.round(s * 255)))
    return alfa === 1 ? `rgb(${g},${g},${g})` : `rgba(${g},${g},${g},${alfa})`
  })
}
function stijlOmzetten(css) {
  css = oklchNaar(css)
  css = css.replace(/'JetBrains Mono',\s*monospace/g, 'var(--mono)').replace(/'Space Grotesk',\s*[^;]*;/g, 'var(--sans);')
  // De oude kop stond vast bovenin; de nieuwe staat in de stroom. Grote padding-top bovenaan terugbrengen.
  css = css.replace(/padding:\s*(\d{3})px/g, (_, n) => `padding: ${Math.max(40, +n - 84)}px`)
  css = css.replace(/padding-top:\s*(\d{3})px/g, (_, n) => `padding-top: ${Math.max(40, +n - 84)}px`)
  return css
}
const OUDE_PAGINAS = {
  'blog.html': { pad: '/blog', actief: '' },
  'restaurant-websites.html': { pad: '/restaurant-websites', actief: 'websites' },
  'bb-websites.html': { pad: '/bb-websites', actief: 'websites' },
  'website-redesign.html': { pad: '/website-redesign', actief: 'websites' },
  'onderhoud-en-hosting.html': { pad: '/onderhoud-en-hosting', actief: 'websites' },
  'case-casa5.html': { pad: '/case-casa5', actief: 'portfolio' },
  'case-marketing-fit.html': { pad: '/case-marketing-fit', actief: 'portfolio' },
  'voorwaarden.html': { pad: '/voorwaarden', actief: '' },
  'privacy.html': { pad: '/privacy', actief: '' },
}
for (const f of readdirBlogs()) OUDE_PAGINAS[f] = { pad: '/' + f.replace(/\.html$/, ''), actief: '' }
function readdirBlogs() { return ['blog-casa5-in-5-dagen-live.html', 'blog-moderne-website-vs-oude-website.html', 'blog-restaurant-website-voorbeelden.html', 'blog-waarom-lokale-bedrijven-slechte-websites-hebben.html', 'blog-waarom-snelheid-belangrijk-is.html', 'blog-waarom-snelle-websites-meer-aanvragen-opleveren.html', 'blog-wat-kost-een-website-laten-maken.html', 'blog-website-laten-maken-arnhem.html', 'blog-website-laten-maken-of-zelf-bouwen.html'] }

function oudePagina(f, { pad, actief }) {
  let h = fix(oud(f), f)
  const pak = re => (h.match(re) || [, ''])[1]
  const titel = pak(/<title>([^<]*)<\/title>/)
  const beschrijving = pak(/<meta name="description" content="([^"]*)"/)
  const ogTitel = pak(/<meta property="og:title" content="([^"]*)"/)
  const ogBeschrijving = pak(/<meta property="og:description" content="([^"]*)"/)
  const ogType = pak(/<meta property="og:type" content="([^"]*)"/)
  const jsonld = h.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || []
  const kopStijl = (h.slice(0, h.indexOf('</head>')).match(/<style>[\s\S]*?<\/style>/g) || []).map(stijlOmzetten).join('\n')
  // Inhoud: van het begin van de hoofdinhoud tot de oude voet.
  let s = h.indexOf('<a id="main"'); if (s < 0) s = h.indexOf('<main'); if (s < 0) throw new Error('geen begin in ' + f)
  let e = h.indexOf('<!-- SITE FOOTER'); if (e < 0 || e < s) e = h.indexOf('<footer'); if (e < 0 || e < s) e = h.indexOf('<script', s)
  let inhoud = h.slice(s, e)
  inhoud = inhoud.replace(/<a id="main"[^>]*><\/a>/, '')
    .replace(/<\/?main[^>]*>/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<div class="loc-sticky-cta"[\s\S]*?<\/div>/g, '')
    .replace(/<div class="(cursor-dot|scroll-prog)[^"]*"[^>]*><\/div>/g, '')
    .replace(/<div[^>]*id="(cursorDot|scrollProg)"[^>]*><\/div>/g, '')
    .replace(/<style>[\s\S]*?<\/style>/g, m => stijlOmzetten(m))
  return pagina({ pad, titel, beschrijving, actief, og: { titel: ogTitel, beschrijving: ogBeschrijving, type: ogType || 'website' }, jsonld, kopExtra: kopStijl, body: `<div class="oud">\n${inhoud.trim()}\n</div>` })
}

// ---------- schrijven ----------
const pages = {
  'index.html': home,
  'portfolio.html': portfolio,
  'over.html': over,
  'contact.html': contact,
  'gratis-concept.html': gratisConcept,
  'vindbaar-in-google-en-ai.html': tak1,
  'software-en-automatisering.html': tak2,
  'gratis-check.html': gratisCheck,
  'diensten.html': diensten,
  'pakketten.html': pakketten,
  'app-laten-maken-arnhem.html': appArnhem,
  '404.html': nietGevonden,
}
for (const p of pijlers) pages[P[p.key].slice(1) + '.html'] = pijlerPagina(p)
for (const s of steden) pages[s.slug + '.html'] = fix(stadPagina(s), s.slug + '.html')
for (const [f, o] of Object.entries(OUDE_PAGINAS)) pages[f] = oudePagina(f, o)

let fouten = 0
for (const [f, html] of Object.entries(pages)) {
  const zichtbaar = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style>[\s\S]*?<\/style>/g, '')
  if (/[—–]/.test(zichtbaar)) { console.warn('LET OP: streepje in', f); fouten++ }
  writeFileSync(join(ROOT, f), html)
}

// Sitemap: alle indexeerbare pagina's.
const indexeerbaar = Object.keys(pages).filter(f => f !== '404.html').map(f => f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, ''))
const TAKKEN = [T1, T2]
const prio = u => u === '/' ? '1.0' : TAKKEN.includes(u) ? '0.9' : Object.values(P).includes(u) ? '0.9' : /^\/(portfolio|contact|pakketten|diensten|over|gratis-concept|gratis-check)$/.test(u) ? '0.8' : /^\/websites-laten-maken-/.test(u) ? '0.7' : '0.6'
const volgorde = u => u === '/' ? 0 : TAKKEN.includes(u) || Object.values(P).includes(u) ? 1 : /^\/(portfolio|contact|pakketten|diensten|over|gratis-concept|gratis-check)$/.test(u) ? 2 : /^\/websites-laten-maken-/.test(u) ? 4 : /^\/blog/.test(u) ? 5 : 3
indexeerbaar.sort((a, b) => volgorde(a) - volgorde(b) || a.localeCompare(b))
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexeerbaar.map(u => `  <url><loc>${SITE}${u}</loc><lastmod>${VANDAAG}</lastmod><priority>${prio(u)}</priority></url>`).join('\n')}
</urlset>
`)
writeFileSync(join(D, 'fix-log.json'), JSON.stringify(FIX_LOG, null, 1))
console.log(`${Object.keys(pages).length} pagina's, ${indexeerbaar.length} in sitemap, ${fouten} met streepje`)

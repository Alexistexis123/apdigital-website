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
const V = '3' // cache-buster site.css / site.js
const steden = JSON.parse(readFileSync(join(D, 'steden.json'), 'utf8'))
const oud = f => readFileSync(join(OUD, f), 'utf8')
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const kaal = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

const TEL = '06 1416 0265', TEL_HREF = 'tel:+31614160265', MAIL = 'info@apdigital.nl'
const WA = (t = 'Hoi AP Digital, ik heb een vraag.') => `https://wa.me/31614160265?text=${encodeURIComponent(t)}`
const P = { websites: '/websites-laten-maken', apps: '/apps-laten-maken', automatisering: '/processen-automatiseren' }

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
  const l = (href, t, k) => `<a href="${href}"${actief === k ? ' class="actief" aria-current="page"' : ''}>${t}</a>`
  return `<a class="skip-link" href="#main">Naar de inhoud</a>
<header class="kop"><div class="wrap">
  <a class="logo" href="/"><span class="blok">AP</span><span class="woord">AP Digital</span></a>
  <nav class="nav" id="nav" aria-label="Hoofdmenu">
    ${l(P.websites, 'Websites', 'websites')}
    ${l(P.apps, 'Apps', 'apps')}
    ${l(P.automatisering, 'Automatisering', 'automatisering')}
    ${l('/portfolio', 'Portfolio', 'portfolio')}
    ${l('/over', 'Over ons', 'over')}
    <a class="knop" href="/contact">Gratis kennismaking</a>
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
      <p style="font-size:15px">Websites, apps en automatisering voor ondernemers. Gebouwd in Arnhem.</p>
    </div>
    <div><p class="kop4">Wat we bouwen</p><a href="${P.websites}">Websites</a><a href="${P.apps}">Apps op maat</a><a href="${P.automatisering}">Processen en automatisering</a><a href="/website-redesign">Website vernieuwen</a><a href="/onderhoud-en-hosting">Onderhoud en hosting</a><a href="/pakketten">Pakketten en prijzen</a></div>
    <div><p class="kop4">AP Digital</p><a href="/portfolio">Portfolio</a><a href="/over">Over ons</a><a href="/diensten">Diensten</a><a href="/gratis-concept">Je gratis concept</a><a href="/blog">Blog</a></div>
    <div><p class="kop4">Contact</p><a href="/contact">Gratis kennismaking</a><a href="mailto:${MAIL}">${MAIL}</a><a href="${TEL_HREF}">${TEL}</a><a href="${WA()}" target="_blank" rel="noopener">WhatsApp</a></div>
  </div>
  <div class="voet-steden"><p class="kop4">Website laten maken in</p><ul class="stad-lijst">${[...steden].sort((a, b) => a.naam.localeCompare(b.naam)).map(s => `<li><a href="/${s.slug}">${s.naam}</a></li>`).join('')}</ul></div>
  <div class="klein-tekst"><span>© 2026 AP Digital · KVK 42080619 · Arnhem</span><span><a href="/privacy" style="display:inline">Privacy</a> · <a href="/voorwaarden" style="display:inline">Voorwaarden</a></span></div>
</div></footer>
<div class="vast-cta"><a class="knop" href="/contact">Gratis kennismaking</a><a class="knop-2" href="${TEL_HREF}" aria-label="Bel AP Digital">Bel</a></div>`
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

function pagina({ pad, titel, beschrijving, actief = '', body, jsonld = [], og = {}, kopExtra = '', noindex = false, bodyKlasse = '' }) {
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
${METEN}
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
function formulier({ knop = 'Plan mijn kennismaking', keuzes = true, stad = '', vraag = 'Je vraag in een paar zinnen', standaard = '' } = {}) {
  return `<form class="form" id="contactForm" novalidate>
  <input type="hidden" id="pakket" name="pakket" value="" />
  <input type="hidden" id="abo" name="abo" value="" />
  ${stad ? `<input type="hidden" id="stad" name="stad" value="${stad}" />` : ''}
  <input type="hidden" id="looking_for" name="looking_for" value="${standaard}" />
  <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
  <div id="formFields" style="display:grid;gap:16px">
    <div class="rij2"><label class="veld">Naam<input id="name" name="name" autocomplete="name" required /><span class="veld-fout">Vul je naam in</span></label><label class="veld">Bedrijf<input id="company" name="company" autocomplete="organization" /></label></div>
    <div class="rij2"><label class="veld">Telefoon<input id="phone" name="phone" type="tel" autocomplete="tel" /></label><label class="veld">E-mail<input id="email" name="email" type="email" autocomplete="email" /><span class="veld-fout">Vul een e-mailadres of telefoonnummer in</span></label></div>
    ${keuzes ? `<div><span style="display:block;font-size:14px;color:var(--tekst);margin-bottom:8px">Waar gaat het over?</span>
      <div class="keuzes"><label><input type="checkbox" name="over" value="websites" />Website</label><label><input type="checkbox" name="over" value="apps" />App</label><label><input type="checkbox" name="over" value="automatisering" />Automatisering</label><label><input type="checkbox" name="over" value="weet-niet" />Weet ik nog niet</label></div></div>` : ''}
    <label class="veld">${vraag}<textarea id="message" name="message" rows="4"></textarea></label>
    <button class="knop" type="submit">${knop}</button>
    <p class="klein-tekst">We gebruiken je gegevens alleen om contact met je op te nemen. Zie ons <a class="tekst-link" href="/privacy">privacybeleid</a>.</p>
  </div>
  <div class="form-success" id="formSuccess" role="status"><div class="vink"></div><h3>Verstuurd. Bedankt!</h3><p>We reageren binnen 1 werkdag, meestal sneller.</p></div>
</form>`
}

const contactRegels = (waTekst) => `<div class="contact-regels">
  <a href="${TEL_HREF}"><small>Bellen</small>${TEL}</a>
  <a href="${WA(waTekst)}" target="_blank" rel="noopener"><small>WhatsApp</small>Stuur een bericht</a>
  <a href="mailto:${MAIL}"><small>Mail</small>${MAIL}</a>
</div>`

// ---------- HOME ----------
const machine = `
<div class="machine" id="machine" data-stap="0" role="img" aria-label="Voorbeeld met nepdata: een aanvraag komt binnen via de website, staat daarna in de planning en levert vanzelf een offerte en een mail op.">
  <div class="m-raam m-site" data-raam="1">
    <div class="m-balk"><i></i><i></i><i></i><span>jouwbedrijf.nl/offerte</span></div>
    <div class="m-inhoud">
      <div class="m-kop">Offerte aanvragen</div>
      <div class="m-veld"><small>Naam</small><span data-typ="M. de Vries"></span></div>
      <div class="m-veld"><small>Klus</small><span data-typ="Schilderwerk buiten"></span></div>
      <div class="m-veld m-veld-plaats"><small>Plaats</small><span data-typ="Velp"></span></div>
      <div class="m-knop">Aanvraag versturen</div>
    </div>
  </div>
  <div class="m-draad" data-draad="1"><b></b></div>
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
  <div class="m-draad" data-draad="2"><b></b></div>
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
  <li data-s="1"><b>01</b>Aanvraag via je website</li>
  <li data-s="2"><b>02</b>Staat meteen in je planning</li>
  <li data-s="3"><b>03</b>Offerte en mail gaan vanzelf de deur uit</li>
</ol>`

// Cijfers met bron (bron staat in het ontwerp en in de vault, niet op de site).
const cijfers = [
  ['13.337', 'kaarten van de PostLeads-machine bij mensen op de mat, in 19 weken'],
  ['52', 'oude adressen van Flo-Rent netjes doorgestuurd, niemand loopt dood'],
  ['€0', 'hosting per maand voor Her-bergen, alleen het domein kost geld'],
  ['100', 'van 100 voor de SEO-basis in Google Lighthouse, Flo-Rent en RH Scooter'],
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

const home = pagina({
  pad: '/',
  titel: 'Website laten maken in 7 dagen, vanaf 299 euro | AP Digital',
  beschrijving: 'Website laten maken vanaf €299, live binnen 7 dagen. Plus apps en automatisering op maat: gebouwd voor Jacobs Heteren, nu voor jouw bedrijf.',
  og: { titel: 'AP Digital | Websites, apps en automatisering', beschrijving: 'Gebouwd voor Jacobs Heteren, waar het elke dag draait. Nu voor jouw bedrijf.' },
  actief: 'home',
  kopExtra: '<meta name="google-site-verification" content="CgNNQrAZwi1S_UNIU0qI0KRWeE4KUXG3Hbb" />',
  jsonld: [
    ld({ ...BEDRIJF, description: 'AP Digital uit Arnhem bouwt websites, apps op maat en automatisering voor ondernemers.', areaServed: [{ '@type': 'City', name: 'Arnhem' }, { '@type': 'City', name: 'Ede' }, { '@type': 'City', name: 'Nijmegen' }, { '@type': 'City', name: 'Wageningen' }, { '@type': 'Country', name: 'Nederland' }], sameAs: ['https://wa.me/31614160265'] }),
    ld({ '@type': 'WebSite', url: `${SITE}/`, name: 'AP Digital', publisher: { '@id': `${SITE}/#business` }, inLanguage: 'nl-NL' }),
    kruimelLd([]),
  ],
  body: `
<section class="hero2"><div class="wrap">
  <div class="hero-kop">
    <div>
      <div class="label geel">Websites · Apps · Automatisering</div>
      <h1>Gebouwd voor <span class="streep">Jacobs Heteren,</span> waar het elke dag draait. <span class="serif">Nu voor jouw bedrijf.</span></h1>
    </div>
    <div class="hero-rechts">
      <p class="lead">Bij verhuisbedrijf Jacobs Heteren draait elke dag software die wij bouwden: de website, de offertes en planning, de uren van de ploeg. Dat bouwen we nu voor jou: een site die aanvragen binnenhaalt, een app die past op je werk, en het handwerk ertussen dat vanzelf gaat.</p>
      <div class="knoppen-rij"><a class="knop" href="/contact">Plan een gratis kennismaking</a><a class="knop-2" href="#verhalen">Bekijk wat we bouwden</a></div>
    </div>
  </div>
  ${machine}
  <p class="m-uitleg">Zo loopt een aanvraag als je site, planning en offertes aan elkaar hangen. <span>Voorbeeld met nepdata.</span></p>
</div></section>

<div class="tape" aria-hidden="true"><div class="tape-rol"><span>Websites</span><span>Apps op maat</span><span>Automatisering</span><span>Gebouwd in Arnhem</span><span>Elke dag in gebruik bij Jacobs Heteren</span><span>Websites</span><span>Apps op maat</span><span>Automatisering</span><span>Gebouwd in Arnhem</span><span>Elke dag in gebruik bij Jacobs Heteren</span></div></div>

<section class="sectie"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Wat we bouwen</div><h2 style="margin-top:12px">Begin bij je site. <span class="serif">Stop waar het knelt.</span></h2><p class="lead">De meeste klanten komen voor een betere website. Loop je daarna vast op Excel, papier of dubbel overtypen, dan bouwen we dat er gewoon achteraan.</p></div></div>
  <div class="pijlers specialisaties-list">
    ${pijlers.map((p, i) => `<a class="pijler" href="${P[p.key]}" data-reveal style="--d:${i * 90}ms"><div class="ico">${ICO[p.key]}</div><div class="pijler-nr">0${i + 1}</div><h3>${p.naam}</h3><p>${p.kort}</p><ul>${p.voorbeelden.map(v => `<li>${v}</li>`).join('')}</ul><div class="pijler-prijs">${p.prijs}</div><span class="meer">Meer over ${p.naam.toLowerCase()} →</span></a>`).join('')}
  </div>
</div></section>

<section class="sectie cijfer-sectie raster"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">In cijfers</div><h2 style="margin-top:12px">Geen beloftes. <span class="serif">Dit staat er al.</span></h2></div></div>
  <div class="cijfers">
    ${cijfers.map((c, i) => `<div data-reveal style="--d:${i * 80}ms"><strong${/^[\d.]+$/.test(c[0]) ? ` data-tel="${c[0].replace(/\./g, '')}"` : ''}>${c[0]}</strong><span>${c[1]}</span></div>`).join('')}
  </div>
</div></section>

<section class="sectie" id="verhalen"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Uitgelicht werk</div><h2 style="margin-top:12px">Vier klussen, <span class="serif">vier verhalen.</span></h2><p class="lead">Wat er mis was, wat we bouwden en wat het opleverde. Beweeg over een project of tik op het verhaal.</p></div><a class="knop-2" href="/portfolio">Alle projecten →</a></div>
  <div class="cases">
    ${['florent', 'moveflow', 'postleads-machine', 'cockpit'].map(id => kaart(proj(id), { rustig: id === 'moveflow', klasse: 'hc-card' })).join('')}
  </div>
</div></section>

<section class="sectie raster"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Waarom wij</div><h2 style="margin-top:12px">Geen <s class="doorhaal">webbureau.</s> <span class="serif">Bouwers die de werkvloer kennen.</span></h2></div></div>
  <div class="drie">
    <div data-reveal><div class="nr">01</div><h3>Getest op een echte werkvloer</h3><p>Onze apps draaien elke dag bij Jacobs Heteren, met kantoor, planners en de ploeg op de weg. Wat niet handig werkt, horen we meteen.</p></div>
    <div data-reveal style="--d:90ms"><div class="nr">02</div><h3>Site en systeem uit één hand</h3><p>Een formulier op je site is stap één. Dat die aanvraag daarna vanzelf in je planning staat, is stap twee. Wij doen allebei, dus er zit geen gat tussen.</p></div>
    <div data-reveal style="--d:180ms"><div class="nr">03</div><h3>Je belt met wie het bouwt</h3><p>Geen accountmanager ertussen. Wie je aan de lijn hebt, heeft je site of app zelf in elkaar gezet.</p></div>
  </div>
</div></section>

<section class="sectie"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Zo gaat het</div><h2 style="margin-top:12px">Vier gesprekken, <span class="serif">geen verrassingen.</span></h2></div></div>
  ${stappen}
</div></section>
${reviewsBlok}
${ctaBand()}
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
  <div class="sectie-kop"><div><div class="label">Voorbeelden</div><h2 style="margin-top:12px">Zo ziet dat er <span class="serif">in het echt uit.</span></h2></div><a class="knop-2" href="/portfolio#${p.key}">Heel het portfolio →</a></div>
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

// ---------- PORTFOLIO ----------
const portfolio = pagina({
  pad: '/portfolio',
  titel: 'Portfolio: websites, apps en automatisering | AP Digital',
  beschrijving: 'Websites, apps en automatisering die AP Digital bouwde, van Flo-Rent tot MoveFlow. Met wat er mis was, wat we bouwden en wat het opleverde.',
  actief: 'portfolio',
  jsonld: [kruimelLd([['Portfolio', '/portfolio']])],
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Portfolio</div>
  <h1>Wat we bouwden, <span class="serif">per soort werk.</span></h1>
  <p class="lead">Websites voor lokale bedrijven, apps waar bedrijven dagelijks op draaien en automatisering die handwerk overneemt. Bovenaan per soort de sterkste, daaronder de rest.</p>
</div></section>
<div class="wrap">
  <div class="tabs" role="tablist" aria-label="Filter op soort werk"><button class="aan" data-filter="alles">Alles</button><button data-filter="websites">Websites</button><button data-filter="apps">Apps</button><button data-filter="automatisering">Automatisering</button></div>
  ${pijlers.map(p => `
  <section class="pijlerblok" id="${p.key}" data-blok="${p.key}">
    <div class="sectie-kop" style="margin-bottom:24px"><div><div class="label">${p.label}</div><h2 style="margin-top:10px">${p.naam}</h2></div><a class="knop-2" href="${P[p.key]}">Over ${p.naam.toLowerCase()} →</a></div>
    <div class="cases">${uitgelicht(p.key).map(x => kaart(x)).join('')}</div>
    <div class="label sub">Meer ${p.naam.toLowerCase()}</div>
    <div class="klein">${rest(p.key).map(x => kaart(x)).join('')}</div>
  </section>`).join('')}
</div>
${ctaBand('Zie je iets dat je <span class="serif">ook wilt?</span>')}
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

// ---------- DIENSTEN (overzicht) ----------
const diensten = pagina({
  pad: '/diensten',
  titel: 'Diensten: websites, apps en automatisering | AP Digital',
  beschrijving: 'Websites vanaf €299 en live in 7 dagen, apps op maat en automatisering van terugkerend werk. Alles uit één hand, uit Arnhem.',
  jsonld: [kruimelLd([['Diensten', '/diensten']])],
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Diensten</div>
  <h1>Drie dingen, <span class="serif">uit één hand.</span></h1>
  <p class="lead">Een website die aanvragen oplevert, een app die past op je werk en automatisering voor het handwerk ertussen. Je kunt met één beginnen en later doorbouwen.</p>
</div></section>
<section class="sectie smal"><div class="wrap">
  <div class="pijlers">
    ${pijlers.map((p, i) => `<a class="pijler svc-card" href="${P[p.key]}" data-reveal style="--d:${i * 90}ms"><div class="ico">${ICO[p.key]}</div><div class="pijler-nr">0${i + 1}</div><h3>${p.naam}</h3><p>${p.kort}</p><ul>${p.voorbeelden.map(v => `<li>${v}</li>`).join('')}</ul><div class="pijler-prijs">${p.prijs}</div><span class="meer">Meer over ${p.naam.toLowerCase()} →</span></a>`).join('')}
  </div>
</div></section>
<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Ook</div><h2 style="margin-top:12px">Rond je website</h2></div></div>
  <ul class="stad-lijst">${[['/website-redesign', 'Bestaande site vernieuwen'], ['/onderhoud-en-hosting', 'Onderhoud en hosting'], ['/pakketten', 'Pakketten en prijzen'], ['/restaurant-websites', 'Restaurant websites'], ['/bb-websites', 'B&amp;B websites'], ['/app-laten-maken-arnhem', 'App laten maken in Arnhem'], ['/gratis-concept', 'Je gratis concept']].map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>
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
// Hosting en domein eerste jaar: ongewijzigd laten staan, beslispunt Alex (staat niet in de Starter-lijst).
const PAKKET_FAQ = [
  ['Wat zit er allemaal bij de prijs?', 'Hosting, domein 1 jaar, design, bouw en basis SEO. Geen verborgen kosten.'],
  ['Wat als ik later wijzigingen wil?', 'Aanpassingen tegen uurtarief (€85), of via een maandabonnement (Brons vanaf €49,99, Zilver €99,99, Goud €199,99). Zo blijft je site fris zonder verrassingen.'],
  ['Hoe zit het met hosting na het eerste jaar?', 'Na het eerste jaar kun je kiezen, wij blijven hosting en domein voor je beheren, of je neemt het zelf over. We zorgen dat alles soepel overgedragen wordt.'],
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
  <div class="uitleg-blok">Apps en automatisering vallen niet onder deze pakketten. Daar krijg je na een gratis gesprek een vaste prijs, vóór we beginnen. <a class="tekst-link" href="/apps-laten-maken">Apps</a> · <a class="tekst-link" href="/processen-automatiseren">Automatisering</a></div>
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
  <div class="sectie-kop"><div><div class="label">Voorbeelden</div><h2 style="margin-top:12px">Websites die we <span class="serif">bouwden.</span></h2></div><a class="knop-2" href="/portfolio#websites">Heel het portfolio →</a></div>
  <div class="klein">${stadVoorbeelden}</div>
</div></section>

<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Voor wie</div><h2 style="margin:12px 0 16px">${s.voorWie.kop}</h2><div class="prose">${s.voorWie.p.map(x => `<p>${x}</p>`).join('')}</div></div>
  <div class="tip"><div class="label geel">Tip</div><h2>${s.tip.kop}</h2>${s.tip.p.map(x => `<p>${x}</p>`).join('')}</div>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Meer dan een website</div><h2 style="margin-top:12px">Loopt je bedrijf vast op <span class="serif">Excel en losse lijstjes?</span></h2><p class="lead">Dan bouwen we dat er gewoon achteraan. Een app die past op je werk, of automatisering voor het handwerk dat elke week terugkomt. Zo draait het al elke dag bij Jacobs Heteren.</p></div></div>
  <div class="knoppen-rij"><a class="knop-2" href="${P.apps}">Apps op maat →</a><a class="knop-2" href="${P.automatisering}">Processen automatiseren →</a></div>
</div></section>

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
const prio = u => u === '/' ? '1.0' : Object.values(P).includes(u) ? '0.9' : /^\/(portfolio|contact|pakketten|diensten|over|gratis-concept)$/.test(u) ? '0.8' : /^\/websites-laten-maken-/.test(u) ? '0.7' : '0.6'
const volgorde = u => u === '/' ? 0 : Object.values(P).includes(u) ? 1 : /^\/(portfolio|contact|pakketten|diensten|over|gratis-concept)$/.test(u) ? 2 : /^\/websites-laten-maken-/.test(u) ? 4 : /^\/blog/.test(u) ? 5 : 3
indexeerbaar.sort((a, b) => volgorde(a) - volgorde(b) || a.localeCompare(b))
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexeerbaar.map(u => `  <url><loc>${SITE}${u}</loc><lastmod>${VANDAAG}</lastmod><priority>${prio(u)}</priority></url>`).join('\n')}
</urlset>
`)
writeFileSync(join(D, 'fix-log.json'), JSON.stringify(FIX_LOG, null, 1))
console.log(`${Object.keys(pages).length} pagina's, ${indexeerbaar.length} in sitemap, ${fouten} met streepje`)

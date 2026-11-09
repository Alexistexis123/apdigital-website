// Ontwerp "twee takken" (go Alex 09-11-2026). Draai vanuit de repo-root: node ontwerp/_bron/build.mjs
// Schrijft alleen naar ontwerp/. Niet live: noindex (meta + X-Robots-Tag in vercel.json) en robots Disallow /ontwerp.
// Hergebruikt de live stijl (/site.css, /site.js) en de projectdata van de live generator (_bron/data.mjs).
// Geen meetscripts en geen echte formulieren: ontwerp verstuurt niets.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { projecten, verhalen } from '../../_bron/data.mjs'

const D = dirname(fileURLToPath(import.meta.url))
const UIT = join(D, '..')
const steden = JSON.parse(readFileSync(join(D, '..', '..', '_bron', 'steden.json'), 'utf8'))
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const V = '1'

const TEL = '06 1416 0265', TEL_HREF = 'tel:+31614160265', MAIL = 'info@apdigital.nl'
const B = '/ontwerp'
const T1 = `${B}/vindbaar-in-google-en-ai`, T2 = `${B}/software-en-automatisering`, CHECK = `${B}/gratis-check`, PF = `${B}/portfolio`
const note = t => `<span class="note">${t}</span>`

// ---------- beeld en kaarten (zelfde opmaak als live) ----------
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
function beeld(p, rustig = false) {
  if (p.beeld === 'telefoons') return `<div class="beeld telefoons">${p.telefoons.map((f, i) => `<div class="tel tel-${i + 1}">${img(f, i === 0 ? p.alt : '')}</div>`).join('')}</div>`
  if (p.beeld === 'telefoon') return `<div class="beeld" style="display:grid;place-items:center;background:radial-gradient(closest-side,rgba(255,214,10,.12),#141414)"><div class="telefoon" style="width:44%;margin-top:26px;box-shadow:none">${img(p.img, p.alt, ' style="aspect-ratio:534/520"')}</div></div>`
  const mini = p.mobiel && !rustig ? `<div class="mini">${img(p.mobiel, '')}</div>` : ''
  if (p.galerij && !rustig) {
    const beelden = p.galerij.map((g, i) => img(g[0], g[2], ` class="g-beeld${i ? '' : ' aan'}"`)).join('')
    const knoppen = p.galerij.map((g, i) => `<button type="button"${i ? '' : ' class="aan"'} data-i="${i}" aria-label="Toon scherm ${g[1]}">${g[1]}</button>`).join('')
    return `<div class="beeld galerij" data-galerij>${beelden}${mini}<div class="g-knoppen">${knoppen}</div></div>`
  }
  return `<div class="beeld">${img(p.img, p.alt)}${mini}</div>`
}
let teller = 0
function kaart(p, { rustig = false, klasse = '', notitie = '' } = {}) {
  const status = p.status ? `<span class="pil geel">${p.status}</span>` : ''
  const extern = p.url && /^https?:|^\/casa5/.test(p.url)
  const links = [
    p.url ? `<a class="link" href="${p.url}"${extern ? ' target="_blank" rel="noopener"' : ''}>${p.linktekst || 'Bekijk de site'} ↗</a>` : `<span class="link stil">${p.geenlink || 'Demo op aanvraag'}</span>`,
    p.caseUrl ? `<a class="link" href="${p.caseUrl}">Lees de case →</a>` : '',
  ].join('')
  const v = verhalen[p.id] || null
  const kl = `case${v ? ' verhaal-case' : ''}${klasse ? ' ' + klasse : ''}`
  const n = notitie ? note(notitie) : ''
  if (!v) return `<article class="${kl}" data-reveal>
  ${beeld(p, rustig)}
  <div class="tekst">
    <div class="meta"><span class="pil">${p.soort}</span>${status}</div>
    <h3>${p.titel}</h3>
    <p>${p.kort}</p>
    ${p.cijfer ? `<div class="bewijs klein-bewijs"><strong>${p.cijfer[0]}</strong><span>${p.cijfer[1]}</span></div>` : ''}
    <div class="gebouwd">${p.gebouwd.map(g => `<span>${g}</span>`).join('')}</div>
    <div class="links">${links}</div>${n}
  </div>
</article>`
  const vid = `v-${p.id}-${++teller}`
  const cijfer = v.cijfer ? `<div class="bewijs"><strong${/^[\d.]+$/.test(v.cijfer[0]) ? ` data-tel="${v.cijfer[0].replace(/\./g, '')}"` : ''}>${v.cijfer[0]}</strong><span>${v.cijfer[1]}</span></div>` : ''
  return `<article class="${kl}" data-reveal>
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
    <div class="links">${links}</div>${n}
  </div>
</article>`
}
const proj = id => { const p = projecten.find(x => x.id === id); if (!p) throw new Error('onbekend project ' + id); return p }

// ---------- indeling per tak ----------
// Tak 1 = websites (de basis) + het meetwerk (GEO-monitor, SEO-rapportages). Tak 2 = apps + automatisering.
const TAK = {
  t1: { top: ['florent', 'herbergen', 'casa5', 'jacobs'], meer: ['rhscooter', 'marketingfit', 'jmc', 'geo-monitor', 'seo-rapport'] },
  t2: { top: ['moveflow', 'urenapp', 'postleads-machine', 'cockpit'], meer: ['kassa', 'postleads-dashboard', 'social-manager', 'occasioniq', 'ptapp', 'babyapp'] },
}

// ---------- kop, voet, pagina ----------
function kop(actief) {
  const l = (href, t, k) => `<a href="${href}"${actief === k ? ' class="actief" aria-current="page"' : ''}>${t}</a>`
  return `<div class="ontwerpbalk"><div class="wrap"><span>Ontwerp twee takken · niet live · alleen voor Alex</span><span class="knoppen"><button type="button" id="notes-knop">Notities aan</button><a href="/">Live site</a></span></div></div>
<a class="skip-link" href="#main">Naar de inhoud</a>
<header class="kop"><div class="wrap">
  <a class="logo" href="${B}"><span class="blok">AP</span><span class="woord">AP Digital</span></a>
  <nav class="nav" id="nav" aria-label="Hoofdmenu">
    ${l(T1, 'Vindbaar in Google en AI', 't1')}
    ${l(T2, 'Software en automatisering', 't2')}
    ${l(PF, 'Portfolio', 'portfolio')}
    ${l('/over', 'Over ons', 'over')}
    <a class="knop" href="${CHECK}">Gratis check</a>
  </nav>
  <button class="hamburger" id="hamburger" type="button" aria-label="Menu" aria-controls="nav" aria-expanded="false"><span></span><span></span><span></span></button>
</div></header>`
}
function voet() {
  return `<footer class="voet"><div class="wrap">
  <div class="kolommen">
    <div>
      <a class="logo" href="${B}"><span class="blok">AP</span><span class="woord">AP Digital</span></a>
      <div class="tagline"><span class="wit">Digitaal werk</span> dat gewoon werkt.</div>
      <p style="font-size:15px">Vindbaar in Google en AI, en software op maat. Gebouwd in Arnhem.</p>
    </div>
    <div><p class="kop4">Vindbaar in Google en AI</p><a href="${T1}#pakketten">Maandpakketten</a><a href="${CHECK}">Gratis check</a><a href="/websites-laten-maken">Website laten maken</a><a href="/website-redesign">Website vernieuwen</a><a href="/onderhoud-en-hosting">Onderhoud en hosting</a></div>
    <div><p class="kop4">Software en automatisering</p><a href="${T2}">Overzicht</a><a href="/apps-laten-maken">Apps op maat</a><a href="/processen-automatiseren">Processen automatiseren</a><a href="/app-laten-maken-arnhem">App laten maken in Arnhem</a></div>
    <div><p class="kop4">AP Digital</p><a href="${PF}">Portfolio</a><a href="/over">Over ons</a><a href="/blog">Blog</a><a href="/gratis-concept">Je gratis concept</a><a href="/contact">Contact</a><a href="${TEL_HREF}">${TEL}</a></div>
  </div>
  <div class="voet-steden"><p class="kop4">Website laten maken in</p><ul class="stad-lijst">${[...steden].sort((a, b) => a.naam.localeCompare(b.naam)).map(s => `<li><a href="/${s.slug}">${s.naam}</a></li>`).join('')}</ul></div>
  <div class="klein-tekst"><span>© 2026 AP Digital · KVK 42080619 · Arnhem</span><span><a href="/privacy" style="display:inline">Privacy</a> · <a href="/voorwaarden" style="display:inline">Voorwaarden</a></span></div>
</div></footer>
<div class="vast-cta"><a class="knop" href="${CHECK}">Gratis check</a><a class="knop-2" href="${TEL_HREF}" aria-label="Bel AP Digital">Bel</a></div>`
}
function pagina({ titel, beschrijving, actief = '', body, voorstel = '' }) {
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(titel)}</title>
<meta name="description" content="${esc(beschrijving)}" />
<meta name="robots" content="noindex, nofollow" />
<meta name="theme-color" content="#0A0A0A" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preload" href="/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="/site.css?v=4" />
<link rel="stylesheet" href="${B}/ontwerp.css?v=${V}" />
<script>document.documentElement.classList.add('js')</script>
</head>
<body class="notes-uit">
${kop(actief)}
<main id="main" tabindex="-1">
${voorstel ? `<div class="wrap">${note(voorstel)}</div>` : ''}
${body}
</main>
${voet()}
<script defer src="/site.js?v=4"></script>
<script defer src="${B}/ontwerp.js?v=${V}"></script>
</body>
</html>
`
}

// ---------- gedeelde blokken ----------
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

const PAKKETTEN = [
  { naam: 'Basis', prijs: '149', kop: 'Je weet waar je staat.', tekst: 'Elke maand gemeten en de kleine dingen gefixt. Voor wie zijn plek wil houden.', punten: ['Elke maand gemeten in Google en 7 AI\'s', 'Maandrapport van 2 pagina\'s', 'Google-bedrijfsprofiel bijhouden, 1 post per maand', 'Kleine fixes aan je site'] },
  { naam: 'Groei', prijs: '299', uitgelicht: true, kop: 'Elke maand een stap vooruit.', tekst: 'Nieuwe inhoud en beter vindbaar in je eigen regio.', punten: ['Alles uit Basis', '1 nieuwe pagina of artikel per maand', '1 actie voor lokale vindbaarheid of vermeldingen', '8 socialposts per maand'] },
  { naam: 'Vol', prijs: '499', kop: 'Hard groeien.', tekst: 'Meer inhoud, actief reviews verzamelen en je advertenties erbij.', punten: ['Alles uit Groei', '2 nieuwe pagina\'s of artikelen per maand', 'Elke maand een review-actie', 'Advertentiebeheer (budget betaal je apart)'] },
]
const pakketKaarten = (kort = false) => `
<div class="mp-grid">${PAKKETTEN.map((p, i) => `<div class="mp${p.uitgelicht ? ' uitgelicht' : ''}" data-reveal style="--d:${i * 80}ms">
  ${p.uitgelicht ? '<span class="pil-los mp-pil">Onze aanrader</span>' : ''}
  <div class="mp-naam">${p.naam}</div>
  <div class="mp-prijs">€${p.prijs}<small> per maand</small></div>
  ${kort ? '' : `<h3>${p.kop}</h3><p>${p.tekst}</p>`}
  <ul class="vinklijst">${p.punten.map(x => `<li>${x}</li>`).join('')}</ul>
  <a class="${p.uitgelicht ? 'knop' : 'knop-2'}" href="${CHECK}?pakket=${p.naam}">Begin met de gratis check</a>
</div>`).join('')}</div>
<p class="mp-onder">Prijzen per maand, excl. btw. Minimaal 3 maanden, daarna per maand opzegbaar.</p>`

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
  <li class="stap" data-reveal><div class="nr">02</div><h3>Nulmeting</h3><p>Bij de start: 12 vragen die jouw klanten echt stellen, 20 zoektermen en 3 concurrenten. Daar meten we vanaf dan tegen.</p></li>
  <li class="stap" data-reveal><div class="nr">03</div><h3>Elke maand verbeteren</h3><p>Wat het meeste oplevert eerst: pagina's, je Google-profiel, vermeldingen en reviews.</p></li>
  <li class="stap" data-reveal><div class="nr">04</div><h3>Rapport van 2 pagina's</h3><p>Waar je nu staat, vorige maand en je doel. Wat we deden en wat volgende maand komt.</p></li>
</ol>`

const ctaBand = (titel, tekst, href, knop) => `
<section class="sectie smal"><div class="wrap"><div class="cta-band">
  <div><h2>${titel}</h2><p>${tekst}</p></div>
  <div class="acties"><a class="knop" href="${href}">${knop}</a><a class="tel" href="${TEL_HREF}">of bel ${TEL}</a></div>
</div></div></section>`
const ctaCheck = ctaBand('Hoe vindbaar ben jij <span class="serif">nu echt?</span>', 'Doe de gratis check. Je krijgt één pagina terug met waar je staat in Google en de AI\'s, en de 3 grootste gaten. Kost niets, verplicht tot niets.', CHECK, 'Doe de gratis check')
const ctaKennis = ctaBand('Loopt je bedrijf vast op <span class="serif">handwerk en lijstjes?</span>', 'In een gratis gesprek kijken we naar je werkdag. Je hoort eerlijk wat zin heeft om te bouwen, en wat niet. Daarna krijg je een vaste prijs op papier.', '/contact?over=apps', 'Plan een gratis kennismaking')

const faqBlok = (faq, kopTekst = 'Veel gesteld') => `
<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Vragen</div><h2 style="margin-top:12px">${kopTekst}</h2></div>
  <div class="faq">${faq.map(f => `<details class="faq-item"><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}</div>
</div></section>`

const REVIEWS = [
  ['Topbedrijf! Vanaf de eerste stap tot en met de oplevering ben ik ontzettend goed geholpen. Alles werd duidelijk uitgelegd en er werd echt met mij meegedacht. Een ervaren en professionele man die goed luistert naar de wensen van de klant en deze perfect weet om te zetten in een prachtige website. Ik raad dit bedrijf dan ook aan iedereen aan. Bedankt voor onze topwebsite!', 'RH Scooter Service Arnhem'],
  ['Top ervaring met APDigital. Duidelijke communicatie, snel geschakeld en het resultaat mag er zijn: professioneel, snel en werkt perfect op desktop en mobiel. Er werd ook goed meegedacht, ze doen meer dan alleen uitvoeren. Aanrader voor iedereen die een betrouwbare partij zoekt voor een nieuwe website.', 'Laisser-faire'],
  ['Fantastische service!', 'Gijs R.'],
]
const reviewsBlok = `
<section class="sectie smal" id="reviews"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Wat klanten zeggen</div><h2 style="margin-top:12px">Reviews op <span class="serif">Google.</span></h2></div><a class="knop-2" href="https://maps.google.com/?cid=7229055669262186351" target="_blank" rel="noopener">Bekijk ons Google-profiel ↗</a></div>
  <div class="reviews-top"><strong>5,0</strong><span class="sterren" role="img" aria-label="5 van 5 sterren">★★★★★</span><span>op Google (3 reviews)</span></div>
  <div class="reviews">${REVIEWS.map((r, i) => `<figure data-reveal style="--d:${i * 80}ms"><span class="sterren" role="img" aria-label="5 sterren">★★★★★</span><blockquote>${r[0]}</blockquote><figcaption>${r[1]}<span>Google-review</span></figcaption></figure>`).join('')}</div>
  ${note('Zelfde reviews als live (5,0 / 3, stand 05-11). Harvey checkt het aantal vlak voor livegang.')}
</div></section>`

// Nep-formulier: verstuurt niets in het ontwerp.
const nepForm = ({ knop, velden }) => `
<form class="form" id="kennisform" novalidate>
  ${velden}
  <button class="knop" type="submit">${knop}</button>
  <div class="melding" id="melding">Ontwerp: dit formulier verstuurt nog niets.</div>
  <p class="klein-tekst">We gebruiken je gegevens alleen om contact met je op te nemen. Zie ons <a class="tekst-link" href="/privacy">privacybeleid</a>.</p>
</form>`

// ================= HOME =================
const home = pagina({
  titel: 'Vindbaar in Google en AI, websites vanaf €299 | AP Digital',
  beschrijving: 'AP Digital zorgt dat klanten je vinden in Google en in AI\'s als ChatGPT, met een vast maandpakket vanaf €149. Plus software en automatisering op maat.',
  actief: 'home',
  voorstel: 'Voorstel titel home bij livegang: "Vindbaar in Google en AI, websites vanaf €299 | AP Digital" (nu: "Website laten maken in 7 dagen, vanaf 299 euro | AP Digital"). Het woord website blijft erin, de stadspagina\'s blijven de rankende pagina\'s voor "website laten maken &lt;stad&gt;".',
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
  ${note('Hero stuurt nu op tak 1 (het maandpakket). De oude machine (aanvraag naar planning naar offerte) staat nog op de live home en hoort bij tak 2; voorstel: die naar de pagina Software en automatisering. Kop "Digitaal werk dat gewoon werkt." blijft in de voet als merkregel.')}
</div></section>

<div class="tape" aria-hidden="true"><div class="tape-rol"><span>Vindbaar in Google</span><span>Vindbaar in AI</span><span>Vast bedrag per maand</span><span>Software op maat</span><span>Gebouwd in Arnhem</span><span>Eén aanspreekpunt</span><span>Vindbaar in Google</span><span>Vindbaar in AI</span><span>Vast bedrag per maand</span><span>Software op maat</span><span>Gebouwd in Arnhem</span><span>Eén aanspreekpunt</span></div></div>

<section class="sectie"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Wat we doen</div><h2 style="margin-top:12px">Twee dingen. <span class="serif">Die doen we goed.</span></h2><p class="lead">De meeste klanten komen om beter gevonden te worden. Loop je daarna vast op Excel, papier of dubbel overtypen, dan bouwen we dat er gewoon achteraan.</p></div></div>
  <div class="takken">
    <a class="tak tak-1" href="${T1}" data-reveal>
      <div class="tak-nr">01</div>
      <div class="label geel">Het maandpakket</div>
      <h3>Vindbaar in Google en AI</h3>
      <p>Je site is de basis. Elke maand meten we waar je staat, maken we je beter vindbaar en laten we zien wat het deed.</p>
      <ul><li>Gemeten in Google en 7 AI's</li><li>Elke maand verbeteringen</li><li>Rapport van 2 pagina's</li></ul>
      <div class="tak-prijs">vanaf €149 per maand</div>
      <span class="meer">Bekijk de pakketten →</span>
    </a>
    <a class="tak tak-2" href="${T2}" data-reveal style="--d:90ms">
      <div class="tak-nr">02</div>
      <div class="label">Op maat</div>
      <h3>Software en automatisering</h3>
      <p>Apps die passen op hoe jouw bedrijf werkt, en werk dat elke week terugkomt laten we vanzelf lopen.</p>
      <ul><li>Planning, uren en klantportalen</li><li>Rapportages en mails die zichzelf maken</li><li>Eén overzicht voor alles</li></ul>
      <div class="tak-prijs">Vaste prijs na een gratis gesprek</div>
      <span class="meer">Meer over software →</span>
    </a>
  </div>
  ${note('Websites zijn geen eigen pijler meer: ze vallen onder tak 1 als de basis. De €299-instapsite blijft bestaan op /websites-laten-maken en /pakketten (URL\'s en titels gelijk).')}
</div></section>

<section class="sectie cijfer-sectie raster"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Het maandpakket</div><h2 style="margin-top:12px">Elke maand <span class="serif">dezelfde vier stappen.</span></h2></div><a class="knop-2" href="${T1}">Hoe het werkt →</a></div>
  ${maandStappen}
  <div class="label sub" style="margin:40px 0 14px">Wat we elke maand meten</div>
  ${AI_STROOK}
</div></section>

<section class="sectie" id="pakketten"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Pakketten</div><h2 style="margin-top:12px">Een vast bedrag <span class="serif">per maand.</span></h2><p class="lead">Elk pakket begint met een nulmeting. Daarna meten en verbeteren we elke maand, en zie je in twee pagina's wat het deed.</p></div><a class="knop-2" href="${T1}#grens">Wat er wel en niet onder valt →</a></div>
  ${pakketKaarten(true)}
</div></section>

<section class="sectie" id="verhalen"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Uitgelicht werk</div><h2 style="margin-top:12px">Twee takken, <span class="serif">echte projecten.</span></h2><p class="lead">Wat er mis was, wat we bouwden en wat het opleverde. Open een project voor het hele verhaal.</p></div><a class="knop-2" href="${PF}">Alle projecten →</a></div>
  <div class="tak-kop"><span>01 · Vindbaar in Google en AI</span></div>
  <div class="cases">${['florent', 'geo-monitor'].map(id => kaart(proj(id), { klasse: 'hc-card' })).join('')}</div>
  <div class="tak-kop"><span>02 · Software en automatisering</span></div>
  <div class="cases">${['moveflow', 'postleads-machine'].map(id => kaart(proj(id), { rustig: id === 'moveflow', klasse: 'hc-card' })).join('')}</div>
  ${note('Top 4 op home was (05-11): Flo-Rent, MoveFlow, PostLeads-machine, AI-cockpit. Nu 2 per tak: Flo-Rent + GEO-monitor (tak 1), MoveFlow + PostLeads-machine (tak 2). AI-cockpit gaat naar portfolio en de pagina Software. Beslispunt Alex.')}
</div></section>

<section class="sectie cijfer-sectie raster"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">In cijfers</div><h2 style="margin-top:12px">Geen beloftes. <span class="serif">Dit staat er al.</span></h2></div></div>
  <div class="cijfers">
    ${[['100', 'van 100 voor de SEO-basis in Google Lighthouse, Flo-Rent en RH Scooter'], ['52', 'oude adressen van Flo-Rent netjes doorgestuurd, plek in Google behouden'], ['5', 'dagen van eerste gesprek tot live, voor de B&amp;B-site van Casa 5'], ['13.337', 'kaarten van de PostLeads-machine bij mensen op de mat, in 19 weken']].map((c, i) => `<div data-reveal style="--d:${i * 80}ms"><strong${/^[\d.]+$/.test(c[0]) ? ` data-tel="${c[0].replace(/\./g, '')}"` : ''}>${c[0]}</strong><span>${c[1]}</span></div>`).join('')}
  </div>
  ${note('Zelfde vier cijfers als live, andere volgorde (vindbaarheid eerst). Nog geen cijfer van het maandpakket zelf: er is nog geen maandklant. Eerste echte cijfer komt na de eerste hermetingen.')}
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

// ================= TAK 1 =================
const t1Faq = [
  ['Waarom zou ik in AI\'s willen staan?', 'Omdat je klanten het daar ook vragen. Wie ChatGPT of Google vraagt om een goede installateur of kapper in de buurt, krijgt een paar namen. Wij zorgen dat de jouwe daar een eerlijke kans maakt.'],
  ['Hoe snel zie ik verschil?', 'Google en de AI\'s hebben tijd nodig om veranderingen op te pikken. Reken op een paar maanden. Daarom meten we elke maand en starten we met minimaal 3 maanden.'],
  ['Heb ik een nieuwe website nodig?', 'Niet altijd. Is je site goed genoeg om op te bouwen, dan werken we daarop verder. Is hij dat niet, dan zeggen we dat na de check. Een nieuwe site valt buiten het pakket: daarvoor krijg je een aparte offerte, een instapsite kost vanaf €299.'],
  ['Wat krijg ik bij de gratis check?', 'Eén pagina: hoe je nu in Google staat op een paar belangrijke zoektermen, of de 7 AI\'s je noemen als iemand om een bedrijf zoals het jouwe vraagt, en de 3 grootste gaten. Je zit nergens aan vast.'],
  ['Wat staat er in het maandrapport?', 'Twee pagina\'s in gewone taal: waar je nu staat, vorige maand en je doel. Wat we deden en wat we volgende maand gaan doen.'],
  ['Kan ik opzeggen?', 'Na de eerste 3 maanden kun je per maand opzeggen.'],
]
const tak1 = pagina({
  titel: 'Vindbaar in Google en AI, vanaf €149 per maand | AP Digital',
  beschrijving: 'Gevonden worden in Google en in AI\'s als ChatGPT, Gemini en Perplexity. Elke maand gemeten, verbeterd en in een rapport van 2 pagina\'s. Begin met de gratis check.',
  actief: 't1',
  voorstel: 'Nieuwe pagina bij livegang: /vindbaar-in-google-en-ai, titel "Vindbaar in Google en AI, vanaf €149 per maand | AP Digital". Raakt geen bestaande URL.',
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
  ${note('Bron: maandmachine/workflow.md (09-11). Meettools en leveranciers bewust niet genoemd. Search Console vraagt toegang van de klant: bij elke nieuwe klant meteen regelen.')}
</div></section>

<section class="sectie smal" id="gratis-check"><div class="wrap"><div class="concept-band check-band" data-reveal>
  <div class="concept-tekst">
    <div class="label geel">Gratis check</div>
    <h2 style="margin-top:12px">Begin met <span class="serif">de gratis check.</span></h2>
    <p>Je krijgt één pagina terug: hoe je nu in Google staat, of de AI's je noemen, en de 3 grootste gaten. Kijken kost niets en verplicht je tot niets.</p>
    <div class="knoppen-rij" style="margin-top:22px"><a class="knop" href="${CHECK}">Vraag de gratis check aan</a></div>
  </div>
  <ol class="check-lijst"><li><b>Google</b>Waar sta je op de zoektermen die tellen?</li><li><b>7 AI's</b>Noemen ze je als iemand om een bedrijf zoals het jouwe vraagt?</li><li><b>3 gaten</b>Wat het meeste oplevert als je het oplost.</li></ol>
</div></div></section>

<section class="sectie" id="pakketten"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Pakketten</div><h2 style="margin-top:12px">Kies hoe hard <span class="serif">je wilt groeien.</span></h2><p class="lead">Elk pakket begint met een nulmeting: 12 vragen die jouw klanten echt stellen, 20 zoektermen en 3 concurrenten. Daar meten we elke maand tegen.</p></div></div>
  ${pakketKaarten()}
  ${note('Pakketten, prijzen en inhoud 1-op-1 uit workflow.md. "Excl. btw" en de nulmeting als vast onderdeel van de start zijn aannames: beslispunt. Bij Vol staat in de bron "Groei + 2 pagina\'s", hier gelezen als 2 per maand in plaats van 1. "Onze aanrader" in plaats van "meest gekozen", want er is nog geen maandklant.')}
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
    <div class="knoppen-rij" style="margin-top:18px"><a class="knop-2" href="/websites-laten-maken">Website laten maken →</a><a class="knop-2" href="/pakketten">Websitepakketten →</a><a class="knop-2" href="/websites-laten-maken#regio">In jouw regio →</a></div>
  </div>
  ${note('/websites-laten-maken en de 24 stadspagina\'s blijven precies zoals ze zijn (URL, titel, tekst). Voorstel bij livegang: op die pagina\'s alleen een blok "Daarna vindbaar blijven" met link naar deze pagina erbij.')}
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Websites die we bouwden</div><h2 style="margin-top:12px">De basis, <span class="serif">in het echt.</span></h2></div><a class="knop-2" href="${PF}#t1">Heel het portfolio →</a></div>
  <div class="klein">${['florent', 'herbergen', 'rhscooter'].map(id => kaart(proj(id), { rustig: true })).join('')}</div>
</div></section>
${faqBlok(t1Faq)}
${ctaCheck}
`,
})

// ================= TAK 2 =================
const t2Faq = [
  ['Werkt het op telefoon en computer?', 'De apps in ons portfolio werken in de browser, op telefoon en computer, zonder app store.'],
  ['Moet ik alles uit handen geven?', 'Nee. Bij de automatiseringen in ons portfolio zit steeds een moment waarop een mens kijkt of goedkeurt.'],
  ['Werkt het met mijn huidige systemen?', 'Vaak wel. In het gratis gesprek kijken we welke systemen je gebruikt en wat daarmee te koppelen is. Kan het niet netjes, dan zeggen we dat ook.'],
  ['Wat als we later meer willen?', 'Dan bouwen we door op wat er staat. Zo zijn de apps in ons portfolio ook gegroeid.'],
  ['Wat kost het?', 'Dat hangt af van wat het moet doen. Na een gratis gesprek krijg je een vaste prijs op papier, vóór we beginnen. Geen uurtje-factuurtje en geen open eind.'],
]
const machine = `
<div class="machine plan-in ingepland doc-in mail-in" id="machine" data-stap="0" role="img" aria-label="Voorbeeld met nepdata: een aanvraag komt binnen via de website, staat daarna in de planning en levert vanzelf een offerte en een mail op.">
  <div class="m-raam m-site" data-raam="1"><div class="m-balk"><i></i><i></i><i></i><span>jouwbedrijf.nl/offerte</span></div><div class="m-inhoud"><div class="m-kop">Offerte aanvragen</div><div class="m-veld"><small>Naam</small><span data-typ="M. de Vries">M. de Vries</span></div><div class="m-veld"><small>Klus</small><span data-typ="Schilderwerk buiten">Schilderwerk buiten</span></div><div class="m-veld m-veld-plaats"><small>Plaats</small><span data-typ="Velp">Velp</span></div><div class="m-knop">Aanvraag versturen</div></div></div>
  <div class="m-draad vol" data-draad="1"><b></b></div>
  <div class="m-raam m-plan" data-raam="2"><div class="m-balk"><i></i><i></i><i></i><span>Planning · deze week</span></div><div class="m-inhoud"><div class="m-week"><div><small>ma</small><i></i><i class="l"></i></div><div><small>di</small><i class="l"></i></div><div><small>wo</small><i></i><i></i></div><div class="m-do"><small>do</small><i class="l"></i><b class="m-nieuw"><em>De Vries</em><span>Velp</span></b></div><div><small>vr</small><i></i></div></div><div class="m-status"><span class="m-pil">Nieuwe aanvraag</span><span class="m-pil ok">Ingepland do 08:00</span></div></div></div>
  <div class="m-draad vol" data-draad="2"><b></b></div>
  <div class="m-raam m-offerte" data-raam="3"><div class="m-balk"><i></i><i></i><i></i><span>Offerte · automatisch</span></div><div class="m-inhoud"><div class="m-doc"><div class="m-doc-kop"><span class="m-logo"></span><div><b>Offerte</b><small>M. de Vries · Velp</small></div></div><i style="--w:86%"></i><i style="--w:64%"></i><i style="--w:74%"></i><i class="m-tot" style="--w:40%"></i></div><div class="m-mail"><span class="m-vink"></span><div><b>Mail verstuurd</b><small>Offerte staat in de inbox van M. de Vries</small></div></div></div></div>
</div>
<ol class="m-stappen" aria-hidden="true"><li class="aan" data-s="1"><b>01</b>Aanvraag via je website</li><li class="aan" data-s="2"><b>02</b>Staat meteen in je planning</li><li class="aan" data-s="3"><b>03</b>Offerte en mail gaan vanzelf de deur uit</li></ol>`
const tak2 = pagina({
  titel: 'Software op maat en automatisering | AP Digital',
  beschrijving: 'Apps die passen op hoe jouw bedrijf werkt en werk dat vanzelf loopt: planning, uren, klantportaal, rapportages. Gebouwd voor Jacobs Heteren, nu voor jouw bedrijf.',
  actief: 't2',
  voorstel: 'Nieuwe pagina bij livegang: /software-en-automatisering, titel "Software op maat en automatisering | AP Digital". /apps-laten-maken en /processen-automatiseren blijven bestaan als verdieping (eigen zoekwoorden), geen 301 nodig.',
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
  ${note('De machine van de live home staat nu hier: hij laat precies tak 2 zien.')}
</div></section>

<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Herken je dit?</div><h2 style="margin-top:12px">Je bedrijf draait op <span class="serif">Excel en losse briefjes.</span></h2></div>
  <ul class="vinklijst" style="grid-template-columns:1fr"><li>Hetzelfde wordt twee of drie keer overgetypt</li><li>Uren, planning of voorraad staan in verschillende lijsten</li><li>Elke week dezelfde mails en rapportages, met de hand</li><li>Als jij er niet bent, blijft het liggen</li></ul>
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Wat we bouwen</div><h2 style="margin-top:12px">Twee soorten werk, <span class="serif">één bouwer.</span></h2></div></div>
  <div class="takken takken-gelijk">
    <a class="tak" href="/apps-laten-maken" data-reveal>
      <div class="label">Apps op maat</div>
      <h3>Software voor de werkvloer</h3>
      <p>Je eigen stappen en je eigen woorden, op telefoon en computer.</p>
      <ul><li>Planning, dossiers en werkbonnen</li><li>Uren, verlof en declaraties</li><li>Klantportaal, kassa en voorraad</li></ul>
      <span class="meer">Meer over apps →</span>
    </a>
    <a class="tak" href="/processen-automatiseren" data-reveal style="--d:90ms">
      <div class="label">Processen en automatisering</div>
      <h3>Werk dat vanzelf loopt</h3>
      <p>Met jou als controle in plaats van als uitvoerder.</p>
      <ul><li>Gegevens ophalen en koppelen</li><li>Mails, posts en rapporten op vaste momenten</li><li>Eén dashboard in plaats van tien tabbladen</li></ul>
      <span class="meer">Meer over automatisering →</span>
    </a>
  </div>
</div></section>

<section class="sectie smal" id="werk"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Voorbeelden</div><h2 style="margin-top:12px">Zo ziet dat er <span class="serif">in het echt uit.</span></h2></div><a class="knop-2" href="${PF}#t2">Heel het portfolio →</a></div>
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
  <ol class="stappen">
    <li class="stap" data-reveal><div class="nr">01</div><h3>Jij vertelt waar het knelt</h3><p>Aan de telefoon of aan tafel. Wat kost je tijd, wat loopt vast, wat wil je anders.</p></li>
    <li class="stap" data-reveal><div class="nr">02</div><h3>Wij zeggen wat we zouden bouwen</h3><p>En wat we níet zouden doen. Soms is een betere site genoeg, soms is het een app.</p></li>
    <li class="stap" data-reveal><div class="nr">03</div><h3>Je krijgt het op papier</h3><p>Wat we bouwen, wanneer het af is en wat het kost. Pas na jouw ja beginnen we.</p></li>
    <li class="stap" data-reveal><div class="nr">04</div><h3>We bouwen, jij kijkt mee</h3><p>Je ziet tussendoor wat er staat. Daarna live, en we blijven bereikbaar.</p></li>
  </ol>
</div></section>
${faqBlok(t2Faq)}
${ctaKennis}
`,
})

// ================= PORTFOLIO =================
const blok = (id, label, naam, href, linkTekst, lijst) => `
  <section class="pijlerblok" id="${id}" data-blok="${id}">
    <div class="sectie-kop" style="margin-bottom:24px"><div><div class="label">${label}</div><h2 style="margin-top:10px">${naam}</h2></div><a class="knop-2" href="${href}">${linkTekst} →</a></div>
    <div class="cases">${lijst.top.map(x => kaart(proj(x))).join('')}</div>
    <div class="label sub">Meer ${naam.toLowerCase()}</div>
    <div class="klein">${lijst.meer.map(x => kaart(proj(x))).join('')}</div>
  </section>`
const portfolio = pagina({
  titel: 'Portfolio: vindbaar online en software op maat | AP Digital',
  beschrijving: 'Websites die gevonden worden en software waar bedrijven dagelijks op draaien, van Flo-Rent tot MoveFlow. Met wat er mis was, wat we bouwden en wat het opleverde.',
  actief: 'portfolio',
  voorstel: 'Bij livegang: /portfolio blijft dezelfde URL. Titel nu "Portfolio: websites, apps en automatisering | AP Digital", voorstel "Portfolio: vindbaar online en software op maat | AP Digital" (pagina heeft geen noemenswaardig verkeer).',
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Portfolio</div>
  <h1>Wat we bouwden, <span class="serif">per tak.</span></h1>
  <p class="lead">Websites die de basis zijn om gevonden te worden, en software waar bedrijven elke dag op draaien. Bovenaan per tak de sterkste, daaronder de rest.</p>
</div></section>
<div class="wrap">
  <div class="tabs" role="tablist" aria-label="Filter op tak"><button class="aan" data-filter="alles">Alles</button><button data-filter="t1">Vindbaar in Google en AI</button><button data-filter="t2">Software en automatisering</button></div>
  ${blok('t1', '01 · Vindbaar in Google en AI', 'Websites en vindbaarheid', T1, 'Over vindbaar in Google en AI', TAK.t1)}
  ${note('Tak 1 toont nu websites plus het meetwerk (GEO-monitor, SEO-rapportages). Nog geen maandpakket-klant om te laten zien; Rubens en Frits bewust niet genoemd (geen toestemming).')}
  ${blok('t2', '02 · Software en automatisering', 'Software en automatisering', T2, 'Over software en automatisering', TAK.t2)}
</div>
${ctaCheck}
`,
})

// ================= GRATIS CHECK =================
const checkFaq = [
  ['Wat kost de check?', 'Niets. Het is één pagina met waar je nu staat en de 3 grootste gaten. Wil je daarna verder, dan begint het maandpakket met een volledige nulmeting.'],
  ['Wat moet ik aanleveren?', 'Alleen je website en waar je gevonden wilt worden. De rest zoeken we zelf uit.'],
  ['Zit ik ergens aan vast?', 'Nee. Je krijgt de check, en jij beslist of je er iets mee doet.'],
]
const gratisCheck = pagina({
  titel: 'Gratis check: hoe vindbaar ben je in Google en AI? | AP Digital',
  beschrijving: 'Gratis en vrijblijvend: één pagina met hoe je nu in Google staat, of AI\'s als ChatGPT je noemen, en de 3 grootste gaten. Vraag je check aan.',
  actief: 'check',
  voorstel: 'Nieuwe pagina bij livegang: /gratis-check. /gratis-concept blijft bestaan als aanbod bij het bellen (besluit 05-11). Formulier bij livegang via dezelfde route als /contact (Web3Forms naar info@apdigital.nl, events.js telt de aanvraag).',
  body: `
<section class="pkop raster"><div class="wrap twee">
  <div>
    <div class="label geel">Gratis check</div>
    <h1>Hoe vindbaar ben je <span class="serif">nu echt?</span></h1>
    <p class="lead">Vul je website in. Je krijgt één pagina terug: hoe je nu in Google staat, of de AI's je noemen als iemand om een bedrijf zoals het jouwe vraagt, en de 3 grootste gaten.</p>
    <ul class="vinklijst" style="grid-template-columns:1fr;margin-top:24px"><li>Gratis en vrijblijvend</li><li>Gemeten in Google en 7 AI's</li><li>In gewone taal, op één pagina</li></ul>
    ${note('Levertijd van de check (bijv. "binnen 2 werkdagen") bewust niet genoemd: eerst vaststellen hoe lang het echt duurt. Beslispunt Alex.')}
  </div>
  ${nepForm({ knop: 'Vraag mijn gratis check aan', velden: `
  <div class="rij2"><label class="veld">Naam<input name="name" autocomplete="name" required /></label><label class="veld">Bedrijf<input name="company" autocomplete="organization" /></label></div>
  <label class="veld">Je website<input name="website" type="url" inputmode="url" placeholder="jouwbedrijf.nl" /></label>
  <div class="rij2"><label class="veld">Telefoon<input name="phone" type="tel" autocomplete="tel" /></label><label class="veld">E-mail<input name="email" type="email" autocomplete="email" /></label></div>
  <label class="veld">Waar wil je op gevonden worden?<input name="zoekterm" placeholder="bijv. loodgieter Velp" /></label>` })}
</div></section>
<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Wat je krijgt</div><h2 style="margin-top:12px">Eén pagina, <span class="serif">zo ziet hij eruit.</span></h2></div></div>
  <div class="check-groot">${checkKaart}</div>
  <p class="m-uitleg" style="margin-top:12px">Voorbeeld met nepdata, verzonnen bedrijf.</p>
  <p class="concept-grens">De check is een momentopname op één pagina, geen volledig plan. De volledige nulmeting (12 vragen, 20 zoektermen en 3 concurrenten) is de start van een maandpakket.</p>
</div></section>
<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Daarna</div><h2 style="margin-top:12px">Zo gaat het <span class="serif">als je verder wilt.</span></h2></div><a class="knop-2" href="${T1}#pakketten">Bekijk de pakketten →</a></div>
  ${maandStappen}
</div></section>
${faqBlok(checkFaq, 'Over de check')}
`,
})

// ---------- schrijven ----------
const pages = { 'index.html': home, 'vindbaar-in-google-en-ai.html': tak1, 'software-en-automatisering.html': tak2, 'portfolio.html': portfolio, 'gratis-check.html': gratisCheck }
let fouten = 0
for (const [f, html] of Object.entries(pages)) {
  const zichtbaar = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style>[\s\S]*?<\/style>/g, '')
  if (/[—–]/.test(zichtbaar)) { console.warn('LET OP: streepje in', f); fouten++ }
  writeFileSync(join(UIT, f), html)
}
console.log(`${Object.keys(pages).length} ontwerppagina's, ${fouten} met streepje`)

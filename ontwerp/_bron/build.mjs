// Generator voor het klikbare ontwerp (herstart AP Digital, 04-11-2026). Draai: node ontwerp/_bron/build.mjs
// Schrijft de HTML-pagina's naar ontwerp/. Alleen ontwerp, noindex, niet live.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { projecten, pijlers, verhalen, team } from './data.mjs'
import { doorlichting, gscTotaal } from './doorlichting.mjs'

const UIT = join(dirname(fileURLToPath(import.meta.url)), '..')
const B = '/ontwerp'
const ph = t => `<span class="ph">${t}</span>`

const ICO = {
  websites: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/></svg>',
  apps: '<svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
  automatisering: '<svg viewBox="0 0 24 24"><path d="M4 7h10M4 17h6M14 7a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM10 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM16 17h4"/></svg>',
}

function kop(actief) {
  const l = (href, t, k) => `<a href="${B}${href}"${actief === k ? ' class="actief"' : ''}>${t}</a>`
  return `
<div class="ontwerpbalk"><div class="wrap"><span>Ontwerp herstart · niet live · alleen voor Alex</span><span class="knoppen"><button type="button" id="notes-knop">Notities aan</button><a href="${B}/doorlichting">Doorlichting</a></span></div></div>
<header class="kop"><div class="wrap">
  <a class="logo" href="${B}/"><span class="blok">AP</span><span class="woord">AP Digital</span></a>
  <nav class="nav" id="nav">
    ${l('/websites', 'Websites', 'websites')}
    ${l('/apps', 'Apps', 'apps')}
    ${l('/automatisering', 'Automatisering', 'automatisering')}
    ${l('/portfolio', 'Portfolio', 'portfolio')}
    ${l('/over', 'Over ons', 'over')}
    <a class="knop" href="${B}/kennismaking">Gratis kennismaking</a>
  </nav>
  <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
</div></header>`
}

function voet() {
  return `
<footer class="voet"><div class="wrap">
  <div class="kolommen">
    <div>
      <a class="logo" href="${B}/"><span class="blok">AP</span><span class="woord">AP Digital</span></a>
      <div class="tagline"><span class="wit">Digitaal werk</span> dat gewoon werkt.</div>
      <p style="font-size:15px">Websites, apps en automatisering voor ondernemers. Gebouwd in Arnhem.</p>
      <span class="note">Brandbook-regel (besluit Alex 05-11).</span>
    </div>
    <div><h4>Wat we bouwen</h4><a href="${B}/websites">Websites</a><a href="${B}/apps">Apps op maat</a><a href="${B}/automatisering">Processen en automatisering</a><a href="${B}/portfolio">Portfolio</a></div>
    <div><h4>AP Digital</h4><a href="${B}/over">Over ons</a><a href="${B}/kennismaking">Gratis kennismaking</a><a href="${B}/gratis-concept">Je gratis concept</a><a href="/blog">Blog</a><a href="/privacy">Privacy</a><a href="/voorwaarden">Voorwaarden</a></div>
    <div><h4>Contact</h4><a href="mailto:info@apdigital.nl">info@apdigital.nl</a><a href="tel:+31614160265">06 1416 0265</a><a href="${B}/kennismaking">Plan een kennismaking</a></div>
  </div>
  <div class="klein-tekst"><span>AP Digital · KVK 42080619 · Arnhem</span><span>Ontwerp ${new Date().toISOString().slice(0, 10)}</span></div>
</div></footer>
<div class="vast-cta"><a class="knop" href="${B}/kennismaking">Gratis kennismaking</a><a class="knop-2" href="tel:+31614160265" aria-label="Bellen">Bel</a></div>`
}

function pagina({ titel, beschrijving, actief, body }) {
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>${titel}</title>
<meta name="description" content="${beschrijving}" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta name="theme-color" content="#0A0A0A" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${B}/ontwerp.css?v=4" />
<script>document.documentElement.classList.add('js')</script>
</head>
<body class="notes-uit">
${kop(actief)}
<main>
${body}
</main>
${voet()}
<script src="${B}/ontwerp.js?v=2"></script>
</body>
</html>
`
}

// ---------- bouwstenen ----------
function beeld(p) {
  if (p.beeld === 'tekst') {
    const volgt = p.schermenVolgen ? '<div class="stempel-volgt">Schermen volgen · nepdata</div>' : ''
    return `<div class="beeld"><div class="tekstpaneel">${p.punten.map((t, i) => `<div class="rij"><b>${i + 1}</b><span>${t[0]}<small>${t[1]}</small></span></div>`).join('')}</div>${volgt}</div>`
  }
  if (p.beeld === 'nep') {
    // Voorlopig beeld tot de echte schermen (nepdata) binnen zijn: menu = wat we bouwden, geen verzonnen cijfers.
    const menu = p.gebouwd.map((g, i) => `<span${i === 0 ? ' class="aan"' : ''}>${g}</span>`).join('')
    const h = [44, 66, 52, 88, 61, 74, 57]
    return `<div class="beeld"><div class="nepscherm"><div class="zij"><em>${p.titel.split(' ')[0]}</em>${menu}</div><div class="hoofd"><div class="titel">${p.gebouwd[0]}</div><div class="tegels"><b></b><b></b><b></b></div><div class="grafiek">${h.map(x => `<i style="--h:${x}%"></i>`).join('')}</div></div><div class="stempel">Echt scherm volgt · nepdata</div></div></div>`
  }
  if (p.beeld === 'telefoons') {
    return `<div class="beeld telefoons">${p.telefoons.map((f, i) => `<div class="tel tel-${i + 1}"><img src="${B}/img/${f}" alt="${i === 0 ? p.alt : ''}" decoding="async" loading="lazy" /></div>`).join('')}</div>`
  }
  if (p.beeld === 'telefoon') {
    return `<div class="beeld" style="display:grid;place-items:center;background:radial-gradient(closest-side,rgba(255,214,10,.12),#141414)"><div class="telefoon" style="width:44%;margin-top:26px;box-shadow:none"><img src="${B}/img/${p.img}" alt="${p.alt}" decoding="async" style="aspect-ratio:534/520" /></div></div>`
  }
  const mini = p.mobiel ? `<div class="mini"><img src="${B}/img/${p.mobiel}" alt="" decoding="async" loading="lazy" /></div>` : ''
  return `<div class="beeld"><img src="${B}/img/${p.img}" alt="${p.alt}" decoding="async" loading="lazy" />${mini}</div>`
}

function kaart(p) {
  const status = p.status ? `<span class="pil geel">${p.status}</span>` : ''
  const link = p.url
    ? `<a class="link" href="${p.url}" target="_blank" rel="noopener">${p.linktekst || 'Bekijk de site'} ↗</a>`
    : `<span class="link stil">${p.geenlink || 'Werkt achter inlog, demo op aanvraag'}</span>`
  const notitie = p.notitie ? `<span class="note">${p.notitie}</span>` : ''
  const v = verhalen[p.id] || null
  if (!v) {
    return `<article class="case" data-pijler="${p.pijler}" data-reveal>
  ${beeld(p)}
  <div class="tekst">
    <div class="meta"><span class="pil">${p.soort}</span>${status}</div>
    <h3>${p.titel}</h3>
    <p>${p.kort}</p>
    ${p.cijfer ? `<div class="bewijs klein-bewijs"><strong>${p.cijfer[0]}</strong><span>${p.cijfer[1]}</span></div><span class="note">Bron: ${p.bron}</span>` : ''}
    <div class="gebouwd">${p.gebouwd.map(g => `<span>${g}</span>`).join('')}</div>
    ${notitie}
    ${link}
  </div>
</article>`
  }
  const vid = `v-${p.id}-${++kaartTeller}`
  const cijfer = v.cijfer ? `<div class="bewijs"><strong${/^[\d.]+$/.test(v.cijfer[0]) ? ` data-tel="${v.cijfer[0].replace(/\./g, '')}"` : ''}>${v.cijfer[0]}</strong><span>${v.cijfer[1]}</span></div>` : ''
  return `<article class="case verhaal-case" data-pijler="${p.pijler}" data-reveal>
  ${beeld(p)}
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
    <span class="note">Bron: ${v.bron}</span>
    ${notitie}
    ${link}
  </div>
</article>`
}
let kaartTeller = 0

const perPijler = k => projecten.filter(p => p.pijler === k)
const uitgelicht = k => perPijler(k).filter(p => p.top)
const rest = k => perPijler(k).filter(p => !p.top)

const ctaBand = (titel = 'Benieuwd wat er bij jou <span class="serif">te winnen valt?</span>') => `
<section class="sectie smal"><div class="wrap"><div class="cta-band">
  <div><h2>${titel}</h2><p>In een kennismaking kijken we samen naar je site en je werkdag. Je hoort eerlijk wat zin heeft en wat niet.</p>
  <span class="note">Duur en vorm van de kennismaking (bellen, langskomen, online) nog vastleggen. Nu bewust zonder belofte over duur.</span></div>
  <div class="acties"><a class="knop" href="${B}/kennismaking">Plan een gratis kennismaking</a><a class="tel" href="tel:+31614160265">of bel 06 1416 0265</a></div>
</div></div></section>`

const stappen = `
<ol class="stappen">
  <li class="stap" data-reveal><div class="nr">01</div><h3>Jij vertelt waar het knelt</h3><p>Aan de telefoon of aan tafel. Wat kost je tijd, wat loopt vast, wat wil je anders.</p></li>
  <li class="stap" data-reveal><div class="nr">02</div><h3>Wij zeggen wat we zouden bouwen</h3><p>En wat we níet zouden doen. Soms is een betere site genoeg, soms is het een app.</p></li>
  <li class="stap" data-reveal><div class="nr">03</div><h3>Je krijgt het op papier</h3><p>Wat we bouwen, wanneer het af is en wat het kost. Pas na jouw ja beginnen we.</p></li>
  <li class="stap" data-reveal><div class="nr">04</div><h3>We bouwen, jij kijkt mee</h3><p>Je ziet tussendoor wat er staat. Daarna live, en we blijven bereikbaar. ${ph('Onderhoud en support: aanbod nog te besluiten')}</p></li>
</ol>`

// Hero-machine: een aanvraag loopt van website naar planning naar offerte + mail. Nepdata, puur illustratie.
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

// Cijfers met bron. Alleen wat we zelf gezien hebben (04-11-2026).
const cijfers = [
  ['13.337', 'kaarten van de PostLeads-machine bij mensen op de mat, in 19 weken', 'Bevestigde drukkersopdrachten week 27 t/m 45 2026 (postleads data/weekcijfers.json), aangeleverd door Pim, niet zelf ingezien.'],
  ['52', 'oude adressen van Flo-Rent netjes doorgestuurd, niemand loopt dood', 'florent/site/vercel.json, live steekproef 04-11.'],
  ['€0', 'hosting per maand voor Her-bergen, alleen het domein kost geld', 'Vault her-berg/Current.md, nagemeten 15-10 (Cloudflare Worker, gratis plan).'],
  ['100', 'van 100 voor de SEO-basis in Google Lighthouse, Flo-Rent en RH Scooter', 'Eigen Lighthouse-meting 04-11-2026, mobiel, 2 runs per site, allebei 100. Snelheidsscore was 77-88: die noemen we bewust niet.'],
]

// ---------- HOME ----------
const home = pagina({
  titel: 'AP Digital | Websites, apps en automatisering (ontwerp)',
  beschrijving: 'Websites, apps en automatisering. Gebouwd voor Jacobs Heteren, waar het elke dag draait. Nu voor jouw bedrijf.',
  actief: 'home',
  body: `
<section class="hero2"><div class="wrap">
  <div class="hero-kop">
    <div>
      <div class="label geel">Websites · Apps · Automatisering</div>
      <h1>Gebouwd voor <span class="streep">Jacobs Heteren,</span> waar het elke dag draait. <span class="serif">Nu voor jouw bedrijf.</span></h1>
    </div>
    <div class="hero-rechts">
      <p class="lead">Bij verhuisbedrijf Jacobs Heteren draait elke dag software die wij bouwden: de website, de offertes en planning, de uren van de ploeg. Dat bouwen we nu voor jou: een site die aanvragen binnenhaalt, een app die past op je werk, en het handwerk ertussen dat vanzelf gaat.</p>
      <div class="knoppen-rij"><a class="knop" href="${B}/kennismaking">Plan een gratis kennismaking</a><a class="knop-2" href="#verhalen">Bekijk wat we bouwden</a></div>
    </div>
  </div>
  <span class="note">Kernzin van Alex (05-11): de apps zijn gebouwd voor Jacobs Heteren, en dat mag met naam. Prijs staat bewust alleen bij websites (pijlerkaart hieronder en pijlerpagina).</span>
  ${machine}
  <p class="m-uitleg">Zo loopt een aanvraag als je site, planning en offertes aan elkaar hangen. <span>Voorbeeld met nepdata.</span></p>
</div></section>

<div class="tape" aria-hidden="true"><div class="tape-rol"><span>Websites</span><span>Apps op maat</span><span>Automatisering</span><span>Gebouwd in Arnhem</span><span>Elke dag in gebruik bij Jacobs Heteren</span><span>Websites</span><span>Apps op maat</span><span>Automatisering</span><span>Gebouwd in Arnhem</span><span>Elke dag in gebruik bij Jacobs Heteren</span></div></div>

<section class="sectie"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Wat we bouwen</div><h2 style="margin-top:12px">Begin bij je site. <span class="serif">Stop waar het knelt.</span></h2><p class="lead">De meeste klanten komen voor een betere website. Loop je daarna vast op Excel, papier of dubbel overtypen, dan bouwen we dat er gewoon achteraan.</p></div></div>
  <div class="pijlers">
    ${pijlers.map((p, i) => `<a class="pijler" href="${B}/${p.slug}" data-reveal style="--d:${i * 90}ms"><div class="ico">${ICO[p.key]}</div><div class="pijler-nr">0${i + 1}</div><h3>${p.naam}</h3><p>${p.kort}</p><ul>${p.voorbeelden.map(v => `<li>${v}</li>`).join('')}</ul><div class="pijler-prijs">${p.prijs}</div><span class="meer">Meer over ${p.naam.toLowerCase()} →</span></a>`).join('')}
  </div>
</div></section>

<section class="sectie cijfer-sectie raster"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">In cijfers</div><h2 style="margin-top:12px">Geen beloftes. <span class="serif">Dit staat er al.</span></h2></div></div>
  <div class="cijfers">
    ${cijfers.map((c, i) => `<div data-reveal style="--d:${i * 80}ms"><strong${/^[\d.]+$/.test(c[0]) ? ` data-tel="${c[0].replace(/\./g, '')}"` : ''}>${c[0]}</strong><span>${c[1]}</span><span class="note">Bron: ${c[2]}</span></div>`).join('')}
  </div>
</div></section>

<section class="sectie" id="verhalen"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Uitgelicht werk</div><h2 style="margin-top:12px">Vier klussen, <span class="serif">vier verhalen.</span></h2><p class="lead">Wat er mis was, wat we bouwden en wat het opleverde. Beweeg over een project of tik op het verhaal.</p></div><a class="knop-2" href="${B}/portfolio">Alle projecten →</a></div>
  <div class="cases">
    ${['florent', 'moveflow', 'postleads-machine', 'cockpit'].map(id => kaart(projecten.find(p => p.id === id))).join('')}
  </div>
  <span class="note">De vier van Alex (05-11): Flo-Rent, MoveFlow, PostLeads-machine, AI-cockpit. Kassa, uren-app en PostLeads-klantportaal staan op de pijlerpagina Apps.</span>
</div></section>

<section class="sectie raster"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Waarom wij</div><h2 style="margin-top:12px">Geen <s class="doorhaal">webbureau.</s> <span class="serif">Bouwers die de werkvloer kennen.</span></h2></div></div>
  <div class="drie">
    <div data-reveal><div class="nr">01</div><h3>Getest op een echte werkvloer</h3><p>Onze apps draaien elke dag bij Jacobs Heteren, met kantoor, planners en de ploeg op de weg. Wat niet handig werkt, horen we meteen.</p></div>
    <div data-reveal style="--d:90ms"><div class="nr">02</div><h3>Site en systeem uit één hand</h3><p>Een formulier op je site is stap één. Dat die aanvraag daarna vanzelf in je planning staat, is stap twee. Wij doen allebei, dus er zit geen gat tussen.</p></div>
    <div data-reveal style="--d:180ms"><div class="nr">03</div><h3>Je belt met wie het bouwt</h3><p>Geen accountmanager ertussen. Wie je aan de lijn hebt, heeft je site of app zelf in elkaar gezet.</p></div>
  </div>
  <span class="note">Punt 01 volgt de kernzin van Alex (05-11): gebouwd voor Jacobs Heteren, waar het elke dag draait. Punt 03 klopt zolang Alex en de maat zelf bouwen en bellen.</span>
</div></section>

<section class="sectie"><div class="wrap">
  <div class="sectie-kop" data-reveal><div><div class="label">Zo gaat het</div><h2 style="margin-top:12px">Vier gesprekken, <span class="serif">geen verrassingen.</span></h2></div></div>
  ${stappen}
</div></section>

<section class="sectie smal alleen-notes" style="padding-top:0"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Wat klanten zeggen</div><h2 style="margin-top:12px">Reviews</h2></div><a class="knop-2" href="https://g.page/r/CW935XvUw1JkEBM/review" target="_blank" rel="noopener">Bekijk ons Google-profiel ↗</a></div>
  <span class="note">Hier komen de echte Google-reviews, met een getal dat live wordt opgehaald of met de hand gecontroleerd voor livegang. Geen aantal of score uit oude notities overnemen.</span>
</div></section>

${ctaBand()}
`,
})

// Gratis concept (besluit Alex 05-11): aanbod bij het bellen. De agents zetten het concept vooraf klaar.
const conceptBlok = `
<section class="sectie smal"><div class="wrap"><div class="concept-band" data-reveal>
  <div class="concept-tekst">
    <div class="label geel">Gratis concept</div>
    <h2 style="margin-top:12px">We hebben al een concept <span class="serif">voor je klaargezet.</span></h2>
    <p>Hebben we je gebeld? Dan hebben we vooraf alvast een concept van je nieuwe homepage gemaakt, met je eigen logo, kleuren en foto's. Kijken kost niets en verplicht je tot niets.</p>
    <div class="knoppen-rij" style="margin-top:22px"><a class="knop" href="${B}/gratis-concept">Bekijk hoe het werkt</a></div>
  </div>
  <div class="concept-beeld" aria-hidden="true"><div class="concept-scherm"><div class="m-balk"><i></i><i></i><i></i><span>jouwbedrijf.nl · concept</span></div><div class="concept-skelet"><div class="sk-nav"><b></b><i></i><i></i><i></i><em></em></div><div class="sk-hero"><div><i style="--w:88%"></i><i style="--w:70%"></i><i class="dun" style="--w:80%"></i><i class="dun" style="--w:60%"></i><em></em></div><div class="sk-foto"></div></div><div class="sk-rij"><span></span><span></span><span></span></div></div><span class="concept-stempel">Concept · voor jou klaargezet</span></div></div>
</div></div></section>`

// ---------- PIJLERPAGINA ----------
function pijlerPagina(p) {
  const top = uitgelicht(p.key), meer = rest(p.key)
  return pagina({
    titel: `${p.naam} | AP Digital (ontwerp)`,
    beschrijving: p.kort,
    actief: p.key,
    body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">${p.label}</div>
  <h1>${p.h1}</h1>
  <p class="lead">${p.intro}</p>
  <div class="knoppen-rij" style="margin-top:26px"><a class="knop" href="${B}/kennismaking?over=${p.key}">Plan een gratis kennismaking</a><a class="knop-2" href="#werk">Bekijk voorbeelden</a></div>
  <span class="note">Voorgestelde URL bij livegang: ${p.url}. ${p.urlNotitie}</span>
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
  <div class="sectie-kop"><div><div class="label">Voorbeelden</div><h2 style="margin-top:12px">Zo ziet dat er <span class="serif">in het echt uit.</span></h2></div><a class="knop-2" href="${B}/portfolio#${p.key}">Heel het portfolio →</a></div>
  <div class="cases">${top.map(kaart).join('')}</div>
  ${meer.length ? `<div class="label sub" style="margin:40px 0 16px">Meer ${p.naam.toLowerCase()}</div><div class="klein">${meer.map(kaart).join('')}</div>` : ''}
</div></section>

<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Aanbod</div><h2 style="margin-top:12px">Wat het kost</h2><p class="lead">${p.key === 'websites' ? 'Een instapsite kost vanaf €299 en staat binnen 7 dagen live. Wil je meer, dan krijg je na een gratis gesprek een vaste prijs, vóór we beginnen.' : 'Geen uurtje-factuurtje en geen open eind. Na een gratis gesprek krijg je een vaste prijs op papier, vóór we beginnen.'}</p></div></div>
  <div class="aanbod">${p.aanbod.map(a => `<div><h3>${a[0]}</h3><p>${a[1]}</p><div class="aanbod-prijs"><strong>${a[2] || 'Vaste prijs'}</strong><span>${a[3] || 'na een gratis gesprek'}</span></div></div>`).join('')}</div>
  ${p.aanbodGrens ? `<p style="margin-top:16px">${ph(p.aanbodGrens)}</p>` : ''}
  <span class="note">Besluit Alex 05-11: alleen websites krijgen een vanaf-prijs (vanaf €299, 7 dagen, de 53 titels blijven gelijk). Apps en automatisering: vaste prijs na een gratis gesprek, geen bedrag. Elke belofte krijgt nog een grens: wat valt eronder, wat kost extra.</span>
</div></section>

${p.key === 'websites' ? conceptBlok : ''}
<section class="sectie smal"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Zo werken we</div><h2 style="margin-top:12px">In vier stappen</h2></div></div>
  ${stappen}
</div></section>

<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Vragen</div><h2 style="margin-top:12px">Veel gesteld</h2></div>
  <div class="faq">${p.faq.map(f => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}</div>
</div></section>

${ctaBand(p.cta)}
`,
  })
}

// ---------- PORTFOLIO ----------
const portfolio = pagina({
  titel: 'Portfolio | AP Digital (ontwerp)',
  beschrijving: 'Websites, apps en automatisering die we bouwden.',
  actief: 'portfolio',
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Portfolio</div>
  <h1>Wat we bouwden, <span class="serif">per soort werk.</span></h1>
  <p class="lead">Websites voor lokale bedrijven, apps waar bedrijven dagelijks op draaien en automatisering die handwerk overneemt. Bovenaan per soort de sterkste, daaronder de rest.</p>
  <span class="note">Niet in het portfolio (besluit Alex 04-11): Prijs Liftservice, Clevair, Radiant Peptides, Perfume Dupe Finder, Website Opportunity Finder en alle prospect-demo's. De huidige portfolio toont nog Bij Daan en losse demo's; die gaan eruit.</span>
</div></section>
<div class="wrap">
  <div class="tabs" role="tablist"><button class="aan" data-filter="alles">Alles</button><button data-filter="websites">Websites</button><button data-filter="apps">Apps</button><button data-filter="automatisering">Automatisering</button></div>
  ${pijlers.map(p => `
  <section class="pijlerblok" id="${p.key}" data-blok="${p.key}">
    <div class="sectie-kop" style="margin-bottom:24px"><div><div class="label">${p.label}</div><h2 style="margin-top:10px">${p.naam}</h2></div><a class="knop-2" href="${B}/${p.slug}">Over ${p.naam.toLowerCase()} →</a></div>
    <div class="cases">${uitgelicht(p.key).map(kaart).join('')}</div>
    <div class="label sub">Meer ${p.naam.toLowerCase()}</div>
    <div class="klein">${rest(p.key).map(kaart).join('')}</div>
  </section>`).join('')}
</div>
${ctaBand('Zie je iets dat je <span class="serif">ook wilt?</span>')}
`,
})

// ---------- OVER ----------
// Team komt uit data.mjs (team). De maat erbij = een tweede object daar; layout schakelt vanzelf naar twee personen.
const persoon = (t, i) => `
<section class="sectie smal${i ? '' : ''}"><div class="wrap twee persoon${i % 2 ? ' omgekeerd' : ''}">
  <div class="persoon-foto"><img src="${t.foto}" alt="${t.naam}" loading="${i ? 'lazy' : 'eager'}" decoding="async" /></div>
  <div>
    <div class="label">${t.naam} · ${t.rol}</div>
    <h2 style="margin:12px 0 16px">${t.kop}</h2>
    ${t.tekst.map(x => `<p>${x}</p>`).join('')}
    ${t.notitie ? `<span class="note">${t.notitie}</span>` : ''}
  </div>
</div></section>`
const over = pagina({
  titel: 'Over ons | AP Digital (ontwerp)',
  beschrijving: 'Wie er achter AP Digital zit: bouwen voor de werkvloer, eerst bij Jacobs Heteren, nu voor jouw bedrijf.',
  actief: 'over',
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Over ons</div>
  <h1>Gebouwd op de werkvloer, <span class="serif">niet in een vergaderzaal.</span></h1>
  <p class="lead">AP Digital komt uit Arnhem. We bouwen websites, apps en automatisering voor bedrijven waar het werk buiten de deur gebeurt: op de weg, op de bouw, in de winkel.</p>
  <span class="note">Besluit Alex 05-11: nu alleen Alex. De maat erbij = een tweede persoon in data.mjs (team: naam, rol, foto, tekst), verder niets aanpassen.</span>
</div></section>
${team.map(persoon).join('')}
${ctaBand()}
`,
})

// ---------- KENNISMAKING ----------
const kennis = pagina({
  titel: 'Gratis kennismaking | AP Digital (ontwerp)',
  beschrijving: 'Plan een gratis kennismaking met AP Digital.',
  actief: 'kennis',
  body: `
<section class="pkop raster"><div class="wrap twee">
  <div>
    <div class="label geel">Gratis kennismaking</div>
    <h1>Even <span class="serif">kennismaken?</span></h1>
    <p class="lead">Vertel kort waar je mee zit. We bellen je terug en kijken samen wat zin heeft: een nieuwe site, een app of iets automatiseren. Of niets, dat hoor je dan ook.</p>
    <p style="margin-top:22px"><a class="knop-2" href="tel:+31614160265">Liever direct bellen: 06 1416 0265</a></p>
    <p style="margin-top:18px;font-size:15px">Hebben we jou gebeld over een gratis concept? <a href="${B}/gratis-concept" style="color:var(--geel)">Zo bekijk je het →</a></p>
    <span class="note">Formulier is in dit ontwerp niet gekoppeld. Bij livegang hetzelfde adres als nu (info@apdigital.nl) plus de bestaande conversiemeting uit events.js.</span>
  </div>
  <form class="form" id="kennisform">
    <div class="rij2"><label>Naam<input name="naam" autocomplete="name" /></label><label>Bedrijf<input name="bedrijf" autocomplete="organization" /></label></div>
    <div class="rij2"><label>Telefoon<input name="tel" type="tel" autocomplete="tel" /></label><label>E-mail<input name="mail" type="email" autocomplete="email" /></label></div>
    <div><label style="margin-bottom:8px">Waar gaat het over?</label>
      <div class="keuzes"><label><input type="checkbox" name="over" value="websites" />Website</label><label><input type="checkbox" name="over" value="apps" />App</label><label><input type="checkbox" name="over" value="automatisering" />Automatisering</label><label><input type="checkbox" name="over" value="weet-niet" />Weet ik nog niet</label></div></div>
    <label>Je vraag in een paar zinnen<textarea name="vraag" rows="4"></textarea></label>
    <button class="knop" type="submit">Plan mijn kennismaking</button>
    <div class="melding" id="melding">Ontwerp: dit formulier verstuurt nog niets.</div>
  </form>
</div></section>
`,
})

// ---------- GRATIS CONCEPT ----------
// Besluit Alex 05-11: /gratis-concept blijft, als aanbod bij het bellen. Agents maken het concept vooraf.
const gratisConcept = pagina({
  titel: 'Gratis concept voor je nieuwe website | AP Digital (ontwerp)',
  beschrijving: 'We hebben al een concept van je nieuwe website klaargezet. Bekijken kost niets en verplicht je tot niets.',
  actief: 'websites',
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Gratis concept</div>
  <h1>We hebben al een concept <span class="serif">voor je klaargezet.</span></h1>
  <p class="lead">Hebben we je gebeld? Dan ligt er al een concept van je nieuwe homepage klaar, in je eigen logo, kleuren en foto's. Je krijgt de link van ons, per mail of WhatsApp.</p>
  <div class="knoppen-rij" style="margin-top:26px"><a class="knop" href="${B}/kennismaking?over=websites">Bespreek je concept</a><a class="knop-2" href="tel:+31614160265">Bel 06 1416 0265</a></div>
  <span class="note">Bestaande URL /gratis-concept blijft (heeft vertoningen). Was de landingspagina van de Meta-advertentie; nu de opvolging na een belletje.</span>
</div></section>
<section class="sectie smal"><div class="wrap">
  <ol class="stappen">
    <li class="stap" data-reveal><div class="nr">01</div><h3>We kijken naar je site</h3><p>Voor we bellen, bekijken we je huidige site op telefoon en computer.</p></li>
    <li class="stap" data-reveal><div class="nr">02</div><h3>We maken een concept</h3><p>Eén homepage, in je eigen huisstijl, met je eigen foto's. Geen stockbeeld.</p></li>
    <li class="stap" data-reveal><div class="nr">03</div><h3>Jij bekijkt het</h3><p>Op je telefoon, wanneer het jou uitkomt. Je zit nergens aan vast.</p></li>
    <li class="stap" data-reveal><div class="nr">04</div><h3>Bevalt het?</h3><p>Dan maken we er een echte site van. Een instapsite kost vanaf €299 en staat binnen 7 dagen live.</p></li>
  </ol>
  <p style="margin-top:18px">${ph('Grens nog vastleggen: het concept is één homepage, geen complete site; wat er bij de instapsite hoort volgt uit het aanbod.')}</p>
</div></section>
<section class="sectie smal"><div class="wrap twee">
  <div><div class="label">Vragen</div><h2 style="margin-top:12px">Over het concept</h2></div>
  <div class="faq">
    <details><summary>Wat kost het concept?</summary><p>Niets. Je hoeft er ook niets voor terug te doen.</p></details>
    <details><summary>Staat het concept online?</summary><p>Op een verborgen adres dat alleen jij krijgt. Google ziet het niet.</p></details>
    <details><summary>Niet gebeld, wel interesse?</summary><p>Plan een gratis kennismaking. Dan kijken we eerst samen naar je site.</p></details>
  </div>
</div></section>
${ctaBand('Zin om je concept <span class="serif">samen door te lopen?</span>')}
`,
})

// ---------- DOORLICHTING ----------
const kl = { blijft: 'o-blijft', herschrijf: 'o-herschrijf', weg: 'o-weg', nieuw: 'o-nieuw' }
const dl = pagina({
  titel: 'Doorlichting apdigital.nl | ontwerp herstart',
  beschrijving: 'Per pagina: blijft, herschrijven of weg.',
  actief: '',
  body: `
<section class="pkop"><div class="wrap">
  <div class="label geel">Doorlichting · 04-11-2026</div>
  <h1 style="font-size:clamp(32px,4.6vw,52px)">Wat blijft, wat wordt herschreven, <span class="serif">wat gaat weg.</span></h1>
  <p class="lead">Search Console, periode ${gscTotaal.periode} (28 dagen), opgehaald uit de dagelijkse pull van ${gscTotaal.bijgewerkt}. Positie = gemiddelde GSC-positie, geen echte plek in Google.</p>
</div></section>
<section class="sectie smal" style="padding-top:0"><div class="wrap">
  <div class="kpi">
    <div><strong>${gscTotaal.klikken}</strong><span>klikken in 28 dagen</span></div>
    <div><strong>${gscTotaal.vertoningen.toLocaleString('nl-NL')}</strong><span>vertoningen (som per pagina)</span></div>
    <div><strong>${gscTotaal.stadAandeel}%</strong><span>daarvan op de 24 stadspagina's</span></div>
    <div><strong>${gscTotaal.top10}</strong><span>pagina's met minstens 1 klik</span></div>
  </div>
  <p>${gscTotaal.conclusie}</p>
  <div class="tabel-wrap" style="margin-top:22px"><table class="dl">
    <thead><tr><th>Pagina</th><th>Vert.</th><th>Klik</th><th>Pos.</th><th>Oordeel</th><th>Wat en waarom</th></tr></thead>
    <tbody>${doorlichting.map(r => `<tr><td>${r.pad.startsWith('(') || r.o === 'nieuw' ? r.pad : `<a href="${r.pad}" target="_blank" rel="noopener">${r.pad}</a>`}</td><td class="num">${r.v ?? '0'}</td><td class="num">${r.k ?? '0'}</td><td class="num">${r.pos ?? '-'}</td><td><span class="oordeel ${kl[r.o]}">${r.o}</span></td><td>${r.w}</td></tr>`).join('')}</tbody>
  </table></div>
</div></section>
`,
})

const pages = {
  'index.html': home,
  'portfolio.html': portfolio,
  'over.html': over,
  'kennismaking.html': kennis,
  'gratis-concept.html': gratisConcept,
  'doorlichting.html': dl,
}
for (const p of pijlers) pages[`${p.slug}.html`] = pijlerPagina(p)
for (const [f, html] of Object.entries(pages)) {
  if (/[–—]/.test(html.replace(/content: "−"/g, ''))) console.warn('LET OP: streepje in', f)
  writeFileSync(join(UIT, f), html)
  console.log('geschreven', f)
}

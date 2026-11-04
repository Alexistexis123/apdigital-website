// Generator voor het klikbare ontwerp (herstart AP Digital, 04-11-2026). Draai: node ontwerp/_bron/build.mjs
// Schrijft de HTML-pagina's naar ontwerp/. Alleen ontwerp, noindex, niet live.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { projecten, pijlers } from './data.mjs'
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
<div class="ontwerpbalk"><div class="wrap"><span>Ontwerp herstart · niet live · alleen voor Alex</span><span class="knoppen"><button type="button" id="notes-knop">Notities uit</button><a href="${B}/doorlichting">Doorlichting</a></span></div></div>
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
      <div class="tagline">Digitaal werk dat gewoon werkt.</div>
      <p style="font-size:15px">Websites, apps en automatisering voor ondernemers. Vanuit Arnhem.</p>
    </div>
    <div><h4>Wat we bouwen</h4><a href="${B}/websites">Websites</a><a href="${B}/apps">Apps op maat</a><a href="${B}/automatisering">Processen en automatisering</a><a href="${B}/portfolio">Portfolio</a></div>
    <div><h4>AP Digital</h4><a href="${B}/over">Over ons</a><a href="${B}/kennismaking">Gratis kennismaking</a><a href="/blog">Blog</a><a href="/privacy">Privacy</a><a href="/voorwaarden">Voorwaarden</a></div>
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
<link rel="stylesheet" href="${B}/ontwerp.css?v=1" />
</head>
<body>
${kop(actief)}
<main>
${body}
</main>
${voet()}
<script src="${B}/ontwerp.js?v=1"></script>
</body>
</html>
`
}

// ---------- bouwstenen ----------
function beeld(p) {
  if (p.beeld === 'tekst') {
    return `<div class="beeld"><div class="tekstpaneel">${p.punten.map((t, i) => `<div class="rij"><b>${i + 1}</b><span>${t[0]}<small>${t[1]}</small></span></div>`).join('')}</div></div>`
  }
  if (p.beeld === 'nep') {
    return `<div class="beeld"><div class="nepscherm"><div class="zij"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="hoofd"><div class="titel">${p.titel}</div><div class="tegels"><b></b><b></b><b></b></div><div class="grafiek"><i style="height:40%"></i><i style="height:62%"></i><i style="height:48%"></i><i style="height:86%"></i><i style="height:58%"></i><i style="height:70%"></i></div></div><div class="stempel">Screenshot volgt · nepdata</div></div></div>`
  }
  if (p.beeld === 'telefoon') {
    return `<div class="beeld" style="display:grid;place-items:center;background:radial-gradient(closest-side,rgba(255,214,10,.12),#141414)"><div class="telefoon" style="width:44%;margin-top:26px;box-shadow:none"><img src="${B}/img/${p.img}" alt="${p.alt}" decoding="async" style="aspect-ratio:534/520" /></div></div>`
  }
  const mini = p.mobiel ? `<div class="mini"><img src="${B}/img/${p.mobiel}" alt="" decoding="async" /></div>` : ''
  return `<div class="beeld"><img src="${B}/img/${p.img}" alt="${p.alt}" decoding="async" />${mini}</div>`
}

function kaart(p) {
  const status = p.status ? `<span class="pil geel">${p.status}</span>` : ''
  const link = p.url
    ? `<a class="link" href="${p.url}" target="_blank" rel="noopener">${p.linktekst || 'Bekijk de site'} ↗</a>`
    : `<span class="link stil">${p.geenlink || 'Werkt achter inlog, demo op aanvraag'}</span>`
  const notitie = p.notitie ? `<span class="note">${p.notitie}</span>` : ''
  return `<article class="case" data-pijler="${p.pijler}">
  ${beeld(p)}
  <div class="tekst">
    <div class="meta"><span class="pil">${p.soort}</span>${status}</div>
    <h3>${p.titel}</h3>
    <p>${p.kort}</p>
    <div class="gebouwd">${p.gebouwd.map(g => `<span>${g}</span>`).join('')}</div>
    ${notitie}
    ${link}
  </div>
</article>`
}

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
<div class="stappen">
  <div class="stap"><div class="nr">01</div><h3>Kennismaking</h3><p>We horen wat je doet en waar het knelt. Gratis en zonder verplichting.</p></div>
  <div class="stap"><div class="nr">02</div><h3>Voorstel</h3><p>Wat we bouwen, wat het kost en wanneer het af is. Op papier, voordat we beginnen.</p></div>
  <div class="stap"><div class="nr">03</div><h3>Bouwen</h3><p>Je ziet tussentijds wat er staat en geeft feedback, niet pas aan het eind.</p></div>
  <div class="stap"><div class="nr">04</div><h3>Live en verder</h3><p>We zetten het live en blijven bereikbaar. ${ph('Onderhoud en support: aanbod nog te besluiten')}</p></div>
</div>`

// ---------- HOME ----------
const home = pagina({
  titel: 'AP Digital | Websites, apps en automatisering (ontwerp)',
  beschrijving: 'Ontwerp nieuwe homepage AP Digital.',
  actief: 'home',
  body: `
<section class="hero raster"><div class="wrap hero-grid">
  <div>
    <div class="label geel">Websites · Apps · Automatisering</div>
    <h1>Digitaal werk <span class="serif">dat gewoon werkt.</span></h1>
    <p class="lead">We bouwen je website, de app waar je bedrijf op draait en de koppelingen die handwerk overnemen. Alles in ons portfolio draait echt, bij echte bedrijven en in ons eigen werk.</p>
    <div class="knoppen-rij"><a class="knop" href="${B}/kennismaking">Plan een gratis kennismaking</a><a class="knop-2" href="${B}/portfolio">Bekijk ons werk</a></div>
    <div class="hero-feit">
      <div><strong>Websites</strong>voor lokale bedrijven</div>
      <div><strong>Apps op maat</strong>planning, uren, kassa</div>
      <div><strong>Automatisering</strong>minder handwerk</div>
    </div>
    <span class="note">Hero-tekst bewust zonder prijs en zonder "7 dagen": het aanbod per pijler is nog niet besloten. Tagline komt uit het brandbook.</span>
  </div>
  <div class="collage" aria-hidden="true">
    <div class="browser"><div class="balk"><i></i><i></i><i></i><span>flo-rent.nl</span></div><img src="${B}/img/florent-d.webp" alt="" /></div>
    <div class="dash"><img src="${B}/img/postleads-dashboard.webp" alt="" /></div>
    <div class="telefoon"><img src="${B}/img/urenapp-registreren.webp" alt="" style="aspect-ratio:534/620;object-position:top left" /></div>
  </div>
</div></section>

<section class="sectie"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Wat we bouwen</div><h2 style="margin-top:12px">Drie dingen, <span class="serif">één team.</span></h2><p class="lead">Begin met een betere website. Loop je daarna vast op Excel, papier of dubbel overtypen, dan bouwen we dat ook.</p></div></div>
  <div class="pijlers">
    ${pijlers.map(p => `<a class="pijler" href="${B}/${p.slug}"><div class="ico">${ICO[p.key]}</div><h3>${p.naam}</h3><p>${p.kort}</p><ul>${p.voorbeelden.map(v => `<li>${v}</li>`).join('')}</ul><span class="meer">Meer over ${p.naam.toLowerCase()} →</span></a>`).join('')}
  </div>
</div></section>

<section class="sectie" style="padding-top:0"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Uitgelicht werk</div><h2 style="margin-top:12px">Werk dat <span class="serif">echt draait.</span></h2></div><a class="knop-2" href="${B}/portfolio">Alle projecten →</a></div>
  <div class="cases">
    ${['florent', 'urenapp', 'postleads-dashboard', 'cockpit'].map(id => kaart(projecten.find(p => p.id === id))).join('')}
  </div>
  <span class="note">Keuze van deze vier is een voorstel: een website, een app, een klantportaal en een automatisering. Alex kiest de definitieve vier.</span>
</div></section>

<section class="sectie raster"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Waarom AP Digital</div><h2 style="margin-top:12px">Meer dan <span class="serif">een webbouwer.</span></h2></div></div>
  <div class="drie">
    <div><div class="nr">01</div><h3>We bouwen ook wat achter je site zit</h3><p>Een offerteformulier is mooi. Een systeem dat die aanvraag meteen in je planning zet is beter. Dat bouwen we allebei.</p></div>
    <div><div class="nr">02</div><h3>Bewezen in eigen werk</h3><p>Onze eigen bedrijven draaien op apps en automatisering die we zelf bouwden. Wat we verkopen, gebruiken we elke dag.</p></div>
    <div><div class="nr">03</div><h3>Je praat met de bouwers</h3><p>Geen accountmanager ertussen. Wie je belt, weet hoe je site of app in elkaar zit.</p></div>
  </div>
  <span class="note">Punt 02 klopt alleen als PostLeads en de cockpit als "eigen bedrijf/eigen werk" genoemd mogen worden. Graag bevestigen.</span>
</div></section>

<section class="sectie"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Zo werken we</div><h2 style="margin-top:12px">Van eerste gesprek <span class="serif">tot live.</span></h2></div></div>
  ${stappen}
</div></section>

<section class="sectie smal" style="padding-top:0"><div class="wrap">
  <div class="sectie-kop"><div><div class="label">Wat klanten zeggen</div><h2 style="margin-top:12px">Reviews</h2></div><a class="knop-2" href="https://g.page/r/CW935XvUw1JkEBM/review" target="_blank" rel="noopener">Bekijk ons Google-profiel ↗</a></div>
  <span class="note">Hier komen de echte Google-reviews, met een getal dat live wordt opgehaald of met de hand gecontroleerd voor livegang. Geen aantal of score uit oude notities overnemen.</span>
</div></section>

${ctaBand()}
`,
})

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
  <div class="sectie-kop"><div><div class="label">Aanbod</div><h2 style="margin-top:12px">Wat het kost</h2><p class="lead">${ph('Placeholder: aanbod, instapprijs en grens per pakket zijn nog niet besloten.')}</p></div></div>
  <div class="aanbod">${p.aanbod.map(a => `<div><h3>${a[0]}</h3><p>${a[1]}</p><p style="margin-top:12px">${ph('prijs volgt')}</p></div>`).join('')}</div>
  <span class="note">Elke prijs- of servicebelofte krijgt bij invullen een grens: wat valt eronder, wat kost extra. Geen "onbeperkt" of "altijd".</span>
</div></section>

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
const over = pagina({
  titel: 'Over ons | AP Digital (ontwerp)',
  beschrijving: 'Wie er achter AP Digital zitten.',
  actief: 'over',
  body: `
<section class="pkop raster"><div class="wrap">
  <div class="label geel">Over ons</div>
  <h1>Bouwers met <span class="serif">een eigen bedrijf.</span></h1>
  <p class="lead">AP Digital is van Alex Prijs ${ph('en [naam maat]')}. We bouwen websites, apps en automatisering vanuit Arnhem, en we gebruiken het meeste daarvan zelf.</p>
  <span class="note">Deze pagina wacht op de afspraken met de maat (rollen, naam, foto, rechtsvorm). Beslispunt Alex. Huidige /over vertelt alleen over Alex en zijn fotografie-verleden.</span>
</div></section>
<section class="sectie smal"><div class="wrap twee">
  <div style="aspect-ratio:4/5;border-radius:18px;overflow:hidden;border:1px solid var(--lijn)"><img src="/img/alex-1.webp" alt="Alex Prijs" style="width:100%;height:100%;object-fit:cover" /></div>
  <div>
    <div class="label">Alex Prijs</div>
    <h2 style="margin:12px 0 16px">Van verhuisbedrijf <span class="serif">naar eigen software.</span></h2>
    <p>${ph('Tekst Alex: in eigen woorden, 3-4 zinnen. Voorstel: hoe het werk bij een verhuisbedrijf leidde tot eigen apps voor planning en uren, en waarom je daarom snapt hoe een bedrijf echt werkt.')}</p>
    <div style="height:30px"></div>
    <div class="label">${ph('Naam maat')}</div>
    <p style="margin-top:10px">${ph('Foto en tekst maat volgen')}</p>
  </div>
</div></section>
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
  'doorlichting.html': dl,
}
for (const p of pijlers) pages[`${p.slug}.html`] = pijlerPagina(p)
for (const [f, html] of Object.entries(pages)) {
  if (/[–—]/.test(html.replace(/content: "−"/g, ''))) console.warn('LET OP: streepje in', f)
  writeFileSync(join(UIT, f), html)
  console.log('geschreven', f)
}

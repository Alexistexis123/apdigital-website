// Ontwerp: drie varianten van de bovenkant van home (vraag Alex 10-11-2026: geen foto bovenaan, kop algemener).
// Alleen ter beoordeling onder /ontwerp/home-a, -b, -c. noindex (meta + X-Robots-Tag) en robots Disallow /ontwerp.
// De rest van de pagina is gelijk aan home (77c5790); de foto van Alex staat klein in het blok "over".
// Variant C heeft de drie keuzes in de hero zelf, daarom daar geen los blok "Wat we doen" eronder.
export function maakVarianten({ pagina, machine, checkKaart, watWeDoen, werkHome, reviewsBlok, ctaCheck, CHECK, T1, T2, P, TEL, TEL_HREF }) {
  const FOTO = '/img/alex-home.webp'
  const knoppen = `<div class="knoppen-rij"><a class="knop" href="${CHECK}">Gratis check</a><a class="knop-2" href="/contact">Kennismaken</a></div>`
  const bel = `<p class="wie-bel">Liever even bellen? <a href="${TEL_HREF}">${TEL}</a></p>`

  const balk = actief => `<div class="ov-balk"><div class="wrap"><span>Ontwerp home · niet live</span><nav aria-label="Varianten">${[['a', 'A · merk'], ['b', 'B · resultaat'], ['c', 'C · kiezen']].map(([k, t]) => `<a href="/ontwerp/home-${k}"${k === actief ? ' class="aan" aria-current="page"' : ''}>${t}</a>`).join('')}</nav></div></div>`

  // Over-blok met kleine, persoonlijke foto (vervangt de grote foto bovenaan).
  const overMetFoto = `
<section class="sectie smal"><div class="wrap ov-over">
  <figure class="ov-foto" data-reveal>
    <img src="${FOTO}" alt="Alex Prijs, oprichter AP Digital" width="1100" height="792" loading="lazy" decoding="async" />
    <figcaption><b>Alex Prijs</b><span>Oprichter</span></figcaption>
  </figure>
  <div data-reveal style="--d:60ms">
    <div class="label">Wie je aan de lijn krijgt</div>
    <h2 style="margin:12px 0 16px">Eén aanspreekpunt. <span class="serif">Die het ook bouwt.</span></h2>
    <p>Bij AP Digital praat je met Alex. Hij luistert naar waar het knelt, bouwt het zelf en belt je zelf terug. Geen accountmanager ertussen.</p>
    <p>Bij verhuisbedrijf Jacobs Heteren bouwde hij een uren-app, een planningssysteem en een website die aanvragen binnenhaalt.</p>
    <div class="oq-rij" style="margin:20px 0 18px"><span>Uit Arnhem</span><span>Vaste prijs vooraf</span><span>Je belt met wie het bouwt</span></div>
    <a class="tekst-link" href="/over">Meer over ons →</a>
  </div>
</div></section>`

  // A: merk. Tagline als kop, de machine als beeld.
  const heroA = `
<section class="hero2 t2-hero ov-a"><div class="wrap">
  <div class="label geel">AP Digital · Arnhem</div>
  <h1>Digitaal werk dat <span class="serif">gewoon werkt.</span></h1>
  <div class="hero-rechts">
    <p class="lead">We zorgen dat klanten je vinden in Google en AI, bouwen software die je werk makkelijker maakt, en maken websites die het allemaal dragen.</p>
    ${knoppen}
  </div>
  ${machine}
  <p class="m-uitleg">Zo loopt een aanvraag als je site, planning en offertes aan elkaar hangen. <span>Voorbeeld met nepdata.</span></p>
</div></section>`

  // B: resultaat. Wat de klant eraan heeft, met de gratis check als beeld.
  const heroB = `
<section class="hero2 ov-b"><div class="wrap">
  <div class="ov-b-tekst">
    <div class="label geel">AP Digital · Arnhem</div>
    <h1>Meer klanten uit Google en AI. <span class="serif">Minder handwerk.</span></h1>
    <p class="lead">We zorgen dat mensen je vinden als ze zoeken in Google of het aan ChatGPT vragen. En we bouwen de website en de software die het werk daarna makkelijker maken.</p>
    ${knoppen}
    ${bel}
  </div>
  <div class="ov-b-beeld">
    ${checkKaart}
    <p class="m-uitleg">Zo ziet de gratis check eruit. <span>Voorbeeld met nepdata.</span></p>
  </div>
</div></section>`

  // C: kiezen. De drie dingen meteen als klikbare tegels.
  const tegel = (nr, href, label, titel, zin, prijs, extra = '') => `<a class="ov-tegel${extra}" href="${href}">
      <span class="ov-nr">${nr}</span>
      <span class="label${extra ? ' geel' : ''}">${label}</span>
      <b>${titel}</b>
      <span class="ov-zin">${zin}</span>
      <span class="ov-onder"><span>${prijs}</span><i aria-hidden="true">→</i></span>
    </a>`
  const heroC = `
<section class="hero2 ov-c"><div class="wrap">
  <div class="label geel">AP Digital · Arnhem</div>
  <h1>Vindbaarheid, software en websites <span class="serif">voor ondernemers.</span></h1>
  <div class="hero-rechts">
    <p class="lead">Kies waar je mee verder wilt. Weet je het nog niet? Doe de gratis check of plan een kennismaking.</p>
    ${knoppen}
  </div>
  <div class="ov-tegels">
    ${tegel('01', T1, 'Onze hoofdzaak', 'Vindbaar in Google en AI', 'Elke maand gemeten, verbeterd en in twee pagina\'s uitgelegd.', 'vanaf €149 per maand', ' ov-geel')}
    ${tegel('02', T2, 'Op maat', 'Software en automatisering', 'Apps die passen op hoe je werkt. Terugkerend werk loopt vanzelf.', 'vaste prijs na een gesprek')}
    ${tegel('03', P.websites, 'Websites', 'Websites en redesign', 'Nieuw of vernieuwd. Snel, goed op mobiel en gebouwd om gevonden te worden.', 'vanaf €299')}
  </div>
</div></section>`

  const STIJL = `<style>
.ov-balk { background: #FFD60A; color: #0A0A0A; font-size: 13px; }
.ov-balk .wrap { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 36px; flex-wrap: wrap; }
.ov-balk span { font-family: var(--mono); letter-spacing: .1em; text-transform: uppercase; font-size: 11px; font-weight: 600; }
.ov-balk nav { display: flex; gap: 4px; }
.ov-balk a { color: #0A0A0A; text-decoration: none; padding: 4px 10px; border-radius: 99px; font-weight: 600; }
.ov-balk a.aan { background: #0A0A0A; color: #FFD60A; }
.ov-a .hero-rechts { margin-top: 24px; }
.ov-b .wrap { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.02fr); gap: 56px; align-items: center; }
.ov-b h1 { font-size: clamp(38px, 4.6vw, 64px); max-width: none; }
.ov-b h1 .serif { white-space: normal; }
.ov-b .lead { margin: 22px 0 28px; }
.ov-b-beeld .check-kaart { transform: rotate(1deg); }
.ov-b-beeld .m-uitleg { margin-top: 16px; }
.ov-c h1 { max-width: 14em; }
.ov-c .hero-rechts { margin-top: 24px; }
.ov-tegels { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 44px; }
.ov-tegel { position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 8px; background: var(--paneel); border: 1px solid var(--lijn); border-radius: var(--r); padding: 24px 24px 20px; text-decoration: none; color: var(--wit); transition: border-color .2s, transform .2s; min-width: 0; }
.ov-tegel:hover { border-color: rgba(255,214,10,.6); transform: translateY(-4px); }
.ov-tegel.ov-geel { border-color: rgba(255,214,10,.45); background: radial-gradient(120% 90% at 100% 0%, rgba(255,214,10,.12), transparent 55%), var(--paneel); }
.ov-nr { position: absolute; right: 18px; top: 6px; font-family: var(--serif); font-style: italic; font-size: 60px; line-height: 1; color: rgba(255,255,255,.06); }
.ov-geel .ov-nr { color: rgba(255,214,10,.2); }
.ov-tegel b { font-size: clamp(21px, 1.9vw, 26px); letter-spacing: -.03em; line-height: 1.1; font-weight: 600; margin-top: 4px; }
.ov-zin { color: var(--tekst); font-size: 15px; }
.ov-onder { margin-top: auto; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--lijn); font-size: 14.5px; font-weight: 600; }
.ov-geel .ov-onder > span { color: var(--geel); }
.ov-onder i { font-style: normal; color: var(--geel); font-size: 18px; transition: transform .2s; }
.ov-tegel:hover .ov-onder i { transform: translateX(4px); }
.ov-over { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 48px; align-items: center; }
.ov-over p { max-width: 36em; }
.ov-foto { margin: 0; position: relative; aspect-ratio: 4 / 5; border-radius: 20px; overflow: hidden; border: 1px solid var(--lijn-2); background: var(--paneel); }
.ov-foto img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; }
.ov-foto figcaption { position: absolute; left: 12px; bottom: 12px; background: rgba(10,10,10,.8); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); border: 1px solid var(--lijn-2); border-radius: 12px; padding: 8px 12px; display: flex; flex-direction: column; gap: 1px; }
.ov-foto figcaption b { font-size: 14px; color: var(--wit); }
.ov-foto figcaption span { font-family: var(--mono); font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--geel); }
@media (max-width: 960px) {
  .ov-b .wrap { grid-template-columns: 1fr; gap: 36px; }
  .ov-b-beeld .check-kaart { transform: none; }
  .ov-tegels { grid-template-columns: 1fr; gap: 12px; margin-top: 32px; }
}
@media (max-width: 760px) {
  .ov-over { grid-template-columns: 1fr; gap: 24px; }
  .ov-foto { width: 150px; aspect-ratio: 1 / 1; border-radius: 18px; }
  .ov-foto img { object-position: 50% 18%; }
  .ov-foto figcaption { display: none; }
}
@media (max-width: 600px) {
  .ov-b h1 { font-size: 38px; }
  .ov-tegel { padding: 18px 18px 16px; }
  .ov-tegel .ov-zin { font-size: 14.5px; }
  .ov-balk .wrap > span { display: none; }
  .ov-balk nav { width: 100%; justify-content: space-between; }
}
</style>`

  const maak = (k, naam, hero, metDrie) => pagina({
    pad: `/ontwerp/home-${k}`,
    titel: `Ontwerp home ${k.toUpperCase()} (${naam}) | AP Digital`,
    beschrijving: 'Ontwerpvariant van de homepage, alleen ter beoordeling.',
    actief: 'home',
    noindex: true,
    kopExtra: STIJL,
    body: `${balk(k)}
${hero}
${metDrie ? watWeDoen : ''}
${werkHome}
${overMetFoto}
${reviewsBlok}
${ctaCheck}
`,
  })

  return {
    'ontwerp/home-a.html': maak('a', 'merk', heroA, true),
    'ontwerp/home-b.html': maak('b', 'resultaat', heroB, true),
    'ontwerp/home-c.html': maak('c', 'kiezen', heroC, false),
  }
}

# AP Digital — apdigital.nl

Bureau website voor AP Digital (websites, apps & social content).  
Live op **https://apdigital.nl/** — gehost op Vercel, repo: github.com/Alexistexis123/apdigital-website

## Stack

Puur statische HTML/CSS/JS — geen framework. Bestanden:
- `index.html` — homepage met hero, animaties, scroll-reveal
- `diensten.html` — 3 flip cards (Websites / Apps / Social)
- `pakketten.html` — 3 flip cards (Starter / Groei / Premium)
- `portfolio.html` — project grid (Casa 5 live + 2 WIP placeholders)
- `contact.html` — contactformulier via formsubmit.co → info@apdigital.nl
- `style.css` — alle styling, donker thema, CSS variabelen, flip card logica
- `robots.txt` + `sitemap.xml` — SEO

## Deployen

Lokale werkmap: `C:/Users/alexa/Desktop/apdigital-website`. Pushen naar `main` (`git push origin main`) → Vercel deployt automatisch naar apdigital.nl. Het Vercel-project heet nog `ruflo-website` (team `abprijs-4201s-projects`) om historische redenen, maar de productie-URL is apdigital.nl. Vercel CLI is alleen nodig voor handmatige re-deploys.

## Contact form

Endpoint: `https://formsubmit.co/ajax/info@apdigital.nl` (zie [contact.html:165](contact.html)). Geen API-key nodig, formsubmit verifieert het ontvangst-adres eenmalig. Mails komen binnen op info@apdigital.nl.

## Flip cards (diensten + pakketten)

CSS: `.card-inner` met `transform-style: preserve-3d`, `.card-front` en `.card-back` met `backface-visibility: hidden`. Klikken toggle `.flipped` class → `rotateY(180deg)`.

## Portfolio

- **Casa 5** — B&B website (`/casa5`), thumbnail = echte hero foto van casa5.eu, gele tint overlay die oplicht bij hover
- **Marketing Fit** — Marketing bureau website (`/marketing-fit`), thumbnail = lokale `/img/portfolio/marketingfit.webp`

Alle portfolio-thumbnails draaien op lokale WebP in `/img/portfolio/` (casa5, marketingfit, bijdaan). Microlink is volledig uitgefaseerd, geen externe screenshot-calls meer.

## Workflow

- **Deploy direct, altijd** — PRs worden zonder extra bevestiging uit draft gehaald en gesquashed naar `main`. Vercel deployt automatisch naar apdigital.nl. Nooit wachten op "mag ik mergen?" tenzij CI rood is of er onopgeloste review comments zijn.

## Schrijfstijl regels

**ABSOLUUT GEEN em-dashes (—) of en-dashes (–) gebruiken in copy, content, alt-tags, meta descriptions, JSON-LD names, of waar dan ook in user-facing tekst.** Gebruik in plaats daarvan: komma's, punten, of woorden zoals "want", "dus", "of", "en", "maar". Em-dashes zijn een herkenbaar AI-stijl-pattern dat de site amateuristisch laat lijken.

Andere AI-tells om te vermijden:
- Repetitieve "Of je nu X bent, een Y hebt of een Z runt" patronen
- Loze adjectieven als "uniek", "passend", "professioneel", "innovatief"
- Cliché's als "klein team, korte lijnen", "geen consultancy-circus", "recht voor zijn raap" (één per pagina max, niet overal)
- Overdreven enthousiast taalgebruik

In commits, code comments en interne docs mogen em-dashes wel.

## Design tokens (style.css)

```css
--accent: oklch(0.92 0.18 100)  /* geel */
--bg-0:   oklch(0.13 0.004 250) /* donker navy */
--fg:     oklch(0.96 0.004 250) /* wit */
```

## SEO status

- OG tags + canonical + twitter:card op alle paginas
- og:image (branded SVG) op alle paginas
- JSON-LD schemas: LocalBusiness, Service, Product, FAQPage, ContactPage, AboutPage, CollectionPage
- Google Search Console: GEVERIFIEERD via HTML-bestand `googlebf71989ee444de94.html` (op zakelijke Gmail account)
- Sitemap.xml gesubmit (kan eerste keer "Couldn't fetch" tonen, retry'd vanzelf)
- 10 lokale landingspages voor SEO (websites-laten-maken-{stad})

## Account-strategie

Toekomstplan: alle business-tools naar zakelijke Gmail (NIET a.b.prijs@gmail.com privé):
- Search Console (eerst, want gratis en makkelijk)
- Vercel (migreren via team transfer)
- TransIP (domein verhuizen naar zakelijke account)
- Web3Forms email destination doorzetten naar zakelijke gmail

Voor nu staat alles nog op a.b.prijs@gmail.com, maar Search Console gaat direct op zakelijk.

## TODO (input van klant nodig)

Deze items zijn onafgemaakt omdat ze klant-content/-actie vragen die Claude niet kan vervullen:

### Legal / GDPR
- **Cookie consent banner**: site gebruikt Vercel Analytics en Microsoft Clarity (beide geen tracking cookies, GDPR-OK) en Google Fonts (externe IP-call). Banner technisch niet verplicht maar overweeg er één toe te voegen voor duidelijkheid en SEA-compliance later.
- **Privacy/voorwaarden review na KVK** (juni 2026): KVK nummer invullen op /privacy en /voorwaarden, eventueel door jurist laten reviewen voor zekerheid.

### Account / setup
- **FormSubmit destination** doorzetten van `a.b.prijs@gmail.com` naar zakelijke gmail (na email setup).

### Content (voorheen al genoemd)

- **Echte portfolio screenshots**: KLAAR. Alle thumbnails draaien op lokale WebP in `/img/portfolio/` (casa5, marketingfit, bijdaan). Microlink uitgefaseerd.
- **Casa 5 images**: nu extern geladen vanuit `casa5.eu`. Klant downloadt en uploadt lokaal voor controle/snelheid.
- **Testimonials sectie homepage**: klant verzamelt 2-3 quotes van Casa5/Bij Daan met naam + bedrijf + ster-rating.
- **Logo strip onder hero**: klant levert logo's of toestemming voor 3-5 klanten.
- **About pagina foto**: `/over` pagina staat live (Alex, Arnhem, fotograaf-verleden), maar foto van Alex moet nog worden geüpload en geintegreerd.
- **Case studies**: per project een detail-pagina met probleem, oplossing, resultaten (vraagt klant-data per case).
- **Project highlights per stad**: welke projecten horen bij welke landingspages?
- **Blog/artikelen**: eerste 1-2 artikelen onderwerp + tekst van klant.
- **KVK nummer**: footer toont nu `KVK in aanvraag` (overal). KVK afspraak op 23 juni 2026, daarna echte nummer invullen + LocalBusiness JSON-LD update.
- **Self-host Google Fonts**: Space Grotesk + JetBrains Mono lokaal hosten voor snellere render + GDPR. Vergt download van .woff2 files.

## Marketing roadmap

### Nu meteen (week 1)
- **Google Business Profile aanmaken** (gratis): https://business.google.com → verschijnt in Maps + lokale zoekresultaten voor "websitebureau Arnhem". Levert direct lokale leads zonder advertentiekosten.

### Foundation eerst (week 1-3)
Voordat SEA (Google Ads) zin heeft, moet dit staan:
1. **Vercel Web Analytics aanzetten** (gratis, 5 min werk in Vercel dashboard) → meet hoeveel mensen organisch komen
2. **Privacy policy + Algemene voorwaarden publiceren** (Google Ads vereist deze)
3. **KVK invullen** in footer (Google Ads checkt business identity)
4. **1-2 testimonials verzamelen** voor social proof
5. **2-4 weken organisch wachten** → Search Console laat zien welke steden traffic krijgen

### SEA / Google Ads (week 4-6)
Pas starten als foundation hierboven staat. Strategie:
- Begin met €5-15/dag op **één stad** (waar minste organische traffic, of meeste vraag)
- Target keywords: *"website laten maken [stad]"*, *"webdesigner [stad]"*, *"website bureau [stad]"*
- USP vaste prijs €299 + 7 dagen = sterke ad copy
- Test 2-4 weken → schaal op wat werkt

### Waarom NU NOG GEEN SEA
- Geen analytics → optimaliseren is blind, budget verbrandt
- Geen privacy policy → Google kan account weigeren
- KVK 00000000 in footer → ziet er onaf uit, verlaagt vertrouwen
- Geen testimonials → bezoekers haken af, hoge cost-per-lead
- Geen blog/content → lage Quality Score = duurdere clicks dan concurrenten

## Toekomstige ideeën

- Meer portfolio projecten toevoegen als ze live gaan
- Blog/artikelen sectie voor SEO
- Testimonials sectie
- SEA campagnes starten (zie marketing roadmap hierboven)
- Google Business Profile claimen en optimaliseren
- **App-propositie aanscherpen op /diensten**: nu vaag ('klantenportalen of dashboards'). Klant wil meer focus op apps want hogere bedragen + minder concurrentie. Strategie:
  - Hybride: websites blijven cash cow (snel geld), apps als upsell na 6-12 mnd bij bestaande klanten
  - Niche: klantenportalen voor MKB, internal tools (urenregistratie/voorraad), SaaS prototypes
  - Niet: consumer apps (Uber voor X, social, gaming) want concurrentiemoeras
  - Pricing: web-app simpel €2,5-5k, complex €5-15k, native iOS+Android €15-50k+, maintenance €200-1k/mnd
  - Concrete actie: 5 bestaande klanten vragen welk handmatig proces ze willen automatiseren = warme lead + app idee
  - Showcase bouwen: AP Digital intern dashboard als demo web-app op portfolio
- **Eigen unified analytics dashboard** (`/dashboard` of `/admin` met auth):
  - Combineert data uit Vercel Analytics API, Vercel Speed Insights API, Search Console API
  - Chart.js voor grafieken (page views over tijd, top pages, top queries, Core Web Vitals trend)
  - Vereist: Vercel Pro plan ($20/mnd) voor Analytics API + OAuth setup voor Search Console
  - Sales-tool: kan als upsell aangeboden worden bij Premium pakket of als losse dienst
  - Bouwen na 1-2 maanden, wanneer er echte data is om mee te visualiseren

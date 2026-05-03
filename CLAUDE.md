# AP Digital — apdigital.nl

Bureau website voor AP Digital (websites, apps & social content).  
Live op **https://apdigital.nl/** — gehost op Vercel, repo: github.com/Alexistexis123/apdigital-website

## Stack

Puur statische HTML/CSS/JS — geen framework. Bestanden:
- `index.html` — homepage met hero, animaties, scroll-reveal
- `diensten.html` — 3 flip cards (Websites / Apps / Social)
- `pakketten.html` — 3 flip cards (Starter / Groei / Premium)
- `portfolio.html` — project grid (Casa 5 live + 2 WIP placeholders)
- `contact.html` — contactformulier via Web3Forms → a.b.prijs@gmail.com
- `style.css` — alle styling, donker thema, CSS variabelen, flip card logica
- `robots.txt` + `sitemap.xml` — SEO

## Deployen

```bash
cd C:/Users/hipbi/Desktop/ruflo-website
vercel deploy --prod --yes
```

Vercel CLI is geïnstalleerd en ingelogd als `abprijs-4201`.

## Contact form

Web3Forms key: `a634c808-f96b-4b81-a917-174acd38f74b`  
Mails komen binnen op a.b.prijs@gmail.com

## Flip cards (diensten + pakketten)

CSS: `.card-inner` met `transform-style: preserve-3d`, `.card-front` en `.card-back` met `backface-visibility: hidden`. Klikken toggle `.flipped` class → `rotateY(180deg)`.

## Portfolio

- **Casa 5** — B&B website (`/casa5`), thumbnail = echte hero foto van casa5.eu, gele tint overlay die oplicht bij hover
- **Eetcafé Rubens** — Restaurant website (`/rubens`), thumbnail = `rubens-website.vercel.app/images/koepelkerk-terras.jpg`
- **Marketing Fit** — Marketing bureau website (`/marketing-fit`), thumbnail = Microlink screenshot embed van marketing-fit.vercel.app

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

- **Echte portfolio screenshots**: Microlink wordt nu gebruikt voor Bij Daan + Marketing Fit (1-3sec laad-overhead). Klant uploadt eigen PNG/WebP screenshots naar `/img/portfolio/` om Microlink te vervangen.
- **Casa 5 + Rubens images**: nu extern geladen vanuit `casa5.eu` en `rubens-website.vercel.app`. Klant downloadt en uploadt lokaal voor controle/snelheid.
- **Testimonials sectie homepage**: klant verzamelt 2-3 quotes van Casa5/Rubens/De Vide/Bij Daan met naam + bedrijf + ster-rating.
- **Logo strip onder hero**: klant levert logo's of toestemming voor 3-5 klanten.
- **About pagina foto**: `/over` pagina staat live (Alex, Arnhem, fotograaf-verleden), maar foto van Alex moet nog worden geüpload en geintegreerd.
- **Case studies**: per project een detail-pagina met probleem, oplossing, resultaten (vraagt klant-data per case).
- **Project highlights per stad**: welke projecten horen bij welke landingspages? (bv. De Vide → Arnhem, Rubens → ?)
- **Blog/artikelen**: eerste 1-2 artikelen onderwerp + tekst van klant.
- **KVK nummer**: footer zegt nu `KVK 00000000`, echte nummer invullen.
- **Self-host Google Fonts**: Space Grotesk + JetBrains Mono lokaal hosten voor snellere render + GDPR. Vergt download van .woff2 files.

## Toekomstige ideeën

- Meer portfolio projecten toevoegen als ze live gaan
- Blog/artikelen sectie voor SEO
- Testimonials sectie

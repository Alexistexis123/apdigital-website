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

## Design tokens (style.css)

```css
--accent: oklch(0.92 0.18 100)  /* geel */
--bg-0:   oklch(0.13 0.004 250) /* donker navy */
--fg:     oklch(0.96 0.004 250) /* wit */
```

## SEO status

- OG tags + canonical + twitter:card op index.html
- Google Search Console verificatie: meta tag `CgNNQrAZwi1S_UNIU0qI0KRWeE4KUXG3Hbb` staat live op site
- DNS TXT record ook al gezet via Vercel, maar nog niet geverifieerd in Search Console
- **TODO:** Ga naar search.google.com/search-console → Eigendom toevoegen → URL prefix `https://apdigital.nl` → HTML-tag → Verifiëren

## Toekomstige ideeën

- Meer portfolio projecten toevoegen als ze live gaan
- Blog/artikelen sectie voor SEO
- Testimonials sectie

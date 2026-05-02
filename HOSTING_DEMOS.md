# Demo-sites hosten onder apdigital.nl/<naam>

Werkwijze voor het serveren van demo-websites onder `apdigital.nl/<slug>` in plaats van `<slug>.vercel.app`. Werkt via een Vercel-rewrite in dit project (`ruflo-website`) zonder dat er aan TransIP DNS iets hoeft te veranderen.

## Hoe het werkt

```
Bezoeker → apdigital.nl/<slug>     ┐
Bezoeker → apdigital.nl/<slug>/x   ├─→ ruflo-website (rewrite) → <slug>.vercel.app/...
Bezoeker → apdigital.nl/<slug>/css ┘
```

Het demo-project blijft een eigen Vercel-project. `ruflo-website` is alleen de "voorkant" die op het juiste pad doorrouteert.

## Eenmalige voorbereiding van het demo-project

Doe dit **één keer** per nieuwe demo-site (vóór deployen of bij migratie van een bestaande).

### 1. Vercel-config aanmaken in de demo-folder

Maak `vercel.json` aan in de demo-folder (bv. `C:/Users/hipbi/Desktop/<slug>/`):

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

Dit zorgt dat `/fotos` automatisch `fotos.html` serveert.

### 2. Paden omzetten naar `/<slug>/` prefix

Alle interne paden in de HTML moeten beginnen met `/<slug>/` zodat ze ook via apdigital.nl correct laden. Met `<slug>` = de URL-naam (bv. `casa5`, `sado`, `kamil`).

Run dit in Git Bash vanuit de demo-folder (vervang `casa5` door je slug):

```bash
SLUG=casa5
for f in *.html; do
  sed -i "s|href=\"style.css\"|href=\"/${SLUG}/style.css\"|g; \
          s|src=\"main.js\"|src=\"/${SLUG}/main.js\"|g; \
          s|href=\"index.html\"|href=\"/${SLUG}\"|g; \
          s|href=\"\\([a-z]*\\).html\"|href=\"/${SLUG}/\\1\"|g" "$f"
done
```

Wat dit doet:
- `style.css` → `/casa5/style.css`
- `main.js` → `/casa5/main.js`
- `index.html` → `/casa5` (root van demo)
- `fotos.html`, `contact.html`, etc. → `/casa5/fotos`, `/casa5/contact` (zonder `.html`)

### 3. Demo deployen naar Vercel

```bash
cd "C:/Users/hipbi/Desktop/<slug>"
vercel deploy --prod --yes
```

Onthoud de URL die je terugkrijgt (bv. `https://casa5-nieuw.vercel.app`).

## Per nieuwe demo: rewrite toevoegen aan ruflo-website

### 4. Edit `C:/Users/hipbi/Desktop/ruflo-website/vercel.json`

Voeg twee regels toe aan `rewrites` (vervang `<slug>` en de target-URL):

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/casa5",          "destination": "https://casa5-nieuw.vercel.app/" },
    { "source": "/casa5/:path*",   "destination": "https://casa5-nieuw.vercel.app/:path*" },

    { "source": "/<slug>",         "destination": "https://<vercel-url>/" },
    { "source": "/<slug>/:path*",  "destination": "https://<vercel-url>/:path*" }
  ]
}
```

**Volgorde maakt uit:** specifieke regels (zonder `:path*`) eerst, daarna de catch-all met `:path*`.

### 5. ruflo-website redeployen

```bash
cd "C:/Users/hipbi/Desktop/ruflo-website"
vercel deploy --prod --yes
```

### 6. Testen

```bash
curl -sI https://apdigital.nl/<slug> | head -3
curl -sI https://apdigital.nl/<slug>/<subpagina> | head -3
curl -sI https://apdigital.nl/<slug>/style.css | head -3
```

Moet 3× `200 OK` geven. Bij `308 Redirect` zit er een pad/cleanUrls-conflict.

## Veelvoorkomende problemen

### `/casa5` redirect naar `/`
Rewrite-target is `https://...vercel.app/index.html` — dat geeft 308 door cleanUrls. **Fix:** target moet `https://...vercel.app/` zijn (slash, geen `index.html`).

### `/casa5/fotos.html` geeft 308 redirect
Links bevatten nog `.html` extensies. **Fix:** sed-stap 2 opnieuw draaien om `.html` weg te halen uit interne hrefs.

### `/casa5` (zonder slash) en `/casa5/` (met slash) gedragen zich vreemd
`trailingSlash: false` redirect altijd naar de versie zonder slash. Niet aan komen, gewoon de versie zonder slash gebruiken als canonieke URL.

### Externe assets (afbeeldingen van casa5.eu, fonts) werken niet
Externe URLs (https://...) zijn al absoluut, daar hoeft niks aan. Alleen lokale paden (style.css, main.js, eigen HTML) krijgen `/<slug>/` prefix.

## Checklist nieuwe demo

- [ ] `vercel.json` met `cleanUrls: true` in demo-folder
- [ ] Sed-script gerund: alle paden hebben `/<slug>/` prefix
- [ ] Sed-script gerund: geen `.html` meer in interne hrefs (behalve in bestandsnamen)
- [ ] `vercel deploy --prod --yes` in demo-folder
- [ ] 2 rewrite-regels toegevoegd in `ruflo-website/vercel.json`
- [ ] `vercel deploy --prod --yes` in `ruflo-website`
- [ ] `curl` test geeft 3× 200 OK

## Voorbeeld: complete deploy van casa5

```bash
# 1. Demo-config
cd C:/Users/hipbi/Desktop/casa5-nieuw
echo '{"cleanUrls":true,"trailingSlash":false}' > vercel.json

# 2. Paden omzetten
SLUG=casa5
for f in *.html; do
  sed -i "s|href=\"style.css\"|href=\"/${SLUG}/style.css\"|g; \
          s|src=\"main.js\"|src=\"/${SLUG}/main.js\"|g; \
          s|href=\"index.html\"|href=\"/${SLUG}\"|g; \
          s|href=\"\\([a-z]*\\).html\"|href=\"/${SLUG}/\\1\"|g" "$f"
done

# 3. Demo deployen
vercel deploy --prod --yes

# 4. Rewrite toevoegen aan ruflo-website/vercel.json (handmatig)
# 5. ruflo-website deployen
cd C:/Users/hipbi/Desktop/ruflo-website
vercel deploy --prod --yes

# 6. Testen
curl -sI https://apdigital.nl/casa5
```

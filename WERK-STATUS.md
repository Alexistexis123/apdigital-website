# Werk-status SEA + SEO + conversietracking

> Handoff-note van Harvey, bijgewerkt 9 juni 2026. Pull deze repo thuis en lees dit om verder te gaan.

## Stand van zaken in 1 zin
Conversietracking staat live. Ads draaien nog NIET echt: wachten op KVK (verificatie) + bod fixen. Dat is de eerste klus thuis/morgen.

---

## KLAAR (afgerond)

### Conversietracking (live op apdigital.nl)
4 conversie-acties in Google Ads (account 102-869-9452, `AW-18207337778`), allemaal primair, tellen = een per klik:

| Conversie | Label | Bron |
|-----------|-------|------|
| Leadformulieren indienen (formulier) | `DOggCKue-rccELLa9-1D` | bestond al |
| Telefoonklik | `XGZVCLq_6rscELLa9-1D` | nieuw |
| E-mailklik | `AaYbCL2_6rscELLa9-1D` | nieuw |
| WhatsApp-klik | `AiiACP-Y7LscELLa9-1D` | nieuw |

Code: `events.js` gepusht naar `main` en gedeployed. Alle 4 de kliktypes vuren de juiste Ads-conversie af. Consent mode v2 + cookiebanner ongewijzigd. Data verschijnt pas zodra er advertentieverkeer is en de bezoeker cookies accepteert.

---

## OPEN (volgende stappen, op volgorde)

### 1. Ads aan de praat krijgen (eerst, blocker)
- [ ] **Adverteerdersverificatie afronden** zodra KVK binnen is (afspraak ~morgen). Banner bovenin Ads: "Rond de adverteerdersverificatie af". Zonder dit zet Google de ads stil. ALLEEN ALEX kan dit (identiteit).
- [ ] **Bod fixen** zodra verificatie rond is. Campagne "Search - Websites Arnhem" status = "Bodinstelling beperkt" (bod te laag, slechts 2 vertoningen ooit). Bodlimiet weghalen/verhogen. NIET eerder doen dan na verificatie.
- [ ] KVK-nummer ook invullen in footer + op /privacy en /voorwaarden (staat nu "KVK in aanvraag").

### 2. Ads optimaliseren (na 2-4 weken data)
- [ ] Bij ~15-30 conversies: biedstrategie van "Klikken maximaliseren" naar "Conversies maximaliseren".
- [ ] Overweeg advertentiegroepen thematisch splitsen (nu alles in "Advertentiegroep 1").
- [ ] Eventueel WhatsApp/tel/email-conversies naar secundair zetten als je bidding puur op formulier-leads wil sturen.

### 3. SEO (apdigital.nl, ~6 weken oud in Google)
Echte GSC-data: 236 vertoningen, 4 kliks, gem. positie 57,8 (6 weken). Site rankt al voor juiste lokale + niche-termen, staat alleen laag door jonge leeftijd + weinig autoriteit.
- [ ] Lokale landingspagina's die ranking missen oppakken: pagina's voor Nijmegen/Ede/Wageningen BESTAAN in de repo maar krijgen nog geen vertoningen. Versterken + intern linken.
- [ ] Niche-cluster uitbouwen (horeca / restaurant / b&b) - vraag bewezen in GSC (boekingssysteem b&b, hotelsite, digitale menukaart), concurrentie laag.
- [ ] Interne links versterken vanaf homepage (hoogste autoriteit, pos 2,5) naar prioriteitspagina's.
- [ ] Title tags: USP "7 dagen live, vanaf 299 euro" overal in (geen concurrent leidt daarmee).

---

## Wat goed staat (niet aankomen)
- Ads: zoekcampagne (geen Performance Max), displaynetwerk UIT, 16 nette negatieve zoekwoorden, geo op Arnhem.
- Site: tag + consent mode + GA4 + formulier-conversie waren al goed opgezet.

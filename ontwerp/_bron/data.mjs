// Portfolio-data, besluit Alex 04-11-2026. Alleen feiten die we zelf gezien hebben; onzeker = ph-tekst of notitie.
export const pijlers = [
  {
    key: 'websites', slug: 'websites', naam: 'Websites', label: 'Pijler 1 · Websites',
    kort: 'Een site die klanten oplevert, op je telefoon net zo goed als op je laptop.',
    voorbeelden: ['Nieuwe site of vernieuwing', 'Offerte- en contactformulieren', 'Vindbaar in Google, ook lokaal'],
    h1: 'Een website die <span class="serif">klanten oplevert.</span>',
    intro: 'Veel bedrijven hebben een site die ooit is gemaakt en daarna is blijven staan. Wij bouwen hem opnieuw: snel, duidelijk, met je eigen foto\'s en een knop waar mensen ook echt op drukken.',
    url: '/websites-laten-maken',
    urlNotitie: 'Die URL bestaat al en heeft vertoningen in Google; /websites stuurt er nu al naartoe. Dus geen nieuwe URL, maar deze pagina wordt de pijlerpagina.',
    pijnKop: 'Je site doet <span class="serif">niet wat hij moet doen.</span>',
    pijn: ['Op je telefoon is hij lastig te lezen of te bedienen', 'Er komen weinig aanvragen via binnen', 'Je kunt zelf niets meer aanpassen, of je weet niet meer wie hem beheert', 'Hij ziet er ouder uit dan je bedrijf is'],
    watKop: 'Van eerste ontwerp <span class="serif">tot vindbaar.</span>',
    wat: [
      ['Nieuwe site of vernieuwing', 'In je eigen huisstijl, met echte foto\'s van je bedrijf. Geen standaardthema met stockfoto\'s.'],
      ['Aanvragen die binnenkomen', 'Offerteformulier, bel- en WhatsApp-knop op de plek waar mensen ze zoeken. Elke aanvraag meetbaar.'],
      ['Vindbaar in Google', 'Goede basis voor zoekmachines: titels, snelheid, pagina\'s per dienst of plaats waar dat zin heeft.'],
    ],
    prijs: 'Vanaf €299, live in 7 dagen',
    aanbod: [['Instap', 'Voor wie snel een nette, duidelijke site nodig heeft.', 'vanaf €299', 'live in 7 dagen'], ['Groei', 'Meer pagina\'s, formulieren en lokale vindbaarheid.', 'vanaf €499', 'vaste prijs na een gratis gesprek'], ['Onderhoud', 'Hosting, kleine aanpassingen en updates.', 'vaste prijs per maand', 'na een gratis gesprek']],
    // Besluit Alex 05-11: instapsite = het bestaande Starter-pakket uit pakketten.html, 1-op-1. Alles daarboven = Groei, vanaf 499.
    aanbodGrens: {
      kop: 'Dit zit in de instapsite van €299',
      punten: ['1 tot 3 pagina\'s', 'Template met je huisstijl', 'Mobiel geoptimaliseerd', 'Basis-SEO: titels, meta en sitemap', 'Contactformulier met spamfilter', 'Snelle laadtijd, 90+ op mobiel', 'Live binnen 7 dagen', '30 dagen bugfix-support'],
      meer: 'Meer nodig? Alles daarboven valt onder Groei, vanaf €499.',
    },
    faq: [
      ['Kan ik daarna zelf teksten aanpassen?', 'Dat hangt af van hoe we de site bouwen. We bespreken vooraf wat je zelf wilt kunnen en kiezen de bouw daarop.'],
      ['Houd ik mijn plek in Google?', 'Pagina\'s die nu al gevonden worden houden we, of we sturen ze netjes door naar de nieuwe pagina. Zo raak je geen bezoekers kwijt.'],
      ['Hoe lang duurt het?', 'Een instapsite staat binnen 7 dagen live, zodra we je teksten en foto\'s hebben. Grotere sites plannen we samen in.'],
    ],
    cta: 'Benieuwd wat een nieuwe site <span class="serif">jou oplevert?</span>',
  },
  {
    key: 'apps', slug: 'apps', naam: 'Apps', label: 'Pijler 2 · Apps op maat',
    kort: 'Software die past op hoe jouw bedrijf werkt, in plaats van andersom.',
    voorbeelden: ['Planning en werkbonnen', 'Urenregistratie', 'Kassa, voorraad, klantportaal'],
    h1: 'Een app die past op <span class="serif">hoe jij werkt.</span>',
    intro: 'Standaardsoftware dwingt je bedrijf in een vorm. Wij bouwen de app om je werk heen: je eigen stappen, je eigen woorden, op telefoon en computer.',
    url: '/apps-laten-maken (nieuw), /app-laten-maken-arnhem blijft als lokale pagina',
    urlNotitie: '/app-laten-maken-arnhem staat gemiddeld op positie 16 voor "app laten maken arnhem"; die pagina blijft en linkt naar deze pijler.',
    pijnKop: 'Je bedrijf draait op <span class="serif">Excel en losse briefjes.</span>',
    pijn: ['Hetzelfde wordt twee of drie keer overgetypt', 'Uren, planning of voorraad staan in verschillende lijsten', 'Standaardsoftware doet de helft van wat je nodig hebt', 'Alleen jij weet hoe het systeem werkt'],
    watKop: 'Software voor <span class="serif">de werkvloer.</span>',
    wat: [
      ['Planning en dossiers', 'Van aanvraag tot offerte, planning en werkbon in één systeem.'],
      ['Uren en personeel', 'Medewerkers schrijven uren op hun telefoon, kantoor keurt goed en exporteert.'],
      ['Klantportalen en kassa', 'Je klanten zien hun eigen gegevens. Je winkel rekent af en houdt voorraad bij.'],
    ],
    prijs: 'Vaste prijs na een gratis gesprek',
    aanbod: [['Verkenning', 'Samen uitzoeken wat de app moet doen en wat niet.'], ['Eerste versie', 'Een werkende app voor het belangrijkste proces.'], ['Doorbouwen en support', 'Uitbreiden op wat je team in de praktijk nodig heeft.']],
    faq: [
      ['Werkt het op telefoon en computer?', 'De apps in ons portfolio werken in de browser, op telefoon en computer, zonder app store.'],
      ['Van wie is de app?', '<span class="ph">Eigendom, licentie en hosting nog vastleggen in de voorwaarden.</span>'],
      ['Wat als we later meer willen?', 'Dan bouwen we door op wat er staat. Zo zijn de apps in ons portfolio ook gegroeid.'],
    ],
    cta: 'Loopt je bedrijf vast op <span class="serif">handwerk en lijstjes?</span>',
  },
  {
    key: 'automatisering', slug: 'automatisering', naam: 'Automatisering', label: 'Pijler 3 · Processen en automatisering',
    kort: 'Werk dat elke week terugkomt, laten we automatisch lopen.',
    voorbeelden: ['Rapportages die zichzelf maken', 'Mails en posts op de juiste tijd', 'Eén dashboard voor alles'],
    h1: 'Werk dat terugkomt, <span class="serif">loopt vanzelf.</span>',
    intro: 'Elke week dezelfde lijst maken, dezelfde mails sturen, dezelfde cijfers overtikken. Dat bouwen we om naar iets dat zelf draait, met jou als controle in plaats van als uitvoerder.',
    url: '/processen-automatiseren (nieuw)',
    urlNotitie: 'Nieuwe pagina, er rankt nu niets op dit onderwerp. Zoekwoord en URL nog checken met Mangools voor livegang.',
    pijnKop: 'Je bent elke week <span class="serif">hetzelfde aan het doen.</span>',
    pijn: ['Lijsten en rapportages maak je met de hand', 'Klanten en leveranciers krijgen steeds dezelfde mail', 'Cijfers staan verspreid over vijf systemen', 'Als jij er niet bent, blijft het liggen'],
    watKop: 'Van handwerk <span class="serif">naar een vaste machine.</span>',
    wat: [
      ['Gegevens ophalen en koppelen', 'Data uit websites, systemen en spreadsheets automatisch bij elkaar brengen.'],
      ['Mails, posts en rapporten', 'Op vaste momenten de juiste mail, post of rapportage, met een controle-moment voor jou.'],
      ['Eén overzicht', 'Een dashboard waar je ziet wat er speelt, in plaats van tien tabbladen.'],
    ],
    prijs: 'Vaste prijs na een gratis gesprek',
    aanbod: [['Processcan', 'We kijken welk terugkerend werk het meeste tijd kost.'], ['Eén automatisering', 'Eén proces dat vanaf dan zelf loopt.'], ['Beheer', 'We houden het draaiend en passen aan als er iets verandert.']],
    faq: [
      ['Moet ik alles uit handen geven?', 'Nee. Bij de automatiseringen in ons portfolio zit steeds een moment waarop een mens kijkt of goedkeurt.'],
      ['Werkt het met mijn huidige systemen?', '<span class="ph">Antwoord per situatie; voorbeeldkoppelingen nog kiezen.</span>'],
      ['Wat als er iets misgaat?', '<span class="ph">Bewaking en supportafspraak nog vastleggen in het aanbod.</span>'],
    ],
    cta: 'Welk werk wil jij <span class="serif">nooit meer zelf doen?</span>',
  },
]

export const projecten = [
  // ---------- WEBSITES ----------
  { id: 'florent', pijler: 'websites', top: true, soort: 'Website', titel: 'Flo-Rent Verhuizingen', kort: 'Verhuisbedrijf uit Heteren. Nieuwe site met een offerte-aanvraag in stappen, zodat mensen hun verhuizing makkelijk doorgeven.', gebouwd: ['Redesign', 'Offerte-aanvraag', 'Mobiel eerst'], img: 'florent-d.webp', mobiel: 'florent-m.webp', alt: 'Website Flo-Rent Verhuizingen', url: 'https://www.flo-rent.nl/' },
  { id: 'jacobs', pijler: 'websites', top: true, soort: 'Website', titel: 'Jacobs Heteren', kort: 'Erkend verhuisbedrijf in Gelderland. Website met de offerte-aanvraag direct naast de eerste indruk.', gebouwd: ['Website', 'Offerteformulier', 'SEO'], img: 'jacobs-d.webp', mobiel: 'jacobs-m.webp', alt: 'Website Jacobs Heteren', url: 'https://www.jacobsheteren.nl/', notitie: 'Omschrijving wat wij precies aan deze site deden graag laten checken (Jacob/Alex). Geen claim over eigen mensen of aantallen.' },
  { id: 'herbergen', pijler: 'websites', top: true, soort: 'Website', titel: 'Her-bergen', kort: 'Praktijk voor systemische coaching. Rustige, warme site in het Nederlands en Engels, met echte foto\'s in plaats van stockbeeld.', gebouwd: ['Tweetalig NL/EN', 'Eigen huisstijl', 'Contactformulier'], img: 'herbergen-d.webp', mobiel: 'herbergen-m.webp', alt: 'Website Her-bergen', url: 'https://her-bergen.nl/' },
  { id: 'casa5', pijler: 'websites', top: true, soort: 'Website', titel: 'Casa Agosto Azul', kort: 'Vakantieappartement in de Algarve. Site in vier talen met foto\'s, prijzen en beschikbaarheid, zodat gasten direct kunnen boeken.', gebouwd: ['Vier talen', 'Prijzen en beschikbaarheid', 'Reserveren'], img: 'casa5-d.webp', mobiel: 'casa5-m.webp', alt: 'Website Casa Agosto Azul', url: 'https://apdigital.nl/casa5', notitie: 'In onze mappen heet dit project Casa 5; de site zelf heet Casa Agosto Azul. Draait nu op apdigital.nl/casa5, casa5.eu toont nog de oude site. Welke link we tonen: Alex.' },
  { id: 'rhscooter', pijler: 'websites', soort: 'Website', titel: 'RH Scooter Service', kort: 'Scooterwerkplaats in Arnhem. Pagina\'s per merk en per plaats, zodat mensen hem vinden op wat ze zoeken.', gebouwd: ['Website', 'Lokale SEO', 'Bel- en app-knop'], img: 'rhscooter-d.webp', alt: 'Website RH Scooter Service', url: 'https://rhscooterservicearnhem.nl/' },
  { id: 'marketingfit', pijler: 'websites', soort: 'Website', titel: 'Marketing Fit', kort: 'Contentstrateeg. WordPress-site met diensten, cases en een duidelijke knop voor een kennismaking.', gebouwd: ['WordPress', 'Diensten en cases'], img: 'marketingfit-d.webp', alt: 'Website Marketing Fit', url: 'https://marketing-fit.nl/' },
  { id: 'jmc', pijler: 'websites', soort: 'Website', status: 'Binnenkort live', titel: 'Jacobs Motor Company', kort: 'Handel in gebruikte bedrijfswagens en export. Site met voorraad en een aanvraag voor export, nu in de laatste ontwerpronde.', gebouwd: ['Voorraad', 'Export-aanvraag'], img: 'jmc-d.webp', alt: 'Ontwerp website Jacobs Motor Company', geenlink: 'Ontwerp, link volgt bij livegang', notitie: 'Besluit Alex 05-11: nu al tonen als ontwerp met label "binnenkort live", zonder link. Link erbij zodra de site live staat.' },

  // ---------- APPS ----------
  // MoveFlow: schermen op nepdata van Jacob (staging, 05-11-2026), bron C:/dev/apdigital-beeld/moveflow/ met LEESMIJ.md.
  { id: 'moveflow', pijler: 'apps', top: true, soort: 'App op maat', titel: 'MoveFlow', kort: 'Het systeem waar Jacobs Heteren op draait: van aanvraag en offerte tot planning en werkbon voor de ploeg, in één dossier per verhuizing.', gebouwd: ['Offertes', 'Planning', 'Dossiers', 'Werkbon op telefoon'], img: 'moveflow-d.webp', mobiel: 'moveflow-m.webp', galerij: [['moveflow-d.webp', 'Dossier', 'MoveFlow met nepdata: een verhuisdossier met de stappen van aanvraag tot afgerond'], ['moveflow-planning-d.webp', 'Planning', 'MoveFlow met nepdata: de weekplanning met verhuizingen en taxaties'], ['moveflow-offerte-d.webp', 'Offerte', 'MoveFlow met nepdata: een offerte die de klant online accepteerde']], alt: 'MoveFlow met nepdata: een verhuisdossier met de stappen van aanvraag tot afgerond', geenlink: 'Bedrijfssoftware, demo op aanvraag', notitie: 'Besluit Alex 05-11: MoveFlow volledig tonen, met naam. Schermen van Jacob op staging met nepdata ("Voorbeeld Verhuizingen", nepnamen, verzonnen bedragen), geen Jacobs-logo en geen echte klanten.' },
  { id: 'urenapp', pijler: 'apps', top: true, soort: 'App op maat', titel: 'Uren-app', kort: 'Urenregistratie voor Jacobs Heteren. Medewerkers schrijven uren op hun telefoon, kantoor keurt goed en ziet verlof, declaraties en voertuigen. Ook als witte versie voor andere bedrijven.', gebouwd: ['Uren op telefoon', 'Goedkeuren', 'Verlof en declaraties', 'Witte versie'], beeld: 'telefoon', img: 'urenapp-registreren.webp', alt: 'Uren-app van Jacobs Heteren: uren registreren', geenlink: 'Werkt achter inlog, demo op aanvraag', notitie: 'Screenshot is de afgeschermde versie uit de social-post (naam weggepoetst). Het Jacobs-logo blijft staan (besluit Alex 05-11).' },
  { id: 'postleads-dashboard', pijler: 'apps', top: true, soort: 'Klantportaal', titel: 'PostLeads dashboard en CRM', kort: 'Klantportaal voor een leadservice met postkaarten. Elke klant ziet zijn gebied, verstuurde kaarten, aanvragen en wat het opleverde.', gebouwd: ['Klantportaal', 'Kaart per gebied', 'Aanvragen volgen'], img: 'postleads-dashboard.webp', alt: 'PostLeads klantportaal met demobedrijf', geenlink: 'Klantportaal, demo op aanvraag', notitie: 'Screenshot toont "Demo bedrijf" met nepcijfers en staat nu al op de live site.' },
  { id: 'kassa', pijler: 'apps', top: true, soort: 'App op maat', titel: 'Kassa', kort: 'Kassa- en voorraadapp voor een winkel die ook online verkoopt: afrekenen, voorraad tellen, inkoop binnenmelden en een bestel-advies voor wat er bij moet.', gebouwd: ['Kassa', 'Voorraad', 'Inkoop', 'Bestel-advies'], img: 'kassa-d.webp', mobiel: 'kassa-m.webp', alt: 'Kassa-app met nepdata: producten afrekenen', geenlink: 'Bedrijfssoftware, geen publieke demo', notitie: 'Bewust zonder naam of merk van de winkel (besluit Alex). Schermen met nepdata van Walter (namen Sanne, Milan, Noor zijn verzonnen).' },
  { id: 'occasioniq', pijler: 'apps', soort: 'App op maat', titel: 'OccasionIQ', kort: 'Inkooptool voor autohandelaren. Per veilingauto een advies: hoeveel je maximaal biedt, wat je eraan overhoudt en hoe snel hij verkoopt.', gebouwd: ['Veilingadvies', 'Marktvergelijking', 'Risico\'s per auto'], img: 'occasioniq-d.webp', mobiel: 'occasioniq-m.webp', alt: 'OccasionIQ met een verzonnen voorbeeldauto: advies per veilingauto', geenlink: 'Achter inlog, demo op aanvraag', notitie: 'Besluit Alex 05-11: alleen de tool en uitleg, geen cijfers of data. Het scherm toont een verzonnen voorbeeldauto.' },
  { id: 'ptapp', pijler: 'apps', soort: 'App op maat', titel: 'PT-app', kort: 'Trainingsapp waarin sporten voelt als een spel: levels, bosses en voortgang per oefening. Alle beelden zijn met code getekend.', gebouwd: ['Trainingen loggen', 'Voortgang', 'Levels en bosses'], beeld: 'telefoons', telefoons: ['pt-1.webp', 'pt-2.webp', 'pt-3.webp'], alt: 'PT-app met nepdata', cijfer: ['1,8 MB', 'was 14 MB, doordat alle beelden met code getekend zijn'], bron: 'Van ~14 MB naar 1,8 MB en versleutelde sync (AES-GCM): apps/pt-app/CLAUDE.md, aangeleverd door Brock (niet zelf ingezien, gegevensscheiding).', geenlink: 'Demo op aanvraag' },
  { id: 'babyapp', pijler: 'apps', soort: 'App op maat', titel: 'Babyapp', kort: 'Voor jonge ouders: voeding, slaap en gewicht in een paar tikken, met een vrolijk figuurtje dat meegroeit en elke mijlpaal viert.', gebouwd: ['Snel invoeren', 'Groeigrafiek', 'Mijlpalen'], beeld: 'telefoons', telefoons: ['baby-1.webp', 'baby-2.webp', 'baby-3.webp'], alt: 'Babyapp met nepdata', geenlink: 'Privé-app, getoond met nepdata', notitie: 'Privé-app: schermen met volledig nepdata van Laura, geen naam of datum van een echt kind. Bewust geen cijfers.' },

  // ---------- AUTOMATISERING ----------
  { id: 'cockpit', pijler: 'automatisering', top: true, soort: 'Automatisering', titel: 'AI-cockpit', kort: 'Eén scherm voor meerdere bedrijven: taken, mail, agenda, cijfers en een ochtendoverzicht dat elke dag om 07:00 klaarstaat.', gebouwd: ['Dashboard', 'Dagstart', 'AI-assistent'], img: 'cockpit-d.webp', mobiel: 'cockpit-m.webp', alt: 'AI-cockpit met nepdata: de dagstart', geenlink: 'Intern systeem', notitie: 'Besluit Alex 05-11: heet overal "AI-cockpit". Schermen met nepdata van Jarvis; de naam in het logo, de zoekbalk en het profiel is in beeld vervangen door "AI-cockpit" (bron-PNG\'s ongemoeid).' },
  { id: 'postleads-machine', pijler: 'automatisering', top: true, soort: 'Automatisering', titel: 'PostLeads-machine', kort: 'Haalt elke week het nieuwe woningaanbod op, koppelt het aan het gebied van elke klant en maakt de lijst voor de drukker. Klant- en drukkersmails staan vanzelf klaar.', gebouwd: ['Data ophalen', 'Weekbatches', 'Postcode-match', 'Automatische mails'], img: 'postleads-stroom.webp', alt: 'Schema van de PostLeads-machine', geenlink: 'Intern systeem', notitie: 'Beeld = het stroomschema van Pim. Het weekrun-scherm (02) bewust niet gebruikt: daar staan verzonnen cijfers in die als feit gelezen kunnen worden.' },
  { id: 'social-manager', pijler: 'automatisering', top: true, soort: 'Automatisering', titel: 'Social Manager', kort: 'Plant en plaatst posts op vaste momenten op Instagram en Facebook. Vooraf komt er een voorbeeld in Telegram, met een noodrem om een post tegen te houden.', gebouwd: ['Inplannen', 'Automatisch posten', 'Controle vooraf'], img: 'social-d.webp', mobiel: 'social-m.webp', alt: 'Social Manager met nepdata: wachtrij en cijfers', geenlink: 'Intern systeem', notitie: 'Schermen met nepdata (Studio Noord) van Jarvis; de Telegram-chat is nagebouwd. Let op: sinds september staat het Meta-account van AP Digital stil, dus "publiceert nu" niet claimen.' },
  { id: 'geo-monitor', pijler: 'automatisering', soort: 'Automatisering', titel: 'GEO-monitor', kort: 'Meet elke week of een bedrijf genoemd wordt als iemand een AI om advies vraagt, en wie er anders genoemd wordt.', gebouwd: ['AI-zichtbaarheid', 'Concurrenten', 'Wat te doen'], img: 'geo-d.webp', mobiel: 'geo-m.webp', alt: 'GEO-monitor met nepdata', cijfer: ['19', 'automatische metingen sinds 30 juni'], bron: '19 metingen sinds 30-06-2026: aangeleverd door Jarvis (niet zelf ingezien). Scherm is eerlijk: 2 engines gemeten, 2 niet.', geenlink: 'Intern systeem' },
  { id: 'seo-rapport', pijler: 'automatisering', soort: 'Automatisering', titel: 'SEO-rapportages per klant', kort: 'Search Console-cijfers worden dagelijks binnengehaald; per klant komt er een maandoverzicht in onze huisstijl: wat steeg, wat zakte en de drie acties voor volgende maand.', gebouwd: ['Dagelijkse meting', 'Maandrapport', 'Acties per maand'], img: 'seo-rapport-d.webp', alt: 'Voorbeeld SEO-maandrapport met verzonnen cijfers', geenlink: 'Voorbeeldrapport op aanvraag', notitie: 'Beeld = voorblad en trendpagina uit onze rapportgenerator (seo-roadmap-template/generate_briefing.py), gevuld met verzonnen klant Studio Noord. Voorblad toont nu de brandbook-regel "Digitaal werk dat gewoon werkt" (generator gefixt 05-11).' },
]

// Wow-ronde 04-11-2026: cases als verhaal. Alleen cijfers met een bron die we zelf gezien hebben; bron staat in `bron` en verschijnt als ontwerpnotitie.
export const verhalen = {
  moveflow: {
    probleem: 'Bij een verhuisbedrijf hangt alles aan elkaar: de aanvraag, de offerte, de planning en de bon voor de ploeg. Staat dat in losse lijsten, dan typ je alles drie keer over.',
    gebouwd: 'MoveFlow, gebouwd voor Jacobs Heteren: offertes met een rekenmotor, planning en werkbonnen, en per verhuizing één dossier met alles erin.',
    opgeleverd: 'Elk dossier loopt langs vaste stappen, en de status volgt vanzelf uit offerte, planning en factuur. Een getekende offerte blijft precies zoals de klant hem tekende. Het draait er elke dag.',
    cijfer: ['9', 'vaste stappen, van aanvraag tot afgerond'],
    bron: '9 stappen, status volgt vanzelf, getekende offerte vast: LEESMIJ.md bij de schermen, aangeleverd door Jacob uit de MoveFlow-code (stappenbalk, migraties 0168 en 0189), niet zelf ingezien (gegevensscheiding). Onderdelen ook in social-post 07-moveflow. "Draait er elke dag": kernzin Alex 05-11. Probleemzin is een concept, laten checken door Alex.',
  },
  florent: {
    probleem: 'De oude site draaide op een websitebouwer, en daarvoor op WordPress. Google kende tientallen oude adressen die nergens meer heen zouden gaan.',
    gebouwd: 'Een nieuwe site van 8 pagina\'s met een offerte-aanvraag in stappen. Aanvragen komen direct in de mailbox van het bedrijf.',
    opgeleverd: 'Elk oud adres stuurt door naar de juiste nieuwe pagina. Wie via Google binnenkomt, loopt niet dood op een foutpagina.',
    cijfer: ['52', 'oude adressen netjes doorgestuurd'],
    bron: '52 = aantal doorverwijzingen voor oude pagina\'s in florent/site/vercel.json (54 regels, min 2 voor www). Steekproef live 04-11: /verhuizen, /seniorenverhuizing, /verhuisbedrijf-ede, /offerteaanvraag geven 301. 8 pagina\'s = sitemap.xml van flo-rent.nl (04-11).',
  },
  herbergen: {
    probleem: 'Een coachingspraktijk in twee talen, op WordPress-hosting die na de introductieprijs elke maand geld ging kosten.',
    gebouwd: 'Een rustige site in het Nederlands en Engels met echte foto\'s. Daarna omgezet naar een snelle statische site, zonder WordPress eronder.',
    opgeleverd: 'Geen hostingkosten meer, alleen het domein. En niets meer om bij te werken of te beveiligen.',
    cijfer: ['€0', 'hosting per maand'],
    bron: '€0 = Cloudflare Worker op het gratis plan, alleen domeinregistratie betaald (vault her-berg/Current.md, nagemeten 15-10). Oude hosting: introprijs liep af naar 9,99 per maand (zelfde bron). 12 pagina\'s = sitemap.xml her-bergen.nl (04-11).',
  },
  urenapp: {
    probleem: 'Uren op briefjes, verlof via de telefoon en kantoor dat alles overtikt voor de loonadministratie.',
    gebouwd: 'Een app waarin de medewerkers van Jacobs Heteren uren, verlof en declaraties op hun telefoon invullen. Kantoor keurt goed in één overzicht.',
    opgeleverd: 'De export voor de loonadministratie rolt eruit, zonder overtypen. Inmiddels ook als witte versie voor andere bedrijven.',
    bron: 'Verhaal uit de goedgekeurde social-post 08-urenapp (caption.md). Geen cijfer: geen bron binnen de AP Digital-tak. Aantal gebruikers of geregistreerde uren via Jacob opvragen als we hier een cijfer willen.',
  },
  'postleads-dashboard': {
    probleem: 'Klanten van een postkaartenservice willen zien wat er in hun gebied gebeurt, zonder dat ze daarvoor moeten mailen of bellen.',
    gebouwd: 'Een klantportaal met een kaart van het eigen gebied, de verstuurde kaarten en de aanvragen die binnenkwamen.',
    opgeleverd: 'Elke klant heeft één inlog en ziet zelf wat zijn kaarten opleveren.',
    bron: 'Geen cijfer: PostLeads-data valt buiten de AP Digital-tak. Aantal klanten of kaarten via Pim opvragen als we hier een cijfer willen.',
  },
  cockpit: {
    probleem: 'Meerdere bedrijven tegelijk runnen, met mail, taken, agenda en cijfers verspreid over tien tabbladen.',
    gebouwd: 'Eén scherm voor alles, met een AI-assistent die meeleest en taken klaarzet. Beslissen blijft mensenwerk.',
    opgeleverd: 'Elke ochtend staat het dagoverzicht klaar: wat er speelt, wat vandaag moet en wat blijft liggen. De takenlijst ging van 198 open punten naar 46 echte acties.',
    cijfer: ['07:00', 'dagoverzicht klaar, elke ochtend'],
    bron: '07:00 = vaste dagstart-run op de ProDesk (root-CLAUDE.md, sectie Triggers). 198 naar 46: opschoning 19-08-2026 (vault memory/feedback_taken_ssot_cockpit.md, zelf gelezen). Inhoud van de dagstart bewust niet ingezien.',
  },
  'postleads-machine': {
    probleem: 'Elke week een nieuwe adressenlijst maken voor de drukker, per klant en per gebied, uit duizenden nieuwe woningen.',
    gebouwd: 'Een machine die elke week 6.135 tot 7.240 nieuwe woningen scant, ze koppelt aan het gebied van elke klant, dubbele adressen eruit haalt en de lijsten plus mails klaarzet.',
    opgeleverd: 'Sinds week 27 gingen er 13.337 kaarten de deur uit, de laatste vier weken gemiddeld zo\'n 700 per week. Een mens kijkt elke lijst na voor hij weggaat.',
    cijfer: ['13.337', 'kaarten de deur uit in 19 weken'],
    bron: '13.337 kaarten via bevestigde drukkersopdrachten, week 27 t/m 45 2026, laatste 4 weken gem. ~700/week: postleads data/weekcijfers.json. 6.135-7.240 nieuwe woningen per week: Woningmarkt monitor wk 38-40. Beide aangeleverd door Pim (niet zelf ingezien, gegevensscheiding). Geen urenbesparing geclaimd.',
  },
  kassa: {
    probleem: 'Een winkel die ook online verkoopt, met meerdere verkopers. Afrekenen, voorraad en kortingen moesten op één plek, ook op de telefoon.',
    gebouwd: 'Een kassa-app voor telefoon en computer: afrekenen, voorraad tellen, inkoop binnenmelden en een bestel-advies voor wat er bij moet.',
    opgeleverd: 'De voorraad loopt elke 10 minuten gelijk met de webshop. En een verkoper kan nooit onder de groothandelsprijs korten.',
    cijfer: ['10 min', 'en winkel en webshop hebben dezelfde voorraad'],
    bron: 'Sync elke 10 min en korten nooit onder groothandelsprijs: vault memory/project_snoep_app.md, aangeleverd door Walter (niet zelf ingezien, valt onder Walter).',
  },
  'social-manager': {
    probleem: 'Elke week posts maken, inplannen en apart op Instagram en Facebook zetten. Dat schiet er als eerste bij in.',
    gebouwd: 'Een wachtrij die posts op vaste momenten plaatst. Vooraf komt er een voorbeeld in Telegram: GO om te plaatsen, SKIP om tegen te houden.',
    opgeleverd: '50 plaatsingen voor AP Digital, zonder handmatig plaatsen in de app van Instagram of Facebook.',
    cijfer: ['50', 'plaatsingen voor AP Digital'],
    bron: '50 plaatsingen, IG en FB apart geteld, stand 04-11-2026: aangeleverd door Jarvis (niet zelf ingezien). Werkwijze zonder handwerk: vault memory/reference_social_publiceert_via_social_manager.md (zelf gelezen).',
  },
}

// Over-pagina (besluit Alex 05-11): nu alleen Alex. De maat erbij = een tweede object in deze lijst (naam, rol, foto, tekst); de pagina past zich vanzelf aan.
export const team = [
  {
    naam: 'Alex Prijs',
    rol: 'Oprichter · bouwt en belt',
    foto: '/img/alex-1.webp',
    kop: 'Van de verhuisvloer <span class="serif">naar software op maat.</span>',
    tekst: [
      'Alex werkt bij Jacobs Heteren, een verhuisbedrijf in de Betuwe. Daar zag hij elke dag waar het werk bleef hangen: uren op briefjes, aanvragen in de mail en een planning in losse lijsten.',
      'Dus bouwde hij het zelf: een uren-app, een planningssysteem en een website die aanvragen binnenhaalt. Dat draait er nu elke dag. Met AP Digital bouwt hij hetzelfde voor jouw bedrijf.',
    ],
    notitie: 'Concepttekst op basis van besluit 9 (Jacobs Heteren mag genoemd worden). Alex checkt de woorden en zijn rol.',
  },
]

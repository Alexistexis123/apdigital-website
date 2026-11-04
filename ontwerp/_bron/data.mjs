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
    aanbod: [['Instap', 'Voor wie snel een nette, duidelijke site nodig heeft.'], ['Groei', 'Meer pagina\'s, formulieren en lokale vindbaarheid.'], ['Onderhoud', 'Hosting, kleine aanpassingen en updates.']],
    faq: [
      ['Kan ik daarna zelf teksten aanpassen?', 'Dat hangt af van hoe we de site bouwen. We bespreken vooraf wat je zelf wilt kunnen en kiezen de bouw daarop.'],
      ['Houd ik mijn plek in Google?', 'Pagina\'s die nu al gevonden worden houden we, of we sturen ze netjes door naar de nieuwe pagina. Zo raak je geen bezoekers kwijt.'],
      ['Hoe lang duurt het?', `${'<span class="ph">Doorlooptijd nog vastleggen per pakket</span>'}`],
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
  { id: 'jmc', pijler: 'websites', soort: 'Website', status: 'Ontwerp', titel: 'Jacobs Motor Company', kort: 'Handel in gebruikte bedrijfswagens en export. Site met voorraad en aanvraag, nu nog in ontwerp.', gebouwd: ['Voorraad', 'Export-aanvraag'], img: 'jmc-d.webp', alt: 'Ontwerp website Jacobs Motor Company', url: 'https://jacobs-motor-company-site.vercel.app/', linktekst: 'Bekijk het ontwerp', notitie: 'Staat nog niet live (alleen op vercel.app, de site toont zelf "Ontwerp, nog niet live"). Tonen als ontwerp of pas na livegang: Alex.' },

  // ---------- APPS ----------
  { id: 'moveflow', pijler: 'apps', top: true, soort: 'App op maat', titel: 'MoveFlow', kort: 'Het systeem waar een verhuisbedrijf op draait: van aanvraag en offerte tot planning en werkbon voor de ploeg.', gebouwd: ['Offertes', 'Planning', 'Dossiers', 'Dashboard'], beeld: 'tekst', punten: [['Offertes met rekenmotor', 'Prijs berekend, netjes de deur uit.'], ['Planning en werkbonnen', 'Van agenda naar de bon voor de ploeg.'], ['Klant- en dossierbeheer', 'Elke verhuizing op een plek.'], ['Alles in een dashboard', 'Overzicht en cijfers.']], geenlink: 'Bedrijfssoftware, geen publieke demo', notitie: 'BESLISPUNT: MoveFlow valt onder de Bas-licentie (IP en geheimhouding tot minimaal 2031). Daarom bewust geen schermen, alleen deze vier punten in onze eigen huisstijl (zelfde tekst als de social-post van juli). Mag MoveFlow met naam erin, zonder naam ("planningssysteem voor een verhuisbedrijf"), of helemaal niet?' },
  { id: 'urenapp', pijler: 'apps', top: true, soort: 'App op maat', titel: 'Uren-app', kort: 'Urenregistratie voor een verhuisbedrijf. Medewerkers schrijven uren op hun telefoon, kantoor keurt goed en ziet verlof, declaraties en voertuigen. Ook als witte versie voor andere bedrijven.', gebouwd: ['Uren op telefoon', 'Goedkeuren', 'Verlof en declaraties', 'Witte versie'], beeld: 'telefoon', img: 'urenapp-registreren.webp', alt: 'Uren-app: uren registreren', geenlink: 'Werkt achter inlog, demo op aanvraag', notitie: 'Screenshot is de afgeschermde versie uit de social-post (naam weggepoetst). Logo van Jacobs is klein zichtbaar: akkoord Jacobs nodig, of een whitelabel-screenshot met nepdata.' },
  { id: 'postleads-dashboard', pijler: 'apps', top: true, soort: 'Klantportaal', titel: 'PostLeads dashboard en CRM', kort: 'Klantportaal voor een leadservice met postkaarten. Elke klant ziet zijn gebied, verstuurde kaarten, aanvragen en wat het opleverde.', gebouwd: ['Klantportaal', 'Kaart per gebied', 'Aanvragen volgen'], img: 'postleads-dashboard.webp', alt: 'PostLeads klantportaal met demobedrijf', geenlink: 'Klantportaal, demo op aanvraag', notitie: 'Screenshot toont "Demo bedrijf" met nepcijfers en staat nu al op de live site.' },
  { id: 'kassa', pijler: 'apps', top: true, soort: 'App op maat', titel: 'Kassa- en voorraadapp', kort: 'Voor een winkel: afrekenen, voorraad tellen, inkoop binnenmelden en een bestel-advies voor wat er bij moet.', gebouwd: ['Kassa', 'Voorraad', 'Inkoop', 'Bestel-advies'], beeld: 'nep', geenlink: 'Bedrijfssoftware, geen publieke demo', notitie: 'Bewust zonder naam of merk van de winkel. Screenshot met nepdata en zonder logo laten maken door Walter.' },
  { id: 'occasioniq', pijler: 'apps', soort: 'App op maat', titel: 'OccasionIQ', kort: '<span class="ph">Omschrijving in 1-2 zinnen via Walter</span>', gebouwd: ['Webapp'], beeld: 'nep', geenlink: 'Achter inlog', notitie: 'occasioniq.vercel.app vraagt om toegang (/toegang), dus geen publieke screenshot gemaakt.' },
  { id: 'ptapp', pijler: 'apps', soort: 'App op maat', titel: 'PT-app', kort: 'App voor personal training. <span class="ph">omschrijving en screenshot met nepdata via Brock</span>', gebouwd: ['Webapp'], beeld: 'nep', geenlink: 'Demo op aanvraag' },
  { id: 'babyapp', pijler: 'apps', soort: 'App op maat', titel: 'Babyapp', kort: '<span class="ph">Omschrijving en screenshot met nepdata via Laura</span>', gebouwd: ['Webapp'], beeld: 'nep', geenlink: 'Privé-app, alleen met nepdata te tonen', notitie: 'Privé-app: alleen tonen met volledig nepdata, geen namen of datums van echte personen.' },

  // ---------- AUTOMATISERING ----------
  { id: 'cockpit', pijler: 'automatisering', top: true, soort: 'Automatisering', titel: 'Bedrijfscockpit', kort: 'Eén scherm voor meerdere bedrijven: taken, mail, agenda, cijfers en een ochtendoverzicht dat elke dag om 07:00 klaarstaat.', gebouwd: ['Dashboard', 'Dagstart', 'AI-assistent'], beeld: 'nep', geenlink: 'Intern systeem', notitie: 'Intern heet dit de Harvey-cockpit. Op de site alleen met nepdata en zonder privé-gegevens. Naam "Harvey" tonen of neutraal "bedrijfscockpit": Alex.' },
  { id: 'postleads-machine', pijler: 'automatisering', top: true, soort: 'Automatisering', titel: 'PostLeads-machine', kort: 'Haalt elke week het nieuwe woningaanbod op, koppelt het aan het gebied van elke klant en maakt de lijst voor de drukker. Klant- en drukkersmails gaan automatisch.', gebouwd: ['Data ophalen', 'Weekbatches', 'Postcode-match', 'Automatische mails'], beeld: 'nep', geenlink: 'Intern systeem', notitie: 'Screenshot met nepdata nog maken (Pim). Geen echte adressen of klantnamen in beeld.' },
  { id: 'social-manager', pijler: 'automatisering', top: true, soort: 'Automatisering', titel: 'Social Manager', kort: 'Plant en publiceert posts op vaste momenten op Instagram en Facebook. Vooraf komt er een voorbeeld binnen, met een noodrem om een post tegen te houden.', gebouwd: ['Inplannen', 'Automatisch posten', 'Controle vooraf'], beeld: 'nep', geenlink: 'Intern systeem', notitie: 'Let op: sinds september staat het eigen Meta-account van AP Digital stil. Het systeem bestaat en heeft gedraaid, maar "publiceert nu" niet claimen.' },
  { id: 'geo-monitor', pijler: 'automatisering', soort: 'Automatisering', titel: 'GEO-monitor', kort: 'Meet of een bedrijf genoemd wordt in de antwoorden van AI-zoekmachines zoals ChatGPT en Google.', gebouwd: ['AI-zichtbaarheid', 'Meting'], beeld: 'nep', geenlink: 'Intern systeem' },
  { id: 'seo-rapport', pijler: 'automatisering', soort: 'Automatisering', titel: 'SEO-rapportages per klant', kort: 'Search Console-cijfers worden dagelijks binnengehaald; per klant komt er een maandoverzicht in onze huisstijl.', gebouwd: ['Dagelijkse meting', 'Maandrapport'], beeld: 'nep', geenlink: 'Voorbeeldrapport op aanvraag' },
]

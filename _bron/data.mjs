// Site-data apdigital.nl (herstart, besluiten Alex 04-11 en 05-11-2026). Teksten 1-op-1 uit het goedgekeurde ontwerp (branch ontwerp-herstart).
// Alleen feiten met een bron; de bronnen staan als commentaar of in bron-velden (die komen niet op de site).

// ---------- LIJN B: WEBSITE BOUWEN, NIEUW OF HERDESIGN ----------
// Bron: vault Areas/AP Digital/aanbod.md, lijn B, vastgesteld door Alex op 11-11-2026. Vervangt Starter, Groei en Premium
// en de onderhoudsabonnementen Brons, Zilver en Goud. Alleen wat daar als vastgesteld staat; de rijen volgen de tabel.
// Waar de tabel "plus ..." zegt staat hier "Zoals de <vorige maat>, plus ...", zodat een kaart ook los te lezen is.
// De actie (Startsite gratis bij een jaar maandpakket) staat sinds 13-11-2026 op de site (go Alex 13-11), zie ACTIE in build.mjs.
export const maten = [
  { naam: 'Startsite', prijs: '€299', getal: '299', kop: 'Online in 2 dagen.',
    rijen: [['Pagina\'s', 'Tot 3'], ['Online in', '2 dagen'], ['Teksten', 'Lever je zelf aan, met foto\'s en logo'], ['Ontwerp', 'Vast ontwerp in jouw kleuren en logo'], ['Vindbaarheid', 'Basis: titel en omschrijving'], ['Erbij', 'Formulier, bel- en WhatsApp-knop'], ['Aanpasrondes', '1']] },
  { naam: 'Website', prijs: '€595', getal: '595', kop: 'Wij schrijven je teksten.',
    rijen: [['Pagina\'s', 'Tot 5'], ['Online in', '7 dagen'], ['Teksten', 'Schrijven wij, op basis van een vragenlijst'], ['Ontwerp', 'Vast ontwerp'], ['Vindbaarheid', 'Elke pagina ingesteld op een zoekterm'], ['Erbij', 'Zoals de Startsite, plus offerte-aanvraag'], ['Aanpasrondes', '2']] },
  { naam: 'Bedrijfssite', prijs: '€1.250', getal: '1250', kop: 'Een eigen ontwerp, speciaal voor jou.',
    rijen: [['Pagina\'s', 'Tot 10'], ['Online in', '14 dagen'], ['Teksten', 'Schrijven wij'], ['Ontwerp', 'Eigen ontwerp, speciaal voor jou'], ['Vindbaarheid', 'Zoals de Website, plus een pagina per dienst en per plaats'], ['Erbij', 'Zoals de Website, plus reviews en projecten in beeld'], ['Aanpasrondes', '3']] },
  { naam: 'Maatwerk', prijs: '€2.500', getal: '2500', vanaf: true, kop: 'Voor als de site meer moet doen.',
    rijen: [['Pagina\'s', 'In overleg'], ['Online in', 'In overleg'], ['Teksten', 'In overleg'], ['Ontwerp', 'In overleg'], ['Vindbaarheid', 'In overleg'], ['Erbij', 'De site neemt werk over: webshop, boekingen, betalen, koppelingen'], ['Aanpasrondes', 'In overleg']] },
]
// ---------- NA DE BOUW: HOSTING IS EEN KEUZE UIT TWEE, HET MAANDPAKKET IS IETS ANDERS ----------
// Twee besluiten van Alex op 12-11-2026:
// 1. "Ja, mag zelf": een maandbedrag is geen verplichting. Over hosting kies je uit twee: Online houden (€49 per maand) of zelf hosten.
// 2. "doe maar hosting bij in": het maandpakket voor vindbaarheid (lijn A, €299 / €499 / €799) is GEEN hosting-keuze maar een ander
//    onderwerp. Wie een site en een maandpakket neemt betaalt alleen het maandpakket; Online houden zit daar dan bij in.
//    Dat geldt voor alle drie de maandpakketten. Zet het maandpakket dus nooit als kaart naast Online houden en zelf hosten.
// De grens bij punt 2 is een invulling van Harvey, niet door Alex beslist, en staat in build.mjs (IN_PAKKET_GRENS): één website
// die bij ons staat, precies wat Online houden is en niets meer, het domein zit er niet in. Beloof er niets bij.
// Het domein zit niet in de €49 (standaardkeuze, beslispunt Alex).

// HET HALVE UUR: de enige plek waar de tekst over de wijzigingen van Online houden staat. Alex wil dit mogelijk anders
// formuleren ("is zo specifiek", 12-11-2026, nog geen besluit). Wijzig dan alleen deze vier vormen: build.mjs gebruikt ze
// overal, ook op de oude pagina's, in de FAQ's en in de JSON-LD. Schrijf de tekst dus nergens anders met de hand.
export const wijzigingen = {
  tijd: 'een half uur',                         // "Er zit een half uur per maand in"
  kort: 'een half uur wijzigingen',             // in een opsomming
  maand: 'een half uur wijzigingen per maand',  // voluit, ook de regel op de kaart
  grens: 'het halve uur',                       // "wijzigingen boven het halve uur"
}
export const hoofd = s => s.charAt(0).toUpperCase() + s.slice(1)
// inhoud en inhoudMaand = wat Online houden is, als zin. Eén bron voor elke opsomming op de site.
export const onlineHouden = {
  naam: 'Online houden', prijs: '€49', getal: '49',
  punten: ['Hosting', 'Updates', 'Back-ups', hoofd(wijzigingen.maand)],
  inhoud: `hosting, updates, back-ups en ${wijzigingen.kort}`,
  inhoudMaand: `hosting, updates, back-ups en ${wijzigingen.maand}`,
}
// De doorlopende zinnen, op elke pagina gelijk (stadspagina's, /websites-laten-maken, redesign, restaurant, B&B, blogs).
// keuze = de keuze uit twee over hosting. inPakket = kort dat Online houden in een maandpakket zit.
export const naDeBouw = {
  keuze: `Na de bouw kies je zelf: ${onlineHouden.naam} voor ${onlineHouden.prijs} per maand, of je regelt de hosting zelf.`,
  inPakket: `Neem je een maandpakket voor vindbaarheid, dan zit ${onlineHouden.naam} erbij in.`,
}
// Het blok "Dit zit in de Startsite" op /websites-laten-maken en de 24 stadspagina's.
export const startsite = {
  kop: 'Dit zit in de Startsite van €299',
  punten: ["Tot 3 pagina's", 'Online in 2 dagen', "Teksten, foto's en logo lever je zelf aan", 'Vast ontwerp in jouw kleuren en logo', 'Basis vindbaarheid: titel en omschrijving', 'Formulier, bel- en WhatsApp-knop', '1 aanpasronde', 'Goed op mobiel, snel en beveiligd'],
  meer: `Meer nodig? Website €595, Bedrijfssite €1.250 of Maatwerk vanaf €2.500. ${naDeBouw.keuze} ${naDeBouw.inPakket} Prijzen excl. btw.`,
}
// Zelf hosten. De grens komt uitsluitend uit de voorwaarden, artikel 8 (AP Digital helpt bij het koppelen van de website) en uit
// wat Online houden is: wat daar in zit (hosting, updates, back-ups, een half uur wijzigingen) doen wij dan niet. Wijzigingen gaan
// tegen het bestaande uurtarief. Geen nieuwe belofte en geen nieuw tarief: verzin hier niets bij.
export const zelfHosten = {
  naam: 'Zelf hosten',
  punten: ['Hosting en domein neem je zelf af, bij een partij naar keuze', 'Wij helpen met het koppelen van je site', 'Updates en back-ups regel je ook zelf', 'Wijzigingen doen we tegen uurtarief'],
}

// ---------- LIJN C: APPS BOUWEN ----------
// Bron: vault Areas/AP Digital/aanbod.md, lijn C, vastgesteld door Alex op 13-11-2026. Drie maten met een vanaf-prijs; het exacte
// bedrag volgt na een gratis gesprek, op papier, vóór we beginnen. Beheer per maand hoort er bij alle drie bij.
// Nog open bij Alex en daarom NIET op de site: wat er precies in het beheer zit, vanaf wanneer de week van de eerste versie telt,
// hoe lang het beheer verplicht is, en of eigen apps als bewijs bij de maten getoond mogen worden. Verzin daar niets bij.
export const appMaten = [
  { naam: 'Tool op maat', prijs: '€1.500', getal: '1500', kop: 'Eén klus gaat automatisch.',
    rijen: [['Erin', 'Eén taak, van begin tot eind'], ['Voorbeelden', 'Offertecalculator, urenstaat, boekingsformulier'], ['Klaar in', '1 tot 2 weken'], ['Beheer per maand', '€99']] },
  { naam: 'App op maat', prijs: '€5.000', getal: '5000', kop: 'Je team logt in en werkt erin.',
    rijen: [['Erin', 'Meerdere gebruikers, login, overzichten'], ['Voorbeelden', 'Urenregistratie voor een team, voorraad en kassa'], ['Klaar in', '4 tot 6 weken'], ['Beheer per maand', '€249']] },
  { naam: 'Software op maat', prijs: '€15.000', getal: '15000', kop: 'Alles van je bedrijf op één plek.',
    rijen: [['Erin', 'Koppelingen, betalingen, rollen, klantomgeving'], ['Voorbeelden', 'Klantportaal, planning'], ['Klaar in', 'In overleg'], ['Beheer per maand', 'In overleg']] },
]
export const appBelofte = 'Binnen een week heb je een werkende eerste versie om op te klikken.'
export const appGrens = [
  'De vanaf-prijs is een ondergrens, geen offerte. Het vaste bedrag staat in het voorstel na het gesprek, vóór we beginnen.',
  'Wat buiten de afgesproken opdracht valt kost extra, tegen uurtarief of met een aparte offerte. Dat melden we vooraf.',
  'Beheer per maand hoort erbij, bij alle drie de maten.',
  'Na volledige betaling krijg je de broncode van je eigen toepassing.',
]

export const pijlers = [
  {
    key: 'websites', slug: 'websites-laten-maken', naam: 'Websites', label: '01 · Vindbaar in Google en AI · Websites',
    kort: 'Een site die klanten oplevert, op je telefoon net zo goed als op je laptop.',
    voorbeelden: ['Nieuwe site of vernieuwing', 'Offerte- en contactformulieren', 'Vindbaar in Google, ook lokaal'],
    h1: 'Een website die <span class="serif">klanten oplevert.</span>',
    intro: 'Veel bedrijven hebben een site die ooit is gemaakt en daarna is blijven staan. Wij bouwen hem opnieuw: snel, duidelijk, met je eigen foto\'s en een knop waar mensen ook echt op drukken.',
    pijnKop: 'Je site doet <span class="serif">niet wat hij moet doen.</span>',
    pijn: ['Op je telefoon is hij lastig te lezen of te bedienen', 'Er komen weinig aanvragen via binnen', 'Je kunt zelf niets meer aanpassen, of je weet niet meer wie hem beheert', 'Hij ziet er ouder uit dan je bedrijf is'],
    watKop: 'Van eerste ontwerp <span class="serif">tot vindbaar.</span>',
    wat: [
      ['Nieuwe site of vernieuwing', 'In je eigen huisstijl, met echte foto\'s van je bedrijf. Geen standaardthema met stockfoto\'s.'],
      ['Aanvragen die binnenkomen', 'Offerteformulier, bel- en WhatsApp-knop op de plek waar mensen ze zoeken. Elke aanvraag meetbaar.'],
      ['Vindbaar in Google', 'Goede basis voor zoekmachines: titels, snelheid, pagina\'s per dienst of plaats waar dat zin heeft.'],
    ],
    prijs: 'Vanaf €299, online in 2 dagen',
    // Lijn B (zie `maten` bovenaan): de vier maten, kort. De volledige tabel staat op /pakketten.
    aanbod: [
      ['Startsite', 'Tot 3 pagina\'s. Je levert zelf je teksten, foto\'s en logo aan.', '€299', 'online in 2 dagen'],
      ['Website', 'Tot 5 pagina\'s. Wij schrijven de teksten, op basis van een vragenlijst.', '€595', 'online in 7 dagen'],
      ['Bedrijfssite', 'Tot 10 pagina\'s, met een eigen ontwerp. Wij schrijven de teksten.', '€1.250', 'online in 14 dagen'],
      ['Maatwerk', 'De site neemt werk over: webshop, boekingen, betalen, koppelingen.', 'vanaf €2.500', 'in overleg'],
    ],
    aanbodGrens: startsite,
    faq: [
      ['Kan ik daarna zelf teksten aanpassen?', 'Dat hangt af van hoe we de site bouwen. We bespreken vooraf wat je zelf wilt kunnen en kiezen de bouw daarop.'],
      ['Houd ik mijn plek in Google?', 'Pagina\'s die nu al gevonden worden houden we, of we sturen ze netjes door naar de nieuwe pagina. Zo raak je geen bezoekers kwijt.'],
      ['Hoe lang duurt het?', 'Een Startsite staat in 2 dagen online, een Website in 7 dagen en een Bedrijfssite in 14 dagen. Maatwerk plannen we in overleg.'],
      ['Kost een herdesign meer dan een nieuwe site?', 'Nee. Een herdesign kost hetzelfde als een nieuwe site, met dezelfde vier maten.'],
    ],
    cta: 'Benieuwd wat een nieuwe site <span class="serif">jou oplevert?</span>',
  },
  {
    key: 'apps', slug: 'apps-laten-maken', naam: 'Apps', label: '02 · Software en automatisering · Apps op maat',
    kort: 'Software die past op hoe jouw bedrijf werkt, in plaats van andersom.',
    voorbeelden: ['Planning en werkbonnen', 'Urenregistratie', 'Kassa, voorraad, klantportaal'],
    h1: 'Een app die past op <span class="serif">hoe jij werkt.</span>',
    intro: 'Standaardsoftware dwingt je bedrijf in een vorm. Wij bouwen de app om je werk heen: je eigen stappen, je eigen woorden, op telefoon en computer.',
    pijnKop: 'Je bedrijf draait op <span class="serif">Excel en losse briefjes.</span>',
    pijn: ['Hetzelfde wordt twee of drie keer overgetypt', 'Uren, planning of voorraad staan in verschillende lijsten', 'Standaardsoftware doet de helft van wat je nodig hebt', 'Alleen jij weet hoe het systeem werkt'],
    watKop: 'Software voor <span class="serif">de werkvloer.</span>',
    wat: [
      ['Planning en dossiers', 'Van aanvraag tot offerte, planning en werkbon in één systeem.'],
      ['Uren en personeel', 'Medewerkers schrijven uren op hun telefoon, kantoor keurt goed en exporteert.'],
      ['Klantportalen en kassa', 'Je klanten zien hun eigen gegevens. Je winkel rekent af en houdt voorraad bij.'],
    ],
    prijs: 'Vanaf €1.500',
    aanbod: [], // de drie maten komen uit appMaten (lijn C), zie pijlerPagina in build.mjs
    faq: [
      ['Werkt het op telefoon en computer?', 'De apps in ons portfolio werken in de browser, op telefoon en computer, zonder app store.'],
      ['Wat als we later meer willen?', 'Dan bouwen we door op wat er staat. Zo zijn de apps in ons portfolio ook gegroeid.'],
      ['Wat kost een app?', 'Een tool op maat begint bij €1.500, een app op maat bij €5.000 en software op maat bij €15.000, excl. btw. Dat zijn vanaf-prijzen. Het vaste bedrag krijg je na een gratis gesprek op papier, vóór we beginnen.'],
      ['Hoe snel zie ik iets?', 'Binnen een week heb je een werkende eerste versie om op te klikken. Een tool op maat is in 1 tot 2 weken klaar, een app op maat in 4 tot 6 weken. Software op maat plannen we in overleg.'],
      ['Wat kost het per maand?', 'Beheer per maand hoort erbij: €99 bij een tool op maat en €249 bij een app op maat, excl. btw. Bij software op maat spreken we het af in overleg.'],
    ],
    cta: 'Loopt je bedrijf vast op <span class="serif">handwerk en lijstjes?</span>',
  },
  {
    key: 'automatisering', slug: 'processen-automatiseren', naam: 'Automatisering', label: '02 · Software en automatisering · Processen',
    kort: 'Werk dat elke week terugkomt, laten we automatisch lopen.',
    voorbeelden: ['Rapportages die zichzelf maken', 'Mails en posts op de juiste tijd', 'Eén dashboard voor alles'],
    h1: 'Werk dat terugkomt, <span class="serif">loopt vanzelf.</span>',
    intro: 'Elke week dezelfde lijst maken, dezelfde mails sturen, dezelfde cijfers overtikken. Dat bouwen we om naar iets dat zelf draait, met jou als controle in plaats van als uitvoerder.',
    pijnKop: 'Je bent elke week <span class="serif">hetzelfde aan het doen.</span>',
    pijn: ['Lijsten en rapportages maak je met de hand', 'Klanten en leveranciers krijgen steeds dezelfde mail', 'Cijfers staan verspreid over vijf systemen', 'Als jij er niet bent, blijft het liggen'],
    watKop: 'Van handwerk <span class="serif">naar een vaste machine.</span>',
    wat: [
      ['Gegevens ophalen en koppelen', 'Data uit websites, systemen en spreadsheets automatisch bij elkaar brengen.'],
      ['Mails, posts en rapporten', 'Op vaste momenten de juiste mail, post of rapportage, met een controle-moment voor jou.'],
      ['Eén overzicht', 'Een dashboard waar je ziet wat er speelt, in plaats van tien tabbladen.'],
    ],
    prijs: 'Prijs op aanvraag',
    aanbod: [['Processcan', 'We kijken welk terugkerend werk het meeste tijd kost.'], ['Eén automatisering', 'Eén proces dat vanaf dan zelf loopt.'], ['Beheer', 'We houden het draaiend en passen aan als er iets verandert.']],
    faq: [
      ['Moet ik alles uit handen geven?', 'Nee. Bij de automatiseringen in ons portfolio zit steeds een moment waarop een mens kijkt of goedkeurt.'],
      ['Werkt het met mijn huidige systemen?', 'Vaak wel. In het gratis gesprek kijken we welke systemen je gebruikt en wat daarmee te koppelen is. Kan het niet netjes, dan zeggen we dat ook.'],
      ['Wat als er iets misgaat?', 'Voor we bouwen spreken we af wie er kijkt als er iets stokt en hoe snel. Dat staat in het voorstel, samen met de prijs.'],
      ['Wat kost het?', 'De prijs is op aanvraag. Een automatisering kan heel klein of heel groot zijn, daarom werken we hier zonder pakketten. Na een gratis gesprek krijg je de prijs op papier, vóór we beginnen.'],
    ],
    cta: 'Welk werk wil jij <span class="serif">nooit meer zelf doen?</span>',
  },
]

export const projecten = [
  // ---------- WEBSITES ----------
  { id: 'florent', pijler: 'websites', top: true, soort: 'Website', titel: 'Flo-Rent Verhuizingen', kort: 'Verhuisbedrijf uit Heteren. Nieuwe site met een offerte-aanvraag in stappen, zodat mensen hun verhuizing makkelijk doorgeven.', gebouwd: ['Redesign', 'Offerte-aanvraag', 'Mobiel eerst'], img: 'florent-d.webp', mobiel: 'florent-m.webp', alt: 'Website Flo-Rent Verhuizingen', url: 'https://www.flo-rent.nl/' },
  { id: 'jacobs', pijler: 'websites', top: true, soort: 'Website', titel: 'Jacobs Heteren', kort: 'Verhuisbedrijf in Gelderland. Website met de offerte-aanvraag direct op de voorpagina.', gebouwd: ['Website', 'Offerteformulier'], img: 'jacobs-d.webp', mobiel: 'jacobs-m.webp', alt: 'Website Jacobs Heteren', url: 'https://www.jacobsheteren.nl/', notitie: 'Omschrijving wat wij precies aan deze site deden graag laten checken (Jacob/Alex). Geen claim over eigen mensen of aantallen.' },
  { id: 'herbergen', pijler: 'websites', top: true, soort: 'Website', titel: 'Her-bergen', kort: 'Praktijk voor systemische coaching. Rustige, warme site in het Nederlands en Engels, met echte foto\'s in plaats van stockbeeld.', gebouwd: ['Tweetalig NL/EN', 'Eigen huisstijl', 'Contactformulier'], img: 'herbergen-d.webp', mobiel: 'herbergen-m.webp', alt: 'Website Her-bergen', url: 'https://her-bergen.nl/' },
  { id: 'casa5', pijler: 'websites', top: true, soort: 'Website', titel: 'Casa Agosto Azul', kort: 'Vakantieappartement in de Algarve. Site in vier talen met foto\'s, prijzen en beschikbaarheid, zodat gasten direct kunnen boeken.', gebouwd: ['Vier talen', 'Prijzen en beschikbaarheid', 'Reserveren'], img: 'casa5-d.webp', mobiel: 'casa5-m.webp', alt: 'Website Casa Agosto Azul', url: '/casa5', caseUrl: '/case-casa5', notitie: 'In onze mappen heet dit project Casa 5; de site zelf heet Casa Agosto Azul. Draait nu op apdigital.nl/casa5, casa5.eu toont nog de oude site. Welke link we tonen: Alex.' },
  { id: 'rhscooter', pijler: 'websites', soort: 'Website', titel: 'RH Scooter Service', kort: 'Scooterwerkplaats in Arnhem. Pagina\'s per merk en per plaats, zodat mensen hem vinden op wat ze zoeken.', gebouwd: ['Website', 'Lokale SEO', 'Bel- en app-knop'], img: 'rhscooter-d.webp', alt: 'Website RH Scooter Service', url: 'https://rhscooterservicearnhem.nl/' },
  { id: 'marketingfit', pijler: 'websites', soort: 'Website', titel: 'Marketing Fit', kort: 'Contentstrateeg. WordPress-site met diensten, cases en een duidelijke knop voor een kennismaking.', gebouwd: ['WordPress', 'Diensten en cases'], img: 'marketingfit-d.webp', alt: 'Website Marketing Fit', url: 'https://marketing-fit.nl/', caseUrl: '/case-marketing-fit' },
  { id: 'jmc', pijler: 'websites', soort: 'Website', titel: 'Jacobs Motor Company', kort: 'Handel in gebruikte bedrijfswagens en export. Ontwerp voor een site met voorraad en een aanvraag voor export.', gebouwd: ['Voorraad', 'Export-aanvraag'], img: 'jmc-d.webp', alt: 'Ontwerp website Jacobs Motor Company', geenlink: 'Ontwerp', notitie: 'Besluit Alex 05-11: nu al tonen als ontwerp met label "binnenkort live", zonder link. Link erbij zodra de site live staat.' },

  // ---------- APPS ----------
  // MoveFlow: schermen op nepdata van Jacob (staging, 05-11-2026), bron C:/dev/apdigital-beeld/moveflow/ met LEESMIJ.md.
  { id: 'moveflow', pijler: 'apps', top: true, soort: 'App op maat', titel: 'MoveFlow', kort: 'Planningssysteem voor een verhuisbedrijf, gebouwd voor Jacobs Heteren: aanvraag, offerte, planning en werkbon in één dossier per verhuizing.', gebouwd: ['Offertes', 'Planning', 'Werkbon op telefoon'], img: 'moveflow-d.webp', mobiel: 'moveflow-m.webp', galerij: [['moveflow-d.webp', 'Dossier', 'MoveFlow met nepdata: een verhuisdossier met de stappen van aanvraag tot afgerond'], ['moveflow-planning-d.webp', 'Planning', 'MoveFlow met nepdata: de weekplanning met verhuizingen en taxaties'], ['moveflow-offerte-d.webp', 'Offerte', 'MoveFlow met nepdata: een offerte die de klant online accepteerde']], alt: 'MoveFlow met nepdata: een verhuisdossier met de stappen van aanvraag tot afgerond', geenlink: 'Bedrijfssoftware, demo op aanvraag', notitie: 'Besluit Alex 05-11: MoveFlow volledig tonen, met naam. Schermen van Jacob op staging met nepdata ("Voorbeeld Verhuizingen", nepnamen, verzonnen bedragen), geen Jacobs-logo en geen echte klanten.' },
  { id: 'urenapp', pijler: 'apps', top: true, soort: 'App op maat', titel: 'Uren-app', kort: 'Urenregistratie voor Jacobs Heteren. Medewerkers schrijven hun uren op de telefoon, kantoor keurt ze goed.', gebouwd: ['Uren op telefoon', 'Goedkeuren', 'Verlof en declaraties'], beeld: 'telefoon', img: 'urenapp-registreren.webp', alt: 'Uren-app van Jacobs Heteren: uren registreren', geenlink: 'Werkt achter inlog, demo op aanvraag', notitie: 'Screenshot is de afgeschermde versie uit de social-post (naam weggepoetst). Het Jacobs-logo blijft staan (besluit Alex 05-11).' },
  { id: 'postleads-dashboard', pijler: 'apps', top: true, soort: 'Klantportaal', titel: 'PostLeads dashboard en CRM', kort: 'Klantportaal voor een leadservice met postkaarten. Voor klanten die zelf willen zien wat er in hun gebied gebeurt.', gebouwd: ['Klantportaal', 'Kaart per gebied', 'Aanvragen volgen'], img: 'postleads-dashboard.webp', alt: 'PostLeads klantportaal met demobedrijf', geenlink: 'Klantportaal, demo op aanvraag', notitie: 'Screenshot toont "Demo bedrijf" met nepcijfers en staat nu al op de live site.' },
  { id: 'kassa', pijler: 'apps', top: true, soort: 'App op maat', titel: 'Kassa', kort: 'Kassa- en voorraadapp voor een winkel die ook online verkoopt. Afrekenen, voorraad tellen en een advies voor wat er bij moet.', gebouwd: ['Kassa', 'Voorraad', 'Bestel-advies'], img: 'kassa-d.webp', mobiel: 'kassa-m.webp', alt: 'Kassa-app met nepdata: producten afrekenen', geenlink: 'Bedrijfssoftware, geen publieke demo', notitie: 'Bewust zonder naam of merk van de winkel (besluit Alex). Schermen met nepdata van Walter (namen Sanne, Milan, Noor zijn verzonnen).' },
  { id: 'occasioniq', pijler: 'apps', soort: 'App op maat', titel: 'OccasionIQ', kort: 'Inkooptool voor autohandelaren. Per veilingauto een advies: hoeveel je maximaal biedt, wat je eraan overhoudt en hoe snel hij verkoopt.', gebouwd: ['Veilingadvies', 'Marktvergelijking', 'Risico\'s per auto'], img: 'occasioniq-d.webp', mobiel: 'occasioniq-m.webp', alt: 'OccasionIQ met een verzonnen voorbeeldauto: advies per veilingauto', geenlink: 'Achter inlog, demo op aanvraag', notitie: 'Besluit Alex 05-11: alleen de tool en uitleg, geen cijfers of data. Het scherm toont een verzonnen voorbeeldauto.' },
  { id: 'ptapp', pijler: 'apps', soort: 'App op maat', titel: 'PT-app', kort: 'Trainingsapp waarin sporten voelt als een spel, met levels, bosses en voortgang per oefening.', gebouwd: ['Trainingen loggen', 'Voortgang', 'Levels en bosses'], beeld: 'telefoons', telefoons: ['pt-1.webp', 'pt-2.webp', 'pt-3.webp'], alt: 'PT-app met nepdata', bron: 'Van ~14 MB naar 1,8 MB en versleutelde sync (AES-GCM): apps/pt-app/CLAUDE.md, aangeleverd door Brock (niet zelf ingezien, gegevensscheiding).', geenlink: 'Demo op aanvraag' },
  { id: 'babyapp', pijler: 'apps', soort: 'App op maat', titel: 'Babyapp', kort: 'Voor jonge ouders: voeding, slaap en gewicht in een paar tikken, met een vrolijk figuurtje dat meegroeit en elke mijlpaal viert.', gebouwd: ['Snel invoeren', 'Groeigrafiek', 'Mijlpalen'], beeld: 'telefoons', telefoons: ['baby-1.webp', 'baby-2.webp', 'baby-3.webp'], alt: 'Babyapp met nepdata', geenlink: 'Privé-app, getoond met nepdata', notitie: 'Privé-app: schermen met volledig nepdata van Laura, geen naam of datum van een echt kind. Bewust geen cijfers.' },

  // ---------- AUTOMATISERING ----------
  { id: 'cockpit', pijler: 'automatisering', top: true, soort: 'Automatisering', titel: 'AI-cockpit', kort: 'Eén scherm voor wie meerdere bedrijven runt: taken, mail, agenda en cijfers, met elke ochtend een dagoverzicht.', gebouwd: ['Dashboard', 'Dagstart', 'AI-assistent'], img: 'cockpit-d.webp', mobiel: 'cockpit-m.webp', alt: 'AI-cockpit met nepdata: de dagstart', geenlink: 'Intern systeem', notitie: 'Besluit Alex 05-11: heet overal "AI-cockpit". Schermen met nepdata van Jarvis; de naam in het logo, de zoekbalk en het profiel is in beeld vervangen door "AI-cockpit" (bron-PNG\'s ongemoeid).' },
  { id: 'postleads-machine', pijler: 'automatisering', top: true, soort: 'Automatisering', titel: 'PostLeads-machine', kort: 'Maakt elke week uit het nieuwe woningaanbod de adressenlijst per klant en gebied, klaar voor de drukker.', gebouwd: ['Data ophalen', 'Postcode-match', 'Automatische mails'], img: 'postleads-stroom.webp', alt: 'Schema van de PostLeads-machine', geenlink: 'Intern systeem', notitie: 'Beeld = het stroomschema van Pim. Het weekrun-scherm (02) bewust niet gebruikt: daar staan verzonnen cijfers in die als feit gelezen kunnen worden.' },
  { id: 'social-manager', pijler: 'automatisering', top: true, soort: 'Automatisering', titel: 'Social Manager', kort: 'Systeem dat posts inplant en op vaste momenten plaatst. Vooraf komt er een voorbeeld, met een noodrem om een post tegen te houden.', gebouwd: ['Inplannen', 'Automatisch posten', 'Controle vooraf'], img: 'social-d.webp', mobiel: 'social-m.webp', alt: 'Social Manager met nepdata: wachtrij en cijfers', geenlink: 'Intern systeem', notitie: 'Schermen met nepdata (Studio Noord) van Jarvis; de Telegram-chat is nagebouwd. Let op: sinds september staat het Meta-account van AP Digital stil, dus "publiceert nu" niet claimen.' },
  { id: 'geo-monitor', pijler: 'automatisering', soort: 'Automatisering', titel: 'GEO-monitor', kort: 'Meet of een bedrijf genoemd wordt als iemand een AI om advies vraagt, en wie er anders genoemd wordt.', gebouwd: ['AI-zichtbaarheid', 'Concurrenten', 'Wat te doen'], img: 'geo-d.webp', mobiel: 'geo-m.webp', alt: 'GEO-monitor met nepdata', bron: '19 metingen sinds 30-06-2026: aangeleverd door Jarvis (niet zelf ingezien). Scherm is eerlijk: 2 engines gemeten, 2 niet.', geenlink: 'Intern systeem' },
  { id: 'seo-rapport', pijler: 'automatisering', soort: 'Automatisering', titel: 'SEO-rapportages per klant', kort: 'Per klant een maandoverzicht in onze huisstijl: wat steeg, wat zakte en de drie acties voor volgende maand.', gebouwd: ['Dagelijkse meting', 'Maandrapport', 'Acties per maand'], img: 'seo-rapport-d.webp', alt: 'Voorbeeld SEO-maandrapport met verzonnen cijfers', geenlink: 'Voorbeeld met een verzonnen klant', notitie: 'Beeld = voorblad en trendpagina uit onze rapportgenerator (seo-roadmap-template/generate_briefing.py), gevuld met verzonnen klant Studio Noord. Voorblad toont nu de brandbook-regel "Digitaal werk dat gewoon werkt" (generator gefixt 05-11).' },
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

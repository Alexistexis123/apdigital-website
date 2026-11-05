// Doorlichting apdigital.nl, 04-11-2026 (Daan). GSC-cijfers: cockpit-doc gsc-pages, periode 2026-10-05 t/m 2026-11-01.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
const gsc = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'gsc-2026-11-04.json'), 'utf8'))

export const gscTotaal = {
  periode: '5 oktober t/m 1 november 2026',
  bijgewerkt: '4 november 2026',
  klikken: 3,
  vertoningen: 7945,
  stadAandeel: 87,
  top10: 3, // pagina's met minstens 1 klik
  conclusie: 'Google laat de site wel zien, maar bijna nergens hoog genoeg om op te klikken: 3 klikken in 28 dagen, op pagina\'s met 1 klik elk (home, Doetinchem, Groningen). 87% van de vertoningen komt van de 24 stadspagina\'s, op gemiddelde posities tussen 27 en 84. Er is dus geen URL met echt verkeer om te beschermen, maar wel veel URL\'s die Google kent. Daarom: niets weggooien zonder 301, en de stadspagina\'s houden en herschrijven.',
}

const g = p => gsc[p] || {}
const r = (pad, o, w) => ({ pad, o, w, ...g(pad) })

const steden = ['alkmaar', 'tiel', 'amstelveen', 'almere', 'oss', 'zaltbommel', 'hilversum', 'doetinchem', 'apeldoorn', 'arnhem', 'breda', 'amsterdam', 'groningen', 'eindhoven', 'amersfoort', 'utrecht', 'den-haag', 'veenendaal', 'zwolle', 'nijmegen', 'den-bosch', 'ede', 'wageningen', 'leiden']
const stadRijen = steden.map(s => r(`/websites-laten-maken-${s}`, 'herschrijf', s === 'tiel' ? 'Beste stadspagina (gemiddeld positie 27, "website maken tiel" rond 16). Houden; template herschrijven: prijs en "7 dagen" eruit tot het aanbod vaststaat, regel over apps en automatisering erbij, link naar portfolio.' : 'Houden, zelfde template-herschrijving als Tiel. Heeft vertoningen, dus nooit weg zonder 301.'))

export const doorlichting = [
  r('/', 'herschrijf', 'Nieuwe home op drie pijlers (zie ontwerp). Titel "Website laten maken in 7 dagen, vanaf 299 euro" mag blijven (besluit Alex 05-11: websites houden vanaf 299 / 7 dagen). Review-badge noemt een vast aantal reviews in de code; dat moet live of gecontroleerd.'),
  r('/websites-laten-maken', 'herschrijf', 'Wordt de pijlerpagina Websites. /websites stuurt hier al naartoe.'),
  { pad: '/apps-laten-maken', o: 'nieuw', w: 'Pijlerpagina Apps. Nieuwe URL, nog checken op zoekvolume.' },
  { pad: '/processen-automatiseren', o: 'nieuw', w: 'Pijlerpagina Automatisering. Nieuwe URL, nog checken op zoekvolume.' },
  r('/app-laten-maken-arnhem', 'herschrijf', 'Past perfect bij pijler 2 en staat rond positie 16 voor "app laten maken arnhem". Houden, aanvullen met echte app-cases en link naar de pijler.'),
  r('/portfolio', 'herschrijf', 'Opnieuw indelen per pijler (zie ontwerp). Bij Daan en losse demo\'s eruit, PostLeads blijft.'),
  r('/diensten', 'herschrijf', 'Nu: websites, apps en social. Wordt een kort overzicht van de drie pijlers met links, of 301 naar home. Voorstel: houden als overzicht.'),
  r('/pakketten', 'herschrijf', 'Prijzen (vanaf 299) staan hier en in de titels van bijna alle pagina\'s. Besluit Alex 05-11: websites vanaf 299 / 7 dagen blijft, de 53 titels blijven gelijk; apps en automatisering zonder bedrag (vaste prijs na een gratis gesprek). Herschrijven per pijler, met grens per pakket.'),
  r('/onderhoud-en-hosting', 'herschrijf', 'Past bij pijler Websites (vanaf 49 per maand). Bedrag pas houden als het aanbod dat bevestigt.'),
  r('/website-redesign', 'herschrijf', 'Past precies bij het belverhaal (zwakke site vernieuwen). Houden, cases Flo-Rent en Jacobs erin.'),
  r('/gratis-concept', 'herschrijf', 'Was de funnel van de Meta-advertentie, die bestaat niet meer. Besluit Alex 05-11: blijft, als aanbod bij het bellen ("we hebben al een concept voor je klaargezet"). Tekst herschrijven, zie ontwerp /ontwerp/gratis-concept.'),
  r('/contact', 'blijft', 'Blijft, met de kennismaking als hoofdknop.'),
  r('/over', 'herschrijf', 'Nu alleen Alex. Aanvullen met de maat zodra de afspraken rond zijn.'),
  r('/webshops', 'weg', 'Groeit in vertoningen (250 naar 482) maar op "webshop kopen", dus mensen die een bestaande shop willen kopen. Geen webshop-case in het portfolio. Voorstel: 301 naar /websites-laten-maken.'),
  r('/horeca-websites', 'weg', 'Weinig vertoningen en geen horeca-case in het nieuwe portfolio. Voorstel: 301 naar /restaurant-websites.'),
  r('/restaurant-websites', 'blijft', 'Rond positie 12 op "restaurant website". Houden, maar zonder prijsclaim. Er staat geen restaurant-case in het nieuwe portfolio, dus bewijs ontbreekt. Lage prioriteit.'),
  r('/bb-websites', 'blijft', 'Klein, maar heeft Casa Agosto Azul als echt bewijs. Houden, prijzen eruit tot het aanbod vaststaat.'),
  r('/case-casa5', 'herschrijf', 'Ombouwen naar het nieuwe case-formaat, URL houden.'),
  r('/case-marketing-fit', 'herschrijf', 'Idem.'),
  r('/casa5', 'blijft', 'Doorgeefroute naar de site van Casa Agosto Azul. Laten staan, het portfolio linkt ernaar.'),
  r('/blog', 'blijft', 'Blijft. Later artikelen over apps en automatisering toevoegen.'),
  r('/blog-moderne-website-vs-oude-website', 'blijft', 'Heeft een paar vertoningen. Prijzen in de tekst checken.'),
  r('/blog-restaurant-website-voorbeelden', 'blijft', 'Idem. Verwijst mogelijk naar demo\'s: nalopen.'),
  { pad: '(7 overige blogs)', o: 'blijft', w: 'Nul vertoningen, kosten niets. Laten staan, prijsclaims nalopen bij de aanbod-update. Niet weggooien: geen winst, wel risico.' },
  ...stadRijen,
  { pad: '(31 demo-routes)', o: 'blijft', w: 'Prospect-demo\'s onder apdigital.nl/<naam>, allemaal Disallow in robots.txt. Niet in het portfolio, wel handig bij het bellen. Laten staan.' },
  r('/privacy', 'blijft', 'Blijft.'),
  r('/voorwaarden', 'blijft', 'Blijft. Nalopen of er pakketprijzen in staan.'),
]

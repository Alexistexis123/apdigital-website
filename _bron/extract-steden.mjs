// Eenmalig: haalt de stad-eigen teksten uit de oude stadspagina's (_bron/oud) naar steden.json.
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
const D = dirname(fileURLToPath(import.meta.url))
const hub = fs.readFileSync(join(D, 'oud/websites-laten-maken.html'), 'utf8')
const meta = (h, re) => (h.match(re) || [, ''])[1]
const out = []
for (const f of fs.readdirSync(join(D, 'oud')).filter(f => /^websites-laten-maken-.+\.html$/.test(f)).sort()) {
  const h = fs.readFileSync(join(D, 'oud', f), 'utf8')
  const slug = f.replace(/\.html$/, '')
  const sec = (start) => {
    const i = h.indexOf('<h2>' + start); if (i < 0) return null
    const kop = h.slice(i + 4, h.indexOf('</h2>', i))
    const rest = h.slice(h.indexOf('</h2>', i) + 5)
    const j = rest.search(/<h2>|<div class="loc-cta">|<div class="loc-services">|<div class="loc-steps">/)
    const paras = rest.slice(0, j).match(/<p>[\s\S]*?<\/p>/g) || []
    return { kop, p: paras.map(p => p.slice(3, -4).trim()) }
  }
  const hubItem = (() => { const m = hub.match(new RegExp('href="/' + slug + '"><h3>[^<]*</h3><span>([^<]*)</span>')); return m ? m[1] : '' })()
  out.push({
    slug,
    naam: meta(h, /<h1>Website laten maken in <em>([^<]+)<\/em>/),
    title: meta(h, /<title>([^<]*)<\/title>/),
    description: meta(h, /name="description" content="([^"]*)"/),
    ogTitle: meta(h, /property="og:title" content="([^"]*)"/),
    ogDescription: meta(h, /property="og:description" content="([^"]*)"/),
    serviceDescription: meta(h, /"@type": "Service",[\s\S]*?"description": "([^"]*)"/),
    kicker: meta(h, /<p class="lead-kicker">([\s\S]*?)<\/p>/).trim(),
    lead: meta(h, /<p class="lead">([\s\S]*?)<\/p>/).trim(),
    hubRegel: hubItem,
    waarom: sec('Waarom een goede website'),
    prijs: sec('Wat kost een website'),
    voorWie: sec('Voor wie werken we'),
    tip: sec('Praktische tip'),
    slot: sec('Website laten maken in'),
  })
}
fs.writeFileSync(join(D, 'steden.json'), JSON.stringify(out, null, 1))
console.log(out.length, 'steden')

// Ontwerp-interactie: menu, notities aan/uit, portfoliofilter, nep-formulier, hero-machine, scroll-reveal, case-verhalen.
(function () {
  var b = document.body
  var rustig = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ---------- menu ----------
  var hb = document.getElementById('hamburger'), nav = document.getElementById('nav')
  if (hb && nav) hb.addEventListener('click', function () {
    var open = nav.classList.toggle('open'); hb.setAttribute('aria-expanded', open ? 'true' : 'false')
  })

  // ---------- ontwerpnotities: standaard UIT (nieuwe sleutel, zodat een oude 'aan'-stand niet blijft hangen) ----------
  var nk = document.getElementById('notes-knop')
  function zetNotes(uit) {
    b.classList.toggle('notes-uit', uit)
    if (nk) nk.textContent = uit ? 'Notities aan' : 'Notities uit'
    try { localStorage.setItem('ap-ontwerp-notes-v2', uit ? 'uit' : 'aan') } catch (e) {}
  }
  var start = 'uit'
  try { start = localStorage.getItem('ap-ontwerp-notes-v2') || 'uit' } catch (e) {}
  zetNotes(start !== 'aan')
  if (nk) nk.addEventListener('click', function () { zetNotes(!b.classList.contains('notes-uit')) })

  // ---------- portfoliofilter ----------
  var tabs = document.querySelectorAll('.tabs button')
  function filter(k) {
    tabs.forEach(function (t) { t.classList.toggle('aan', t.dataset.filter === k) })
    document.querySelectorAll('[data-blok]').forEach(function (s) { s.style.display = (k === 'alles' || s.dataset.blok === k) ? '' : 'none' })
    toonZichtbaar()
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { filter(t.dataset.filter) }) })

  // ---------- nep-formulier ----------
  var f = document.getElementById('kennisform')
  if (f) {
    var q = new URLSearchParams(location.search).get('over')
    if (q) f.querySelectorAll('input[name=over]').forEach(function (i) { if (i.value === q) i.checked = true })
    f.addEventListener('submit', function (e) { e.preventDefault(); document.getElementById('melding').style.display = 'block' })
  }

  // ---------- tellers ----------
  function tel(el) {
    if (el.dataset.geteld) return
    el.dataset.geteld = '1'
    var doel = parseInt(el.dataset.tel, 10)
    var fmt = function (n) { return n.toLocaleString('nl-NL') }
    if (rustig || !doel) { el.textContent = fmt(doel); return }
    var t0 = null, duur = 1100
    function stap(t) {
      if (!t0) t0 = t
      var p = Math.min(1, (t - t0) / duur), e = 1 - Math.pow(1 - p, 3)
      el.textContent = fmt(Math.round(doel * e))
      if (p < 1) requestAnimationFrame(stap)
    }
    el.textContent = '0'
    requestAnimationFrame(stap)
  }

  // ---------- scroll-reveal ----------
  var rev = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'))
  function zichtbaar(el) {
    el.classList.add('in')
    el.querySelectorAll('[data-tel]').forEach(tel)
  }
  function toonZichtbaar() {
    rev.forEach(function (el) {
      if (el.classList.contains('in')) return
      var r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0 && r.width > 0) zichtbaar(el)
    })
  }
  if (rustig || !('IntersectionObserver' in window)) {
    rev.forEach(zichtbaar)
  } else {
    var io = new IntersectionObserver(function (items) {
      items.forEach(function (it) { if (it.isIntersecting) { zichtbaar(it.target); io.unobserve(it.target) } })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    rev.forEach(function (el) { io.observe(el) })
    // Vangnet: alles wat bij laden al in beeld staat meteen tonen.
    requestAnimationFrame(toonZichtbaar)
  }
  var h = (location.hash || '').slice(1)
  if (tabs.length && ['websites', 'apps', 'automatisering'].indexOf(h) > -1) filter(h)

  // ---------- case-verhalen (hover op desktop via CSS, tik/klik via knop) ----------
  document.querySelectorAll('.verhaal-knop').forEach(function (k) {
    k.addEventListener('click', function () {
      var c = k.closest('.case'), open = !c.classList.contains('open')
      c.classList.toggle('open', open)
      k.setAttribute('aria-expanded', open ? 'true' : 'false')
    })
  })

  // ---------- galerij: schermen wisselen vanzelf (niet bij hover, buiten beeld of reduced-motion) ----------
  var rustigeBeweging = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.querySelectorAll('[data-galerij]').forEach(function (g) {
    var beelden = g.querySelectorAll('.g-beeld'), knoppen = g.querySelectorAll('.g-knoppen button')
    var nu = 0, klok = null, zichtbaar = false, hover = false
    function toon(i) {
      nu = (i + beelden.length) % beelden.length
      beelden.forEach(function (b, j) { b.classList.toggle('aan', j === nu) })
      knoppen.forEach(function (k, j) { k.classList.toggle('aan', j === nu); k.setAttribute('aria-pressed', j === nu ? 'true' : 'false') })
    }
    function stop() { if (klok) { clearInterval(klok); klok = null } }
    function start() { stop(); if (!rustigeBeweging && zichtbaar && !hover) klok = setInterval(function () { toon(nu + 1) }, 3400) }
    knoppen.forEach(function (k) { k.addEventListener('click', function (e) { e.stopPropagation(); toon(+k.dataset.i); start() }) })
    var kaart = g.closest('.case') || g
    kaart.addEventListener('mouseenter', function () { hover = true; stop() })
    kaart.addEventListener('mouseleave', function () { hover = false; start() })
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { es.forEach(function (e) { zichtbaar = e.isIntersecting; zichtbaar ? start() : stop() }) }, { threshold: 0.4 }).observe(g)
    }
  })

  // ---------- hero-machine ----------
  var m = document.getElementById('machine')
  if (!m) return
  var velden = m.querySelectorAll('.m-veld')
  var knop = m.querySelector('.m-knop')
  var draden = m.querySelectorAll('.m-draad')
  var stappenLi = document.querySelectorAll('.m-stappen li')
  var timers = []
  var inBeeld = true, loopt = false

  function na(ms, fn) { timers.push(setTimeout(fn, ms)) }
  function zetStap(s) {
    m.setAttribute('data-stap', String(s))
    stappenLi.forEach(function (li) { li.classList.toggle('aan', Number(li.dataset.s) <= s && s > 0) })
  }
  function leeg() {
    timers.forEach(clearTimeout); timers = []
    m.classList.remove('plan-in', 'ingepland', 'doc-in', 'mail-in', 'reset')
    velden.forEach(function (v) { v.classList.remove('typt'); v.querySelector('span').textContent = '' })
    draden.forEach(function (d) { d.classList.remove('gaat', 'vol', 'weg') })
    knop.classList.remove('druk')
    zetStap(0)
  }
  function eindstand() {
    leeg()
    velden.forEach(function (v) { var s = v.querySelector('span'); s.textContent = s.dataset.typ })
    draden.forEach(function (d) { d.classList.add('vol') })
    m.classList.add('plan-in', 'ingepland', 'doc-in', 'mail-in')
    stappenLi.forEach(function (li) { li.classList.add('aan') })
  }
  function typ(i, klaar) {
    // Op mobiel is het plaats-veld verborgen: overslaan.
    while (i < velden.length && velden[i].offsetParent === null) i++
    if (i >= velden.length) return klaar()
    var v = velden[i], s = v.querySelector('span'), tekst = s.dataset.typ, n = 0
    v.classList.add('typt')
    ;(function volgende() {
      s.textContent = tekst.slice(0, ++n)
      if (n < tekst.length) na(32 + Math.random() * 26, volgende)
      else na(120, function () { v.classList.remove('typt'); typ(i + 1, klaar) })
    })()
  }
  function reis(d, klaar) {
    d.classList.add('gaat', 'vol')
    na(560, function () { d.classList.add('weg'); klaar() })
  }
  function ronde() {
    loopt = true
    leeg()
    zetStap(1)
    na(250, function () {
      typ(0, function () {
        knop.classList.add('druk')
        na(220, function () {
          knop.classList.remove('druk')
          reis(draden[0], function () {
            zetStap(2)
            m.classList.add('plan-in')
            na(650, function () {
              m.classList.add('ingepland')
              reis(draden[1], function () {
                zetStap(3)
                m.classList.add('doc-in')
                na(850, function () {
                  m.classList.add('mail-in')
                  na(2600, function () {
                    m.classList.add('reset')
                    na(420, function () {
                      loopt = false
                      if (inBeeld && !document.hidden) ronde()
                      else eindstand()
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  if (rustig) { eindstand(); return }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (items) {
      inBeeld = items[0].isIntersecting
      if (inBeeld && !loopt && !document.hidden) ronde()
    }, { threshold: 0.2 }).observe(m)
  } else {
    ronde()
  }
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && inBeeld && !loopt) ronde()
  })
})()

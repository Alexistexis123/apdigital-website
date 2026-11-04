// Ontwerp-interactie: menu, notities aan/uit, portfoliofilter, nep-formulier.
(function () {
  var b = document.body
  var hb = document.getElementById('hamburger'), nav = document.getElementById('nav')
  if (hb && nav) hb.addEventListener('click', function () {
    var open = nav.classList.toggle('open'); hb.setAttribute('aria-expanded', open ? 'true' : 'false')
  })

  var nk = document.getElementById('notes-knop')
  function zetNotes(uit) {
    b.classList.toggle('notes-uit', uit)
    if (nk) nk.textContent = uit ? 'Notities aan' : 'Notities uit'
    try { localStorage.setItem('ap-ontwerp-notes', uit ? 'uit' : 'aan') } catch (e) {}
  }
  var start = 'aan'
  try { start = localStorage.getItem('ap-ontwerp-notes') || 'aan' } catch (e) {}
  zetNotes(start === 'uit')
  if (nk) nk.addEventListener('click', function () { zetNotes(!b.classList.contains('notes-uit')) })

  var tabs = document.querySelectorAll('.tabs button')
  function filter(k) {
    tabs.forEach(function (t) { t.classList.toggle('aan', t.dataset.filter === k) })
    document.querySelectorAll('[data-blok]').forEach(function (s) { s.style.display = (k === 'alles' || s.dataset.blok === k) ? '' : 'none' })
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { filter(t.dataset.filter) }) })
  var h = (location.hash || '').slice(1)
  if (tabs.length && ['websites', 'apps', 'automatisering'].indexOf(h) > -1) filter(h)

  var f = document.getElementById('kennisform')
  if (f) {
    var q = new URLSearchParams(location.search).get('over')
    if (q) f.querySelectorAll('input[name=over]').forEach(function (i) { if (i.value === q) i.checked = true })
    f.addEventListener('submit', function (e) { e.preventDefault(); document.getElementById('melding').style.display = 'block' })
  }
})()

// Ontwerp twee takken: notities aan/uit en nep-formulier. De rest (menu, filter, reveal, verhalen, machine) komt uit /site.js.
(function () {
  var b = document.body
  var nk = document.getElementById('notes-knop')
  function zet(uit) {
    b.classList.toggle('notes-uit', uit)
    if (nk) nk.textContent = uit ? 'Notities aan' : 'Notities uit'
    try { localStorage.setItem('ap-ontwerp-2t-notes', uit ? 'uit' : 'aan') } catch (e) {}
  }
  var start = 'uit'
  try { start = localStorage.getItem('ap-ontwerp-2t-notes') || 'uit' } catch (e) {}
  zet(start !== 'aan')
  if (nk) nk.addEventListener('click', function () { zet(!b.classList.contains('notes-uit')) })

  var f = document.getElementById('kennisform')
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault()
    var m = document.getElementById('melding')
    if (m) m.style.display = 'block'
  })
})()

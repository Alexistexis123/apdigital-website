/* =========================================================
   AP Digital, beweging op de homepage (alleen index.html laadt dit).
   Technieken uit de demo premium-animated, toegepast op de bestaande
   blokken. Geen library: eigen WebGL-veld en eigen scroll-rekenwerk.

   Vangnetten:
   - reduced motion of een oude browser: dit script doet niets
   - de stijl (home-motion.css) laadt het script zelf; pas daarna gaat
     de klasse "hm" op <html>. Tot dan is de pagina de gewone pagina.
   - geen WebGL: geen veld, de rest werkt
   De hero-tekst raakt dit script niet aan (die staat er meteen).
   ========================================================= */
(function () {
  'use strict';

  var html = document.documentElement;
  // Zelfde versie als in de src van dit script (?v=), zodat css en js samen verversen.
  var ver = '2';
  try { var eigen = /[?&]v=([\w.-]+)/.exec(document.currentScript.src); if (eigen) ver = eigen[1]; } catch (err) { /* geen currentScript: de vaste versie */ }
  if (!window.matchMedia || !window.requestAnimationFrame || !('IntersectionObserver' in window)) return;
  var reduceQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceQ.matches) return;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function sm(a, b, v) { v = clamp((v - a) / (b - a)); return v * v * (3 - 2 * v); }

  // Pas na de load, na de eerste weergave en als de browser even niets te doen
  // heeft: de eerste weergave (en dus LCP) merkt niets van dit bestand. De stijl
  // halen we op als tekst (geen stylesheet-verzoek dat de weergave kan ophouden).
  afterPaint(function () {
    if (!window.fetch) return;
    fetch('/home-motion.css?v=' + ver).then(function (r) {
      if (!r.ok) throw new Error('css');
      return r.text();
    }).then(function (txt) {
      var st = document.createElement('style');
      st.setAttribute('data-hm', '');
      st.textContent = txt;
      document.head.appendChild(st);
      idle(start);
    }).catch(function () { /* geen stijl: de pagina blijft zoals hij was */ });
  });

  var started = false;
  function start() {
    if (started) return;
    started = true;
    splitHeadings();
    html.classList.add('hm');
    stack();
    setTimeout(function () { idle(field); }, 300);
    if (reduceQ.addEventListener) reduceQ.addEventListener('change', function (e) { if (e.matches) window.location.reload(); });
  }

  function idle(fn) {
    if ('requestIdleCallback' in window) window.requestIdleCallback(fn, { timeout: 1500 });
    else setTimeout(fn, 250);
  }
  function afterLoad(fn) {
    if (document.readyState === 'complete') fn();
    else window.addEventListener('load', fn, { once: true });
  }
  function afterPaint(fn) {
    afterLoad(function () {
      var done = false;
      var go = function () { if (done) return; done = true; idle(fn); };
      try {
        if (performance.getEntriesByName('first-contentful-paint').length) return go();
        var po = new PerformanceObserver(function (l) {
          if (l.getEntriesByName('first-contentful-paint').length) { po.disconnect(); go(); }
        });
        po.observe({ type: 'paint', buffered: true });
        setTimeout(function () { po.disconnect(); go(); }, 4000); // vangnet: tabblad op de achtergrond
      } catch (err) { go(); }
    });
  }

  /* ---------------------------------------------------------
     1. Sectiekoppen in woorden knippen
        De zin blijft heel in de bron; hier krijgt elk woord een
        eigen span en houdt de kop de hele zin als aria-label.
     --------------------------------------------------------- */
  function splitHeadings() {
    $$('[data-reveal] h2').forEach(function (h) {
      var zin = h.textContent.replace(/\s+/g, ' ').trim();
      var n = 0;
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var frag = document.createDocumentFragment();
            c.nodeValue.split(/(\s+)/).forEach(function (part) {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              var s = document.createElement('span');
              s.className = 'hm-w';
              s.setAttribute('aria-hidden', 'true');
              s.textContent = part;
              s.style.setProperty('--i', n++);
              frag.appendChild(s);
            });
            node.replaceChild(frag, c);
          } else if (c.nodeType === 1) {
            walk(c);
          }
        });
      })(h);
      if (n) h.setAttribute('aria-label', zin);
    });
  }

  /* ---------------------------------------------------------
     Eén scroll-lus voor de kaartstapel. Rekent alleen als het blok
     in de buurt is.
     --------------------------------------------------------- */
  var jobs = [], raf = 0;
  function tick() {
    raf = 0;
    var busy = false;
    for (var i = 0; i < jobs.length; i++) if (jobs[i]()) busy = true;
    if (busy) kick();
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick, { passive: true });

  function nearby(el, cb) {
    var st = { on: false };
    new IntersectionObserver(function (e) {
      st.on = e[e.length - 1].isIntersecting;
      if (cb) cb(st.on);
      kick();
    }, { rootMargin: '25% 0px 25% 0px' }).observe(el);
    return st;
  }

  /* ---------------------------------------------------------
     2. Telefoon: de werkkaarten als stapel (CSS sticky). De kaart
        eronder krimpt en dimt terwijl de volgende eroverheen schuift.
        Een kaart blijft pas hangen als hij helemaal te lezen was:
        past hij niet in beeld, dan plakt hij met zijn onderkant.
     --------------------------------------------------------- */
  function stack() {
    var groups = $$('.cases').map(function (el) {
      return { el: el, cards: Array.prototype.filter.call(el.children, function (c) { return c.classList.contains('case'); }) };
    }).filter(function (g) { return g.cards.length > 1; });
    if (!groups.length) return;
    var q = window.matchMedia('(max-width: 860px) and (orientation: portrait)');
    var cta = $('.vast-cta'), on = false;

    function layout() {
      on = q.matches;
      html.classList.toggle('hm-stapel', on);
      var vh = window.innerHeight, keep = 16;
      if (on && cta) { var cr = cta.getBoundingClientRect(); if (cr.height > 0) keep = Math.max(16, vh - cr.top + 12); }
      groups.forEach(function (g) {
        g.cards.forEach(function (c, i) {
          if (!on) { c.style.removeProperty('--hm-top'); c.style.removeProperty('--hm-sc'); c.style.removeProperty('--hm-dim'); return; }
          c.style.setProperty('--hm-top', Math.round(Math.min(80 + i * 10, vh - c.offsetHeight - keep)) + 'px');
        });
      });
      kick();
    }

    groups.forEach(function (g) {
      g.near = nearby(g.el);
      jobs.push(function () {
        if (!on || !g.near.on) return false;
        g.cards.forEach(function (c, i) {
          var next = g.cards[i + 1];
          if (!next) return;
          var h = c.offsetHeight, cover = 0;
          if (!c.classList.contains('open')) cover = clamp((c.getBoundingClientRect().top + h - next.getBoundingClientRect().top) / (h * 0.8));
          c.style.setProperty('--hm-sc', (1 - 0.06 * cover).toFixed(4));
          c.style.setProperty('--hm-dim', (0.62 * cover).toFixed(3));
        });
        return false;
      });
    });

    // Verhaal openklappen terwijl de kaart vastgeplakt zit: de kaart mag niet verspringen.
    // (vangfase = stand vooraf, de knop zelf = stand nadat site.js de klasse heeft gezet)
    var before = null;
    document.addEventListener('click', function (e) {
      var k = e.target.closest && e.target.closest('.verhaal-knop');
      var c = k && k.closest('.case');
      before = on && c ? { c: c, top: c.getBoundingClientRect().top } : null;
    }, true);
    $$('.cases .verhaal-knop').forEach(function (k) {
      k.addEventListener('click', function () {
        if (!before) return;
        var d = before.c.getBoundingClientRect().top - before.top;
        if (before.c.classList.contains('open') && Math.abs(d) > 1) window.scrollBy({ top: d, behavior: 'instant' });
        before = null;
        layout();
      });
    });

    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(layout);
      groups.forEach(function (g) { g.cards.forEach(function (c) { ro.observe(c); }); });
    }
    window.addEventListener('resize', layout, { passive: true });
    if (q.addEventListener) q.addEventListener('change', layout);
    layout();
  }

  /* ---------------------------------------------------------
     3. Deeltjesveld in de hero (WebGL, geen library)
        Een bol van punten rechts naast de kop. Scroll je, dan rolt
        hij uit tot een golvend veld dat achter de drie tegels langs
        loopt (de tegels zijn dekkend, die blijven dus altijd leesbaar).
        Reageert op muis en vinger; een tik geeft een gele schokgolf,
        een veeg trekt een gele staart en het veld schuift mee met
        kantelen. Achter tekst en knoppen worden de punten gedimd
        (rustzones, per regel van de kop), zodat alles leesbaar blijft.
        Al het rekenwerk zit in de vertex-shader; buiten beeld staat
        het stil.
     --------------------------------------------------------- */
  function field() {
    var hero = $('.hero2');
    if (!hero) return;
    var canvas = document.createElement('canvas');
    canvas.className = 'hm-veld';
    canvas.setAttribute('aria-hidden', 'true');

    var gl = null;
    try {
      gl = canvas.getContext('webgl', { antialias: false, alpha: true, depth: false, stencil: false, premultipliedAlpha: true, powerPreference: 'low-power', failIfMajorPerformanceCaveat: true });
    } catch (err) { gl = null; }
    if (!gl) return; // geen WebGL: de hero blijft zoals hij is
    // Geen grafische kaart (WebGL op de processor): dan kost elk beeld te veel. Geen veld.
    try {
      var info = gl.getExtension('WEBGL_debug_renderer_info');
      var kaart = String(gl.getParameter(gl.RENDERER)) + ' ' + (info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '');
      if (/swiftshader|llvmpipe|software|basic render/i.test(kaart)) return;
    } catch (err) { /* niet uit te lezen: gewoon proberen, de snelheidsmeting hieronder vangt het op */ }

    var NZ = 7; // rustzones: label, tot 4 regels van de kop, de zin en de knoppen
    var VS = [
      'attribute vec3 a;',
      'uniform float t,m,asp,us,sz,al,R,ph,hz,hs;',
      'uniform vec2 c,ptr,tl;',
      'uniform vec4 q[' + NZ + '];uniform float qs[' + NZ + '];',
      'uniform vec3 wv[2],tr[12];',
      'varying float vA,vH;',
      'void main(){',
      ' float u=a.x,v=a.y;',
      // bol
      ' float y=1.-2.*u,rr=sqrt(max(0.,1.-y*y)),th=6.2831853*v+t*.11;',
      ' vec3 S=vec3(cos(th)*rr,y,sin(th)*rr);',
      ' S*=1.+.075*sin(S.x*3.1+t*.6)*sin(S.y*3.7-t*.45)*sin(S.z*2.9+t*.5);',
      ' S.yz=vec2(S.y*.94-S.z*.34,S.y*.34+S.z*.94);',
      ' S.xy=vec2(S.x*.97-S.y*.24,S.x*.24+S.y*.97);',
      ' float fr=.5-.5*S.z;',
      ' vec2 ps=S.xy*R*3.2/(3.2+S.z*.55);ps.x/=asp;ps+=c;',
      // golvend veld in perspectief, horizon op hz
      ' float Z=1.4+u*6.;',
      ' float X=(v-.5)*asp*(1.2+1.25*Z);',
      ' float Y=-.95+(.2*sin(X*1.3+t*.7)*cos(Z*1.1-t*.5)+.07*sin(X*3.1-Z*2.3+t))/hs;',
      ' vec2 pp=vec2(X/asp,Y)*1.6/Z;',
      ' pp.y=hz+(pp.y+.205)*hs;',
      // overgang, per punt net iets anders getimed
      ' float k=clamp(m*1.6-a.z*.6,0.,1.);k=k*k*(3.-2.*k);',
      ' vec2 p=mix(ps,pp,k);',
      ' p+=vec2(sin(a.z*40.+t*.8),cos(a.z*33.-t*.6))*.1*k*(1.-k);',
      // kantelen: wat dichtbij is schuift meer dan wat ver weg is
      ' p+=tl*mix(.4+fr,1.8/Z,k);',
      // tik: een ring dijt uit, duwt de punten opzij en kleurt ze geel
      ' float g=fract(a.z*57.3),hw=0.,sa=-1.,bk=1.;vec2 sp=p,av=vec2(asp,1.)*us;',
      ' for(int i=0;i<2;i++){',
      '  float ag=wv[i].z,a1=min(ag,1.),fd=1.-a1,rad=.85*(1.-fd*fd);',
      '  vec2 dw=(p-wv[i].xy)*av;',
      '  float rg=(length(dw)-rad)*13.;rg=fd*exp(-rg*rg);',
      '  p+=normalize(dw+1e-4)*rg*.05/av;hw+=rg;',
      '  float lo=float(i)*.04;',
      '  if(g>=lo&&g<lo+.04){',
      '   if(ag<1.){float an=a.z*1330.;sp=wv[i].xy+vec2(cos(an),sin(an))*(rad+(fract(a.z*91.)-.5)*.07*a1)/av;sa=fd;}',
      '   else bk=clamp((ag-1.)*3.4,0.,1.);',
      '  }',
      ' }',
      // veeg: een ander deel van de punten volgt de vinger als staart
      ' if(g>=.08&&g<.16){',
      '  float jf=fract(a.z*131.7)*11.,f=fract(jf);int j=int(jf);',
      '  vec3 A=tr[j],B=tr[j+1];float s=mix(A.z,B.z,f);',
      '  if(s>0.){float an=a.z*977.;sp=mix(A.xy,B.xy,f)+vec2(cos(an),sin(an))*(.008+.05*(1.-s))*fract(a.z*37.)/av;sa=s;}',
      ' }',
      // muis of vinger duwt de punten opzij en kleurt ze geel
      ' vec2 d=(p-ptr)*av;',
      ' float h=ph*exp(-dot(d,d)*26.);',
      ' p+=normalize(d+1e-4)*h*.045/av;',
      ' float ring=(1.-k)*smoothstep(.045,0.,abs(y-sin(t*.33)*.92))*(.15+.85*fr);',
      ' float cr=k*smoothstep(.022,0.,abs(u-(1.-fract(t*.07))));',
      ' vH=clamp(h+ring+cr+hw,0.,1.);',
      ' float ap=smoothstep(7.4,6.,Z)*smoothstep(1.4,2.1,Z)*.8;',
      ' float fa=al*mix(.16+.84*fr*fr,ap,k)*bk,zs=mix(.75+.85*fr,2.4/Z+.3,k)*(1.+vH*.7),zk=1.;',
      ' if(sa>=0.){p=sp;fa=sa*.9;vH=1.;zs=.8+1.3*sa;zk=.82;}',
      // rustzones: achter tekst en knoppen worden de punten zacht gedimd
      ' float zm=0.;',
      ' for(int i=0;i<' + NZ + ';i++){',
      '  vec2 e=max(abs(p-q[i].xy)-q[i].zw,0.)*av;',
      '  zm=max(zm,qs[i]*(1.-smoothstep(0.,.07,length(e))));',
      ' }',
      ' vA=fa*(1.-zm*zk);',
      ' gl_PointSize=sz*zs;',
      ' gl_Position=vec4(p,0.,1.);',
      '}'
    ].join('\n');

    var FS = [
      'precision mediump float;',
      'varying float vA,vH;',
      'void main(){',
      ' vec2 q=gl_PointCoord-.5;',
      ' float s=smoothstep(.25,.03,dot(q,q))*vA;',
      ' vec3 col=mix(vec3(.84),vec3(1.,.839,.039),vH)*(1.+vH*.5);',
      ' gl_FragColor=vec4(col*s,s);',
      '}'
    ].join('\n');

    // Shaders bouwen zonder de pagina vast te houden: waar het kan bouwt de
    // browser ze op de achtergrond en kijken wij alleen af en toe of het klaar is.
    function build(type, src) {
      var sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    }
    var prog = gl.createProgram();
    gl.attachShader(prog, build(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, build(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    var par = gl.getExtension('KHR_parallel_shader_compile'), tries = 0;
    (function wait() {
      if (par && !gl.getProgramParameter(prog, par.COMPLETION_STATUS_KHR) && ++tries < 100) { setTimeout(wait, 50); return; }
      idle(function () {
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return; // shader lukt niet: geen veld
        setup();
      });
    })();

    function setup() {
    gl.useProgram(prog);

    var small = window.innerWidth < 769;
    var N = small ? 5000 : 9000;
    var data = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) {
      data[i * 3] = (i + 0.5) / N;
      data[i * 3 + 1] = (i * 0.6180339887) % 1;
      data[i * 3 + 2] = Math.random();
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);

    var U = {};
    ['t', 'm', 'asp', 'us', 'sz', 'al', 'R', 'ph', 'hz', 'hs', 'c', 'ptr', 'tl', 'q', 'qs', 'wv', 'tr'].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    hero.insertBefore(canvas, hero.firstChild);

    // ---- maten: alles ten opzichte van de hero, alleen opnieuw bij een andere maat ----
    var rng = document.createRange();
    var G = { w: 0, h: 0, sx: 0, sy: 0, sr: 0, hor: 0, zq: new Float32Array(NZ * 4), zs: new Float32Array(NZ) };
    var dpr = 1, stale = true;
    function box(el, hr, text) {
      var b;
      if (text) { rng.selectNodeContents(el); b = rng.getBoundingClientRect(); } else b = el.getBoundingClientRect();
      return { l: b.left - hr.left, t: b.top - hr.top, r: b.right - hr.left, b: b.bottom - hr.top, w: b.width };
    }
    // De kop per regel: zo blijft de bol zichtbaar naast een korte regel.
    function lines(el, hr) {
      var out = [];
      rng.selectNodeContents(el);
      Array.prototype.slice.call(rng.getClientRects()).filter(function (b) { return b.width > 1; })
        .sort(function (p, q) { return p.top - q.top; })
        .forEach(function (b) {
          var mid = (b.top + b.bottom) / 2 - hr.top, last = out[out.length - 1];
          if (last && mid > last.t && mid < last.b) {
            last.l = Math.min(last.l, b.left - hr.left); last.r = Math.max(last.r, b.right - hr.left);
            last.t = Math.min(last.t, b.top - hr.top); last.b = Math.max(last.b, b.bottom - hr.top);
          } else out.push({ l: b.left - hr.left, t: b.top - hr.top, r: b.right - hr.left, b: b.bottom - hr.top });
        });
      return out;
    }
    function measure() {
      stale = false;
      var hr = hero.getBoundingClientRect();
      var w = hr.width, h = hr.height;
      G.w = w; G.h = h;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      if (w * h * dpr * dpr > 2600000) dpr = Math.max(0.75, Math.sqrt(2600000 / (w * h)));
      var cw = Math.max(2, Math.round(w * dpr)), chh = Math.max(2, Math.round(h * dpr));
      if (canvas.width !== cw || canvas.height !== chh) { canvas.width = cw; canvas.height = chh; }

      var h1 = $('.hero2 h1'), wrap = $('.hero2 .wrap'), tegels = $('.kies-tegels');
      var label = $('.hero2 .label'), lead = $('.hero-rechts .lead'), knoppen = $('.hero-rechts .knoppen-rij');

      // rustzones: [vak, sterkte, marge]
      var zones = [];
      if (label) zones.push([box(label, hr, true), 0.8, 6]);
      if (h1) {
        var ls = lines(h1, hr);
        if (ls.length > 4) ls = [box(h1, hr, true)]; // meer regels dan zones: dan het hele vak
        ls.forEach(function (b) { zones.push([b, 0.82, 6]); });
      }
      if (lead) zones.push([box(lead, hr, true), 0.88, 8]);
      if (knoppen) zones.push([box(knoppen, hr), 0.84, 6]);
      for (var i = 0; i < NZ; i++) {
        var z = zones[i], o = i * 4;
        G.zs[i] = 0;
        if (!z || !(z[0].r - z[0].l > 0)) continue;
        G.zq[o] = (z[0].l + z[0].r) / w - 1;
        G.zq[o + 1] = 1 - (z[0].t + z[0].b) / h;
        G.zq[o + 2] = (z[0].r - z[0].l + 2 * z[2]) / w;
        G.zq[o + 3] = (z[0].b - z[0].t + 2 * z[2]) / h;
        G.zs[i] = z[1];
      }

      // bol: rechts naast de kop en boven de tegels; op een smal scherm half over de rechterrand
      var hb = h1 ? box(h1, hr) : { t: 80, b: 160 };
      var wb = wrap ? box(wrap, hr) : { r: w };
      var tt = tegels ? box(tegels, hr).t : h * 0.6;
      small = w < 769;
      if (small) {
        G.sr = Math.min(170, w * 0.42);
        G.sx = w - G.sr * 0.18;
        G.sy = Math.max(G.sr + 6, (hb.t + hb.b) / 2 + 4);
      } else {
        // niet groter dan er tussen de bovenrand en de tegels past (hij mag er 40px achter zakken)
        G.sr = Math.max(150, Math.min(270, w * 0.17, (tt + 32) / 2));
        G.sx = Math.min(w - G.sr * 0.5, Math.max(wb.r - 24, w - G.sr * 1.25));
        G.sy = Math.max(G.sr + 8, Math.min((hb.t + hb.b) / 2 + 60, tt + 40 - G.sr));
      }
      // veld: horizon net boven de tegels
      G.hor = tt - 26;
    }

    // muis en vinger (venstercoordinaten; omrekenen doen we per beeld)
    var ptr = { x: 0, y: 0, at: -1e9 };
    function point(x, y) { ptr.x = x; ptr.y = y; ptr.at = performance.now(); }
    window.addEventListener('mousemove', function (e) { point(e.clientX, e.clientY); }, { passive: true });

    // Aanraking: een tik wordt een schokgolf, een veeg een staart.
    // Alles passief, dus scrollen merkt er niets van.
    var taps = [{ x: 0, y: 0, at: -1e9 }, { x: 0, y: 0, at: -1e9 }], tapN = 0;
    var trail = [], down = null;
    var wvA = new Float32Array(6), trA = new Float32Array(36);
    window.addEventListener('touchstart', function (e) {
      var tt = e.touches && e.touches[0];
      if (!tt) return;
      point(tt.clientX, tt.clientY);
      down = { x: tt.clientX, y: tt.clientY, at: performance.now(), far: false };
      trail.length = 0;
    }, { passive: true });
    window.addEventListener('touchmove', function (e) {
      var tt = e.touches && e.touches[0];
      if (!tt) return;
      var x = tt.clientX, y = tt.clientY, last = trail[0];
      point(x, y);
      if (down && Math.abs(x - down.x) + Math.abs(y - down.y) > 14) down.far = true;
      if (!last || Math.abs(x - last.x) + Math.abs(y - last.y) > 20) {
        trail.unshift({ x: x, y: y, at: performance.now() });
        if (trail.length > 12) trail.length = 12;
      }
    }, { passive: true });
    window.addEventListener('touchend', function () {
      if (down && !down.far && performance.now() - down.at < 450) {
        taps[tapN] = { x: down.x, y: down.y, at: performance.now() };
        tapN = 1 - tapN;
      }
      down = null;
    }, { passive: true });
    window.addEventListener('touchcancel', function () { down = null; }, { passive: true });

    // Kantelen: het veld schuift een klein beetje mee. De ruststand schuift
    // langzaam mee, dus het maakt niet uit hoe je de telefoon vasthoudt.
    var tilt = { x: 0, y: 0, tx: 0, ty: 0, bx: null, by: 0 };
    function onTilt(e) {
      if (e.beta == null || e.gamma == null) return;
      var bb = e.beta, gg = e.gamma, sw;
      var o = (screen.orientation && screen.orientation.angle) || 0;
      if (o === 90) { sw = bb; bb = -gg; gg = sw; } else if (o === 270) { sw = bb; bb = gg; gg = -sw; }
      if (tilt.bx === null) { tilt.bx = gg; tilt.by = bb; }
      tilt.bx += (gg - tilt.bx) * 0.004;
      tilt.by += (bb - tilt.by) * 0.004;
      tilt.tx = Math.max(-1, Math.min(1, (gg - tilt.bx) / 20));
      tilt.ty = Math.max(-1, Math.min(1, (bb - tilt.by) / 20));
    }
    function tiltGo() { window.addEventListener('deviceorientation', onTilt, { passive: true }); }
    (function () {
      var DOE = window.DeviceOrientationEvent;
      var touchy = (navigator.maxTouchPoints || 0) > 0 || 'ontouchstart' in window;
      if (!DOE || !touchy) return;
      // in een iframe kan de sensor dicht staan: dan vragen we er niet om
      try {
        var pol = document.featurePolicy || document.permissionsPolicy;
        if (pol && pol.allowsFeature && !(pol.allowsFeature('accelerometer') && pol.allowsFeature('gyroscope'))) return;
      } catch (err) { /* geen beleid uit te lezen: gewoon proberen */ }
      if (typeof DOE.requestPermission !== 'function') { tiltGo(); return; } // Android: werkt meteen
      // iPhone: toestemming mag alleen vanuit een tik, dus een knopje in de hero
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hm-kantel';
      btn.textContent = 'Kantel je telefoon';
      hero.appendChild(btn);
      btn.addEventListener('click', function () {
        var done = function () {
          btn.classList.add('weg');
          setTimeout(function () { if (btn.parentNode) btn.parentNode.removeChild(btn); }, 500);
        };
        try {
          DOE.requestPermission().then(function (state) { if (state === 'granted') tiltGo(); })
            .catch(function () {}).then(done);
        } catch (err) { done(); }
      });
    })();

    var seen = true, fraf = 0, t0 = performance.now(), first = true, lost = false;
    // Snelheidsbewaking: haalt het toestel geen vloeiend beeld, dan eerst de helft
    // van de punten, en als dat niet helpt gaat het veld uit.
    var draw = N, pace = { n: 0, sum: 0, last: 0, strikes: 0 };
    var cur = { m: 0, px: 0, py: 0, ph: 0, al: 0 };

    function frame(now) {
      fraf = 0;
      if (!seen || document.hidden || lost) { pace.last = 0; return; }
      if (pace.last) {
        var dt = now - pace.last;
        if (dt < 250 && ++pace.n > 12) pace.sum += dt;
        if (pace.n >= 52) {
          if (pace.sum / 40 > 40) {
            if (++pace.strikes > 1) { lost = true; canvas.classList.remove('aan'); return; }
            draw = Math.round(N / 2);
          }
          pace.n = 12; pace.sum = 0;
          if (!pace.strikes) pace.n = -1e9; // loopt goed: niet meer meten
        }
      }
      pace.last = now;
      if (stale) measure();
      var r = canvas.getBoundingClientRect();
      var cw = r.width, ch = r.height;
      if (cw < 2 || ch < 2) return;
      if (Math.abs(cw - G.w) > 1 || Math.abs(ch - G.h) > 1) { measure(); r = canvas.getBoundingClientRect(); cw = r.width; ch = r.height; }
      var asp = cw / ch, t = (now - t0) / 1000;

      // scroll: de bol rolt uit tot een veld
      var tm = sm(30, Math.max(260, G.hor - 40), window.scrollY || 0);
      cur.m += (tm - cur.m) * (first ? 1 : 0.14);
      cur.al += ((small ? 0.9 : 1) - cur.al) * (first ? 1 : 0.06);

      var cx = G.sx / cw * 2 - 1, cy = 1 - G.sy / ch * 2, R = 2 * G.sr / ch;

      // geen muis of vinger: een denkbeeldige vinger maakt rondjes
      var tpx, tpy, tph;
      if (now - ptr.at < 2600) {
        tpx = (ptr.x - r.left) / cw * 2 - 1; tpy = 1 - (ptr.y - r.top) / ch * 2; tph = 1;
      } else {
        var k = cur.m, hzc = 1 - 2 * G.hor / ch;
        tpx = (cx + Math.cos(t * 0.45) * R * 0.6 / asp) * (1 - k) + Math.cos(t * 0.3) * 0.7 * k;
        tpy = (cy + Math.sin(t * 0.6) * R * 0.55) * (1 - k) + (hzc - 0.05 + Math.sin(t * 0.5) * 0.03) * k;
        tph = 0.8;
      }
      cur.px += (tpx - cur.px) * (first ? 1 : 0.12);
      cur.py += (tpy - cur.py) * (first ? 1 : 0.12);
      cur.ph += (tph - cur.ph) * 0.08;
      first = false;

      var hz = 1 - 2 * G.hor / ch;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(U.t, t);
      gl.uniform1f(U.m, cur.m);
      gl.uniform1f(U.asp, asp);
      gl.uniform1f(U.us, ch / 1000);
      gl.uniform1f(U.sz, (small ? 2.1 : 2.3) * dpr);
      gl.uniform1f(U.al, cur.al);
      gl.uniform1f(U.R, R);
      gl.uniform1f(U.ph, cur.ph);
      gl.uniform1f(U.hz, hz);
      gl.uniform1f(U.hs, (hz + 1.08) / 0.881);
      gl.uniform2f(U.c, cx, cy);
      gl.uniform2f(U.ptr, cur.px, cur.py);
      gl.uniform4fv(U.q, G.zq);
      gl.uniform1fv(U.qs, G.zs);

      // tik-golven, veegstaart en kanteling
      for (var w = 0; w < 2; w++) {
        wvA[w * 3] = (taps[w].x - r.left) / cw * 2 - 1;
        wvA[w * 3 + 1] = 1 - (taps[w].y - r.top) / ch * 2;
        wvA[w * 3 + 2] = Math.min((now - taps[w].at) / 1200, 2);
      }
      var n = 0, lx = 0, ly = 0;
      for (var s = 0; s < trail.length; s++) {
        var life = 1 - (now - trail[s].at) / 750;
        if (life <= 0) { trail.length = s; break; }
        trA[n * 3] = lx = (trail[s].x - r.left) / cw * 2 - 1;
        trA[n * 3 + 1] = ly = 1 - (trail[s].y - r.top) / ch * 2;
        trA[n * 3 + 2] = life;
        n++;
      }
      for (; n < 12; n++) { trA[n * 3] = lx; trA[n * 3 + 1] = ly; trA[n * 3 + 2] = 0; }
      tilt.x += (tilt.tx - tilt.x) * 0.07;
      tilt.y += (tilt.ty - tilt.y) * 0.07;
      gl.uniform3fv(U.wv, wvA);
      gl.uniform3fv(U.tr, trA);
      gl.uniform2f(U.tl, tilt.x * 0.07, -tilt.y * 0.045 * Math.min(1, 800 / ch));
      gl.drawArrays(gl.POINTS, 0, draw);
      canvas.classList.add('aan');
      fkick();
    }
    function fkick() { if (!fraf) fraf = requestAnimationFrame(frame); }

    new IntersectionObserver(function (e) {
      seen = e[e.length - 1].isIntersecting;
      fkick();
    }, { threshold: 0 }).observe(hero);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) fkick(); });
    window.addEventListener('resize', function () { stale = true; fkick(); }, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { stale = true; });
    canvas.addEventListener('webglcontextlost', function (ev) {
      ev.preventDefault();
      lost = true;
      canvas.classList.remove('aan');
    });

    fkick();
    } // setup
  }
})();

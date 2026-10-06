'use strict'

const SIZES = [36, 38, 40]

const JERSEYS = [
  { id: 'maroc', country: 'Maroc', name: 'Maillot du Maroc', title: ['Marchez vers', 'la demi-finale'], bg: '#b3202e', price: 18000, old: 24000,
    story: "En 2022, le rêve semblait impossible. Les Lions de l'Atlas ont fait vibrer tout un continent en devenant la première équipe africaine à atteindre les demi-finales d'une Coupe du monde. Ce maillot raconte cette fierté.",
    caption: "L'énergie des Lions de l'Atlas, portée avec fierté",
    kit: { body: '#c1272d', trim: '#006233', accent: '#006233', pattern: 'star', num: '#ffffff' } },
  { id: 'senegal', country: 'Sénégal', name: 'Maillot du Sénégal', title: ['La victoire est', 'dans vos gènes'], bg: '#1b9b57', price: 17000, old: 22000,
    story: "Champions d'Afrique. Pas un titre, une identité. Les Lions de la Téranga ont conquis le continent et portent la hargne de ceux qui n'abandonnent jamais. Portez les couleurs de l'hospitalité et de la victoire.",
    caption: 'La griffe des Lions de la Téranga, gravée dans le tissu',
    kit: { body: '#f7f7f2', trim: '#00853f', accent: '#00853f', pattern: 'chevron', num: '#00853f' } },
  { id: 'tunisie', country: 'Tunisie', name: 'Maillot de la Tunisie', title: ['Les premiers', 'à montrer la voie'], bg: '#c0102c', price: 13500, old: 17000,
    story: "Ils ont été les premiers. Premier pays africain à remporter un match en Coupe du monde, en 1978. La Tunisie porte ce moment historique avec toute l'élégance des Aigles de Carthage.",
    caption: 'La détermination des Aigles de Carthage, prête à s’envoler',
    kit: { body: '#e70013', trim: '#ffffff', accent: '#ffffff', pattern: 'band', num: '#ffffff' } },
  { id: 'cap-vert', country: 'Cap-Vert', name: 'Maillot du Cap-Vert', title: ['Les outsiders', 'conquièrent'], bg: '#1f4fae', price: 10500, old: 14000,
    story: "Un archipel d'environ 500 000 âmes qui défie des nations de plus de 100 millions. Les Requins Bleus naviguent sans complexe dans les eaux les plus profondes du football africain.",
    caption: 'La ferveur des Requins Bleus, conquérants des océans',
    kit: { body: '#1d4aa3', trim: '#ffffff', accent: '#ffd400', pattern: 'flag', num: '#ffffff' } },
  { id: 'nigeria', country: 'Nigeria', name: 'Maillot du Nigeria', title: ['Un style qui', 'ne passe jamais inaperçu'], bg: '#0a7d3e', price: 16000, old: 20000,
    story: "Les Super Eagles, c'est l'audace, la vitesse et un vert devenu un symbole de toute la culture nigériane. Un maillot qui se remarque dans n'importe quelle tribune.",
    caption: 'Le vol des Super Eagles',
    kit: { body: '#0b8f45', trim: '#ffffff', accent: '#ffffff', pattern: 'diag', num: '#ffffff' } },
  { id: 'ghana', country: 'Ghana', name: 'Maillot du Ghana', title: ['Une étoile noire', 'pour tout un peuple'], bg: '#a35f07', price: 14000, old: 18000,
    story: "Les Black Stars brillent depuis des décennies. Une étoile noire sur le cœur : le Ghana rappelle que le football africain sait rêver en grand.",
    caption: "L'étoile noire qui guide tout un pays",
    kit: { body: '#f6f3ea', trim: '#fcd116', accent: '#111111', pattern: 'bigstar', num: '#111111' } },
  { id: 'afrique-du-sud', country: 'Afrique du Sud', name: "Maillot de l'Afrique du Sud", title: ['Les couleurs de', 'la nation arc-en-ciel'], bg: '#0e6b5c', price: 12000, old: 16000,
    story: "Les Bafana Bafana jouent en jaune et vert. Un maillot solaire, symbole d'unité et de fierté, taillé pour les grands soirs comme pour les gradins du quotidien.",
    caption: "L'unité de la nation arc-en-ciel",
    kit: { body: '#fdb913', trim: '#007a4d', accent: '#007a4d', pattern: 'vee', num: '#007a4d' } },
  { id: 'cameroun', country: 'Cameroun', name: 'Maillot du Cameroun', title: ['Le rugissement', 'des Lions Indomptables'], bg: '#4d7c0f', price: 15000, old: 19000,
    story: "Vert, rouge et jaune : les Lions Indomptables ont marqué plusieurs générations de supporters. Un maillot qui fait gronder le stade avant même le coup d'envoi.",
    caption: 'Le rugissement des Lions Indomptables',
    kit: { body: '#128a3b', trim: '#fcd116', accent: '#ce1126', pattern: 'sash', num: '#ffffff' } },
]

const $ = (s) => document.querySelector(s)
const fcfa = (n) => n.toLocaleString('fr-FR').replace(/ /g, ' ') + ' FCFA'
const byId = (id) => JERSEYS.find((j) => j.id === id)

const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* storage unavailable */ } },
}

/* ---------- jersey drawing (original SVG, no federation logos) ---------- */
let uid = 0
function starPoints(cx, cy, R, r) {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2
    const rad = i % 2 ? r : R
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`)
  }
  return pts.join(' ')
}
function jerseySvg(k) {
  const id = `j${++uid}`
  const shirt = 'M104 22 L62 38 Q40 46 28 70 L8 118 Q5 124 12 128 L50 148 Q56 151 60 144 L78 112 Q72 150 75 190 Q78 250 74 288 Q150 308 226 288 Q222 250 225 190 Q228 150 222 112 L240 144 Q244 151 250 148 L288 128 Q295 124 292 118 L272 70 Q260 46 238 38 L196 22 L150 66Z'
  let art = ''
  switch (k.pattern) {
    case 'chevron':
      art = [['#00853f', 150], ['#fdef42', 170], ['#e31b23', 190]]
        .map(([c, y]) => `<path d="M70 ${y} L150 ${y + 36} L230 ${y} L230 ${y + 16} L150 ${y + 52} L70 ${y + 16}Z" fill="${c}"/>`).join('')
      break
    case 'star': art = `<polygon points="${starPoints(150, 174, 34, 14)}" fill="none" stroke="${k.accent}" stroke-width="5" stroke-linejoin="round"/>`; break
    case 'bigstar': art = `<polygon points="${starPoints(150, 174, 36, 15)}" fill="${k.accent}"/>`; break
    case 'band': art = `<rect x="70" y="146" width="160" height="12" fill="${k.accent}"/><rect x="70" y="164" width="160" height="5" fill="${k.accent}" opacity=".6"/>`; break
    case 'flag':
      art = `<rect x="70" y="160" width="160" height="8" fill="#fff"/><rect x="70" y="168" width="160" height="12" fill="#cf2027"/><rect x="70" y="180" width="160" height="8" fill="#fff"/><text x="150" y="152" text-anchor="middle" font-size="13" fill="${k.accent}" letter-spacing="3">★★★★★</text>`
      break
    case 'diag': art = `<path d="M76 120 L118 120 L76 204Z" fill="#fff" opacity=".92"/><path d="M224 120 L182 120 L224 204Z" fill="#fff" opacity=".92"/><rect x="70" y="216" width="160" height="8" fill="#fff" opacity=".8"/>`; break
    case 'vee': art = `<path d="M70 150 L150 198 L230 150 L230 170 L150 218 L70 170Z" fill="${k.accent}"/>`; break
    case 'sash': art = `<path d="M70 236 L230 128 L230 156 L70 264Z" fill="${k.trim}"/><path d="M70 266 L230 158 L230 170 L70 278Z" fill="${k.accent}"/>`; break
  }
  const sleeves = 'M62 38 L78 112 L60 144 Q56 151 50 148 L12 128 Q5 124 8 118 L28 70 Q40 46 62 38Z M238 38 L222 112 L240 144 Q244 151 250 148 L288 128 Q295 124 292 118 L272 70 Q260 46 238 38Z'
  return `<svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs>
      <clipPath id="${id}c"><path d="${shirt}"/></clipPath>
      <filter id="${id}b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
      <linearGradient id="${id}s" x1="0" x2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".30"/><stop offset=".22" stop-color="#000" stop-opacity=".04"/>
        <stop offset=".5" stop-color="#fff" stop-opacity=".07"/><stop offset=".78" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".34"/>
      </linearGradient>
      <linearGradient id="${id}v" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/>
      </linearGradient>
      <pattern id="${id}m" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="1.2" fill="#000" opacity=".07"/></pattern>
    </defs>
    <path d="${shirt}" fill="${k.body}"/>
    <g clip-path="url(#${id}c)">
      ${art}
      <text x="150" y="274" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="44" fill="${k.num}" opacity=".94">10</text>
      <path d="${sleeves}" fill="#000" opacity=".1"/>
      <path d="M8 121 L52 150" stroke="${k.trim}" stroke-width="15"/><path d="M292 121 L248 150" stroke="${k.trim}" stroke-width="15"/>
      <path d="M62 38 L78 112 M238 38 L222 112" stroke="#000" stroke-opacity=".28" stroke-width="1.6" fill="none"/>
      <path d="M63.500 39 L79.500 113 M236.500 39 L220.500 113" stroke="#fff" stroke-opacity=".22" stroke-width="1" stroke-dasharray="3 2" fill="none"/>
      <ellipse cx="82" cy="122" rx="14" ry="26" fill="#000" opacity=".22" filter="url(#${id}b)"/><ellipse cx="218" cy="122" rx="14" ry="26" fill="#000" opacity=".22" filter="url(#${id}b)"/>
      <path d="M112 128 Q122 205 108 288" stroke="#fff" stroke-opacity=".07" stroke-width="20" fill="none" filter="url(#${id}b)"/>
      <path d="M190 132 Q180 210 196 290" stroke="#000" stroke-opacity=".08" stroke-width="22" fill="none" filter="url(#${id}b)"/>
      <path d="M140 150 Q150 215 138 288" stroke="#000" stroke-opacity=".035" stroke-width="14" fill="none" filter="url(#${id}b)"/>
      <rect width="300" height="320" fill="url(#${id}m)"/>
      <rect width="300" height="320" fill="url(#${id}s)"/>
      <rect width="300" height="320" fill="url(#${id}v)"/>
      <path d="M76 279 Q150 298 224 279" stroke="#fff" stroke-opacity=".28" stroke-width="1" stroke-dasharray="4 3" fill="none"/>
      <path d="M74 288 Q150 308 226 288" stroke="#000" stroke-opacity=".2" stroke-width="5" fill="none"/>
    </g>
    <path d="M104 22 Q150 6 196 22 L150 66Z" fill="${k.trim}"/>
    <path d="M104 22 Q150 6 196 22 L150 66Z" fill="#000" opacity=".42"/>
    <path d="M104 22 L150 66 L196 22 L206 31 L150 80 L94 31Z" fill="${k.trim}"/>
    <path d="M94 31 L150 80 L206 31" stroke="#000" stroke-opacity=".25" stroke-width="1.2" fill="none"/>
    <path d="M104 22 L150 66 L196 22" stroke="#fff" stroke-opacity=".3" stroke-width="1" fill="none"/>
    <circle cx="106" cy="130" r="7" fill="${k.accent}" stroke="#fff" stroke-width="1.5" opacity=".95"/>
    <path d="${shirt}" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="1.4"/>
  </svg>`
}

/* ---------- state ---------- */
let idx = 0
let size = 40
let dir = 1
let cart = store.get('jm-cart', [])
let favs = store.get('jm-favs', [])
let lastFocus = null

const el = {
  stage: $('#stage'), country: $('#country'), title: $('#title'), story: $('#story'), caption: $('#caption'),
  jersey: $('#jersey'), price: $('#price'), old: $('#old'), sizes: $('#sizes'), heartBtn: $('#heartBtn'),
  nextThumb: $('#nextThumb'), toast: $('#toast'), drawer: $('#drawer'), overlay: $('#overlay'),
  items: $('#items'), total: $('#total'), cartCount: $('#cartCount'), favCount: $('#favCount'),
  modal: $('#modal'), grid: $('#grid'), info: $('#info'),
}

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
let prevPrice = 0
function countPrice(to, animated) {
  const from = prevPrice; prevPrice = to
  if (!animated || reduce) { el.price.textContent = fcfa(to); return }
  const t0 = performance.now()
  const tick = (t) => {
    const p = Math.min((t - t0) / 700, 1)
    el.price.textContent = fcfa(Math.round((from + (to - from) * (1 - Math.pow(1 - p, 3))) / 50) * 50)
    if (p < 1) requestAnimationFrame(tick); else el.price.textContent = fcfa(to)
  }
  requestAnimationFrame(tick)
}
function words(text) {
  const frag = document.createDocumentFragment()
  text.split(' ').forEach((w, i, a) => {
    const sp = document.createElement('span'); sp.className = 'w'; sp.textContent = w
    frag.append(sp); if (i < a.length - 1) frag.append(' ')
  })
  return frag
}
const animate = (node, from, opts = {}) => node.animate(from, { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both', ...opts })

function render(animated = true) {
  const j = JERSEYS[idx]
  el.stage.style.setProperty('--c', j.bg)
  el.country.textContent = j.country
  const l2 = document.createElement('span'); l2.className = 'l2'; l2.append(words(j.title[1]))
  el.title.replaceChildren(words(j.title[0]), l2)
  el.story.textContent = j.story
  el.caption.textContent = j.caption
  countPrice(j.price, animated)
  el.old.textContent = fcfa(j.old)
  el.jersey.innerHTML = jerseySvg(j.kit)
  el.jersey.setAttribute('aria-label', `${j.name}, vue de face`)
  el.nextThumb.innerHTML = jerseySvg(JERSEYS[(idx + 1) % JERSEYS.length].kit)
  el.nextThumb.setAttribute('aria-label', `Aller au maillot suivant : ${JERSEYS[(idx + 1) % JERSEYS.length].country}`)
  const fav = favs.includes(j.id)
  el.heartBtn.classList.toggle('on', fav)
  el.heartBtn.setAttribute('aria-pressed', String(fav))
  el.sizes.replaceChildren(...SIZES.map((s) => {
    const b = document.createElement('button')
    b.className = 'size'; b.type = 'button'; b.textContent = s
    b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', String(s === size)); b.setAttribute('aria-label', `Taille ${s}`)
    b.addEventListener('click', () => { size = s; [...el.sizes.children].forEach((c) => c.setAttribute('aria-checked', String(c === b))) })
    return b
  }))
  if (animated) {
    ;[el.country, el.story, $('.cta')].forEach((n, i) => animate(n, [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }], { delay: i * 70 }))
    el.title.querySelectorAll('.w').forEach((w, i) => animate(w, [{ opacity: 0, transform: 'translateY(26px) rotate(4deg)' }, { opacity: 1, transform: 'none' }], { delay: 60 + i * 55 }))
    animate(el.jersey.firstElementChild, [{ opacity: 0, transform: `translateX(${dir * 90}px) rotateY(${dir * 75}deg) rotate(${dir * 6}deg) scale(.88)` }, { opacity: 1, transform: 'none' }], { duration: 900 })
    ;[el.price, el.old, $('#buy .sizes')].forEach((n, i) => animate(n, [{ opacity: 0, transform: 'translateX(24px)' }, { opacity: 1, transform: 'none' }], { delay: 100 + i * 70 }))
    animate(el.caption, [{ opacity: 0 }, { opacity: 1 }], { delay: 300 })
  }
}

function go(step) {
  dir = step > 0 ? 1 : -1
  idx = (idx + step + JERSEYS.length) % JERSEYS.length
  render()
}

/* ---------- toast ---------- */
let toastTimer
function toast(msg) {
  el.toast.textContent = msg
  el.toast.hidden = false
  el.toast.classList.remove('show'); void el.toast.offsetWidth; el.toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { el.toast.hidden = true }, 2600)
}

/* ---------- cart ---------- */
function saveCart() { store.set('jm-cart', cart); store.set('jm-favs', favs); renderCart() }
function bump(node) { node.classList.remove('pop'); void node.offsetWidth; node.classList.add('pop') }

function renderCart() {
  const count = cart.reduce((n, i) => n + i.qty, 0)
  el.cartCount.hidden = !count; el.cartCount.textContent = count
  el.favCount.hidden = !favs.length; el.favCount.textContent = favs.length
  const total = cart.reduce((n, i) => n + byId(i.id).price * i.qty, 0)
  el.total.textContent = fcfa(total)
  if (!cart.length) { el.items.innerHTML = '<li class="empty">Votre panier est vide.</li>'; return }
  el.items.replaceChildren(...cart.map((i, n) => {
    const j = byId(i.id)
    const li = document.createElement('li'); li.className = 'item'
    li.innerHTML = jerseySvg(j.kit)
    const info = document.createElement('div')
    const b = document.createElement('b'); b.textContent = j.name
    const s = document.createElement('small'); s.textContent = `Taille ${i.size}`
    const p = document.createElement('span'); p.className = 'p'; p.textContent = fcfa(j.price)
    info.append(b, s, p)
    const q = document.createElement('div'); q.className = 'qty'
    const minus = document.createElement('button'); minus.textContent = '−'; minus.setAttribute('aria-label', `Retirer un ${j.name}`)
    const num = document.createElement('span'); num.textContent = i.qty
    const plus = document.createElement('button'); plus.textContent = '+'; plus.setAttribute('aria-label', `Ajouter un ${j.name}`)
    minus.addEventListener('click', () => { i.qty--; if (i.qty <= 0) cart.splice(n, 1); saveCart() })
    plus.addEventListener('click', () => { i.qty++; saveCart() })
    q.append(minus, num, plus)
    li.append(info, q)
    return li
  }))
}

function addToCart() {
  const j = JERSEYS[idx]
  const line = cart.find((i) => i.id === j.id && i.size === size)
  if (line) line.qty++; else cart.push({ id: j.id, size, qty: 1 })
  saveCart()
  if (reduce) bump(el.cartCount); else fly()
  toast(`${j.name} (Taille ${size}) ajouté au panier !`)
}

function fly() {
  const src = el.jersey.querySelector('svg'), a = src.getBoundingClientRect(), b = $('#cartBtn').getBoundingClientRect()
  const ghost = src.cloneNode(true)
  Object.assign(ghost.style, { position: 'fixed', left: a.left + 'px', top: a.top + 'px', width: a.width + 'px', height: a.height + 'px', zIndex: 70, pointerEvents: 'none', filter: 'drop-shadow(0 10px 14px rgb(0 0 0 / .4))' })
  document.body.append(ghost)
  const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2)
  ghost.animate([
    { transform: 'none', opacity: 1 },
    { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 80}px) scale(.45) rotate(-10deg)`, opacity: 1, offset: 0.5 },
    { transform: `translate(${dx}px, ${dy}px) scale(.05)`, opacity: 0.2 },
  ], { duration: 750, easing: 'cubic-bezier(.5,0,.3,1)' }).onfinish = () => { ghost.remove(); bump(el.cartCount) }
}

function toggleFav() {
  const j = JERSEYS[idx]
  const on = !favs.includes(j.id)
  favs = on ? [...favs, j.id] : favs.filter((f) => f !== j.id)
  saveCart(); render(false); bump(el.favCount)
  toast(on ? `${j.name} ajouté aux favoris !` : `${j.name} retiré des favoris`)
}

/* ---------- drawer & modals ---------- */
function openLayer(node, focusSel) { lastFocus = document.activeElement; node.hidden = false; (node.querySelector(focusSel) || node).focus?.() }
function closeAll() {
  el.drawer.classList.remove('open'); el.drawer.setAttribute('aria-hidden', 'true'); el.overlay.hidden = true
  el.modal.hidden = true; el.info.hidden = true
  lastFocus?.focus?.(); lastFocus = null
}
function openCart() { lastFocus = document.activeElement; el.overlay.hidden = false; el.drawer.classList.add('open'); el.drawer.setAttribute('aria-hidden', 'false'); $('#closeCart').focus() }

function openGrid(list, title) {
  $('#modalTitle').textContent = title
  el.grid.replaceChildren(...list.map((j) => {
    const c = document.createElement('div'); c.className = 'card'
    c.innerHTML = jerseySvg(j.kit)
    const k = document.createElement('small'); k.textContent = j.country
    const n = document.createElement('b'); n.textContent = j.name
    const p = document.createElement('span'); p.textContent = fcfa(j.price)
    const b = document.createElement('button'); b.textContent = 'Voir le maillot'
    b.addEventListener('click', () => { const t = JERSEYS.indexOf(j); dir = t >= idx ? 1 : -1; idx = t; closeAll(); render() })
    c.append(k, n, p, b)
    return c
  }))
  openLayer(el.modal, '#closeModal')
}
function openInfo(title, text) { $('#infoTitle').textContent = title; $('#infoText').textContent = text; openLayer(el.info, '#closeInfo') }

/* ---------- events ---------- */
$('#prev').addEventListener('click', () => go(-1))
$('#next').addEventListener('click', () => go(1))
el.nextThumb.addEventListener('click', () => go(1))
$('#addBtn').addEventListener('click', addToCart)
el.heartBtn.addEventListener('click', toggleFav)
$('#cartBtn').addEventListener('click', openCart)
$('#closeCart').addEventListener('click', closeAll)
$('#closeModal').addEventListener('click', closeAll)
$('#closeInfo').addEventListener('click', closeAll)
el.overlay.addEventListener('click', closeAll)
;[el.modal, el.info].forEach((m) => m.addEventListener('click', (e) => { if (e.target === m) closeAll() }))
$('#favBtn').addEventListener('click', () => {
  const list = JERSEYS.filter((j) => favs.includes(j.id))
  if (list.length) openGrid(list, 'Mes favoris'); else toast('Aucun favori pour le moment')
})
document.querySelectorAll('[data-action]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault()
  const t = a.dataset.action
  if (t === 'open-all') openGrid(JERSEYS, 'Tous nos maillots africains')
  if (t === 'about') openInfo('À propos', "Jersey Masters est un projet de démonstration : une boutique fictive de maillots de football africains, pour mettre en valeur le design et les animations. Les maillots sont des illustrations originales et les prix sont fictifs.")
  if (t === 'contact') openInfo('Contact', 'Projet de démonstration — code source sur github.com/Dzidoula/jersey-masters.')
}))
$('#checkout').addEventListener('click', () => {
  if (!cart.length) { toast('Votre panier est vide'); return }
  cart = []; saveCart(); closeAll(); toast('Merci ! (démo : aucune commande réelle)')
})
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAll()
  if (!el.modal.hidden || !el.info.hidden || el.drawer.classList.contains('open')) return
  if (e.key === 'ArrowRight') go(1)
  if (e.key === 'ArrowLeft') go(-1)
})
let x0 = null
el.stage.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX }, { passive: true })
el.stage.addEventListener('touchend', (e) => { if (x0 === null) return; const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 60) go(d < 0 ? 1 : -1); x0 = null })

if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce) {
  const vis = $('.visual')
  vis.addEventListener('pointermove', (e) => {
    const r = vis.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    el.jersey.style.transform = `perspective(900px) rotateY(${(x * 18).toFixed(1)}deg) rotateX(${(-y * 14).toFixed(1)}deg)`
  })
  vis.addEventListener('pointerleave', () => { el.jersey.style.transform = '' })
}

renderCart()
render(false)

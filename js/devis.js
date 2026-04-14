/* js/devis.js — 6-step quote wizard v2 */

/* ============================================================
   DATA
   ============================================================ */
const EVENT_TYPES = [
  { id: 'mariage', label: 'Mariage', icon: '\uD83D\uDC8D' },
  { id: 'anniversaire', label: 'Anniversaire', icon: '\uD83C\uDF82' },
  { id: 'corporate', label: 'Corporate', icon: '\uD83D\uDCBC' },
  { id: 'cocktail', label: 'Cocktail', icon: '\uD83C\uDF78' },
  { id: 'prive', label: 'Privé / Famille', icon: '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66' },
  { id: 'autre', label: 'Autre', icon: '\u2728' }
];

const STYLE_TYPES = [
  { id: 'plateau', label: 'Plateau individuel', icon: '\uD83C\uDF71', desc: 'Service individuel élégant, idéal repas assis' },
  { id: 'buffet', label: 'Buffet', icon: '\uD83C\uDF7D\uFE0F', desc: 'Présentation généreuse en libre-service' },
  { id: 'cocktail', label: 'Cocktail / Verrines', icon: '\uD83E\uDD42', desc: 'Bouchées et verrines raffinées' },
  { id: 'bowl', label: 'Bowl', icon: '\uD83E\uDD57', desc: 'Bowls individuels complets et colorés' },
  { id: 'lunchbox', label: 'Lunch Box', icon: '\uD83D\uDCE6', desc: 'Boîtes repas pratiques à emporter' }
];

const FORMULAS = {
  S: { label: 'Essentiel', price: 15, mezzes: 3, proteins: 1, bases: 1, desserts: 0, beveragesIncluded: false },
  M: { label: 'Généreux', price: 22, mezzes: 5, proteins: 2, bases: 2, desserts: 1, beveragesIncluded: false, popular: true },
  L: { label: 'Prestige', price: 32, mezzes: 7, proteins: 3, bases: 3, desserts: 2, beveragesIncluded: true }
};

const MEZZES = [
  { id: 'mz1', name: 'Houmous', desc: 'Pois chiches, tahini, citron', badges: ['veggie','vegan','halal','glutenfree'] },
  { id: 'mz2', name: 'Taboulé', desc: 'Persil, boulgour, tomates, menthe', badges: ['veggie','vegan','halal'] },
  { id: 'mz3', name: 'Fattouch', desc: 'Salade croquante, pain grillé, sumac', badges: ['veggie','halal'] },
  { id: 'mz4', name: 'Falafel', desc: 'Pois chiches, herbes, épices', badges: ['veggie','vegan','halal','glutenfree'] },
  { id: 'mz5', name: 'Baba Ghanouj', desc: 'Aubergine fumée, tahini', badges: ['veggie','vegan','halal','glutenfree'] },
  { id: 'mz6', name: 'Kebbé', desc: 'Boulgour, viande, noix de pin', badges: ['halal'], hasNuts: true },
  { id: 'mz7', name: 'Labneh', desc: 'Fromage frais, huile d\'olive, menthe', badges: ['veggie','halal','glutenfree'] },
  { id: 'mz8', name: 'Moutabal', desc: 'Aubergine grillée, tahini', badges: ['veggie','vegan','halal','glutenfree'] },
  { id: 'mz9', name: 'Feuilles de vigne', desc: 'Feuilles de vigne farcies au riz', badges: ['veggie','vegan','halal'] },
  { id: 'mz10', name: 'Sambousik Fromage', desc: 'Chausson frit au fromage', badges: ['veggie','halal'] },
  { id: 'mz11', name: 'Fatayer Épinards', desc: 'Mini pie épinards, citron, sumac', badges: ['veggie','vegan','halal'] }
];

const PROTEINS = [
  { id: 'pr1', name: 'Poulet Shawarma', desc: 'Poulet mariné, épices, ail', badges: ['halal'] },
  { id: 'pr2', name: 'Kafta Boeuf/Agneau', desc: 'Viande hachée, persil, oignon', badges: ['halal'] },
  { id: 'pr3', name: 'Brochettes Mixtes', desc: 'Poulet + kafta grillés', badges: ['halal'] },
  { id: 'pr4', name: 'Falafel Protéine', desc: 'Croquettes de pois chiches', badges: ['veggie','vegan','halal','glutenfree'] },
  { id: 'pr5', name: 'Chou-fleur Rôti', desc: 'Zaatar, curcuma', badges: ['veggie','vegan','halal','glutenfree'] }
];

const BASES = [
  { id: 'bs1', name: 'Riz aux vermicelles', desc: 'Riz, vermicelles dorés', badges: ['halal'] },
  { id: 'bs2', name: 'Boulgour', desc: 'Boulgour nature', badges: ['veggie','vegan','halal'] },
  { id: 'bs3', name: 'Salade verte', desc: 'Laitue, concombre, tomates', badges: ['veggie','vegan','halal','glutenfree'] },
  { id: 'bs4', name: 'Riz safrané', desc: 'Riz parfumé au safran', badges: ['veggie','halal'] }
];

const BEVERAGES = [
  { id: 'bv1', name: 'Eau plate & gazeuse', price: 2 },
  { id: 'bv2', name: 'Jus de fruits assortis', price: 3 },
  { id: 'bv3', name: 'Sodas', price: 3 },
  { id: 'bv4', name: 'Ayran', price: 3.5 },
  { id: 'bv5', name: 'Jallab', price: 4 },
  { id: 'bv6', name: 'Limonade menthe', price: 3.5 },
  { id: 'bv7', name: 'Café turc / thé menthe', price: 2.5 },
  { id: 'bv8', name: 'Pack Boissons Complet', price: 6 }
];

const DESSERTS = [
  { id: 'ds1', name: 'Baklawa assortis', price: 4 },
  { id: 'ds2', name: 'Maamoul', price: 3.5 },
  { id: 'ds3', name: 'Knefeh', price: 5 },
  { id: 'ds4', name: 'Mouhalabieh', price: 4 },
  { id: 'ds5', name: 'Fruits de saison', price: 3 },
  { id: 'ds6', name: 'Plateau Desserts Complet', price: 8 }
];

const EXTRA_PRICES = { mezzes: 2, proteins: 4, bases: 1.5 };

const BADGE_MAP = {
  veggie: { label: 'Végétarien', short: 'Végé', color: '#4caf50' },
  vegan: { label: 'Vegan', short: 'Vegan', color: '#66bb6a' },
  halal: { label: 'Halal', short: 'Halal', color: '#42a5f5' },
  glutenfree: { label: 'Sans gluten', short: 'SG', color: '#ffa726' },
  nutfree: { label: 'Sans noix', short: 'SN', color: '#ef5350' }
};

const EVENT_LABELS = {};
EVENT_TYPES.forEach(e => { EVENT_LABELS[e.id] = e.icon + ' ' + e.label; });

const STYLE_LABELS = {};
STYLE_TYPES.forEach(s => { STYLE_LABELS[s.id] = s.icon + ' ' + s.label; });

/* ============================================================
   STATE
   ============================================================ */
const state = {
  step: 1,
  eventType: '',
  persons: 30,
  style: '',
  formula: '',
  subStep: 'a',
  selectedMezzes: [],
  selectedProteins: [],
  selectedBases: [],
  selectedBeverages: [],
  selectedDesserts: [],
  filters: { veggie: false, vegan: false, glutenfree: false, halal: true, nutfree: false },
  extras: { service: false },
  date: '',
  time: '',
  contact: { name: '', email: '', phone: '', message: '' }
};

/* ============================================================
   NAVIGATION
   ============================================================ */
const TOTAL_STEPS = 6;

function goToStep(n) {
  document.querySelectorAll('.wizard-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + n).classList.add('active');

  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const ind = document.getElementById('step-ind-' + i);
    ind.classList.remove('active', 'done');
    if (i < n) { ind.classList.add('done'); ind.querySelector('.wizard-step-dot').textContent = '\u2713'; }
    else { ind.querySelector('.wizard-step-dot').textContent = i; }
    if (i === n) ind.classList.add('active');
  }

  const fill = document.getElementById('progressFill');
  fill.style.width = ((n - 1) / (TOTAL_STEPS - 1) * 100) + '%';

  state.step = n;

  // Show price bar from step 3
  const priceBar = document.getElementById('priceBar');
  if (priceBar) priceBar.style.display = n >= 3 ? 'block' : 'none';

  if (n === 4) {
    if (state.formula && state.subStep === 'b') showPanel4B();
    else showPanel4A();
  }
  if (n === 5) renderBeveragesAndDesserts();
  if (n === 6) renderRecap();

  updatePriceBar();
  document.querySelector('.wizard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function nextStep() {
  if (state.step === 1 && !state.eventType) { alert('Veuillez sélectionner un type d\'événement.'); return; }
  if (state.step === 3 && !state.style) { alert('Veuillez choisir un style de présentation.'); return; }
  if (state.step === 4) {
    if (!state.formula) { alert('Veuillez choisir une formule.'); return; }
    if (state.subStep === 'a') return; // formula cards handle navigation
  }
  if (state.step < TOTAL_STEPS) goToStep(state.step + 1);
}

function prevStep() {
  if (state.step === 4 && state.subStep === 'b') { backToFormula(); return; }
  if (state.step > 1) goToStep(state.step - 1);
}

/* ============================================================
   STEP 1 — EVENT TYPE
   ============================================================ */
function renderEventGrid() {
  const grid = document.getElementById('eventGrid');
  grid.innerHTML = EVENT_TYPES.map(e => `
    <div class="event-card" data-event="${e.id}" onclick="selectEvent('${e.id}')">
      <div class="event-card-icon">${e.icon}</div>
      <div class="event-card-label">${e.label}</div>
    </div>
  `).join('');
}

function selectEvent(type) {
  state.eventType = type;
  document.querySelectorAll('.event-card').forEach(c => c.classList.remove('selected'));
  const el = document.querySelector(`.event-card[data-event="${type}"]`);
  if (el) el.classList.add('selected');
}

/* ============================================================
   STEP 2 — PERSONS
   ============================================================ */
function updatePersons(val) {
  val = Math.max(10, Math.min(500, parseInt(val, 10) || 10));
  state.persons = val;
  document.getElementById('personsDisplay').textContent = val;
  document.getElementById('personsSlider').value = val;
  document.getElementById('personsInput').value = val;
  updatePriceBar();
}

function updatePersonsFromInput(val) {
  updatePersons(val);
}

/* ============================================================
   STEP 3 — STYLE
   ============================================================ */
function renderStyleGrid() {
  const grid = document.getElementById('styleGrid');
  grid.innerHTML = STYLE_TYPES.map(s => `
    <div class="dv2-style-card" data-style="${s.id}" onclick="selectStyle('${s.id}')">
      <div class="dv2-style-icon">${s.icon}</div>
      <div class="dv2-style-label">${s.label}</div>
      <div class="dv2-style-desc">${s.desc}</div>
    </div>
  `).join('');
}

function selectStyle(id) {
  state.style = id;
  document.querySelectorAll('.dv2-style-card').forEach(c => c.classList.remove('selected'));
  const el = document.querySelector(`.dv2-style-card[data-style="${id}"]`);
  if (el) el.classList.add('selected');
}

/* ============================================================
   STEP 4A — FORMULA SELECTION
   ============================================================ */
function showPanel4A() {
  state.subStep = 'a';
  document.getElementById('panel-4a').style.display = 'block';
  document.getElementById('panel-4b').style.display = 'none';
  renderFormulaGrid();
}

function renderFormulaGrid() {
  const grid = document.getElementById('formulaGrid');
  grid.innerHTML = Object.entries(FORMULAS).map(([key, f]) => {
    const isSelected = state.formula === key;
    const popularBadge = f.popular ? '<div class="dv2-formula-badge">\u2B50 Populaire</div>' : '';
    return `
    <div class="dv2-formula-card${isSelected ? ' selected' : ''}${f.popular ? ' popular' : ''}" data-formula="${key}" onclick="selectFormula('${key}')">
      ${popularBadge}
      <div class="dv2-formula-size">${key}</div>
      <div class="dv2-formula-name">${f.label}</div>
      <div class="dv2-formula-price">${f.price}&euro;<span>/pers</span></div>
      <ul class="dv2-formula-details">
        <li>${f.mezzes} mezzés</li>
        <li>${f.proteins} protéine${f.proteins > 1 ? 's' : ''}</li>
        <li>${f.bases} base${f.bases > 1 ? 's' : ''}</li>
        ${f.desserts > 0 ? `<li>${f.desserts} dessert${f.desserts > 1 ? 's' : ''}</li>` : ''}
        ${f.beveragesIncluded ? '<li>Boisson incluse</li>' : ''}
      </ul>
      <button class="btn btn-gold dv2-formula-btn">Choisir</button>
    </div>`;
  }).join('');
}

function selectFormula(key) {
  state.formula = key;
  // Reset selections when changing formula
  state.selectedMezzes = [];
  state.selectedProteins = [];
  state.selectedBases = [];
  state.selectedDesserts = [];
  state.selectedBeverages = [];
  showPanel4B();
  updatePriceBar();
}

/* ============================================================
   STEP 4B — ITEM SELECTION
   ============================================================ */
function showPanel4B() {
  state.subStep = 'b';
  document.getElementById('panel-4a').style.display = 'none';
  document.getElementById('panel-4b').style.display = 'block';
  renderDietFilters();
  renderItemSelection();
}

function backToFormula() {
  showPanel4A();
}

function renderDietFilters() {
  const container = document.getElementById('dietFilters');
  const filters = [
    { key: 'veggie', label: 'Végétarien' },
    { key: 'vegan', label: 'Vegan' },
    { key: 'glutenfree', label: 'Sans gluten' },
    { key: 'halal', label: 'Halal' },
    { key: 'nutfree', label: 'Sans noix' }
  ];
  container.innerHTML = filters.map(f => `
    <button class="dv2-filter-pill${state.filters[f.key] ? ' active' : ''}" data-filter="${f.key}" onclick="toggleFilter('${f.key}')">
      ${f.label}
    </button>
  `).join('');
}

function toggleFilter(key) {
  state.filters[key] = !state.filters[key];
  document.querySelectorAll('.dv2-filter-pill').forEach(btn => {
    if (btn.dataset.filter === key) btn.classList.toggle('active', state.filters[key]);
  });
  renderItemSelection();
}

function itemMatchesFilters(item) {
  const activeFilters = Object.entries(state.filters).filter(([, v]) => v).map(([k]) => k);
  if (activeFilters.length === 0) return true;
  for (const f of activeFilters) {
    if (f === 'nutfree') {
      if (item.hasNuts) return false;
    } else {
      if (!item.badges.includes(f)) return false;
    }
  }
  return true;
}

function renderItemSelection() {
  const formula = FORMULAS[state.formula];
  if (!formula) return;

  const container = document.getElementById('itemSelectionContainer');
  let html = '';

  html += renderCategoryBlock('Mezzés froids', MEZZES, state.selectedMezzes, 'mezzes', formula.mezzes, EXTRA_PRICES.mezzes);
  html += renderCategoryBlock('Protéines', PROTEINS, state.selectedProteins, 'proteins', formula.proteins, EXTRA_PRICES.proteins);
  html += renderCategoryBlock('Bases', BASES, state.selectedBases, 'bases', formula.bases, EXTRA_PRICES.bases);

  container.innerHTML = html;
}

function renderCategoryBlock(title, items, selected, category, quota, extraPrice) {
  const count = selected.length;
  let html = `
    <div class="dv2-category">
      <div class="dv2-category-header">
        <h3 class="dv2-category-title">${title}</h3>
        <span class="dv2-category-counter${count >= quota ? ' full' : ''}">${count}/${quota} sélectionnés</span>
      </div>
      <p class="dv2-category-hint">Choisissez-en ${quota} — extra : +${extraPrice}\u20AC/pers</p>
      <div class="dv2-items-list">`;

  for (const item of items) {
    const isSelected = selected.includes(item.id);
    const matches = itemMatchesFilters(item);
    const idx = selected.indexOf(item.id);
    const isExtra = idx >= quota;
    const badgesHtml = (item.badges || []).map(b => {
      const info = BADGE_MAP[b];
      return info ? `<span class="dv2-badge" style="background:${info.color}22;color:${info.color}">${info.short}</span>` : '';
    }).join('');

    html += `
      <div class="dv2-item-row${isSelected ? ' selected' : ''}${!matches ? ' disabled' : ''}" data-item="${item.id}" onclick="${matches ? `toggleItem('${category}','${item.id}')` : ''}">
        <div class="dv2-item-check">${isSelected ? '\u2713' : ''}</div>
        <div class="dv2-item-info">
          <div class="dv2-item-name">${item.name}</div>
          <div class="dv2-item-desc">${item.desc}</div>
          <div class="dv2-item-badges">${badgesHtml}</div>
        </div>
        <div class="dv2-item-tag">${isSelected ? (isExtra ? `+${extraPrice}\u20AC/pers` : 'inclus') : ''}</div>
      </div>`;
  }

  html += '</div></div>';
  return html;
}

function toggleItem(category, itemId) {
  let arr;
  if (category === 'mezzes') arr = state.selectedMezzes;
  else if (category === 'proteins') arr = state.selectedProteins;
  else if (category === 'bases') arr = state.selectedBases;
  else return;

  const idx = arr.indexOf(itemId);
  if (idx >= 0) arr.splice(idx, 1);
  else arr.push(itemId);

  renderItemSelection();
  updatePriceBar();
}

/* ============================================================
   STEP 5 — BEVERAGES & DESSERTS
   ============================================================ */
function renderBeveragesAndDesserts() {
  const formula = FORMULAS[state.formula];
  if (!formula) return;

  // Beverages
  const bevContainer = document.getElementById('beveragesContainer');
  let bevHtml = '<h3 class="dv2-category-title" style="margin-bottom:var(--space-md);">Boissons</h3>';
  if (formula.beveragesIncluded) {
    bevHtml += '<p class="dv2-category-hint" style="margin-bottom:var(--space-md);">Formule Prestige : boissons incluses !</p>';
  }
  bevHtml += '<div class="dv2-items-list">';
  for (const bev of BEVERAGES) {
    const isSelected = state.selectedBeverages.includes(bev.id);
    const isFree = formula.beveragesIncluded;
    bevHtml += `
      <div class="dv2-item-row${isSelected ? ' selected' : ''}" data-item="${bev.id}" onclick="toggleBeverage('${bev.id}')">
        <div class="dv2-item-check">${isSelected ? '\u2713' : ''}</div>
        <div class="dv2-item-info">
          <div class="dv2-item-name">${bev.name}</div>
        </div>
        <div class="dv2-item-tag">${isFree && isSelected ? 'inclus' : (isSelected ? bev.price + '\u20AC/pers' : bev.price + '\u20AC/pers')}</div>
      </div>`;
  }
  bevHtml += '</div>';
  bevContainer.innerHTML = bevHtml;

  // Desserts
  const desContainer = document.getElementById('dessertsContainer');
  const dessertQuota = formula.desserts;
  let desHtml = `<h3 class="dv2-category-title" style="margin-top:var(--space-xl);margin-bottom:var(--space-md);">Desserts</h3>`;
  if (dessertQuota > 0) {
    desHtml += `<p class="dv2-category-hint" style="margin-bottom:var(--space-md);">${dessertQuota} dessert${dessertQuota > 1 ? 's' : ''} inclus dans votre formule</p>`;
  }
  desHtml += '<div class="dv2-items-list">';
  for (const des of DESSERTS) {
    const isSelected = state.selectedDesserts.includes(des.id);
    const idx = state.selectedDesserts.indexOf(des.id);
    const isIncluded = idx >= 0 && idx < dessertQuota;
    desHtml += `
      <div class="dv2-item-row${isSelected ? ' selected' : ''}" data-item="${des.id}" onclick="toggleDessert('${des.id}')">
        <div class="dv2-item-check">${isSelected ? '\u2713' : ''}</div>
        <div class="dv2-item-info">
          <div class="dv2-item-name">${des.name}</div>
        </div>
        <div class="dv2-item-tag">${isSelected ? (isIncluded ? 'inclus' : des.price + '\u20AC/pers') : des.price + '\u20AC/pers'}</div>
      </div>`;
  }
  desHtml += '</div>';
  desContainer.innerHTML = desHtml;
}

function toggleBeverage(id) {
  const idx = state.selectedBeverages.indexOf(id);
  if (idx >= 0) state.selectedBeverages.splice(idx, 1);
  else state.selectedBeverages.push(id);
  renderBeveragesAndDesserts();
  updatePriceBar();
}

function toggleDessert(id) {
  const idx = state.selectedDesserts.indexOf(id);
  if (idx >= 0) state.selectedDesserts.splice(idx, 1);
  else state.selectedDesserts.push(id);
  renderBeveragesAndDesserts();
  updatePriceBar();
}

/* ============================================================
   PRICE CALCULATION
   ============================================================ */
function calcPricePerPerson() {
  const formula = FORMULAS[state.formula];
  if (!formula) return 0;

  let ppp = formula.price;

  // Extra mezzes
  const extraMezzes = Math.max(0, state.selectedMezzes.length - formula.mezzes);
  ppp += extraMezzes * EXTRA_PRICES.mezzes;

  // Extra proteins
  const extraProteins = Math.max(0, state.selectedProteins.length - formula.proteins);
  ppp += extraProteins * EXTRA_PRICES.proteins;

  // Extra bases
  const extraBases = Math.max(0, state.selectedBases.length - formula.bases);
  ppp += extraBases * EXTRA_PRICES.bases;

  // Desserts: first N included, rest paid
  const paidDesserts = state.selectedDesserts.slice(formula.desserts);
  for (const did of paidDesserts) {
    const des = DESSERTS.find(d => d.id === did);
    if (des) ppp += des.price;
  }

  // Beverages: free if L formula
  if (!formula.beveragesIncluded) {
    for (const bid of state.selectedBeverages) {
      const bev = BEVERAGES.find(b => b.id === bid);
      if (bev) ppp += bev.price;
    }
  }

  // Service
  if (state.extras.service) ppp += 5;

  return ppp;
}

function calcTotal() {
  return calcPricePerPerson() * state.persons;
}

function formatPrice(n) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' \u20AC';
}

function formatPriceDecimal(n) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' \u20AC';
}

function updatePriceBar() {
  const ppp = calcPricePerPerson();
  const total = ppp * state.persons;
  const elPPP = document.getElementById('pricePerPerson');
  const elTotal = document.getElementById('priceTotal');
  const elLabel = document.getElementById('pricePersonsLabel');
  if (elPPP) elPPP.textContent = formatPriceDecimal(ppp);
  if (elTotal) elTotal.textContent = formatPrice(total);
  if (elLabel) elLabel.textContent = '(' + state.persons + ' pers.)';
}

/* ============================================================
   STEP 6 — RECAP
   ============================================================ */
function renderRecap() {
  const formula = FORMULAS[state.formula];

  // Event section
  const eventSection = document.getElementById('recapEventSection');
  eventSection.innerHTML = `
    <div class="recap-row"><span class="recap-label">Événement</span><span class="recap-value">${EVENT_LABELS[state.eventType] || '\u2014'}</span></div>
    <div class="recap-row"><span class="recap-label">Personnes</span><span class="recap-value">${state.persons} personnes</span></div>
    <div class="recap-row"><span class="recap-label">Style</span><span class="recap-value">${STYLE_LABELS[state.style] || '\u2014'}</span></div>
    <div class="recap-row"><span class="recap-label">Formule</span><span class="recap-value">${state.formula} \u2014 ${formula ? formula.label : '\u2014'} (${formula ? formula.price : 0}\u20AC/pers)</span></div>
  `;

  // Menu section
  const menuSection = document.getElementById('recapMenuSection');
  let menuHtml = '<h3 style="color:var(--gold);font-family:var(--font-heading);margin-bottom:var(--space-md);font-size:1rem;">Menu sélectionné</h3>';

  if (state.selectedMezzes.length > 0) {
    menuHtml += '<div style="margin-bottom:var(--space-sm);color:var(--text-secondary);font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;">Mezzés</div>';
    const mQuota = formula ? formula.mezzes : 0;
    state.selectedMezzes.forEach((id, i) => {
      const item = MEZZES.find(m => m.id === id);
      if (!item) return;
      const isExtra = i >= mQuota;
      menuHtml += `<div class="recap-row"><span class="recap-label">${item.name}</span><span class="recap-value">${isExtra ? '+' + EXTRA_PRICES.mezzes + '\u20AC/pers' : 'inclus'}</span></div>`;
    });
  }

  if (state.selectedProteins.length > 0) {
    menuHtml += '<div style="margin-top:var(--space-md);margin-bottom:var(--space-sm);color:var(--text-secondary);font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;">Protéines</div>';
    const pQuota = formula ? formula.proteins : 0;
    state.selectedProteins.forEach((id, i) => {
      const item = PROTEINS.find(p => p.id === id);
      if (!item) return;
      const isExtra = i >= pQuota;
      menuHtml += `<div class="recap-row"><span class="recap-label">${item.name}</span><span class="recap-value">${isExtra ? '+' + EXTRA_PRICES.proteins + '\u20AC/pers' : 'inclus'}</span></div>`;
    });
  }

  if (state.selectedBases.length > 0) {
    menuHtml += '<div style="margin-top:var(--space-md);margin-bottom:var(--space-sm);color:var(--text-secondary);font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;">Bases</div>';
    const bQuota = formula ? formula.bases : 0;
    state.selectedBases.forEach((id, i) => {
      const item = BASES.find(b => b.id === id);
      if (!item) return;
      const isExtra = i >= bQuota;
      menuHtml += `<div class="recap-row"><span class="recap-label">${item.name}</span><span class="recap-value">${isExtra ? '+' + EXTRA_PRICES.bases + '\u20AC/pers' : 'inclus'}</span></div>`;
    });
  }

  menuSection.innerHTML = menuHtml;

  // Extras section (beverages + desserts)
  const extrasSection = document.getElementById('recapExtrasSection');
  let extrasHtml = '';

  if (state.selectedBeverages.length > 0) {
    extrasHtml += '<div style="margin-bottom:var(--space-sm);color:var(--text-secondary);font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;">Boissons</div>';
    for (const bid of state.selectedBeverages) {
      const bev = BEVERAGES.find(b => b.id === bid);
      if (!bev) continue;
      const isFree = formula && formula.beveragesIncluded;
      extrasHtml += `<div class="recap-row"><span class="recap-label">${bev.name}</span><span class="recap-value">${isFree ? 'inclus' : bev.price + '\u20AC/pers'}</span></div>`;
    }
  }

  if (state.selectedDesserts.length > 0) {
    extrasHtml += '<div style="margin-top:var(--space-md);margin-bottom:var(--space-sm);color:var(--text-secondary);font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;">Desserts</div>';
    const dQuota = formula ? formula.desserts : 0;
    state.selectedDesserts.forEach((id, i) => {
      const des = DESSERTS.find(d => d.id === id);
      if (!des) return;
      const isIncluded = i < dQuota;
      extrasHtml += `<div class="recap-row"><span class="recap-label">${des.name}</span><span class="recap-value">${isIncluded ? 'inclus' : des.price + '\u20AC/pers'}</span></div>`;
    });
  }

  if (state.extras.service) {
    extrasHtml += `<div class="recap-row"><span class="recap-label">Service sur place</span><span class="recap-value">+5\u20AC/pers</span></div>`;
  }

  extrasSection.innerHTML = extrasHtml || '<p style="color:var(--text-muted);">Aucun extra sélectionné</p>';

  // Total
  const totalSection = document.getElementById('recapTotalSection');
  const ppp = calcPricePerPerson();
  const total = calcTotal();
  totalSection.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div class="recap-total-label">Total estimé</div>
        <div style="color:var(--text-secondary);font-size:0.9rem;">${formatPriceDecimal(ppp)} / personne &times; ${state.persons} pers.</div>
      </div>
      <div class="recap-total-amount">${formatPrice(total)}</div>
    </div>`;
}

function formatDate(dateStr) {
  if (!dateStr) return '\u2014';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ============================================================
   SEND DEVIS
   ============================================================ */
function sendDevis() {
  const name = (document.getElementById('contactName').value || '').trim();
  const email = (document.getElementById('contactEmail').value || '').trim();
  const phone = (document.getElementById('contactPhone').value || '').trim();
  const message = (document.getElementById('contactMessage').value || '').trim();

  state.contact = { name, email, phone, message };
  state.date = (document.getElementById('eventDate').value || '');
  state.time = (document.getElementById('eventTime').value || '');

  if (!name || !email) {
    alert('Merci de renseigner votre nom et votre email.');
    return;
  }

  alert('Merci ! Nous vous recontacterons sous 24h.');
}

/* ============================================================
   PDF GENERATION
   ============================================================ */
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) { alert('La librairie PDF n\'est pas chargée.'); return; }

  // Gather contact info
  state.contact.name = (document.getElementById('contactName').value || '').trim();
  state.contact.email = (document.getElementById('contactEmail').value || '').trim();
  state.contact.phone = (document.getElementById('contactPhone').value || '').trim();
  state.contact.message = (document.getElementById('contactMessage').value || '').trim();
  state.date = (document.getElementById('eventDate').value || '');
  state.time = (document.getElementById('eventTime').value || '');

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210;
  const margin = 20;
  let y = margin;

  // Header
  doc.setFillColor(26, 26, 46);
  doc.rect(0, 0, W, 45, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(margin, 42, W - margin, 42);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(212, 175, 55);
  doc.text('LE TRAITEUR LIBANAIS', W / 2, 18, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(200, 190, 160);
  doc.text('DEVIS PERSONNALIS\u00C9', W / 2, 27, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(150, 140, 120);
  const dateNow = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.text('G\u00E9n\u00E9r\u00E9 le ' + dateNow, W / 2, 35, { align: 'center' });

  y = 55;

  function sectionTitle(title) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(212, 175, 55);
    doc.text(title.toUpperCase(), margin, y);
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.3);
    doc.line(margin, y + 2, W - margin, y + 2);
    y += 8;
  }

  function row(label, value) {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 80);
    doc.text(label, margin, y);
    doc.setTextColor(30, 30, 50);
    doc.text(String(value), margin + 60, y);
    y += 6;
  }

  const formula = FORMULAS[state.formula];

  // Event
  sectionTitle('\u00C9v\u00E9nement');
  row('Type', EVENT_LABELS[state.eventType] || '\u2014');
  row('Personnes', state.persons + ' personnes');
  row('Style', STYLE_LABELS[state.style] || '\u2014');
  row('Formule', state.formula + ' \u2014 ' + (formula ? formula.label : '\u2014') + ' (' + (formula ? formula.price : 0) + '\u20AC/pers)');
  row('Date', state.date ? formatDate(state.date) : '\u2014');
  row('Heure', state.time || '\u2014');
  y += 4;

  // Contact
  sectionTitle('Contact');
  row('Nom', state.contact.name || '\u2014');
  row('Email', state.contact.email || '\u2014');
  row('T\u00E9l\u00E9phone', state.contact.phone || '\u2014');
  y += 4;

  // Menu
  sectionTitle('Menu s\u00E9lectionn\u00E9');

  function printCategory(title, items, selectedIds, quota, extraPrice, allItems) {
    if (selectedIds.length === 0) return;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 100);
    doc.text(title, margin, y);
    y += 5;
    selectedIds.forEach(function(id, i) {
      if (y > 270) { doc.addPage(); y = 20; }
      var item = allItems.find(function(x) { return x.id === id; });
      if (!item) return;
      var isExtra = i >= quota;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 60);
      doc.text('\u2022 ' + item.name, margin + 4, y);
      doc.text(isExtra ? '+' + extraPrice + '\u20AC/pers' : 'inclus', W - margin, y, { align: 'right' });
      y += 5;
    });
    y += 2;
  }

  if (formula) {
    printCategory('MEZZ\u00C9S', MEZZES, state.selectedMezzes, formula.mezzes, EXTRA_PRICES.mezzes, MEZZES);
    printCategory('PROT\u00C9INES', PROTEINS, state.selectedProteins, formula.proteins, EXTRA_PRICES.proteins, PROTEINS);
    printCategory('BASES', BASES, state.selectedBases, formula.bases, EXTRA_PRICES.bases, BASES);
  }

  // Beverages
  if (state.selectedBeverages.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 100);
    doc.text('BOISSONS', margin, y);
    y += 5;
    for (const bid of state.selectedBeverages) {
      if (y > 270) { doc.addPage(); y = 20; }
      const bev = BEVERAGES.find(b => b.id === bid);
      if (!bev) continue;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 60);
      doc.text('\u2022 ' + bev.name, margin + 4, y);
      doc.text(formula && formula.beveragesIncluded ? 'inclus' : bev.price + '\u20AC/pers', W - margin, y, { align: 'right' });
      y += 5;
    }
    y += 2;
  }

  // Desserts
  if (state.selectedDesserts.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 100);
    doc.text('DESSERTS', margin, y);
    y += 5;
    const dQuota = formula ? formula.desserts : 0;
    state.selectedDesserts.forEach((id, i) => {
      if (y > 270) { doc.addPage(); y = 20; }
      const des = DESSERTS.find(d => d.id === id);
      if (!des) return;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 60);
      doc.text('\u2022 ' + des.name, margin + 4, y);
      doc.text(i < dQuota ? 'inclus' : des.price + '\u20AC/pers', W - margin, y, { align: 'right' });
      y += 5;
    });
    y += 2;
  }

  if (state.extras.service) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 100);
    doc.text('\u2022 Service sur place : +5\u20AC/pers', margin + 4, y);
    y += 6;
  }

  y += 4;

  // Total box
  if (y > 260) { doc.addPage(); y = 20; }
  doc.setFillColor(212, 175, 55);
  doc.rect(margin, y, W - 2 * margin, 14, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(26, 26, 46);
  doc.text('PRIX / PERSONNE', margin + 4, y + 6);
  doc.text(formatPriceDecimal(calcPricePerPerson()), margin + 80, y + 6);
  doc.setFontSize(13);
  doc.text('TOTAL', margin + 4, y + 12);
  doc.text(formatPrice(calcTotal()), W - margin - 4, y + 12, { align: 'right' });
  y += 20;

  // Disclaimer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(140, 130, 110);
  const disclaimer = 'Ce devis est indicatif. Il sera confirm\u00E9 par notre \u00E9quipe dans les 48h. TVA non applicable selon article 293B du CGI.';
  const lines = doc.splitTextToSize(disclaimer, W - 2 * margin);
  doc.text(lines, margin, y);
  y += lines.length * 4 + 4;

  // Footer
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(margin, 280, W - margin, 280);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(140, 130, 110);
  doc.text('Le Traiteur Libanais \u2014 Lyon, France', margin, 285);
  doc.text('contact@letraiteurlibanais.com | 04 72 00 00 00', W - margin, 285, { align: 'right' });

  doc.save('devis-traiteur-libanais.pdf');
}

/* ============================================================
   DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderEventGrid();
  renderStyleGrid();
  goToStep(1);
});

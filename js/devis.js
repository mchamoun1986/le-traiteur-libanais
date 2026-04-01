/* js/devis.js — 5-step quote wizard */

/* ============================================================
   MENU DATA
   ============================================================ */
const MENU_DATA = {
  mezzes: {
    label: 'Mezzés',
    items: [
      { id: 'm1', name: 'Houmous', price: 4, unit: '/pers', img: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=200', desc: 'Pois chiches, tahini, citron', badges: ['veggie', 'vegan'] },
      { id: 'm2', name: 'Taboulé', price: 4.5, unit: '/pers', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200', desc: 'Persil, boulgour, tomates, menthe', badges: ['veggie', 'vegan'] },
      { id: 'm3', name: 'Fattouch', price: 5, unit: '/pers', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200', desc: 'Salade croquante, pain grillé, sumac', badges: ['veggie'] },
      { id: 'm4', name: 'Kebbé', price: 5.5, unit: '/pers', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200', desc: 'Boulghour, viande, noix de pin', badges: [] },
      { id: 'm5', name: 'Falafel', price: 4, unit: '/pers', img: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=200', desc: 'Pois chiches, herbes, épices', badges: ['veggie', 'vegan'] },
      { id: 'm6', name: 'Baba Ghanouj', price: 4.5, unit: '/pers', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200', desc: 'Aubergine fumée, tahini, ail', badges: ['veggie', 'vegan'] }
    ]
  },
  verrines: {
    label: 'Verrines',
    items: [
      { id: 'v1', name: 'Houmous Pistache', price: 3.5, unit: '/pièce', img: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=200', desc: 'Houmous crémeux, éclats de pistache', badges: ['veggie', 'vegan'] },
      { id: 'v2', name: 'Taboulé Quinoa', price: 3.5, unit: '/pièce', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200', desc: 'Quinoa, herbes fraîches, grenade', badges: ['veggie', 'vegan', 'glutenfree'] },
      { id: 'v3', name: 'Labneh Grenade', price: 3.5, unit: '/pièce', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200', desc: 'Labneh onctueux, graines de grenade', badges: ['veggie'] },
      { id: 'v4', name: 'Mouhamara', price: 3.5, unit: '/pièce', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200', desc: 'Poivrons rouges, noix, mélasse', badges: ['veggie', 'vegan'] },
      { id: 'v5', name: 'Baba Ghanouj Truffe', price: 3.5, unit: '/pièce', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200', desc: 'Aubergine fumée, huile de truffe', badges: ['veggie', 'vegan'] },
      { id: 'v6', name: 'Kebbé Nayyeh', price: 3.5, unit: '/pièce', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200', desc: 'Viande crue, boulgour fin, épices', badges: [] }
    ]
  },
  bowls: {
    label: 'Bowls',
    items: [
      { id: 'b1', name: 'Bowl Shawarma', price: 14, unit: '/pers', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200', desc: 'Poulet mariné, riz, pickles, ail', badges: [] },
      { id: 'b2', name: 'Bowl Falafel Veggie', price: 12, unit: '/pers', img: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=200', desc: 'Falafel, houmous, légumes grillés', badges: ['veggie', 'vegan'] },
      { id: 'b3', name: 'Bowl Grillades Mixtes', price: 16, unit: '/pers', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200', desc: 'Brochettes mixtes, riz aux vermicelles', badges: [] },
      { id: 'b4', name: 'Bowl Kebbé', price: 14, unit: '/pers', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200', desc: 'Kebbé, taboulé, labneh', badges: [] }
    ]
  },
  lunchboxes: {
    label: 'Lunch Boxes',
    items: [
      { id: 'l1', name: 'Lunch Box Standard', price: 16, unit: '/pers', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200', desc: '2 mezzés + 1 grillades + riz + dessert', badges: [] },
      { id: 'l2', name: 'Lunch Box Premium', price: 22, unit: '/pers', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200', desc: '3 mezzés + grillades mixtes + riz + 2 desserts', badges: [] },
      { id: 'l3', name: 'Lunch Box Veggie', price: 14, unit: '/pers', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200', desc: '3 mezzés végé + falafel + riz + dessert', badges: ['veggie'] }
    ]
  },
  buffets: {
    label: 'Buffets',
    items: [
      { id: 'f1', name: 'Buffet Essentiel', price: 25, unit: '/pers', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=200', desc: '4 mezzés, 2 grillades, riz, 2 salades, pain, 1 dessert. Min. 20 pers.', badges: [], min: 20 },
      { id: 'f2', name: 'Buffet Premium', price: 35, unit: '/pers', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200', desc: '6 mezzés, 3 grillades, riz, 3 salades, pain, fromages, 2 desserts. Min. 20 pers.', badges: [], min: 20 },
      { id: 'f3', name: 'Buffet Prestige', price: 50, unit: '/pers', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200', desc: '8 mezzés, grillades royales, riz, salades, fromages, fruits, 3 desserts, boissons. Min. 20 pers.', badges: [], min: 20 }
    ]
  }
};

/* ============================================================
   STATE
   ============================================================ */
const state = {
  step: 1,
  eventType: '',
  selections: {},   // { itemId: { qty, item } }
  options: { halal: true },
  persons: 50,
  date: '',
  time: '',
  address: '',
  service: false,
  contact: {}
};

/* ============================================================
   NAVIGATION
   ============================================================ */
function goToStep(n) {
  // Hide all panels
  document.querySelectorAll('.wizard-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + n).classList.add('active');

  // Update step indicators
  for (let i = 1; i <= 5; i++) {
    const ind = document.getElementById('step-ind-' + i);
    ind.classList.remove('active', 'done');
    if (i < n) ind.classList.add('done');
    if (i === n) ind.classList.add('active');
  }

  // Update progress fill (5 steps → 4 gaps)
  const fill = document.getElementById('progressFill');
  fill.style.width = ((n - 1) / 4 * 100) + '%';

  state.step = n;

  if (n === 5) {
    renderRecap();
  }

  updateLivePrice();

  // Scroll to top of wizard
  document.querySelector('.wizard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function nextStep() {
  if (state.step < 5) goToStep(state.step + 1);
}

function prevStep() {
  if (state.step > 1) goToStep(state.step - 1);
}

/* ============================================================
   STEP 1 — EVENT SELECTION
   ============================================================ */
function selectEvent(type, el) {
  state.eventType = type;
  document.querySelectorAll('.event-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

/* ============================================================
   STEP 2 — MENU RENDERING
   ============================================================ */
const CATEGORY_LABELS = {
  mezzes: 'Mezzés',
  verrines: 'Verrines',
  bowls: 'Bowls',
  lunchboxes: 'Lunch Boxes',
  buffets: 'Buffets'
};

const BADGE_LABELS = {
  veggie: '🥬 Végé',
  vegan: '🌱 Vegan',
  glutenfree: '🌾 Sans gluten'
};

function renderMenuItems() {
  const container = document.getElementById('menuItems');
  let html = '';

  for (const [catKey, cat] of Object.entries(MENU_DATA)) {
    html += `<h3 style="font-family:var(--font-heading);color:var(--gold);font-size:1.3rem;margin:var(--space-xl) 0 var(--space-md);padding-bottom:var(--space-sm);border-bottom:1px solid rgba(212,175,55,0.2);">${cat.label}</h3>`;

    for (const item of cat.items) {
      const sel = state.selections[item.id];
      const qty = sel ? sel.qty : 0;
      const isSelected = qty > 0;

      const badgesHtml = (item.badges || []).map(b =>
        `<span style="display:inline-block;background:rgba(212,175,55,0.15);color:var(--gold);font-size:0.7rem;padding:2px 6px;border-radius:10px;margin-right:4px;">${BADGE_LABELS[b] || b}</span>`
      ).join('');

      const minNote = item.min ? `<span style="color:var(--text-muted);font-size:0.75rem;"> (min. ${item.min} pers.)</span>` : '';

      html += `
        <div class="menu-item${isSelected ? ' selected' : ''}" id="item-${item.id}">
          <img class="menu-item-img" src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555244162-803834f70033?w=200'">
          <div class="menu-item-info">
            <div class="menu-item-name">${item.name}${minNote}</div>
            <div class="menu-item-desc">${item.desc}</div>
            <div style="margin-top:4px;">${badgesHtml}</div>
          </div>
          <div class="menu-item-price">${item.price} €${item.unit}</div>
          <div class="menu-item-qty">
            <button onclick="adjustQty('${item.id}', -1)">−</button>
            <span id="qty-${item.id}">${qty}</span>
            <button onclick="adjustQty('${item.id}', 1)">+</button>
          </div>
        </div>`;
    }
  }

  container.innerHTML = html;
}

/* ============================================================
   STEP 2 — QTY ADJUSTMENT
   ============================================================ */
function getItemById(id) {
  for (const cat of Object.values(MENU_DATA)) {
    const found = cat.items.find(i => i.id === id);
    if (found) return found;
  }
  return null;
}

function adjustQty(itemId, delta) {
  const item = getItemById(itemId);
  if (!item) return;

  const current = state.selections[itemId] ? state.selections[itemId].qty : 0;
  const newQty = Math.max(0, current + delta);

  if (newQty === 0) {
    delete state.selections[itemId];
  } else {
    state.selections[itemId] = { qty: newQty, item };
  }

  // Update DOM
  const qtyEl = document.getElementById('qty-' + itemId);
  if (qtyEl) qtyEl.textContent = newQty;

  const itemEl = document.getElementById('item-' + itemId);
  if (itemEl) {
    if (newQty > 0) itemEl.classList.add('selected');
    else itemEl.classList.remove('selected');
  }

  updateLivePrice();
}

/* ============================================================
   STEP 3 — OPTIONS
   ============================================================ */
function toggleOption(key, el) {
  const isChecked = el.classList.contains('checked');
  if (isChecked) {
    el.classList.remove('checked');
    state.options[key] = false;
  } else {
    el.classList.add('checked');
    state.options[key] = true;
  }
}

/* ============================================================
   STEP 4 — LOGISTICS
   ============================================================ */
function updatePersons(val) {
  state.persons = parseInt(val, 10);
  const el = document.getElementById('personsValue');
  if (el) el.textContent = val;
  updateLivePrice();
}

function toggleService(el) {
  const isChecked = el.classList.contains('checked');
  if (isChecked) {
    el.classList.remove('checked');
    state.service = false;
  } else {
    el.classList.add('checked');
    state.service = true;
  }
  updateLivePrice();
}

/* ============================================================
   PRICE CALCULATION
   ============================================================ */
function calcTotal() {
  let total = 0;
  for (const sel of Object.values(state.selections)) {
    const { qty, item } = sel;
    if (item.unit === '/pers') {
      total += item.price * qty * state.persons;
    } else {
      // /pièce — qty = number of pieces per person equivalent
      total += item.price * qty;
    }
  }
  if (state.service) {
    total += 5 * state.persons;
  }
  return total;
}

function formatPrice(n) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
}

function updateLivePrice() {
  const el = document.getElementById('livePrice');
  if (el) el.textContent = formatPrice(calcTotal());
}

/* ============================================================
   STEP 5 — RECAP
   ============================================================ */
const EVENT_LABELS = {
  mariage: '💍 Mariage',
  anniversaire: '🎂 Anniversaire',
  corporate: '💼 Corporate',
  cocktail: '🍸 Cocktail',
  prive: '👨‍👩‍👧‍👦 Privé / Famille',
  autre: '✨ Autre'
};

function renderRecap() {
  // Basics
  const recapEvent = document.getElementById('recapEvent');
  if (recapEvent) recapEvent.textContent = EVENT_LABELS[state.eventType] || (state.eventType || '—');

  const recapPersons = document.getElementById('recapPersons');
  if (recapPersons) recapPersons.textContent = state.persons + ' personnes';

  const recapDate = document.getElementById('recapDate');
  if (recapDate) recapDate.textContent = state.date ? formatDate(state.date) : '—';

  const recapTime = document.getElementById('recapTime');
  if (recapTime) recapTime.textContent = state.time || '—';

  const recapAddress = document.getElementById('recapAddress');
  if (recapAddress) recapAddress.textContent = state.address || '—';

  // Items
  const recapItems = document.getElementById('recapItems');
  if (recapItems) {
    const entries = Object.values(state.selections);
    if (entries.length === 0) {
      recapItems.innerHTML = '<p style="color:var(--text-muted);text-align:center;">Aucun article sélectionné</p>';
    } else {
      let html = '';
      for (const sel of entries) {
        const { qty, item } = sel;
        let lineTotal;
        let qtyLabel;
        if (item.unit === '/pers') {
          lineTotal = item.price * qty * state.persons;
          qtyLabel = `×${qty} × ${state.persons} pers.`;
        } else {
          lineTotal = item.price * qty;
          qtyLabel = `×${qty} pièces`;
        }
        html += `
          <div class="recap-row">
            <span class="recap-label">${item.name} <small style="color:var(--text-muted);">(${qtyLabel} × ${item.price} €)</small></span>
            <span class="recap-value">${formatPrice(lineTotal)}</span>
          </div>`;
      }
      if (state.service) {
        html += `
          <div class="recap-row">
            <span class="recap-label">Service sur place</span>
            <span class="recap-value">${formatPrice(5 * state.persons)}</span>
          </div>`;
      }
      recapItems.innerHTML = html;
    }
  }

  // Total
  const recapTotal = document.getElementById('recapTotal');
  if (recapTotal) recapTotal.textContent = formatPrice(calcTotal());
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ============================================================
   SEND BY EMAIL
   ============================================================ */
function sendDevis() {
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const phone = document.getElementById('contactPhone').value.trim();

  state.contact = { name, email, phone };

  if (!name || !email) {
    alert('Merci de renseigner votre nom et votre email.');
    return;
  }

  const body = buildEmailBody();
  const subject = encodeURIComponent('Demande de devis — Le Traiteur Libanais');
  const bodyEncoded = encodeURIComponent(body);
  const to = 'contact@letraiteurlibanais.com';

  window.location.href = `mailto:${to}?subject=${subject}&body=${bodyEncoded}`;
}

function buildEmailBody() {
  const lines = [];
  lines.push('DEMANDE DE DEVIS — LE TRAITEUR LIBANAIS');
  lines.push('==========================================');
  lines.push('');
  lines.push('CONTACT');
  lines.push(`Nom     : ${state.contact.name || '—'}`);
  lines.push(`Email   : ${state.contact.email || '—'}`);
  lines.push(`Tél     : ${state.contact.phone || '—'}`);
  lines.push('');
  lines.push('ÉVÉNEMENT');
  lines.push(`Type    : ${EVENT_LABELS[state.eventType] || state.eventType || '—'}`);
  lines.push(`Personnes: ${state.persons}`);
  lines.push(`Date    : ${state.date ? formatDate(state.date) : '—'}`);
  lines.push(`Heure   : ${state.time || '—'}`);
  lines.push(`Adresse : ${state.address || '—'}`);
  lines.push('');
  lines.push('OPTIONS ALIMENTAIRES');
  const optList = Object.entries(state.options).filter(([, v]) => v).map(([k]) => k);
  lines.push(optList.length > 0 ? optList.join(', ') : 'Aucune option spécifique');
  lines.push('');
  lines.push('MENU SÉLECTIONNÉ');
  lines.push('---');

  for (const sel of Object.values(state.selections)) {
    const { qty, item } = sel;
    let lineTotal, qtyLabel;
    if (item.unit === '/pers') {
      lineTotal = item.price * qty * state.persons;
      qtyLabel = `×${qty} × ${state.persons} pers.`;
    } else {
      lineTotal = item.price * qty;
      qtyLabel = `×${qty} pièces`;
    }
    lines.push(`• ${item.name} (${qtyLabel} × ${item.price} €) = ${formatPrice(lineTotal)}`);
  }

  if (state.service) {
    lines.push(`• Service sur place (${state.persons} pers. × 5 €) = ${formatPrice(5 * state.persons)}`);
  }

  lines.push('');
  lines.push(`TOTAL ESTIMÉ : ${formatPrice(calcTotal())}`);
  lines.push('');
  lines.push('---');
  lines.push('Ce devis est indicatif et sera confirmé par notre équipe.');

  return lines.join('\n');
}

/* ============================================================
   PDF GENERATION
   ============================================================ */
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) {
    alert('La librairie PDF n\'est pas chargée. Veuillez réessayer.');
    return;
  }

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210;
  const margin = 20;
  let y = margin;

  // Header background
  doc.setFillColor(26, 26, 46);
  doc.rect(0, 0, W, 45, 'F');

  // Gold accent line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(margin, 42, W - margin, 42);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(212, 175, 55);
  doc.text('LE TRAITEUR LIBANAIS', W / 2, 18, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(200, 190, 160);
  doc.text('SIMULATEUR DE DEVIS', W / 2, 27, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(150, 140, 120);
  const dateNow = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.text(`Généré le ${dateNow}`, W / 2, 35, { align: 'center' });

  y = 55;

  // Section helper
  function sectionTitle(title) {
    doc.setFillColor(212, 175, 55, 0.1);
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.3);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(212, 175, 55);
    doc.text(title.toUpperCase(), margin, y);
    doc.line(margin, y + 2, W - margin, y + 2);
    y += 8;
  }

  function row(label, value, bold = false) {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 80);
    doc.text(label, margin, y);
    doc.setTextColor(30, 30, 50);
    doc.text(String(value), margin + 60, y);
    y += 6;
  }

  // Event info
  sectionTitle('Événement');
  row('Type', EVENT_LABELS[state.eventType] || state.eventType || '—');
  row('Personnes', state.persons + ' personnes');
  row('Date', state.date ? formatDate(state.date) : '—');
  row('Heure', state.time || '—');
  row('Adresse', state.address || '—');
  y += 4;

  // Contact info
  sectionTitle('Contact');
  const name = document.getElementById('contactName') ? document.getElementById('contactName').value : '';
  const email = document.getElementById('contactEmail') ? document.getElementById('contactEmail').value : '';
  const phone = document.getElementById('contactPhone') ? document.getElementById('contactPhone').value : '';
  row('Nom', name || '—');
  row('Email', email || '—');
  row('Téléphone', phone || '—');
  y += 4;

  // Options
  sectionTitle('Options alimentaires');
  const optList = Object.entries(state.options).filter(([, v]) => v).map(([k]) => k);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 80);
  doc.text(optList.length > 0 ? optList.join(' • ') : 'Aucune option spécifique', margin, y);
  y += 8;

  // Menu items
  sectionTitle('Menu sélectionné');

  const selections = Object.values(state.selections);
  if (selections.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 140);
    doc.text('Aucun article sélectionné', margin, y);
    y += 6;
  } else {
    // Table header
    doc.setFillColor(240, 235, 220);
    doc.rect(margin, y - 4, W - 2 * margin, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 70);
    doc.text('Article', margin + 2, y);
    doc.text('Qté', margin + 80, y, { align: 'center' });
    doc.text('P.U.', margin + 110, y, { align: 'center' });
    doc.text('Total', W - margin - 2, y, { align: 'right' });
    y += 7;

    let rowBg = false;
    for (const sel of selections) {
      const { qty, item } = sel;
      let lineTotal, qtyLabel;
      if (item.unit === '/pers') {
        lineTotal = item.price * qty * state.persons;
        qtyLabel = `×${qty} (${state.persons}p)`;
      } else {
        lineTotal = item.price * qty;
        qtyLabel = `×${qty} pcs`;
      }

      if (rowBg) {
        doc.setFillColor(248, 246, 240);
        doc.rect(margin, y - 4, W - 2 * margin, 6.5, 'F');
      }
      rowBg = !rowBg;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 60);
      doc.text(item.name, margin + 2, y);
      doc.text(qtyLabel, margin + 80, y, { align: 'center' });
      doc.text(item.price.toFixed(2) + ' €', margin + 110, y, { align: 'center' });
      doc.text(formatPrice(lineTotal), W - margin - 2, y, { align: 'right' });
      y += 6.5;
    }

    if (state.service) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 100);
      doc.text('Service sur place', margin + 2, y);
      doc.text(`${state.persons} pers.`, margin + 80, y, { align: 'center' });
      doc.text('5.00 €', margin + 110, y, { align: 'center' });
      doc.text(formatPrice(5 * state.persons), W - margin - 2, y, { align: 'right' });
      y += 6.5;
    }
  }

  y += 4;

  // Total box
  doc.setFillColor(212, 175, 55);
  doc.rect(margin, y, W - 2 * margin, 12, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(26, 26, 46);
  doc.text('TOTAL ESTIMÉ', margin + 4, y + 8);
  doc.text(formatPrice(calcTotal()), W - margin - 4, y + 8, { align: 'right' });
  y += 18;

  // Disclaimer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(140, 130, 110);
  const disclaimer = 'Ce devis est indicatif et établi sur la base des informations fournies. Il sera confirmé par notre équipe dans les 48h. TVA non applicable selon article 293B du CGI.';
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
  doc.text('Le Traiteur Libanais — Lyon, France', margin, 285);
  doc.text('contact@letraiteurlibanais.com | 04 72 00 00 00', W - margin, 285, { align: 'right' });

  doc.save('devis-traiteur-libanais.pdf');
}

/* ============================================================
   DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderMenuItems();
  renderWizard();

  // Bind logistics inputs
  const dateInput = document.getElementById('eventDate');
  if (dateInput) dateInput.addEventListener('change', e => { state.date = e.target.value; });

  const timeInput = document.getElementById('eventTime');
  if (timeInput) timeInput.addEventListener('change', e => { state.time = e.target.value; });

  const addrInput = document.getElementById('eventAddress');
  if (addrInput) addrInput.addEventListener('input', e => { state.address = e.target.value; });

  // Focus fix for date/time inputs on dark background
  [dateInput, timeInput, addrInput].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('focus', () => { inp.style.borderColor = 'var(--gold)'; inp.style.outline = 'none'; });
    inp.addEventListener('blur', () => { inp.style.borderColor = 'rgba(212,175,55,0.2)'; });
  });
});

function renderWizard() {
  goToStep(1);
  updateLivePrice();
}

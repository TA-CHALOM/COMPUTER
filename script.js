/* ============================================================
   TA-CHALOM COMPUTER – script.js  (v2 with Admin Panel)
   Storage keys:
     tc_products  – array of product objects
     tc_auth      – hashed credentials
   ============================================================ */

/* ──────────────────────────────────────────────────────────────
   DEFAULT PRODUCTS  (loaded on first visit if no data stored)
   ────────────────────────────────────────────────────────────── */
const DEFAULT_PRODUCTS = [
  { id:'p1', icon:'🖥️', cat:'desktop',     name:'PC Desktop Intel Core i5',      desc:'RAM 8GB / SSD 256GB / พร้อมใช้งาน',                  price:12900, priceLabel:'',               status:'available' },
  { id:'p2', icon:'🖥️', cat:'desktop',     name:'PC Desktop AMD Ryzen 5',         desc:'RAM 16GB / SSD 512GB / RTX 3050',                    price:22500, priceLabel:'',               status:'available' },
  { id:'p3', icon:'💻', cat:'notebook',    name:'Notebook Lenovo IdeaPad',        desc:'Core i5 / RAM 8GB / SSD 512GB / 15.6"',              price:16900, priceLabel:'',               status:'available' },
  { id:'p4', icon:'💻', cat:'notebook',    name:'Notebook Asus VivoBook',         desc:'Ryzen 5 / RAM 16GB / SSD 512GB / 14"',               price:19500, priceLabel:'',               status:'available' },
  { id:'p5', icon:'🖨️', cat:'printer',     name:'Epson L3250 Wi-Fi',              desc:'พิมพ์ / สแกน / ถ่ายเอกสาร / หมึกแท้ Epson',         price:5490,  priceLabel:'',               status:'available' },
  { id:'p6', icon:'🖨️', cat:'printer',     name:'Canon PIXMA G2020',              desc:'พิมพ์ / สแกน / ถ่ายเอกสาร / Ink Tank',              price:4290,  priceLabel:'',               status:'available' },
  { id:'p7', icon:'⌨️', cat:'accessories', name:'ชุดคีย์บอร์ด + เมาส์ Wireless', desc:'ไร้สาย USB Nano Receiver ใช้ได้ทั้ง PC / Notebook', price:490,   priceLabel:'',               status:'available' },
  { id:'p8', icon:'💾', cat:'accessories', name:'SSD 256GB / 512GB / 1TB',        desc:'Kingston / WD / Samsung พร้อมบริการติดตั้ง',         price:790,   priceLabel:'฿ 790 ขึ้นไป',   status:'available' },
  { id:'p9', icon:'🖥️', cat:'accessories', name:'Monitor 24" Full HD',            desc:'IPS Panel 75Hz HDMI/VGA รับประกัน 3 ปี',            price:3990,  priceLabel:'',               status:'available' },
  { id:'p10',icon:'📡', cat:'accessories', name:'Router WiFi 6 / Mesh',           desc:'ครอบคลุมกว้าง เหมาะบ้านและสำนักงาน',               price:1290,  priceLabel:'฿ 1,290 ขึ้นไป', status:'available' },
];

/* ──────────────────────────────────────────────────────────────
   STORAGE HELPERS
   ────────────────────────────────────────────────────────────── */
const STORAGE_KEY_PRODUCTS = 'tc_products';
const STORAGE_KEY_AUTH     = 'tc_auth';

function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  // First visit – seed defaults
  saveProducts(DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
}

function saveProducts(arr) {
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(arr));
}

function loadAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTH);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  // Default credentials (plain – simple hash for basic protection)
  return { user: 'admin', pass: simpleHash('admin1234') };
}

function saveAuth(user, pass) {
  localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify({ user, pass: simpleHash(pass) }));
}

/** Minimal hash so password isn't stored in plain text */
function simpleHash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return h.toString(16);
}

/* ──────────────────────────────────────────────────────────────
   STATE
   ────────────────────────────────────────────────────────────── */
let products        = loadProducts();
let adminLoggedIn   = false;
let deleteTargetId  = null;

/* ──────────────────────────────────────────────────────────────
   TAB NAVIGATION
   ────────────────────────────────────────────────────────────── */
const tabBtns    = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('.tab-content');

function switchTab(tabId) {
  tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  tabSections.forEach(s => s.classList.toggle('active', s.id === `tab-${tabId}`));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('navTabs').classList.remove('open');
  setHamburgerOpen(false);
  if (tabId === 'shop') renderShop();
}
window.switchTab = switchTab;

tabBtns.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

/* ──────────────────────────────────────────────────────────────
   HAMBURGER
   ────────────────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navTabs   = document.getElementById('navTabs');

hamburger.addEventListener('click', () => {
  const open = navTabs.classList.toggle('open');
  setHamburgerOpen(open);
});

function setHamburgerOpen(open) {
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity   = open ? '0' : '';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
}

document.addEventListener('click', e => {
  if (!e.target.closest('.navbar')) {
    navTabs.classList.remove('open');
    setHamburgerOpen(false);
  }
});

/* ──────────────────────────────────────────────────────────────
   MODAL HELPERS
   ────────────────────────────────────────────────────────────── */
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
window.closeModal = closeModal;

// Close on backdrop click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

/* ──────────────────────────────────────────────────────────────
   ADMIN LOGIN / LOGOUT
   ────────────────────────────────────────────────────────────── */
document.getElementById('adminNavBtn').addEventListener('click', () => {
  if (adminLoggedIn) {
    openModal('adminPanel');
    renderAdminPanel();
  } else {
    openModal('loginModal');
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
    document.getElementById('loginError').textContent = '';
    setTimeout(() => document.getElementById('loginUser').focus(), 100);
  }
});

function doLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const auth = loadAuth();
  if (user === auth.user && simpleHash(pass) === auth.pass) {
    adminLoggedIn = true;
    closeModal('loginModal');
    openModal('adminPanel');
    renderAdminPanel();
    showToast('✅ เข้าสู่ระบบสำเร็จ');
  } else {
    document.getElementById('loginError').textContent = '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
  }
}
window.doLogin = doLogin;

// Enter key on login fields
['loginUser','loginPass'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
  });
});

function doLogout() {
  adminLoggedIn = false;
  closeModal('adminPanel');
  showToast('👋 ออกจากระบบแล้ว');
}
window.doLogout = doLogout;

function togglePw(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (inp.type === 'password') { inp.type = 'text'; btn.textContent = '🙈'; }
  else { inp.type = 'password'; btn.textContent = '👁️'; }
}
window.togglePw = togglePw;

/* ──────────────────────────────────────────────────────────────
   CHANGE PASSWORD
   ────────────────────────────────────────────────────────────── */
function changePassword() {
  const p1 = document.getElementById('newPw1').value;
  const p2 = document.getElementById('newPw2').value;
  const err = document.getElementById('pwError');
  if (!p1 || p1.length < 6) { err.textContent = '❌ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'; return; }
  if (p1 !== p2) { err.textContent = '❌ รหัสผ่านไม่ตรงกัน'; return; }
  const auth = loadAuth();
  saveAuth(auth.user, p1);
  document.getElementById('newPw1').value = '';
  document.getElementById('newPw2').value = '';
  err.textContent = '';
  showToast('🔑 เปลี่ยนรหัสผ่านสำเร็จ', 'success');
}
window.changePassword = changePassword;

/* ──────────────────────────────────────────────────────────────
   ADMIN PANEL RENDER
   ────────────────────────────────────────────────────────────── */
function renderAdminPanel() {
  renderAdminStats();
  renderAdminTable();
}

function renderAdminStats() {
  const total   = products.length;
  const avail   = products.filter(p => p.status === 'available').length;
  const pre     = products.filter(p => p.status === 'preorder').length;
  const sold    = products.filter(p => p.status === 'sold').length;
  document.getElementById('adminStats').innerHTML = `
    <div class="stat-box"><div class="stat-num">${total}</div><div class="stat-label">สินค้าทั้งหมด</div></div>
    <div class="stat-box"><div class="stat-num" style="color:var(--success)">${avail}</div><div class="stat-label">มีสินค้า</div></div>
    <div class="stat-box"><div class="stat-num" style="color:#856404">${pre}</div><div class="stat-label">สั่งจอง</div></div>
    <div class="stat-box"><div class="stat-num" style="color:var(--danger)">${sold}</div><div class="stat-label">สินค้าหมด</div></div>
  `;
}

const CAT_LABELS = { desktop:'🖥️ PC Desktop', notebook:'💻 Notebook', printer:'🖨️ Printer', accessories:'🖱️ Accessories' };
const STATUS_LABELS = { available:'✅ มีสินค้า', preorder:'🕐 สั่งจอง', sold:'❌ หมด' };

function renderAdminTable() {
  const tbody = document.getElementById('adminTableBody');
  if (products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem">ยังไม่มีสินค้า — กด "+ เพิ่มสินค้าใหม่"</td></tr>';
    return;
  }
  tbody.innerHTML = products.map(p => `
    <tr>
      <td class="tbl-icon">${p.icon}</td>
      <td><div class="tbl-name">${escHtml(p.name)}</div><div class="tbl-desc">${escHtml(p.desc)}</div></td>
      <td><span class="cat-pill">${CAT_LABELS[p.cat] || p.cat}</span></td>
      <td style="max-width:180px;font-size:.82rem;color:var(--text-muted)">${escHtml(p.desc)}</td>
      <td class="tbl-price">${p.priceLabel || '฿ ' + p.price.toLocaleString()}</td>
      <td><span class="status-pill ${p.status}">${STATUS_LABELS[p.status] || p.status}</span></td>
      <td class="tbl-actions">
        <button class="btn-edit" onclick="openProductForm('${p.id}')">✏️ แก้ไข</button>
        <button class="btn-del"  onclick="promptDelete('${p.id}')">🗑️ ลบ</button>
      </td>
    </tr>
  `).join('');
}

/* ──────────────────────────────────────────────────────────────
   PRODUCT FORM – ADD / EDIT
   ────────────────────────────────────────────────────────────── */
function openProductForm(id) {
  const err = document.getElementById('productError');
  err.textContent = '';
  if (id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    document.getElementById('productFormTitle').textContent = '✏️ แก้ไขสินค้า';
    document.getElementById('productId').value        = p.id;
    document.getElementById('productIcon').value      = p.icon;
    document.getElementById('productCat').value       = p.cat;
    document.getElementById('productName').value      = p.name;
    document.getElementById('productDesc').value      = p.desc;
    document.getElementById('productPrice').value     = p.price;
    document.getElementById('productPriceLabel').value = p.priceLabel || '';
    document.getElementById('productStatus').value    = p.status;
  } else {
    document.getElementById('productFormTitle').textContent = '➕ เพิ่มสินค้าใหม่';
    document.getElementById('productId').value        = '';
    document.getElementById('productIcon').value      = '🖥️';
    document.getElementById('productCat').value       = 'desktop';
    document.getElementById('productName').value      = '';
    document.getElementById('productDesc').value      = '';
    document.getElementById('productPrice').value     = '';
    document.getElementById('productPriceLabel').value = '';
    document.getElementById('productStatus').value    = 'available';
  }
  openModal('productModal');
  setTimeout(() => document.getElementById('productName').focus(), 100);
}
window.openProductForm = openProductForm;

function setEmoji(e) {
  document.getElementById('productIcon').value = e;
}
window.setEmoji = setEmoji;

function saveProduct() {
  const err   = document.getElementById('productError');
  const id    = document.getElementById('productId').value;
  const icon  = document.getElementById('productIcon').value.trim() || '📦';
  const cat   = document.getElementById('productCat').value;
  const name  = document.getElementById('productName').value.trim();
  const desc  = document.getElementById('productDesc').value.trim();
  const price = parseInt(document.getElementById('productPrice').value, 10);
  const priceLabel = document.getElementById('productPriceLabel').value.trim();
  const status = document.getElementById('productStatus').value;

  if (!name) { err.textContent = '❌ กรุณาใส่ชื่อสินค้า'; return; }
  if (!desc)  { err.textContent = '❌ กรุณาใส่รายละเอียดสินค้า'; return; }
  if (isNaN(price) || price < 0) { err.textContent = '❌ กรุณาใส่ราคาที่ถูกต้อง'; return; }

  if (id) {
    const idx = products.findIndex(p => p.id === id);
    if (idx > -1) products[idx] = { id, icon, cat, name, desc, price, priceLabel, status };
    showToast('✅ แก้ไขสินค้าสำเร็จ', 'success');
  } else {
    const newId = 'p' + Date.now();
    products.push({ id: newId, icon, cat, name, desc, price, priceLabel, status });
    showToast('✅ เพิ่มสินค้าสำเร็จ', 'success');
  }

  saveProducts(products);
  closeModal('productModal');
  renderAdminPanel();
  renderShop(); // refresh shop live
}
window.saveProduct = saveProduct;

/* ──────────────────────────────────────────────────────────────
   DELETE
   ────────────────────────────────────────────────────────────── */
function promptDelete(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  deleteTargetId = id;
  document.getElementById('deleteProductName').textContent = `${p.icon} ${p.name}`;
  openModal('deleteModal');
}
window.promptDelete = promptDelete;

function confirmDelete() {
  if (!deleteTargetId) return;
  products = products.filter(p => p.id !== deleteTargetId);
  saveProducts(products);
  deleteTargetId = null;
  closeModal('deleteModal');
  renderAdminPanel();
  renderShop();
  showToast('🗑️ ลบสินค้าแล้ว', 'danger');
}
window.confirmDelete = confirmDelete;

/* ──────────────────────────────────────────────────────────────
   SHOP RENDER
   ────────────────────────────────────────────────────────────── */
let currentCat = 'all';

document.getElementById('catFilter').addEventListener('click', e => {
  const btn = e.target.closest('.cat-btn');
  if (!btn) return;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentCat = btn.dataset.cat;
  renderShop();
});

function renderShop() {
  const grid = document.getElementById('productGrid');
  const filtered = currentCat === 'all' ? products : products.filter(p => p.cat === currentCat);

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-shop" style="grid-column:1/-1">
      <div class="empty-icon">📦</div>
      <p>ยังไม่มีสินค้าในหมวดนี้</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const priceText = p.priceLabel || '฿ ' + p.price.toLocaleString();
    const disabled  = p.status === 'sold' ? 'disabled' : '';
    const btnText   = p.status === 'sold' ? '❌ สินค้าหมด' : p.status === 'preorder' ? '🕐 สั่งจอง' : '🛒 สอบถาม';
    return `
      <div class="product-card" data-cat="${p.cat}" data-id="${p.id}">
        <div class="prod-badge">${CAT_LABELS[p.cat] || p.cat}</div>
        <div class="prod-status-badge ${p.status}">${STATUS_LABELS[p.status]}</div>
        <div class="prod-img">${p.icon}</div>
        <div class="prod-info">
          <h4>${escHtml(p.name)}</h4>
          <p>${escHtml(p.desc)}</p>
          <div class="prod-price">${escHtml(priceText)}</div>
          <button class="btn-cart" ${disabled} onclick="inquireProduct('${p.id}')">${btnText}</button>
        </div>
      </div>`;
  }).join('');
}

function inquireProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  showToast(`📩 สนใจ "${p.name}" — กำลังเปิด Line…`);
  // window.open('https://line.me/ti/p/@tachalom', '_blank');
}
window.inquireProduct = inquireProduct;

/* ──────────────────────────────────────────────────────────────
   TOAST
   ────────────────────────────────────────────────────────────── */
function showToast(msg, type) {
  const t = document.createElement('div');
  t.className = 'toast' + (type ? ' ' + type : '');
  t.textContent = msg;
  const container = document.getElementById('toastContainer');
  container.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

/* ──────────────────────────────────────────────────────────────
   UTILS
   ────────────────────────────────────────────────────────────── */
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ──────────────────────────────────────────────────────────────
   STICKY NAV SHADOW
   ────────────────────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,.35)' : '0 2px 12px rgba(0,0,0,.25)';
});

/* ──────────────────────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────────────────────── */
renderShop();

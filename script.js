/* ============================================================
   TA-CHALOM COMPUTER – script.js  (v3 – Images, Videos, Full CRUD)
   Storage keys:
     tc_products   – array of product objects
     tc_repair     – array of repair service items
     tc_network    – array of network service items
     tc_software   – array of software service items
     tc_auth       – hashed credentials
     tc_media      – logo, galleries (base64), video URLs
   ============================================================ */

/* ──────────────────────────────────────────────────────────────
   DEFAULT DATA
   ────────────────────────────────────────────────────────────── */
const DEFAULT_PRODUCTS = [
  { id:'p1', icon:'🖥️', image:'', cat:'desktop',     name:'PC Desktop Intel Core i5',      desc:'RAM 8GB / SSD 256GB / พร้อมใช้งาน',                  price:12900, priceLabel:'',               status:'available' },
  { id:'p2', icon:'🖥️', image:'', cat:'desktop',     name:'PC Desktop AMD Ryzen 5',         desc:'RAM 16GB / SSD 512GB / RTX 3050',                    price:22500, priceLabel:'',               status:'available' },
  { id:'p3', icon:'💻', image:'', cat:'notebook',    name:'Notebook Lenovo IdeaPad',        desc:'Core i5 / RAM 8GB / SSD 512GB / 15.6"',              price:16900, priceLabel:'',               status:'available' },
  { id:'p4', icon:'💻', image:'', cat:'notebook',    name:'Notebook Asus VivoBook',         desc:'Ryzen 5 / RAM 16GB / SSD 512GB / 14"',               price:19500, priceLabel:'',               status:'available' },
  { id:'p5', icon:'🖨️', image:'', cat:'printer',     name:'Epson L3250 Wi-Fi',              desc:'พิมพ์ / สแกน / ถ่ายเอกสาร / หมึกแท้ Epson',         price:5490,  priceLabel:'',               status:'available' },
  { id:'p6', icon:'🖨️', image:'', cat:'printer',     name:'Canon PIXMA G2020',              desc:'พิมพ์ / สแกน / ถ่ายเอกสาร / Ink Tank',              price:4290,  priceLabel:'',               status:'available' },
  { id:'p7', icon:'⌨️', image:'', cat:'accessories', name:'ชุดคีย์บอร์ด + เมาส์ Wireless', desc:'ไร้สาย USB Nano Receiver ใช้ได้ทั้ง PC / Notebook', price:490,   priceLabel:'',               status:'available' },
  { id:'p8', icon:'💾', image:'', cat:'accessories', name:'SSD 256GB / 512GB / 1TB',        desc:'Kingston / WD / Samsung พร้อมบริการติดตั้ง',         price:790,   priceLabel:'฿ 790 ขึ้นไป',   status:'available' },
  { id:'p9', icon:'🖥️', image:'', cat:'accessories', name:'Monitor 24" Full HD',            desc:'IPS Panel 75Hz HDMI/VGA รับประกัน 3 ปี',            price:3990,  priceLabel:'',               status:'available' },
  { id:'p10',icon:'📡', image:'', cat:'accessories', name:'Router WiFi 6 / Mesh',           desc:'ครอบคลุมกว้าง เหมาะบ้านและสำนักงาน',               price:1290,  priceLabel:'฿ 1,290 ขึ้นไป', status:'available' },
];

const DEFAULT_REPAIR = [
  { id:'r1', icon:'🖥️', image:'', title:'ซ่อมคอม / โน้ตบุ๊ก ทุกอาการ',       desc:'เปิดไม่ติด จอดับ ร้อนผิดปกติ บลูสกรีน จัดการได้ทุกเคส' },
  { id:'r2', icon:'🖨️', image:'', title:'ซ่อม Printer จบทุกปัญหา',            desc:'ดึงกระดาษไม่ขึ้น หมึกไม่ออก ตลับหมึกเสีย เปลี่ยนอะไหล่ทุกยี่ห้อ' },
  { id:'r3', icon:'🔧', image:'', title:'เครื่องเปิดไม่ติด / ใช้งานไม่ได้',   desc:'วินิจฉัยตรงจุด แก้ได้จริง ทั้งฮาร์ดแวร์และซอฟต์แวร์' },
  { id:'r4', icon:'💾', image:'', title:'อัปเกรด SSD เพิ่มสปีดแรงทันใจ',      desc:'เปลี่ยน HDD → SSD บูตเร็วขึ้นหลายเท่า รับประกันการย้ายข้อมูล' },
  { id:'r5', icon:'🏠', image:'', title:'บริการรับ-ส่งถึงหน้าบ้าน',           desc:'สะดวกสุด ๆ ไม่ต้องเสียเวลาเดินทาง ครอบคลุมพื้นที่ท่าฉลอม – สมุทรสาคร' },
];

const DEFAULT_NETWORK = [
  { id:'n1', icon:'🏗️', image:'', title:'วางระบบ Network / เดินสาย LAN',   desc:'ทั้งบ้านและร้าน ออกแบบโครงสร้างเน็ตเวิร์กให้เหมาะสม รองรับการขยายในอนาคต' },
  { id:'n2', icon:'📶', image:'', title:'ติดตั้ง WiFi ให้แรง',              desc:'เลือกอุปกรณ์และจุดติดตั้งที่เหมาะสม ครอบคลุมทุกมุมบ้านหรือร้านค้า ไม่มีจุดอับสัญญาณ' },
  { id:'n3', icon:'🛠️', image:'', title:'แก้ปัญหาเน็ตช้า / เน็ตหลุด',     desc:'วิเคราะห์ปัญหาตรงจุด ไม่ว่าจะเป็นอุปกรณ์ การตั้งค่า หรือสัญญาณรบกวน แก้ได้ครบ' },
];

const DEFAULT_SOFTWARE = [
  { id:'s1', icon:'📦', image:'', title:'ระบบสต๊อกสินค้า',              desc:'จัดการคลังสินค้า รับ-จ่าย สต็อก รายงานสรุป ใช้งานง่ายเหมาะทุกธุรกิจ' },
  { id:'s2', icon:'🗂️', image:'', title:'ระบบจัดการงาน / ระบบภายในองค์กร', desc:'HR บันทึกเวลา ติดตามงาน อนุมัติเอกสาร ปรับแต่งตามโครงสร้างองค์กร' },
  { id:'s3', icon:'🌐', image:'', title:'Web Application',              desc:'ออกแบบและพัฒนาเว็บไซต์และแอปพลิเคชันตามความต้องการของธุรกิจ ครบจบที่เดียว' },
];

/* ──────────────────────────────────────────────────────────────
   STORAGE HELPERS
   ────────────────────────────────────────────────────────────── */
const KEYS = {
  products: 'tc_products',
  repair:   'tc_repair',
  network:  'tc_network',
  software: 'tc_software',
  auth:     'tc_auth',
  media:    'tc_media',
};

function lsGet(key) {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; } catch(e) { return null; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { showToast('⚠️ Storage เต็ม – ลดขนาดรูปภาพ', 'danger'); }
}

function loadList(key, defaults) {
  const d = lsGet(key);
  if (d) return d;
  lsSet(key, defaults);
  return defaults;
}

function loadAuth() {
  return lsGet(KEYS.auth) || { user: 'admin', pass: simpleHash('admin1234') };
}
function saveAuth(user, pass) { lsSet(KEYS.auth, { user, pass: simpleHash(pass) }); }

function loadMedia() {
  return lsGet(KEYS.media) || { logo:'', galleries:{ home:[], repair:[], network:[], software:[] }, videos:{ home:'', repair:'', network:'', software:'' } };
}
function saveMedia(m) { lsSet(KEYS.media, m); }

function simpleHash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 0x01000193) >>> 0; }
  return h.toString(16);
}

/* ──────────────────────────────────────────────────────────────
   STATE
   ────────────────────────────────────────────────────────────── */
let products       = loadList(KEYS.products, DEFAULT_PRODUCTS);
let repairItems    = loadList(KEYS.repair,   DEFAULT_REPAIR);
let networkItems   = loadList(KEYS.network,  DEFAULT_NETWORK);
let softwareItems  = loadList(KEYS.software, DEFAULT_SOFTWARE);
let adminLoggedIn  = false;
let deleteTargetId = null;
let deleteTargetType = null;
let currentAdminSection = 'products';
let pendingProductImage = '';
let pendingServiceImage = '';

/* ──────────────────────────────────────────────────────────────
   TAB NAVIGATION
   ────────────────────────────────────────────────────────────── */
const tabBtns     = document.querySelectorAll('.tab-btn');
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
hamburger.addEventListener('click', () => { const open = navTabs.classList.toggle('open'); setHamburgerOpen(open); });
function setHamburgerOpen(open) {
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity   = open ? '0' : '';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
}
document.addEventListener('click', e => {
  if (!e.target.closest('.navbar')) { navTabs.classList.remove('open'); setHamburgerOpen(false); }
});

/* ──────────────────────────────────────────────────────────────
   MODAL HELPERS
   ────────────────────────────────────────────────────────────── */
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
window.closeModal = closeModal;
document.querySelectorAll('.modal-overlay').forEach(ov => {
  ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
});

/* ──────────────────────────────────────────────────────────────
   ADMIN LOGIN / LOGOUT
   ────────────────────────────────────────────────────────────── */
document.getElementById('adminNavBtn').addEventListener('click', () => {
  if (adminLoggedIn) { openModal('adminPanel'); renderAdminPanel(); }
  else {
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
['loginUser','loginPass'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
});

function doLogout() { adminLoggedIn = false; closeModal('adminPanel'); showToast('👋 ออกจากระบบแล้ว'); }
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
   ADMIN PANEL – SUB-TABS
   ────────────────────────────────────────────────────────────── */
function switchAdminSection(section) {
  currentAdminSection = section;
  document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.section === section));
  document.querySelectorAll('.admin-section').forEach(s => s.classList.toggle('active', s.id === `admin-${section}`));
  const titles = { products:'จัดการสินค้า', repair:'จัดการงานซ่อม', network:'จัดการบริการเครือข่าย', software:'จัดการบริการโปรแกรม', media:'จัดการรูปภาพ & วิดีโอ' };
  document.getElementById('adminPanelTitle').textContent = titles[section] || '';
  if (section === 'repair')   renderServiceTable('repair');
  if (section === 'network')  renderServiceTable('network');
  if (section === 'software') renderServiceTable('software');
  if (section === 'media')    renderMediaAdmin();
}
window.switchAdminSection = switchAdminSection;

function renderAdminPanel() {
  renderAdminStats();
  renderAdminTable();
  renderServiceTable('repair');
  renderServiceTable('network');
  renderServiceTable('software');
  renderMediaAdmin();
}

/* ──────────────────────────────────────────────────────────────
   PRODUCT ADMIN
   ────────────────────────────────────────────────────────────── */
const CAT_LABELS    = { desktop:'🖥️ PC Desktop', notebook:'💻 Notebook', printer:'🖨️ Printer', accessories:'🖱️ Accessories' };
const STATUS_LABELS = { available:'✅ มีสินค้า', preorder:'🕐 สั่งจอง', sold:'❌ หมด' };

function renderAdminStats() {
  const total = products.length;
  const avail = products.filter(p => p.status === 'available').length;
  const pre   = products.filter(p => p.status === 'preorder').length;
  const sold  = products.filter(p => p.status === 'sold').length;
  document.getElementById('adminStats').innerHTML = `
    <div class="stat-box"><div class="stat-num">${total}</div><div class="stat-label">สินค้าทั้งหมด</div></div>
    <div class="stat-box"><div class="stat-num" style="color:var(--success)">${avail}</div><div class="stat-label">มีสินค้า</div></div>
    <div class="stat-box"><div class="stat-num" style="color:#856404">${pre}</div><div class="stat-label">สั่งจอง</div></div>
    <div class="stat-box"><div class="stat-num" style="color:var(--danger)">${sold}</div><div class="stat-label">สินค้าหมด</div></div>
  `;
}

function renderAdminTable() {
  const tbody = document.getElementById('adminTableBody');
  if (products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem">ยังไม่มีสินค้า</td></tr>';
    return;
  }
  tbody.innerHTML = products.map(p => `
    <tr>
      <td class="tbl-icon">${p.image ? `<img src="${p.image}" class="tbl-thumb" onclick="openLightbox('${p.image}')" />` : p.icon}</td>
      <td><div class="tbl-name">${escHtml(p.name)}</div><div class="tbl-desc">${escHtml(p.desc)}</div></td>
      <td><span class="cat-pill">${CAT_LABELS[p.cat] || p.cat}</span></td>
      <td style="max-width:180px;font-size:.82rem;color:var(--text-muted)">${escHtml(p.desc)}</td>
      <td class="tbl-price">${p.priceLabel || '฿ ' + p.price.toLocaleString()}</td>
      <td><span class="status-pill ${p.status}">${STATUS_LABELS[p.status] || p.status}</span></td>
      <td class="tbl-actions">
        <button class="btn-edit" onclick="openProductForm('${p.id}')">✏️ แก้ไข</button>
        <button class="btn-del"  onclick="promptDelete('product','${p.id}',\`${escHtml(p.name)}\`)">🗑️ ลบ</button>
      </td>
    </tr>
  `).join('');
}

/* ──────────────────────────────────────────────────────────────
   PRODUCT FORM
   ────────────────────────────────────────────────────────────── */
function openProductForm(id) {
  document.getElementById('productError').textContent = '';
  pendingProductImage = '';
  const thumb = document.getElementById('prodImgThumb');
  const placeholder = document.getElementById('prodImgPlaceholder');
  thumb.style.display = 'none'; placeholder.style.display = 'block';
  document.getElementById('productImageFile').value = '';

  if (id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    document.getElementById('productFormTitle').textContent = '✏️ แก้ไขสินค้า';
    document.getElementById('productId').value         = p.id;
    document.getElementById('productIcon').value       = p.icon;
    document.getElementById('productCat').value        = p.cat;
    document.getElementById('productName').value       = p.name;
    document.getElementById('productDesc').value       = p.desc;
    document.getElementById('productPrice').value      = p.price;
    document.getElementById('productPriceLabel').value = p.priceLabel || '';
    document.getElementById('productStatus').value     = p.status;
    if (p.image) { thumb.src = p.image; thumb.style.display = 'block'; placeholder.style.display = 'none'; pendingProductImage = p.image; }
  } else {
    document.getElementById('productFormTitle').textContent = '➕ เพิ่มสินค้าใหม่';
    ['productId','productName','productDesc','productPriceLabel'].forEach(i => document.getElementById(i).value = '');
    document.getElementById('productIcon').value   = '🖥️';
    document.getElementById('productCat').value    = 'desktop';
    document.getElementById('productPrice').value  = '';
    document.getElementById('productStatus').value = 'available';
  }
  openModal('productModal');
  setTimeout(() => document.getElementById('productName').focus(), 100);
}
window.openProductForm = openProductForm;

function previewProductImage(input) {
  const file = input.files[0]; if (!file) return;
  compressImage(file, 800, 0.75, base64 => {
    pendingProductImage = base64;
    const thumb = document.getElementById('prodImgThumb');
    const placeholder = document.getElementById('prodImgPlaceholder');
    thumb.src = base64; thumb.style.display = 'block'; placeholder.style.display = 'none';
  });
}
window.previewProductImage = previewProductImage;

function clearProductImage() {
  pendingProductImage = '';
  document.getElementById('prodImgThumb').style.display = 'none';
  document.getElementById('prodImgPlaceholder').style.display = 'block';
  document.getElementById('productImageFile').value = '';
}
window.clearProductImage = clearProductImage;

function setEmoji(e) { document.getElementById('productIcon').value = e; }
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
  if (!desc)  { err.textContent = '❌ กรุณาใส่รายละเอียด'; return; }
  if (isNaN(price) || price < 0) { err.textContent = '❌ กรุณาใส่ราคาที่ถูกต้อง'; return; }

  const obj = { id: id || 'p' + Date.now(), icon, image: pendingProductImage, cat, name, desc, price, priceLabel, status };
  if (id) {
    const idx = products.findIndex(p => p.id === id);
    if (idx > -1) products[idx] = obj;
    showToast('✅ แก้ไขสินค้าสำเร็จ – กำลังรีเฟรช…', 'success');
  } else {
    products.push(obj);
    showToast('✅ เพิ่มสินค้าสำเร็จ – กำลังรีเฟรช…', 'success');
  }
  lsSet(KEYS.products, products);
  closeModal('productModal');
  renderAdminPanel();
  renderShop();
  setTimeout(() => window.location.reload(), 900);
}
window.saveProduct = saveProduct;

/* ──────────────────────────────────────────────────────────────
   SERVICE CRUD (repair / network / software)
   ────────────────────────────────────────────────────────────── */
function getServiceList(type) {
  if (type === 'repair')   return repairItems;
  if (type === 'network')  return networkItems;
  if (type === 'software') return softwareItems;
  return [];
}
function setServiceList(type, arr) {
  if (type === 'repair')   { repairItems   = arr; lsSet(KEYS.repair,   arr); }
  if (type === 'network')  { networkItems  = arr; lsSet(KEYS.network,  arr); }
  if (type === 'software') { softwareItems = arr; lsSet(KEYS.software, arr); }
}

function renderServiceTable(type) {
  const tbody = document.getElementById(`${type}TableBody`);
  if (!tbody) return;
  const list = getServiceList(type);
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:2rem">ยังไม่มีรายการ</td></tr>`;
    return;
  }
  tbody.innerHTML = list.map((item, idx) => `
    <tr>
      <td class="tbl-icon">${item.image ? `<img src="${item.image}" class="tbl-thumb" onclick="openLightbox('${item.image}')" />` : item.icon}</td>
      <td><div class="tbl-name">${escHtml(item.title)}</div></td>
      <td style="color:var(--text-muted);font-size:.88rem;max-width:240px">${escHtml(item.desc)}</td>
      <td class="tbl-actions">
        <button class="btn-edit" onclick="openServiceForm('${type}','${item.id}')">✏️ แก้ไข</button>
        <button class="btn-del"  onclick="promptDelete('${type}','${item.id}',\`${escHtml(item.title)}\`)">🗑️ ลบ</button>
      </td>
    </tr>
  `).join('');
}

function openServiceForm(type, id) {
  document.getElementById('serviceError').textContent = '';
  document.getElementById('serviceType').value = type;
  pendingServiceImage = '';
  const thumb = document.getElementById('svcImgThumb');
  const placeholder = document.getElementById('svcImgPlaceholder');
  thumb.style.display = 'none'; placeholder.style.display = 'block';
  document.getElementById('serviceImageFile').value = '';

  const typeLabels = { repair:'งานซ่อม', network:'บริการเครือข่าย', software:'บริการโปรแกรม' };

  if (id) {
    const item = getServiceList(type).find(x => x.id === id);
    if (!item) return;
    document.getElementById('serviceFormTitle').textContent = `✏️ แก้ไข${typeLabels[type]}`;
    document.getElementById('serviceId').value    = item.id;
    document.getElementById('serviceIcon').value  = item.icon;
    document.getElementById('serviceTitle').value = item.title;
    document.getElementById('serviceDesc').value  = item.desc;
    if (item.image) { thumb.src = item.image; thumb.style.display = 'block'; placeholder.style.display = 'none'; pendingServiceImage = item.image; }
  } else {
    document.getElementById('serviceFormTitle').textContent = `➕ เพิ่ม${typeLabels[type]}`;
    document.getElementById('serviceId').value    = '';
    document.getElementById('serviceIcon').value  = type === 'repair' ? '🔧' : type === 'network' ? '📡' : '💻';
    document.getElementById('serviceTitle').value = '';
    document.getElementById('serviceDesc').value  = '';
  }
  openModal('serviceModal');
  setTimeout(() => document.getElementById('serviceTitle').focus(), 100);
}
window.openServiceForm = openServiceForm;

function previewServiceImage(input) {
  const file = input.files[0]; if (!file) return;
  compressImage(file, 800, 0.75, base64 => {
    pendingServiceImage = base64;
    const thumb = document.getElementById('svcImgThumb');
    const placeholder = document.getElementById('svcImgPlaceholder');
    thumb.src = base64; thumb.style.display = 'block'; placeholder.style.display = 'none';
  });
}
window.previewServiceImage = previewServiceImage;

function clearServiceImage() {
  pendingServiceImage = '';
  document.getElementById('svcImgThumb').style.display = 'none';
  document.getElementById('svcImgPlaceholder').style.display = 'block';
  document.getElementById('serviceImageFile').value = '';
}
window.clearServiceImage = clearServiceImage;

function setSvcEmoji(e) { document.getElementById('serviceIcon').value = e; }
window.setSvcEmoji = setSvcEmoji;

function saveService() {
  const err   = document.getElementById('serviceError');
  const type  = document.getElementById('serviceType').value;
  const id    = document.getElementById('serviceId').value;
  const icon  = document.getElementById('serviceIcon').value.trim() || '🔧';
  const title = document.getElementById('serviceTitle').value.trim();
  const desc  = document.getElementById('serviceDesc').value.trim();

  if (!title) { err.textContent = '❌ กรุณาใส่หัวข้อ'; return; }
  if (!desc)  { err.textContent = '❌ กรุณาใส่รายละเอียด'; return; }

  const obj = { id: id || type[0] + Date.now(), icon, image: pendingServiceImage, title, desc };
  let list = getServiceList(type);
  if (id) {
    const idx = list.findIndex(x => x.id === id);
    if (idx > -1) list[idx] = obj;
    showToast('✅ แก้ไขสำเร็จ – กำลังรีเฟรช…', 'success');
  } else {
    list.push(obj);
    showToast('✅ เพิ่มรายการสำเร็จ – กำลังรีเฟรช…', 'success');
  }
  setServiceList(type, list);
  closeModal('serviceModal');
  renderServiceTable(type);
  renderServiceContent();
  setTimeout(() => window.location.reload(), 900);
}
window.saveService = saveService;

/* ──────────────────────────────────────────────────────────────
   DELETE (products + services)
   ────────────────────────────────────────────────────────────── */
function promptDelete(type, id, name) {
  deleteTargetType = type;
  deleteTargetId   = id;
  document.getElementById('deleteProductName').textContent = name;
  openModal('deleteModal');
}
window.promptDelete = promptDelete;

function confirmDelete() {
  if (!deleteTargetId) return;
  if (deleteTargetType === 'product') {
    products = products.filter(p => p.id !== deleteTargetId);
    lsSet(KEYS.products, products);
    renderAdminTable();
    renderAdminStats();
    renderShop();
  } else {
    let list = getServiceList(deleteTargetType).filter(x => x.id !== deleteTargetId);
    setServiceList(deleteTargetType, list);
    renderServiceTable(deleteTargetType);
    renderServiceContent();
  }
  deleteTargetId = null; deleteTargetType = null;
  closeModal('deleteModal');
  showToast('🗑️ ลบสำเร็จ – กำลังรีเฟรช…', 'danger');
  setTimeout(() => window.location.reload(), 900);
}
window.confirmDelete = confirmDelete;

/* ──────────────────────────────────────────────────────────────
   RENDER SERVICE CONTENT (public pages)
   ────────────────────────────────────────────────────────────── */
function renderServiceContent() {
  // Repair
  const repairList = document.getElementById('repairServiceList');
  if (repairList) {
    repairList.innerHTML = repairItems.map((item, i) => `
      <div class="svc-item">
        ${item.image ? `<img src="${item.image}" class="svc-img" onclick="openLightbox('${item.image}')" />` : `<div class="svc-num">0${i+1}</div>`}
        <div class="svc-detail"><h4>${escHtml(item.title)}</h4><p>${escHtml(item.desc)}</p></div>
      </div>
    `).join('');
  }

  // Network
  const netList = document.getElementById('networkCardList');
  if (netList) {
    netList.innerHTML = networkItems.map(item => `
      <div class="net-card">
        ${item.image ? `<img src="${item.image}" class="card-img" onclick="openLightbox('${item.image}')" />` : `<div class="net-icon">${item.icon}</div>`}
        <h4>${escHtml(item.title)}</h4>
        <p>${escHtml(item.desc)}</p>
      </div>
    `).join('');
  }

  // Software
  const softList = document.getElementById('softwareCardList');
  if (softList) {
    softList.innerHTML = softwareItems.map(item => `
      <div class="soft-card">
        ${item.image ? `<img src="${item.image}" class="card-img" onclick="openLightbox('${item.image}')" />` : `<div class="soft-icon">${item.icon}</div>`}
        <h4>${escHtml(item.title)}</h4>
        <p>${escHtml(item.desc)}</p>
      </div>
    `).join('');
  }

  // Latest case (home tab – show first repair item)
  const latestWrap = document.getElementById('latestCasesWrap');
  if (latestWrap && repairItems.length > 0) {
    const item = repairItems[0];
    latestWrap.innerHTML = `
      <div class="case-card">
        ${item.image ? `<img src="${item.image}" class="case-thumb" onclick="openLightbox('${item.image}')" />` : `<div class="case-icon">${item.icon}</div>`}
        <div class="case-body">
          <h3>${escHtml(item.title)}</h3>
          <p>${escHtml(item.desc)}</p>
          <span class="case-status done">✔ ให้บริการแล้ว</span>
        </div>
      </div>`;
  }
}

/* ──────────────────────────────────────────────────────────────
   MEDIA ADMIN (Logo, Galleries, Videos)
   ────────────────────────────────────────────────────────────── */
function renderMediaAdmin() {
  const media = loadMedia();

  // Logo preview
  if (media.logo) {
    document.getElementById('previewLogo').src = media.logo;
    applyLogo(media.logo);
  }

  // Video URL inputs
  ['home','repair','network','software'].forEach(k => {
    const el = document.getElementById('video' + k.charAt(0).toUpperCase() + k.slice(1));
    if (el) el.value = media.videos[k] || '';
  });

  // Mini galleries in admin
  ['home','repair','network','software'].forEach(k => {
    const el = document.getElementById(`admin${k.charAt(0).toUpperCase() + k.slice(1)}Gallery`);
    if (!el) return;
    const imgs = media.galleries[k] || [];
    el.innerHTML = imgs.map((src, i) => `
      <div class="mini-img-wrap">
        <img src="${src}" onclick="openLightbox('${src}')" />
        <button class="mini-del" onclick="deleteGalleryImg('${k}',${i})">✕</button>
      </div>
    `).join('') || '<p style="color:var(--text-muted);font-size:.85rem">ยังไม่มีรูป</p>';
  });
}

function uploadMedia(type, input) {
  const file = input.files[0]; if (!file) return;
  compressImage(file, 800, 0.8, base64 => {
    const media = loadMedia();
    if (type === 'logo') {
      media.logo = base64;
      document.getElementById('previewLogo').src = base64;
      applyLogo(base64);
    }
    saveMedia(media);
    showToast('✅ อัปโหลดสำเร็จ – กำลังรีเฟรช…', 'success');
    input.value = '';
    setTimeout(() => window.location.reload(), 900);
  });
}
window.uploadMedia = uploadMedia;

function applyLogo(src) {
  ['navLogo','heroLogo','footerLogo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.src = src;
  });
  document.querySelectorAll('.modal-logo').forEach(el => el.src = src);
}

function uploadGallery(galleryKey, input) {
  const files = Array.from(input.files); if (!files.length) return;
  const media = loadMedia();
  let done = 0;
  files.forEach(file => {
    compressImage(file, 1000, 0.75, base64 => {
      media.galleries[galleryKey].push(base64);
      done++;
      if (done === files.length) {
        saveMedia(media);
        renderMediaAdmin();
        renderGalleries();
        showToast(`✅ เพิ่มรูป ${files.length} ภาพสำเร็จ – กำลังรีเฟรช…`, 'success');
        input.value = '';
        setTimeout(() => window.location.reload(), 900);
      }
    });
  });
}
window.uploadGallery = uploadGallery;

function deleteGalleryImg(galleryKey, index) {
  const media = loadMedia();
  media.galleries[galleryKey].splice(index, 1);
  saveMedia(media);
  renderMediaAdmin();
  renderGalleries();
  showToast('🗑️ ลบรูปแล้ว – กำลังรีเฟรช…');
  setTimeout(() => window.location.reload(), 900);
}
window.deleteGalleryImg = deleteGalleryImg;

function saveVideoUrl(key) {
  const inputId = 'video' + key.charAt(0).toUpperCase() + key.slice(1);
  const url = document.getElementById(inputId).value.trim();
  const media = loadMedia();
  media.videos[key] = url;
  saveMedia(media);
  renderVideos();
  showToast('✅ บันทึก URL วิดีโอแล้ว – กำลังรีเฟรช…', 'success');
  setTimeout(() => window.location.reload(), 900);
}
window.saveVideoUrl = saveVideoUrl;

function extractYouTubeId(url) {
  if (!url) return '';
  // Handle youtu.be, watch?v=, embed/
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&\n]+)/);
  return m ? m[1] : url; // fallback: assume raw id
}

function renderVideos() {
  const media = loadMedia();
  ['home','repair','network','software'].forEach(k => {
    const vid = media.videos[k];
    const wrapId   = `${k}VideoWrap`;
    const sectionId = `${k}VideoSection`;
    const wrap    = document.getElementById(wrapId);
    const section = document.getElementById(sectionId);
    if (!wrap || !section) return;
    if (vid) {
      const id = extractYouTubeId(vid);
      wrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}" allowfullscreen title="วิดีโอ"></iframe>`;
      section.style.display = '';
    } else {
      wrap.innerHTML = '';
      section.style.display = 'none';
    }
  });
}

function renderGalleries() {
  const media = loadMedia();
  ['home','repair','network','software'].forEach(k => {
    const gallId    = `${k}Gallery`;
    const sectionId = `${k}GallerySection`;
    const el      = document.getElementById(gallId);
    const section = document.getElementById(sectionId);
    if (!el || !section) return;
    const imgs = media.galleries[k] || [];
    if (imgs.length > 0) {
      el.innerHTML = imgs.map(src => `
        <div class="gallery-img-wrap">
          <img src="${src}" alt="gallery" onclick="openLightbox('${src}')" loading="lazy" />
        </div>
      `).join('');
      section.style.display = '';
    } else {
      el.innerHTML = '';
      section.style.display = 'none';
    }
  });
}

/* ──────────────────────────────────────────────────────────────
   SHOP RENDER
   ────────────────────────────────────────────────────────────── */
let currentCat = 'all';

document.getElementById('catFilter').addEventListener('click', e => {
  const btn = e.target.closest('.cat-btn'); if (!btn) return;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentCat = btn.dataset.cat;
  renderShop();
});

function renderShop() {
  const grid = document.getElementById('productGrid');
  const filtered = currentCat === 'all' ? products : products.filter(p => p.cat === currentCat);
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-shop" style="grid-column:1/-1"><div class="empty-icon">📦</div><p>ยังไม่มีสินค้าในหมวดนี้</p></div>`;
    return;
  }
  grid.innerHTML = filtered.map(p => {
    const priceText = p.priceLabel || '฿ ' + p.price.toLocaleString();
    const disabled  = p.status === 'sold' ? 'disabled' : '';
    const btnText   = p.status === 'sold' ? '❌ สินค้าหมด' : p.status === 'preorder' ? '🕐 สั่งจอง' : '🛒 สอบถาม';
    const imgHtml   = p.image
      ? `<div class="prod-img has-photo"><img src="${p.image}" alt="${escHtml(p.name)}" onclick="openLightbox('${p.image}')" /></div>`
      : `<div class="prod-img">${p.icon}</div>`;
    return `
      <div class="product-card" data-cat="${p.cat}">
        <div class="prod-badge">${CAT_LABELS[p.cat] || p.cat}</div>
        <div class="prod-status-badge ${p.status}">${STATUS_LABELS[p.status]}</div>
        ${imgHtml}
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
  const p = products.find(x => x.id === id); if (!p) return;
  showToast(`📩 สนใจ "${p.name}" — กำลังเปิด Line…`);
  // window.open('https://line.me/ti/p/@tachalom', '_blank');
}
window.inquireProduct = inquireProduct;

/* ──────────────────────────────────────────────────────────────
   LIGHTBOX
   ────────────────────────────────────────────────────────────── */
function openLightbox(src) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

/* ──────────────────────────────────────────────────────────────
   IMAGE COMPRESSION HELPER
   ────────────────────────────────────────────────────────────── */
function compressImage(file, maxSize, quality, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      let w = img.width, h = img.height;
      if (w > maxSize || h > maxSize) {
        if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
        else       { w = Math.round(w * maxSize / h); h = maxSize; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

/* ──────────────────────────────────────────────────────────────
   TOAST
   ────────────────────────────────────────────────────────────── */
function showToast(msg, type) {
  const t = document.createElement('div');
  t.className = 'toast' + (type ? ' ' + type : '');
  t.textContent = msg;
  document.getElementById('toastContainer').appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

/* ──────────────────────────────────────────────────────────────
   UTILS
   ────────────────────────────────────────────────────────────── */
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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
(function init() {
  // Apply saved logo
  const media = loadMedia();
  if (media.logo) applyLogo(media.logo);

  renderShop();
  renderServiceContent();
  renderVideos();
  renderGalleries();
})();

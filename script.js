/* =========================================================
   MODRN — Mobile-first shopping experience
   Vanilla JS. No frameworks. Handles data rendering,
   scroll reveals, bottom sheets, cart, search, carousels.
   ========================================================= */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const inr = (n) => "₹" + n.toLocaleString("en-IN");

/* ---------------- Inline icons ---------------- */
const ICON = {
  heart: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  star: '<svg width="15" height="15" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  bag: '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  ig: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
};

/* ---------------- Data ---------------- */
const products = [
  { id: "burn-fuel", name: "Built To Burn Fuel", tagline: "Engineered for the open road.", gsm: 240, price: 699, compareAt: 1099, primary: "https://modrn.in/cdn/shop/files/burn_fuel.png?v=1777025982&width=1200", secondary: "https://modrn.in/cdn/shop/files/ChatGPT_Image_Apr_25_2026_04_56_51_PM.png?v=1777270697&width=1200", badge: "Best Seller" },
  { id: "unstoppable", name: "Unstoppable", tagline: "Move with purpose.", gsm: 220, price: 599, compareAt: 1099, primary: "https://modrn.in/cdn/shop/files/2_e2b912cb-7af2-42fc-9510-41022a9fd1f6.png?v=1777469735&width=1200", secondary: "https://modrn.in/cdn/shop/files/4_4335efd0-12f2-43d0-9bf3-98fcaf89717a.png?v=1777469223&width=1200" },
  { id: "focus", name: "Focus", tagline: "Minimal cut. Maximum signal.", gsm: 220, price: 599, compareAt: 1099, primary: "https://modrn.in/cdn/shop/files/focus.png?v=1777025982&width=1200", secondary: "https://modrn.in/cdn/shop/files/2_8040f6d9-342d-4f28-a3b2-ab1c7b46348f.png?v=1777466034&width=1200", badge: "New" },
  { id: "less-wheels", name: "Less Wheels More Fun", tagline: "Two wheels, one mood.", gsm: 240, price: 699, compareAt: 1099, primary: "https://modrn.in/cdn/shop/files/LessWheels_1_blk.png?v=1777291909&width=1200", secondary: "https://modrn.in/cdn/shop/files/lessWheels_2.png?v=1777291909&width=1200" },
  { id: "who-needs-roads", name: "Who Needs Roads", tagline: "Where we're going we don't need them.", gsm: 240, price: 699, compareAt: 1099, primary: "https://modrn.in/cdn/shop/files/WhoNeedRoads_1.png?v=1777282143&width=1200", secondary: "https://modrn.in/cdn/shop/files/WhoNeedRoads_5.png?v=1777287114&width=1200", badge: "Limited" },
  { id: "built-from-struggle", name: "Built From Struggle", tagline: "Forged, not found.", gsm: 220, price: 599, compareAt: 1099, primary: "https://modrn.in/cdn/shop/files/6_d3dfc0d1-d138-445a-a41c-267f5b409239.png?v=1777550332&width=1200", secondary: "https://modrn.in/cdn/shop/files/1_051c49be-0143-4b7b-9077-ada954ecb1af.png?v=1777550332&width=1200" },
  { id: "back-again", name: "Back Again Let's See", tagline: "Round two. Sharper edges.", gsm: 220, price: 599, compareAt: 1099, primary: "https://modrn.in/cdn/shop/files/back_again.png?v=1777025982&width=1200", secondary: "https://modrn.in/cdn/shop/files/2_2d09ca11-7af4-4e17-93ab-51afb907cd3f.png?v=1777464989&width=1200" },
  { id: "first-coffee", name: "First I Drink Coffee", tagline: "Morning protocol.", gsm: 220, price: 599, compareAt: 1099, primary: "https://modrn.in/cdn/shop/files/first_I_drink_coffee.png?v=1777025982&width=1200", secondary: "https://modrn.in/cdn/shop/files/first_I_drink_coffee.png?v=1777025982&width=1200" },
];

const collections = [
  { num: "01", name: "Back in the Game", tag: "The one that sticks.", image: "https://modrn.in/cdn/shop/files/ChatGPT_Image_Apr_10_2026_04_49_17_PM.png?v=1776067779&width=2000" },
  { num: "02", name: "High Standards", tag: "Calm mind. Loud standards.", image: "https://modrn.in/cdn/shop/files/ChatGPT_Image_Apr_10_2026_03_07_34_PM.png?v=1776066628&width=2000" },
  { num: "03", name: "Machine Mode", tag: "Built for machines. Driven by instinct.", image: "https://modrn.in/cdn/shop/files/ChatGPT_Image_Apr_10_2026_02_11_09_PM.png?v=1776075534&width=2000" },
  { num: "04", name: "Minimal Vibe", tag: "Less noise. More intent.", image: "https://modrn.in/cdn/shop/files/MinimalVibe_collection_img.png?v=1777443353&width=2000" },
];

const reviews = [
  { quote: "The 240 GSM is no joke. Heaviest tee in my wardrobe. Cut is perfect — oversized but still clean.", name: "Aarav S.", city: "Bangalore", piece: "Built To Burn Fuel" },
  { quote: "Finally a brand that gets minimal right. Not boring — confident. Wearing 'Focus' on repeat.", name: "Ishita K.", city: "Mumbai", piece: "Focus" },
  { quote: "I've spent ₹3k on tees that feel cheaper than this ₹599 one. MODRN is doing something right.", name: "Tanvi R.", city: "Pune", piece: "Unstoppable" },
  { quote: "Packaging felt like unboxing a phone. Fit is exactly what was shown. Already ordered two more.", name: "Rohan M.", city: "Delhi", piece: "Who Needs Roads" },
];

const features = [
  { num: "01", title: "Structured fit", copy: "Clean construction that stays sharp. Double-stitched seams, pre-shrunk, drop-shouldered." },
  { num: "02", title: "Refined detailing", copy: "Reinforced collars, tonal stitching, ribbed hems — the things that separate premium from cheap." },
  { num: "03", title: "Breathable comfort", copy: "Soft, garment-washed cotton. Heavy at 220–240 GSM, never stiff." },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];
const COLORS = [
  { name: "Off White", hex: "#ece9e2" },
  { name: "Jet Black", hex: "#161616" },
  { name: "Olive", hex: "#5a5e3f" },
  { name: "Stone", hex: "#9b8f7e" },
];
const FREE_SHIP = 1499;

const productById = (id) => products.find((p) => p.id === id);
const discountOf = (p) => Math.round(((p.compareAt - p.price) / p.compareAt) * 100);

/* =========================================================
   Cart state
   ========================================================= */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("modrn_cart") || "[]"); } catch (e) { cart = []; }
let wishlist = [];
try { wishlist = JSON.parse(localStorage.getItem("modrn_wish") || "[]"); } catch (e) { wishlist = []; }

const saveCart = () => localStorage.setItem("modrn_cart", JSON.stringify(cart));
const saveWish = () => localStorage.setItem("modrn_wish", JSON.stringify(wishlist));
const cartCount = () => cart.reduce((n, i) => n + i.qty, 0);
const cartSubtotal = () => cart.reduce((n, i) => n + i.price * i.qty, 0);

/* =========================================================
   Card markup
   ========================================================= */
function cardHTML(p) {
  const disc = discountOf(p);
  const wished = wishlist.includes(p.id) ? "is-wished" : "";
  return `
  <article class="pcard reveal" data-card="${p.id}">
    <div class="pcard__media" data-open="${p.id}">
      <img class="pcard__img pcard__img--main" src="${p.primary}" alt="${p.name}" loading="lazy" decoding="async" />
      <img class="pcard__img pcard__img--alt" src="${p.secondary}" alt="" loading="lazy" decoding="async" />
      ${p.badge ? `<span class="pcard__badge">${p.badge}</span>` : ""}
      ${disc > 0 ? `<span class="pcard__disc">−${disc}%</span>` : ""}
      <button class="pcard__wish ${wished}" data-wish="${p.id}" aria-label="Add to wishlist">${ICON.heart}</button>
      <button class="pcard__add" data-open="${p.id}" aria-label="View ${p.name}">${ICON.plus}</button>
    </div>
    <div class="pcard__info">
      <h3 class="pcard__name">${p.name}</h3>
      <div class="pcard__sub">${p.gsm} GSM · Oversized</div>
      <div class="pcard__price"><b>${inr(p.price)}</b><s>${inr(p.compareAt)}</s></div>
    </div>
  </article>`;
}

/* =========================================================
   Render: rail, spotlight, grid, collections, features, reviews
   ========================================================= */
function renderRail() {
  const rail = $("#drop-rail");
  const featured = products.slice(1);
  rail.innerHTML = featured.map(cardHTML).join("");

  const dots = $("#drop-dots");
  dots.innerHTML = featured.map((_, i) => `<span class="rail__dot ${i === 0 ? "is-active" : ""}"></span>`).join("");
  bindRailDots(rail, dots);
}

function renderSpotlight() {
  const p = products[0];
  const disc = discountOf(p);
  $("#spotlight-card").innerHTML = `
    <img class="spotlight__img" src="${p.primary}" alt="${p.name}" loading="lazy" decoding="async" />
    <div class="spotlight__grad"></div>
    <div class="spotlight__body">
      <div class="spotlight__tag">Hero piece · Drop 03</div>
      <h3 class="spotlight__name">${p.name}</h3>
      <p class="spotlight__desc">${p.tagline} ${p.gsm} GSM garment-washed cotton, cut oversized.</p>
      <div class="spotlight__row">
        <div class="spotlight__price"><b>${inr(p.price)}</b><s>${inr(p.compareAt)}</s><em>−${disc}%</em></div>
        <button class="btn btn--primary" data-open="${p.id}"><span>View</span>${ICON.arrow}</button>
      </div>
    </div>`;
}

function renderGrid() {
  $("#product-grid").innerHTML = products.map(cardHTML).join("");
}

function renderCollections() {
  $("#coll-rail").innerHTML = collections.map((c) => `
    <a class="ccard reveal" href="#shop">
      <img class="ccard__img" src="${c.image}" alt="${c.name}" loading="lazy" decoding="async" />
      <div class="ccard__grad"></div>
      <span class="ccard__num">${c.num}</span>
      <div class="ccard__body">
        <div class="ccard__label">Collection</div>
        <h3 class="ccard__name">${c.name}</h3>
        <div class="ccard__tag">"${c.tag}"</div>
        <span class="ccard__cta">Explore ${ICON.arrow}</span>
      </div>
    </a>`).join("");
}

function renderFeatures() {
  $("#features").innerHTML = features.map((f) => `
    <div class="feature reveal">
      <div class="feature__num">${f.num}</div>
      <div>
        <h3 class="feature__title">${f.title}</h3>
        <p class="feature__copy">${f.copy}</p>
      </div>
    </div>`).join("");
}

const IG_URL = "https://www.instagram.com/modrnindia";
function renderSocial() {
  // 6 tiles — tiles 1 & 5 render tall (CSS bento spans). Tall slots use
  // lifestyle/model shots; short slots use product shots. Fills 2×4 with no gaps.
  const tiles = [
    collections[2].image, // tall (lifestyle)
    products[4].primary,
    products[2].primary,
    products[0].primary,
    collections[0].image, // tall (lifestyle)
    products[1].primary,
  ];
  $("#social-grid").innerHTML = tiles.map((src) => `
    <a class="tile reveal-fade" href="${IG_URL}" target="_blank" rel="noreferrer">
      <img src="${src}" alt="MODRN community" loading="lazy" decoding="async" />
      <span class="tile__badge">${ICON.ig}</span>
      <span class="tile__ov"><span>${ICON.ig} View on IG</span></span>
    </a>`).join("");
}

function renderReviews() {
  $("#review-stars").innerHTML = Array(5).fill(ICON.star).join("");
  const track = $("#reviews-track");
  track.innerHTML = reviews.map((r) => `
    <div class="review">
      <div class="review__quote-mark">"</div>
      <p class="review__quote">${r.quote}</p>
      <div class="review__author">
        <div class="review__avatar">${r.name[0]}</div>
        <div>
          <div class="review__name">${r.name}</div>
          <div class="review__meta">${r.city} · Wore ${r.piece}</div>
        </div>
      </div>
    </div>`).join("");

  const dots = $("#review-dots");
  dots.innerHTML = reviews.map((_, i) => `<span class="rail__dot ${i === 0 ? "is-active" : ""}"></span>`).join("");
  bindRailDots(track, dots);
}

/* =========================================================
   Rail dot syncing (shared)
   ========================================================= */
function bindRailDots(scroller, dotsWrap) {
  const dots = $$(".rail__dot", dotsWrap);
  if (!dots.length) return;
  let raf;
  scroller.addEventListener("scroll", () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      const children = Array.from(scroller.children);
      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let active = 0, best = Infinity;
      children.forEach((c, i) => {
        const mid = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < best) { best = d; active = i; }
      });
      dots.forEach((d, i) => d.classList.toggle("is-active", i === active));
    });
  }, { passive: true });
}

/* =========================================================
   Card flip on touch + interactions (event delegation)
   ========================================================= */
function bindCardEvents() {
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open]");
    if (openBtn) { e.preventDefault(); openProductSheet(openBtn.getAttribute("data-open")); return; }

    const wishBtn = e.target.closest("[data-wish]");
    if (wishBtn) { e.preventDefault(); toggleWish(wishBtn.getAttribute("data-wish"), wishBtn); return; }
  });

  // Flip cards on tap-and-hold-ish (use pointer enter for desktop, and toggle alt on first tap region — handled by long press)
  $$("[data-card]").forEach((card) => {
    card.addEventListener("pointerenter", () => card.classList.add("is-flipped"));
    card.addEventListener("pointerleave", () => card.classList.remove("is-flipped"));
  });
}

function toggleWish(id, btn) {
  const i = wishlist.indexOf(id);
  if (i >= 0) { wishlist.splice(i, 1); btn.classList.remove("is-wished"); }
  else { wishlist.push(id); btn.classList.add("is-wished"); haptic(); toast("Saved to wishlist", true); }
  saveWish();
}

/* =========================================================
   Product bottom sheet
   ========================================================= */
let psState = { id: null, size: null, color: 0, qty: 1 };

function openProductSheet(id) {
  const p = productById(id);
  if (!p) return;
  psState = { id, size: "M", color: 0, qty: 1 };
  const disc = discountOf(p);

  $("#product-sheet-body").innerHTML = `
    <div class="ps__gallery">
      <img src="${p.primary}" alt="${p.name}" id="ps-img" />
      ${disc > 0 ? `<span class="ps__disc">−${disc}% OFF</span>` : ""}
    </div>
    <div class="ps__body">
      <h2 class="ps__name">${p.name}</h2>
      <p class="ps__tagline">"${p.tagline}"</p>
      <div class="ps__price"><b>${inr(p.price)}</b><s>${inr(p.compareAt)}</s><em>Save ${inr(p.compareAt - p.price)}</em></div>

      <div class="ps__group">
        <div class="ps__label"><span>Color</span><span class="ps__chosen" id="ps-color-name">${COLORS[0].name}</span></div>
        <div class="ps__swatches" id="ps-swatches">
          ${COLORS.map((c, i) => `<button class="ps__swatch ${i === 0 ? "is-active" : ""}" data-color="${i}" style="background:${c.hex}" aria-label="${c.name}"></button>`).join("")}
        </div>
      </div>

      <div class="ps__group">
        <div class="ps__label"><span>Size</span><a href="#" class="ps__chosen" style="color:var(--accent)">Size guide</a></div>
        <div class="ps__sizes" id="ps-sizes">
          ${SIZES.map((s) => `<button class="ps__size ${s === "M" ? "is-active" : ""} ${s === "XXL" ? "is-disabled" : ""}" data-size="${s}">${s}</button>`).join("")}
        </div>
      </div>

      <div class="ps__group">
        <div class="ps__feature-list">
          <div class="ps__feature-item">${ICON.check} ${p.gsm} GSM premium combed cotton</div>
          <div class="ps__feature-item">${ICON.check} Oversized, drop-shoulder fit</div>
          <div class="ps__feature-item">${ICON.check} Free shipping over ${inr(FREE_SHIP)} · 7-day returns</div>
        </div>
      </div>
    </div>

    <div class="ps__bar">
      <div class="ps__qty">
        <button data-psqty="-1" aria-label="Decrease">−</button>
        <span id="ps-qty">1</span>
        <button data-psqty="1" aria-label="Increase">+</button>
      </div>
      <button class="btn btn--primary ps__add" id="ps-add">
        <span>Add — ${inr(p.price)}</span>
      </button>
    </div>`;

  bindProductSheet(p);
  openSheet("product-sheet");
}

function bindProductSheet(p) {
  const body = $("#product-sheet-body");

  $("#ps-swatches", body).addEventListener("click", (e) => {
    const b = e.target.closest("[data-color]"); if (!b) return;
    $$(".ps__swatch", body).forEach((s) => s.classList.remove("is-active"));
    b.classList.add("is-active");
    psState.color = +b.getAttribute("data-color");
    $("#ps-color-name", body).textContent = COLORS[psState.color].name;
    haptic();
  });

  $("#ps-sizes", body).addEventListener("click", (e) => {
    const b = e.target.closest("[data-size]"); if (!b || b.classList.contains("is-disabled")) return;
    $$(".ps__size", body).forEach((s) => s.classList.remove("is-active"));
    b.classList.add("is-active");
    psState.size = b.getAttribute("data-size");
    haptic();
  });

  body.querySelector(".ps__bar").addEventListener("click", (e) => {
    const q = e.target.closest("[data-psqty]");
    if (q) {
      psState.qty = Math.max(1, Math.min(99, psState.qty + +q.getAttribute("data-psqty")));
      $("#ps-qty", body).textContent = psState.qty;
      $("#ps-add span", body).textContent = `Add — ${inr(p.price * psState.qty)}`;
      haptic();
    }
  });

  $("#ps-add", body).addEventListener("click", () => {
    addToCart(p, psState.size, COLORS[psState.color].name, psState.qty);
    closeSheet("product-sheet");
  });
}

/* =========================================================
   Cart logic
   ========================================================= */
function addToCart(p, size, color, qty) {
  const key = `${p.id}|${size}|${color}`;
  const existing = cart.find((i) => i.key === key);
  if (existing) existing.qty += qty;
  else cart.push({ key, id: p.id, name: p.name, price: p.price, image: p.primary, size, color, qty });
  saveCart();
  updateCartBadges();
  haptic();
  toast(`Added to bag · ${qty} item${qty > 1 ? "s" : ""}`, true);
}

function changeQty(key, delta) {
  const item = cart.find((i) => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i.key !== key);
  saveCart();
  updateCartBadges();
  renderCart();
  haptic();
}

function removeItem(key) {
  cart = cart.filter((i) => i.key !== key);
  saveCart();
  updateCartBadges();
  renderCart();
}

function updateCartBadges() {
  const n = cartCount();
  [["#bag-count"], ["#tab-bag-count"]].forEach(([sel]) => {
    const el = $(sel);
    el.textContent = n;
    el.hidden = n === 0;
  });
}

function renderCart() {
  const n = cartCount();
  $("#cart-head-count").textContent = `(${n})`;
  const itemsEl = $("#cart-items");
  const footEl = $("#cart-foot");
  const shipEl = $("#cart-ship");

  if (!cart.length) {
    itemsEl.innerHTML = `
      <div class="cart__empty">
        ${ICON.bag}
        <p>Your bag is empty.</p>
        <button class="btn btn--primary" data-close>Start shopping</button>
      </div>`;
    footEl.style.display = "none";
    shipEl.style.display = "none";
    return;
  }
  footEl.style.display = "";
  shipEl.style.display = "";

  itemsEl.innerHTML = cart.map((i) => `
    <div class="citem">
      <img class="citem__img" src="${i.image}" alt="${i.name}" />
      <div class="citem__main">
        <div class="citem__name">${i.name}</div>
        <div class="citem__opts">${i.size} · ${i.color}</div>
        <div class="citem__price">${inr(i.price * i.qty)}</div>
      </div>
      <div class="citem__side">
        <button class="citem__remove" data-remove="${i.key}">Remove</button>
        <div class="citem__qty">
          <button data-cqty="${i.key}|-1" aria-label="Decrease">−</button>
          <span>${i.qty}</span>
          <button data-cqty="${i.key}|1" aria-label="Increase">+</button>
        </div>
      </div>
    </div>`).join("");

  const sub = cartSubtotal();
  $("#cart-subtotal").textContent = inr(sub);

  const remaining = FREE_SHIP - sub;
  const fill = Math.min(100, (sub / FREE_SHIP) * 100);
  $("#cart-ship-fill").style.width = fill + "%";
  $("#cart-ship-text").innerHTML = remaining > 0
    ? `Add <b>${inr(remaining)}</b> more for free shipping`
    : `${ICON.check} You've unlocked <b>free shipping</b>`;
}

function bindCart() {
  $("#cart-items").addEventListener("click", (e) => {
    const rm = e.target.closest("[data-remove]");
    if (rm) { removeItem(rm.getAttribute("data-remove")); return; }
    const cq = e.target.closest("[data-cqty]");
    if (cq) { const { key, delta } = parseCqKey(cq.getAttribute("data-cqty")); changeQty(key, delta); }
  });
  $("#checkout-btn").addEventListener("click", () => {
    toast("Demo — checkout coming soon", true);
  });
}
// key is "id|size|color|delta"
function parseCqKey(str) {
  const parts = str.split("|");
  const delta = +parts.pop();
  return { key: parts.join("|"), delta };
}

/* =========================================================
   Sheet open/close
   ========================================================= */
let openSheets = [];
function openSheet(id) {
  const root = $("#" + id);
  if (!root) return;
  root.hidden = false;
  document.body.classList.add("no-scroll");
  requestAnimationFrame(() => root.classList.add("is-open"));
  openSheets.push(id);
  if (id === "cart-sheet") renderCart();
  if (id === "search-sheet") setTimeout(() => $("#search-input")?.focus(), 300);
}
function closeSheet(id) {
  const root = $("#" + id);
  if (!root) return;
  root.classList.remove("is-open");
  openSheets = openSheets.filter((s) => s !== id);
  if (!openSheets.length) document.body.classList.remove("no-scroll");
  setTimeout(() => { root.hidden = true; }, 450);
}
function closeTopSheet() {
  if (openSheets.length) closeSheet(openSheets[openSheets.length - 1]);
}

function bindSheets() {
  // backdrop + [data-close] elements
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]") || e.target.classList.contains("sheet__backdrop")) {
      const root = e.target.closest(".sheet-root");
      if (root) closeSheet(root.id);
    }
  });
  // Escape
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeTopSheet(); });

  // Triggers
  $("#menu-open").addEventListener("click", () => openSheet("menu-sheet"));
  $("#bag-open").addEventListener("click", () => openSheet("cart-sheet"));
  $("#bag-open-tab").addEventListener("click", () => openSheet("cart-sheet"));
  $("#search-open").addEventListener("click", () => openSheet("search-sheet"));
  $("#search-open-tab").addEventListener("click", () => openSheet("search-sheet"));

  bindSheetDrag();
}

/* Drag-to-dismiss for bottom sheets */
function bindSheetDrag() {
  $$(".sheet__grip").forEach((grip) => {
    const sheet = grip.closest(".sheet");
    const root = grip.closest(".sheet-root");
    let startY = 0, dy = 0, dragging = false;

    const start = (y) => { startY = y; dragging = true; sheet.style.transition = "none"; };
    const move = (y) => {
      if (!dragging) return;
      dy = Math.max(0, y - startY);
      sheet.style.transform = `translateY(${dy}px)`;
    };
    const end = () => {
      if (!dragging) return;
      dragging = false;
      sheet.style.transition = "";
      sheet.style.transform = "";
      if (dy > 110) closeSheet(root.id);
      dy = 0;
    };

    grip.addEventListener("touchstart", (e) => start(e.touches[0].clientY), { passive: true });
    grip.addEventListener("touchmove", (e) => move(e.touches[0].clientY), { passive: true });
    grip.addEventListener("touchend", end);
    grip.addEventListener("pointerdown", (e) => { start(e.clientY); grip.setPointerCapture(e.pointerId); });
    grip.addEventListener("pointermove", (e) => move(e.clientY));
    grip.addEventListener("pointerup", end);
  });
}

/* =========================================================
   Search
   ========================================================= */
function bindSearch() {
  const input = $("#search-input");
  const results = $("#search-results");

  const run = (q) => {
    q = q.trim().toLowerCase();
    if (!q) { results.innerHTML = ""; return; }
    const hits = products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      String(p.gsm).includes(q)
    );
    results.innerHTML = hits.length
      ? hits.map((p) => `
        <button class="sresult" data-open="${p.id}">
          <img src="${p.primary}" alt="${p.name}" />
          <div>
            <div class="sresult__name">${p.name}</div>
            <div class="sresult__price">${inr(p.price)} · ${p.gsm} GSM</div>
          </div>
        </button>`).join("")
      : `<div class="sresult__none">No matches for "${q}"</div>`;
  };

  input.addEventListener("input", (e) => run(e.target.value));
  $$(".chip").forEach((chip) => chip.addEventListener("click", () => {
    input.value = chip.getAttribute("data-search");
    run(input.value);
  }));
  // open product from search closes search first
  results.addEventListener("click", (e) => {
    if (e.target.closest("[data-open]")) closeSheet("search-sheet");
  });
}

/* =========================================================
   Newsletter
   ========================================================= */
function bindNewsletter() {
  $("#newsletter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#newsletter-email").value.trim();
    if (!email) return;
    $("#newsletter-msg").textContent = "You're on the list — check your inbox for 10% off.";
    $("#newsletter-email").value = "";
    haptic();
  });
}

/* =========================================================
   Toast + haptics
   ========================================================= */
let toastTimer;
function toast(msg, withIcon = false) {
  const t = $("#toast");
  t.innerHTML = (withIcon ? `<span class="toast__icon">${ICON.check}</span>` : "") + `<span>${msg}</span>`;
  t.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-show"), 2200);
}
function haptic() { if (navigator.vibrate) navigator.vibrate(8); }

/* =========================================================
   Scroll reveal
   ========================================================= */
function initReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal, .reveal-fade, .mask").forEach((el) => io.observe(el));
}

/* =========================================================
   Counters
   ========================================================= */
function initCounters() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const to = +el.getAttribute("data-to");
      let start = null;
      const dur = 1400;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * to);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$("[data-counter]").forEach((el) => io.observe(el));
}

/* =========================================================
   Reviews autoplay
   ========================================================= */
function initReviewAuto() {
  const track = $("#reviews-track");
  let idx = 0;
  let paused = false;
  track.addEventListener("touchstart", () => (paused = true), { passive: true });
  setInterval(() => {
    if (paused || !track.children.length) return;
    idx = (idx + 1) % track.children.length;
    const child = track.children[idx];
    track.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
  }, 5000);
}

/* =========================================================
   Chrome: scroll progress, appbar state, active tab
   ========================================================= */
function initChrome() {
  const progress = $("#scroll-progress");
  const appbar = $("#appbar");
  const tabs = $$(".tab[data-tab]");
  const ids = ["top", "drop", "shop", "collections"];

  // Cache layout so the scroll handler never reads the DOM (avoids layout thrash).
  let sections = [];
  let docH = 0;
  const measure = () => {
    sections = ids.map((id) => { const el = $("#" + id); return el ? { id, top: el.offsetTop } : null; }).filter(Boolean);
    docH = document.documentElement.scrollHeight - window.innerHeight;
  };

  let raf;
  let lastScrolled = null, lastPast = null, lastTab = null;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      const y = window.scrollY;
      progress.style.transform = `scaleX(${docH > 0 ? Math.min(1, y / docH) : 0})`;

      const scrolled = y > 20;
      if (scrolled !== lastScrolled) { appbar.classList.toggle("is-scrolled", scrolled); lastScrolled = scrolled; }
      const past = y > 60;
      if (past !== lastPast) { document.body.classList.toggle("scrolled-past", past); lastPast = past; }

      // active tab by cached section offsets
      const probe = y + window.innerHeight * 0.35;
      let current = "top";
      for (const s of sections) { if (s.top <= probe) current = s.id; }
      if (current !== lastTab) {
        tabs.forEach((t) => t.classList.toggle("is-active", t.getAttribute("data-tab") === current));
        lastTab = current;
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { measure(); onScroll(); }, { passive: true });
  window.addEventListener("load", () => { measure(); onScroll(); });
  // re-measure once images/fonts settle and shift the layout
  setTimeout(measure, 600);
  setTimeout(measure, 1800);
  measure();
  onScroll();
}

/* Pause the hero video when it scrolls off-screen — stops it decoding frames
   in the background, which is a big cause of scroll jank on Android. */
function initHeroVideo() {
  const v = $("#hero-video");
  if (!v) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
  }, { threshold: 0.15 });
  io.observe(v);
}

/* =========================================================
   Hero mute toggle
   ========================================================= */
function bindHeroMute() {
  const btn = $("#hero-mute");
  const video = $("#hero-video");
  const label = $("#mute-label");
  const icon = $("#mute-icon");
  btn.addEventListener("click", () => {
    video.muted = !video.muted;
    if (!video.muted) {
      video.play().catch(() => {});
      btn.classList.add("is-on");
      label.textContent = "On";
      icon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>';
    } else {
      btn.classList.remove("is-on");
      label.textContent = "Sound";
      icon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>';
    }
  });
}

/* =========================================================
   Anatomy — draw tee on enter, light steps via center-band IO
   ========================================================= */
function initAnatomy() {
  const sec = $("#anatomy");
  if (!sec) return;
  const pinwrap = $("#anatomy-pinwrap");
  const steps = $$(".astep", sec);
  const spots = $$(".hotspot", sec);
  const prog = $("#anatomy-prog");
  const n = steps.length || 1;

  // draw the tee the first time the section enters
  const drawIO = new IntersectionObserver((es, o) => {
    es.forEach((e) => { if (e.isIntersecting) { sec.classList.add("is-drawn"); o.disconnect(); } });
  }, { threshold: 0.15 });
  drawIO.observe(sec);

  // scroll-scrub: active step expands, hotspots accumulate, progress fills
  let last = -1, raf = null;
  const update = () => {
    raf = null;
    const r = pinwrap.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    const p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
    if (prog) prog.style.transform = `scaleX(${p})`;
    const idx = Math.min(Math.floor(p * n), n - 1);
    if (idx !== last) {
      last = idx;
      steps.forEach((s) => s.classList.toggle("on", +s.dataset.i === idx));
      spots.forEach((s) => s.classList.toggle("current", +s.dataset.i === idx));
    }
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

/* =========================================================
   Feel the fabric — touch/mouse magnifier, thumbnails, GSM bars
   ========================================================= */
function initFabric() {
  const box = $("#lensbox");
  if (!box) return;
  const lens = $("#lens");
  const img = $("#lensimg");
  const thumbs = $("#fab-thumbs");
  const feel = $("#fabric");
  const Z = 2.4;
  const HALF = 75; // half of 150px lens

  const setBg = () => { lens.style.backgroundImage = `url('${img.currentSrc || img.src}')`; };
  if (img.complete) setBg(); else img.addEventListener("load", setBg, { once: true });

  const moveLens = (cx, cy) => {
    const r = box.getBoundingClientRect();
    let x = Math.max(0, Math.min(cx - r.left, r.width));
    let y = Math.max(0, Math.min(cy - r.top, r.height));
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    lens.style.backgroundSize = `${r.width * Z}px ${r.height * Z}px`;
    lens.style.backgroundPosition = `${-(x * Z - HALF)}px ${-(y * Z - HALF)}px`;
  };

  box.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") box.classList.add("is-zooming"); });
  box.addEventListener("pointerleave", () => box.classList.remove("is-zooming"));
  box.addEventListener("pointerdown", (e) => {
    box.classList.add("is-zooming");
    try { box.setPointerCapture(e.pointerId); } catch (_) {}
    moveLens(e.clientX, e.clientY);
  });
  box.addEventListener("pointermove", (e) => { if (box.classList.contains("is-zooming")) moveLens(e.clientX, e.clientY); });
  box.addEventListener("pointerup", (e) => { if (e.pointerType !== "mouse") box.classList.remove("is-zooming"); });
  box.addEventListener("pointercancel", () => box.classList.remove("is-zooming"));

  thumbs.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-src]");
    if (!b) return;
    $$("button", thumbs).forEach((x) => x.classList.remove("is-active"));
    b.classList.add("is-active");
    img.src = b.dataset.src;
    img.addEventListener("load", setBg, { once: true });
    haptic();
  });

  // preload the full-res close-ups so switching / zooming is instant
  $$("button[data-src]", thumbs).forEach((b) => {
    const im = new Image();
    im.decoding = "async";
    im.src = b.dataset.src;
  });

  // arm the GSM bars + counters when the weigh block enters
  const weigh = $("#weigh");
  if (weigh) {
    const armIO = new IntersectionObserver((es, o) => {
      es.forEach((e) => { if (e.isIntersecting) { feel.classList.add("is-armed"); o.disconnect(); } });
    }, { threshold: 0.35 });
    armIO.observe(weigh);
  }
}

/* =========================================================
   Trust — arm receipt/proof on enter, count risk down to 0%
   ========================================================= */
function initTrust() {
  const sec = $("#trust");
  if (!sec) return;
  const io = new IntersectionObserver((es, o) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      o.disconnect();
      sec.classList.add("is-armed");
      const v = $("#riskval");
      if (!v) return;
      const start = performance.now() + 900;
      const dur = 1800;
      const tick = (t) => {
        if (t < start) { requestAnimationFrame(tick); return; }
        const pr = Math.min((t - start) / dur, 1);
        v.textContent = Math.round(100 * (1 - pr) * (1 - pr)) + "%";
        if (pr < 1) requestAnimationFrame(tick); else v.textContent = "0%";
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.3 });
  io.observe(sec);
}

/* =========================================================
   Init
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderRail();
  renderSpotlight();
  renderGrid();
  renderCollections();
  renderFeatures();
  renderSocial();
  renderReviews();

  bindCardEvents();
  bindSheets();
  bindCart();
  bindSearch();
  bindNewsletter();
  bindHeroMute();

  initReveals();
  initCounters();
  initReviewAuto();
  initChrome();
  initHeroVideo();
  initAnatomy();
  initFabric();
  initTrust();

  updateCartBadges();
  $("#year").textContent = "2026";
});

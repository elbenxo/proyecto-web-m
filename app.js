// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: "Cl\u00e1sica Marta",
    desc: "El modelo original. Algod\u00f3n premium con refuerzo AntiPedo\u2122. Tu b\u00e1sico de cada d\u00eda.",
    price: 14.99,
    colors: ["#c4708f", "#8a3d5c", "#1c1c1c"],
    badge: "Bestseller",
    img: "img/clasica",
    bg: "linear-gradient(145deg, #f5e6ed, #f0d6e2)"
  },
  {
    id: 2,
    name: "Marta Sport",
    desc: "Para las m\u00e1s activas. Licra transpirable con m\u00e1xima sujeci\u00f3n. Yoga, running, lo que quieras.",
    price: 19.99,
    colors: ["#1c1c1c", "#c4708f", "#2d2d2d"],
    badge: "Nuevo",
    img: "img/sport",
    bg: "linear-gradient(145deg, #f0f0f0, #e8e8e8)"
  },
  {
    id: 3,
    name: "Marta Deluxe",
    desc: "Encaje artesanal + tecnolog\u00eda AntiPedo\u2122. Para cuando quieres sentirte especial.",
    price: 24.99,
    colors: ["#8a3d5c", "#c9a96e", "#1c1c1c"],
    badge: "Premium",
    img: "img/deluxe",
    bg: "linear-gradient(145deg, #f0e4ea, #e8d5de)"
  },
  {
    id: 4,
    name: "Pack Indestructible",
    desc: "5 bragas Marta surtidas. Un color para cada d\u00eda. El pack que lo aguanta todo.",
    price: 49.99,
    colors: ["#c4708f", "#1c1c1c", "#c9a96e"],
    badge: "-30%",
    img: "img/pack",
    bg: "linear-gradient(145deg, #f5e6ed, #f5edd6)"
  },
  {
    id: 5,
    name: "Marta Nocturna",
    desc: "Seda natural con tecnolog\u00eda SilentNight\u2122. M\u00e1xima discreci\u00f3n mientras duermes.",
    price: 22.99,
    colors: ["#1c1c1c", "#3d2050", "#c9a96e"],
    badge: "",
    img: "img/nocturna",
    bg: "linear-gradient(145deg, #e8e0ee, #ddd5e5)"
  },
  {
    id: 6,
    name: "Marta Tanga",
    desc: "M\u00ednimo tejido, m\u00e1xima resistencia. Porque menos es m\u00e1s, pero igual de irrompible.",
    price: 16.99,
    colors: ["#dc4a7a", "#c9a96e", "#c43868"],
    badge: "Popular",
    img: "img/tanga",
    bg: "linear-gradient(145deg, #f5e0e8, #f0d5df)"
  }
];

// ===== CART STATE =====
let cart = [];

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = products.map(p => {
    const imgExts = ['jpg', 'webp', 'png'];
    const svgSrc = p.img + '.svg';

    return `
    <div class="product-card">
      <div class="product-card__img" style="background: ${p.bg}">
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
        <img src="${svgSrc}" alt="${p.name}" style="width:120px;height:auto;filter:drop-shadow(0 8px 16px rgba(0,0,0,.12))" loading="lazy">
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.desc}</p>
        <div class="product-card__colors">
          ${p.colors.map(c => `<span class="product-card__color" style="background:${c}"></span>`).join('')}
        </div>
        <div class="product-card__footer">
          <span class="product-card__price">${p.price.toFixed(2)}&euro;</span>
          <button class="btn btn--primary product-card__btn" onclick="addToCart(${p.id})">A\u00f1adir</button>
        </div>
      </div>
    </div>
  `}).join('');
}

// ===== CART FUNCTIONS =====
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
  showToast(`${product.name} a\u00f1adida al carrito`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = total;
}

function renderCart() {
  const container = document.getElementById('cart-items');
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Tu carrito est\u00e1 vac\u00edo</div>';
    document.getElementById('cart-total').textContent = '0.00';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <span class="cart-item__name">${item.name}</span>
        <span style="color:#787878;font-size:.85rem"> x${item.qty}</span>
      </div>
      <div style="display:flex;align-items:center;gap:1rem">
        <span class="cart-item__price">${(item.price * item.qty).toFixed(2)}&euro;</span>
        <button class="cart-item__remove" onclick="removeFromCart(${item.id})">\u2715</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById('cart-total').textContent = total.toFixed(2);
}

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== MODAL =====
document.getElementById('cart-btn').addEventListener('click', () => {
  renderCart();
  document.getElementById('cart-modal').classList.add('active');
});

document.getElementById('cart-close').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.remove('active');
});

document.getElementById('cart-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById('cart-modal').classList.remove('active');
  }
});

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    showToast('A\u00f1ade algo al carrito primero');
    return;
  }
  cart = [];
  updateCartCount();
  renderCart();
  document.getElementById('cart-modal').classList.remove('active');
  showToast('\u00a1Pedido realizado! Tus bragas est\u00e1n en camino');
});

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav__links').classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav__links').classList.remove('open');
  });
});

// ===== CONTACT FORM =====
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('\u00a1Mensaje enviado! Te respondemos pronto');
  e.target.reset();
});

// ===== INIT =====
renderProducts();

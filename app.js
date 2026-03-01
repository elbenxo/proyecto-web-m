// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: "Cl\u00e1sica Pre-Loved",
    desc: "Usada 6 meses por Marta, 34 a\u00f1os, profesora de yoga. Certificado de autenticidad incluido. Nivel de uso: medio.",
    price: 14.99,
    colors: ["#c4708f", "#8a3d5c", "#1c1c1c"],
    badge: "M\u00e1s vendida",
    img: "img/clasica",
    bg: "linear-gradient(145deg, #2a1520, #1a0d14)"
  },
  {
    id: 2,
    name: "Sport Sudada",
    desc: "Ex-braga de gimnasio. Su anterior due\u00f1o/a corr\u00eda 10km diarios. El aroma a esfuerzo es una feature, no un bug.",
    price: 19.99,
    colors: ["#1c1c1c", "#c4708f", "#2d2d2d"],
    badge: "Intensa",
    img: "img/sport",
    bg: "linear-gradient(145deg, #1a1a1a, #0d0d0d)"
  },
  {
    id: 3,
    name: "Deluxe Experimentada",
    desc: "Encaje artesanal con 8 meses de uso premium. Su anterior due\u00f1o/a era sommelier. Braga con paladar.",
    price: 24.99,
    colors: ["#8a3d5c", "#c9a96e", "#1c1c1c"],
    badge: "Premium",
    img: "img/deluxe",
    bg: "linear-gradient(145deg, #2a1a22, #1a0f16)"
  },
  {
    id: 4,
    name: "Pack Sorpresa",
    desc: "5 bragas usadas de diferentes due\u00f1o/as. No eliges, te eligen ellas. La caja de bombones de la lencer\u00eda usada.",
    price: 49.99,
    colors: ["#c4708f", "#1c1c1c", "#c9a96e"],
    badge: "-30%",
    img: "img/pack",
    bg: "linear-gradient(145deg, #221a18, #14100e)"
  },
  {
    id: 5,
    name: "Nocturna So\u00f1ada",
    desc: "Usada exclusivamente para dormir durante 1 a\u00f1o. Impregnada de sue\u00f1os y alguna que otra pesadilla.",
    price: 22.99,
    colors: ["#1c1c1c", "#3d2050", "#c9a96e"],
    badge: "1 a\u00f1o de uso",
    img: "img/nocturna",
    bg: "linear-gradient(145deg, #1a1520, #0d0a14)"
  },
  {
    id: 6,
    name: "Tanga Aventurera",
    desc: "M\u00ednimo tejido, m\u00e1xima historia. Esta tanga ha visto cosas que t\u00fa no creer\u00edas.",
    price: 16.99,
    colors: ["#dc4a7a", "#c9a96e", "#c43868"],
    badge: "Popular",
    img: "img/tanga",
    bg: "linear-gradient(145deg, #2a1420, #1a0c14)"
  }
];

// ===== CART STATE =====
let cart = [];

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = products.map((p, i) => {
    const jpgSrc = p.img + '.jpg';
    const svgSrc = p.img + '.svg';
    const delayClass = i % 3 !== 0 ? ` reveal--delay-${i % 3}` : '';

    return `
    <div class="product-card reveal${delayClass}">
      <div class="product-card__img" style="background: ${p.bg}">
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
        <img src="${jpgSrc}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover" loading="lazy" onerror="this.src='${svgSrc}';this.style.width='120px';this.style.height='auto';this.style.objectFit='contain';this.style.padding='2rem'">
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

  initScrollReveal();
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
        <span style="color:#8a8a8a;font-size:.85rem"> x${item.qty}</span>
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
  showToast('\u00a1Pedido realizado! Tus bragas usadas van en camino');
});

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav__links').classList.toggle('open');
});

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

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// ===== NAV SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  const scroll = window.scrollY;
  if (scroll > 100) {
    nav.style.borderBottomColor = 'rgba(201, 169, 110, .12)';
  } else {
    nav.style.borderBottomColor = 'rgba(201, 169, 110, .08)';
  }
  lastScroll = scroll;
}, { passive: true });

// ===== INIT =====
renderProducts();
initScrollReveal();

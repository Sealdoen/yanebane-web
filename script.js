let lang = localStorage.getItem('lang') || 'uk';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const translations = {
  uk: {
    title: '🍷 YANE BANE',
    selectCategory: 'Оберіть категорію:',
    selectProduct: 'Оберіть товар:',
    tinctures: 'Настоянки',
    liqueurs: 'Лікери',
    wines: 'Домашнє вино',
    product1_tincture: 'Настоянка м’ятна',
    product1_liqueur: 'Лікер вишневий',
    product1_wine: 'Вино червоне',
    price: 'Ціна',
    addToCart: 'Додати до кошика',
    cart: 'Кошик',
    total: 'Сума',
    checkout: 'Оформити замовлення',
    emptyCart: 'Кошик порожній!'
  },
  en: {
    title: '🍷 YANE BANE',
    selectCategory: 'Select a category:',
    selectProduct: 'Select a product:',
    tinctures: 'Tinctures',
    liqueurs: 'Liqueurs',
    wines: 'Homemade Wine',
    product1_tincture: 'Mint Tincture',
    product1_liqueur: 'Cherry Liqueur',
    product1_wine: 'Red Wine',
    price: 'Price',
    addToCart: 'Add to Cart',
    cart: 'Cart',
    total: 'Total',
    checkout: 'Checkout',
    emptyCart: 'Cart is empty!'
  }
};

function setLanguage(newLang) {
  lang = newLang;
  localStorage.setItem('lang', lang);
  updateUI();
}

function updateUI() {
  document.getElementById('store-title').textContent = translations[lang].title;
  if (document.getElementById('select-category')) {
    document.getElementById('select-category').textContent = translations[lang].selectCategory;
  }
  if (document.getElementById('select-product')) {
    document.getElementById('select-product').textContent = translations[lang].selectProduct;
  }
  if (document.querySelector('.category-list')) {
    document.querySelectorAll('.category h3').forEach((el, index) => {
      const categories = [translations[lang].tinctures, translations[lang].liqueurs, translations[lang].wines];
      el.textContent = categories[index];
    });
  }
  if (document.getElementById('product1-name')) {
    const page = window.location.pathname.split('/').pop().replace('.html', '');
    const products = {
      tinctures: translations[lang].product1_tincture,
      liqueurs: translations[lang].product1_liqueur,
      wines: translations[lang].product1_wine
    };
    document.getElementById('product1-name').textContent = products[page] || '';
  }
  if (document.getElementById('product1-price')) {
    document.getElementById('product1-price').textContent = `${translations[lang].price}: ${window.location.pathname.includes('tinctures') ? '220' : window.location.pathname.includes('liqueurs') ? '250' : '300'}₴`;
  }
  if (document.querySelectorAll('.product button')) {
    document.querySelectorAll('.product button').forEach(btn => btn.textContent = translations[lang].addToCart);
  }
  if (document.getElementById('cart-title')) {
    document.getElementById('cart-title').textContent = translations[lang].cart;
  }
  if (document.getElementById('cart-total-text')) {
    document.getElementById('cart-total-text').textContent = `${translations[lang].total}: `;
  }
  if (document.getElementById('checkout-btn')) {
    document.getElementById('checkout-btn').textContent = translations[lang].checkout;
  }
  updateCart();
}

function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  if (cartItems) {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.product} - ${item.price}₴`;
      cartItems.appendChild(li);
      total += item.price;
    });
    cartTotal.textContent = total;
  }
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function sendOrder() {
  const tg = window.Telegram.WebApp;
  if (cart.length === 0) {
    alert(translations[lang].emptyCart);
    return;
  }
  const orderData = JSON.stringify(cart);
  tg.sendData(orderData);
  localStorage.removeItem('cart');
  cart = [];
  updateCart();
  window.location.href = 'index.html';
  tg.close();
}

// Початкове оновлення UI
updateUI();
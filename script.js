let lang = localStorage.getItem('lang') || 'uk';

const translations = {
  uk: {
    title: '🍷 YANE BANE',
    selectProduct: 'Оберіть товар:',
    cart: 'Кошик',
    total: 'Сума',
    checkout: 'Оформити замовлення',
    emptyCart: 'Кошик порожній!'
  },
  en: {
    title: '🍷 YANE BANE',
    selectProduct: 'Select a product:',
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
  document.querySelector('h1').textContent = translations[lang].title;
  document.querySelector('h2').textContent = translations[lang].selectProduct;
  document.querySelector('.cart h2').textContent = translations[lang].cart;
  document.querySelector('.cart p').textContent = `${translations[lang].total}: `;
  document.querySelector('.cart button').textContent = translations[lang].checkout;
  updateCart();
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
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
  tg.close();
}

// Оновлення UI при завантаженні
updateUI();
let lang = localStorage.getItem('lang') || 'uk';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const translations = {
  uk: {
    title: '🍷 YANE BANE',
    selectProduct: 'Оберіть товар:',
    product1: 'Вино червоне',
    product2: 'Настоянка м’ятна',
    price: 'Ціна',
    addToCart: 'Додати до кошика',
    cart: 'Кошик',
    total: 'Сума',
    checkout: 'Оформити замовлення',
    emptyCart: 'Кошик порожній!'
  },
  en: {
    title: '🍷 YANE BANE',
    selectProduct: 'Select a product:',
    product1: 'Red Wine',
    product2: 'Mint Tincture',
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
  document.getElementById('select-product').textContent = translations[lang].selectProduct;
  document.getElementById('product1-name').textContent = translations[lang].product1;
  document.getElementById('product2-name').textContent = translations[lang].product2;
  document.getElementById('product1-price').textContent = `${translations[lang].price}: 300₴`;
  document.getElementById('product2-price').textContent = `${translations[lang].price}: 220₴`;
  document.querySelectorAll('.product button').forEach(btn => btn.textContent = translations[lang].addToCart);
  document.getElementById('cart-title').textContent = translations[lang].cart;
  document.getElementById('cart-total-text').textContent = `${translations[lang].total}: `;
  document.getElementById('checkout-btn').textContent = translations[lang].checkout;
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
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.product} - ${item.price}₴`;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total;
  cartCount.textContent = cart.length;
}

function showCart() {
  document.getElementById('cart').style.display = 'block';
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
  document.getElementById('cart').style.display = 'none';
  tg.close();
}

// Початкове оновлення UI
updateUI();
document.getElementById('cart').style.display = 'none';
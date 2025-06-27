let lang = localStorage.getItem('lang') || 'uk';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const translations = {
  uk: {
    title: '🍷 YANE BANE',
    selectProduct: 'Оберіть товар:',
    tinctures: 'Настоянки',
    liqueurs: 'Лікери',
    wines: 'Домашнє вино',
    product1_tincture: 'Настоянка м’ятна',
    product2_tincture: 'Настоянка трав’яна',
    product3_tincture: 'Настоянка вишнева',
    product4_tincture: 'Настоянка ягідна',
    product5_tincture: 'Настоянка медова',
    product6_tincture: 'Настоянка пряна',
    product7_tincture: 'Настоянка лимонна',
    product8_tincture: 'Настоянка яблучна',
    product9_tincture: 'Настоянка сливова',
    product10_tincture: 'Настоянка персикова',
    product1_liqueur: 'Лікер вишневий',
    product2_liqueur: 'Лікер чорничний',
    product3_liqueur: 'Лікер малиновий',
    product4_liqueur: 'Лікер апельсиновий',
    product5_liqueur: 'Лікер кавовий',
    product6_liqueur: 'Лікер ванільний',
    product7_liqueur: 'Лікер карамельний',
    product8_liqueur: 'Лікер горіховий',
    product9_liqueur: 'Лікер шоколадний',
    product10_liqueur: 'Лікер коричний',
    product1_wine: 'Вино червоне',
    product2_wine: 'Вино біле',
    product3_wine: 'Вино рожеве',
    product4_wine: 'Вино ягідне',
    product5_wine: 'Вино яблучне',
    product6_wine: 'Вино сливове',
    product7_wine: 'Вино персикове',
    product8_wine: 'Вино вишневе',
    product9_wine: 'Вино виноградне',
    product10_wine: 'Вино медове',
    price: 'Ціна',
    addToCart: 'Додати до кошика',
    cart: 'Кошик',
    total: 'Сума',
    checkout: 'Оформити замовлення',
    emptyCart: 'Кошик порожній!',
    remove: 'Видалити'
  },
  en: {
    title: '🍷 YANE BANE',
    selectProduct: 'Select a product:',
    tinctures: 'Tinctures',
    liqueurs: 'Liqueurs',
    wines: 'Homemade Wine',
    product1_tincture: 'Mint Tincture',
    product2_tincture: 'Herbal Tincture',
    product3_tincture: 'Cherry Tincture',
    product4_tincture: 'Berry Tincture',
    product5_tincture: 'Honey Tincture',
    product6_tincture: 'Spice Tincture',
    product7_tincture: 'Lemon Tincture',
    product8_tincture: 'Apple Tincture',
    product9_tincture: 'Plum Tincture',
    product10_tincture: 'Peach Tincture',
    product1_liqueur: 'Cherry Liqueur',
    product2_liqueur: 'Blueberry Liqueur',
    product3_liqueur: 'Raspberry Liqueur',
    product4_liqueur: 'Orange Liqueur',
    product5_liqueur: 'Coffee Liqueur',
    product6_liqueur: 'Vanilla Liqueur',
    product7_liqueur: 'Caramel Liqueur',
    product8_liqueur: 'Nut Liqueur',
    product9_liqueur: 'Chocolate Liqueur',
    product10_liqueur: 'Cinnamon Liqueur',
    product1_wine: 'Red Wine',
    product2_wine: 'White Wine',
    product3_wine: 'Rose Wine',
    product4_wine: 'Berry Wine',
    product5_wine: 'Apple Wine',
    product6_wine: 'Plum Wine',
    product7_wine: 'Peach Wine',
    product8_wine: 'Cherry Wine',
    product9_wine: 'Grape Wine',
    product10_wine: 'Honey Wine',
    price: 'Price',
    addToCart: 'Add to Cart',
    cart: 'Cart',
    total: 'Total',
    checkout: 'Checkout',
    emptyCart: 'Cart is empty!',
    remove: 'Remove'
  }
};

function setLanguage(newLang) {
  lang = newLang;
  localStorage.setItem('lang', lang);
  updateUI();
}

function updateUI() {
  document.getElementById('store-title').textContent = translations[lang].title;
  if (document.getElementById('select-product')) {
    document.getElementById('select-product').textContent = translations[lang].selectProduct;
  }
  if (document.querySelector('.category-list')) {
    document.querySelectorAll('.category h3').forEach((el, index) => {
      const categories = [translations[lang].tinctures, translations[lang].liqueurs, translations[lang].wines];
      el.textContent = categories[index];
    });
  }
  if (document.querySelectorAll('.product')) {
    document.querySelectorAll('.product').forEach((product, index) => {
      const page = window.location.pathname.split('/').pop().replace('.html', '');
      const productNames = {
        tinctures: [
          translations[lang].product1_tincture,
          translations[lang].product2_tincture,
          translations[lang].product3_tincture,
          translations[lang].product4_tincture,
          translations[lang].product5_tincture,
          translations[lang].product6_tincture,
          translations[lang].product7_tincture,
          translations[lang].product8_tincture,
          translations[lang].product9_tincture,
          translations[lang].product10_tincture
        ],
        liqueurs: [
          translations[lang].product1_liqueur,
          translations[lang].product2_liqueur,
          translations[lang].product3_liqueur,
          translations[lang].product4_liqueur,
          translations[lang].product5_liqueur,
          translations[lang].product6_liqueur,
          translations[lang].product7_liqueur,
          translations[lang].product8_liqueur,
          translations[lang].product9_liqueur,
          translations[lang].product10_liqueur
        ],
        wines: [
          translations[lang].product1_wine,
          translations[lang].product2_wine,
          translations[lang].product3_wine,
          translations[lang].product4_wine,
          translations[lang].product5_wine,
          translations[lang].product6_wine,
          translations[lang].product7_wine,
          translations[lang].product8_wine,
          translations[lang].product9_wine,
          translations[lang].product10_wine
        ]
      };
      const prices = {
        tinctures: [220, 230, 240, 225, 250, 235, 215, 245, 230, 255],
        liqueurs: [250, 260, 255, 270, 280, 265, 275, 260, 285, 270],
        wines: [300, 310, 305, 320, 315, 325, 330, 305, 335, 340]
      };
      product.querySelector('h3').textContent = productNames[page][index] || '';
      product.querySelector('p').textContent = `${translations[lang].price}: ${prices[page][index]}₴`;
      product.querySelector('button').textContent = translations[lang].addToCart;
    });
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
  if (document.getElementById('order-title')) {
    document.getElementById('order-title').textContent = translations[lang].checkout;
  }
  updateCart();
}

function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  alert(`${product} доданий до кошика!`);
}

function updateCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  if (cartItems) {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.product} - ${item.price}₴ <span class="remove-item" onclick="removeFromCart(${index})">✖</span>`;
      cartItems.appendChild(li);
      total += item.price;
    });
    cartTotal.textContent = total;
  }
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
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
function sendOrder(product) {
  const tg = window.Telegram.WebApp;
  tg.sendData(product);
  tg.close();
}


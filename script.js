function sendOrder(product) {
  const tg = window.Telegram.WebApp;
  if (confirm(`Ви хочете замовити: ${product}?`)) {
    tg.sendData(product);
    tg.close();
  }
}
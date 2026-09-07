/**
 * Nexora AI — Interactive Pricing & Currency Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  const currencyBtns = document.querySelectorAll('.currency-btn');
  const priceElements = document.querySelectorAll('[data-price-inr]');

  if (!currencyBtns.length || !priceElements.length) return;

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const currency = btn.getAttribute('data-currency'); // 'inr' or 'usd'
      updatePrices(currency);
    });
  });

  function updatePrices(currency) {
    priceElements.forEach(el => {
      const inrVal = el.getAttribute('data-price-inr');
      const usdVal = el.getAttribute('data-price-usd');

      if (currency === 'usd' && usdVal) {
        el.textContent = `$${usdVal}`;
      } else if (inrVal) {
        el.textContent = `₹${inrVal}`;
      }
    });

    // Update any label units
    document.querySelectorAll('.price-currency-label').forEach(label => {
      label.textContent = currency.toUpperCase();
    });
  }
});

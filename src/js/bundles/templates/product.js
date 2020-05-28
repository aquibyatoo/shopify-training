import 'Styles/templates/product.scss';

(function() {
  'use strict';

  const dom = {};

  const cacheDom = () => {
    dom.cartQtyButton = document.querySelectorAll(`[data-item-quantity-change]`);
    dom.cartQty = document.querySelectorAll(`[data-item-quantity]`);
    dom.cartForm = document.querySelectorAll(`[data-cart-form]`);
  };

  const validateQty = (qty) => {
    if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
      // We have a valid number!
    } else {
      qty = 1;
    }
    return qty;
  };

  const bindUIActions = () => {
    dom.cartQtyButton.forEach((element) => {
      element.addEventListener('click', function() {
        let qtySelector = this.parentNode.querySelector(`[data-item-quantity]`);
        let qty = validateQty(parseInt(qtySelector.value.replace(/\D/g, '')));
        if (this.hasAttribute('data-item-quantity-plus')) {
          qty += 1;
        } else {
          qty -= 1;
          if (qty <= 0) qty = 0;
        }
        qtySelector.value = qty;
      })
    })
  }

  const init = () => {
    cacheDom();
    bindUIActions();
  }

  init();

})();
import 'Styles/templates/cart.scss';

(function() {
  'use strict';

  let count = 1;
  const dom = {};

  const cacheDom = () => {
    dom.countEl = document.getElementById('count');
    dom.countMinus = document.getElementById('mins');
    dom.countPlus = document.getElementById('plus');
  }

  const plus = () => {
    count++
    dom.countEl.value = count
    console.log(count);
  }

  const minus = () => {
    if (count > 1) {
      count--
      dom.countEl.value = count
    }
    console.log(count);
  }

  const bindUIActions = () => {
    dom.countMinus.addEventListener('click', minus);
    dom.countPlus.addEventListener('click', plus);
  }

  const init = () => {
    cacheDom();
    bindUIActions();
  }

  init();

})();
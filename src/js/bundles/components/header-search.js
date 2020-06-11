export default() => {
  (function (headerSearch) {

    'use strict';

    const dom = {};

    const cacheDom = () => {
      dom.searchWindowTrigger = document.querySelectorAll('.search-window-open');
      dom.closeSearchWindow = document.getElementById('closeSearchWindow');
      dom.searchWindow = document.getElementsByClassName('search-window')[0];
      dom.searchInput = document.getElementById('searchInput');
    }

    const bindUIActions = () => {
      dom.searchWindowTrigger.forEach(e => e.addEventListener('click', toggleSearchWindow));
      dom.closeSearchWindow.addEventListener('click', searchWindowClose);
    }

    const toggleSearchWindow = () => {
      dom.searchWindow.classList.toggle('active');
      if (dom.searchWindow.classList.contains('active')) {
        dom.searchInput.focus();
      } else {
        dom.searchInput.blur();
      }
    }

    const searchWindowClose = () => {
      dom.searchWindow.classList.remove('active');
    }

    const init = () => {
      cacheDom();
      bindUIActions();
    }

    headerSearch.init = init;

  })((window.headerSearch = window.headerSearch || {}));
}
export default() => {
  (function (headerSearch) {
    'use strict';

    const dom = {};

    const cacheDom = () => {
      dom.searchWindowHandle = document.getElementById('searchWindowHandle');
      dom.searchWindowTrigger = document.querySelectorAll('.search-window-open');
      dom.closeSearchWindow = document.getElementById('closeSearchWindow');
      dom.searchWindow = document.getElementsByClassName('search-window')[0];
    }

    console.log(dom);

    const bindUIActions = () => {
      dom.searchWindowTrigger.forEach(element => element.addEventListener('click', searchWindowOpen));
      dom.closeSearchWindow.addEventListener('click', searchWindowClose);
    }

    const searchWindowOpen = () => {
      dom.searchWindow.classList.add('active');
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
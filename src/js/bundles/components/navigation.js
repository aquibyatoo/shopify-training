export default() => {
  (function (navigation) {
    'use strict';

    const dom = {};

    const cacheDom = () => {
      dom.trigger = document.getElementsByClassName('nav-trigger')[0];
      dom.body = document.getElementsByTagName('body')[0];
    }

    const bindUIActions = () => {
      dom.trigger.addEventListener('click', toggleNavigation);
    }

    const toggleNavigation = () => {
      event.preventDefault();
      dom.body.classList.toggle('nav-open');
    }

    const init = () => {
      cacheDom();
      bindUIActions();
    }

    navigation.init = init;

  })((window.navigation = window.navigation || {}));
}
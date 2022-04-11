export default() => {
  (function (mobileNavigation) {
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
      dom.body.classList.toggle('nav-open');
    }
    console.log("hello worlds");

    const init = () => {
      cacheDom();
      bindUIActions();
    }
    mobileNavigation.init = init;

  })((window.mobileNavigation = window.mobileNavigation || {}));
}
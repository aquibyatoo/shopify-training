import PredictiveSearch from "@shopify/theme-predictive-search";

export default() => {

  (function(themeSearch) {
    'use strict';

    const dom = {};

    const cacheDom = () => {
      dom.searchInput = document.getElementById('searchInput');
      dom.inputMagnifier = document.getElementsByClassName('magnifier')[0];
      dom.inputClear = document.getElementsByClassName('clear')[0];
      dom.predictiveList = document.getElementById('predictions');
    }

    const predictiveSearch = new PredictiveSearch({
      resources: {
        type: [PredictiveSearch.TYPES.PRODUCT],
        limit: 10,
        options: {
          unavailable_products: PredictiveSearch.UNAVAILABLE_PRODUCTS.LAST,
          fields: [
            PredictiveSearch.FIELDS.TITLE,
            PredictiveSearch.FIELDS.VENDOR,
            PredictiveSearch.FIELDS.PRODUCT_TYPE,
            PredictiveSearch.FIELDS.VARIANTS_TITLE
          ]
        }
      }
    });

    const debounce = (fn, time) => {
      let timeout;

      return function() {
        const functionCall = () => fn.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
      }
    }

    const keyMapper = () => {

      let buffer = [];
      let lastKeyTime = Date.now();

      dom.searchInput.addEventListener('keydown', event => {
        const charList = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const key = event.key.toLowerCase();

        if (charList.indexOf(key) === -1) return;

        const currentTime = Date.now();

        if (currentTime - lastKeyTime > 1000) {
          buffer = [];
        }

        buffer.push(key);
        lastKeyTime = currentTime;

        debounceQuery(buffer)
      })

    }

    const debounceQuery = debounce((keySequence) => {
      const inputString = keySequence.join('').toLowerCase();
      predictiveSearch.query(inputString);
    }, 1000)

    predictiveSearch.on("success", suggestions => {
      const productSuggestions = suggestions.resources.results.products;

      if (productSuggestions.length > 0) {

        productSuggestions.forEach((i) => {
          console.log(i.title);
        });
      }
    });

    predictiveSearch.on("error", error => console.error("Error message:", error.message));

    const init = () => {
      cacheDom();
      keyMapper();
    }

    themeSearch.init = init;

  })((window.themeSearch = window.themeSearch || {}));

}
import $ from 'jquery';

export default () => {

  (function (ajaxSearch) {
    'use strict';

    const dom = {};

    const cacheDom = () => {
      dom.currentAjaxRequest = null;
      dom.resultsList = document.querySelectorAll('.search-results');
      dom.searchInput = document.getElementById('searchInput');
    }

    // Each search form.
    $('form[action="/search"]').each(function() {
      const input = $(this).find('input[name="q"]');
      // We handle input on keyup.
      input.attr('autocomplete', 'off').bind('keyup change', function () {
        var term = $(this).val();
        var searchURL = '/search/suggest.json?q=' + term + '&resources[type]=product'
        dom.resultsList = $('.search-results');
        // if input is empty, we hide previous search.
        if (!term && term === '') {
          dom.resultsList.slideUp(100);
        }
        // Checking input search term.
        if (term.length > 3 && term !== $(this).attr('data-old-term')) {
          $(this).attr('data-old-term', term);
          if (dom.currentAjaxRequest !== null) dom.currentAjaxRequest.abort();
          // Make ajax request
          dom.currentAjaxRequest = $.getJSON(searchURL, function (data) {
            var response = data.resources.results.products;
            dom.resultsList.empty();
            // Cancel we show no result and hide it.
            if (response.length === 0) {
              dom.resultsList.html('<span>No results...</span>');
              dom.resultsList.slideDown(100);
              setTimeout(() => {
                dom.resultsList.slideUp(100);
              }, 2000);
            } else {
              // Status 200, we build search list.
              $.each(response, function (index, item) {
                var link = $('<a></a>').attr('href', item.url);
                link.append('<span class="thumbnail"><img width="50" src="' + item.image + '" /></span>');
                link.append('<span class="title">' + item.title + '</span>');
                link.wrap('<div class="item-row"></div>');
                dom.resultsList.append(link.parent());
              });
              dom.resultsList.slideDown(100);
            }
          });
        }
      });
    });

    const init = () => {
      cacheDom();
    }

    ajaxSearch.init = init;

  })((window.ajaxSearch = window.ajaxSearch || {}));

}
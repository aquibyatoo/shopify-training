import $ from 'jquery';

export default () => {

  (function (ajaxSearch) {
    'use strict';

    const dom = {};

    const cacheDom = () => {
      dom.currentAjaxRequest = null;
      dom.resultsList = $('.search-results');
    }

    $('form[action="/search"]').each(function () {
      var input = $(this).find('input[name="q"]');
      input.attr('autocomplete', 'off').bind('keyup change', function () {
        var term = $(this).val();
        var searchURL = '/search/suggest.json?q=' + term + '&resources[type]=product'
        dom.resultsList = $('.search-results');
        if (term.length > 3 && term !== $(this).attr('data-old-term')) {
          $(this).attr('data-old-term', term);
          if (dom.currentAjaxRequest !== null) dom.currentAjaxRequest.abort();
          dom.currentAjaxRequest = $.getJSON(searchURL, function (data) {
            var response = data.resources.results.products;
            dom.resultsList.empty();
            if (response.length === 0) {
              dom.resultsList.html('<p>No results.</p>');
              dom.resultsList.fadeIn(100);
              dom.resultsList.hide();
            } else {
              $.each(response, function (index, item) {
                var link = $('<a></a>').attr('href', item.url);
                link.append('<span class="thumbnail"><img width="50" src="' + item.image + '" /></span>');
                link.append('<span class="title">' + item.title + '</span>');
                link.wrap('<div class="item-row"></div>');
                dom.resultsList.append(link.parent());
              });
              if (response.results_count > 10) {
                dom.resultsList.append('<div class="row"><div class="columns"><a class="btn" href="' + searchURL + '"> +(' + data.results_count + ') more</a></div></div>');
              }
              dom.resultsList.fadeIn(200);
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
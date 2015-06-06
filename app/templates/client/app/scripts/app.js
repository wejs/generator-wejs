(function (document) {
  'use strict';

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    document.querySelector('body').removeAttribute('unresolved');
    document.querySelector('noscript').remove();
    // Grab a reference to our auto-binding template
    // and give it some initial binding values
    // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
    var app = document.querySelector('#app');

    /**
     * Add Accept header in all request
     */
    $.ajaxPrefilter(function( options ) {
      if ( !options.beforeSend) {
        options.beforeSend = function (xhr) {
          xhr.setRequestHeader('Accept', 'application/json');
          // set auth token
          if (app.auth && app.auth.token)
            xhr.setRequestHeader('Authorization','Bearer ' + app.auth.token);
        };
      }
    });

    $.ajaxSetup({ data: { responseType: 'json' } });

    var loadMenu = $.get('/api/v1/docs/we/menu').then(function(r) {
      app.docMenu = r.menu;
      app.docPreloadedPages = app.docMenu.links.map(function (d){
        return d.url + '?responseType=json';
      });
      app.docMenu.links.forEach(function (d) {
        app.docPreloadedPages.push(d.url);
      });
      app.docPreloadedPages.push('/');
    });
  });

})(document);

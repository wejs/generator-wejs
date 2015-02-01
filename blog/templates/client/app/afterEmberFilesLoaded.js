/**
 * this file runs after load all app files
 */

App.HomeRoute = App.ArticlesIndexRoute;

// wait document ready ...
$( document ).ready(function() {

  App.HomeController.reopen({  blogBgImageStyle: function () {
      var url = App.get('configs.client.publicVars.blogHomeBg');
      return 'background-image: url("' + url + '")';
    }.property('App.configs.client.publicVars.blogHomeBg')
  });

  // load we.js configs
  // TODO move ro ApplicationRoute
  we.bootstrap(function() {
    // configure moment.js
    moment.lang(Ember.get(we,'configs.client.language'));
    // remove noscripts tags on start
    $('noscript').remove()

    var serviceName = we.configs.client.publicVars.oauthNetworkServiceName;
    if (!serviceName) {
      serviceName = 'network';
    }

    // set wembed api url
    App.set('wembedApiUrl', Ember.get(we, 'configs.server.providers.wembed') + '/api/v1/json?url=');

    // create auth object and set default vars
    App.auth = Ember.auth.create({
      serviceName: serviceName,
      token: we.configs.client.publicVars.authToken,
      domain: we.configs.server.providers.cookieDomain,
      loginUrl: we.configs.server.providers.accounts+ '/login',
      logoutUrl: we.configs.server.providers.accounts+ '/auth/logout',
      register: we.configs.server.providers.accounts+ '/signup'
    });

    App.advanceReadiness();

  });
});

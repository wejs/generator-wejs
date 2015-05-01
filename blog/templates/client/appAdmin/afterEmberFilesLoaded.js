/**
 * this file runs after load all app files
 */

// wait document ready ...
$( document ).ready(function() {

	// app router config
	App.Router.reopen({
		location: 'hash'
	});

  App.HomeController.reopen({  blogBgImageStyle: function () {
      var url = App.get('configs.client.publicVars.blogHomeBg');
      return 'background-image: url("' + url + '")';
    }.property('App.configs.client.publicVars.blogHomeBg')
  });


  // configure moment.js
  moment.lang(Ember.get(we,'configs.client.language'));
  // remove noscripts tags on start
  $('noscript').remove();

  App.advanceReadiness();

});

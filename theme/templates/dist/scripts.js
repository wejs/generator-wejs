// Theme scripts


// ---
// THEME APP OVERRIDES
// ---

$(function() {
  App.ApplicationController.reopen({
    socialLinks: function() {
      return App.get('configs.client.publicVars.socialLinks');
    }.property('App.configs.client.publicVars.socialLinks')
  })
});



/**
* your ember.js app
* This file runs after load ember.js features like components
*/

// start app after
App = Ember.WeApplication.create();
App.deferReadiness();

// app router config
App.Router.reopen({
  location: 'history',

  // Notify Google Analytics of every route change
  // TODO move the GA login to one component or lib
  notifyGoogleAnalytics: function() {
    if (!window.ga) return;
    return window.ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition'),
});

// Ember breadcrumbs configs
window.BreadCrumbs.BreadCrumbsComponent.reopen({
  tagName: 'ol',
  classNames: ['breadcrumb'],
  // use application/templates/components/bread-crumbs.hbs template
  layout: null
});

// i18n configs
Ember.FEATURES.I18N_TRANSLATE_HELPER_SPAN = false;
// add translations to all ember input fields
Ember.View.reopen(Ember.I18n.TranslateableAttributes);
Ember.Select.reopen(Ember.I18n.TranslateableProperties);

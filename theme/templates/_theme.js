/**
 * @module  Theme
 * @name    <%= themeName %>
 */

module.exports = {
  // theme config
  configs: {
    // server views
    views: {
      path: 'templates/server'
    },

    emberTemplates: {
      path: 'templates/ember',
    },

    emailTemplates: {
      path: 'templates/email',
    },
    javascript: 'files/public/scripts.js',
    stylesheet: 'files/public/style.css'
  }
};
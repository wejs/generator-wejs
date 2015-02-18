/**
 * @module  Theme
 * @name    we-theme-<%= _.slugify(name) %>
 */

module.exports = {
  // theme config
  configs: {
    // sails views
    views: {
      path: 'templates/sails',
      layout: 'templates/sails/layouts/default.ejs',
      filesToInjectCssJs: 'templates/sails/**/*.ejs',
    },

    emberTemplates: {
      path: 'templates/ember',
    },

    emailTemplates: {
      path: 'templates/email',
    },

    assetsFolderToCopy: 'assets/**/*',

    javascript: 'dist/scripts.js',
    stylesheet: 'dist/style.css'
  }
};

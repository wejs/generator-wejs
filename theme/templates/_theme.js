/**
 * @module  Theme
 * @name    <%= themeName %>
 */

module.exports = {
  // theme config
  configs: {
    emailTemplates: {
      path: 'templates/email',
    },
    javascript: 'files/public/scripts.js',
    stylesheet: 'files/public/style.css'
  },

  autoLoadAllTemplates: true,
  // will be auto loaded
  templates: {},
  // set layouts here
  layouts: {
    'default': {
      template: __dirname + '/templates/server/layout.hbs',
      regions: {
        highlighted: {
          name: 'Highlighted'
        },
        sidebar: {
          name: 'Sidebar'
        }
      }
    },
    'fullwidth': {
      template: __dirname + '/templates/server/full-width-layout.hbs',
      regions: {
        highlighted: {
          name: 'Highlighted'
        }
      }
    }
  },
  widgets: {}
};

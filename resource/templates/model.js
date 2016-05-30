/**
 * <%= resourceName %>
 *
 * @module      :: Model
 * @description :: <%= resourceName %> model
 *
 */

module.exports = function (we) {
  var model = {
    // define you model here
    // see http://docs.sequelizejs.com/en/latest/docs/models-definition
    definition: {
      <% if(modelAttrs){ %><%- modelAttrs %><% } else { %>
      // // Examples:
      // attrString: {
      //   type: we.db.Sequelize.STRING,
      //   allowNull: false
      // },
      // attrText: { type: we.db.Sequelize.TEXT, formFieldType: 'text' },
      // attrHtml: {
      //  type: we.db.Sequelize.TEXT,
      //  formFieldType: 'html',
      //  formFieldHeight: 200
      // },
      // published: {
      //  type: we.db.Sequelize.BOOLEAN,
      //  defaultValue: false
      // }
      <% } %>
    },
    // Associations
    // see http://docs.sequelizejs.com/en/latest/docs/associations
    associations: {
      // // Example:
      // NxN assoc
      // assoc1: {
      //  type: 'belongsToMany',
      //  model: 'role',
      //  inverse: 'users',
      //  through: 'users_roles'
      //},
      // // 1xN assoc
      // assoc2: { type: 'belongsTo', model: 'user' }
    },
    options: {
      // title field, for default title record pages
      // titleField: 'title',

      // Class methods for use with: we.db.models.[yourmodel].[method]
      classMethods: {},
      // record method for use with record.[method]
      instanceMethods: {},
      // Sequelize hooks
      // See http://docs.sequelizejs.com/en/latest/api/hooks
      hooks: {}
    }
  };

  return model;
};
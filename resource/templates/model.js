/**
 * <%= name %> model
 */
module.exports = function Model(we) {
  const model = {
    definition: {
      <% if(modelAttrs){ %><%- modelAttrs %><% } %>
    },
    associations: {
      <% if(modelAssociations){ %><%- modelAssociations %><% } %>
    },
    options: {
      tableName: '<%= tableName %>',

      // imageFields: {
      //   image: { formFieldMultiple: false }
      // },

      classMethods: {},
      instanceMethods: {},
      hooks: {}
    }
  };

  return model;
};

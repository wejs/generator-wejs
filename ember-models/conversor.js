module.exports = {
  convertFields(we, modelName) {
    const Model = we.db.modelsConfigs[modelName];
    const mc = we.db.modelsConfigs[modelName];

    if (!Model) return '';

    const fieldsList = [];

    if (Model.definition) {
      for(let fieldName in Model.definition) {
        if (fieldName == 'id') continue; // skip id;
        let field = Model.definition[fieldName];

        let r = this.convertField(we, fieldName, field, Model);
        if (r) {
          fieldsList.push(r);
        }
      }
    }

    // Associations:
    if (mc && mc.associations) {
      for(let fieldName in mc.associations) {
        let field = mc.associations[fieldName];

        if (!field) continue;

        let r = this.convertAssociation(we, fieldName, field, mc);
        if (r) {
          fieldsList.push(r);
        }
      }
    }

    return fieldsList.join(',\n');
  },

  convertField(we, fieldName, field, Model) {
    let fieldType = String(Model.definition[fieldName].type);

    if (field.formFieldType == 'file/image') {
      return this.field.IMAGE(we, fieldName, field, Model);
    }

    if (fieldType.split && (fieldType.split('(').length > 1) ) {
      fieldType = fieldType.split('(')[0];
    }

    if (fieldType == 'function VIRTUAL') {
      fieldType = 'VIRTUAL';
    }

    if (!this.field[fieldType]) {

      we.log.warn('ember:model:conversor:field type not valid', { fieldName, fieldType});
      return null;
    }

    return this.field[fieldType](we, fieldName, field, Model);
  },

  field: {
    /**
     * VIRTUAL field conversor
     *
     * @param {Object} we        We.js instance
     * @param {String} fieldName
     * @param {Object} field
     * @param {Object} Model     Sequelize model
     */
    VIRTUAL(we, fieldName) {
      return '  '+fieldName+': DS.attr()';
    },
    BLOB() {
      return this.VIRTUAL(...arguments);
    },
    POINT() {
      return this.VIRTUAL(...arguments);
    },
    /**
     * VARCHAR field conversor
     *
     * @param {Object} we        We.js instance
     * @param {String} fieldName
     * @param {Object} field
     * @param {Object} Model     Sequelize model
     */
    VARCHAR(we, fieldName, field) {
      let opts = [];

      if (field.defaultValue) {
        opts.push('    defaultValue: \''+field.defaultValue+'\'');
      }

      let f;

      if (opts.length) {
        f = '  '+fieldName+': DS.attr(\'string\', {\n';
        f += opts.join(',\n');
        f += '\n  })';
      } else {
        f = '  '+fieldName+': DS.attr(\'string\')';
      }

      return f;
    },
    TEXT(we, fieldName, field, Model) {
      return this.VARCHAR(we, fieldName, field, Model);
    },
    LONGTEXT(we, fieldName, field, Model) {
      return this.VARCHAR(we, fieldName, field, Model);
    },
    DATE(we, fieldName, field, Model) {
      return this.VARCHAR(we, fieldName, field, Model);
    },

    /**
     * DATETIME field conversor
     *
     * @param {Object} we        We.js instance
     * @param {String} fieldName
     * @param {Object} field
     * @param {Object} Model     Sequelize model
     */
    DATETIME(we, fieldName, field) {
      let opts = [];

      if (field.defaultValue) {
        opts.push('    defaultValue: \''+field.defaultValue+'\'');
      }

      let f;

      if (opts.length) {
        f = '  '+fieldName+': DS.attr(\'date\', {\n';
        f += opts.join(',\n');
        f += '\n  })';
      } else {
        f = '  '+fieldName+': DS.attr(\'date\')';
      }

      return f;
    },

    /**
     * TINYINT or BOOLEAN field conversor
     *
     * @param {Object} we        We.js instance
     * @param {String} fieldName
     * @param {Object} field
     * @param {Object} Model     Sequelize model
     */
    TINYINT(we, fieldName, field) {
      let opts = [];

      if (field.defaultValue) {
        opts.push('    defaultValue: \''+field.defaultValue+'\'');
      }

      let f, type = 'number';

      if (field.type instanceof we.db.Sequelize.BOOLEAN) {
        type = 'boolean';
      }

      if (opts.length) {
        f = '  '+fieldName+': DS.attr(\''+type+'\', {\n';
        f += opts.join(',\n');
        f += '\n  })';
      } else {
        f = '  '+fieldName+': DS.attr(\''+type+'\')';
      }

      return f;
    },
    INTEGER(we, fieldName, field) {
      let opts = [];

      if (field.defaultValue) {
        opts.push('    defaultValue: \''+field.defaultValue+'\'');
      }

      let f;

      if (opts.length) {
        f = '  '+fieldName+': DS.attr(\'number\', {\n';
        f += opts.join(',\n');
        f += '\n  })';
      } else {
        f = '  '+fieldName+': DS.attr(\'number\')';
      }

      return f;
    },
    FLOAT() {
      return this.INTEGER(...arguments);
    },
    BIGINT() {
      return this.INTEGER(...arguments);
    },

    BELONGSTO(we, fieldName, field) {
      let opts = [
        '    async: true'
      ];

      if (field.inverse) {
        opts.push('    inverse:\''+field.inverse+'\'');
      }

      let targetName = field.model;

      let f = '  '+fieldName+': DS.belongsTo(\''+targetName+'\', {\n';
      f += opts.join(',\n');
      f += '\n  })';

      return f;
    },
    HASONE() {
      return this.BELONGSTO(...arguments);
    },
    HASMANY(we, fieldName, field) {
      let opts = [
        '    async: true'
      ];

      if (field.inverse) {
        opts.push('    inverse:\''+field.inverse+'\'');
      }

      let targetName = field.model;

      let f = '  '+fieldName+': DS.hasMany(\''+targetName+'\', {\n';
      f += opts.join(',\n');
      f += '\n  })';

      return f;
    },
    BELONGSTOMANY() {
      return this.HASMANY(...arguments);
    },

    /**
     * FILE and IMAGE fields
     * Plugin: we-plugin-file
     *
     * @param {Object} we        We.js instance
     * @param {String} fieldName
     * @param {Object} field
     * @param {Object} Model     Sequelize model
     */
    FILE(we, fieldName) {
      return '  '+fieldName+': DS.attr(\'array\')';
    },
    IMAGE() {
      return this.FILE(...arguments);
    }
  },

  convertAssociation(we, fieldName, field, mc) {
    if (!field.type) return null;

    let fieldType = field.type.toUpperCase();

    if (!this.field[fieldType]) {
      we.log.warn('ember:model:conversor:association type not valid', { fieldName, fieldType});
      return null;
    }

    return this.field[fieldType](we, fieldName, field, mc);
  }
};
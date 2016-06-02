var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var utils = require('../utils.js');

var WejsGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },
  prompting: function () {
    this.log(yosay(
      'We.js model generator! |o/ |o/ \n generate one model in your we.js project or plugin!'
    ));

    var prompts = [];

    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your model name',
        default : (this.name || this.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then(function (props) {
      this.name = (this.name || props.name);
      this.modelName = _s.slugify(this.name);
      this.appConfigs = props;
    }.bind(this));
  },
  writing: {
    app: function app() {
      this.modelAttrs = utils.getModelAttrsFromArgs(this.args);
      this.modelAssociations = utils.getModelAssocsFromArgs(this.args);

      this.template('model.json', 'server/models/'+this.modelName+'.json');
    }
  }
});

module.exports = WejsGenerator;
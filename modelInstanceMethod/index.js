var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },
  prompting: function () {
    this.log(yosay(
      'We.js model instance method generator! \n generate one model instance method in your we.js project or plugin!'
    ));

    var prompts = [];

    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Model instance method file name',
        default : (this.name || this.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then(function (props) {
      this.name = (this.name || props.name);
      this.instanceMethodName = _s.strip(this.name);
    }.bind(this));
  },
  writing: {
    app: function app() {
      this.template('instanceMethod.js', 'server/models/instanceMethods/'+this.instanceMethodName+'.js');
    }
  }
});

module.exports = WejsGenerator;
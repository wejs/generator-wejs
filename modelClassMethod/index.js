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
      'We.js model class method generator! \n generate one model class method in your we.js project or plugin!'
    ));

    var prompts = [];

    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Model class method file name',
        default : (this.name || this.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then(function (props) {
      this.name = (this.name || props.name);
      this.classMethodName = _s.strip(this.name);
    }.bind(this));
  },
  writing: {
    app: function app() {
      this.template('classMethod.js', 'server/models/classMethods/'+this.classMethodName+'.js');
    }
  }
});

module.exports = WejsGenerator;
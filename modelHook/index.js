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
      'We.js model hook generator! \n generate one model hook in your we.js project or plugin!'
    ));

    var prompts = [];

    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Model hook file name',
        default : (this.name || this.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then(function (props) {
      this.name = (this.name || props.name);
      this.hookName = _s.strip(this.name);
    }.bind(this));
  },
  writing: {
    app: function app() {
      this.template('modelHook.js', 'server/models/hooks/'+this.hookName+'.js');
    }
  }
});

module.exports = WejsGenerator;
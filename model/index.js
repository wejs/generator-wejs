var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('name', { type: String, required: false });
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
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

    this.prompt(prompts, function (props) {
      this.name = (this.name || props.name);
      this.modelName = _s.slugify(this.name);
      this.appConfigs = props;
      done();
    }.bind(this));
  },
  writing: {
    app: function app() {
      this.template('model.ejs', 'server/models/'+this.modelName+'.js');
    }
  }
});

module.exports = WejsGenerator;
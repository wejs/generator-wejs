var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'We.js model generator! |o/ |o/ \n generate one model in your we.js project or plugin!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your model name',
    }];

    this.prompt(prompts, function (props) {
      if (!props.name) throw new Error('model name is required');

      this.name = props.name;
      this.modelName = _s.slugify(props.name);

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
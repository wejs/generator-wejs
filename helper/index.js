var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'We.js template helper generator! |o/ |o/ \n generate one helper file in your we.js project or plugin!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your helper name',
    }];

    this.prompt(prompts, function (props) {
      if (!props.name) throw new Error('helper name is required');

      this.name = props.name;
      this.Name = _s.slugify(props.name);

      this.helpersDirName = 'server/helpers/' + this.Name;

      this.appConfigs = props;
      done();
    }.bind(this));
  },
  writing: {
    app: function app() {
      this.template('helper.js.ejs', this.helpersDirName + '.js');
    }
  }
});

module.exports = WejsGenerator;
var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('name', { type: String, required: false });
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'We.js template helper generator! |o/ |o/ \n generate one helper file in your we.js project or plugin!'
    ));

    var prompts = [];

    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your helper name',
        default : (this.name || this.appname) // Default to current folder name
      });
    }

    this.prompt(prompts, function (props) {
      this.name = (this.name || props.name);
      this.Name = _s.slugify(this.name);

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
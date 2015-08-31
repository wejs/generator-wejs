var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'We.js widget generator! |o/ |o/ \n generate one widget files in your we.js project or plugin!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your widget name',
    }];

    this.prompt(prompts, function (props) {
      if (!props.name) throw new Error('widget name is required');

      this.name = props.name;
      this.Name = _s.slugify(props.name);

      this.widgetDirName = 'server/widgets/' + this.Name;

      this.appConfigs = props;
      done();
    }.bind(this));
  },
  writing: {
    app: function app() {
      this.template('form.hbs.ejs', this.widgetDirName + '/form.hbs');
      this.template('view.hbs.ejs', this.widgetDirName + '/view.hbs');
      this.template('index.js.ejs', this.widgetDirName + '/index.js');
    }
  }
});

module.exports = WejsGenerator;
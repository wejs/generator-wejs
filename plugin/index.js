var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'We.js plugin generator! |o/ |o/ \n generate one testable we.js plugin!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your plugin name',
      default : this.appname // Default to current folder name
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.pluginName = 'we-plugin-' + _s.slugify(props.name);

      this.appConfigs = props;
      this.projectFolder = this.pluginName + '/';

      done();
    }.bind(this));
  },
  writing: {
    app: function app() {
      this.template('_README.md', this.projectFolder + 'README.md');
      // - package.json file
      this.template('_package.json', this.projectFolder + 'package.json');
    },

    projectfiles: function () {
      this.directory('client', this.projectFolder + 'client');
      this.directory('files', this.projectFolder + 'files');
      this.directory('lib', this.projectFolder + 'lib');
      this.directory('test', this.projectFolder + 'test');
      this.directory('server', this.projectFolder + 'server');

      this.template(
        '_test.js', this.projectFolder + 'test/features/' + this.pluginName + '/' + this.pluginName + '.test.js'
      );

      this.src.copy('plugin.js', this.projectFolder +  'plugin.js');
      this.src.copy('.gitignore', this.projectFolder +  '.gitignore');
      this.src.copy('.jscsrc', this.projectFolder + '.jscsrc');
      this.src.copy('.jshintignore', this.projectFolder +  '.jshintignore');
      this.src.copy('.jshintrc', this.projectFolder +  '.jshintrc');
      this.src.copy('.npmignore', this.projectFolder +  '.npmignore');
      this.src.copy('.travis.yml', this.projectFolder +  '.travis.yml');
    }
  }
});

module.exports = WejsGenerator;
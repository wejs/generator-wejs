var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('name', { type: String, required: false });
  },
  prompting: function () {
    this.log(yosay(
      'We.js plugin generator! |o/ |o/ \n generate one testable we.js plugin!'
    ));

    var prompts = [];

    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your plugin name',
        default : (this.name || this.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then(function (props) {
      this.name = (this.name || props.name);
      this.pluginName = 'we-plugin-' + _s.slugify(this.name);
      this.appConfigs = props;
      this.projectFolder = this.pluginName + '/';
    }.bind(this));
  },
  writing: {
    app: function app() {
      this.template('_README.md', this.projectFolder + 'README.md');
      // - package.json file
      this.template('_package.json', this.projectFolder + 'package.json');
    },

    projectfiles: function () {
      this.directory('files', this.projectFolder + 'files');
      this.directory('lib', this.projectFolder + 'lib');
      this.directory('test', this.projectFolder + 'test');
      this.directory('server', this.projectFolder + 'server');

      this.template(
        '_test.js', this.projectFolder + 'test/features/' + this.pluginName + '/' + this.pluginName + '.test.js'
      );

      this.copy('plugin.js', this.projectFolder +  'plugin.js');
      this.copy('gitignore', this.projectFolder +  '.gitignore');
      this.copy('jscsrc', this.projectFolder + '.jscsrc');
      this.copy('jshintignore', this.projectFolder +  '.jshintignore');
      this.copy('jshintrc', this.projectFolder +  '.jshintrc');
      this.copy('npmignore', this.projectFolder +  '.npmignore');
      this.copy('travis.yml', this.projectFolder +  '.travis.yml');
    }
  }
});

module.exports = WejsGenerator;
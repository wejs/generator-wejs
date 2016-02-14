'use strict';
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
      'We.js Social Network project generator! |o/ |o/ \n generate one testable we.js project!'
    ));

    var prompts = [];

    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your project name',
        default : (this.name || this.appname) // Default to current folder name
      });
    }

    this.prompt(prompts, function (props) {
      this.name = (this.name || props.name);
      this.projectName = 'we-project-social-' + _s.slugify(this.name);

      this.appConfigs = props;
      this.projectFolder = this.projectName + '/';

      done();
    }.bind(this));
  },
  writing: {
    app: function () {
      this.template('_README.md', this.projectFolder + 'README.md');
      // - package.json file
      this.template('_package.json', this.projectFolder + 'package.json');
    },
    projectfiles: function () {
      this.directory('config', this.projectFolder + 'config');
      this.directory('files', this.projectFolder + 'files');
      this.directory('test', this.projectFolder + 'test');
      this.directory('server', this.projectFolder + 'server');

      this.copy('app.js', this.projectFolder + 'app.js');
      this.copy('plugin.js', this.projectFolder +  'plugin.js');
      this.copy('install.js', this.projectFolder +  'install.js');

      this.copy('jshintrc', this.projectFolder +  '.jshintrc');

      this.copy('bowerrc', this.projectFolder + '.bowerrc');
      this.copy('gitignore', this.projectFolder + '.gitignore');
      this.copy('gulpfile.js', this.projectFolder + 'gulpfile.js');

      this.copy('config/local.example', this.projectFolder +  'config/local.js');
    }
  }
});

module.exports = WejsGenerator;

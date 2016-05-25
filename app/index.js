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
    this.log(yosay(
      'We.js clean app project generator! |o/ |o/ \n generate one testable we.js project!'
    ));

    var prompts = [];

    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your app name',
        default : (this.name || this.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then(function (props) {
      this.name = (this.name || props.name);
      this.projectName = 'we-project-' + _s.slugify(this.name);

      this.appConfigs = props;
      this.projectFolder = this.projectName + '/';
    }.bind(this));
  },
  writing: {
    app: function () {
      this.template('README.md.ejs', this.projectFolder + 'README.md');
      // - package.json file
      this.template('_package.json', this.projectFolder + 'package.json');
    },
    projectfiles: function () {
      this.directory('config', this.projectFolder + 'config');
      this.directory('files', this.projectFolder + 'files');
      this.directory('server', this.projectFolder + 'server');
      this.directory('test', this.projectFolder + 'test');
      this.copy('gitignore', this.projectFolder + '.gitignore');
      this.copy('jshintrc', this.projectFolder +  '.jshintrc');

      this.copy('app.js', this.projectFolder + 'app.js');

      this.copy('plugin.js', this.projectFolder +  'plugin.js');

      this.copy('config/local.example', this.projectFolder +  'config/local.js');
    }
  }
});

module.exports = WejsGenerator;
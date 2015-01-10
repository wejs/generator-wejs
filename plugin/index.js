'use strict';
var util = require('util');
var path = require('path');
var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');


var WejsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.log('You called the wejs subgenerator with the argument ' + this.name + '.');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Wejs plugin generator! |o/'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your plugin name',
      default : this.appname // Default to current folder name
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.capitalizedName = _s.classify(props.name.replace(/\s/g, '-'));

      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      this.dest.mkdir('server');
      this.dest.mkdir('server/controllers');
      this.dest.mkdir('server/models');
      this.dest.mkdir('server/services');

      this.template('Controller.js', 'server/controllers/' + this.capitalizedName + 'Controller.js');
      this.template('Model.js', 'server/models/' + this.capitalizedName + '.js');
      this.template('README.md', 'README.md');

      this.dest.mkdir('config');
      this.copy('gitkeep', 'config/.gitkeep');

      this.dest.mkdir('lib');
      this.src.copy('lib/README.md', 'lib/README.md');
      this.src.copy('lib/index.js', 'lib/index.js');
      this.src.copy('lib/hook.js', 'lib/hook.js');
      this.src.copy('lib/modelsAlter.js', 'lib/modelsAlter.js');

      // - CLIENT side app

      this.dest.mkdir('client');
      this.dest.mkdir('client/app');
      this.dest.mkdir('server/appAdmin');
      this.dest.mkdir('server/assets');

      this.src.copy('client/assets/README.md', 'client/assets/README.md');

      // - package.json file
      this.template('_package.json', 'package.json');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('jscsrc', '.jscsrc');
      this.src.copy('npmignore', '.npmignore');
      this.src.copy('jshintignore', '.jshintignore');
    }
  },

  end: function () {
    if (this.name !== 'temp test') {
      this.npmInstall();
    }
  }
});

module.exports = WejsGenerator;

'use strict';
var util = require('util');
var path = require('path');
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
      this.capitalizedName = capitaliseFirstLetter(props.name);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      this.dest.mkdir('api');
      this.dest.mkdir('api/controllers');
      this.dest.mkdir('api/models');
      this.dest.mkdir('api/services');

      this.template('Controller.js', 'api/controllers/' + this.capitalizedName + 'Controller.js');
      this.template('Model.js', 'api/models/' + this.capitalizedName + '.js');

      this.dest.mkdir('config');
      this.copy('gitkeep', 'config/.gitkeep');

      this.dest.mkdir('lib');
      this.src.copy('lib/index.js', 'lib/index.js');
      this.src.copy('lib/init.js', 'lib/init.js');
      this.src.copy('lib/modelsAlter.js', 'lib/modelsAlter.js');

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
    if(this.name !== 'temp test') {
      this.npmInstall();
    }
  }
});

function capitaliseFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = WejsGenerator;

'use strict';
var util = require('util');
var path = require('path');
var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');


var WejsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    if (this.name) {
      this.log('You called the wejs subgenerator with the argument ' + this.name + '.');
    }
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Wejs theme generator! ;)'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your theme name',
      default : this.appname // Default to current folder name
    }

    ];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.capitalizedName = _s.classify(props.name.replace(/\s/g, '-'));

      this.appConfigs = props;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.projectFolder = this.capitalizedName + '/';

      this.dest.mkdir(this.capitalizedName);

      this.template('_README.md', this.projectFolder + 'README.md');

      // local config
      this.template('_index.js', this.projectFolder + 'index.js');

      // // - package.json file
      this.template('_package.json', this.projectFolder + 'package.json');
    },

    projectfiles: function () {
      this.directory('assets', this.capitalizedName + '/assets');
      this.directory('dist', this.capitalizedName + '/dist');
      this.directory('templates', this.capitalizedName + '/templates');

      // project root folder
      this.src.copy('gitignore', this.capitalizedName + '/.gitignore');
    }
  },

  end: function () {
    var self = this
    process.chdir( this.projectFolder );

    if (this.name !== 'temp test') {
      this.npmInstall();
    } else {
      process.chdir( '../' );
    }
  }
});

module.exports = WejsGenerator;

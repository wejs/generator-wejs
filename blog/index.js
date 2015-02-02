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
      'Wejs blog project generator! |o/ |o/'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your blog project name',
      default : this.appname // Default to current folder name
    },

    // app configs
    {
      type    : 'input',
      name    : 'title',
      message : 'What`s the app name / title?',
      default :  'Simple We.js Blog'
    },

    {
      type    : 'input',
      name    : 'appabout',
      message : 'What`s your blog about?',
      default :  'A We.js Blog Theme with Start Bootstrap clean theme'
    },

    // app email
    {
      type    : 'input',
      name    : 'appemail',
      message : 'What`s the app`s contact email?',
      default :  'contato@wejs.org'
    },

    // host configs
    {
      type    : 'input',
      name    : 'hostname',
      message : 'What`s the localhost app hostname?',
      default :  'http://localhost'
    },
    {
      type    : 'input',
      name    : 'port',
      message : 'Which url port do you want to use?',
      default :  1630
    },


    // main database
    {
      type    : 'input',
      name    : 'databasename',
      message : 'What`s the local`s database name?',
      default : 'test'
    },
    {
      type    : 'input',
      name    : 'databaseuser',
      message : 'What`s the local`s database user?',
      default : 'root'
    },
    {
      type    : 'input',
      name    : 'databasepassword',
      message : 'What`s the local`s database password?',
      default : 'root'
    },

    // test database
    {
      type    : 'input',
      name    : 'testdatabasename',
      message : 'What`s the local`s database name?',
      default : 'test'
    },
    {
      type    : 'input',
      name    : 'testdatabaseuser',
      message : 'What`s the local`s database user?',
      default : 'root'
    },
    {
      type    : 'input',
      name    : 'testdatabasepassword',
      message : 'What`s the local`s database password?',
      default : 'root'
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
      this.template('_bower.json', this.projectFolder + '_bower.json');

      // local config
      this.template('_config-local.js', this.projectFolder + 'config/local.js');

      // // - package.json file
      this.template('_package.json', this.projectFolder + 'package.json');
    },

    projectfiles: function () {
      this.directory('api', this.capitalizedName + '/api');
      this.directory('assets', this.capitalizedName + '/assets');
      this.directory('bin', this.capitalizedName + '/bin');
      this.directory('client', this.capitalizedName + '/client');
      this.directory('config', this.capitalizedName + '/config');
      this.directory('files', this.capitalizedName + '/files');
      this.directory('tasks', this.capitalizedName + '/tasks');
      this.directory('test', this.capitalizedName + '/test');

      // project root folder
      this.src.copy('Gruntfile.js', this.capitalizedName + '/Gruntfile.js');
      this.src.copy('jshintrc', this.capitalizedName + '/.jshintrc');
      this.src.copy('gitignore', this.capitalizedName + '/.gitignore');
      this.src.copy('app.js', this.capitalizedName + '/app.js');
      this.src.copy('bowerrc', this.capitalizedName + '/.bowerrc');
    }
  },

  end: function () {
    process.chdir( this.projectFolder );

    if (this.name !== 'temp test') {
      this.npmInstall();
    }

    process.chdir( '../' );
  }
});

module.exports = WejsGenerator;

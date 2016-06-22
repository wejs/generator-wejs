'use strict';
var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var questions = require('../questions');
var _ = require('lodash');

var WejsGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.sourceRoot(path.resolve(__dirname, '../templates/default'))

    this.npmModulesToInstall = [
      'async', 'lodash', 'we-core'
    ];

    this.devNpmModulesToInstall = [
      'istanbul',
      'mocha',
      'rimraf',
      'sinon',
      'supertest',
      'we-test-tools'
    ];

    this.wejsPLuginsToInstall = {}

    this.argument('name', { type: String, required: false });

    this.option('db-dialect', {
      desc: 'Database ex: postgres or mysql'
    });
    this.option('db-name', {
      desc: 'Database name'
    });
    this.option('db-username', {
      desc: 'Database user name'
    });
    this.option('db-password', {
      desc: 'Database user password'
    });
  },
  prompting: function () {
    this.log(yosay(
      'We.js clean app project generator! |o/ |o/ \n generate one testable we.js project!'
    ));

    var prompts = questions.bind(this)();

    return this.prompt(prompts)
    .then(function (props) {
      this.name = (this.name || props.name);
      this.projectName = 'we-project-' + _s.slugify(this.name);

      this.appConfigs = _.merge(this.options, props);
      this.projectFolder = this.projectName + '/';
    }.bind(this));
  },
  writing: {
    writeFiles: function () {
      if (this.appConfigs.createFirstUser && this.appConfigs.createFirstUser == 'yes') {
        this.wejsPLuginsToInstall['we-plugin-user'] = true;
      }

      this.template('README.md.ejs', this.projectFolder + 'README.md');
      this.template('_package.json', this.projectFolder + 'package.json');

      this.template('_install.js', this.projectFolder + 'install.js');
      this.template('_local.js', this.projectFolder + 'config/local.js');
    },
    copyfiles: function () {
      this.directory('config', this.projectFolder + 'config');
      this.directory('files', this.projectFolder + 'files');
      this.directory('server', this.projectFolder + 'server');
      this.directory('test', this.projectFolder + 'test');
      this.copy('gitignore', this.projectFolder + '.gitignore');
      this.copy('jshintrc', this.projectFolder +  '.jshintrc');

      this.copy('app.js', this.projectFolder + 'app.js');

      this.copy('plugin.js', this.projectFolder +  'plugin.js');
    }
  },
  install: function() {
    switch (this.appConfigs.dbDialect) {
      case 'postgres':
        this.npmModulesToInstall.push('pg')
        this.npmModulesToInstall.push('pg-hstore')
        break;
      default:
        this.npmModulesToInstall.push('mysql')
        this.npmModulesToInstall.push('express-mysql-session')
    }
    // enter in folder
    process.chdir(path.resolve(this.projectFolder) );

    this.npmModulesToInstall = this.npmModulesToInstall
      .concat(Object.keys(this.wejsPLuginsToInstall))

    this.log('Installing the dependencies: ' + this.npmModulesToInstall.join(' '));
    // modules
    this.npmInstall(this.npmModulesToInstall, { 'save': true });
    // dev modules
    this.npmInstall(this.devNpmModulesToInstall, { 'saveDev': true });
  },

  end: function() {
    this.log('DONE');
  }
});

module.exports = WejsGenerator;
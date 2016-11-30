'use strict';
var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var questions = require('../questions');
var path = require('path');
var _ = require('lodash');

var WejsGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.npmModulesToInstall = [
      'async',
      'lodash',
      'we-core',
      'we-theme-admin-default',
      'we-theme-blog-startbootstrap-clean'
    ];

    this.devNpmModulesToInstall = [
      'gulp',
      'istanbul',
      'mocha',
      'rimraf',
      'sinon',
      'supertest',
      'we-test-tools',
      'we-gulp-tasks-default'
    ];

    this.wejsPLuginsToInstall = {
      'we-plugin-user': true,
      'we-plugin-auth': true,
      'we-plugin-acl': true,
      'we-plugin-article': true,
      'we-plugin-bootstrap3': true,
      'we-plugin-disqus': true,
      'we-plugin-editor-summernote': true,
      'we-plugin-email': true,
      'we-plugin-file': true,
      'we-plugin-file-local': true,
      'we-plugin-form': true,
      'we-plugin-google-analytics': true,
      'we-plugin-menu': true,
      'we-plugin-portfolio': true,
      'we-plugin-rss': true,
      'we-plugin-url-alias': true,
      'we-plugin-view': true,
      'we-plugin-vocabulary': true,
      'we-plugin-widget': true
    }

    this.argument('name', { type: String, required: false });

    this.option('skip-install', {
      desc: 'Skip npm installations'
    });
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
    this.option('not-create-first-user', {
      desc: 'Skip user creation'
    });
  },
  prompting: function () {
    this.log(yosay(
      'We.js simple blog project generator! |o/ |o/ \n generate one testable we.js project!'
    ));

    var prompts = questions.bind(this)();

    return this.prompt(prompts)
    .then(function (props) {
      this.name = (this.name || props.name);
      this.projectName = 'we-p-blog-' + _s.slugify(this.name);

      this.appConfigs = _.merge(this.options, props)
      this.projectFolder = this.projectName + '/';
    }.bind(this));
  },
  writing: {
    writeFiles: function () {

      this.template('_README.md', this.projectFolder + 'README.md');
      // - package.json file
      this.template('_package.json', this.projectFolder + 'package.json');

      this.template('_local.js', this.projectFolder + 'config/local.js');
    },
    copyfiles: function () {
      this.directory('config', this.projectFolder + 'config');
      this.directory('files', this.projectFolder + 'files');
      this.directory('test', this.projectFolder + 'test');
      this.directory('server', this.projectFolder + 'server');

      this.copy('app.js', this.projectFolder + 'app.js');

      this.copy('Procfile', this.projectFolder + 'Procfile');

      this.copy('plugin.js', this.projectFolder +  'plugin.js');
      this.copy('install.js', this.projectFolder +  'install.js');

      this.copy('jshintrc', this.projectFolder +  '.jshintrc');

      this.copy('bowerrc', this.projectFolder + '.bowerrc');
      this.copy('gitignore', this.projectFolder + '.gitignore');
      this.copy('gulpfile.js', this.projectFolder + 'gulpfile.js');
    }
  },
  install: function() {
    if (this.appConfigs.skipInstall) return;

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

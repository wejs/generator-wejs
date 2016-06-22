var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');

var WejsGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.sourceRoot(path.resolve(__dirname, '../templates/default'))
    this.devNpmModulesToInstall = [];
    this.npmModulesToInstall = [];
  },
  prompting: function () {
    this.log(yosay(
      'We.js heroku configuration generator!'
    ));

    var prompts = [];

    if (!this.options.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Add one name to your project',
        required: true
      });
    }

    if (!this.options.description) {
      prompts.push({
        type    : 'input',
        name    : 'description',
        message : 'Project description',
        required: true
      });
    }

    if (!this.options.repository) {
      prompts.push({
        type    : 'input',
        name    : 'repository',
        message : 'Git repository url',
        required: true
      });
    }

    if (!this.options.dbDialect) {
      prompts.push({
        type: 'list',
        name: 'dbDialect',
        message: 'Choice one database for your project',
        choices: ['postgres']
      });
    }

    if (!this.options.haveViews) {
      prompts.push({
        type    : 'list',
        name    : 'haveViews',
        message : 'Your project have views or themes?',
        choices: ['yes', 'no']
      });
    }

    return this.prompt(prompts)
    .then(function (props) {
      this.appConfigs = _.merge(this.options, props);
    }.bind(this));
  },
  writing: {
    configs: function configs() {
      if (this.appConfigs.haveViews) {
        this.copy('gulpfile.js', 'gulpfile.js');

        this.devNpmModulesToInstall.push('we-gulp-tasks-default');
        this.devNpmModulesToInstall.push('gulp');
      }

      this.copy('Procfile', 'Procfile');

      this.copy('config/database.js', 'config/database.js');
      this.copy('app.json', 'app.json');
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

    this.log('running npm install if is need ...');

    if (this.devNpmModulesToInstall && this.devNpmModulesToInstall.length) {
      // dev modules
      this.npmInstall(this.devNpmModulesToInstall, { 'saveDev': true });
    }
    if (this.npmModulesToInstall && this.npmModulesToInstall.length) {
      // dev modules
      this.npmInstall(this.npmModulesToInstall, { 'save': true });
    }
  },
  end: function() {
    if (this.appConfigs.repository) {
      this.log(
        'Add in your README.md file:\n'+
        '[![Deploy to Heroku]('+
        'https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template='+
        this.appConfigs.repository+')'
      )
    }

    this.log('DONE');
  }
});

module.exports = WejsGenerator;
const Generator = require('yeoman-generator'),
  yosay = require('yosay'),
  path = require('path'),
  _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.sourceRoot(path.resolve(__dirname, '../templates/default'));
    this.devNpmModulesToInstall = [];
    this.npmModulesToInstall = [];
  }

  prompting() {
    this.log(yosay(
      'We.js heroku configuration generator!'
    ));

    const prompts = [];

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
  }


  configs() {
    if (this.appConfigs.haveViews) {
      this.copy('gulpfile.js', 'gulpfile.js');

      this.devNpmModulesToInstall.push('we-gulp-tasks-default');
      this.devNpmModulesToInstall.push('gulp');
    }

    this.fs.copy(
      this.templatePath('Procfile'),
      this.destinationPath('Procfile')
    );
    this.fs.copy(
      this.templatePath('config/database.js'),
      this.destinationPath('config/database.js')
    );
    this.fs.copyTpl(
      this.templatePath('app.json'),
      this.destinationPath('app.json'),
      this
    );
  }

  install() {
    switch (this.appConfigs.dbDialect) {
      case 'postgres':
        this.npmModulesToInstall.push('pg');
        this.npmModulesToInstall.push('pg-hstore');
        break;
      default:
        this.npmModulesToInstall.push('mysql');
        this.npmModulesToInstall.push('express-mysql-session');
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
  }

  end() {
    if (this.appConfigs.repository) {
      this.log(
        'Add in your README.md file:\n'+
        '[![Deploy to Heroku]('+
        'https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template='+
        this.appConfigs.repository+')'
      );
    }

    this.log('DONE');
  }
};
/**
 * We.js blog generator
 *
 * Generate one we.js blog project
 */

const _s = require('underscore.string'),
  Generator = require('yeoman-generator'),
  yosay = require('yosay'),
  questions = require('../questions'),
  path = require('path'),
  _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.npmModulesToInstall = [
      'async',
      'lodash',
      'we-core',
      'we-theme-blog-startbootstrap-clean'
    ];

    this.devNpmModulesToInstall = [
      'gulp',
      'mocha',
      'sinon',
      'supertest',
      'we-gulp-tasks-default',
      'we-test-tools'
    ];

    this.wejsPLuginsToInstall = {
      'we-admin-blog': true,
      'we-plugin-acl': true,
      'we-plugin-article': true,
      'we-plugin-auth': true,
      'we-plugin-bootstrap3': true,
      'we-plugin-disqus': true,
      'we-plugin-editor-summernote': true,
      'we-plugin-file': true,
      'we-plugin-form': true,
      'we-plugin-google-analytics': true,
      'we-plugin-menu': true,
      'we-plugin-rss': true,
      'we-plugin-url-alias': true,
      'we-plugin-user': true,
      'we-plugin-view': true,
      'we-plugin-vocabulary': true,
      'we-plugin-widget': true,
      'we-plugin-file-local': true,
      'we-plugin-user-settings': true,
      'we-passport-oauth2-password': true,
      'we-plugin-i18n-api': true
    };

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
  }

  prompting() {
    this.log(yosay(
      'We.js simple blog project generator! |o/ |o/ \n generate one testable we.js project!'
    ));

    const prompts = questions.bind(this)();

    return this.prompt(prompts)
    .then( (props)=> {
      this.name = (this.options.name || props.name);
      this.projectName = 'we-p-blog-' + _s.slugify(this.name);

      this.appConfigs = _.merge(this.options, props);
      this.projectFolder = this.projectName + '/';
    });
  }

  writeFiles() {
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath(this.projectFolder + 'README.md'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(this.projectFolder + 'package.json'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('_local.js'),
      this.destinationPath(this.projectFolder + 'config/local.js'),
      this
    );
  }

  copyfiles() {
    this.fs.copy(
      this.templatePath('config'),
      this.destinationPath(this.projectFolder + 'config')
    );

    this.fs.copy(
      this.templatePath('files'),
      this.destinationPath(this.projectFolder + 'files')
    );

    this.fs.copy(
      this.templatePath('server'),
      this.destinationPath(this.projectFolder + 'server')
    );

    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath(this.projectFolder + 'app.js')
    );

    this.fs.copy(
      this.templatePath('Procfile'),
      this.destinationPath(this.projectFolder + 'Procfile')
    );

    this.fs.copy(
      this.templatePath('plugin.js'),
      this.destinationPath(this.projectFolder + 'plugin.js')
    );

    this.fs.copy(
      this.templatePath('install.js'),
      this.destinationPath(this.projectFolder + 'install.js')
    );

    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath(this.projectFolder + '.jshintrc')
    );

    this.fs.copy(
      this.templatePath('bowerrc'),
      this.destinationPath(this.projectFolder + '.bowerrc')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath(this.projectFolder + '.gitignore')
    );

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath(this.projectFolder + '.gulpfile.js')
    );
  }

  install() {
    if (this.appConfigs.skipInstall) return;

    switch (this.appConfigs.dbDialect) {
      case 'postgres':
        this.npmModulesToInstall.push('pg');
        this.npmModulesToInstall.push('pg-hstore');
        break;
      default:
        this.npmModulesToInstall.push('mysql');
        this.npmModulesToInstall.push('express-mysql-session');
    }
    // enter in folder
    process.chdir(path.resolve(this.projectFolder) );

    this.npmModulesToInstall = this.npmModulesToInstall
      .concat(Object.keys(this.wejsPLuginsToInstall));

    this.log('Installing the dependencies: ' + this.npmModulesToInstall.join(' '));
    // modules
    this.npmInstall(this.npmModulesToInstall, { 'save': true });
    // dev modules
    this.npmInstall(this.devNpmModulesToInstall, { 'saveDev': true });
  }

  end() {
    this.log('DONE');
  }
};
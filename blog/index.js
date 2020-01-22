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
  utils = require('../utils.js'),
  _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.sourceRoot(path.resolve(__dirname, '../templates/default'));

    this.npmModulesToInstall = [
      'we-core',
      'we-theme-blog-startbootstrap-clean'
    ];

    this.devNpmModulesToInstall = [
      'chance',
      'connect-sqlite3',
      'fs-extra',
      'nyc',
      'rimraf',
      'sqlite3',
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
      'we-plugin-page': true,
      'we-plugin-auth': true,
      'we-plugin-disqus': true,
      'we-plugin-editor-tinymce': true,
      'we-plugin-file': true,
      'we-plugin-form': true,
      'we-plugin-google-analytics': true,
      'we-plugin-menu': true,
      'we-plugin-rss': true,
      'we-plugin-url-alias': true,
      'we-plugin-user': true,
      'we-plugin-email': true,
      'we-plugin-view': true,
      'we-plugin-vocabulary': true,
      'we-plugin-widget': true,
      'we-plugin-file-local': true,
      'we-plugin-user-settings': true,
      'we-passport-oauth2-password': true,
      'we-plugin-i18n-api': true,
      'we-plugin-site-contact': true,
      'we-plugin-slideshow': true,
      'we-plugin-db-system-settings': true
    };

    this.argument('name', {
      type: String, required: false
    });

    this.option('skip-install', {
      desc: 'Skip npm installations'
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

      this.appConfigs.randomString = utils.getRandomString();
    });
  }

  writeFiles() {
    this.fs.copyTpl(
      this.templatePath('tpls'),
      this.destinationPath(this.projectFolder),
      this,
      {
        interpolate: /<%=([\s\S]+?)%>/g
      }
    );
  }

  copyfiles() {
    this.fs.copy(
      this.templatePath('files-to-copy'),
      this.destinationPath(this.projectFolder),
      {
        interpolate: /<%=([\s\S]+?)%>/g
      }
    );
    // Copy all dotfiles
    this.fs.copy(
      this.templatePath('files-to-copy/**/.*'),
      this.destinationRoot(this.projectFolder),
      {
        interpolate: /<%=([\s\S]+?)%>/g
      }
    );

    this.fs.copy(
      path.join(__dirname, 'templates', 'config'),
      this.destinationPath('config')
    );

    this.fs.copy(
      path.join(__dirname, 'templates', 'plugin.js'),
      this.destinationPath('plugin.js')
    );

    return this.fs.copyTpl(
      path.join(__dirname, 'templates', 'install.js'),
      this.destinationPath('install.js'),
      this
    );

  }

  install() {
    if (this.appConfigs.skipInstall) return;

    utils.setDbDialectModules(this);

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
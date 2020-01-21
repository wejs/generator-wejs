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
      'we-plugin-slideshow': true
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
      this.templatePath('README.md.ejs'),
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

    this.fs.copyTpl(
      this.templatePath('_database.js'),
      this.destinationPath(this.projectFolder + 'config/database.js'),
      this
    );
  }

  copyfiles() {
    this.fs.copy(
      path.join(__dirname, 'templates', 'config'),
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
      this.templatePath('test'),
      this.destinationPath(this.projectFolder + 'test')
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
      path.join(__dirname, 'templates', 'plugin.js'),
      this.destinationPath(this.projectFolder + 'plugin.js')
    );

    this.fs.copyTpl(
      path.join(__dirname, 'templates', 'install.js'),
      this.destinationPath(this.projectFolder + 'install.js'),
      this
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

    utils.setDbDialectModules(this);

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
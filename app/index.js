/**
 * We.js yeoman app generator
 *
 * Generate one app in current folder based on user input configuration
 */

const _s = require('underscore.string'),
  Generator = require('yeoman-generator'),
  yosay = require('yosay'),
  path = require('path'),
  questions = require('../questions'),
  utils = require('../utils.js'),
  _ = require('lodash');

let we;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.sourceRoot(path.resolve(__dirname, '../templates/default'));

    this.npmModulesToInstall = [
      'we-core'
    ];

    this.devNpmModulesToInstall = [
      'chance',
      'connect-sqlite3',
      'fs-extra',
      'mocha',
      'ncy',
      'rimraf',
      'sinon',
      'sqlite3',
      'supertest',
      'we-test-tools'
    ];

    this.wejsPLuginsToInstall = {};

    this.argument('name', { type: String, required: false });
    this.option('skip-install', {
      desc: 'Skip npm installations'
    });
    this.option('not-create-first-user', {
      desc: 'Skip user creation'
    });

    this.doneAll = function doneAll(err) {
      if ( err ) we.log.error('Error:', err);
      we.exit(process.exit);
    };
  }

  prompting() {
    this.log(yosay(
      'We.js clean app project generator! |o/ |o/ \n generate one testable we.js project!'
    ));

    const prompts = questions.bind(this)();

    return this.prompt(prompts)
    .then( (props)=> {
      this.name = (this.options.name || props.name);
      this.projectName = _s.slugify(this.name);

      this.appConfigs = _.merge(this.options, props);
      this.projectFolder = this.projectName + '/';

      this.appConfigs.randomString = utils.getRandomString();
    });
  }

  writeFiles() {
    if (this.appConfigs.createFirstUser && this.appConfigs.createFirstUser == 'yes') {
      this.wejsPLuginsToInstall['we-plugin-user'] = true;
      this.wejsPLuginsToInstall['we-plugin-auth'] = true;
    }

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
      this.destinationRoot()
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
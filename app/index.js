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
  _ = require('lodash');

let we;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.sourceRoot(path.resolve(__dirname, '../templates/default'));

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

    this.wejsPLuginsToInstall = {};

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
    });
  }

  writeFiles() {
    if (this.appConfigs.createFirstUser && this.appConfigs.createFirstUser == 'yes') {
      this.wejsPLuginsToInstall['we-plugin-user'] = true;
      this.wejsPLuginsToInstall['we-plugin-auth'] = true;
    }

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
      this.templatePath('_install.js'),
      this.destinationPath(this.projectFolder + 'install.js'),
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
      this.templatePath('test'),
      this.destinationPath(this.projectFolder + 'test')
    );
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath(this.projectFolder + '.gitignore')
    );
    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath(this.projectFolder + '.jshintrc')
    );
    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath(this.projectFolder + 'app.js')
    );
    this.fs.copy(
      this.templatePath('plugin.js'),
      this.destinationPath(this.projectFolder + 'plugin.js')
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
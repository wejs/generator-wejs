const _s = require('underscore.string'),
  Generator = require('yeoman-generator'),
  yosay = require('yosay'),
  path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', {
      type: String,
      required: false
    });

    this.option('skip-install', {
      desc: 'Skip npm installations'
    });

    this.npmModulesDevToInstall = [
      'chance',
      'connect-sqlite3',
      'fs-extra',
      'istanbul',
      'mocha',
      'nyc',
      'rimraf',
      'sinon',
      'sqlite3',
      'supertest',
      'we-core',
      'we-plugin-acl',
      'we-plugin-auth',
      'we-plugin-user',
      'we-test-tools'
    ];

    this.cwd = process.cwd();
  }

  prompting() {
    this.log(yosay(
      'We.js plugin generator! |o/ |o/ \n generate one testable we.js plugin!'
    ));

    const prompts = [];

    if (!this.options.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your plugin name',
        default : (this.options.name || this.options.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then( (props)=> {
      this.name = (this.options.name || props.name);
      this.pluginName = 'we-plugin-' + _s.slugify(this.name);
      this.appConfigs = props;
      this.projectFolder = this.pluginName + '/';
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md.tpl'),
      this.destinationPath(this.projectFolder + 'README.md'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('package.json.tpl'),
      this.destinationPath(this.projectFolder + 'package.json'),
      this
    );

    this.fs.copy(
      this.templatePath('files'),
      this.destinationPath(this.projectFolder + 'files'),
      this
    );

    this.fs.copyTpl(
      this.templatePath('test/bootstrap.js.tpl'),
      this.destinationPath(this.projectFolder + '/test/bootstrap.js'),
      this
    );

    this.fs.copy(
      this.templatePath('server'),
      this.destinationPath(this.projectFolder + 'server'),
      this
    );

    this.fs.copy(
      this.templatePath('server/templates/.gitkeep'),
      this.destinationPath(this.projectFolder + 'server/templates/.gitkeep'),
      this
    );

    this.fs.copyTpl(
      this.templatePath('test/tests/requests/example.integration.test.js.tpl'),
      this.destinationPath(
        this.projectFolder + 'test/tests/requests/example.integration.test.js'
      ),
      this
    );
    this.fs.copy(
      this.templatePath('.mocharc.json'),
      this.destinationPath(this.projectFolder + '.mocharc.json'),
      this
    );
    this.fs.copy(
      this.templatePath('.nycrc.json'),
      this.destinationPath(this.projectFolder + '.nycrc.json'),
      this
    );
    this.fs.copy(
      this.templatePath('plugin.js'),
      this.destinationPath(this.projectFolder + 'plugin.js'),
      this
    );
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath(this.projectFolder + '.gitignore'),
      this
    );
    this.fs.copy(
      this.templatePath('.jshintignore'),
      this.destinationPath(this.projectFolder + '.jshintignore'),
      this
    );
    this.fs.copy(
      this.templatePath('.jshintrc'),
      this.destinationPath(this.projectFolder + '.jshintrc'),
      this
    );
    this.fs.copy(
      this.templatePath('.npmignore'),
      this.destinationPath(this.projectFolder + '.npmignore'),
      this
    );
    this.fs.copy(
      this.templatePath('travis.yml'),
      this.destinationPath(this.projectFolder + '.travis.yml'),
      this
    );
  }

  install() {
    if (this.appConfigs.skipInstall) return;

    this.log('Starting dev npm modules installation...');

    process.chdir(path.resolve(this.projectFolder));

    this.npmInstall(this.npmModulesDevToInstall, {
      'save-dev': true
    });

    this.log('Done dev npm modules installation...');
  }

  end() {
    process.chdir(path.resolve(this.cwd));
    this.log('DONE');
  }
};
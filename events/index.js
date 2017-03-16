const _s = require('underscore.string'),
  Generator = require('yeoman-generator'),
  yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: false });
  }

  prompting() {
    this.log(yosay(
      'We.js multi events portal generator! |o/ |o/ \n generate one testable we.js events portal project!'
    ));

    const prompts = [];

    if (!this.options.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your project name',
        default : (this.options.name || this.options.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then( (props)=> {
      this.name = (this.options.name || props.name);
      this.projectName = 'we-events-' + _s.slugify(this.name);

      this.appConfigs = props;
      this.projectFolder = this.projectName + '/';
    });
  }

  app() {
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
  }

  projectfiles() {
    this.fs.copy(
      this.templatePath('config'),
      this.destinationPath(this.projectFolder + 'config')
    );
    this.fs.copy(
      this.templatePath('server'),
      this.destinationPath(this.projectFolder + 'server')
    );
    this.fs.copy(
      this.templatePath('files'),
      this.destinationPath(this.projectFolder + 'files')
    );

    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath(this.projectFolder + 'app.js')
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
    this.fs.copy(
      this.templatePath('config/local.example'),
      this.destinationPath(this.projectFolder + 'config/local.js')
    );
  }
};
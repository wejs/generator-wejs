const Generator = require('yeoman-generator'),
  yosay = require('yosay'),
  _s = require('underscore.string');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: false });
  }

  prompting() {
    this.log(yosay(
      'Wejs theme generator! ;)'
    ));

    const prompts = [];

    if (!this.options.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your theme name',
        default : (this.options.name || this.options.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then( (props)=> {
      this.name = (this.options.name || props.name);
      this.themeName = 'we-theme-' + _s.slugify(this.name);
      this.projectFolder = this.themeName + '/';
      this.appConfigs = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath(this.projectFolder + 'README.md'),
      this
    );
    // theme main file
    this.fs.copyTpl(
      this.templatePath('_theme.js'),
      this.destinationPath(this.projectFolder + 'theme.js'),
      this
    );
    // - package.json file
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(this.projectFolder + 'package.json'),
      this
    );
    this.fs.copy(
      this.templatePath('files'),
      this.destinationPath(this.projectFolder + 'files'),
      this
    );
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath(this.projectFolder + 'src'),
      this
    );
    this.fs.copy(
      this.templatePath('config'),
      this.destinationPath(this.projectFolder + 'config'),
      this
    );
    this.fs.copy(
      this.templatePath('templates'),
      this.destinationPath(this.projectFolder + 'templates'),
      this
    );
    this.fs.copy(
      this.templatePath('templates/email/.gitkeep'),
      this.destinationPath(this.projectFolder + 'templates/email/.gitkeep'),
      this
    );
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath(this.projectFolder + 'gulpfile.js'),
      this
    );
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath(this.projectFolder + '.gitignore'),
      this
    );
    this.fs.copy(
      this.templatePath('npmignore'),
      this.destinationPath(this.projectFolder + '.npmignore'),
      this
    );
  }
};
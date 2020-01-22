const _s = require('underscore.string'),
  Generator = require('yeoman-generator'),
  path = require('path'),
  yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.sourceRoot(path.resolve(__dirname, '../templates/widget'));

    this.argument('name', { type: String, required: false });
  }

  prompting() {
    this.log(yosay(
      'We.js widget generator! |o/ |o/ \n generate one widget files in your we.js project or plugin!'
    ));

    const prompts = [];

    if (!this.options.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your widget name',
        default : (this.options.name || this.options.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then( (props)=> {
      this.name = (this.options.name || props.name);
      this.Name = _s.slugify(this.name);
      this.widgetDirName = 'server/widgets/' + this.Name;
      this.appConfigs = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('form.hbs'),
      this.destinationPath(this.widgetDirName + '/form.hbs'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('view.hbs'),
      this.destinationPath(this.widgetDirName + '/view.hbs'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(this.widgetDirName + '/index.js'),
      this
    );
  }
};
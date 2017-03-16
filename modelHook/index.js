const _s = require('underscore.string'),
  Generator = require('yeoman-generator'),
  yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: true });
  }

  prompting() {
    this.log(yosay(
      'We.js model hook generator! \n generate one model hook in your we.js project or plugin!'
    ));

    const prompts = [];

    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Model hook file name',
        default : (this.options.name || this.options.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then( (props)=> {
      this.name = (this.options.name || props.name);
      this.hookName = _s.strip(this.name);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('modelHook.js'),
      this.destinationPath('server/models/hooks/'+this.hookName+'.js'),
      this
    );
  }
};
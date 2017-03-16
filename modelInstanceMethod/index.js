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
      'We.js model instance method generator! \n generate one model instance method in your we.js project or plugin!'
    ));

    const prompts = [];

    if (!this.options.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Model instance method file name',
        default : (this.options.name || this.options.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then( (props)=> {
      this.name = (this.options.name || props.name);
      this.instanceMethodName = _s.strip(this.name);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('instanceMethod.js'),
      this.destinationPath('server/models/instanceMethods/'+this.instanceMethodName+'.js'),
      this
    );
  }
};
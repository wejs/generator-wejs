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
      'We.js model class method generator! \n generate one model class method in your we.js project or plugin!'
    ));

    const prompts = [];

    if (!this.options.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Model class method file name',
        default : (this.options.name || this.options.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then( (props)=> {
      this.name = (this.options.name || props.name);
      this.classMethodName = _s.strip(this.name);
    });
  }

  app() {
    this.fs.copyTpl(
      this.templatePath('classMethod.js'),
      this.destinationPath('server/models/classMethods/'+this.classMethodName+'.js'),
      this
    );
  }
};
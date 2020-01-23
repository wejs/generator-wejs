const _s = require('underscore.string'),
  Generator = require('yeoman-generator'),
  yosay = require('yosay'),
  utils = require('../utils.js');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: true });
  }

  prompting() {
    this.log(yosay(
      'We.js model generator! |o/ |o/ \n generate one model in your we.js project or plugin!'
    ));

    const prompts = [];

    if (!this.options.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your model name',
        default : (this.options.name || this.options.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then( (props)=> {
      this.name = (this.options.name || props.name);
      this.modelName = _s.slugify(this.name);
      this.resourceName = this.modelName;
      this.tableName = this.modelName.replace(/-/g, '_');
      this.appConfigs = props;
    });
  }

  app() {
    this.modelAttrs = utils.getModelAttrsFromArgs(this.args);
    this.modelAssociations = utils.getModelAssocsFromArgs(this.args);

    this.fs.copyTpl(
      this.templatePath('model.js'),
      this.destinationPath('server/models/'+this.modelName+'.js'),
      this
    );
  }
};
const _s = require('underscore.string'),
  Generator = require('yeoman-generator'),
  yosay = require('yosay'),
  utils = require('../utils.js');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', { type: String, required: true });
    this.option('tpl');
  }

  prompting() {
    this.log(yosay(
      'We.js resource generator! |o/ |o/ \n generate one model, controller, resource and test for your resource!'
    ));

    const prompts = [];

    if (!this.options.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your resource name',
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

  writing() {
    this.modelAttrs = utils.getModelAttrsFromArgs(this.args);
    this.modelAssociations = utils.getModelAssocsFromArgs(this.args);

    this.fs.copyTpl(
      this.templatePath('model.js'),
      this.destinationPath('server/models/'+this.resourceName+'.js'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath('server/controllers/'+this.resourceName+'.js'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('resource.json'),
      this.destinationPath('server/resources/'+this.resourceName+'.json'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/features/resources/'+this.resourceName+'.test.js'),
      this
    );

    if (this.options.tpl) {
      // copy default templates for this resource:
      this.fs.copy(
        this.templatePath('crud-tpls'),
        this.destinationPath('server/templates/'+this.resourceName),
        this
      );
    }
  }

};
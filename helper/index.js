/**
 * we-plugin-view helper generator
 *
 * Add custom functions to templates
 */

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
      'We.js template helper generator! |o/ |o/ \n generate one helper file in your we.js project or plugin!'
    ));

    const prompts = [];

    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your helper name',
        default : (this.name || this.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then( (props)=> {
      this.name = (this.name || props.name);
      this.Name = _s.slugify(this.name);

      this.helpersDirName = 'server/helpers/' + this.Name;

      this.appConfigs = props;
    });
  }

  app() {
    this.fs.copyTpl(
      this.templatePath('helper.js.ejs'),
      this.destinationPath(this.helpersDirName + '.js'),
      this
    );
  }
};
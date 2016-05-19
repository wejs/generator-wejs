var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('name', { type: String, required: false });
  },
  prompting: function () {
    this.log(yosay(
      'Wejs theme generator! ;)'
    ));

    var prompts = [];

    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Your theme name',
        default : (this.name || this.appname) // Default to current folder name
      });
    }

    return this.prompt(prompts)
    .then(function (props) {
      this.name = (this.name || props.name);
      this.themeName = 'we-theme-' + _s.slugify(this.name);
      this.projectFolder = this.themeName + '/';
      this.appConfigs = props;
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('_README.md', this.projectFolder + 'README.md');
      // theme main file
      this.template('_theme.js', this.projectFolder + 'theme.js');
      // - package.json file
      this.template('_package.json', this.projectFolder + 'package.json');
    },

    projectfiles: function () {
      this.directory('files', this.projectFolder + 'files');
      this.directory('src', this.projectFolder + 'src');
      this.directory('config', this.projectFolder + 'config');

      this.directory('templates', this.projectFolder + 'templates');
      this.copy('gulpfile.js', this.projectFolder +  'gulpfile.js');
      this.copy('gitignore', this.projectFolder +  '.gitignore');
      this.copy('npmignore', this.projectFolder +  '.npmignore');
    }
  }
});

module.exports = WejsGenerator;

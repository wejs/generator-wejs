var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Wejs theme generator! ;)'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your theme name',
      default : this.appname // Default to current folder name
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.themeName = 'we-theme-' + _s.slugify(props.name);
      this.projectFolder = this.themeName + '/';
      this.appConfigs = props;
      done();
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
      this.directory('templates', this.projectFolder + 'templates');
     this.copy('gulpfile.js', this.projectFolder +  'gulpfile.js');
      this.copy('gitignore', this.projectFolder +  '.gitignore');
    }
  }
});

module.exports = WejsGenerator;

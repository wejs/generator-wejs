var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'We.js resource generator! |o/ |o/ \n generate one model, controller, resource and test for your resource!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your resource name',
    }];

    this.prompt(prompts, function (props) {
      if (!props.name) throw new Error('resource name is required');

      this.name = props.name;
      this.resourceName = _s.slugify(props.name);

      this.appConfigs = props;
      done();
    }.bind(this));
  },
  writing: {
    app: function app() {
      this.template('model.js.ejs', 'server/models/'+this.resourceName+'.js');
      this.template('controller.js.ejs', 'server/controllers/'+this.resourceName+'.js');
      this.template('resource.json.ejs', 'server/resources/'+this.resourceName+'.json');
      this.template('test.js.ejs', 'test/features/resources/'+this.resourceName+'.test.js');
    }
  }
});

module.exports = WejsGenerator;
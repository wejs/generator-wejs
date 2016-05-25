var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var WejsGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('name', { type: String, required: false });
  },
  prompting: function () {
    console.log('TODO!');
  },
  writing: {
    app: function () {},
    projectfiles: function () {}
  }
});

module.exports = WejsGenerator;

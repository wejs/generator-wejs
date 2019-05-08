var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

describe('wejs:plugin', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../plugin'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      //.withArguments(['test'])
      .withPrompts({
        name: 'test'
      })
      .on('end', done);
  });

  it('should creates plugin files', function () {
    assert.file([
      'we-plugin-test/files/public/README.md',
      'we-plugin-test/server/controllers',
      'we-plugin-test/server/models',
      'we-plugin-test/server/templates',
      'we-plugin-test/test/features/we-plugin-test/we-plugin-test.test.js',
      'we-plugin-test/test/bootstrap.js',
      'we-plugin-test/test/mocha.opts',
      'we-plugin-test/.jshintrc',
      'we-plugin-test/.gitignore',
      'we-plugin-test/.npmignore',
      'we-plugin-test/.travis.yml',
      'we-plugin-test/README.md',
      'we-plugin-test/package.json',
      'we-plugin-test/plugin.js'
    ]);
  });
});

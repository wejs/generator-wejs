const path = require('path'),
  assert = require('yeoman-assert'),
  helpers = require('yeoman-test'),
  os = require('os');

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
      'we-plugin-test/test/tests/requests/example.integration.test.js',
      'we-plugin-test/test/bootstrap.js',
      'we-plugin-test/.mocharc.json',
      'we-plugin-test/.nycrc.json',
      'we-plugin-test/.gitignore',
      'we-plugin-test/.jshintignore',
      'we-plugin-test/.jshintrc',
      'we-plugin-test/.npmignore',
      'we-plugin-test/package.json',
      'we-plugin-test/plugin.js',
      'we-plugin-test/README.md',
      'we-plugin-test/.travis.yml'
    ]);
  });
});

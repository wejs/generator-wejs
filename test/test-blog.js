var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

describe('wejs:blog', function () {
  var projectDir = path.join(os.tmpdir(), './temp-ptest');
  var p;
  before(function (done) {
    p = helpers.run(path.join(__dirname, '../blog'))
      .inDir(projectDir)
      .withOptions({ 'skip-install': true })
      //.withArguments(['test'])
      .withPrompts({
        name: 'test'
      })
      .on('end', done);
  });

  it('creates blog project files', function() {
    assert.file([
      'we-project-blog-test/server/controllers/main.js',
      'we-project-blog-test/config/local.js',
      'we-project-blog-test/config/log.js',
      'we-project-blog-test/config/i18n.js',
      'we-project-blog-test/.gitignore',
      'we-project-blog-test/.bowerrc',
      'we-project-blog-test/app.js',
      'we-project-blog-test/package.json',
      'we-project-blog-test/plugin.js',
      'we-project-blog-test/files/public/favicon.png',
      'we-project-blog-test/files/public/home-bg.jpg',
      'we-project-blog-test/files/public/logo.jpg'
    ]);
  });
});

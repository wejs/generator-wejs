var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

describe('wejs', function () {
  var projectDir = path.join(os.tmpdir(), './temp-ptest');
  before(function (done) {
    helpers.run(path.join( __dirname, '../app'))
    .inDir(projectDir)
    .withOptions({ 'skip-install': true })
    .withPrompts({ name: 'test' })
    .toPromise()
    .then(function(){
      done();
    });
  });

  it('creates blog project files', function() {
    assert.file([
      'we-project-test/server/controllers/main.js',
      'we-project-test/config/local.js',
      'we-project-test/config/log.js',
      'we-project-test/config/i18n.js',
      'we-project-test/.gitignore',
      'we-project-test/app.js',
      'we-project-test/package.json',
      'we-project-test/plugin.js',
      'we-project-test/files/public/favicon.png',
      'we-project-test/files/public/logo.jpg'
    ]);
  });
});

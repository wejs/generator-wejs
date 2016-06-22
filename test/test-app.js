var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

describe('wejs', function () {
  var projectDir = path.join(os.tmpdir(), './temp-ptest');
  before(function (done) {
    helpers.run(path.join( __dirname, '../app'))
    .inDir(projectDir)
    .withOptions({
      'skip-install': true,
      'not-create-first-user': true,
      'db-dialect': 'mysql',
      'db-name': 'test',
      'db-username': 'root',
      'db-password': ''
    })
    .withPrompts({ name: 'testap' })
    .toPromise()
    .then(function(){
      done();
    })
    .catch(done)
  });

  it('creates app project files', function() {
    assert.file([
      'we-project-testap/server/controllers/main.js',
      'we-project-testap/config/local.js',
      'we-project-testap/config/log.js',
      'we-project-testap/config/i18n.js',
      'we-project-testap/.gitignore',
      'we-project-testap/app.js',
      'we-project-testap/package.json',
      'we-project-testap/plugin.js',
      'we-project-testap/files/public/favicon.png'
    ]);
  });
});

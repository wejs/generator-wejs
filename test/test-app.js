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
      'we-p-testap/server/controllers/main.js',
      'we-p-testap/config/local.js',
      'we-p-testap/config/log.js',
      'we-p-testap/config/i18n.js',
      'we-p-testap/.gitignore',
      'we-p-testap/app.js',
      'we-p-testap/package.json',
      'we-p-testap/plugin.js',
      'we-p-testap/files/public/favicon.png'
    ]);
  });
});

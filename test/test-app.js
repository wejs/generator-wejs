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
      'testap/server/controllers/main.js',
      'testap/config/local.js',
      'testap/config/log.js',
      'testap/config/i18n.js',
      'testap/.gitignore',
      'testap/app.js',
      'testap/package.json',
      'testap/plugin.js',
      'testap/files/public/favicon.png'
    ]);
  });
});

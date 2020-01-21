var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

describe('wejs:blog', function () {
  var projectDir = path.join(os.tmpdir(), './temp-ptest');
  before(function (done) {
    helpers.run(path.join(__dirname, '../blog'))
    .inDir(projectDir)
    .withOptions({
      'skip-install': true,
      'not-create-first-user': true,
      'db-dialect': 'mysql',
      'db-name': 'test',
      'db-username': 'root',
      'db-password': ''
    })
    .withPrompts({ name: 'test' })
    .toPromise()
    .then(function(){
      done();
    })
    .catch(done)
  });

  it('creates blog project files', function() {
    assert.file([
      'we-p-blog-test/server/controllers/main.js',
      'we-p-blog-test/config/local.js',
      'we-p-blog-test/config/log.js',
      'we-p-blog-test/config/i18n.js',
      'we-p-blog-test/.gitignore',
      'we-p-blog-test/app.js',
      'we-p-blog-test/package.json',
      'we-p-blog-test/plugin.js',
      'we-p-blog-test/files/public/favicon.png',
      // 'we-p-blog-test/files/public/home-bg.jpg',
      'we-p-blog-test/files/public/logo.jpg'
    ]);
  });
});

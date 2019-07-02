const path = require('path'),
 assert = require('yeoman-assert'),
 helpers = require('yeoman-test'),
 os = require('os');

describe('wejs:theme:bs3', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../theme'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        name: 'test-bs3',
        baseTheme: 'bs3'
      })
      .on('end', done);
  });

  it('should creates theme files', function () {
    assert.file([
      'we-t-test-bs3/files/public/README.md',
      'we-t-test-bs3/files/public/script.js',
      'we-t-test-bs3/files/public/style.css',
      'we-t-test-bs3/src/js',
      'we-t-test-bs3/src/less',
      'we-t-test-bs3/templates/server',
      'we-t-test-bs3/templates/server/layouts/default-layout.hbs',
      'we-t-test-bs3/README.md',
      'we-t-test-bs3/theme.js',
      'we-t-test-bs3/gulpfile.js',
      'we-t-test-bs3/package.json'
    ]);
  });
});

describe('wejs:theme:bs4', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../theme'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        name: 'test-bs4',
        baseTheme: 'bs4'
      })
      .on('end', done);
  });

  it('should creates theme files', function () {
    assert.file([
      'we-t-test-bs4/files/public/README.md',
      'we-t-test-bs4/files/public/script.js',
      'we-t-test-bs4/files/public/style.css',
      'we-t-test-bs4/src/js',
      'we-t-test-bs4/src/scss',
      'we-t-test-bs4/src/scss/style.scss',
      'we-t-test-bs4/templates/server',
      'we-t-test-bs4/templates/server/layouts/default-layout.hbs',
      'we-t-test-bs4/README.md',
      'we-t-test-bs4/theme.js',
      'we-t-test-bs4/gulpfile.js',
      'we-t-test-bs4/package.json'
    ]);
  });
});

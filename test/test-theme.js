'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('wejs:theme', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../theme'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        name: 'test'
      })
      .on('end', done);
  });

  it('should creates theme files', function () {
    assert.file([
      'we-theme-test/files/public/README.md',
      'we-theme-test/files/public/script.js',
      'we-theme-test/files/public/style.css',
      'we-theme-test/src/js',
      'we-theme-test/src/less',
      'we-theme-test/templates/email',
      'we-theme-test/templates/server',
      'we-theme-test/templates/server/layouts/default-layout.hbs',
      'we-theme-test/README.md',
      'we-theme-test/theme.js',
      'we-theme-test/gulpfile.js',
      'we-theme-test/package.json'
    ]);
  });
});

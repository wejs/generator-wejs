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
      'we-theme-test/assets/README.md',
      'we-theme-test/dist/scripts.js',
      'we-theme-test/dist/style.css',
      'we-theme-test/templates/email',
      'we-theme-test/templates/server',
      'we-theme-test/templates/server/layout.hbs',
      'we-theme-test/README.md',
      'we-theme-test/theme.js',
      'we-theme-test/package.json'
    ]);
  });
});

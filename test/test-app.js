/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('wejs:app', function () {
  var projectDir = path.join(os.tmpdir(), './temp-ptest');
  var p;
  before(function (done) {
    p = helpers.run(path.join(__dirname, '../app'))
      .inDir(projectDir)
      .withOptions({ 'skip-install': true })
      //.withArguments(['test'])
      .withPrompts({
        name: 'test'
      })
      .on('end', done);
  });

  it('creates project files', function() {
    assert.file([
      'we-project-test/server/controllers/main.js',
      'we-project-test/config/local.js',
      'we-project-test/config/log.js',
      'we-project-test/config/i18n.js',
      'we-project-test/config/clientside.js',
      'we-project-test/.gitignore',
      'we-project-test/.bowerrc',
      'we-project-test/app.js',
      'we-project-test/package.json',
      'we-project-test/plugin.js'
    ]);
  });
});

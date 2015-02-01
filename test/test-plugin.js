/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('wejs:plugin', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../plugin'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments('name', '--force')
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'lib/index.js',
      'lib/modelsAlter.js',
      'server/controllers/TempTestController.js',
      'server/models/TempTest.js',
      '.editorconfig',
      '.jshintrc',
      '.gitignore',
      '.jscsrc',
      '.npmignore',
      '.jshintignore'
    ]);
  });
});


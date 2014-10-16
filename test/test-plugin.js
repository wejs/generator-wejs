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
      'lib/init.js',
      'lib/modelsAlter.js',
      'api/controllers/Temp testController.js',
      'api/models/Temp test.js',
      '.editorconfig',
      '.jshintrc',
      '.gitignore',
      '.jscsrc',
      '.npmignore',
      '.jshintignore'
    ]);
  });
});

      // this.dest.mkdir('api');
      // this.dest.mkdir('api/controllers');
      // this.dest.mkdir('api/models');
      // this.dest.mkdir('api/services');

      // this.template('Controller.js', 'api/controllers/' + this.capitalizedName + 'Controller.js');
      // this.template('Model.js', 'api/models/' + this.capitalizedName + 'Model.js');

      // this.dest.mkdir('config');
      // this.copy('gitkeep', 'config/.gitkeep');

      // this.dest.mkdir('lib');
      // this.src.copy('lib/index.js', 'lib/index.js');
      // this.src.copy('lib/init.js', 'lib/init.js');
      // this.src.copy('lib/modelsAlter.js', 'lib/modelsAlter.js');

      // this.template('_package.json', 'package.json');
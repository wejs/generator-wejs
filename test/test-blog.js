/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('wejs:blog', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../blog'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments('name', '--force')
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'TempTest/api/controllers/MainController.js',
      'TempTest/api/responses/badRequest.js',
      'TempTest/api/responses/forbidden.js',
      'TempTest/api/responses/notFound.js',
      'TempTest/config/local.example',
      'TempTest/config/locales/pt-br.json',
      'TempTest/config/theme.js',
      'TempTest/client/app/emberApp.js',
      'TempTest/test/bootstrap.js',
      'TempTest/test/integration/api/ACL.test.js',
      'TempTest/test/mocha.opts',

      'TempTest/Gruntfile.js',
      'TempTest/.jshintrc',
      'TempTest/.gitignore',
      'TempTest/.bowerrc',
      'TempTest/app.js'
    ]);
  });
});


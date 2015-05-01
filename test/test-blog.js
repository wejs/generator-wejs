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
      .withPrompt(
        { name: 'temp test' },
        { title: 'temp test' }
      )
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'TempTest/server/controllers/main.js',
      'TempTest/config/local.js',
      'TempTest/config/locales/pt-br.json',
      'TempTest/config/clientside.js',
      'TempTest/config/i18n.js',
      'TempTest/config/themes.js',
      'TempTest/client/app/emberApp.js',
      // 'TempTest/test/bootstrap.js',
      // 'TempTest/test/mocha.opts',
      'TempTest/Gruntfile.js',
      'TempTest/.jshintrc',
      'TempTest/.gitignore',
      'TempTest/.bowerrc',
      'TempTest/app.js'
    ]);
  });
});


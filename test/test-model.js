'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('wejs:model', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../model'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      //.withArguments(['test'])
      .withPrompts({
        name: 'test'
      })
      .on('end', done);
  });

  it('should creates model file in server/models folder', function () {
    assert.file([
      'server/models/test.js'
    ]);
  });
});
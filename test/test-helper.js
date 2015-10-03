'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('wejs:helper', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../helper'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        name: 'test'
      })
      .on('end', done);
  });

  it('should creates helper file in server/helpers folder', function () {
    assert.file([
      'server/helpers/test.js',
    ]);
  });
});
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('wejs:widget', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../widget'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        name: 'test'
      })
      .on('end', done);
  });

  it('should creates widget files in server/widgets folder', function () {
    assert.file([
      'server/widgets',
      'server/widgets/test/form.hbs',
      'server/widgets/test/view.hbs',
      'server/widgets/test/index.js'
    ]);
  });
});
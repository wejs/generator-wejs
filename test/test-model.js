var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

describe('wejs:model', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../model'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withArguments(['test'])
      .on('end', done);
  });

  it('should creates model file in server/models folder', function () {
    assert.file([
      'server/models/test.js'
    ]);
  });
});
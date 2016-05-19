var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

describe('wejs:resource', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../resource'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      //.withArguments(['test'])
      .withPrompts({
        name: 'test'
      })
      .on('end', done);
  });

  it('should creates resource files', function () {
    assert.file([
      'server/models/test.js',
      'server/controllers/test.js',
      'server/resources/test.json',
      'test/features/resources/test.test.js',
    ]);
  });
});
var request = require('supertest');
var assert = require('assert');

describe('Honeypot', function() {
  it('POST honeypot should alert spam with spam IP', function (done) {
     if (!sails.config.auth.honeypot.key) {
      sails.log.warn('Cant test honeypot withouth sails.configs.auth.honeypot.key config');
      return done();
    }

    var ip = '200.206.12.250';
    sails.honeypot.query(ip, function(err, response) {
      assert.equal(err, null);
      assert.ok(response);
      assert.equal(response.ip, ip);
      assert.ok(response.found);
      assert.equal(response.type.suspicious, true);

      done();
    });
  });

  it('POST honeypot should alert spam with spam IP', function (done) {
    var ip = '157.86.8.72';

    if (!sails.config.auth.honeypot.key) {
      sails.log.warn('Cant test honeypot withouth sails.configs.auth.honeypot.key config');
      return done();
    }

    sails.honeypot.query(ip, function(err, response){
      assert.equal(err, null);
      assert.ok(response);
      assert.equal(response.ip, ip);
      assert.ok(response.found);
      assert.equal(response.type.searchEngine, false);
      assert.equal(response.type.suspicious, false);
      assert.equal(response.type.harvester, false);
      assert.equal(response.type.spammer, false);
      done();
    });

  });

  before(function(done){
    sails.config.auth.honeypot.checkInTests = true;
    done();
  });

  after(function(done) {
    sails.config.auth.honeypot.checkInTests = false;
    done();
  })
});
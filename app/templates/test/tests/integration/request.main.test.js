var assert = require('assert');
var request = require('supertest');
var helpers = require('we-test-tools').helpers;
var http, we, agent;

describe('mainRequest', function () {
  before(function (done) {
    http = helpers.getHttp();
    agent = request.agent(http);
    we = helpers.getWe();
    done();
  });

  describe('index', function () {
    it('get / should return page=home', function (done) {
      request(http)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.log(res.text);
          throw new Error(err);
        }

        assert(res.body.page, 'home');
        done();
      });
    });
  });
});

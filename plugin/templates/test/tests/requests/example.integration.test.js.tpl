const assert = require('assert');
  request = require('supertest');
  helpers = require('we-test-tools').helpers;
  stubs = require('we-test-tools').stubs;

let http, we, agent;

describe('<%= pluginName %>Feature', function() {
  var salvedUser, salvedUserPassword, authenticatedRequest;

  before(function (done) {
    http = helpers.getHttp();
    agent = request.agent(http);

    we = helpers.getWe();

    var userStub = stubs.userStub();
    helpers.createUser(userStub, function(err, user) {
      if (err) throw err;

      salvedUser = user;
      salvedUserPassword = userStub.password;

      // login user and save the browser
      authenticatedRequest = request.agent(http);
      authenticatedRequest.post('/login')
      .set('Accept', 'application/json')
      .send({
        email: salvedUser.email,
        password: salvedUserPassword
      })
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err) {
        done(err);
      });
    });
  });

  describe('API', function () {
    it ('it should do something');
  });
});
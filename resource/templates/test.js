var assert = require('assert');
var request = require('supertest');
var helpers = require('we-test-tools').helpers;
var stubs = require('we-test-tools').stubs;
var _ = require('lodash');
var http;
var we;

describe('<%= resourceName %>Feature', function () {
  var salvedPage, salvedUser, salvedUserPassword;
  var authenticatedRequest;

  before(function (done) {
    http = helpers.getHttp();
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
      .end(function (err, res) {
        if (err) throw err;

        done();
      });

    });
  });

  describe('find', function () {
    it('get /<%= resourceName %> route should find one <%= resourceName %>', function(done){
      request(http)
      .get('/<%= resourceName %>')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        assert.equal(200, res.status);
        assert(res.body.<%= resourceName %>);
        assert( _.isArray(res.body.<%= resourceName %>) , '<%= resourceName %> not is array');
        assert(res.body.meta);

        done();
      });
    });
  });
  describe('create', function () {
    it('post /<%= resourceName %> create one <%= resourceName %> record');
  });
  describe('findOne', function () {
    it('get /<%= resourceName %>/:id should return one <%= resourceName %>');
  });
  describe('update', function () {
    it('put /<%= resourceName %>/:id should upate and return <%= resourceName %>');
  });
  describe('destroy', function () {
    it('delete /<%= resourceName %>/:id should delete one <%= resourceName %>')
  });
});

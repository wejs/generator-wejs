var request = require('supertest');
var crypto = require('crypto');
var assert = require('assert');
var async = require('async');
var sinon   = require('sinon');

//var uuid = require('node-uuid');

var userStub = function() {
  var randString = crypto.randomBytes(20).toString('hex');
  return {
    username: randString.slice(0,15),
    biography:  randString + ' is a auto generated user!',
    email:  randString + '@albertosouza.net',
    password: '123',
    displayName: 'Afro Samuray',
    language: 'pt-br',
    active: true
  }
}

describe('AuthController', function() {
  var user;
  var sails;
  var cookieName;
  // before all create one user stub
  before(function(done) {
    sails = GLOBAL.sails;
    cookieName = sails.config.auth.cookieName;

    async.series([
      function createUser(done) {
        var uStub = userStub();
        var password = uStub.password;
        User.create(uStub)
        .exec( function(err, u){
          if( err ) {
            console.log(err);
            return done(err);
          }

          user = u;
          user.password = password;
          done();
        })
      }
    ], function(err){
      if (err) {
        console.error('Error on create stub data', err);
        return done(err);
      }
      done();
    });
  })

  describe('Unauthenticated', function() {
    describe('JSON Requests', function() {
      describe('POST', function() {

        it('/auth/login should login user and returns logged in user object', function (done) {
          var agent = request.agent(sails.hooks.http.app);

          agent.post('/auth/login')
          .send({
            email: user.email,
            password: user.password
          })
          .expect(200)
          .end(function(err, res) {
            if(err) return done(err);

            assert.ok(res.body);
            assert.ok(res.body.id);
            assert.equal(res.body.username, user.username);
            assert.equal(res.body.displayName, user.displayName);
            assert.equal(res.body.id, user.id);

            // do a seccond request to ensures how user is logged in
            agent.get('/account')
            .expect(200)
            .end(function(err, res) {
              if(err) return done(err);

              assert.ok(res.body);
              assert.ok(res.body.user);
              assert.equal(res.body.user.username, user.username);
              assert.equal(res.body.user.displayName, user.displayName);
              assert.equal(res.body.user.id, user.id);

              done();
            });
          });

        });

        // TODO check if register is blocked
        // it('POST /signup should register one user and login with valid data and without sails.config.site.requireAccountActivation', function (done) {

        //   sails.config.site.requireAccountActivation = false;
        //   var agent = request.agent(sails.hooks.http.app);
        //   var userData = userStub();
        //   userData.confirmPassword = userData.password;
        //   userData.confirmEmail = userData.email;

        //   agent.post('/signup')
        //   .send(userData)
        //   //.expect(201)
        //   .end(function(err, res) {
        //     if(err) return done(err);

        //     assert.ok(res.body);
        //     assert.ok(res.body.id);
        //     assert.equal(res.body.username, userData.username);
        //     assert.equal(res.body.displayName, userData.displayName);

        //     var salvedUser = res.body;

        //     // do a seccond request to ensures how user is logged in
        //     agent.get('/account')
        //     .expect(200)
        //     .end(function(err, res) {
        //       if(err) return done(err);

        //       assert.ok(res.body);
        //       assert.ok(res.body.user);
        //       assert.equal(res.body.user.username, salvedUser.username);
        //       assert.equal(res.body.user.displayName, salvedUser.displayName);
        //       assert.equal(res.body.user.id, salvedUser.id);

        //       done();
        //     });
        //   });

        // });

        // it('POST /signup should register one user and login with valid data and send email validation', function (done) {
        //   sails.config.site.requireAccountActivation = true;
        //   // spy email and showDebugEmail
        //   sinon.spy(sails.email, 'sendEmail');
        //   sinon.spy(sails.email, 'showDebugEmail');

        //   var agent = request.agent(sails.hooks.http.app);
        //   var userData = userStub();
        //   userData.confirmPassword = userData.password;
        //   userData.confirmEmail = userData.email;

        //   agent.post('/signup')
        //   .send(userData)
        //   .expect(201)
        //   .end(function(err, res) {
        //     if(err) return done(err);

        //     assert.ok(res.body);
        //     assert.ok(res.body.messages);
        //     assert.ok(res.body.messages);

        //     // check if email functions is called
        //     assert.equal(sails.email.sendEmail.called, true);
        //     assert.equal(sails.email.sendEmail.callCount, 1);
        //     assert.equal(sails.email.showDebugEmail.called, true);
        //     assert.equal(sails.email.showDebugEmail.callCount, 1);

        //     assert.ok(sails.email.sendEmail.args[0]);
        //     var args = sails.email.sendEmail.args[0];
        //     // check if user displayName and email is rigth
        //     assert.ok(args[0]);
        //     assert.equal(args[0].email, userData.email); // sender email
        //     assert.equal(args[1], 'AccontActivationEmail');
        //     assert.equal(args[2].user.displayName, userData.displayName);
        //     // restore sendEmail functions
        //     sails.email.sendEmail.restore();
        //     sails.email.showDebugEmail.restore();

        //     done();
        //   });
        // });
      })
    })
  })
});

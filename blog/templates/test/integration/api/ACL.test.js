var request = require('supertest');
var assert = require('assert');
var async = require('async');
var stubs = require('../../stubs.js');
var testUtils = require('../../testUtils.js');
var _ = require('lodash');


describe('ACL', function() {
  var authenticated, authenticated2, admin;

  // use this request.agent in authenticated requests
  var authenticatedRequest, authenticatedRequest2, adminRequest;

  var relato; 

  describe('anonymous', function (){
    it('Should allow not logged in users | RelatoController/find', function (done){
      request.agent(sails.hooks.http.app)
      .get('/relato')
      .expect(200)
      .end(function (err, res){
        if (err) throw err;
        
        assert.ok(res.body);
        assert.ok(res.body.relato);
        
        done();
      });
    });

    it('Should not allow not logged in users | RelatoController/create', function (done){
      request.agent(sails.hooks.http.app)
      .post('/relato')
      .expect(500)
      .end(function (err, res){
        if (err) throw err;

        done();
      });
    });
  });

  describe('authenticated/creator', function (){
    it('Should allow authenticated users | RelatoController/find', function (done){
      authenticatedRequest
      .get('/relato')
      .expect(200)
      .end(function (err, res){
        if (err) throw err;
        
        assert.ok(res.body);
        assert.ok(res.body.relato);
        
        done();
      });
    });

    it('Should allow authenticated users | RelatoController/create', function (done){
      var relatoInner = {
        titulo: 'BOZINHO BOZINHO BOZINHO'
      };

      authenticatedRequest
      .post('/relato')
      .send(relatoInner)
      .expect(201)
      .end(function (err, res){
        if (err) throw err;

        assert.ok(res.body);
        assert.ok(res.body.relato);
        assert.equal(res.body.relato[0].creator, authenticated.id);

        relato = res.body.relato[0];

        done();
      });
    });

    it('Should allow authenticated users if it is creator | RelatoController/update', function (done){
      var relatoInner = {      
        titulo: 'BOZINHO BOZINHO BOZINHO AZINHOAZINHO'
      };

      authenticatedRequest
      .put('/relato/' + relato.id)
      .send(relatoInner)
      .expect(200)
      .end(function (err, res){
        if (err) throw err;

        assert.ok(res.body);
        assert.ok(res.body.relato);
        assert.equal(res.body.relato.creator, authenticated.id);
        assert.equal(res.body.relato.titulo, relatoInner.titulo);

        done();
      });
    });

    it('Should not allow authenticated users but not creator| RelatoController/update', function (done){
      var relatoInner = {      
        titulo: 'BOZINHO BOZINHO BOZINHO AVIAO'
      };

      authenticatedRequest2
      .post('/relato/' + relato.id)
      .expect(500)
      .end(function (err, res){
        if (err) throw err;

        done();
      });

    });    

  });

  describe('admin', function (){
    it('Should allow authenticated users even if it is not creator | RelatoController/update', function (done){
      var relatoInner = {      
        titulo: 'BOZINHO BOZINHO BOZINHO AZINHOAZINHO BOLOZIHAHDSO'
      };

      adminRequest
      .put('/relato/' + relato.id)
      .send(relatoInner)
      .expect(200)
      .end(function (err, res){
        if (err) throw err;

        assert.ok(res.body);
        assert.ok(res.body.relato);      
        assert.equal(res.body.relato.titulo, relatoInner.titulo);

        done();
      });
    });
  });

  // Before all create one stub user and the memberRoles
  before(function(done) {

    async.series([
      function creteUserAuthenticated(cb){
        var uStub = stubs.userStub();
        var password = uStub.password;
        User.create(uStub)
        .exec( function(err, u){
          if( err ) {
            console.log(err);
            return cb(err);
          }
          authenticated = u;
          authenticated.password = password;
          cb();
        });
      },
      function creteUserAuthenticated2(cb){
        var uStub = stubs.userStub();
        var password = uStub.password;
        User.create(uStub)
        .exec( function(err, u){
          if( err ) {
            console.log(err);
            return cb(err);
          }
          authenticated2 = u;
          authenticated2.password = password;
          cb();
        });
      },      
      function creteUserAdmin(cb){
        var uStub = stubs.userStub();
        var password = uStub.password;
        User.create(uStub)
        .exec( function(err, u){
          if( err ) {
            console.log(err);
            return cb(err);
          }
          admin = u;
          admin.password = password;
          User.update({id: admin.id},{isAdmin: true}, function(err, userAdmin){
            if( err ) {
              console.log(err);
              return cb(err);
            }
            cb();            
          });
        });
      },    
      function createAuthenticatedRequest(cb) {
        var agent = request.agent(sails.hooks.http.app);
        agent.post('/auth/login')
        .send({
          email: authenticated.email,
          password: authenticated.password
        })
        .end(function(err) {
          // save the authenticated browser for use in requests
          authenticatedRequest = agent;
          cb(err);
        });
      },
      function createAuthenticatedRequest2(cb) {
        var agent = request.agent(sails.hooks.http.app);
        agent.post('/auth/login')
        .send({
          email: authenticated2.email,
          password: authenticated2.password
        })
        .end(function(err) {
          // save the authenticated browser for use in requests
          authenticatedRequest2 = agent;
          cb(err);
        });
      },      
      function createAdminRequest(cb) {
        var agent = request.agent(sails.hooks.http.app);
        agent.post('/auth/login')
        .send({
          email: admin.email,
          password: admin.password
        })
        .end(function(err) {
          // save the authenticated browser for use in requests
          adminRequest = agent;
          cb(err);
        });
      }
      ], function (err){
        if (err) {
          console.log('Error creating stub data');
          return done(err);
        }
        done();
    });

  });

  // after clear DB
  after(function(done){
    return testUtils.emptyDatabase(done);
  });
});
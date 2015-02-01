var request = require('supertest');
var stubs = require('../../stubs.js');
var assert = require('assert');
var async = require('async');
var testUtils = require('../../testUtils.js');


describe('AttributeController', function() {
  var user;
  var vocabulary;
  var relato;
  // before all create one user stub
  before(function(done) {
    var categories, tags;

    async.series([
      function createUser(done) {
        var uStub = stubs.userStub();
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
      },
      function createVocabulary(done) {
        Vocabulary.create(stubs.vocabulárioStub(user.id))
        .exec(function(err, v){
          if (err) return done(err);
          if (!v) return done('vocabularies dont created', err, v);
          sails.log.verbose('vocabulary created:', v);
          vocabulary = v;
          done();
        });
      },

      function createCategories(done) {
        Term.create(stubs.categoryStub(user.id, vocabulary.id))
        .exec(function(err, terms){
          if (err) return done(err);
          if (!terms) return done('terms dont created', err, terms);
          categories = terms;
          sails.log.verbose('terms created:', terms);
          done();
        });
      },
      function createTags(done) {
        Tag.create(stubs.tagStub(user.id))
        .exec(function(err, terms){
          if (err) return done(err);
          if (!terms) return done('tags dont created', err, terms);
          tags = terms;
          done();
        });
      },
      function createRelato(done) {
        var catIds =categories.map(function(c){
          return c.id;
        });

        var tagIds = tags.map(function(t){
          return t.id;
        })

        Relato.create(stubs.relatoStub(user.id, catIds, tagIds))
        .exec(function(err, r){
          if (err) return done(err);
          if (!r) return done('relato dont created', err, r);
          sails.log.verbose('tags created:', r);
          relato = r;
          done();
        });
      }

    ], function(err){
      if (err) {
        console.error('Error on create stub data', err);
        return done(err);
      }

      done();
    });
  })
  // after clear DB
  after(function(done){
    return testUtils.emptyDatabase(done);
  })

  // JSON REQUESTS //
  //
  describe('Authenticated', function() {
    var agent ;
    // after authenticated requests login the user
    before(function(done) {

      agent = request.agent(sails.hooks.http.app);

      agent.post('/auth/login')
      .send({
        email: user.email,
        password: user.password
      })
      .end(function(err) {
        done(err);
      });
    })

    describe('JSON Requests', function() {
      describe('POST', function() {
        it('/api/v1/relato/:id/titulo should update relato title and return 200', function (done) {
          var valueToUpdate = 'title updatedis!';

          agent.post('/api/v1/relato/' + relato.id + '/titulo')
          .set('Accept', 'application/json')
          //.set('X-CSRF-Token', testCsrfToken)
          .send({
            value: valueToUpdate
          })
          .expect(200)
          .end(function (err) {
            if(err) return done(err);

            sails.models.relato.findOne({id: relato.id})
            .exec(function(err, salvedRelato){
              if(err) return done(err);
              assert.ok(salvedRelato);
              assert.equal(salvedRelato.titulo, valueToUpdate);
              done();
            })
          });
        });

        it('/api/v1/relato/:id/invalidatribute should return bad request with invalid atribute');

        it('/api/v1/unknowmodel/:id/titulo should return bad request with unknow model');

        it('/api/v1/relato/:id/titulo should return not found with valid attribute and model but inexistent record');
      });
    });
  });
});

var request = require('supertest');
var assert = require('assert');

describe('Responses', function() {

  describe('HTML to Social Networks', function() {
    it('GET /relato should return a html page for facebook bot', function (done) {
        request(sails.hooks.http.app)
        .get('/relato')
        .set('user-agent', 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          assert.ok(res.text);
          assert.equal(res.type, 'text/html');
          done();
        });
    });

    it('GET /relato should html page for LinkedInBot', function (done) {
        request(sails.hooks.http.app)
        .get('/relato')
        .set('user-agent', 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Jakarta Commons-HttpClient/3.1 +http://www.linkedin.com)')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          assert.ok(res.text);
          assert.equal(res.type, 'text/html');
          done();
        });
    });
  });
});
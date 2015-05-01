module.exports = function(we, done) {
  we.db.models.user.find({ limit: 1}).then(function(user) {
    we.db.models.vocabulary.find(1)
    .then(function(v){
      if (v) {
        we.log.info('Vocabulary 1 already exists:', v.id);
        return done();
      }

      we.db.models.vocabulary.findOrCreate({
        where: {
          name: 'Category'
        },
        defaults: {
          creatorId : user.id,
          name: 'Category'
        }
      }).spread(function (v){
        we.log.info('Vocabulary created with id:', v.id);
        done();
      }).catch(done);
    }).catch(done);
  }).catch(done);
};
var async = require('async');

module.exports = function(we, done) {
  var pages = require('./data/pages.json');
  we.db.models.user.find({ limit: 1}).then(function (user) {

    var termFields = we.term.getModelTermFields(we.db.models.page);
    async.eachSeries(pages, function(page, next){
      page.creatorId = user.id;

      we.db.models.page.findOrCreate({
        where: {
          title: page.title
        },
        defaults: page
      }).spread(function (p, created) {
        if (created) {
          we.log.info('Page created: ', p.id, p.title);
        } else {
          we.log.info('Page exists: ', p.id, p.title);
        }

        we.term.updateModelTerms(
          page.categories,
          'page', p.id,
          'categories', termFields.categories,
        function(){
          next();
        });
      }).catch(next);
    }, done);
  }).catch(done);
};
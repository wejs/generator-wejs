var async = require('async');

module.exports = function(we, done) {
  var roles = require('./data/roles.json');

  async.eachSeries(roles, function(role, next){

    we.db.models.role.findOrCreate({
      where: { name: role.name },
      defaults: role
    }).spread(function (r, created) {
      if (created) {
        we.log.info('Role created: ', r.id, r.name);
        return next();
      } else {
        we.log.info('role exists then reset permissions: ', r.id, r.name);
        r.permissions = role.permissions;
        r.save().then(function() {
          next();
        });
      }

    }).catch(next);
  }, done);

};
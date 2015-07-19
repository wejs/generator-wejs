module.exports = function(we, done) {
  we.db.models.user.find({ limit: 1}).then(function(user) {
    if (!user) return done('First user not found');
    // check if the role exists
    we.db.models.role.find({ where:
      { name: 'administrator' }
    }).then(function (role) {
      if (!role) return done('administrator role not found');

      user.addRole(role).then(function() {
        we.log.info('role ' +role.name+ ' set to user ' + user.username);
        return done();
      }).catch(done);
    }).catch(done);
  }).catch(done);
};
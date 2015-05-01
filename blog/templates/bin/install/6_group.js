module.exports = function(we, done) {
  we.db.models.user.find({ limit: 1}).then(function(user) {
    we.db.models.group.create({
      creatorId : user.id,
      name: 'Welcome to We.js',
      description: 'We.js starter group',
      categories: [
        'Get started'
      ]
    })
    .done(function (err, g) {
      if (err) return done(err);
      we.db.models.activity.create({
        modelName: 'group',
        modelId: g.id,
        actor: user.id,
        action: 'create',
        groupId: g.id
      }).then(function () {
        done();
      }).catch(done);
    });
  }).catch(done);
};
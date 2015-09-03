module.exports = function(we, done) {
  we.db.models.user.find({ limit: 1}).then(function(user) {
    we.db.models.room.create({
      creatorId : user.id,
      name: 'First example room',
      description: 'First we.js example room'
    })
    .then(function (r) {
      var roommessages = [
        'Amazing!',
        'Others users in same room will receive my posts!',
        'This is a iframe and may be added in any page.',
        'Login and try it!'
      ];
      we.utils.async.each(roommessages, function (m, next) {
        we.db.models.roommessage.create({
          roomId: r.id,
          content: m,
          creatorId: user.id
        }).then(function () {
          next();
        }).catch(next);
      },done);
    });
  }).catch(done);
};
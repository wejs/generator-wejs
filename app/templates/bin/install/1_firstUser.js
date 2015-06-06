module.exports = function(we, done, sget, program) {
  we.db.models.user.find(1)
  .then(function(u) {
    if (u) {
      we.log.info('User 1 already exists: ', u.get());
      return done();
    }

    var userStub = {
      username: 'administrator',
      biography: 'The administrator user account!',
      email: 'contato@albertosouza.net',
      password: '123',
      displayName: 'Administrator',
      language: 'pt-br',
      active: true
    };

    we.log.info('--- User creation: ----');

    if (program.setUserData) {

      // alows user set new user data
      var whantsSendUserData = sget('You want to set first user data?. \n y or n?');
      // remove \n
      whantsSendUserData = whantsSendUserData.replace('\n','');

      if ( whantsSendUserData === 'y') {
        userStub.displayName = sget('What is the displayName?');
        userStub.displayName = userStub.displayName.replace('\n','');
        userStub.username = sget('What is the username?');
        userStub.username = userStub.username.replace('\n','');
        userStub.email = sget('What is the email?');
        userStub.email = userStub.email.replace('\n','');
        userStub.password = sget('What is the password?');
        userStub.password = userStub.password.replace('\n','');
      }
    }

    we.log.info('I will create the user: ', userStub);

    we.db.models.user.create(userStub)
    .done(function (err, u) {
      if (err) return done(err);

      we.log.info('New User with id: ', u.id);

      u.updatePassword(userStub.password , function(error) {
        if (error) return done(error);
        return done();
      });
    });
  }).catch(done);
};
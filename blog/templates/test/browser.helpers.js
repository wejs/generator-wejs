
var helpers = {};

var exampleUser = {
  username: 'afrosamuray',
  biography: 'Afro Samuray is a hero how help people',
  email: 'contato@albertosouza.net',
  password: 'password',
  displayName: 'Afro Samuray'
}

helpers.createUserAndLogin = function createUserAndLogin(browser, done) {
  return helpers.createUser(null, function(err, user) {
    return helpers.loginUser(browser, user, done);
  })
}

helpers.loginUser = function loginUser(browser, user, done) {
  var classeDoFormDeLogin = 'form[name=loginForm]';

  // clica no botão de Criar relato
  browser.pressButton('.navbar-login-button', function(e) {
    if (e) {
      console.error(e);
      return done(e);
    }
    if (browser.error) {
      console.dir('Errors on open login modal reported:', browser.errors);
      return done(browser.error);
    }

    // fill the login form
    browser.
    fill(classeDoFormDeLogin + ' input[name=email]', user.email).
    fill(classeDoFormDeLogin + ' input[type=password]', 'password');

    browser.pressButton('#loginButton', function(e) {
      if (e) {
        console.error(e);
        return done(e);
      }
      if (browser.error) {
        console.dir('Errors on open login modal reported:', browser.errors);
        return done(browser.error);
      }
        return done(null, user, browser);
    });
  });
}


helpers.createUser = function createUser(user, done) {
  if (!user) {
    user = exampleUser;
  }

  return User.create(user)
  .exec(function(err, salvedUser) {
    if (err) {
      console.log('Error on create user', err);
    }
    return done(err, salvedUser)
  })
}

module.exports = helpers;
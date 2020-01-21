module.exports = {
  /**
   * Install function run in we.js project install.
   *
   * @param  {Object}   we    we.js object
   * @param  {Function} done  callback
   */
  install(we, done) {
    we.log.info('Starting project install...');

    let fns = [];

<% if (appConfigs.createFirstUser && (appConfigs.createFirstUser == 'yes')) { %>
    fns.push(function registerUser1(done) {
      let user1 = {
        username: '<%= appConfigs.userName %>',
        email: '<%= appConfigs.userEmail %>',
        password: '<%= appConfigs.userPassword %>', // change after install
        displayName: '<%= appConfigs.userDisplayName %>',
        active: true,
        roles: ['administrator']
      };

      we.log.info('I will create the user: ', user1);

      we.db.models.user.findOrCreate({
        where: { email: user1.email },
        defaults: user1
      })
      .spread( (user, created)=> {
        we.log.info('New User with id: ', user.id);
        // install we-plugin-auth for use password
        if (!we.db.models.password) return done();
        // set the password
        return we.db.models.password.create({
          userId: user.id,
          password: user1.password,
          confirmPassword: user1.password
        })
        .then( ()=> {
          return done();
        })
      })
      .catch(done);
    });
<% } %>
<% if (appConfigs.addDefaultMenus) { %>
    fns.push(function createDefaultMenus(done) {
      we.utils.async.series([
        function createMainMenu(done) {
          we.db.models.menu.create({
            name: 'main',
            class: 'nav navbar-nav collapse navbar-collapse'
          }).then(function (r){
            we.log.info('New menu with name: '+r.name+' and id: '+r.id);
            // then create menu links
            we.db.models.link.bulkCreate([
              {
                href: '/',
                text: 'Home',
                title: 'Home page',
                menuId: r.id
              },
              {
                href: '/article',
                text: 'Articles',
                title: 'Articles',
                menuId: r.id
              }
            ]).then(function(){
              done();
            }).catch(done);
          }).catch(done);
        },
        function createSocialMenu(done) {
          we.db.models.menu.create({
            name: 'social',
            class: 'list-inline text-center'
          }).then(function (r) {
            we.log.info('New menu with name: '+r.name+' and id: '+r.id);
            // then create menu links
            we.db.models.link.bulkCreate([
              {
                href: '#',
                text: '<i class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></i>',
                title: 'Twitter',
                menuId: r.id
              },
              {
                href: '#',
                text: '<i class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></i>',
                title: 'Facebook',
                menuId: r.id
              },
              {
                href: '#',
                text: '<i class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-github fa-stack-1x fa-inverse"></i></i>',
                title: 'Github',
                menuId: r.id
              }
            ]).then(function(){
              done();
            }).catch(done);
          }).catch(done);
        }
      ], done);
    });
<% } %>

    we.utils.async.series(fns, done);
  }
};

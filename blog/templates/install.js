module.exports = {
  /**
   * Install function run in we.js site install.
   *
   * @param  {Object}   we    we.js object
   * @param  {Function} done  callback
   */
  install(we, done) {
    we.log.info('Starting project install...');

    we.utils.async.series([
<% if (appConfigs.createFirstUser && (appConfigs.createFirstUser == 'yes')) { %>
      function registerUser1(done) {
        let user1 = {
          username: '<%= appConfigs.userName %>',
          email: '<%= appConfigs.userEmail %>',
          password: '<%= appConfigs.userPassword %>', // change after install
          displayName: '<%= appConfigs.userDisplayName %>',
          active: true,
          roles: ['administrator']
        };

        we.log.info('I will create the user: ', user1);

        we.db.models.user.create(user1)
        .then( (user)=> {
          we.log.info('New User with id: ', user.id);
          // set the password
          we.db.models.password.create({
            userId: user.id,
            password: user1.password,
            confirmPassword: user1.password
          }).then( ()=> {
            return done();
          }).catch(done);
        });
      },
<% } %>
      function createDefaultMenus(done) {
        we.utils.async.series([
          function createMainMenu(done) {
            we.db.models.menu.create({
              name: 'main',
              class: 'nav navbar-nav collapse navbar-collapse'
            }).then( (r)=> {
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
                },
                {
                  href: 'https://github.com/albertosouza',
                  text: 'Github',
                  menuId: r.id
                },
                {
                  href: 'https://plus.google.com/+AlbertoSouzaSantos',
                  text: 'Google+',
                  title: 'Google plus',
                  menuId: r.id
                }
              ]).then( ()=> {
                done();
              }).catch(done);
            }).catch(done);
          },
          function createSocialMenu(done) {
            we.db.models.menu.create({
              name: 'social',
              class: 'list-inline text-center'
            }).then( (r)=> {
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
              ]).then( ()=> {
                done();
              }).catch(done);
            }).catch(done);
          }
        ], done);
      },

      function createFirstSettings(done) {
        we.db.models['system-setting']
        .bulkCreate([{
          key: 'siteName',
          value: '<%= projectName %>'
        }, {
          key: 'menuMainId',
          value: '1'
        }, {
          key: 'menuSocialId',
          value: '2'
        }, {
          key: 'siteDescription',
          value: `Site <%= projectName %>`
        }, {
          key: 'emailContact',
          value: `<%= appConfigs.userName %> <<%= appConfigs.userEmail %>>`
        }, {
          key: 'siteFooter',
          value: `<p><%= projectName %> ©</p>`
        }, {
          key: 'metatagKeywords',
          value: 'We.js'
        },{
          key: 'sitePhone1',
          value: '+55 21 99831-4202'
        },{
          key: 'siteEmail1',
          value: '<%= appConfigs.userEmail %>'
        },
        {
          key: 'siteEmail2',
          value: '<%= appConfigs.userEmail %>'
        }
        ])
        .spread( ()=> {
          done();
          return null;
        })
        .catch(done);
      },
      function createContents(done) {
        const data = [{
          title: 'Lorem Ipsum',
          about: 'Example!',
          body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rhoncus auctor maximus. Sed molestie enim eu ligula interdum, id posuere mi scelerisque. Aenean nec ligula eget tortor molestie fermentum ac quis eros. Curabitur iaculis mattis felis, vel sodales enim maximus hendrerit. Curabitur faucibus ut leo aliquam semper. Praesent mollis ut ligula malesuada dictum. Vivamus nec sem non dui blandit volutpat quis in ligula. Integer dignissim justo id lacus congue molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse justo eros, fringilla a imperdiet vel, viverra in odio.</p><p>Etiam rhoncus enim dignissim, condimentum metus at, porttitor urna. Aliquam et est vitae lectus gravida malesuada. Ut vulputate nibh nulla, eget eleifend diam pellentesque non. Vestibulum suscipit nunc felis, ut pharetra nunc aliquet vel. Ut pharetra ac nisi quis tristique. Aliquam lacus urna, mattis at tortor at, varius vehicula dolor. Praesent aliquet eu magna nec maximus. Nullam sit amet orci non turpis vehicula dapibus. Donec quis iaculis quam, in congue turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non tincidunt nisi. Aenean ligula augue, sagittis nec erat eu, sollicitudin venenatis diam. Pellentesque egestas tortor nec nibh posuere egestas sit amet vehicula magna. Pellentesque mattis enim lorem, vitae posuere erat luctus quis.</p>`,
          published: true,
          creatorId: 1
        }];

        we.utils.async.eachSeries(data, (p, done)=> {
          we.db.models.content
          .create(p)
          .then( ()=> {
            done();
            return null;
          })
          .catch(done);
        }, done);
      },
      function createExampleArticle(done) {
        const data = [{
          title: 'Lorem Ipsum article',
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam...',
          body: `<p>Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit. Aliquam rhoncus auctor maximus. Sed molestie enim eu ligula interdum, id posuere mi scelerisque. Aenean nec ligula eget tortor molestie fermentum ac quis eros. Curabitur iaculis mattis felis, vel sodales enim maximus hendrerit. Curabitur faucibus ut leo aliquam semper. Praesent mollis ut ligula malesuada dictum. Vivamus nec sem non dui blandit volutpat quis in ligula. Integer dignissim justo id lacus congue molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse justo eros, fringilla a imperdiet vel, viverra in odio.</p><p>Etiam rhoncus enim dignissim, condimentum metus at, porttitor urna. Aliquam et est vitae lectus gravida malesuada. Ut vulputate nibh nulla, eget eleifend diam pellentesque non. Vestibulum suscipit nunc felis, ut pharetra nunc aliquet vel. Ut pharetra ac nisi quis tristique. Aliquam lacus urna, mattis at tortor at, varius vehicula dolor. Praesent aliquet eu magna nec maximus. Nullam sit amet orci non turpis vehicula dapibus. Donec quis iaculis quam, in congue turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non tincidunt nisi. Aenean ligula augue, sagittis nec erat eu, sollicitudin venenatis diam. Pellentesque egestas tortor nec nibh posuere egestas sit amet vehicula magna. Pellentesque mattis enim lorem, vitae posuere erat luctus quis.</p>`,
          published: true,
          creatorId: 1,
          tags: ['example']
        }];

        we.utils.async.eachSeries(data, (p, done)=> {
          we.db.models.article
          .create(p)
          .then( ()=> {
            done();
            return null;
          })
          .catch(done);
        }, done);
      }
    ], done);
  }
};

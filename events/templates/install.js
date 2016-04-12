var async, _, user;

module.exports = {
  /**
   * Install function run in we.js site install.
   *
   * @param  {Object}   we    we.js object
   * @param  {Function} done  callback
   */
  install: function install(we, done) {
    we.log.info('Starting project install...');

    async = we.utils.async;
    _ = we.utils._;

    we.utils.async.series([
      function registerUser1(done) {
        var user1 = {
          username: 'administrator',
          biography: 'The administrator user account!',
          email: 'contato@albertosouza.net',
          password: '123', // change after install
          displayName: 'Administrator',
          language: 'en-us',
          active: true,
          roles: ['administrator']
        };

        we.log.info('I will create the user: ', user1);

        we.db.models.user.findOrCreate({
          where: { id :1 }, defaults: user1
        }).then(function (r) {
          var user = r[0];
          we.log.info('New User with id: ', user.id);

          we.db.models.password.create({
            userId: user.id,
            password: user1.password,
            confirmPassword: user1.password
          }).then(function () {
            return done();
          }).catch(done);
        });
      },
      function createVocabulary(done) {
        we.db.models.vocabulary.findById(1)
        .then(function(v) {
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
      },

      function createExampleConference(done) {
        we.db.models.event.create({
          abbreviation: 'CIPSSP-V',
          title: 'V CONGRESSO INTERNACIONAL DE PEDAGOGIA SOCIAL & SIMPÓSIO DE PÓS-GRADUAÇÃO',
          about: 'Os Congressos Internacionais de Pedagogia Social (CIPS) são organizados pelo Grupo de Pesquisa Pedagogia Social, da Faculdade de Educação da USP, a Associação Brasileira de Pedagogia Social (ABRAPSocial) e pelas instituições de ensino superior e grupos de pesquisas nomeados neste regulamento e constituem espaços de discussão, de reflexão, de articulação e de avaliação das práticas de Educação Social, popular e comunitária que têm a Pedagogia Social como principal referencial teórico e metodológico.',
          registrationManagerName: 'Alberto Souza',
          registrationManagerEmail: 'contato@albertosouza.net',
          location: 'Brasil, Rio de Janeiro',
          tags: ['educação', 'saúde'],
          callForPapersStartDate: Date.now(),
          callForPapersEndDate: Date.now(),
          registrationStartDate: Date.now(),
          registrationEndDate: Date.now(),
          eventStartDate: Date.now(),
          eventEndDate: Date.now(),
          published: true
        }).then(function after(r) {
          we.log.info('Event created: ', r.id, r.title);
          done();
        }).catch(done);
      },
      function createDefaultMenus (done){
        we.db.models.menu.findOrCreate({
          where: { 'name': 'main'},
          defaults: {
            name: 'main',
            class: 'nav navbar-nav'
          }
        }).then(function (rs){
          var r = rs[0];

          we.log.info('New menu with name: '+r.name+' and id: '+r.id);
          // then create menu links
          we.db.models.link.bulkCreate([
            {
              href: '/',
              text: 'Home',
              title: 'Home page',
              menuId: r.id
            }, {
              href: '/event',
              text: 'Events',
              title: 'Events list',
              menuId: r.id
            },
          ]).then(function(){
            we.log.info('Done create default menus');
            done();
          }).catch(done);
        }).catch(done);
      }
    ], done);
  }
};
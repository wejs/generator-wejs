/**
 * Example local environment settings
 *
 * Copy to local.js and set your configs
 *
 *
 * For more information, check out:
 * http://sailsjs.org/#documentation
 */

var DOMAIN = 'http://blog.wejs.dev';
var PORT = '1630';
var HOST = DOMAIN + ':' + PORT;

module.exports = {
  appName: 'Simple We.js Blog',

  acl: {
    // Change to false in production after configure your permissions in /admin#/permissions
    // this config disables acl feature
    disabled: false
  },

  auth: {
    cookieDomain: null,
    isProvider: true
  },

  wejs: {
    providers: {
      wembed: 'http://wembed.wejs.org',
      accounts: HOST,
      api: HOST,
      cookieDomain: HOST
    }
  },

  // change to true to force browser refresh javascript cache automaticaly
  // use it only for development
  forceBrowserCacheRefresh: true,

  fileUploadPath: 'files/uploads/files',
  imageUploadPath: 'files/uploads/images',

  port: process.env.PORT || PORT,

  emberjs: {
    // dont send related model in same request as current find model
    sendRelatedModel: false
  },

  /**
   * Client side configs
   * @type {Object}
   */
  clientside: {
    // change to true to force browser refresh javascript cache automaticaly
    // use it only for development
    forceBrowserCacheRefresh: true,

    enableLiveReload: false,

    // we.js logs
    log: {
      events: true,
      hooks: true
    },

    publicVars: {
      appLogo: '/core/images/logo.png',
      appName: 'Simple We.js Blog',
      appAbout: 'A We.js Blog Theme with Start Bootstrap clean theme',

      // default background images
      blogHomeBg: '/core/images/bgs/home-bg.jpg',
      blogArticlesBg: '/core/images/bgs/post-bg.jpg',

      // footer social links
      socialLinks: {
        google: 'https://plus.google.com/+AlbertoSouzaSantos',
        twitter: 'https://twitter.com/albertosouza_js',
        facebook: 'https://www.facebook.com/alberto.souza.jr',
        github: 'https://github.com/albertosouza'
      },

      menus: {
        // your app main menu
        main: {
          links: [
            {
              text: 'Home',
              type: 'page',
              model: 'home'
            },
            {
              text: 'About',
              type: 'resource',
              model: 'article',
              modelId: '1'
            },
            {
              text: 'Posts',
              type: 'page',
              model: 'articles'
            },
            {
              text: 'Google+',
              external: true,
              href: 'https://plus.google.com/+AlbertoSouzaSantos',
              target: '_blank'
            }
          ]
        },

        admin: {
          links: [
            // // Submenu item example
            // {
            //   text: 'User and permissions',
            //   isSubmenu: true,
            //   links: [
            //     {
            //       text: 'User',
            //       type: 'resource',
            //       model: 'user'
            //     }
            //   ]
            // },
            // 

            {
              i18nText: 'menu.link.articles',
              type: 'resource',
              model: 'articles'
            },

            {
              i18nText: 'menu.link.vocabulary',
              type: 'resource',
              model: 'vocabularies'
            },

            {
              i18nText: 'menu.link.user',
              type: 'resource',
              model: 'user'
            },

            {
              i18nText: 'menu.link.permissions',
              type: 'resource',
              model: 'permissions'
            }
          ]
        }        
      }
    } // end publicVars

  },

  environment: process.env.NODE_ENV || 'development',
  //environment: process.env.NODE_ENV || 'production',
  hostname: HOST,

  site: {
    // if true send a activation email for new
    // accounts and only alow users login after account activation
    requireAccountActivation: false
  },
  //environment: 'production',

  email: {
    fromName: 'Simple We.js Blog',
    siteEmail: 'contato@wejs.org',
    // if defaultService is set to test it will log emails in terminal
    defaultService: 'test',
    services: {
      Mandrill: {
        service: 'Mandrill',
        type: 'SMTP',
        host: 'smtp.mandrillapp.com',
        port: 587,
        debug: true,
        auth: {
          user: 'mandrillEmail',
          pass: 'mandrillKey' // test mandrill key
        }
      },
      gmail: {
        service: 'gmail',
        type: 'SMTP',
        auth: {
          user: 'email',
          pass: 'password'
        }
      }
    }
  },

  // test database, use mysql in all databases
  connections: {
    mysql: {
      module   : 'sails-mysql',
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : '',
      database : 'test'
    },
    test: {
      module   : 'sails-mysql',
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : '',
      database : 'test'
    },
  },

  models: {
    // alter, drop and safe
    // change migrate config to safe for fast start
    migrate: 'safe',
    connection: 'mysql'
  },

  session: {
    adapter: 'redis',
    cookie: {
      maxAge: 60 * 24 * 60 * 60 * 1000 // 60 days
    }
  }
};
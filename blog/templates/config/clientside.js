
module.exports.clientside = {
  publicVars: {
    appLogo: '/core/images/logo.png',
    appName: 'We.js site',
    appAbout: 'A We.js Blog Theme with Start Bootstrap clean theme',

    // default background images
    blogHomeBg: '/core/images/bgs/home-bg.jpg',
    blogArticlesBg: '/core/images/bgs/post-bg.jpg',

    // footer social links
    socialLinks: {
      twitter: 'https://twitter.com/we_js',
      github: 'https://github.com/wejs/we'
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
            text: 'Get started',
            type: 'resource',
            model: 'page',
            modelId: '1'
          },
          {
            text: 'Features',
            type: 'resource',
            model: 'page',
            modelId: '3'
          },
          {
            text: 'Forum',
            type: 'page',
            model: 'groups'
          },
          {
            text: 'Github',
            external: true,
            href: 'https://github.com/wejs/we',
            target: '_blank'
          }
        ]
      },

      'Get started': {
        links: [
          {
            text: 'About',
            type: 'resource',
            model: 'page',
            modelId: '1'
          },
          {
            text: 'Instalation',
            type: 'resource',
            model: 'page',
            modelId: '2'
          },
        ]
      },

      'Features': {
        links: [
          {
            text: 'Features',
            type: 'resource',
            model: 'page',
            modelId: '3'
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
            i18nText: 'menu.link.page',
            type: 'resource',
            model: 'pages'
          },

          // {
          //   i18nText: 'menu.link.url',
          //   type: 'resource',
          //   model: 'urls'
          // },


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
};
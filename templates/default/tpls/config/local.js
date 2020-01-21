/**
 * Example config, copy this file to locals.js
 */
module.exports = {
  // hostname: 'http://wejs.org',

  security: {
    // see https://github.com/expressjs/cors#configuration-options for  all CORS configuration options
    // This may be override by every route configs
    CORS: {
      // allow CORS requests by default
      origin: function(origin, cb){ cb(null, true); },
      // default methods
      methods: [
        'GET',
        'OPTIONS',
        'POST',
        'PATCH',
        'UPDATE',
        'DELETE'
      ],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Access-Control-Allow-Credentials'
      ],

      credentials: true
    }
  },

  // i18n: {
  //   updateFiles: false
  // },

  // // Local email configuration, in some we.js projects this may be set in admin with systemSettings
  //
  // email: {
  //   // default mail options
  //   mailOptions: {
  //     // by default log emails in console
  //     sendToConsole: false,
  //     // default from and to
  //     from: 'Alberto Souza <contato@albertosouza.net>', // sender address
  //     subject: 'Blog # ', // Subject line
  //   },
  //   // connection configs
  //   auth: {
  //     user: 'mandrillemail@email',
  //     pass: 'password'
  //   },
  //   // ignoreTLS: false,
  //   // name: null,
  //   // optional params
  //   service: 'Mandrill',
  //   type: 'SMTP',
  //   host: 'smtp.mandrillapp.com',
  //   port: 587,
  //   debug: true,
  //   // secure: 'true',
  //   // localAddress: '',
  //   // connectionTimeout: '',
  //   // greetingTimeout: '',
  //   // socketTimeout: '',

  //   // authMethod: '',
  //   // tls: ''
  // },

  acl: {
    disabled: false
  },

  enableRequestLog: false,

  // Local database configuration, see database.js file for configuration options with env var
  database: {
    prod: {},
    dev: {},
    test: {}
  }
}

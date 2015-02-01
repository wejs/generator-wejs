/**
 * Test starter - with this version of sails.js we can only start one sails server,
 * to solve this problem we use only one before All and after All to start and
 * stop the server
 */
var Sails = require('sails');
var themeEngine = require('we-theme-engine');
var WP = require('we-plugin');
var _ = require('lodash')
var testUtils = require('./testUtils');

global.DOMAIN = 'http://localhost';
global.PORT = 1420;
global.HOST = DOMAIN + ':' + PORT;

before(function(callback) {
  this.timeout(35000);

  var configs = WP.getDefaultSailsConfigForCLI();

  delete configs.hooks.grunt;

  configs = _.merge(configs, {
    requireAccountActivation: false,
    log: {
      level: 'info'
    },
    models: {
      migrate: 'drop',
      connection: 'test'
    },
    auth: {
      cookieDomain: null,
    },
    port: PORT,
    environment: 'test',
    // @TODO needs suport to csrf token
    csrf: false,
    hooks: {
      grunt: false,
      socket: false,
      pubsub: false
    },
    email: {
      defaultService: 'test'
    },
    paths: {
      'fallbackEmailTemplateFolder': __dirname + '/node_modules/wejs-theme-default/templates/email'
    },
    wejs: {
      providers: {
        wembed: 'http://wembed.wejs.dev',
        accounts: HOST,
        api: HOST,
        cookieDomain: null
      }
    }
  });

  Sails.load(configs, function(err, sails) {
    if (err) {
      console.error(err);
      return callback(err);
    }

    // here you can load fixtures, etc.
    callback(err, sails);
  });
});

after(function(done) {
  sails.lower(done);
});
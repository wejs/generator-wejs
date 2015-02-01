/**
 * app.js
 *
 * For example:
 *   => `node app.js`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *   => `modulus deploy`
 *   => `heroku scale`
 *
 *
 * The same command-line arguments are supported, e.g.:
 * `node app.js --silent --port=80 --prod`
 */

var WP = require('we-plugin');
var sails = require('sails');
var rc = require('rc');

// Start server
sails.lift( rc('sails', WP.getDefaultSailsConfig() ));


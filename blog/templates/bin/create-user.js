/**
 * A helper script to create one user
 *
 * usage: in project folder type "node bin/create-user.js"
 */

var loadSails = require('./loadSails.js');
var createUserFN = require('../node_modules/we-plugin-user/bin/createUserFN.js');

function init() {
  return loadSails(function afterLoadSails(err, sails) {
	  createUserFN(function(err, u) {
	    if (err) return doneAll(err);

      sails.log.info('New user:', u);

	    doneAll();
	  })
  });
}

function doneAll(err){
  if ( err ) {
    sails.log.error('Error on create user:', err);
  }
  //sails.load();
  // end / exit
  process.exit();
}

init();
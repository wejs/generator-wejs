/**
 * A helper script to create one user
 *
 * usage: in project folder type "node bin/createDefaultPermissions.js"
 */

var loadSails = require('./loadSails.js');

var async = require('async');

var defaultRoles = require('./data/role.json');
var defaultPermissions = require('./data/permission.json');

function init() {
  return loadSails(function afterLoadSails(err, sails) {
  	if (err) return doneAll(err);

  	async.series([
      // function loadRoles(done) { 
      //   sails.models.role.create(defaultRoles.role)
      //   .exec(function(err, roles) {
      //     if(err) return done(err);

      //     sails.log.info('New Roles:', roles);
          
      //     done();
      //   })
      // }, 
      function loadPermissions(done) {
        sails.models.permission.create(defaultPermissions.permission)
        .exec(function(err, permissions) {
          if(err) return done(err);

          sails.log.info(permissions.length + ' permissions created');
          done();
        })
      }
  	], doneAll);

  });
}

function doneAll(err) {
  if ( err ) {
    sails.log.error('Error on load default roles and permissions', err);
  }
  //sails.load();
  // end / exit
  process.exit();
}

init();
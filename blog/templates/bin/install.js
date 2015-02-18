var async = require('async');
var exec = require('child_process').exec;
var sget = require('sget');
var fs = require('fs');
var createUserFN = require('../node_modules/we-plugin-user/bin/createUserFN.js');
var loadSails = require('./loadSails.js');
var isInstaled = require('./isInstaled.js');

// // skip if are instaled
if (isInstaled()) {
  console.log('Already instaled, skipping installation');
  return process.exit();
}

// askTheUserIfWhantsReinstall
console.log('-');
console.log('--');
console.log('--- We.js install, reinstall and reset ----');
console.log('--- This script resets and reinstall this we.js project | create one backup of your data after proceed  ----');
console.log('--');
console.log('-');


var confirm = process.argv[2];
if (!confirm || (confirm != 'y' || confirm != 'n')) {
  confirm = sget('Are you sure you want to reinstall the app and delete all data??. \n y or n?');
  confirm = confirm.replace('\n','');
}

if (confirm === 'y') {
  doTheWork();
} else {
  console.log('Leaving without taking any action.');
}

function doTheWork() {
  return loadSails(function afterLoadSails(err, sails) {
    async.series([
      function resetDb(done) {
        exec('node bin/resetDB.js y', function (error, stdout, stderr) {
          console.log(stdout);

          done(stderr);
        });
      },
      function createUser(done) {
        createUserFN(function(err, u) {
          if (err) return done(err);
          sails.log.info('New user:', u);
          done();
        })
      },
      function setUser1AsAdmin(done) {
        exec('node bin/setUserAsAdmin.js 1', function (error, stdout, stderr) {
          console.log(stdout);
          done(stderr);
        });
      },
      function createDefaultPermissions(done) {
        exec('node bin/createDefaultPermissions.js', function (error, stdout, stderr) {
          console.log(stdout);
          done(stderr);
        });
      },
      function CreateExampleData(done) {
        exec('node bin/create-stub-data.js', function (error, stdout, stderr) {
          console.log(stdout);
          done(stderr);
        });
      },
      function SetInstalationFlag(done) {
        var instalationFIleValue = 'module.exports.installation = { done: true };';
        fs.writeFile(process.cwd() + '/config/installation.js', instalationFIleValue, function(err) {
          if (err) return done(err); 
          done();
        });
      }
    ], doneAll)
  })
}

function doneAll(err) {
  if ( err ) {
    sails.log.error('Error:', err);
  } else {
    sails.log.info('Installation done.')
  }
  //sails.load();
  // end / exit
  process.exit();
}
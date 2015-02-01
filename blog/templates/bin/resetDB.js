var Sails = require('sails');
var sget = require('sget');

function init() {

  console.log('-');
  console.log('--');
  console.log('--- Database drop!!! DANGER!!! ----');
  console.log('--');
  console.log('-');

  // alows user set new user data
  var confirm = sget('Are you sure you want to reset the database??. \n y or n?');
  confirm = confirm.replace('\n','');


  if (confirm === 'y') {
    Sails.load({
      port: 1930,
      hooks: {
        grunt: false,
        socket: false,
        pubsub: false
      },
      models: {
        migrate: 'drop'
      },
      orm: {
        _hookTimeout: 50000
      },
      environment: 'development'
    },function loadSailsToDropDB(err, sails) {
    if (err) {
      return doneAll(err);
    }
      // here you can load fixtures, etc.
      return doneAll(err);
    });
  } else {
    return doneAll();
  }
}

function doneAll(err){
  if ( err ) {
    sails.log.error('Error on create stub data', err);
  }
  //sails.load();
  // end / exit
  return process.exit();
}

init();

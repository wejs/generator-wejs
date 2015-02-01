var Sails = require('sails');

function init() {
  Sails.load({
    port: 1930,
    hooks: {
      grunt: false,
      socket: false,
      pubsub: false
    },
    models: {
      migrate: 'alter'
    },
    orm: {
      _hookTimeout: 50000
    },
    environment: 'development'
  }, doneAll);
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

var loadSails = require('./loadSails.js');
var locations = require('../node_modules/we-plugin-location/bin/registerAllLocations.js');

function init() {
  return loadSails(function afterLoadSails(err, sails) {
    locations.saveLocations(doneAll);
  });
}

function doneAll(err){
  if ( err ) {
    sails.log.error('Error on create stub data', err);
  }
  //sails.load();
  // end / exit
  process.exit();
}

init();
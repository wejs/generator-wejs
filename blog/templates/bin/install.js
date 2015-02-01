var loadSails = require('./loadSails.js');
var sget = require('sget');
var _ = require('lodash');

function init() {
  return loadSails(function afterLoadSails(err, sails) {


  });
}
// TODO



// 1 - configure db

// 2 -















function doneAll(err) {
  if ( err ) {
    sails.log.error('Error on install', err);
  }
  //sails.load();
  // end / exit
  process.exit();
}

init();
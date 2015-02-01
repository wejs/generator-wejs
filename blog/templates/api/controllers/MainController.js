/**
 * MainController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

var actionUtil = require('we-helpers').actionUtil,
  util = require('util'),
  converter = require('sails-emberjs-model-converter'),
  staticEmberModels;

module.exports = {
  index: function (req, res) {
    // index / homepage
    return res.view('home/index');
  },

  /**
   * Auto generate Ember.js App
   *
   */
  getEmberApp: function(req, res) {
    var fs = require('fs');

    var sails = req._sails;
    var appFilePath = sails.config.appPath + '/assets/emberApp.js';

    fs.readFile( appFilePath, function (err, emberAppFile) {
      if (err) throw err;

			// ___ MODELS
	    // cache models it in a global and static variable
	    if ( !staticEmberModels) {
	      staticEmberModels = converter.convertMultipleToEmberJSFile(sails.models)
	    }
	    emberAppFile += staticEmberModels;

	    //  send as javascript file
	    res.set('Content-Type', 'application/javascript');


      emberAppFile +=  ' App.advanceReadiness();';


	    res.send(emberAppFile);

    });
  }
}

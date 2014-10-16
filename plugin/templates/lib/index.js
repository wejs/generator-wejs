
var plugin = {};

// load init function
plugin.init = require('./init.js');
// load modelsAlter function
plugin.modelsAlter = require('./modelsAlter.js');

// exports it
module.exports = plugin;

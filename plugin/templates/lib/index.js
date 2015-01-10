var plugin = require('./hook.js');
// load modelsAlter function
plugin.modelsAlter = require('./modelsAlter.js');

// exports it
module.exports = plugin;

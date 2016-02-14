/**
 * We.js plugin file, use to load routes and configs
 *
 * @param  {[type]} projectPath current project path
 * @param  {Object} Plugin      we.js Plugin class
 * @return {Object}             intance of we.js Plugin class
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

  // set plugin routes
  plugin.setRoutes({
    // homepage | default home page
    'get /': {
      controller : 'main',
      action     : 'index',
      template   : 'home/index',
      layoutName : 'fullwidth'
    }
  });

  return plugin;
};
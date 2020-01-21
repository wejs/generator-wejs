/**
 * We.js plugin file, use to load routes and configs
 *
 * We.js projects have all plugin features but project features override plugin features
 *
 * @param  {String} projectPath current project path
 * @param  {Object} Plugin      we.js Plugin class
 * @return {Object}             intance of we.js Plugin class
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);

  // set project configs
  // plugin.setConfigs({
  // });

  // set project routes
  plugin.setRoutes({
    'get /': {
      controller: 'main',
      action: 'index'
    }
  });

  return plugin;
};
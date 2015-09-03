/**
 * We.js plugin file, use to load routes and configs
 *
 * @param  {[type]} projectPath current project path
 * @param  {Object} Plugin      we.js Plugin class
 * @return {Object}             intance of we.js Plugin class
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

  // override default home page to show articles list
  plugin.setRoutes({
    'get /': {
      name: 'main.index',
      controller: 'article',
      model: 'article',
      action: 'find',
      template: 'article/find',
      // title: 'A static title',
      titleHandler  : 'i18n',
      titleI18n: 'main.index',
    }
  });
  return plugin;
};
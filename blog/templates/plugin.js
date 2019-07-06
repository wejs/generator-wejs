/**
 * We.js plugin file, use to load routes and configs
 *
 * @param  {String} projectPath current project path
 * @param  {Object} Plugin      we.js Plugin class
 * @return {Object}             intance of we.js Plugin class
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);

  plugin.setRoutes({
    // home page route
    'get /': {
      name: 'main.index',
      controller: 'article',
      model: 'article',
      action: 'find',
      template: 'article/find',

      // title: 'A static title',

      titleHandler  : 'i18n', // i18n title
      titleI18n: 'main.index',
    }
  });
  return plugin;
};
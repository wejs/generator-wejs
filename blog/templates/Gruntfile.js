/**
 * Gruntfile
 *
 * This Node script is executed when you run `grunt` or `sails lift`.
 * It's purpose is to load the Grunt tasks in your project's `tasks`
 * folder, and allow you to add and remove tasks as you see fit.
 * For more information on how this works, check out the `README.md`
 * file that was generated in your `tasks` folder.
 *
 * WARNING:
 * Unless you know what you're doing, you shouldn't change this file.
 * Check out the `tasks` directory instead.
 */
var _ = require('lodash');

module.exports = function(grunt) {

  var weGruntTasks = require('we-grunt-tasks');


  // Load the include-all library in order to require all of our grunt
  // configurations and task registrations dynamically.
  //var includeAll = weGruntTasks.includeAll;

  /**
   * Loads Grunt configuration modules from the specified
   * relative path. These modules should export a function
   * that, when run, should either load/configure or register
   * a Grunt task.
   */
  var loadTasks = weGruntTasks.loadTasks;
  var loadProjectTask = weGruntTasks.loadSubProjectTasks;

  /**
   * Invokes the function from a Grunt configuration module with
   * a single argument - the `grunt` object.
   */
  function invokeConfigFn(tasks) {
    for (var taskName in tasks) {
      if (tasks.hasOwnProperty(taskName)) {
        tasks[taskName](grunt);
      }
    }
  }

  // Load task functions
  var taskConfigurations = loadTasks('./tasks/config', grunt),
    registerDefinitions = loadTasks('./tasks/register', grunt);

  taskConfigurations = _.merge(taskConfigurations, loadProjectTask('./tasks/config', grunt));
  registerDefinitions = _.merge(registerDefinitions, loadProjectTask('./tasks/register', grunt));

  // (ensure that a default task exists)
  if (!registerDefinitions.default) {
    registerDefinitions.default = function (grunt) { grunt.registerTask('default', []); };
  }

  // Run task functions to configure Grunt.
  invokeConfigFn(taskConfigurations);
  invokeConfigFn(registerDefinitions);

};

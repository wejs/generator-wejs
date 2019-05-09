const We = require('we-core'),
  we = new We(),
  projectFolder = process.cwd(),
  gulp = require('gulp'),
  weGulpTasks = require('we-gulp-tasks-default');

weGulpTasks(we, gulp, projectFolder, function doneTask() {
  we.exit(function () {
    process.exit();
  });
});
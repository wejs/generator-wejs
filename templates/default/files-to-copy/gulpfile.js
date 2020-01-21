const We = require('we-core'),
  we = new We(),
  projectFolder = process.cwd(),
  gulp = require('gulp'),
  weGulpTasks = require('we-gulp-tasks-default');

let tasks = weGulpTasks(we, gulp, projectFolder);

exports.build = tasks.build;
exports.default = tasks.build;

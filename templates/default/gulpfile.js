var We = require('we-core');
var we = new We();
var projectFolder = process.cwd();
var gulp = require('gulp');
var weGulpTasks = require('we-gulp-tasks-default');

weGulpTasks(we, gulp, projectFolder, function doneTask() {
  we.exit(function(){
    process.exit();
  });
});

var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

gulp.task('scripts', function() {
  return gulp.src(['src/js/**/*.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('files/public'));
});

gulp.task('styles', function() {
  return gulp.src(['src/less/**/*.less'])
    .pipe(less())
    .on('error', console.log)
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('files/public'));
});

// Requires gulp >=v3.5.0
gulp.task('watch', function () {
  gulp.watch('src/js/**', ['scripts']);
  gulp.watch('src/less/**', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
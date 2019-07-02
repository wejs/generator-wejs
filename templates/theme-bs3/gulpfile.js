const gulp = require('gulp'),
 concat = require('gulp-concat'),
 less = require('gulp-less'),
 minifyCSS = require('gulp-minify-css');

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

gulp.task('process', ['scripts', 'styles', 'watch']);
gulp.task('default', ['scripts', 'styles', 'watch']);
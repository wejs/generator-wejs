
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

gulp.task('server', function() {
  var we = require('we-core');

  we.go({
    themes: {
      enabled: [
        { name: '<%= themeName %>', themeFolder: __dirname }
      ],
      app: '<%= themeName %>'
    },
    i18n: {
      directory: 'node_modules/we-core/locales'
    },
    log: {
      level: 'info'
    }
  }, function (err) {
    if (err) return console.error(err);
  });

  we.hooks.on('we:before:routes:bind',  function (we, next) {
    // set home page example route
    we.routes['get /'].template = 'examples/index';
    delete we.routes['get /'].pluginName;

    next();
  });
});

gulp.task('process', ['scripts', 'styles', 'watch']);
gulp.task('default', ['scripts', 'styles', 'watch', 'server']);
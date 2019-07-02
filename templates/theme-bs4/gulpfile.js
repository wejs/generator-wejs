const gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  path = require('path'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

/*
 * Variables
 */
// Sass Source
let scssFiles = './src/scss/style.scss';

// CSS destination
let cssDest = './files/public';

// Options for development
let sassDevOptions = {
  outputStyle: 'expanded'
};

// Options for production
let sassProdOptions = {
  outputStyle: 'compressed'
};

/*
 * Tasks
 */
// Task 'sassdev' - Run with command 'gulp sassdev'
function sassdev () {
  return gulp.src(scssFiles)
    .pipe(sass(sassDevOptions)
     .on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
}
exports.sassdev = sassdev;

// Task 'sassprod' - Run with command 'gulp sassprod'
function sassprod() {
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions)
      .on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cssDest));
}
exports.sassprod = sassprod;

function watch_css() {
  return gulp.watch([
    scssFiles,
    './src/scss/**/*.scss',
  ], gulp.series(sassdev, sassprod));
}
exports.watch_css = watch_css;

// -- JS
const jsFiles = [
  path.join(__dirname, 'node_modules','popper.js','dist','umd','popper.js'),
  path.join(__dirname, 'node_modules','bootstrap','dist','js','bootstrap.js'),
  path.join(__dirname, 'src', 'js', '**/*.js')
];

function js() {
  return gulp.src(jsFiles)
  .pipe(concat('script.js'))
  .pipe(gulp.dest('./files/public/'))
  .pipe(rename('script.min.js'))
  .pipe(uglify())
  .pipe( gulp.dest('./files/public/') );
}
exports.js = js;

function watch_js() {
  return gulp.watch(jsFiles, js);
}
exports.watch_js = watch_js;

exports.watch = gulp.parallel(watch_css, watch_js);

// Default task - Run with command 'gulp'
exports.default = gulp.series(sassdev, sassprod, js, exports.watch);

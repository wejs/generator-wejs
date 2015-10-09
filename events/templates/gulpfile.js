var we = require('we-core');
var cwd = process.cwd();
var gulp = require('gulp'),
  gp_concat = require('gulp-concat'),
  gp_rename = require('gulp-rename'),
  gp_uglify = require('gulp-uglify'),
  gp_sourcemaps = require('gulp-sourcemaps'),
  gp_minify_css = require('gulp-minify-css');

var buildFolder = './files/public/build';

gulp.task('loadWejs', function(cb) {
  we.bootstrap({
    i18n: { updateFiles: true },
  } , function (err, we) {
    if (err) throw err;
    cb();
  });
});

// header files
gulp.task('headerProdJS',['loadWejs'], function() {
  return gulp.src(we.view.assets.getFileList('js', 'header'))
    .pipe(gp_sourcemaps.init())
    .pipe(gp_concat('prod.concat.header.js'))
    .pipe(gulp.dest(buildFolder))
    .pipe(gp_rename('prod.header.js'))
    .pipe(gp_uglify())
    .pipe(gp_sourcemaps.write('./'))
    .pipe(gulp.dest(buildFolder));
});
gulp.task('headerProdCSS',['loadWejs'], function() {
  return gulp.src(we.view.assets.getFileList('css', 'header'))
    .pipe(gp_concat('prod.concat.header.css'))
    .pipe(gulp.dest(buildFolder))
    .pipe(gp_rename('prod.header.css'))
    // Here I specify the relative path to my files
    .pipe(gp_minify_css({ keepSpecialComments: 0 }))
    .pipe(gulp.dest(buildFolder));
});

// footer files
gulp.task('footerProdJS',['loadWejs'], function() {
  return gulp.src(we.view.assets.getFileList('js', 'footer'))      .pipe(gp_sourcemaps.init())
    .pipe(gp_concat('prod.concat.footer.js'))
    .pipe(gulp.dest(buildFolder))
    .pipe(gp_rename('prod.footer.js'))
    .pipe(gp_uglify())
    .pipe(gp_sourcemaps.write('./'))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('footerProdCSS',['loadWejs'], function() {
  return gulp.src(we.view.assets.getFileList('css', 'footer'))
    .pipe(gp_concat('prod.concat.footer.css'))
    .pipe(gulp.dest(buildFolder))
    .pipe(gp_rename('prod.footer.css'))
    // Here I specify the relative path to my files
    .pipe(gp_minify_css({ keepSpecialComments: 0 }))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('build', [
  'headerProdJS',
  'headerProdCSS',
  'footerProdJS',
  'footerProdCSS'
], function() {
  we.db.defaultConnection.close();
  // TODO add a exit funcion in we.js
  process.exit();
});

//gulp.task('default', ['build']);
const gulp = require('gulp');
const babel = require('gulp-babel');
var less = require('gulp-less');
var mkdirp = require('mkdirp');
var plumber = require('gulp-plumber');
var cache = require('gulp-cached');
var concat = require('gulp-concat')


const jsSources = ['src/**/*.jsx', 'src/**/*.js']
const lessSources = ['src/styles/**/*.less']
const lessEntry = ['src/styles/index.less']
const extSources = ['extensions/*/**/*.jsx', 'extensions/*/**/*.js']
const extLessSources = ['extensions/*/**/*.less']
const extLessEntry = ['extensions/*/styles/style.less']


gulp.task('electron-build-js', function() {
  return gulp.src(jsSources)
    .pipe(plumber())
    .pipe(cache('babel'))
    .pipe(babel())
    .pipe(gulp.dest('dist/electron'));
});

gulp.task('electron-build-extensions', function() {
  return gulp.src(extSources)
    .pipe(plumber())
    .pipe(cache('extensions'))
    .pipe(babel())
    .pipe(gulp.dest('dist/electron/extensions'));
});

gulp.task('electron-build-extensions-less', function() {
  return gulp.src(extLessEntry)
    .pipe(plumber())
    .pipe(cache('extensions-less'))
    .pipe(concat('extensions.less'))
    .pipe(less())
    .pipe(gulp.dest('dist/electron/styles'));
});

gulp.task('electron-build-less', function() {
  return gulp.src(lessEntry)
    .pipe(plumber())
    .pipe(cache('less'))
    .pipe(less())
    .pipe(gulp.dest('dist/electron/styles'));
});

gulp.task('electron-build-fonts', function() {
  return gulp.src(['src/styles/theme/font/*'])
    .pipe(gulp.dest('dist/electron/styles/font'));
});

gulp.task('electron-build-html', function() {
  return gulp.src(['src/index.html'])
    .pipe(gulp.dest('dist/electron/'));
});

gulp.task('electron-build', [
  'electron-build-js',
  'electron-build-less',
  'electron-build-extensions',
  'electron-build-extensions-less',
  'electron-build-html',
  'electron-build-fonts'
]);

gulp.task('electron-watch', function () {
  gulp.watch(jsSources, ['electron-build-js']);
  gulp.watch(lessSources, ['electron-build-less']);
  gulp.watch(extSources, ['electron-build-extensions']);
  gulp.watch(extLessSources, ['electron-build-extensions-less']);
});

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),

    livereload = require('gulp-livereload'),
    gulpif = require('gulp-if');

var DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    BUILD = "demo/",
    ASSETS = "/assets",
    SRC = "src";

var env = process.env.NODE_ENV || DEVELOPMENT;
if (env!==DEVELOPMENT) env = PRODUCTION;

function getOutputDir() {
  return BUILD+env;
}

gulp.task('jade', function() {
  var config = {};

  if (env === DEVELOPMENT) {
    config.pretty = true;
  }
  return gulp.src(SRC+"/templates/**/index.jade")
    .pipe(jade(config))
    .pipe(gulp.dest(getOutputDir()));
});
gulp.task('js', function() {
  return gulp.src(SRC+'/js/main.js')
    .pipe(browserify({ debug: env === DEVELOPMENT }))
    .pipe(gulpif(env === PRODUCTION, uglify()))
    .pipe(gulp.dest(getOutputDir()+ASSETS+'/js'));
});
gulp.task('holder', function() {
  return gulp.src(SRC+'/js/holder.js')
    .pipe(gulpif(env === PRODUCTION, uglify()))
    .pipe(gulp.dest(getOutputDir()+ASSETS+'/js'));
});
gulp.task('fonts', function() {
  return gulp.src('bower_components/bootstrap-sass/fonts/*')
    .pipe(gulp.dest(getOutputDir()+ASSETS+'/fonts'));
});
gulp.task('sass', function() {
  var config = {};

  if (env === DEVELOPMENT) {
    config.sourceComments = 'map';
  } else if (env === PRODUCTION) {
    config.outputStyle = 'compressed';
  }

  return gulp.src(SRC+'/sass/main.scss')
    .pipe(sass(config))
    .pipe(gulp.dest(getOutputDir()+ASSETS+'/css'));
});

gulp.task('watch', function() {
  gulp.watch(SRC+'/**/*.jade', ['jade']);
  gulp.watch(SRC+'/**/*.js', ['js']);
  gulp.watch(SRC+'/**/*.scss', ['sass']);
  var server = livereload();
  gulp.watch(BUILD+'**').on('change', function(file) {
    server.changed(file.path);
  });
});

gulp.task('default', ['fonts', 'js', 'holder', 'jade', 'sass']);
gulp.task('live', ['js', 'holder', 'jade', 'sass', 'watch']);

gulp.task('production', function() {
  env = PRODUCTION;

  gulp.run('fonts');
  gulp.run('js');
  gulp.run('holder');
  gulp.run('jade');
  gulp.run('sass');
});
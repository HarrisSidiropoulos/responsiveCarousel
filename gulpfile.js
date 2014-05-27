var gulp = require('gulp'),
  jade = require('gulp-jade'),
  browserify = require('gulp-browserify'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),

  livereload = require('gulp-livereload'),
  gulpif = require('gulp-if');

//Use in command line: NODE_ENV=production gulp js
var DEVELOPMENT = 'development',
    PRODUCTION = 'production';

var env = process.env.NODE_ENV || DEVELOPMENT;
if (env!==DEVELOPMENT) env = PRODUCTION;

var buildPath = env;
    outputDir = "demo/"+buildPath,
    assets= "/assets";

gulp.task('jade', function() {
  return gulp.src("src/templates/**/index.jade")
    .pipe(jade())
    .pipe(gulp.dest(outputDir));
});

gulp.task('js', function() {
  return gulp.src('src/js/main.js')
    .pipe(browserify({ debug: env === DEVELOPMENT }))
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir+assets+'/js'));
});
gulp.task('holder', function() {
  return gulp.src('src/js/holder.js')
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir+assets+'/js'));
});
gulp.task('fonts', function() {
  return gulp.src('bower_components/bootstrap-sass/fonts/*')
    .pipe(gulp.dest(outputDir+assets+'/fonts'));
});
gulp.task('sass', function() {
  var config = {};

  if (env === DEVELOPMENT) {
    config.sourceComments = 'map';
  } else if (env === 'production') {
    config.outputStyle = 'compressed';
  }

  return gulp.src('src/sass/main.scss')
    .pipe(sass(config))
    .pipe(gulp.dest(outputDir+assets+'/css'));
});

gulp.task('watch', function() {
  gulp.watch('src/templates/**/*.jade', ['jade']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  var server = livereload();
  gulp.watch('demo/**').on('change', function(file) {
    server.changed(file.path);
  });
});

gulp.task('default', ['js', 'holder', 'jade', 'sass']);
gulp.task('live', ['js', 'holder', 'jade', 'sass', 'watch']);
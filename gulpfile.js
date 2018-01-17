var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var requireDir = require('require-dir');

// Registering tasks
requireDir('./gulp');

gulp.task('karma', ['inject:karma'], function () {
  var unitTestingParameters = {
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  };

  return gulp.src([])
    .pipe($.karma(unitTestingParameters));
});

gulp.task('default', ['serve']);
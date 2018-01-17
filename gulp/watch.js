var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pathsConfig = require('./paths-config');

gulp.task('watch', ['connect:dev'], function () {
  $.watch('src/{common,modules}/**/*', function (vinyl) {
    var event = vinyl.event;
    var path = vinyl.path;
    var lastPoint = path.lastIndexOf('.');
    var extension = path.substring(lastPoint);
    if (event === 'add' || event === 'unlink') {
      switch (extension) {
      case '.scss':
        if (path.substring(lastPoint - 5) === '_base.scss') {
          gulp.start('inject:scss');
        } else {
          gulp.start('styles');
        }
        break;
      case '.js':
        gulp.start('inject');
        break;
      case '.html':
        reload();
        break;
      default:
        break;
      }
    } else if (event === 'change') {
      if (extension === '.scss') {
        gulp.start('styles');
      } else {
        reload();
      }
    }
  });

  $.watch(pathsConfig.src.indexScss, function (vinyl) {
    var event = vinyl.event;
    if (event === 'change') {
      gulp.start('styles');
    }
  });

  $.watch(pathsConfig.tmp.root + '**/*.css', function (vinyl) {
    var event = vinyl.event;
    if (event === 'add' || event === 'unlink') {
      gulp.start('inject');
    }
    if (event === 'change') {
      reload();
    }
  });

  $.watch(pathsConfig.tmp.root + 'index.html', reload);

  $.watch(pathsConfig.src.images, function (vinyl) {
    var event = vinyl.event;
    if (event === 'change') {
      reload();
    }
  });
});
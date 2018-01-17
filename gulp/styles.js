var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var argv = require('minimist')(process.argv.slice(2));
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pathsConfig = require('./paths-config');

gulp.task('styles', function () {
  var destPath = argv.d ? pathsConfig.dist.styles : pathsConfig.tmp.styles;
  var additionalCss = pathsConfig.src.cssFiles.slice(1);
  additionalCss.unshift(destPath + 'app.css');
  $.rubySass(pathsConfig.src.indexScss, {
    style: 'expanded',
    unixNewlines: true,
    compass: true,
    trace: true,
    bundleExec: true,
    loadPath: [
      pathsConfig.src.root + '/bower-components/foundation5-sass/scss',
      pathsConfig.src.root + '/bower-components/ionicons/scss',
      pathsConfig.src.root
    ]
  })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe($.rename('app.css'))
    .pipe(gulp.dest(destPath))
    .pipe($.callback(function () {
      if (destPath === pathsConfig.dist.styles) {
        var concatenatedCss = gulp.src(additionalCss);
        concatenatedCss.pipe($.concat('app.css'))
          .pipe(gulp.dest(destPath));
      }
    }));
});

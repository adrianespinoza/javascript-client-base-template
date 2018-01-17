var gulp = require('gulp');
var browserSync = require('browser-sync');
var pathsConfig = require('./paths-config');

gulp.task('connect:dist',  function () {
  browserSync({
    server: {
      baseDir: [
        pathsConfig.dist.root
      ]
    },
    port: 3001,
    ui: false,
    ghostMode: false
  });
});

gulp.task('connect:dev',  function () {
  browserSync({
    server: {
      baseDir: [
        pathsConfig.tmp.root + 'index.html',
        pathsConfig.tmp.root,
        pathsConfig.src.root
      ]
    },
    port: 3001,
    ui: false,
    ghostMode: false
  });
});
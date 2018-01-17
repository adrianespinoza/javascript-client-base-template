var gulp = require('gulp');

/* Development build */
gulp.task('build:dev', [
  'inject:scss',
  'pdfjs',
  'fonts',
  'config',
  'inject'
], function () {
  gulp.start('watch');
});

/*gulp.task('serve', ['jslint', 'karma'], function () {*/
gulp.task('serve', ['jslint'], function () {
  gulp.start('build:dev');
});

/* Distribution build */
gulp.task('build:dist', [
  'config',
  'pdfjs',
  'images',
  'fonts',
  'revreplace'
]);

gulp.task('dist', ['clean:dist', 'jslint', 'karma'],  function () {
  gulp.start('build:dist');
});
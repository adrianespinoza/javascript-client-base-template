var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var pathsConfig = require('./paths-config');


gulp.task('jslint', function () {
  var files = pathsConfig.src.jsLintExcludedFiles;
  files.push(pathsConfig.src.js, pathsConfig.test.spec);

  return gulp.src(files)
    .pipe($.jslintSimple.run({
      regexp: true,
      vars: true,
      browser: true,
      devel: true,
      todo: true,
      unparam: true,
      maxlen: 120,
      plusplus: true,
      bitwise: true,
      forin: true,
      nomen: true,
      newcap: true,
      predef: [
        'angular',
        'jQuery',
        'define',
        'describe',
        'it',
        'expect',
        'jasmine',
        'beforeEach',
        'afterEach',
        'module',
        'inject',
        'spyOn',
        '$',
        'io',
        'Kinetic',
        'Chart',
        'html2canvas',
        'jsPDF',
        'async',
        'PDFDocument',
        'blobStream',
        'Flotr'
      ],
      indent: 2,
      errorsOnly: true
    }))
    .pipe($.jslintSimple.report({
      emitErrorAtEnd: true
    }))
    .on('error', function (error) {
      console.error(String(error));
      process.exit(-1);
    });
});
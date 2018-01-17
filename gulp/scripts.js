var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var pathsConfig = require('./paths-config');

/* Note:
 * Generate and validate 'scripts.js', 'vendor.js' files
 * 'helper.js' is minified and uglified correctly
 */
gulp.task('templates', function () {
  return gulp.src(pathsConfig.src.templates)
    .pipe($.ngTemplates({
      filename: 'templates.js',
      module: 'cidApp',
      standalone: false
    }))
    .pipe(gulp.dest(pathsConfig.tmp.root));
});

gulp.task('dist:scripts', ['templates'], function () {
  return gulp.src(['!src/common/*.js',
      'src/modules/app.js',
      'src/{common,modules}/**/*.constant.js',
      'src/{common,modules}/**/*.enum.js',
      'src/{common,modules}/**/*.module.js',
      'src/{common,modules}/**/*.filter.js',
      'src/{common,modules}/**/*.model.js',
      'src/{common,modules}/**/*.service.js',
      'src/{common,modules}/**/*.provider.js',
      'src/{common,modules}/**/*.directive.js',
      'src/{common,modules}/**/*.controller.js',
      '.tmp/templates.js'])
    .pipe($.concat('scripts.js'))
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(gulp.dest(pathsConfig.dist.js));
});

gulp.task('dist:vendor', function () {
  var bowerFiles = gulp.src(mainBowerFiles('**/*.js'));
  var jsFiles = gulp.src(['src/common/*.js', '!src/common/js-helper.js']);

  return $.merge(bowerFiles, jsFiles)
    .pipe($.concat('vendor.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(pathsConfig.dist.js));
});

gulp.task('dist:helper', function () {
  return gulp.src('src/common/js-helper.js')
    .pipe($.uglify())
    .pipe($.rename('helper.js'))
    .pipe(gulp.dest(pathsConfig.dist.js));
});

var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");


gulp.task("revision", ['inject:dist'], function () {
  return gulp.src([
    pathsConfig.dist.root + '**/*.css',
    pathsConfig.dist.root + '**/*.js',
    '!' + pathsConfig.dist.root + 'pdfjs-build/**/* '
  ])
    .pipe(rev())
    .pipe(gulp.dest(pathsConfig.dist.root))
    .pipe(rev.manifest())
    .pipe(gulp.dest(pathsConfig.dist.root));
});

gulp.task("revreplace", ["revision"], function () {
  var manifest = gulp.src("./" + pathsConfig.dist.root + "rev-manifest.json");

  return gulp.src([
    pathsConfig.dist.root + "index.html"
  ])
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(pathsConfig.dist.root))
    .pipe($.callback(function () {
      manifest = gulp.src("./" + pathsConfig.dist.root + "rev-manifest.json");
      return manifest.pipe($.jsonTransform(function (data) {
        var filesToDelete =  Object.keys(data);
        filesToDelete = filesToDelete.map(function (item) {
          return pathsConfig.dist.root + item;
        });
        return del.sync(filesToDelete);
      }));
    }))
    .pipe($.callback(function () {
      gulp.src([pathsConfig.dist.styles + '*.css', '!**/app.css'])
        .pipe($.bless())
        .pipe(gulp.dest(pathsConfig.dist.styles));
    }));

});
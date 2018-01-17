var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var path = require('path');
var mainBowerFiles = require('main-bower-files');
var injectConfig = require('./injectConfig.js');
var pathsConfig = require('./paths-config');

gulp.task('inject', ['styles'], function () {
  var injectStyles = gulp.src(pathsConfig.src.cssFiles);
  var injectStylesOptions = {
    read: false,
    ignorePath: [pathsConfig.tmp.root, pathsConfig.src.root],
    starttag: '<!-- injector:css -->',
    endtag: '<!-- endinjector -->',
    addRootSlash: false
  };

  var stream =  gulp.src(pathsConfig.src.html);
  var jsConfig = injectConfig.jsConfig;
  jsConfig.forEach(function (jsConfig) {
    stream = stream.pipe($.inject(gulp.src(jsConfig.src)
      .pipe($.angularFilesort()),
      {
        ignorePath: pathsConfig.src.root,
        starttag: jsConfig.starttag,
        endtag: injectConfig.endtag,
        addRootSlash: false
      }));
  });

  return stream.pipe(wiredep({}))
    .pipe($.inject(injectStyles, injectStylesOptions))
    .pipe(gulp.dest(pathsConfig.tmp.root))
    .pipe(reload({stream: true}));
});

gulp.task('inject:scss', function () {
  var injectStyles = gulp.src(pathsConfig.src.scssBaseFiles);
  var injectStylesOptions = {
    read: false,
    ignorePath: pathsConfig.src.root,
    starttag: '/* injector:scss */',
    endtag: '/* endinjector */',
    addRootSlash: false,
    transform: function (filepath) {
      var dirname = path.dirname(filepath);
      var name = path.basename(filepath, '.scss');
      var firstChar = name.charAt(0);
      if (firstChar === '_') {
        name = name.substring(1);
      }
      filepath = path.join(dirname, name);
      filepath = filepath.replace(/\\/g, '/');
      return '@import "' + filepath + '";';
    }
  };

  return gulp.src(pathsConfig.src.indexScss)
    .pipe($.inject(injectStyles, injectStylesOptions))
    .pipe(gulp.dest(pathsConfig.src.root));
});

gulp.task('inject:karma', function () {
  var bowerFiles = gulp.src(mainBowerFiles('**/*.js'));
  var bowerFilesOptions = {
    read: false,
    starttag: '/* injector:bower */',
    endtag: '/* endinjector */',
    addRootSlash: false,
    transform: function (filepath) {
      return '\'' + filepath + '\',';
    }
  };

  return gulp.src('./karma.conf.js')
    .pipe($.inject(bowerFiles, bowerFilesOptions))
    .pipe(gulp.dest('./'));
});

// inject:dist is not a classic 'injection', i.e. dist:scripts
// create the final file and inject:dist only put this into a placeholder
gulp.task('inject:dist', [
  'styles',
  'dist:scripts',
  'dist:vendor',
  'dist:helper',
  'config'
], function () {
  var injectStyles = gulp.src([
    pathsConfig.dist.styles + '*.css'
  ]);
  var jsBuildConfig = injectConfig.jsBuildConfig;
  var stream =  gulp.src(pathsConfig.src.html);

  jsBuildConfig.forEach(function (jsBuildConfig) {
    stream = stream.pipe($.inject(gulp.src(jsBuildConfig.src)
      .pipe($.angularFilesort()),
      {
        ignorePath: pathsConfig.dist.root,
        starttag: jsBuildConfig.starttag,
        endtag: injectConfig.buildEndtag,
        addRootSlash: false
      }));
  });

  return stream.pipe($.inject(injectStyles, {
    read: false,
    ignorePath: pathsConfig.dist.root,
    starttag: '<!-- injector:css -->',
    endtag: '<!-- endinjector -->',
    addRootSlash: false
  }))
    .pipe(gulp.dest(pathsConfig.dist.root));
});

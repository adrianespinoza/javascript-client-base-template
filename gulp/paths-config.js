var paths = {
  src: {
    root: 'src/',
    pdfjs: [
      '!src/bower-components/pdfjs-build/*.*',
      'src/bower-components/pdfjs-build/**/*.*'
    ],
    fonts: 'src/fonts/*.{eot,ttf,svg,woff}',
    images: 'src/images/**/*.*',
    devConfigFile: 'src/app.dev.config.js',
    prodConfigFile: 'src/app.prod.config.js',
    cssFiles: [
      '.tmp/styles/*.css',
      'src/bower-components/jquery-ui/themes/base/minified/jquery-ui.min.css',
      'src/bower-components/select2/select2.css',
      'src/bower-components/ng-tags-input/ng-tags-input.css',
      'src/bower-components/angular-ui-select/dist/select.css'
    ],
    html: 'src/index.html',
    scssBaseFiles: 'src/{common,modules}/**/_base.scss',
    indexScss: 'src/index.scss',
    templates: 'src/{common,modules}/**/*.html',
    jsLintExcludedFiles: [
      '!src/pdfjs-build/**/*.js',
      '!src/bower-components/**/*.js',
      '!src/common/blob-stream-v0.1.2.js',
      '!src/common/pdfkit.js',
      '!src/common/jspdf.debug.js',
      '!src/common/directives/drag-and-drop/sortable/multisortable.directive.js'
    ],
    js: 'src/**/*.js'
  },
  dist: {
    root: 'dist/',
    js: 'dist/js/',
    images: 'dist/images/',
    pdfjs: 'dist/pdfjs-build/',
    styles: 'dist/styles/',
    fonts: 'dist/styles/fonts/'
  },
  tmp: {
    root: '.tmp/',
    pdfjs: '.tmp/pdfjs-build/',
    styles: '.tmp/styles/',
    fonts: '.tmp/styles/fonts/'
  },
  test: {
    spec: 'test/spec/**/*.js'
  }
};

module.exports = paths;
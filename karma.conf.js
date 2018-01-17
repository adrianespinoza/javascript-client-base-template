// Karma configuration
// Generated on Fri Feb 21 2014 07:10:24 GMT-0600 (Central Standard Time)

module.exports = function (config) {
  "use strict";
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      /* injector:bower */
      'src/bower-components/jquery/dist/jquery.js',
      'src/bower-components/angular/angular.js',
      'src/bower-components/angular-ui-router/release/angular-ui-router.js',
      'src/bower-components/angular-scroll/angular-scroll.min.js',
      'src/bower-components/angular-ui-utils/ui-utils.js',
      'src/bower-components/angular-resource/angular-resource.js',
      'src/bower-components/angular-foundation/mm-foundation-tpls.js',
      'src/bower-components/lodash/lodash.js',
      'src/bower-components/spin.js/spin.js',
      'src/bower-components/async/lib/async.js',
      'src/bower-components/checklist-model/checklist-model.js',
      'src/bower-components/ng-table/ng-table.js',
      'src/bower-components/kineticjs/kinetic.min.js',
      'src/bower-components/angular-growl/build/angular-growl.js',
      'src/bower-components/signalr/jquery.signalr.js',
      'src/bower-components/jquery-ui/ui/jquery-ui.js',
      'src/bower-components/es5-shim/es5-shim.js',
      'src/bower-components/angular-local-storage/angular-local-storage.js',
      'src/bower-components/ng-file-upload/angular-file-upload.js',
      'src/bower-components/pdfjs-build/pdf.js',
      'src/bower-components/ng-file-upload-shim/angular-file-upload-shim.js',
      'src/bower-components/jspdf/dist/jspdf.min.js',
      'src/bower-components/angular-filter/dist/angular-filter.js',
      'src/bower-components/ng-tags-input/ng-tags-input.min.js',
      'src/bower-components/angular-ui-select/dist/select.js',
      'src/bower-components/select2/select2.js',
      'src/bower-components/angular-ui-select2/src/select2.js',
      'src/bower-components/angular-route/angular-route.js',
      'src/bower-components/angular-spinner/angular-spinner.js',
      'src/bower-components/angular-ui-tree/dist/angular-ui-tree.js',
      /* endinjector */
      'src/bower-components/angular-mocks/angular-mocks.js',
      'src/modules/app.js',
      'src/app.test.config.js',

      'src/common/**/*.js',
      'src/common/**/*.html',
      'src/modules/**/*.module.js',
      'src/modules/**/*.js',
      'src/modules/**/*.html',
      'test/**/*.spec.js',
      'test/**/karma-mocks.js'
    ],


    // list of files to exclude
    exclude: [
      'app/common/**/jquery-mjs-nestedSortable.directive.js'
    ],

    preprocessors: {
      'src/common/**/*.js': 'coverage',
      'src/modules/**/*.js': 'coverage',
      'src/common/**/*.html': 'html2js',
      'src/modules/**/*.html': 'html2js'
    },

    ngHtml2JsPreprocessor: {
      // strip app from the file path
      stripPrefix: 'src/'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};

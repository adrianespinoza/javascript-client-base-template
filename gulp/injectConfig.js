exports.jsConfig = [
  {
    src: 'src/**/*.controller.js',
    starttag: '<!-- injector:ng-controllers -->'
  },
  {
    src: 'src/**/*.directive.js',
    starttag: '<!-- injector:ng-directives -->'
  },
  {
    src: 'src/**/*.model.js',
    starttag: '<!-- injector:ng-models -->'
  },
  {
    src: 'src/**/*.service.js',
    starttag: '<!-- injector:ng-services -->'
  },
  {
    src: 'src/**/*.provider.js',
    starttag: '<!-- injector:ng-provider -->'
  },
  {
    src: 'src/**/*.constant.js',
    starttag: '<!-- injector:ng-constants -->'
  },
  {
    src: 'src/**/*.enum.js',
    starttag: '<!-- injector:ng-enums -->'
  },
  {
    src: 'src/**/*.filter.js',
    starttag: '<!-- injector:ng-filters -->'
  },
  {
    src: 'src/**/*.module.js',
    starttag: '<!-- injector:ng-module -->'
  },
  {
    src: 'src/**/app.config.js',
    starttag: '<!-- injector:ng-config -->'
  }
];

exports.endtag = '<!-- endinjector -->';

exports.jsBuildConfig = [{
  src: 'dist/js/helper.js',
  starttag: '<!-- build:js js/helper.js -->'
}, {
  src: 'dist/js/vendor.js',
  starttag: '<!-- build:js js/vendor.js -->'
}, {
  src: 'dist/js/scripts.js',
  starttag: '<!-- build:js js/scripts.js -->'
}, {
  src: 'dist/js/app.config.js',
  starttag: '<!-- build:js js/app.config.js -->'
}];

exports.buildEndtag = '<!-- endbuild -->';
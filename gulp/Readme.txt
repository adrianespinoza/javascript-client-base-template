GULP
Use npm to install gulp (http://gulpjs.com/), currently all the dependencies that are being used are in package.json.

TASKS

gulp / gulp serve
To lint the code, run tests and serve the application.

gulp dist -d
To build the application in dist folder (currently it is not working properly). The parameter (-d) is necessary to run tasks for distribution.

gulp karma
To run unit tests.

gulp jslint
To review the code

There are another tasks behind of those ones:

gulp watch
To watch necessary folders in order to run tasks according to the action (add, remove or update)

gulp inject
To inject javascript references, bower dependencies and styles in index.html and unsupported.html

gulp inject:scss
To inject sass references in index.scss

gulp inject:karma
To inject javascript files references in karma.config.js

gulp inject:dist
To inject file references in index.html and unsupported.html for distribution

gulp styles
To compile sass files for development environment

gulp styles -d
To compile sass files for production.

gulp fonts
To copy fonts files for development environment

gulp fonts -d
To copy fonts files for production.

gulp images / gulp images -d
To copy images for production. In development it is not used, that is why the behavior is the same with or without the parameter.

gulp pdfjs
To copy pdfjs files to be able to read pdf format in the application for development environment

gulp pdfjs -d
To copy pdfjs files to be able to read pdf format in the application for production.

gulp config
To copy config file for development environment

gulp config -d
To copy config file for production.

gulp dist:scripts
gulp dist:vendor
gulp dist:helper
To generate scripts, vendor and helper files respectively.

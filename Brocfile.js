/* global require, module */

var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js');
app.import(app.bowerDirectory + '/leaflet/dist/leaflet-src.js');
app.import(app.bowerDirectory + '/leaflet/dist/leaflet.css');
app.import(app.bowerDirectory + '/leaflet.locatecontrol/dist/L.Control.Locate.css');
app.import(app.bowerDirectory + '/leaflet.locatecontrol/src/L.Control.Locate.js');

// Copy fontawesome fonts
var fonts = pickFiles(app.bowerDirectory + '/fontawesome/fonts', {
  srcDir: '/',
  files: ['**/*'],
  destDir: '/assets/fonts'
});

// Copy leaflet images
var images = pickFiles(app.bowerDirectory + '/leaflet/dist/images', {
  srcDir: '/',
  files: ['**/*'],
  destDir: '/assets/images'
});

module.exports = mergeTrees([app.toTree(), fonts, images]);

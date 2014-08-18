/*global require*/
'use strict';

require.config({
  shim: {
    backbone: {
      deps: [ 'lodash', 'jquery' ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    jwplayer: {
      exports: 'jwplayer'
    },
    jwplayerHTML5: {
      deps: ['jwplayer'],
      exports: 'jwplayer'
    },
    videojs: {
      exports: "videojs"
    },
    videoResolutions: {
      deps: ['videojs'],
      exports: "videoJsResolutions"
    },
    ejs: {
      exports: 'ejs'
    }
  },
  map: {
    '*': {
      'underscore': 'lodash'
    }
  },
  paths: {
    jquery:          '../bower_components/jquery/dist/jquery',

    lodash:          '../bower_components/lodash/dist/lodash',
    backbone:        '../bower_components/backbone/backbone',
    async:           '../bower_components/async/lib/async',

    bootstrap:       'vendor/bootstrap',
    
    jwplayer:        'vendor/jwplayer',
    jwplayerHTML5:   'vendor/jwplayer.html5',

    videojs: "vendor/video.dev",
    videoResolutions: "vendor/video-js-resolutions",

    ejs: "../bower_components/ejs/ejs",
    
    wording:         'lib/wording'
  }
});

require([
  'jquery',
  'lodash',
  'backbone',
  'bootstrap',
  'app',
  'async',
  'services/_index',
  'jwplayer',
  'jwplayerHTML5',
  'videojs',
  'videoResolutions',
  'ejs',
  'routes/playerRoutes'
], function ($, _, Backbone, boostrap, app, async, services, jwplayer, jwplayerHTML5, videojs, videoResolutions, ejs, PlayerRoutes) {

  // So AJAX works with CORS
  $.support.cors = true;



  // make app global
  window.app = app;

  // be carefull not to override any service in a later call
  _.assign(app, services, {
    // some globals (if necesssary)
  });

  var initRoutes = function () {
    app.log('debug', '%capp.initRoutes', 'color: #4444ff');

    // Initiate our routes
    new PlayerRoutes();

    Backbone.history.start();
  };

  app.ejs = ejs;

  /**
   * @param {Function} callback
   */
  app.bootstrap = function (callback) {
    app.log('debug', '%capp.bootstrap', 'color: #4444ff');

    initRoutes();                       // initialize roots

    if (callback) return callback();
  };

  app.bootstrap();
});

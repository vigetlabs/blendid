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
  'jwplayer',
  'jwplayerHTML5',
  'videojs',
  'videoResolutions',
  'routes/player'
], function ($, _, Backbone, boostrap, app, async, jwplayer, jwplayerHTML5, videojs, videoResolutions, PlayerRoutes) {

  // So AJAX works with CORS
  $.support.cors = true;

  var initRoutes = function () {
    app.log('debug', '%capp.initRoutes', 'color: #4444ff');

    // Initiate our routes
    new PlayerRoutes();

    Backbone.history.start();
  };

  /**
   * @param {Function} callback
   */
  app.bootstrap = function (callback) {
    app.log('debug', '%capp.bootstrap', 'color: #4444ff');

    initRoutes();                       // initialize roots

    if (app.config.debug) {
      window.app = app;
    }

    if (callback) return callback();
  };

  app.bootstrap();
});

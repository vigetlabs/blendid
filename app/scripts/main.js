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
    xDR: {
      deps: ['jquery'],
      exports: 'jquery'
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
    jquery:           '../bower_components/jquery/dist/jquery',
    lodash:           '../bower_components/lodash/dist/lodash',
    backbone:         '../bower_components/backbone/backbone',
    async:            '../bower_components/async/lib/async',
    moment:           '../bower_components/moment/moment',

    bootstrap:        'vendor/bootstrap',
    xDR:              'vendor/jQuery.XDomainRequest',
 /*   jwplayer510:    'vendor/jwplayer-510',
    jwplayer68:       'vendor/jwplayer-6.8',
    jwplayer68HTML5:  'vendor/jwplayer-6.8.html5',
*/
    videojs:          'vendor/video.dev',
    videoResolutions: 'vendor/video-js-resolutions',

    ejs:              '../bower_components/ejs/ejs',

    wording:          'lib/wording',
    mimetypes:        'lib/mimetypes'

  }
});

require([
  'jquery',
  'lodash',
  'backbone',
  'bootstrap',
  'app',
  'async',
  'moment',
  'services/_index',
//  'jwplayer510',
  'xDR',
  'videojs',
  'videoResolutions',
  'ejs',
  'routes/playerRoutes'
], function ($, _, Backbone, boostrap, app, async, moment, services, /*jwplayer510, */xDR, videojs, videoResolutions, ejs, PlayerRoutes) {

  // So AJAX works with CORS
  if(typeof navigator.browser === 'string' && navigator.browser.indexOf('MSIE') === -1) {
    $.support.cors = true;
  } else {
    $.support.cors = false;
  }

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

    // get language
    app.language = window.navigator.userLanguage || window.navigator.language || app.config.defaultLanguage;
    app.language = _.isString(app.language) && app.language.slice(0,2) || app.language;

    // set moments globally to users ui lang
    moment.defineLocale('de', {
      longDateFormat: {
        LT: "HH:mm",
        L: "DD.MM.YYYY",
        LL: "Do MMMM YYYY",
        LLL: "DD.MM.YYYY LT",
        LLLL: "dddd, Do MMMM YYYY LT"
      }
    });
    moment.defineLocale('en', {
      longDateFormat: {
        LT: "HH:mm",
        L: "YYYY-MM-DD",
        LL: "Do MMMM YYYY",
        LLL: "YYYY-MM-DD LT",
        LLLL: "dddd, Do MMMM YYYY LT"
      }
    });

    moment.locale(app.language || 'en'); // default the language to English




    if (callback) return callback();
  };

  app.bootstrap();
});

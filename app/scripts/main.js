/*global require*/
'use strict';

require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
  }
});

require([
  'backbone',
  'routes/player'
], function (Backbone, PlayerRouter) {
  var playerRouter = new PlayerRouter();
  Backbone.history.start();
});

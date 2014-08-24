/*global define*/

// Never require this module directly except in app.js
// App.js will export this module so you should require it instead

define([

], function () {
  'use strict';

  var config = {
    debug: true,
    activateStatistic: false,
    logLevels: ['error', 'info', 'debug', 'verbose','overflow'],
    logLevel: 'error',
    benchmark: false,
    protocol: window.location.protocol,
    env: 'local',
    host: {
      local:  '//localhost:8080',
      dev:    '//api.dev.admiralcloud.com',
      live:   '//api.admiralcloud.com'
    },
    endpoint: {
      player: '/v2/mediacontainer/de',
      subtitle: '/v2/caption/findByEmbedLink'
    },
    defaultLanguage: 'en',
    statServer: {
      local: 'http://localhost:3001/v2/tracker',
      dev: 'https://statistic.dev.admiralcloud.com/v2/tracker',
      live: 'https://statistic.admiralcloud.com/v2/tracker'
    }
  };

  return config;
});
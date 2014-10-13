/*global define*/

// Never require this module directly except in app.js
// App.js will export this module so you should require it instead

define([

], function () {
  'use strict';

  var language = window.navigator.userLanguage || window.navigator.language;

  var config = {
    debug: true,
    activateStatistic: true,
    logLevels: ['error', 'info', 'debug', 'verbose', 'overflow'],
    logLevel: 'error',
    benchmark: false,
    protocol: window.location.protocol,
    env: 'live',
    host: {
      local: 'http://localhost:8080',
      dev: 'https://api.dev.admiralcloud.com',
      live: 'https://api.admiralcloud.com'
    },
    endpoint: {
      player: '/v2/mediacontainer/de',
      subtitle: '/v2/caption/findByEmbedLink'
    },
    language: (language == 'de' || language === 'en') ? language : 'en',
    statServer: {
//      local: 'http://localhost:3001/v2/tracker',
      local: 'https://statistic.dev.admiralcloud.com/v2/tracker',
      dev: 'https://statistic.dev.admiralcloud.com/v2/tracker',
      live: 'https://statistic.admiralcloud.com/v2/tracker'
    }
  };

  return config;
});
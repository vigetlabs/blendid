/*global define*/

// Never require this module directly except in app.js
// App.js will export this module so you should require it instead

define([

], function () {
  'use strict';

  var config = {
    debug: true,
    logLevels: ['error', 'info', 'debug', 'verbose','overflow'],
    logLevel: 'verbose',
    benchmark: true,
    protocol: window.location.protocol,
    env: 'local',
    endpoint: {
      player: '/player',
      pressarea: '/pressarea/deliver'
    },
    endpointPrefix: '/v2',
    jwplayer: {
      key: 'OpIlEknwHUl43G34AD0IAHR/HzFYlDr4Guo/bw=='
    },
    defaultLanguage: 'en'
  };

  var host = {
    local:  '//localhost:8080',
    dev:    '//api.dev.admiralcloud.com:80',
    live:   '//api.admiralcloud.com'
  };

  for(var key in host) {
    if(host.hasOwnProperty(key)) {
      host[key] = config.protocol + host[key] + config.endpointPrefix;
    }
  }

  config.host = function () {
    return host[config.env];
  };

  return config;
});
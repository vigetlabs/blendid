/*global define*/

// Never require this module directly except in app.js
// App.js will export this module so you should require it instead

define([

], function () {
  'use strict';

  var config = {
    debug: true,
    logLevels: ['error', 'info', 'debug', 'verbose','overflow'],
    logLevel: 'error',
    benchmark: false,
    protocol: window.location.protocol,
    env: 'local',
    endpoint: {
      player: '/mediacontainer/de'
    },
    endpointPrefix: '/v2',
    jwplayer: {
      key: 'OpIlEknwHUl43G34AD0IAHR/HzFYlDr4Guo/bw=='
    },
    defaultLanguage: 'en',
    statServer: {
      local: 'http://localhost:3001/v2/tracker',
      dev: 'https://statistic.dev.admiralcloud.com/v2/tracker',
      live: 'https://statistic.admiralcloud.com/v2/tracker'
    }
  };

  var host = {
    local:  '//localhost:8080',
    dev:    '//api.dev.admiralcloud.com',
    live:   '//api.admiralcloud.com'
  };

	config.tracking = {
		"framework": "piwik",
		"piwik": {
			"url": "piwik.mmpro.de/piwik.php",
			"fields": {
				"rec": 1,
				"rand": Math.floor(Math.random()*10000),
				"idsite": "customerId",
				"url": "player_url",
				"action_name": "player_name",
				"urlref": "ref_url"	
			}
		}
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
/**
 * This module return an appropriate host
 * It will resolve the host as a function of window.location.host
 * or if provided the env function parameter
 *
 * @param {String} [env] enum local, dev, live
 */

var environments = {
  LOCAL: 'LOCAL',
  DEV: 'DEV',
  LIVE: 'LIVE'
};

function host (env) {
  env = env || (function (host) {
    if (host == 'localhost:9000') return environments.LOCAL;
    if (host == 'admiralcloud.dev:9000') return environments.LOCAL;

    if (host == 'dev.admiralcloud.com') return environments.DEV;

    return environments.LIVE;
  })(window.location.host);

  var envs = Object.keys(environments);

  if (envs.indexOf(env) === -1)
    alert(env + ' is not a valid environment! ' + env + ' has to be in ' + envs.toString());

  var hosts = {
    LOCAL: 'http://localhost:8080',
    DEV: 'https://api.dev.admiralcloud.com',
    LIVE: 'https://api.admiralcloud.com'
  };

  return hosts[env];
}

module.exports = host;

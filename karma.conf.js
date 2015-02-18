var karmaConfig = require('./gulp/config').karma;

module.exports = function(config) {
  config.set(karmaConfig);
};

const path = require('path');
const fs = require('fs');

module.exports = {

  /**
   * Get the Path configuration settings
   *
   * This method will override the defaults if you add a custom path config file
   * in your project's config folder: config/path-config.js
   *
   * @returns {*}
   */
  getPathConfig: function() {

    const pathConfigOverride = path.resolve(process.env.PWD, 'config/config.path.json');

    if (fs.existsSync(pathConfigOverride)) {
      return require(pathConfigOverride);
    }

    return require('../config/config.path.json');
  }

};

var React = require('react')
  , VideoJS = require('video.js')
  , wording = require('../locals');

/**
 * @Class PlayerComponent
 */

module.exports = React.createClass({

  render: function () {
    var href = 'mailto:' + wording('supportEmail');

    return (
      <div className="notSources vcenter">
        <h3>{wording('videoNotSourcesAvailable')}</h3>
        <h3><a href={href}>{wording('supportEmail')}</a></h3>
      </div>
    );
  }
});


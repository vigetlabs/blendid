var React = require('react')
  , VideoJS = require('video.js')
  , wording = require('../locals');

/**
 * @Class PlayerComponent
 */

module.exports = React.createClass({
  render: function () {
    return (
      <div className="notFound vcenter">
        <h3 >{wording('error_404_h2')}</h3>
      </div>
    );
  }
});


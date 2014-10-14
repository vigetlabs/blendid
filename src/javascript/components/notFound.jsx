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
        <h3 >Not found</h3>
        <h3 >404</h3>
      </div>
    );
  }
});


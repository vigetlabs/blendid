var React = require('react')
  , VideoJS = require('video.js')
  , wording = require('../locals');

/**
 * @Class PlayerComponent
 */

module.exports = React.createClass({
  render: function () {
    var startDate = new Date(this.props.ctx.data.link.start);

    return (
      <div className="notAvailable vcenter">
        <h3>{wording('videoNotYetAvailable')}</h3>
        <h3>{startDate.toLocaleString()}</h3>
      </div>
    );
  }
});


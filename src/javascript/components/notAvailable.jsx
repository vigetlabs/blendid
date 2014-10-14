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
        <h3>Not yet available</h3>
        <h4>Will be available at<br />{startDate.toLocaleString()}</h4>
        <h4></h4>
      </div>
    );
  }
});


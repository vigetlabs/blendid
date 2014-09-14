var React = require('react');

/**
 * @Class CommentBox
 */

module.exports = React.createClass({
  render: function () {
    return (
      <div className="view">
        <h1>{this.props.title}</h1>
        <p>
          {this.props.description}
        </p>
        <ul>
          {this.props.tools.map(function (tool) {
            return <li>{tool}</li>
          })}
        </ul>
        <img src="/images/gulp.png" alt="Have a gulp!" />
      </div>
    );
  }
});
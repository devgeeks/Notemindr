/**
 * @jsx React.DOM
 */

var React = require('React');

var Card = React.createClass({

  render: function() {
    return (
      <div className={'Card item ' + this.props.extraClassNames}
        id={this.props.id} key={this.props.key}>{this.props.title}</div>
    );
  }

});

module.exports = Card;

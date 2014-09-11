/**
 * @jsx React.DOM
 */
var React = require('React');

var NavbarButton = React.createClass({

  getDefaultProps : function() {
    return {
      clickHandler : function() { return false; }
    };
  },

  handleClick: function(event) {
    return this.props.clickHandler(event);
  },

  render: function() {
    return (
      <div className={'NavbarButton button ' + this.props.pull || 'left'}>
        <a href='#' className={this.props.icon} onClick={this.handleClick}></a>
      </div>
    );
  }

});

module.exports = NavbarButton;

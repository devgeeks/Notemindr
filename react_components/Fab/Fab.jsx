/**
 * @jsx React.DOM
 */

var React = require('React');

var Fab = React.createClass({

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
      <div className='Fab button fab'>
        <a href="#" className="ion-plus" onClick={this.handleClick}></a>
      </div>
    );
  }

});

module.exports = Fab;

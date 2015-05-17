'use strict';

var React = require('react');

require('./index.less');

var Item = React.createClass({

  propTypes: {
    item: React.PropTypes.object
  },

  render: function() {
    return (
      <li key={this.props.item.id} className='item'>
        {this.props.item.h1}
      </li>
    );
  }

});

module.exports = Item;

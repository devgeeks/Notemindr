'use strict';

var React = require('react');

require('./index.less');

var Item = React.createClass({

  propTypes: {
    item: React.PropTypes.object
  },

  render: function() {
    return (
      <div key={this.props.item.id} className='item'>
        <a href='#' role='listitem'>
          <div className='heading'>{this.props.item.h1}</div>
          <div className='subheading'>{this.props.item.h2}</div>
        </a>
      </div>
    );
  }

});

module.exports = Item;

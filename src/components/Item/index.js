'use strict';

var React = require('react');

require('./index.less');

var Item = React.createClass({

  render: function() {
    return (
      <li className='item' />
    );
  }

});

module.exports = Item;

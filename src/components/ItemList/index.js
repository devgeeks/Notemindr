'use strict';

var React = require('react');

require('./index.less');

var ItemList = React.createClass({

  render: function() {
    return (
      <div className='itemlist'>
        <ul />
      </div>
    );
  }

});

module.exports = ItemList;

'use strict';

var React = require('react');

var Item = require('../Item');

//var noteActions = require('../../actions/noteActionCreators');

require('./index.less');

var ItemList = React.createClass({

  propTypes: {
    noteState: React.PropTypes.object,
    sessionState: React.PropTypes.object
  },

  render: function() {
    var items = this.props.noteState.items.map((item) => {
      return <Item item={item} key={item.id} />;
    });
    return (
      <div className='itemlist' role='list'>{items}</div>
    );
  }

});

module.exports = ItemList;

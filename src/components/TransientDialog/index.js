"use strict";

var React = require('react');

require('./index.less');

var Dialog = React.createClass({

  propTypes: {
    dismissed: React.PropTypes.bool,
    message: React.PropTypes.string
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'transientdialog': true,
      'dismissed': this.props.dismissed
    });
    return (
      <div className={classes}>
        <div>{this.props.message}</div>
      </div>
    );
  }

});

module.exports = Dialog;

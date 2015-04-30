/**
 * @jsx React.DOM
 */

 /* jshint node: true */
 "use strict";

var React = require('react/addons');
var PureRenderMixin = React.PureRenderMixin;

var Spinner = React.createClass({
  mixins: [PureRenderMixin],

  getDefaultProps: function() {
    return {
      width: '30px',
      height: '30px',
      inline: false,
      dark: false
    };
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'spinnercontainer': true,
      'pending': this.props.pending,
      'dark': this.props.dark
    });

    var spinnerDivStyle = {
      width: this.props.width,
      display: (this.props.inline ? 'inline-' : '') + 'block'
    };

    return (
      <div className={classes} style={spinnerDivStyle}>
        <svg className='spinner' width={this.props.width} height={this.props.height}
            viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>
          <circle className='path' fill='none' strokeWidth='6'
            strokeLinecap='round' cx='33' cy='33' r='30'></circle>
        </svg>
      </div>
    );
  }

});

module.exports = Spinner;

/**
 * @jsx React.DOM
 */

var React = require('React');

var Spinner = React.createClass({

  render: function() {
    return (
      <div class="Spinner spinnercontainer">
        <svg class="spinner" width="20px" height="20px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
         <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
      </div>
    );
  }

});

module.exports = Spinner;

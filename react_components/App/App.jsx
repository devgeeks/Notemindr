/**
 * @jsx React.DOM
 */

var React = window.React = require('React'),
    LoginScreen = require('../LoginScreen/LoginScreen.jsx'),
    MainScreen = require('../MainScreen/MainScreen.jsx');

var App = React.createClass({

  getDefaultProps: function() {
    return {
      loggedIn: true // @TODO - determine this properly
    };
  },

  render: function() {
    return (
      <div className='App app'>
        {this.props.loggedIn ? <MainScreen /> : <LoginScreen />}
      </div>
    );
  }

});

var notemindr = React.renderComponent(
  <App />,
  document.body
);

module.exports = App;

var NOTES = [];

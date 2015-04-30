/**
 * @jsx React.DOM
 */

/* jshint node: true */
'use strict';

/**
 * React controller view
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
// Modified version of Khan TimeoutTransitionGroup
var TimeoutTransitionGroup = require('timeout-transition-group');

var Header = require('../Header');
var Login = require('../Login');

var App = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      pending: false,
      dismissed: false
    };
  },

  loginHandler: function(event) {
    event.preventDefault();
    // @TODO - this is just a stub for now...
    var that = this;
    this.setState({
      pending: true
    });
    setTimeout(function() {
      that.setState({
        pending: false,
        dismissed: true
      });
    }, 1000);
  },

  render: function() {
    return (
      <div className='app'>
        <Login dismissed={this.state.dismissed} pending={this.state.pending}
            appName='Notemindr' loginHandler={this.loginHandler} />
        <Header />
        <TimeoutTransitionGroup component='div' transitionName='page'
            enterTimeout={300} leaveTimeout={300}>
          <RouteHandler key={name} />
        </TimeoutTransitionGroup>
      </div>
    );
  }
});

module.exports = App;

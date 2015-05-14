'use strict';

/**
 * React controller view
 */
var React = require('react');
var Router = require('react-router');
var {RouteHandler} = Router;
// Modified version of Khan TimeoutTransitionGroup
var TimeoutTransitionGroup = require('timeout-transition-group');

require('./index.less');

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

    let login = this.refs.login;
    let username = login.refs.username.getDOMNode().value.trim();
    let passphrase = login.refs.passphrase.getDOMNode().value.trim();
    // Bail when one is empty
    if (!username || !passphrase) {
      // @TODO - add an error here instead of this stub
      this.setState({
        pending: true
      });
      setTimeout(() => {
        this.setState({
          pending: false,
          dismissed: true
        });
      }, 2000);
      return;
    }
    this.setState({ pending: true });

    // @TODO - This should all be handled in an Action Creator
    window.crypton.authorize(username, passphrase, (session, err) => {
      if (err) {
        // @TODO - handle error here
        this.setState({ pending: false });
        return;
      }
      // @TODO - write the session to the AccountStore
      this.setState({
        pending: false,
        dismissed: true
      });
    });
  },

  render: function() {
    return (
      <div className='app'>
        <Login dismissed={this.state.dismissed} pending={this.state.pending}
            appName='Notemindr' loginHandler={this.loginHandler}
            ref='login' />
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

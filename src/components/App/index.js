'use strict';

/**
 * React controller view
 */
var React = require('react');
var Router = require('react-router');
var {RouteHandler} = Router;
// Modified version of Khan TimeoutTransitionGroup
var TimeoutTransitionGroup = require('timeout-transition-group');

var SessionStore = require('../../stores/SessionStore');
var sessionActions = require('../../actions/sessionActionCreators');

require('./index.less');

var Header = require('../Header');
var Login = require('../Login');

var App = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    let sessionState = SessionStore.getState();
    return {
      pending: sessionState.pending,
      dismissed: !!sessionState.session,
      sessionState: sessionState.session
    };
  },

  componentDidMount: function() {
    SessionStore.on('change', this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeListener('change', this._onChange);
  },

  _onChange: function() {
    let sessionState = SessionStore.getState();
    this.setState({
      sessionState: sessionState,
      pending: sessionState.pending,
      dismissed: !!sessionState.session
    });
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
    // @TODO - This should all be handled in an Action Creator
    // @TODO - including setting the state of pending
    sessionActions.login(username, passphrase);
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

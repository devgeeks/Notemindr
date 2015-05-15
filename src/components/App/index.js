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
var constants = require('../../constants/appConstants');

require('./index.less');

var Header = require('../Header');
var Login = require('../Login');


function getSessionState() {
  let sessionState = SessionStore.getState();
  return {
    dismissed: !!sessionState.session,
    pending: sessionState.pending,
    sessionState: sessionState.session
  };
}

var App = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return getSessionState();
  },

  componentDidMount: function() {
    SessionStore.on(constants.CHANGE_EVENT, this._onSessionStateChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeListener('change', this._onSessionStateChange);
  },

  _onSessionStateChange: function() {
    this.setState(getSessionState());
  },

  loginHandler: function(event) {
    event.preventDefault();

    let login = this.refs.login;
    let username = login.refs.username.getDOMNode().value.trim();
    let passphrase = login.refs.passphrase.getDOMNode().value.trim();
    // Bail when one is empty
    if (!username || !passphrase) {
      // @TODO - handle errors in the UI
      console.error('Missing username or passphrase');
      return;
    }
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

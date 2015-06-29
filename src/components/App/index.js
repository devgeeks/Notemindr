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
var NoteStore = require('../../stores/NoteStore');
var sessionActions = require('../../actions/sessionActionCreators');
//var noteActions = require('../../actions/noteActionCreators');
var constants = require('../../constants/appConstants');

require('./index.less');

var Header = require('../Header');
var Login = require('../Login');
var TransientDialog = require('../TransientDialog');

function getSessionState() {
  let sessionState = SessionStore.getState();
  return {
    dismissed: !!sessionState.session,
    pending: sessionState.pending,
    session: sessionState.session,
    error: sessionState.error
  };
}

function getNoteState() {
  let noteState = NoteStore.getState();
  return {
    items: noteState.notes,
    item: noteState.note,
    pending: noteState.pending,
    error: noteState.error
  };
}

var App = React.createClass({

  getInitialState: function() {
    return {
      sessionState: getSessionState(),
      noteState: getNoteState(),
      transientDialog: {
        message: '',
        dismissed: true
      }
    };
  },

  componentDidMount: function() {
    SessionStore.on(constants.CHANGE_EVENT, this._onStateChange);
    NoteStore.on(constants.CHANGE_EVENT, this._onStateChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeListener(constants.CHANGE_EVENT, this._onStateChange);
    NoteStore.removeListener(constants.CHANGE_EVENT, this._onStateChange);
  },

  _onStateChange: function() {
    let sessionState = getSessionState();
    let noteState = getNoteState();
    let error = sessionState.error || noteState.error;
    if (error) {
      this.showTransientDialog(error);
    }
    this.setState({
      sessionState: sessionState,
      noteState: noteState
    });
  },

  showTransientDialog: function(message, timeout) {
      let transientDialogState = {
        message: message || 'Undefined error',
        dismissed: false
      };
      this.setState({transientDialog: transientDialogState});
      setTimeout(() => {
        transientDialogState = {
          message: '',
          dismissed: true
        };
        this.setState({transientDialog: transientDialogState});
      }, timeout || 2000);
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
      this.showTransientDialog('Missing username or passphrase');
      return;
    }
    sessionActions.login(username, passphrase);
  },

  render: function() {
    return (
      <div className='app'>
        <TransientDialog message={this.state.transientDialog.message}
            dismissed={this.state.transientDialog.dismissed} />
        <Login dismissed={this.state.sessionState.dismissed}
            pending={this.state.sessionState.pending}
            appName='Notemindr' loginHandler={this.loginHandler}
            ref='login' />
        <Header />
        <TimeoutTransitionGroup component='div' transitionName='page'
            enterTimeout={300} leaveTimeout={300}>
          <RouteHandler key={name} sessionState={this.state.sessionState}
              noteState={this.state.noteState} />
        </TimeoutTransitionGroup>
      </div>
    );
  }
});

module.exports = App;

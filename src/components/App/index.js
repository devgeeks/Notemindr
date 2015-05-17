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
var noteActions = require('../../actions/noteActionCreators');
var constants = require('../../constants/appConstants');

require('./index.less');

var Header = require('../Header');
var Login = require('../Login');

function getSessionState() {
  let sessionState = SessionStore.getState();
  return {
    dismissed: !!sessionState.session,
    pending: sessionState.pending,
    session: sessionState.session
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
      noteState: getNoteState()
    };
  },

  componentDidMount: function() {
    SessionStore.on(constants.CHANGE_EVENT, this._onSessionStateChange);
    NoteStore.on(constants.CHANGE_EVENT, this._onNoteStateChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeListener('change', this._onSessionStateChange);
    NoteStore.removeListener('change', this._onNoteStateChange);
  },

  _onSessionStateChange: function() {
    let sessionState = getSessionState();
    if (sessionState.session) {
      // @TODO - use an action creator to fetch all notes
      console.log('we have a session');
      setTimeout(() => {
        noteActions.fetchAllForUser(sessionState.session);
      }, 0);
    }
    this.setState(sessionState);
  },

  _onNoteStateChange: function() {
    let noteState = getNoteState();
    this.setState(noteState);
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
          <RouteHandler key={name} sessionState={this.state.sessionState}
              noteState={this.state.noteState} />
        </TimeoutTransitionGroup>
      </div>
    );
  }
});

module.exports = App;

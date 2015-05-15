'use strict';

var constants = require('../constants/appConstants');
var dispatcher = require('../dispatcher/appDispatcher');

var SessionActionCreators = {
  login: (username, passphrase) => {
    dispatcher.dispatch({
      type: constants.LOGIN,
      username: username,
      passphrase: passphrase
    });
  },
  logout: () => {
    dispatcher.dispatch({
      type: constants.LOGOUT
    });
  },
  changePassphrase: (username, oldPassphrase, newPassphrase) => {
    dispatcher.dispatch({
      type: constants.CHANGE_PASSPHRASE,
      username: username,
      oldPassphrase: oldPassphrase,
      newPassphrase: newPassphrase
    });
  },
  sessionPending: () => {
    dispatcher.dispatch({
      type: constants.SESSION_PENDING
    });
  },
  sessionResponse: (err, session) => {
    dispatcher.dispatch({
      type: constants.SESSION_RESPONSE,
      session: session,
      error: err
    });
  }
};

module.exports = SessionActionCreators;

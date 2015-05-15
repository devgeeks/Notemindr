'use strict';

/* global crypton */

var sessionActions = require('../actions/sessionActionCreators');

module.exports = {
  login: (username, password) => {
    crypton.authorize(username, password, (err, session) => {
      sessionActions.sessionResponse(err, session);
    });
  }
};

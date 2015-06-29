'use strict';

/* global crypton */

var sessionActions = require('../actions/sessionActionCreators');

module.exports = {
  login: (username, passphrase) => {
    crypton.authorize(username, passphrase, (err, session) => {
      sessionActions.sessionResponse(err, session);
    });
    // @NOTE: Keep the below for when we need to mock login
    //console.log(crypton.host);
    //console.log(username, passphrase);
    //setTimeout(() => {
      //sessionActions.sessionResponse(undefined, {});
    //}, 2000);
  }
};

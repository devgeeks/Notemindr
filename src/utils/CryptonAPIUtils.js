'use strict';

/* global crypton */

//var appConstants = require('../constants/appConstants');

module.exports = {
  authorize: (username, passphrase) => {
    crypton.authorize(username, passphrase, (err, session) => {
      if (err) {
        // @TODO - Call an ERROR ACTION
        return;
      }
      // @TODO - Call a SUCCESS ACTION
      console.log(session);
      return;
    });
  }
};

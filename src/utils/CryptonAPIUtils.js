/* global crypton */
/* jshint: node: true */

var appConstants = require('../constants/appConstants');

module.exports = {
  authorize: function(username, passphrase) {
    crypton.authorize(username, passphrase, function(err, session) {
      if (err) {
        // @TODO - Call an ERROR ACTION
        return;
      }
      // @TODO - Call a SUCCESS ACTION
      return;
    });
  }
};

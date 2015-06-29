/* jshint node: true */
'use strict';

var constants = require('../../constants/appConstants.js');
var dispatcher = require('../../dispatcher/appDispatcher.js');
var { mixin } = require('tinyvents');

var cryptonAPI = require('../../utils/CryptonAPIUtils.js');

var _state = {
  session: null,
  error: '',
  pending: false
};

var SessionStore = {

  getState: function() {
    return _state;
  },

  emitChange: function() {
    this.trigger(constants.CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.off(constants.CHANGE_EVENT, callback);
  }
};

mixin(SessionStore);

SessionStore.dispatchToken = dispatcher.register((payload) => {

  var action = payload.type;

  switch(action) {

    case constants.LOGIN:
      console.log(payload, 'SessionStore::LOGIN');
      let username = payload.username;
      let passphrase = payload.passphrase;
      _state.error = '';
      _state.pending = true;
      cryptonAPI.login(username, passphrase);
      break;

    case constants.SESSION_RESPONSE:
      console.log(payload, 'SessionStore::SESSION_RESPONSE');
      _state.pending = false;
      _state.error = payload.error || '';
      _state.session = payload.session || null;
      break;

    case constants.LOGOUT:
      console.log(payload, 'SessionStore::LOGOUT');
      _state.session = null;
      break;

    default:
      return true;
  }

  SessionStore.emitChange();

  return true;
});

module.exports = SessionStore;

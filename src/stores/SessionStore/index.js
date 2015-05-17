/* jshint node: true */
'use strict';

var __ = require('../../constants/appConstants.js');
var dispatcher = require('../../dispatcher/appDispatcher.js');
var Tinyvents = require('tinyvents');

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
    this.trigger(__.CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(__.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.off(__.CHANGE_EVENT, callback);
  }
};

Tinyvents.mixin(SessionStore);

SessionStore.dispatchToken = dispatcher.register((payload) => {

  var action = payload.type;

  switch(action) {

    case __.LOGIN:
      let username = payload.username;
      let passphrase = payload.passphrase;
      _state.pending = true;
      cryptonAPI.login(username, passphrase);
      break;

    case __.SESSION_RESPONSE:
      console.log(payload);
      _state.pending = false;
      _state.error = payload.error || '';
      _state.session = payload.session || null;
      break;

    case __.LOGOUT:
      console.log(payload);
      _state.session = null;
      break;

    default:
      return true;
  }

  SessionStore.emitChange();

  return true;
});

module.exports = SessionStore;

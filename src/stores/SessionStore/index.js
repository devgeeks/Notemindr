/* jshint node: true */
'use strict';

var constants = require('../../constants/appConstants.js');
var dispatcher = require('../../dispatcher/appDispatcher.js');
var Tinyvents = require('tinyvents');

var cryptonAPI = require('../../utils/CryptonAPIUtils.js');
//var sessionActions = require('../../actions/sessionActionCreators');

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

Tinyvents.mixin(SessionStore);

SessionStore.dispatchToken = dispatcher.register((payload) => {

  var action = payload.type;

  switch(action) {
    case constants.PENDING_SESSION:
      console.log(payload);
      _state.pending = true;
      _state.error = '';
      break;

    case constants.LOGIN:
      console.log(payload);
      dispatcher.dispatchAsync(
        cryptonAPI.login(payload.username, payload.passphrase), {
          request: constants.LOGIN,
          success: constants.SESSION_RESPONSE,
          failure: constants.SESSION_ERROR
        });
      break;

    case constants.LOGOUT:
      console.log(payload);
      break;

    case constants.SESSION_RESPONSE:
      console.log(payload);
      _state.session = payload.session;
      _state.pending = false;
      _state.error = payload.error || '';
      // @TODO remove this once the app responds to errors
      console.log(_state.error || 'success');
      break;

    default:
      return true;
  }

  SessionStore.emitChange();

  return true;
});

module.exports = SessionStore;

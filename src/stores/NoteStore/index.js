'use strict';

var __ = require('../../constants/appConstants');
var dispatcher = require('../../dispatcher/appDispatcher');
var SessionStore = require('../SessionStore');

var Tinyvents = require('tinyvents');

var _state = {
  notes: [],
  note: {},
  error: '',
  pending: false
};

var NoteStore = {

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

Tinyvents.mixin(NoteStore);

NoteStore.dispatchToken = dispatcher.register((payload) => {

  var action = payload.type;

  switch(action) {

    case __.GET_ALL_NOTES:
      console.log(payload);
      break;

    case __.CREATE_NOTE:
      console.log(payload);
      break;

    case __.GET_NOTE:
      console.log(payload);
      break;

    case __.UPDATE_NOTE:
      console.log(payload);
      break;

    case __.REMOVE_NOTE:
      console.log(payload);
      break;

    case __.SESSION_RESPONSE:
      dispatcher.waitFor([SessionStore.dispatchToken]);
      console.log(payload, 'NoteStore::SESSION_RESPONSE');
      if (payload.session) {
        // This is a log in
        // @TODO - remove placeholder data
        _state.notes = [
          {id: 1, h1: 'A large heading', body: 'This is the body of a note...'},
          {id: 2, h1: 'Big heading', h2: 'Small heading', body: 'A body'}
        ];
        // Use the payload.session to fetch all notes from the CryptonAPIUtils
        // ...
      }
      else {
        // This is a logout
        _state = {
          notes: [],
          note: {},
          error: '',
          pending: false
        };
      }
      break;

    default:
      return true;
  }

  NoteStore.emitChange();

  return true;
});

module.exports = NoteStore;

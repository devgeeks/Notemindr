'use strict';

var constants = require('../../constants/appConstants');
var dispatcher = require('../../dispatcher/appDispatcher');
var SessionStore = require('../SessionStore');

var { mixin } = require('tinyvents');

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
    this.trigger(constants.CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.off(constants.CHANGE_EVENT, callback);
  }
};

mixin(NoteStore);

NoteStore.dispatchToken = dispatcher.register((payload) => {

  var action = payload.type;

  switch(action) {

    case constants.GET_ALL_NOTES:
      console.log(payload);
      break;

    case constants.CREATE_NOTE:
      console.log(payload);
      break;

    case constants.GET_NOTE:
      console.log(payload);
      break;

    case constants.UPDATE_NOTE:
      console.log(payload);
      break;

    case constants.REMOVE_NOTE:
      console.log(payload);
      break;

    case constants.SESSION_RESPONSE:
      dispatcher.waitFor([SessionStore.dispatchToken]);
      console.log(payload, 'NoteStore::SESSION_RESPONSE');
      if (payload.session) {
        // This is a log in
        // @TODO - remove placeholder data
        _state.notes = [
          {id: 1, h1: 'A large heading', body: 'This is the body of a note...'},
          {id: 2, h1: 'Big heading', h2: 'Small heading', body: 'A body'},
          {id: 3, h1: 'Big heading', h2: 'Small heading', body: 'A body'},
          {id: 4, h1: 'An interesting heading', body: 'A body'},
          {id: 5, h1: 'Heading', body: 'A body'},
          {id: 6, h1: 'Stupid heading', h2: 'Small heading', body: 'A body'}
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

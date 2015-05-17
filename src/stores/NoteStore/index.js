'use strict';

var __ = require('../../constants/appConstants');
var dispatcher = require('../../dispatcher/appDispatcher');

var Tinyvents = require('tinyvents');

var _state = {
  notes: [
    {id: 1, h1: 'A large heading', body: 'This is the body of a note...'},
    {id: 2, h1: 'Big heading', h2: 'Small heading', body: 'A body'}
  ],
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

    default:
      return true;
  }

  NoteStore.emitChange();

  return true;
});

module.exports = NoteStore;

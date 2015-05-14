'use strict';

var constants = require('../../constants/appConstants');
var dispatcher = require('../../dispatcher/appDispatcher');

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
    this.trigger(constants.CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.off(constants.CHANGE_EVENT, callback);
  }
};

Tinyvents.mixin(NoteStore);

NoteStore.dispatchToken = dispatcher.register((payload) => {
  var action = payload.action;
  console.log(action.type);
});

module.exports = NoteStore;

'use strict';

var constants = require('../constants/appConstants');
var dispatcher = require('../dispatcher/appDispatcher');

var NoteActionCreators = {
  fetchAllForUser: (session) => {
    dispatcher.dispatch({
      type: constants.GET_ALL_NOTES,
      session: session
    });
  },
  create: (note) => {
    dispatcher.dispatch({
      type: constants.CREATE_NOTE,
      note: note
    });
  },
  get: (noteId) => {
    dispatcher.dispatch({
      type: constants.GET_NOTE,
      noteId: noteId
    });
  },
  update: (noteId, note) => {
    dispatcher.dispatch({
      type: constants.UPDATE_NOTE,
      noteId: noteId,
      note: note
    });
  },
  remove: (noteId) => {
    dispatcher.dispatch({
      type: constants.REMOVE_NOTE,
      noteId: noteId
    });
  }
};

module.exports = NoteActionCreators;

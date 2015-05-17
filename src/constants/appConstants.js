'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
  CHANGE_EVENT: null,     // Generic store change event
  SESSION_PENDING: null,  // An async session operation is pending
  SESSION_RESPONSE: null, // Logged in or out, session or error returned
  LOGIN: null,            // Log in using crypton.authorize()
  LOGOUT: null,           // Log out from crypton session
  GET_ALL_NOTES: null,    // Fetch all notes for this user
  CREATE_NOTE: null,      // Create a note
  GET_NOTE: null,         // Get (read) a note
  UPDATE_NOTE: null,      // Update a note
  REMOVE_NOTE: null       // Remove (delete) a note
});

'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
  PENDING_SESSION: null,  // An async session operation is pending
  LOGIN: null,            // Log in using crypton.authorize()
  LOGOUT: null,           // Log out from crypton session
  SESSION_RESPONSE: null, // Logged in or out, session or error returned
  CREATE_NOTE: null,      // Create a note
  GET_NOTE: null,         // Get (read) a note
  UPDATE_NOTE: null,      // Update a note
  REMOVE_NOTE: null       // Remove (delete) a note
});

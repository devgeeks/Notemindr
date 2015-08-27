/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import cryptonAPI from '../utils/CryptonAPI';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT =  'LOGOUT';

// Most of these functions are only exported so they can be tested :/
export function shouldAuthenticate(state, username, passphrase) {
  return (dispatch) => {
    if (!username || !passphrase) {
      return dispatch(authenticationFailed('No username or passphrase supplied'));
    }
    const { pending } = state.auth;
    if (pending) {
      return false;
    }
    return true;
  };
}

export function requestAuthentication() {
  return {
    type: LOGIN_PENDING
  }
}

export function authenticationSucceeded(account) {
  return {
    type: LOGIN_SUCCESS,
    account
  };
}

export function authenticationFailed(error) {
  return {
    type: LOGIN_FAIL,
    error
  }
}

export function authenticateSession(username, passphrase) {
  return (dispatch) => {
    dispatch(requestAuthentication(username));
    return cryptonAPI.login(username, passphrase)
      .then((account) => {
        dispatch(authenticationSucceeded(account));
      })
      .catch((err) => {
        dispatch(authenticationFailed(err));
      });
  };
}

export function deauthenticateSession(state) {
  return (dispatch) => {
    const { auth } = state;
    const { account } = auth;
    const { username } = account;
    if (username) {
      return cryptonAPI.logout(username)
        .then((account) => {
          dispatch(deauthenticatedSession(account));
        })
        .catch((err) => {
          // Does this need its own fail function?
          dispatch(authenticationFailed(err));
        });
    }
    return false;
  };
}

export function deauthenticatedSession(account) {
  return {
    type: LOGOUT,
    account
  };
}

export function login(username, passphrase) {
  return (dispatch, getState) => {
    if (shouldAuthenticate(getState(), username, passphrase)) {
      return dispatch(authenticateSession(username, passphrase));
    }
  };
}

export function logout() {
  return (dispatch, getState) => {
    return dispatch(deauthenticateSession(getState()));
  };
}

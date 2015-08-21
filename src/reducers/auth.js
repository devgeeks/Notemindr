/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import {
  LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT
} from '../actions/auth';

const initialState = {
  error: null,
  account: null,
  pending: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        error: null,
        pending: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
        account: action.account
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
        pending: false
      };
    case LOGOUT:
      return {
        ...state,
        error: null,
        pending: false,
        account: action.account
      };
    default:
      return state;
  }
};


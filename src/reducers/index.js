/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { combineReducers } from 'redux';

import auth from './auth'
import entryIndex from './entryIndex'

const combinedReducer = combineReducers({
  auth,
  entryIndex
});

export default combinedReducer;


/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//import { devTools, persistState } from 'redux-devtools';

let finalCreateStore = () => {};
if (!__PRODUCTION__) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug=([^&]+)\b/)),
    createStore
  );
} else {
  finalCreateStore = compose(
    applyMiddleware(thunk),
    createStore
  );
}

export default function configureStore(reducer) {
  return finalCreateStore(reducer);
}

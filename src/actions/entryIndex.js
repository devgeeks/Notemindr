/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import cryptonAPI from '../utils/CryptonAPI';

export const INDEX_LOAD_PENDING = 'INDEX_LOAD_PENDING';
export const INDEX_LOAD_SUCCESS = 'INDEX_LOAD_SUCCESS';
export const INDEX_LOAD_FAIL = 'INDEX_LOAD_FAIL';

export const INDEX_SAVE_PENDING = 'INDEX_SAVE_PENDING';
export const INDEX_SAVE_SUCCESS = 'INDEX_SAVE_SUCCESS';
export const INDEX_SAVE_FAIL = 'INDEX_SAVE_FAIL';

export const INDEX_CACHED = 'INDEX_CACHED';

export const INDEX_FILTERED = 'INDEX_FILTERED';

const _entryIndexItemName_ = '__notemindrEntryIndex__';

function shouldLoadIndex(state) {
  const { entryIndex } = state;
  const { loadPending } = entryIndex;
  return !loadPending;
}

function loadEntryIndex(state) {
  return (dispatch) => {
    dispatch(loadingIndex());
    // Check for a cached state
    const { auth, entryIndex } = state;
    const { account } = auth;
    window.account = account;
    const { index } = entryIndex;
    if (index) {
      dispatch(loadedIndexFromCache(index));
    } else {
      const { username, password } = account;
      cryptonAPI.getLocallyCachedItem(_entryIndexItemName_, username, password)
        .then((index) => {
          dispatch(loadedIndexFromCache(index));
        })
        .catch((err) => {
          console.warn(err);
          // Should cache failures just get swallowed?
          //dispatch(loadIndexFailed(err));
        });
    }
    // Now load again from Crypton
    return cryptonAPI.getOrCreateItem(_entryIndexItemName_)
      .then((index) => {
        dispatch(loadedIndexFromCrypton(index));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadingIndexFailed(err));
      });
  };
}

function loadedIndexFromCache(index) {
  return {
    type: INDEX_CACHED,
    index
  };
}

function loadedIndexFromCrypton(index) {
  return {
    type: INDEX_LOAD_SUCCESS,
    index
  };
}

function loadingIndex() {
  return {
    type: INDEX_LOAD_PENDING
  };
}

function loadingIndexFailed(error) {
  return {
    type: INDEX_LOAD_FAIL,
    error
  };
}

function shouldSaveIndex(state) {
  const { auth, entryIndex } = state;
  const { account } = auth;
  const { index, savePending } = entryIndex;
  return (!!savePending && !!account && !!index);
}

function saveEntryIndex(state, newIndex) {
  return (dispatch) => {
    dispatch(savingIndex());
    return cryptonAPI.saveItem(_entryIndexItemName_, newIndex)
      .then((index) => {
        dispatch(savedIndex(index));
        dispatch(cacheIndex());
      })
      .catch((err) => {
        dispatch(savingIndexFailed(err))
      });
  };
}

function savedIndex(index) {
  return {
    type: INDEX_SAVE_SUCCESS,
    index
  };
}

function savingIndexFailed(error) {
  return {
    type: INDEX_SAVE_FAIL,
    error
  };
}

function savingIndex() {
  return {
    type: INDEX_SAVE_PENDING
  };
}

function cacheEntryIndex(state) {
  const { auth, entryIndex } = state;
  const { account } = auth;
  const { username, password } = account;
  const { index } = entryIndex;
  return cryptonAPI
    .setLocallyCachedItem(_entryIndexItemName_, index, username, password)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.warn(err);
    });
}

function filterEntryIndex(state, filter) {
  const { entryIndex } = state;
  const { index } = entryIndex;
  // @TODO actually filter the index somehow
  console.log(filter);
  return (dispatch) => {
    dispatch(filteredIndex(index));
  };
}

function filteredIndex(index) {
  return {
    type: INDEX_FILTERED,
    index
  };
}

export function loadIndex() {
  return (dispatch, getState) => {
    if (shouldLoadIndex(getState())) {
      return dispatch(loadEntryIndex(getState()));
    }
  };
}

export function saveIndex(newIndex) {
  return (dispatch, getState) => {
    if (shouldSaveIndex(getState())) {
      return dispatch(saveEntryIndex(getState(), newIndex));
    }
  };
}

export function cacheIndex() {
  return (dispatch, getState) => {
    return dispatch(cacheEntryIndex(getState()));
  };
};

export function filterIndex(filter) {
  return (dispatch, getState) => {
    return dispatch(filterEntryIndex(getState(), filter));
  };
};

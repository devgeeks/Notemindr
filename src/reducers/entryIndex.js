import {
  INDEX_LOAD_PENDING, INDEX_LOAD_SUCCESS, INDEX_LOAD_FAIL, INDEX_CACHED,
  INDEX_SAVE_PENDING, INDEX_SAVE_SUCCESS, INDEX_SAVE_FAIL, INDEX_FILTERED
} from '../actions/entryIndex';

const initialState = {
  index: {
    name: '',
    value: []
  },
  loadPending: false,
  savePending: false,
  error: null
};

export default function entryIndex(state = initialState, action) {
  switch (action.type) {
    case INDEX_LOAD_PENDING:
      return {
        ...state,
        error: null,
        loadPending: true
      };
    case INDEX_LOAD_SUCCESS:
      return {
        ...state,
        error: null,
        loadPending: false,
        index: action.index
      };
    case INDEX_LOAD_FAIL:
      return {
        ...state,
        error: action.error,
        loadPending: false
      };
    case INDEX_SAVE_PENDING:
      return {
        ...state,
        error: null,
        savePending: true
      };
    case INDEX_SAVE_SUCCESS:
      return {
        ...state,
        error: null,
        savePending: false,
        index: action.index
      };
    case INDEX_SAVE_FAIL:
      return {
        ...state,
        error: action.error,
        savePending: false
      };
    case INDEX_CACHED:
      return {
        ...state,
        index: action.index
      };
    case INDEX_FILTERED:
      // return a new entryIndex or something else?
      // how do we return to the full index? cache?
      // back it up somehow?
      return {
        ...state,
        error: null,
        index: action.index
      };
    default:
      return state;
  }
};


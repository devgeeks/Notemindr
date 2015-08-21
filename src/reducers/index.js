import { combineReducers } from 'redux';

import auth from './auth'
import entryIndex from './entryIndex'

const combinedReducer = combineReducers({
  auth,
  entryIndex
});

export default combinedReducer;


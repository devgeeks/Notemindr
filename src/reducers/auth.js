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


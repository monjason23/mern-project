import { combineReducers } from "redux";
import { userConstants } from "./constants";

function isLoggedIn(state = { isLoading: false, user: null }, action) {
  switch (action.type) {
    case userConstants.LOGIN_PENDING:
      return {
        isLoading: true,
        user: null
      };

    case userConstants.LOGIN_SUCCESS:
      return {
        isLoading: false,
        user: action.payload
      };

    case userConstants.LOGIN_FAILURE:
      return {
        isLoading: false,
        user: null
      };

    default:
      return state;
  }
}

function isAuthenticated(state = { auth: false, user: null }, action) {
  switch (action.type) {
    case userConstants.AUTH_PENDING:
      return {
        auth: false,
        user: null
      };

    case userConstants.AUTH_SUCCESS:
      return {
        auth: true,
        user: action.payload
      };

    case userConstants.AUTH_FAILURE:
      return {
        auth: false,
        user: action.payload
      };

    default:
      return state;
  }
}

export default combineReducers({
  isLoggedIn,
  isAuthenticated
});

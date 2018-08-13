import axios from "axios";
import { userConstants } from "./constants";

export function logIn(loginDetails, callback) {
  return dispatch => {
    dispatch({ type: userConstants.LOGIN_PENDING });

    const request = axios.post("/login", loginDetails);

    return request
      .then(
        response => dispatch(loginSuccess(response)),
        err => dispatch(loginFailure(err))
      )
      .then(() => callback());
  };
}

function loginSuccess(response) {
  return {
    type: userConstants.LOGIN_SUCCESS,
    payload: response.data
  };
}

function loginFailure(error) {
  return {
    type: userConstants.LOGIN_FAILURE,
    payload: error
  };
}

import axios from "axios";
import { userConstants } from "./constants";

export function auth() {
  return dispatch => {
    dispatch({ type: userConstants.AUTH_PENDING });

    const request = axios.get("/user");

    return request.then(
      response => dispatch(authSuccess(response)),
      err => dispatch(authFailure(err))
    );
  };
}

function authSuccess(response) {
  console.log(response);
  return {
    type: userConstants.AUTH_SUCCESS,
    payload: response.data
  };
}

function authFailure(error) {
  return {
    type: userConstants.AUTH_FAILURE,
    payload: error
  };
}

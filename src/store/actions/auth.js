import axios from "axios";
import * as actionTypes from "./actionTypes";

const realHost = 'https://mind-race.herokuapp.com'
const localhost = 'http://localhost:8000'

export const endpoint = `${realHost}`

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("mind_race_token");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};


export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${endpoint}/rest-auth/login/`, {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        localStorage.setItem("mind_race_token", token);
        localStorage.removeItem("mind_race_guest_id")
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};


export const authSignup = (username, password, confirmPassword) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${endpoint}/rest-auth/registration/`, {
        username: username,
        email: `${username}@${username}.com`,
        password1: password,
        password2: confirmPassword
      })
      .then(res => {
        const token = res.data.key;
        localStorage.setItem("mind_race_token", token);
        localStorage.removeItem("mind_race_guest_id")
        dispatch(authSuccess(token));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};


export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("mind_race_token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  };
};

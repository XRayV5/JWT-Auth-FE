import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, 
  UNAUTH_USER,
  FETCH_MESSAGE,
 } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return (dispatch) => {
    postAuth(dispatch, ROOT_URL, 'signin', { email, password });
  };
}

export function signupUser({ email, password }) {
  return (dispatch) => {
    postAuth(dispatch, ROOT_URL, 'signup', { email, password });
  };
}

export function postAuth(dispatch, ROOT_URL, endpoint, { email, password }) {
  axios.post(`${ROOT_URL}/${endpoint}`, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        browserHistory.push('/feature');
      })
      .catch((res) => {
        if (endpoint == 'signup') {
          dispatch(authError(res.data.error));
        } else {
          dispatch(authError('Bad login info'));
        }
      });
}

export function authError(err) {
  return {
    type: AUTH_ERROR,
    payload: err,
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER,
  };
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(res => dispatch(
        {
          type: FETCH_MESSAGE,
          payload: res.data.message,
        }
      ));
  };
}

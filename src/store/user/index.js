import axios from 'axios';

//Action Types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SETAUTH = 'SETAUTH';

//Action Creators
const loginUser = data => {
  return { type: LOGIN, data: data };
};

const setAuth = data => {
  return { type: SETAUTH, data: data };
};

export const me = () => dispatch => {
  if (JSON.parse(localStorage.getItem('isLoggedIn')) === true) {
    let user = JSON.parse(localStorage.getItem('user'));
  }
  return dispatch(setAuth({ user: user, isLoggedIn: true }));
};

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  client_id: process.env.GITHUB_CLIENT_ID,
  redirect_uri: process.env.GITHUB_REDIRECT_URI,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
  proxy_url: process.env.GITHUB_PROXY_URL
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SETAUTH: {
      return {
        ...state,
        isLoggedIn: action.data.isLoggedIn,
        user: action.data.user
      };
    }
    case 'LOGOUT': {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    default:
      return state;
  }
}

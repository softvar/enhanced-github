import authReducer from './auth';

export default function rootReducer(state = {}, action) {
  return { auth: authReducer(state.auth, action) };
}

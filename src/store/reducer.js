import authReducer from './auth';
import repoReducer from './repo';
export default function rootReducer(state = {}, action) {
  return { auth: authReducer(state.auth, action), repo: repoReducer(state.repo, action)};
}

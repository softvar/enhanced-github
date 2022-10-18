import axios from 'axios';

//Action Types

const SETREPO = 'SETREPO';

//Action Creators
export const setRepo = data => {
  return { type: SETREPO, data: data };
};

const initialState = {};

export default function repoReducer(state = initialState, action) {
  switch (action.type) {
    case SETREPO: {
      let newState = action.data;
      return newState;
    }
    default:
      return state;
  }
}

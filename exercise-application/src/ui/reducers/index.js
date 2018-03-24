import { SET_TOKEN } from '../actions/index';

const INITIAL_STATE = {
  token: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };

    default:
      return state;
  }
}
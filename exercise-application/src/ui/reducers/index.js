import { SET_USER } from '../actions/index';

const INITIAL_STATE = {
  user: null,
  token: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload.user, token: action.payload.token };

    default:
      return state;
  }
}
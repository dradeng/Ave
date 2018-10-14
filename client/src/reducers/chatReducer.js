import {
  ADD_CHAT,
  GET_CHAT,
  CHAT_LOADING
} from '../actions/types';

const initialState = {
  chats: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHAT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CHAT:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ADD_CHAT:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    default:
      return state;
  }
}

import {
  ADD_MESSAGE,
  GET_MESSAGE,
  GET_MESSAGES,
  MESSAGE_LOADING,
  
} from '../actions/types';

const initialState = {
  messages: [],
  message: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false
      };
    case GET_MESSAGE:
      return {
        ...state,
        message: action.payload,
        loading: false
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [action.payload, ...state.messages]
      };
    default:
      return state;
  }
}
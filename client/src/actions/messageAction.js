import axios from 'axios';

import {
  ADD_MESSAGE,
  GET_MESSAGE,
  CHAT_LOADING,
  CLEAR_CHAT_ERRORS,
  GET_CHAT_ERRORS

} from './types';

// Add Post
export const addMessage = chatData => dispatch => {
  dispatch(clearChatErrors());
  axios
    .post('/api/chat', chatData)
    .then(res =>
      dispatch({
        type: ADD_CHAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CHAT_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getMessage = () => dispatch => {
  dispatch(setChatLoading());
  axios
    .get('/api/chat')
    .then(res =>
      dispatch({
        type: GET_CHAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        //type: GET_POSTS,
        //payload: null
      })
    );
};

// Profile loading
export const setChatLoading = () => {
  return {
    type: CHAT_LOADING
  };
};
// Clear errors
export const clearChatErrors = () => {
  return {
    type: CLEAR_CHAT_ERRORS
  };
};

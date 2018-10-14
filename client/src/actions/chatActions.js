import axios from 'axios';

import {
  ADD_CHAT,
  GET_CHAT,
  CHAT_LOADING,
  CLEAR_CHAT_ERRORS,
  GET_CHAT_ERRORS

} from './types';

// Add Post
export const addChat = chatData => dispatch => {
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
export const getChat = () => dispatch => {
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


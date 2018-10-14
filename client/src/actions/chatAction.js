import axios from 'axios';

import {
  ADD_CHAT,
  GET_CHAT,
  CHAT_LOADING,
} from './types';

// Add Post
export const addChat = chatData => dispatch => {
  dispatch(clearErrors());
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
        //type: GET_ERRORS,
        //payload: err.response.data
      })
    );
};

// Get Posts
export const getChat = () => dispatch => {
  dispatch(setPostLoading());
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


import axios from 'axios';

import {
  ADD_MESSAGE,
  GET_MESSAGE,
  MESSAGE_LOADING,
  CLEAR_MESSAGE_ERRORS,
  GET_MESSAGE_ERRORS

} from './types';

// Add Post
export const addMessage = messageData => dispatch => {
  dispatch(clearMessageErrors());
  axios
    .post('/api/chat', messageData)
    .then(res =>
      dispatch({
        type: ADD_MESSAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MESSAGE_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getMessage = () => dispatch => {
  dispatch(setMessageLoading());
  axios
    .get('/api/chat')
    .then(res =>
      dispatch({
        type: GET_MESSAGE,
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
export const setMessageLoading = () => {
  return {
    type: MESSAGE_LOADING
  };
};
// Clear errors
export const clearMessageErrors = () => {
  return {
    type: CLEAR_MESSAGE_ERRORS
  };
};

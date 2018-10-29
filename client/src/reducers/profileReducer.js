import {
  GET_PROFILE,
  GET_PROFILES,
    GET_FAVORITE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  favoriteProfile: [],
  favoriteHash: {},
    loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
      case GET_FAVORITE:
          if (action.payload._id in state.favoriteHash)
          {
            return state;
          }

      return { ...state, favoriteProfile: [...state.favoriteProfile, action.payload],  favoriteHash: {
              ...state.favoriteHash,
              [action.payload._id]: 1
          }};

      case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
       profile: initialState
      };
    default:
      return state;
  }
}

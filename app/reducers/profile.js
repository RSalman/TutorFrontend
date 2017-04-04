import { GET_PROFILE_START, GET_PROFILE_COMPLETE, GET_PROFILE_ERROR, POST_REQUEST_START, POST_REQUEST_COMPLETE, POST_REQUEST_ERROR, NEW_REQUEST, DELETE_REQUEST_COMPLETE } from '../actions/profile';


var initialState = {
  profile: null,
  isLoading: false,
  requesting: false,
  requestSent: false,
  error: '',
  requestError: false,
  requestDeleted: false
};

function profile(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_START:
      return {
        profile: null,
        isLoading: true,
        error: ''
      };
    case GET_PROFILE_COMPLETE:
      return {
        profile: action.profile,
        isLoading: false,
        requestSent: action.profile.requestPending,
        error: ''
      };
    case GET_PROFILE_ERROR:
      return {
        profile: action.profile,
        isLoading: false,
        error: action.error
      };
    case POST_REQUEST_START:
      return {
        ...state,
        requesting: true,
        requestSent: false,
      };
    case POST_REQUEST_COMPLETE:
      return {
        ...state,
        requestSent: true,
        requesting: false,
      };
    case DELETE_REQUEST_COMPLETE:
      return {
        ...state,
        requestDeleted: true,
        requestSent: false
      };
    case POST_REQUEST_ERROR:
      return {
        ...state,
        requestSent: false,
        requesting: false,
        requestError: action.error
      };
    case NEW_REQUEST:
      return {
        ...state,
        requestSent: false,
        requesting: false,
        requestError: ''
      };
    default:
      return state;
  }
}

export default profile;

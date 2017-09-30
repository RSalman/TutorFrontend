import { GET_PROFILE_START, GET_PROFILE_COMPLETE, GET_PROFILE_ERROR, POST_REQUEST_START, POST_REQUEST_COMPLETE, POST_REQUEST_ERROR, NEW_REQUEST, DELETE_REQUEST_COMPLETE, GET_ACCEPTED_REQUESTS_COMPLETE, GET_PENDING_REQUESTS_COMPLETE } from '../actions/profile';
import { UPDATE_USER } from '../actions/login';


var initialState = {
  profile: null,
  tutorMode: false,
  isLoading: false,
  requesting: false,
  requestSent: false,
  error: '',
  requestError: false,
  requestDeleted: false,
  pendingRequests: [],
  acceptedRequests: [],
  current_user: { id: null },
  access_token: null
};

function profile(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_START:
      return {
         ...state,
        profile: null,
        isLoading: true,
        error: ''
      };
    case GET_PROFILE_COMPLETE:
      return {
         ...state,
        profile: action.profile,
        isLoading: false,
        requestSent: action.profile.requestPending,
        error: ''
      };
    case GET_PROFILE_ERROR:
      return {
         ...state,
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
    case GET_PENDING_REQUESTS_COMPLETE:
      return {
        ...state,
        pendingRequests: action.pendingRequests,
      };
    case GET_ACCEPTED_REQUESTS_COMPLETE:
      return {
        ...state,
        acceptedRequests: action.acceptedRequests,
      };
    case UPDATE_USER:
      return { ...state, current_user: action.user, access_token: action.access_token, tutorMode: action.user.is_tutor };
    default:
      return state;
  }
}

export default profile;

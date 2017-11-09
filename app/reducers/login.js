import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, UPDATE_EMAIL, UPDATE_PASSWORD } from '../actions/login';

var initialState = {
  email: '',
  password: '',
  successful_authentication: false,
  error: '',
  isLoading: false,
  user_data: null
};

function login(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EMAIL:
      return { ...state, email: action.email };
    case UPDATE_PASSWORD:
      return { ...state, password: action.password };
    case LOGIN_START:
      return { ...state, error: '', isLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, successful_authentication: true, isLoading: false, user_data: action.user_data };
    case LOGIN_ERROR:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
}

export default login;

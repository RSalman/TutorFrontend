import { sendAppToken } from './../components/TempPushNotification';

// action types
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_USER = 'UPDATE_USER';
export const SIGN_OUT = 'SIGN_OUT';
// action creators
export function updateEmail(email) {
  return { type: UPDATE_EMAIL, email };
}

export function updatePassword(password) {
  return { type: UPDATE_PASSWORD, password };
}
export function loginStart() {
  return { type: LOGIN_START };
}

export function loginError(error) {
  return { type: LOGIN_ERROR, error };
}

export function loginSuccess(user_data) {
  return { type: LOGIN_SUCCESS, user_data };
}

export function updateUser(user, access_token) {
  return { type: UPDATE_USER, user, access_token };
}

export function signOut() {
  return { type: SIGN_OUT };
}

export function authenticate(email, password) {
  return dispatch => {
    dispatch(loginStart());
    axios.post('/auth/sign_in', { email, password })
      .then(function(response) {
        if (!_.isEmpty(response.data)) {
          sendAppToken(response.data.data.id);
          dispatch(updateUser(response.data.data, response.headers['access-token']));
          dispatch(loginSuccess(response.data.data));
        }
      }).catch(function(error) {
        if (error.response)
          dispatch(loginError(error.response.data.errors));
        else
          dispatch(loginError(I18n.t('tutors.serversDownError')));
      });
  };
}

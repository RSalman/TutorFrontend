// action types
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
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

export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}

export function authenticate(email, password) {
  return dispatch => {
    dispatch(loginStart()); //Maybe display a spinner here
    axios.post('/auth/sign_in', { email, password })
      .then(function(response) {
        if (!_.isEmpty(response.data)) {
          // TODO(muraad): Handle access_token
          dispatch(loginSuccess());
        }
      }).catch(function(error) {
        if (error.response)
          dispatch(loginError(error.response.data.errors));
        else
          dispatch(loginError(I18n.t('tutors.serversDownError')));
      });
  };
}

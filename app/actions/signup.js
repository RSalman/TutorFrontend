// action types
export const VERIFY_CODE_START = 'VERIFY_CODE_START';
export const VERIFY_CODE_COMPLETE = 'VERIFY_CODE_COMPLETE';
export const SET_PROGRESS_BAR = 'SET_PROGRESS_BAR';
export const UPDATE_FORM = 'UPDATE_FORM';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_START = 'SIGNUP_START';

// action creators
export function verifyCodeStart() {
  return { type: VERIFY_CODE_START };
}

export function verifyCodeComplete(phoneVerified) {
  return { type: VERIFY_CODE_COMPLETE, phoneVerified };
}

export function verifyCode(code) {
  return dispatch => {
    dispatch(verifyCodeStart());
    // TODO(sarmad): call server verify API
    if (code === '1111')
      dispatch(verifyCodeComplete(true));
    else
      dispatch(verifyCodeComplete(false));
  };
}

export function setProgressBar(value) {
  return { type: SET_PROGRESS_BAR, value };
}

export function updateForm(formData) {
  return { type: UPDATE_FORM, formData };
}

export function signupError(error) {
  return { type: SIGNUP_ERROR, error };
}

export function signupSuccess() {
  return { type: SIGNUP_SUCCESS };
}

export function signupStart() {
  return { type: SIGNUP_START };
}

export function submitForm(signupData) {
  return dispatch => {
    dispatch(signupStart());
    axios.post('/users', { user: signupData })
      .then(function(response) {
        if (!_.isEmpty(response.data))
          dispatch(signupSuccess());

      }).catch(function(error) {
        if (error.response)
          dispatch(signupError(error.response.data.errors));
        else
          dispatch(signupError(I18n.t('tutors.serversDownError')));
      });
  };
}

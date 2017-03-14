// action types
export const VERIFY_CODE_START = 'VERIFY_CODE_START';
export const VERIFY_CODE_COMPLETE = 'VERIFY_CODE_COMPLETE';
export const SET_PROGRESS_BAR = 'SET_PROGRESS_BAR';
export const UPDATE_FORM = 'UPDATE_FORM';
export const SUCCESSFUL_SIGNUP = 'SUCCESSFUL_SIGNUP';

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

export function submitForm() {
  return dispatch => {
    /* TODO(muraad): submit form */
    dispatch({ type: SUCCESSFUL_SIGNUP });
  };
}

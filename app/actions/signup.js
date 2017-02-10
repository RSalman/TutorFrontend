// action types
export const VERIFY_CODE_START = 'VERIFY_CODE_START';
export const VERIFY_CODE_COMPLETE = 'VERIFY_CODE_COMPLETE';

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

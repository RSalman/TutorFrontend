import { VERIFY_CODE_START, VERIFY_CODE_COMPLETE, UPDATE_FORM, SUBMIT_FORM, SET_PROGRESS_BAR } from '../actions/signup';

var initialState = {
  phoneVerified: false,
  phoneVerifying: false
};

var signupState = {
  value: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: ''
  },
  progressStatus: 0
};

function signup(state = initialState, action) {
  switch (action.type) {
    case VERIFY_CODE_START:
      return {
        ...state,
        phoneVerifying: true
      };
    case VERIFY_CODE_COMPLETE:
      return {
        ...state,
        phoneVerifying: false,
        phoneVerified: action.phoneVerified
      };
    case SET_PROGRESS_BAR:
      signupState.progressStatus = action.value;
      return {
        ...state,
        progress_status: signupState.progressStatus
      };
    case UPDATE_FORM:
      if (action.formData)
        signupState.value = action.formData;
      return { signup_data: signupState.value, progress_status: signupState.progressStatus };
    case SUBMIT_FORM:
      /* TODO SUBMIT FORM - MURAAD HARED */
      return { ...state, successfulSubmission: true };
    default:
      return state;
  }
}

export default signup;

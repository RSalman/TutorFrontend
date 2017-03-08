import { VERIFY_CODE_START, VERIFY_CODE_COMPLETE, UPDATE_FORM, SUCCESSFUL_SIGNUP, SET_PROGRESS_BAR } from '../actions/signup';

var initialState = {
  phoneVerified: false,
  phoneVerifying: false,
  signup_data: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: ''
  },
  progressStatus: 0,
  successfulSubmission: false
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
      return {
        ...state,
        progressStatus: action.value
      };
    case UPDATE_FORM:
      return { ...state, signup_data: action.formData };
    case SUCCESSFUL_SIGNUP:
      return { ...state, successfulSubmission: true };
    default:
      return state;
  }
}

export default signup;

import { VERIFY_CODE_START, VERIFY_CODE_COMPLETE, UPDATE_FORM, SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_START, SET_PROGRESS_BAR, UPDATE_TUTOR_INFO } from '../actions/signup';

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
  tutor_data: {
    image: '',
    courseList: '',
    rate: '',
    educationLevel: '',
    tutor_description: ''
  },
  progressStatus: 0,
  successfulSubmission: false,
  error: '',
  isLoading: false,
  isTutor: false
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
    case UPDATE_TUTOR_INFO:
      return { ...state, tutor_data: action.formData };
    case SIGNUP_SUCCESS:
      if (action.tutor_data)
        return { ...state, successfulSubmission: true, isLoading: false, isTutor: action.tutor_data.courseList ? action.tutor_data.courseList.length > 0 : false };
      return { ...state, successfulSubmission: true, isLoading: false, isTutor: false };
    case SIGNUP_ERROR:
      return { ...state, error: action.error, isLoading: false };
    case SIGNUP_START:
      return { ...state, error: '', isLoading: true };
    default:
      return state;
  }
}

export default signup;

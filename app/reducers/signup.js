import { VERIFY_CODE_START, VERIFY_CODE_COMPLETE } from '../actions/signup';

var initialState = {
  phoneVerified: false,
  phoneVerifying: false
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
        phoneVerifying: false,
        phoneVerified: action.phoneVerified
      };
    default:
      return state;
  }
}

export default signup;

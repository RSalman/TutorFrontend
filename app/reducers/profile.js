import { GET_PROFILE_START, GET_PROFILE_COMPLETE } from '../actions/profile';


var initialState = {
  profile: [],
  isLoading: false
};

function profile(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_START:
      return {
        profile: [],
        isLoading: true
      };
    case GET_PROFILE_COMPLETE:

      return {
        profile: action.profile,
        isLoading: false
      };
    default:
      return state;
  }
}

export default profile;

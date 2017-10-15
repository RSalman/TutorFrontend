import { UPDATE_USER } from '../actions/login';
import { SET_SESSION_MODE, TOGGLE_SESSION_MODE } from '../actions/session';
import { UPDATING_PROFILE_SUCCESS } from '../actions/profileupdate';

var initialState = {
  tutorMode: false,
  isTutor: false,
  userData: { id: null, image: null }
};

function session(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, tutorMode: action.user.is_tutor, isTutor: action.user.is_tutor, userData: action.user };
    case TOGGLE_SESSION_MODE:
      return { ...state, tutorMode: !state.tutorMode };
    case SET_SESSION_MODE:
      return { ...state, tutorMode: action.tutorMode };
    case UPDATING_PROFILE_SUCCESS:
      var updatedUser = {};
      for(var key in state.userData) updatedUser[key] = state.userData[key];
      for(var key in action.userData) updatedUser[key] = action.userData[key];
      if (action.userData.courseList.length > 0)
        return { ...state, userData: updatedUser, isTutor: true, tutorMode: true} 
      return { ...state, userData: updatedUser}
    default:
      return state;
  }
}

export default session;
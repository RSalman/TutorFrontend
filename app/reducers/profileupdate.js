import { GET_PROFILE_COMPLETE, UPDATING_PROFILE_SUCCESS, UPDATING_PROFILE_ERROR, UPDATING_PROFILE } from '../actions/profileupdate';

var initialState = {
  tutor_data: {
    image: '',
    courseList: '',
    rate: '',
    education: '',
    tutor_description: '',
    phone_number: '',
    first_name: '',
    last_name: ''
  },
  isLoading: false,
  error: false,
  success: false,
  message: ''
};

function profileupdate(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_COMPLETE:
      return {
        tutor_data: {
          image: action.profile.image,
          courseList: action.profile.coursesTeaching,
          rate: action.profile.rate,
          education: action.profile.degree,
          tutor_description: action.profile.biography,
          first_name: action.profile.firstname,
          last_name: action.profile.lastname,
          phone_number: action.profile.phonenumber,
        }
      };
    case UPDATING_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: 'Profile Updated!'
      };
    case UPDATING_PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: 'Error Updating Profile!' //TODO(SALMAN): Should come from ther server
      };
    case UPDATING_PROFILE:
      return {
        ...state,
        isLoading: true,
        error: false,
        success: false,
        message: ''
      };
    default:
      return state;
  }
}

export default profileupdate;
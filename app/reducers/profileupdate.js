import { GET_PROFILE_COMPLETE } from '../actions/profileupdate';

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
  }
};

function profileupdate(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_COMPLETE:
      console.log('Get profile complete')
      return {
        tutor_data: {
          image: '',
          courseList: action.profile.coursesTeaching,
          rate: action.profile.rate,
          education: action.profile.degree,
          tutor_description: action.profile.biography,
          first_name: action.profile.firstname,
          last_name: action.profile.lastname,
          phone_number: action.profile.phonenumber,
        }
      };
    default:
      return state;
  }
}

export default profileupdate;
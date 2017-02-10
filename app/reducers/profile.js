import { GET_PROFILE_START, GET_PROFILE_COMPLETE } from '../actions/tutors';

//TODO: TEMP REMOVE after integration with backend
const test_profile = {
  bio: 'Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  rate: 18.0,
  firstname: 'Salman',
  lastname: 'Rana',
  imageURI: './img/test.png',
  tempSample: 'PhD/MsC Math | $18/hr | Member since: 2009',
  rating: 3.5
};

var initialState = {
  profile: test_profile,
  isLoading: false
};

function profile(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_START:
      return { profile: test_profile,
        isLoading: true };
    case GET_PROFILE_COMPLETE:
      return {
        profile: test_profile,
        isLoading: false };
    default:
      return state;
  }
}

export default profile;

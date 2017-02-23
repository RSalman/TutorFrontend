import { GET_TUTORS_START, GET_TUTORS_COMPLETE, GET_TUTORS_ERROR } from '../actions/tutors';

var initialState = {
  allTutors: [],
  isLoading: false,
  error: ''
};

function tutors(state = initialState, action) {
  switch (action.type) {
    case GET_TUTORS_START:
      return { allTutors: [], isLoading: true, error: '' };
    case GET_TUTORS_COMPLETE:
      return { allTutors: action.tutors, isLoading: false };
    case GET_TUTORS_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}

export default tutors;

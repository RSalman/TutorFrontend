import { GET_TUTORS_START, GET_TUTORS_COMPLETE } from '../actions/tutors';

var initialState = {
  allTutors: [],
  isLoading: false
};

function tutors(state = initialState, action) {
  switch (action.type) {
    case GET_TUTORS_START:
      return { allTutors: [], isLoading: true };
    case GET_TUTORS_COMPLETE:
      return { allTutors: action.tutors, isLoading: false };
    default:
      return state;
  }
}

export default tutors;

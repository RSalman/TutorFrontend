import { GET_TUTORS_START, GET_TUTORS_COMPLETE, GET_TUTORS_ERROR, CLEAR_TUTORS } from '../actions/tutors';

var initialState = {
  allTutors: [],
  isLoading: false,
  error: ''
};

function tutors(state = initialState, action) {
  switch (action.type) {
    case GET_TUTORS_START:
      return { ...state, isLoading: true, error: '' };
    case GET_TUTORS_COMPLETE:
      return { ...state, allTutors: [...state.allTutors, ...action.tutors], isLoading: false };
    case GET_TUTORS_ERROR:
      return { ...state, error: action.error };
    case CLEAR_TUTORS:
      return { ...state, allTutors: [] };
    default:
      return state;
  }
}

export default tutors;

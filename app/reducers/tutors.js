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
      return {
        allTutors: [
          {
            picture: '',
            rating: 5,
            degree: 'Masters',
          },
          {
            picture: '',
            rating: 5,
            degree: 'Bachelors',
          },
          {
            picture: '',
            rating: 4.5,
            degree: 'PhD',
          },
          {
            picture: '',
            rating: 3.9,
            degree: 'PhD',
          }
        ], isLoading: false
      };
    default:
      return state;
  }
}

export default tutors;

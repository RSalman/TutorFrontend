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
            id: 0,
            picture: '',
            rating: 5,
            degree: 'Masters',
          },
          {
            id: 1,
            picture: '',
            rating: 5,
            degree: 'Bachelors',
          },
          {
            id: 2,
            picture: '',
            rating: 4.5,
            degree: 'PhD',
          },
          {
            id: 3,
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

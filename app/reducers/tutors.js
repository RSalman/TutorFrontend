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
            rate: 15,
            picture: '',
            rating: 5,
            degree: 'Masters',
          },
          {
            rate: 20,
            picture: '',
            rating: 5,
            degree: 'Bachelors',
          },
          {
            rate: 11.75,
            picture: '',
            rating: 4.5,
            degree: 'PhD',
          },
          {
            rate: 32.50,
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

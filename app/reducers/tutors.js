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
          },
          {
            rate: 12.70,
            picture: '',
            rating: 1.9,
            degree: 'Bachelors',
          },
          {
            rate: 22.25,
            picture: '',
            rating: 2.9,
            degree: 'Diploma',
          },
          {
            rate: 32.50,
            picture: '',
            rating: 3.9,
            degree: 'PhD',
          },
          {
            rate: 9.50,
            picture: '',
            rating: 1.2,
            degree: 'PhD',
          },
          {
            rate: 25.99,
            picture: '',
            rating: 4.9,
            degree: 'PhD',
          }
        ], isLoading: false
      };
    default:
      return state;
  }
}

export default tutors;

import { RATING_START, RATING_COMPLETE } from '../actions/rating';

var initialState = { currentlyRating: false, };

function rating(state = initialState, action) {
  switch (action.type) {
    case RATING_START:
      return { ...state, currentlyRating: true };
    case RATING_COMPLETE:
      return { ...state, currentlyRating: false };
    default:
      return state;
  }
}

export default rating;

// action types
export const RATING_START = 'RATING_START';
export const RATING_COMPLETE = 'RATING_COMPLETE';

// action creators
export function ratingStart() {
  return { type: RATING_START };
}

export function ratingComplete() {
  return { type: RATING_COMPLETE };
}

export function rate(accepted_request_id, rating) {
  return (dispatch, getState) => {
    dispatch(ratingStart());
    var params = { id: accepted_request_id };
    var url;
    var tutorMode = getState().session.tutorMode;
    if (tutorMode) {
      params.student_rating = rating;
      url = '/rate_student';
    } else {
      params.tutor_rating = rating;
      url = '/rate_tutor';
    }
    axios.post(url, params)
      .then(function(response) {
        dispatch(ratingComplete());
      }).catch(function(error) {
        dispatch(ratingComplete());
        console.log(error);
        // TODO: catch errors here
      });
  };
}

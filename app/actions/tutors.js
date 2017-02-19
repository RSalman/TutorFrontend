// action types
export const GET_TUTORS_START = 'GET_TUTORS_START';
export const GET_TUTORS_COMPLETE = 'GET_TUTORS_COMPLETE';

// action creators
export function getTutorsStart() {
  return { type: GET_TUTORS_START };
}

export function getTutorsComplete(tutors) {
  return { type: GET_TUTORS_COMPLETE, tutors };
}

export function updateTutors() {
  return dispatch => {
    dispatch(getTutorsStart());
    axios.get('/get_tutors').then(function(response) {
      // TODO(sarmad): handle different codes
      dispatch(getTutorsComplete(response.data));
    }).catch(function(error) {
      // TODO(sarmad): handle errors
    });
  };
}

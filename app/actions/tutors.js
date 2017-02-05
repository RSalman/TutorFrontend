// action types
export const GET_TUTORS_START = 'GET_TUTORS_START';
export const GET_TUTORS_COMPLETE = 'GET_TUTORS_COMPLETE';

// action creators
export function getTutorsStart() {
  return { type: GET_TUTORS_START };
}

export function getTutorsComplete() {
  return { type: GET_TUTORS_COMPLETE };
}

export function updateTutors() {
  return dispatch => {
    dispatch(getTutorsStart());
    dispatch(getTutorsComplete());
  };
}

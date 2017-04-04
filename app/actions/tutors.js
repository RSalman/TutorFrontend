// action types
export const GET_TUTORS_START = 'GET_TUTORS_START';
export const GET_TUTORS_COMPLETE = 'GET_TUTORS_COMPLETE';
export const GET_TUTORS_ERROR = 'GET_TUTORS_ERROR';
export const CLEAR_TUTORS = 'CLEAR_TUTORS';

// action creators
export function getTutorsStart() {
  return { type: GET_TUTORS_START };
}

export function getTutorsComplete(tutors) {
  return { type: GET_TUTORS_COMPLETE, tutors };
}

export function getTutorsError(error) {
  return { type: GET_TUTORS_ERROR, error };
}

export function clearTutors() {
  return { type: CLEAR_TUTORS };
}

export function updateTutors(query, last_id) {
  return dispatch => {
    if (!last_id) dispatch(clearTutors());
    dispatch(getTutorsStart());
    axios.get('/tutor_subjects', { params: { q: query, last_id } })
      .then(function(response) {
        if (!_.isEmpty(response.data) || last_id > 0)
          dispatch(getTutorsComplete(response.data));
        else
          dispatch(getTutorsError(I18n.t('tutors.noTutorsFound')));
      }).catch(function(error) {
        if (error.response)
          dispatch(getTutorsError(error.response.data));
        else
          dispatch(getTutorsError(I18n.t('tutors.serversDownError')));
      });
  };
}

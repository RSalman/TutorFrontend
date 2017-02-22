// action types
export const GET_TUTORS_START = 'GET_TUTORS_START';
export const GET_TUTORS_COMPLETE = 'GET_TUTORS_COMPLETE';
export const GET_TUTORS_ERROR = 'GET_TUTORS_ERROR';

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

export function updateTutors(query) {
  return dispatch => {
    dispatch(getTutorsStart());
    axios.get('/get_tutors', { params: { q: query } })
      .then(function(response) {
        if (!_.isEmpty(response.data))
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

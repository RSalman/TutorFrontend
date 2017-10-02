export const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE';

export function getProfileComplete(response, userID) {
  console.log('going to reducer')
  return { type: GET_PROFILE_COMPLETE, profile: response, userID };
}

export function fetchProfile(tutorID) {
  return dispatch => {
    axios.get('/tutor_infos?tutor_id=' + tutorID).then(function(response) {
      if (response.status === 200){
        console.log('FectProfile success')
        dispatch(getProfileComplete(response.data, tutorID));
      }
    }).catch(function(error) {
        //TODO(SALMAN)
    });
  };
}

export function updateProfile(profileData, user_id) {
  return dispatch => {
    axios.patch('/users/' + user_id , profileData)
      .then(function(response) {
        if (!_.isEmpty(response.data)) {
          
        }
      }).catch(function(error) {
        
      });
  };
}

// action types
export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE';

// action creators
export function getProfileStart(userID) {
  return { type: GET_PROFILE_START, userID };
}

export function getProfileComplete(response) {
  return { type: GET_PROFILE_COMPLETE, profile: response, receivedAt: Date.now() };
}

export function retriveProfile(userID) {
  //TODO: CHECK CACHE!!!
  return dispatch => {
    dispatch(fetchProfile(userID));
  };
}

//TODO: Use actual user id!
function fetchProfile(userID) {
  return dispatch => {
    dispatch(getProfileStart(userID));

    //TODO: backend finish and hook up actual end point!
    return axios.get('http://www.mocky.io/v2/58a670580f0000b00aac6502')
            .then(function(response) {
              if (response.status == 200)
                dispatch(getProfileComplete(response.data));
                //TODO: CACHE!!!

                // TODO: HANDLE ERROR -- !200OK
            })
            // TODO: HANDLE Exception
            .catch(function(error) {
              console.log(error);
            });
  };
}

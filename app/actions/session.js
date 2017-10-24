// action types
export const SET_SESSION_MODE = 'SET_SESSION_MODE';
export const TOGGLE_SESSION_MODE = 'TOGGLE_SESSION_MODE';

// action creators
export function toggleSessionMode() {
  return { type: TOGGLE_SESSION_MODE };
}

export function setTutorMode() {
  return { type: SET_SESSION_MODE, tutorMode: true };
}

export function setStudentMode() {
  return { type: SET_SESSION_MODE, tutorMode: false };
}

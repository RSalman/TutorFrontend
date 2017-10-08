import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { updateTutors, GET_TUTORS_START, GET_TUTORS_COMPLETE } from '../../app/actions/tutors';
import '../../app/util/globalAxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('tutors actions', () => {
  it('should update tutors', () => {
    const expectedActions = [
      { type: GET_TUTORS_START },
      { type: GET_TUTORS_COMPLETE }
    ];

    const store = mockStore({ tutors: {} });
    store.dispatch(updateTutors());
    moxios.wait(function() {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

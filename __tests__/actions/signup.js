import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { verifyCode, VERIFY_CODE_START, VERIFY_CODE_COMPLETE } from '../../app/actions/signup';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('signup actions', () => {
  it('should verify code', () => {
    const expectedActions = [
      { type: VERIFY_CODE_START },
      { type: VERIFY_CODE_COMPLETE, phoneVerified: false }
    ];

    const store = mockStore({ signup: {} });
    store.dispatch(verifyCode());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

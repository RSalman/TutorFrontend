import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { authenticate, LOGIN_START, LOGIN_SUCCESS, UPDATE_USER, SIGN_OUT } from '../../app/actions/login';
import '../../app/util/globalAxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login actions', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  it('should authenticate and update user data', done => {
    const user = { id: 1 };
    const access_token = 'test';
    const expectedActions = [
      { type: LOGIN_START },
      { type: UPDATE_USER, user, access_token, },
      { type: LOGIN_SUCCESS, user_data: user },
    ];

    const tempPushNotification = require('../../app/components/TempPushNotification');
    tempPushNotification.sendAppToken = jest.fn();

    const store = mockStore({ login: {} });
    store.dispatch(authenticate('test@test.com', 'test'));
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        'status': 200,
        'response': { 'data': user },
        'headers': { 'access-token': access_token }
      }).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });
});

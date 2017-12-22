import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PendingRequests from '../../app/components/PendingRequests';
import '../../app/index';
import '../../app/util/globalAxios';
import '../../app/util/I18n';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function setup(state) {
  const store = mockStore(state);
  const props = {
    updatePendingRequests: jest.fn(),
    store
  };
  return props;
}

describe('<PendingRequests />', () => {
  it('renders correctly', () => {
    const props = setup({
      session: {
        tutorMode: true,
      },
      profile: {
        profile: null,
        isLoading: false,
        requesting: false,
        requestSent: false,
        error: '',
        requestError: false,
        requestDeleted: false,
        pendingRequests: [],
        acceptedRequests: [],
        current_user: { id: null },
        access_token: null,
        courses_request_status: []
      }
    });
    const tree = renderer.create(
      <PendingRequests {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

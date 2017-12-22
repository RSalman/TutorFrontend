import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AcceptedRequests from '../../app/components/AcceptedRequests';
import '../../app/index';
import '../../app/util/globalAxios';
import '../../app/util/I18n';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function setup(state) {
  const store = mockStore(state);
  const props = {
    updateAcceptedRequests: jest.fn(),
    store
  };
  return props;
}

describe('<AcceptedRequests />', () => {
  it('renders correctly', () => {
    const props = setup({
      rating: {
        currentlyRating: false
      },
      session: {
        tutorMode: true,
      },
      profile: {
        acceptedRequests: [],
        current_user: { id: null }
      }
    });
    const tree = renderer.create(
      <AcceptedRequests {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

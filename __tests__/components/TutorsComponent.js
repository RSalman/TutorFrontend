import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TutorsComponent from '../../app/components/TutorsComponent';
import '../../app/util/globalAxios';
import '../../app/util/I18n';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const dummyTutors = [
  {
    picture: '',
    rating: 5,
    degree: 'TEST1',
  },
  {
    picture: '',
    rating: 2,
    degree: 'TEST2',
  }
];

function setup(state) {
  const store = mockStore(state);
  const props = {
    updateTutors: jest.fn(),
    store
  };
  return props;
}

describe('<TutorsComponent />', () => {
  it('should render tutors in rows', () => {
    const props = setup({
      tutors: {
        allTutors: dummyTutors,
        isLoading: false
      }
    });
    const tree = renderer.create(
      <TutorsComponent {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

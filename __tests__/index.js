import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TutoringApp from '../app/index';

it('renders correctly', () => {
  const tree = renderer.create(
    <TutoringApp />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import StarRatingBar from './StarRatingBar';

afterEach(cleanup);

it('should render', () => {
  const { getByTestId } = render(<StarRatingBar per={0} />);
  expect(getByTestId('starRatingBar')).toBeInTheDocument();
});
it('matches snapShot', () => {
  const tree = renderer.create(<StarRatingBar per={0} />).toJSON();
  expect(tree).toMatchSnapshot();
});

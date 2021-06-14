/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewMSGList from './ReviewMSGList';

afterEach(cleanup);

it('should not render text', () => {
  render(
    <ReviewMSGList
      listReviews={[{}]}
      reported={jest.fn()}
    />,
  );
  const test = screen.queryByText('✓ I recommend this product');
  const test1 = screen.queryByText('Response:');
  expect(test).not.toBeInTheDocument();
  expect(test1).not.toBeInTheDocument();
});

it('should render text', () => {
  render(
    <ReviewMSGList
      listReviews={[{ response: 'hi', recommend: true }]}
      reported={jest.fn()}
    />,
  );
  const test = screen.queryByText('✓ I recommend this product');
  const test1 = screen.queryByText('Response:');
  expect(test).toBeInTheDocument();
  expect(test1).toBeInTheDocument();
});

it('should have default reported', () => {
  expect(ReviewMSGList.defaultProps.reported()).toBeDefined();
});

it('matches snapShot', () => {
  const tree = renderer.create(
    <ReviewMSGList
      listReviews={[{ response: 'hi', recommend: true }]}
      reported={jest.fn()}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

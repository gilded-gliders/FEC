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
import ReviewListBase from './ReviewListBase';

afterEach(cleanup);

it('should render', () => {
  const { getByTestId } = render(
    <ReviewListBase
      listUserReview={[]}
      listReported={[]}
      addListReported={jest.fn()}
      addUserReview={jest.fn()}
      rating={{}}
      id={25711}
      stars={5}
    />,
  );
  expect(screen.queryByText('loading...')).toBeInTheDocument();
});

it('should have default reported', () => {
  expect(ReviewListBase.defaultProps.addListReported()).toBeDefined();
  expect(ReviewListBase.defaultProps.addUserReview()).toBeDefined();
});

// it('matches snapShot', () => {
//   const tree = renderer.create(
//     <ReviewMSGList
//       listReviews={[{ response: 'hi', recommend: true }]}
//       reported={jest.fn()}
//     />,
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });

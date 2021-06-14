/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewListHeader from './ReviewListHeader';

afterEach(cleanup);

it('should render', () => {
  const testfunc = jest.fn();
  render(<ReviewListHeader len={251} sortBy={testfunc} />);
  const test = screen.queryByText('251 reviews, sorted by');
  expect(test).toBeInTheDocument();
});

it('should have default sortBy', () => {
  expect(ReviewListHeader.defaultProps.sortBy()).toBeDefined();
});

it('select should get correct option', () => {
  const testfunc = jest.fn();
  const { getByTestId, getAllByTestId } = render(<ReviewListHeader len={251} sortBy={testfunc} />);
  fireEvent.change(getByTestId('select'), { target: { value: 'newest' } });
  const options = getAllByTestId('option');
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeTruthy();
  expect(options[2].selected).toBeFalsy();
});

it('matches snapShot', () => {
  const testfunc = jest.fn();
  const tree = renderer.create(
    <ReviewListHeader
      len={251}
      sortBy={testfunc}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

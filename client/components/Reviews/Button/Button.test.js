/**
* @jest-environment jsdom
*/
import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  cleanup,
  fireEvent,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';
import { testData1 } from '../RatingTestData';

afterEach(cleanup);

describe('render correct', () => {
  it('when moreBTNshow be true addBTN should show', () => {
    const test1 = true;
    render(<Button isMoreReviews={test1} />);
    const test = screen.queryByText('MORE REVIEWS');
    expect(test).toBeInTheDocument();
  });

  it('when moreBTNshow be fale addBTN should not show', () => {
    const test2 = false;
    render(<Button isMoreReviews={test2} />);
    const test = screen.queryByText('MORE REVIEWS');
    expect(test).not.toBeInTheDocument();
  });
});

describe('click should trigger func', () => {
  const test1 = true;
  it('when moreBTNshow be true, moreBTN should be able to trigger', () => {
    const testfunc = jest.fn();
    const { getByTestId } = render(
      <Button
        isMoreReviews={test1}
        getMoreReviews={testfunc}
      />,
    );
    fireEvent.click(getByTestId('moreBtn'));
    expect(testfunc).toHaveBeenCalledTimes(1);
    fireEvent.click(getByTestId('moreBtn'));
    expect(testfunc).toHaveBeenCalledTimes(2);
  });

  it('AddBTN should be able to trigger', () => {
    const testfunc = jest.fn();
    const { getByTestId } = render(
      <Button
        isMoreReviews={test1}
        addUserReview={testfunc}
        rating={testData1}
      />,
    );
    fireEvent.click(getByTestId('AddBtn'));
    expect(getByTestId('popout')).toBeInTheDocument();
  });
});

it('when moreBTNshow be true, AddBTN should be able to trigger', () => {
  const testfunc = jest.fn();
  const test = true;
  const { getByTestId } = render(
    <Button
      isMoreReviews={test}
      getMoreReviews={testfunc}
    />,
  );
  fireEvent.click(getByTestId('moreBtn'));
  expect(testfunc).toHaveBeenCalledTimes(1);
});

it('should have default addUserReview and moreReview', () => {
  expect(Button.defaultProps.addUserReview()).toBeDefined();
  expect(Button.defaultProps.getMoreReviews()).toBeDefined();
});

it('matches snapShot', () => {
  const test = true;
  const test1 = jest.fn();
  const test2 = jest.fn();
  const tree = renderer.create(
    <Button
      moreBTNshow={test}
      addReview={test1}
      moreReview={test2}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

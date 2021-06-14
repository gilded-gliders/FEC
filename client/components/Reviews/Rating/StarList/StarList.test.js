/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import StarList from './StarList';

afterEach(cleanup);

it('should render', () => {
  const { getByTestId } = render(<StarList />);
  expect(getByTestId('starList')).toBeInTheDocument();
});

it('should trigger', () => {
  const testfunc = jest.fn();
  const testArray = ['5', '4', '3', '2', '1'];
  const { getByTestId } = render(<StarList stars={testArray} starClicked={testfunc} />);
  fireEvent.click(getByTestId('startListButton1'));
  expect(testfunc).toHaveBeenCalledTimes(1);
  fireEvent.click(getByTestId('startListButton2'));
  expect(testfunc).toHaveBeenCalledTimes(2);
});

it('should have default starClicked()', () => {
  expect(StarList.defaultProps.starClicked()).toBeDefined();
});

it('matches snapShot', () => {
  const tree = renderer.create(<StarList />).toJSON();
  expect(tree).toMatchSnapshot();
});

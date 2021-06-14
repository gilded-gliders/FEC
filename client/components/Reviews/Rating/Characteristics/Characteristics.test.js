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
import Characteristics from './Characteristics';

afterEach(cleanup);

it('should render', () => {
  render(<Characteristics name="hello World" />);
  const test = screen.queryByText('hello World');
  expect(test).toBeInTheDocument();
});

it('should render', () => {
  const array = ['hi', 'Hello', 'World'];
  render(<Characteristics dataArray={array} />);
  const test = screen.queryByText('hi');
  const test1 = screen.queryByText('Hello');
  const test2 = screen.queryByText('World');
  expect(test).toBeInTheDocument();
  expect(test1).not.toBeInTheDocument();
  expect(test2).toBeInTheDocument();
});

it('matches snapShot', () => {
  const tree = renderer.create(
    <Characteristics
      name="hi"
      dataArray={['hi', 'Hello', 'World']}
      value={10}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

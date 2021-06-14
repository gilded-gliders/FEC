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
import MSGHeader from './MSGHeader';

afterEach(cleanup);

it('should render text', () => {
  render(
    <MSGHeader
      user="Yuki"
      date="2021-05-23T00:00:00.000Z"
      rate={1}
    />,
  );
  const test = screen.queryByText('Yuki, May 22 2021');
  expect(test).toBeInTheDocument();
});

it('matches snapShot', () => {
  const tree = renderer.create(
    <MSGHeader
      user="Yuki"
      date="2021-05-23T00:00:00.000Z"
      rate={1}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

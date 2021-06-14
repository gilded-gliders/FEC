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
import FormStarCK from './FormStarCK';

afterEach(cleanup);

const testName = 'Width';
const testFunc = jest.fn();

it('FormStarCK will render', () => {
  render(
    <FormStarCK
      name={testName}
      info={1}
      starClick={testFunc}
    />,
  );
  expect(screen.queryByText(testName)).toBeInTheDocument();
});

it('should have default starClick()', () => {
  expect(FormStarCK.defaultProps.starClick()).toBeDefined();
});

it('matches snapShot', () => {
  const tree = renderer.create(
    <FormStarCK
      name={testName}
      info={1}
      starClick={testFunc}
    />,
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

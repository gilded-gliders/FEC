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
import Rating from './Rating';
import { testData1, testData2 } from '../RatingTestData';

afterEach(cleanup);
describe('render correct', () => {
  it('render Rating with testData1', () => {
    const { getByTestId } = render(<Rating rating={testData1} />);
    expect(getByTestId('rating')).toBeInTheDocument();
  });
  it('render Rating with testData2', () => {
    const { getByTestId } = render(<Rating rating={testData2} />);
    expect(getByTestId('rating')).toBeInTheDocument();
  });
  it('head should not be NaN, testData1', () => {
    const { getByTestId } = render(<Rating rating={testData1} />);
    expect(getByTestId('head')).not.toHaveTextContent('NaN');
  });
  it('head should not be NaN, testData2', () => {
    const { getByTestId } = render(<Rating rating={testData2} />);
    expect(getByTestId('head')).not.toHaveTextContent('NaN');
  });
  it('text should not have NaN%, testData1', () => {
    const { getByTestId } = render(<Rating rating={testData1} />);
    expect(getByTestId('text')).toHaveTextContent('75% of reviews recommend this product');
  });
  it('text should not have NaN%, testData2', () => {
    const { getByTestId } = render(<Rating rating={testData2} />);
    expect(getByTestId('text')).toHaveTextContent('0% of reviews recommend this product');
  });
  it('starList should always be 5, testData2', () => {
    const { getAllByTestId } = render(<Rating rating={testData2} />);
    expect(getAllByTestId('starListR').length).toBe(1);
  });
  it('starList should always be 5, testData1', () => {
    const { getAllByTestId } = render(<Rating rating={testData1} />);
    expect(getAllByTestId('starListR').length).toBe(1);
  });
  it('characteristics should be same amount as keys, testData1', () => {
    const { getAllByTestId } = render(<Rating rating={testData1} />);
    const keys = Object.keys(testData1.characteristics);
    expect(getAllByTestId('characteristics')).toHaveLength(keys.length);
  });
  it('characteristics should be same amount as keys, testData2', () => {
    const { getAllByTestId } = render(<Rating rating={testData2} />);
    const keys = Object.keys(testData2.characteristics);
    expect(getAllByTestId('characteristics')).toHaveLength(keys.length);
  });
});

it('should have default starsClicked()', () => {
  expect(Rating.defaultProps.starClicked()).toBeDefined();
});

it('matches snapShot', () => {
  const tree = renderer.create(<Rating rating={testData1} />).toJSON();
  expect(tree).toMatchSnapshot();
});

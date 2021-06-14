/**
 * @jest-environment jsdom
 */

import checkStar from './checkStar';

it('should return right string', () => {
  const Testindex = 2;
  const num = 0.1;
  const testArray = [...Array(11)].map(
    (i, index) => Testindex + num * index,
  );
  const results = testArray.map((i) => checkStar(Testindex, i));
  expect(results).toEqual([
    'emptyStar',
    'emptyStar',
    'emptyStar',
    'qOneStar',
    'qOneStar',
    'qTwoStar',
    'qTwoStar',
    'qTwoStar',
    'qThreeStar',
    'qThreeStar',
    'fullStar',
  ]);
});

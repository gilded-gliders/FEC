// /**
//  * @jest-environment jsdom
//  */

// import React from 'react';
// import renderer from 'react-test-renderer';
// import {
//   render,
//   screen,
//   cleanup,
// } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { renderHook, act } from '@testing-library/react-hooks';
// import RLB from './RLB';

// const getPromise = () => {
//   let deferred;
//   const promise = new Promise((resolve, reject) => {
//     deferred = { resolve, reject };
//   });
//   return { promise, deferred };
// };

// it('should set sort', () => {
//   const { result } = renderHook(() => RLB(25711, [], [], 5));
//   act(() => {
//     result.current.sortBy('newest');
//   });
//   expect(result.current.sort).toBe('newest');
// });

// it('should getmorereviews', async () => {
//   // const { result } = renderHook(() => RLB(25711, [], [], 5));
//   const { deferred, promise } = getPromise();

//   // global.fetch = jest.fn(() => promise);

//   const { result, waitForNextUpdate } = renderHook(() => RLB(25711, [], [], 5));

//   await act(() => {
//     result.current.getMoreReviews(2);
//   });
//   expect(result.current.data).toHaveLength(2);
//   // deferred.resolve();

//   // await waitForNextUpdate();
//   // expect(result.current.isReviewsLoad).toBe(true);

// });

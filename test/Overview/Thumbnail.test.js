/**
 * @jest-environment jsdom
 */

import React from 'react';
 import { render, screen, fireEvent } from '@testing-library/react';
 import ProductImage from '../../client/components/Overview/ProductImage.jsx';
 import Overview from '../../client/components/Overview/Overview.jsx';
 import Thumbnail from '../../client/components/Overview/Thumbnail.jsx';
 import DefaultView from '../../client/components/Overview/DefaultView.jsx'
 import product from '../RelatedItems/fixtures/product.json';
 import product2 from '../RelatedItems/fixtures/product2.json';
 import '@testing-library/jest-dom/extend-expect';


 it('should show a function being called in Thumbnail', () => {
  //console.log((screen.getByTestId('stylesBox'));
  const mock = jest.fn();
  render(<Thumbnail thumbnail = {product.results[0].photos[0].thumbnail_url} identifier = {false} callback = {mock}/>);

  expect(screen.getByAltText("Picture of Clothing")).toBeVisible();
  fireEvent.click(screen.getByAltText("Picture of Clothing"));
  expect(mock).toHaveBeenCalled();

  });

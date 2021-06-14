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


 it('should show whatever is being rendered', () => {
  render(<Overview id ={25748}/>);
  expect(screen.getByText('LOADING')).toBeVisible();
  //need to ask someone tmrw about async and await

  });

  it('should show whatever is being rendered', async () => {
    render(<Overview id ={25748}/>);
    expect(await screen.getByText('LOADING')).toBeVisible();
    //need to ask someone tmrw about async and await

    });

//  it('should show whatever is being rendered in product image', () => {
//   //console.log((screen.getByTestId('stylesBox'));
//   render(<ProductImage image ={"https://images.unsplash.com/photo-1548369735-f548cbe6a294?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"}/>);
//   expect(screen.getByTestId('image')).toBeVisible();
//   });









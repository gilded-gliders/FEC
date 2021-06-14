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
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Curate logo', () => {
  render(<App />);
  const logoElements = screen.getAllByText(/Curate/i);
  expect(logoElements.length).toBeGreaterThan(0);
});

test('renders main navigation elements', () => {
  render(<App />);
  
  // Check for search placeholder (there are mobile and desktop versions)
  const searchInputs = screen.getAllByPlaceholderText(/Search for products/i);
  expect(searchInputs.length).toBeGreaterThan(0);
  
  // Check for category tiles content
  const saleText = screen.getByText(/75% off/i);
  expect(saleText).toBeInTheDocument();
});

test('renders footer content', () => {
  render(<App />);
  
  // Check for newsletter signup
  const newsletterTitle = screen.getByText(/Stay in the loop/i);
  expect(newsletterTitle).toBeInTheDocument();
  
  // Check for copyright
  const copyright = screen.getByText(/© 2024 Curate. All rights reserved./i);
  expect(copyright).toBeInTheDocument();
});

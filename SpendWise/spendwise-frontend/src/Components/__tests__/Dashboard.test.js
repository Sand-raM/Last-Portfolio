// src/Components/Dashboard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders Dashboard component', () => {
  render(<Dashboard />);
  const headingElement = screen.getByText(/Dashboard/i);
  expect(headingElement).toBeInTheDocument();
});

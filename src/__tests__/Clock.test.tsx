import React from 'react';
import { render, screen } from '@testing-library/react';
import { Clock } from '../index';

describe('Clock Component', () => {
  test('renders without crashing', () => {
    render(<Clock />);
    const timeElement = screen.getByText(/\d{2}:\d{2}:\d{2}/);
    expect(timeElement).toBeInTheDocument();
  });
});

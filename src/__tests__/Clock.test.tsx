import React from 'react';
import { render, screen } from '@testing-library/react';
import { Clock } from '../index';

describe('Clock Component', () => {
  test('Render default 24hour clock', () => {
    render(<Clock />);
    const timeElement = screen.getByText(/\d{2}:\d{2}:\d{2}/);
    expect(timeElement).toBeInTheDocument();
  });
  test('Render default 12hour clock', () => {
    render(<Clock use24HourFormat={false} />);
    const timeElement = screen.getByText(/\d{2}:\d{2}:\d{2} (AM|PM)/);
    expect(timeElement).toBeInTheDocument();
  });
});

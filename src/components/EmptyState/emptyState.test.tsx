import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../tests';
import EmptyState from './index';

describe('EmptyState component', () => {
  test('renders EmptyState component when show is true', () => {
    renderWithProviders(<EmptyState show icon="heart" emptyText="No items found" />);

    const emptyStateElement = screen.getByTestId('empty-state');
    expect(emptyStateElement).toBeInTheDocument();
  });

  test('does not render EmptyState component when show is false', () => {
    renderWithProviders(<EmptyState show={false} icon="heart" emptyText="No items found" />);

    const emptyStateElement = screen.queryByTestId('empty-state');
    expect(emptyStateElement).toBeNull();
  });
});

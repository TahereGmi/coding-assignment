import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, RenderResult, RenderOptions } from '@testing-library/react';
import store from '../data/store';

const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions,
  initialRoute = '/',
): RenderResult =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        {ui}
      </MemoryRouter>
    </Provider>,
    options,
  );

export default renderWithProviders;

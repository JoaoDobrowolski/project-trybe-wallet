import React from 'react';
import { render } from 'react-dom';
import { screen } from '@testing-library/react';
import { MemoryRouter, withRouter } from 'react-router-dom';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Página de Login', () => {
  it('Verifica se a página de login é renderizada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;

    const inputEmail = screen.getByTestId('email-input');
    // expect(screen.getByPlaceholder(/email/i)).toBeInTheDocument();
  });
});
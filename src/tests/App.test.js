import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import userEvent from '@testing-library/user-event';
import toRound from '../rounder';
import getCurrency from '../services/currencyApi';
import mockData from './helpers/mockData';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import rootReducer from '../redux/reducers';
import user from '../redux/reducers/user';
import wallet from '../redux/reducers/wallet';

describe('Página de Login', () => {
  it('Verifica se a página de login é renderizada e funciona corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    // renderização
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    const buttonLogin = screen.getByRole('button');
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toHaveAttribute('disabled');

    // validação
    userEvent.type(inputEmail, 'opa@bao.com');
    expect(inputEmail).toHaveValue('opa@bao.com');
    userEvent.type(inputPassword, '123456');
    expect(inputPassword).toHaveValue('123456');
    expect(buttonLogin).not.toHaveAttribute('disabled');

    // encaminhamento
    userEvent.click(buttonLogin);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });

  it('Verifica se a página da carteira é renderizada e funciona corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    // renderização do Header
    const emailHeader = screen.getByTestId('email-field');
    expect(emailHeader).toHaveTextContent('email@example.com');
    const valueHeader = screen.getByTestId('total-field');
    expect(valueHeader).toHaveTextContent('0');
    const currencyHeader = screen.getByTestId('header-currency-field');
    expect(currencyHeader).toHaveTextContent('BRL');

    // renderização do WalletForm
    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toHaveTextContent('');
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toHaveTextContent('');
    const currencySelect = screen.getByTestId('currency-input');
    expect(currencySelect).toBeInTheDocument();
    const methodSelect = screen.getByTestId('method-input');
    expect(methodSelect).toBeInTheDocument();
    const tagSelect = screen.getByTestId('tag-input');
    expect(tagSelect).toBeInTheDocument();
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonAdd).toHaveTextContent(/adicionar despesa/i);
    expect(screen.getByText('Alimentação')).toBeInTheDocument();

    // funcionamento
    expect(toRound(15.551)).toBe(15.55);
    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'wada');
    userEvent.click(buttonAdd);
    const descTable = screen.getByText('Alimentação');
    expect(descTable).toBeInTheDocument();
  });

  it('Verifica a API', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => {
      if (url === 'https://economia.awesomeapi.com.br/json/all') {
        return {
          ok: true,
          json: async () => mockData,
        };
      } else {
        return {
          ok: false,
        };
      }
    });

    const { store } = renderWithRedux(<Wallet />);

    // console.log(jest.spyOn(global, 'fetch'));
    // await jest.spyOn(global, 'fetch');
    // expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    // expect(fetch).not.toHaveBeenCalledWith('opaBao');

    await getCurrency();
    expect(fetch).toHaveBeenCalled();

    expect(screen.getByTestId('total-field')).toHaveTextContent('0');
    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'opa');
    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '10');
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(buttonAdd);

    expect(await screen.findByText('10.00')).toBeInTheDocument();
    const totalCash = await screen.findByTestId('total-field');
    expect(totalCash).toHaveTextContent('47.53');
    const descTable = await screen.findByTestId('desc');
    expect(descTable).toHaveTextContent('opa');
    const editButton = await screen.findByTestId('edit-btn');
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);

    const editExpenseButton = await screen.findByRole('button', { name: /editar despesa/i });
    expect(editExpenseButton).toBeInTheDocument();
    userEvent.click(editExpenseButton);

    const deleteButton = await screen.findByTestId('delete-btn');
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);

    expect(screen.queryByTestId('desc')).not.toBeInTheDocument();


    screen.logTestingPlaygroundURL();
  });

  it('Verifica a API', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => {
      return {
        ok: false,
        json: async () => mockData,
      };
    });

    const { store } = renderWithRedux(<Wallet />);
  });
});

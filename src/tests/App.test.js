import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import userEvent from '@testing-library/user-event';
import toRound from '../rounder';
import getCurrency from '../services/currencyApi';
import mockData from './helpers/mockData';


const mockInit = {
  user: {
    email: 'joaodobrowolski@outlook.com'
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE'
    ],
    loading: false,
    quote: {
      USD: {
        code: 'USD',
        codein: 'BRL',
        name: 'Dólar Americano/Real Brasileiro',
        high: '5.2839',
        low: '5.2825',
        varBid: '0.0024',
        pctChange: '0.05',
        bid: '5.2835',
        ask: '5.2844',
        timestamp: '1659590771',
        create_date: '2022-08-04 02:26:11'
      },
      USDT: {
        code: 'USD',
        codein: 'BRLT',
        name: 'Dólar Americano/Real Brasileiro Turismo',
        high: '5.305',
        low: '5.305',
        varBid: '0',
        pctChange: '0',
        bid: '5.15',
        ask: '5.46',
        timestamp: '1659554340',
        create_date: '2022-08-03 16:19:00'
      },
      CAD: {
        code: 'CAD',
        codein: 'BRL',
        name: 'Dólar Canadense/Real Brasileiro',
        high: '4.1171',
        low: '4.1101',
        varBid: '0.0023',
        pctChange: '0.06',
        bid: '4.1155',
        ask: '4.1165',
        timestamp: '1659590767',
        create_date: '2022-08-04 02:26:07'
      },
      GBP: {
        code: 'GBP',
        codein: 'BRL',
        name: 'Libra Esterlina/Real Brasileiro',
        high: '6.4297',
        low: '6.4121',
        varBid: '0.0089',
        pctChange: '0.14',
        bid: '6.4232',
        ask: '6.4264',
        timestamp: '1659590770',
        create_date: '2022-08-04 02:26:10'
      },
      ARS: {
        code: 'ARS',
        codein: 'BRL',
        name: 'Peso Argentino/Real Brasileiro',
        high: '0.0399',
        low: '0.0399',
        varBid: '0',
        pctChange: '0',
        bid: '0.0399',
        ask: '0.0399',
        timestamp: '1659590771',
        create_date: '2022-08-04 02:26:11'
      },
      BTC: {
        code: 'BTC',
        codein: 'BRL',
        name: 'Bitcoin/Real Brasileiro',
        high: '124.594',
        low: '120.7',
        varBid: '911',
        pctChange: '0.75',
        bid: '122.264',
        ask: '122.373',
        timestamp: '1659590771',
        create_date: '2022-08-04 02:26:11'
      },
      LTC: {
        code: 'LTC',
        codein: 'BRL',
        name: 'Litecoin/Real Brasileiro',
        high: '317',
        low: '303.19',
        varBid: '6.9',
        pctChange: '2.26',
        bid: '311.8',
        ask: '312.1',
        timestamp: '1659590775',
        create_date: '2022-08-04 02:26:15'
      },
      EUR: {
        code: 'EUR',
        codein: 'BRL',
        name: 'Euro/Real Brasileiro',
        high: '5.3769',
        low: '5.3661',
        varBid: '0.0058',
        pctChange: '0.11',
        bid: '5.3744',
        ask: '5.3758',
        timestamp: '1659590768',
        create_date: '2022-08-04 02:26:08'
      },
      JPY: {
        code: 'JPY',
        codein: 'BRL',
        name: 'Iene Japonês/Real Brasileiro',
        high: '0.0396',
        low: '0.0394',
        varBid: '0',
        pctChange: '0',
        bid: '0.03948',
        ask: '0.0395',
        timestamp: '1659590775',
        create_date: '2022-08-04 02:26:15'
      },
      CHF: {
        code: 'CHF',
        codein: 'BRL',
        name: 'Franco Suíço/Real Brasileiro',
        high: '5.5033',
        low: '5.4927',
        varBid: '0.0019',
        pctChange: '0.03',
        bid: '5.4985',
        ask: '5.5017',
        timestamp: '1659590768',
        create_date: '2022-08-04 02:26:08'
      },
      AUD: {
        code: 'AUD',
        codein: 'BRL',
        name: 'Dólar Australiano/Real Brasileiro',
        high: '3.6803',
        low: '3.6652',
        varBid: '0.0111',
        pctChange: '0.3',
        bid: '3.6794',
        ask: '3.6811',
        timestamp: '1659590774',
        create_date: '2022-08-04 02:26:14'
      },
      CNY: {
        code: 'CNY',
        codein: 'BRL',
        name: 'Yuan Chinês/Real Brasileiro',
        high: '0.7832',
        low: '0.7818',
        varBid: '0.0002',
        pctChange: '0.02',
        bid: '0.7822',
        ask: '0.7823',
        timestamp: '1659590762',
        create_date: '2022-08-04 02:26:02'
      },
      ILS: {
        code: 'ILS',
        codein: 'BRL',
        name: 'Novo Shekel Israelense/Real Brasileiro',
        high: '1.5756',
        low: '1.5722',
        varBid: '0.0073',
        pctChange: '0.47',
        bid: '1.5753',
        ask: '1.5756',
        timestamp: '1659590763',
        create_date: '2022-08-04 02:26:03'
      },
      ETH: {
        code: 'ETH',
        codein: 'BRL',
        name: 'Ethereum/Real Brasileiro',
        high: '8.8784',
        low: '8.52154',
        varBid: '171.83',
        pctChange: '2',
        bid: '8.74331',
        ask: '8.76037',
        timestamp: '1659590775',
        create_date: '2022-08-04 02:26:15'
      },
      XRP: {
        code: 'XRP',
        codein: 'BRL',
        name: 'XRP/Real Brasileiro',
        high: '2',
        low: '1.94',
        varBid: '0.03',
        pctChange: '1.74',
        bid: '1.97',
        ask: '1.98',
        timestamp: '1659590772',
        create_date: '2022-08-04 02:26:12'
      },
      DOGE: {
        code: 'DOGE',
        codein: 'BRL',
        name: 'Dogecoin/Real Brasileiro',
        high: '0.361351',
        low: '0.349249',
        varBid: '0.00395801',
        pctChange: '1.12',
        bid: '0.356018',
        ask: '0.356018',
        timestamp: '1659590721',
        create_date: '2022-08-04 02:25:21'
      }
    },
    expenses: [
      {
        id: 0,
        value: '2',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {
          USD: {
            code: 'USD',
            codein: 'BRL',
            name: 'Dólar Americano/Real Brasileiro',
            high: '5.2839',
            low: '5.2825',
            varBid: '0.0024',
            pctChange: '0.05',
            bid: '5.2835',
            ask: '5.2844',
            timestamp: '1659590771',
            create_date: '2022-08-04 02:26:11'
          },
          USDT: {
            code: 'USD',
            codein: 'BRLT',
            name: 'Dólar Americano/Real Brasileiro Turismo',
            high: '5.305',
            low: '5.305',
            varBid: '0',
            pctChange: '0',
            bid: '5.15',
            ask: '5.46',
            timestamp: '1659554340',
            create_date: '2022-08-03 16:19:00'
          },
          CAD: {
            code: 'CAD',
            codein: 'BRL',
            name: 'Dólar Canadense/Real Brasileiro',
            high: '4.1171',
            low: '4.1101',
            varBid: '0.0023',
            pctChange: '0.06',
            bid: '4.1155',
            ask: '4.1165',
            timestamp: '1659590767',
            create_date: '2022-08-04 02:26:07'
          },
          GBP: {
            code: 'GBP',
            codein: 'BRL',
            name: 'Libra Esterlina/Real Brasileiro',
            high: '6.4297',
            low: '6.4121',
            varBid: '0.0089',
            pctChange: '0.14',
            bid: '6.4232',
            ask: '6.4264',
            timestamp: '1659590770',
            create_date: '2022-08-04 02:26:10'
          },
          ARS: {
            code: 'ARS',
            codein: 'BRL',
            name: 'Peso Argentino/Real Brasileiro',
            high: '0.0399',
            low: '0.0399',
            varBid: '0',
            pctChange: '0',
            bid: '0.0399',
            ask: '0.0399',
            timestamp: '1659590771',
            create_date: '2022-08-04 02:26:11'
          },
          BTC: {
            code: 'BTC',
            codein: 'BRL',
            name: 'Bitcoin/Real Brasileiro',
            high: '124.594',
            low: '120.7',
            varBid: '911',
            pctChange: '0.75',
            bid: '122.264',
            ask: '122.373',
            timestamp: '1659590771',
            create_date: '2022-08-04 02:26:11'
          },
          LTC: {
            code: 'LTC',
            codein: 'BRL',
            name: 'Litecoin/Real Brasileiro',
            high: '317',
            low: '303.19',
            varBid: '6.9',
            pctChange: '2.26',
            bid: '311.8',
            ask: '312.1',
            timestamp: '1659590775',
            create_date: '2022-08-04 02:26:15'
          },
          EUR: {
            code: 'EUR',
            codein: 'BRL',
            name: 'Euro/Real Brasileiro',
            high: '5.3769',
            low: '5.3661',
            varBid: '0.0058',
            pctChange: '0.11',
            bid: '5.3744',
            ask: '5.3758',
            timestamp: '1659590768',
            create_date: '2022-08-04 02:26:08'
          },
          JPY: {
            code: 'JPY',
            codein: 'BRL',
            name: 'Iene Japonês/Real Brasileiro',
            high: '0.0396',
            low: '0.0394',
            varBid: '0',
            pctChange: '0',
            bid: '0.03948',
            ask: '0.0395',
            timestamp: '1659590775',
            create_date: '2022-08-04 02:26:15'
          },
          CHF: {
            code: 'CHF',
            codein: 'BRL',
            name: 'Franco Suíço/Real Brasileiro',
            high: '5.5033',
            low: '5.4927',
            varBid: '0.0019',
            pctChange: '0.03',
            bid: '5.4985',
            ask: '5.5017',
            timestamp: '1659590768',
            create_date: '2022-08-04 02:26:08'
          },
          AUD: {
            code: 'AUD',
            codein: 'BRL',
            name: 'Dólar Australiano/Real Brasileiro',
            high: '3.6803',
            low: '3.6652',
            varBid: '0.0111',
            pctChange: '0.3',
            bid: '3.6794',
            ask: '3.6811',
            timestamp: '1659590774',
            create_date: '2022-08-04 02:26:14'
          },
          CNY: {
            code: 'CNY',
            codein: 'BRL',
            name: 'Yuan Chinês/Real Brasileiro',
            high: '0.7832',
            low: '0.7818',
            varBid: '0.0002',
            pctChange: '0.02',
            bid: '0.7822',
            ask: '0.7823',
            timestamp: '1659590762',
            create_date: '2022-08-04 02:26:02'
          },
          ILS: {
            code: 'ILS',
            codein: 'BRL',
            name: 'Novo Shekel Israelense/Real Brasileiro',
            high: '1.5756',
            low: '1.5722',
            varBid: '0.0073',
            pctChange: '0.47',
            bid: '1.5753',
            ask: '1.5756',
            timestamp: '1659590763',
            create_date: '2022-08-04 02:26:03'
          },
          ETH: {
            code: 'ETH',
            codein: 'BRL',
            name: 'Ethereum/Real Brasileiro',
            high: '8.8784',
            low: '8.52154',
            varBid: '171.83',
            pctChange: '2',
            bid: '8.74331',
            ask: '8.76037',
            timestamp: '1659590775',
            create_date: '2022-08-04 02:26:15'
          },
          XRP: {
            code: 'XRP',
            codein: 'BRL',
            name: 'XRP/Real Brasileiro',
            high: '2',
            low: '1.94',
            varBid: '0.03',
            pctChange: '1.74',
            bid: '1.97',
            ask: '1.98',
            timestamp: '1659590772',
            create_date: '2022-08-04 02:26:12'
          },
          DOGE: {
            code: 'DOGE',
            codein: 'BRL',
            name: 'Dogecoin/Real Brasileiro',
            high: '0.361351',
            low: '0.349249',
            varBid: '0.00395801',
            pctChange: '1.12',
            bid: '0.356018',
            ask: '0.356018',
            timestamp: '1659590721',
            create_date: '2022-08-04 02:25:21'
          }
        }
      }
    ],
    isEditButtonDisabled: true,
    id: 0
  }
};

describe('Página de Login', () => {
  it('Verifica se a página de login é renderizada e funciona corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    // renderização
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    let buttonLogin = screen.getByRole('button');
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toHaveAttribute('disabled');

    // validação
    userEvent.type(inputEmail, 'opa@bao.com');
    expect(inputEmail).toHaveValue('opa@bao.com');
    userEvent.type(inputPassword, '123456');
    expect(inputPassword).toHaveValue('123456');
    expect(buttonLogin).not.toHaveAttribute('disabled');

    // encaminhamento
    buttonLogin = screen.getByRole('button');
    userEvent.click(buttonLogin);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');

    // screen.logTestingPlaygroundURL();
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


    // screen.logTestingPlaygroundURL();
  });

  it('Verifica se a API deu ruim', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => {
      return {
        ok: false,
        json: async () => mockData,
      };
    });

    const { store } = renderWithRedux(<Wallet />);
  });

  it('Verifica o Header por mock', () => { // nem precisava
    renderWithRouterAndRedux(<Wallet />, { initialState: mockInit });

    const emailHeader = screen.getByTestId('email-field');
    expect(emailHeader).toHaveTextContent('joaodobrowolski@outlook.com');

    const valueHeader = screen.getByTestId('total-field');
    expect(valueHeader).toHaveTextContent('10.57');
  });
});

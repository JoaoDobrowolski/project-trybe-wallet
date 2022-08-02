import React from 'react';
import { screen, render } from '@testing-library/react';
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

const mockWallet = {
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
        high: '5.1859',
        low: '5.1856',
        varBid: '0.0019',
        pctChange: '0.04',
        bid: '5.1852',
        ask: '5.1861',
        timestamp: '1659410670',
        create_date: '2022-08-02 00:24:30'
      },
      USDT: {
        code: 'USD',
        codein: 'BRLT',
        name: 'Dólar Americano/Real Brasileiro Turismo',
        high: '5.21',
        low: '5.21',
        varBid: '0',
        pctChange: '0',
        bid: '5.05',
        ask: '5.37',
        timestamp: '1659382500',
        create_date: '2022-08-01 16:35:00'
      },
      CAD: {
        code: 'CAD',
        codein: 'BRL',
        name: 'Dólar Canadense/Real Brasileiro',
        high: '4.0396',
        low: '4.0314',
        varBid: '0.0008',
        pctChange: '0.02',
        bid: '4.0352',
        ask: '4.0371',
        timestamp: '1659410675',
        create_date: '2022-08-02 00:24:35'
      },
      GBP: {
        code: 'GBP',
        codein: 'BRL',
        name: 'Libra Esterlina/Real Brasileiro',
        high: '6.3675',
        low: '6.3498',
        varBid: '0.009',
        pctChange: '0.14',
        bid: '6.3565',
        ask: '6.3597',
        timestamp: '1659410675',
        create_date: '2022-08-02 00:24:35'
      },
      ARS: {
        code: 'ARS',
        codein: 'BRL',
        name: 'Peso Argentino/Real Brasileiro',
        high: '0.0393',
        low: '0.0393',
        varBid: '0',
        pctChange: '0',
        bid: '0.0393',
        ask: '0.0393',
        timestamp: '1659410670',
        create_date: '2022-08-02 00:24:30'
      },
      BTC: {
        code: 'BTC',
        codein: 'BRL',
        name: 'Bitcoin/Real Brasileiro',
        high: '128',
        low: '112.25',
        varBid: '-7036',
        pctChange: '-5.58',
        bid: '119.027',
        ask: '119.298',
        timestamp: '1659410671',
        create_date: '2022-08-02 00:24:31'
      },
      LTC: {
        code: 'LTC',
        codein: 'BRL',
        name: 'Litecoin/Real Brasileiro',
        high: '444.44',
        low: '286',
        varBid: '-6.42',
        pctChange: '-2.09',
        bid: '299.4',
        ask: '300.56',
        timestamp: '1659410670',
        create_date: '2022-08-02 00:24:30'
      },
      EUR: {
        code: 'EUR',
        codein: 'BRL',
        name: 'Euro/Real Brasileiro',
        high: '5.3381',
        low: '5.3184',
        varBid: '0.0092',
        pctChange: '0.17',
        bid: '5.3268',
        ask: '5.3298',
        timestamp: '1659410673',
        create_date: '2022-08-02 00:24:33'
      },
      JPY: {
        code: 'JPY',
        codein: 'BRL',
        name: 'Iene Japonês/Real Brasileiro',
        high: '0.03976',
        low: '0.03936',
        varBid: '0.0002',
        pctChange: '0.51',
        bid: '0.03963',
        ask: '0.03966',
        timestamp: '1659410707',
        create_date: '2022-08-02 00:25:07'
      },
      CHF: {
        code: 'CHF',
        codein: 'BRL',
        name: 'Franco Suíço/Real Brasileiro',
        high: '5.4747',
        low: '5.4531',
        varBid: '0.0002',
        pctChange: '0',
        bid: '5.4575',
        ask: '5.4608',
        timestamp: '1659410675',
        create_date: '2022-08-02 00:24:35'
      },
      AUD: {
        code: 'AUD',
        codein: 'BRL',
        name: 'Dólar Australiano/Real Brasileiro',
        high: '3.6476',
        low: '3.6336',
        varBid: '-0.0034',
        pctChange: '-0.09',
        bid: '3.6364',
        ask: '3.638',
        timestamp: '1659410675',
        create_date: '2022-08-02 00:24:35'
      },
      CNY: {
        code: 'CNY',
        codein: 'BRL',
        name: 'Yuan Chinês/Real Brasileiro',
        high: '0.7663',
        low: '0.7646',
        varBid: '-0.0008',
        pctChange: '-0.11',
        bid: '0.7658',
        ask: '0.766',
        timestamp: '1659410702',
        create_date: '2022-08-02 00:25:02'
      },
      ILS: {
        code: 'ILS',
        codein: 'BRL',
        name: 'Novo Shekel Israelense/Real Brasileiro',
        high: '1.5382',
        low: '1.5382',
        varBid: '0.0141',
        pctChange: '0.92',
        bid: '1.5381',
        ask: '1.5384',
        timestamp: '1659405664',
        create_date: '2022-08-01 23:01:04'
      },
      ETH: {
        code: 'ETH',
        codein: 'BRL',
        name: 'Ethereum/Real Brasileiro',
        high: '9.07',
        low: '8.255',
        varBid: '-393.39',
        pctChange: '-4.52',
        bid: '8.27354',
        ask: '8.30104',
        timestamp: '1659410555',
        create_date: '2022-08-02 00:22:35'
      },
      XRP: {
        code: 'XRP',
        codein: 'BRL',
        name: 'XRP/Real Brasileiro',
        high: '2.22',
        low: '1.73',
        varBid: '-0.14',
        pctChange: '-6.87',
        bid: '1.92',
        ask: '1.92',
        timestamp: '1659410672',
        create_date: '2022-08-02 00:24:32'
      },
      DOGE: {
        code: 'DOGE',
        codein: 'BRL',
        name: 'Dogecoin/Real Brasileiro',
        high: '0.363941',
        low: '0.342747',
        varBid: '-0.01887999',
        pctChange: '-5.21',
        bid: '0.343414',
        ask: '0.343414',
        timestamp: '1659410420',
        create_date: '2022-08-02 00:20:20'
      }
    },
    expenses: [
      {
        id: 0,
        value: '10',
        description: 'wada',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {
          USD: {
            code: 'USD',
            codein: 'BRL',
            name: 'Dólar Americano/Real Brasileiro',
            high: '5.1859',
            low: '5.1856',
            varBid: '0.0019',
            pctChange: '0.04',
            bid: '5.1852',
            ask: '5.1861',
            timestamp: '1659410670',
            create_date: '2022-08-02 00:24:30'
          },
          USDT: {
            code: 'USD',
            codein: 'BRLT',
            name: 'Dólar Americano/Real Brasileiro Turismo',
            high: '5.21',
            low: '5.21',
            varBid: '0',
            pctChange: '0',
            bid: '5.05',
            ask: '5.37',
            timestamp: '1659382500',
            create_date: '2022-08-01 16:35:00'
          },
          CAD: {
            code: 'CAD',
            codein: 'BRL',
            name: 'Dólar Canadense/Real Brasileiro',
            high: '4.0396',
            low: '4.0314',
            varBid: '0.0008',
            pctChange: '0.02',
            bid: '4.0352',
            ask: '4.0371',
            timestamp: '1659410675',
            create_date: '2022-08-02 00:24:35'
          },
          GBP: {
            code: 'GBP',
            codein: 'BRL',
            name: 'Libra Esterlina/Real Brasileiro',
            high: '6.3675',
            low: '6.3498',
            varBid: '0.009',
            pctChange: '0.14',
            bid: '6.3565',
            ask: '6.3597',
            timestamp: '1659410675',
            create_date: '2022-08-02 00:24:35'
          },
          ARS: {
            code: 'ARS',
            codein: 'BRL',
            name: 'Peso Argentino/Real Brasileiro',
            high: '0.0393',
            low: '0.0393',
            varBid: '0',
            pctChange: '0',
            bid: '0.0393',
            ask: '0.0393',
            timestamp: '1659410670',
            create_date: '2022-08-02 00:24:30'
          },
          BTC: {
            code: 'BTC',
            codein: 'BRL',
            name: 'Bitcoin/Real Brasileiro',
            high: '128',
            low: '112.25',
            varBid: '-7036',
            pctChange: '-5.58',
            bid: '119.027',
            ask: '119.298',
            timestamp: '1659410671',
            create_date: '2022-08-02 00:24:31'
          },
          LTC: {
            code: 'LTC',
            codein: 'BRL',
            name: 'Litecoin/Real Brasileiro',
            high: '444.44',
            low: '286',
            varBid: '-6.42',
            pctChange: '-2.09',
            bid: '299.4',
            ask: '300.56',
            timestamp: '1659410670',
            create_date: '2022-08-02 00:24:30'
          },
          EUR: {
            code: 'EUR',
            codein: 'BRL',
            name: 'Euro/Real Brasileiro',
            high: '5.3381',
            low: '5.3184',
            varBid: '0.0092',
            pctChange: '0.17',
            bid: '5.3268',
            ask: '5.3298',
            timestamp: '1659410673',
            create_date: '2022-08-02 00:24:33'
          },
          JPY: {
            code: 'JPY',
            codein: 'BRL',
            name: 'Iene Japonês/Real Brasileiro',
            high: '0.03976',
            low: '0.03936',
            varBid: '0.0002',
            pctChange: '0.51',
            bid: '0.03963',
            ask: '0.03966',
            timestamp: '1659410707',
            create_date: '2022-08-02 00:25:07'
          },
          CHF: {
            code: 'CHF',
            codein: 'BRL',
            name: 'Franco Suíço/Real Brasileiro',
            high: '5.4747',
            low: '5.4531',
            varBid: '0.0002',
            pctChange: '0',
            bid: '5.4575',
            ask: '5.4608',
            timestamp: '1659410675',
            create_date: '2022-08-02 00:24:35'
          },
          AUD: {
            code: 'AUD',
            codein: 'BRL',
            name: 'Dólar Australiano/Real Brasileiro',
            high: '3.6476',
            low: '3.6336',
            varBid: '-0.0034',
            pctChange: '-0.09',
            bid: '3.6364',
            ask: '3.638',
            timestamp: '1659410675',
            create_date: '2022-08-02 00:24:35'
          },
          CNY: {
            code: 'CNY',
            codein: 'BRL',
            name: 'Yuan Chinês/Real Brasileiro',
            high: '0.7663',
            low: '0.7646',
            varBid: '-0.0008',
            pctChange: '-0.11',
            bid: '0.7658',
            ask: '0.766',
            timestamp: '1659410702',
            create_date: '2022-08-02 00:25:02'
          },
          ILS: {
            code: 'ILS',
            codein: 'BRL',
            name: 'Novo Shekel Israelense/Real Brasileiro',
            high: '1.5382',
            low: '1.5382',
            varBid: '0.0141',
            pctChange: '0.92',
            bid: '1.5381',
            ask: '1.5384',
            timestamp: '1659405664',
            create_date: '2022-08-01 23:01:04'
          },
          ETH: {
            code: 'ETH',
            codein: 'BRL',
            name: 'Ethereum/Real Brasileiro',
            high: '9.07',
            low: '8.255',
            varBid: '-393.39',
            pctChange: '-4.52',
            bid: '8.27354',
            ask: '8.30104',
            timestamp: '1659410555',
            create_date: '2022-08-02 00:22:35'
          },
          XRP: {
            code: 'XRP',
            codein: 'BRL',
            name: 'XRP/Real Brasileiro',
            high: '2.22',
            low: '1.73',
            varBid: '-0.14',
            pctChange: '-6.87',
            bid: '1.92',
            ask: '1.92',
            timestamp: '1659410672',
            create_date: '2022-08-02 00:24:32'
          },
          DOGE: {
            code: 'DOGE',
            codein: 'BRL',
            name: 'Dogecoin/Real Brasileiro',
            high: '0.363941',
            low: '0.342747',
            varBid: '-0.01887999',
            pctChange: '-5.21',
            bid: '0.343414',
            ask: '0.343414',
            timestamp: '1659410420',
            create_date: '2022-08-02 00:20:20'
          }
        }
      }
    ]
  }
};


const mockInit = {
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
    quote: {}
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
    renderWithRedux(<Wallet />, { initialState: mockInit });
    const descTable = screen.getByTestId('desc');
    expect(descTable).toBeInTheDocument();
    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();
  });
  it('Verifica se após clicar no botão, é formada uma tabela com os valores corretos', async () => {
    renderWithRedux(<Wallet />, { initialState: mockWallet });
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(buttonAdd);
    expect(screen.getByText('wada')).toBeInTheDocument();
    expect(screen.getByText('10.00')).toBeInTheDocument();
    expect(screen.getByText('5.19')).toBeInTheDocument();
    expect(screen.getByText('Dólar Americano/Real Brasileiro')).toBeInTheDocument();
    expect(screen.getByText('Real')).toBeInTheDocument();
  });
});
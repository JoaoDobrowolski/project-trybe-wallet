import getCurrency from '../../services/currencyApi';

export function userAction(email) {
  return {
    type: 'EMAIL',
    email,
  };
}

export const requestCurrency = () => ({
  type: 'REQUEST_CURRENCY',
});

export const receiveCurrency = (currencies) => ({
  type: 'RECEIVE_CURRENCY',
  currencies,
});

export const receiveFailure = (error) => ({
  type: 'RECEIVE_FAILURE',
  error,
});

export function fetchCurrency() {
  return async (dispatch) => {
    // console.log('valor do getState: ', getState);
    dispatch(requestCurrency());
    try {
      const response = await getCurrency();
      dispatch(receiveCurrency(response));
    } catch (error) {
      dispatch(receiveFailure(error));
    }
  };
}

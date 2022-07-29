// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  loading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCY':
    return {
      ...state,
      loading: true,
    };
  case 'RECEIVE_CURRENCY':
    return {
      ...state,
      loading: false,
      currencies: Object.keys(action.currencies)
        .filter((element) => !element.includes('USDT')),
      // currencies: Object.keys(action.currencies).map((key) => [Number(key), action.currencies[key]]),
    };
  case 'RECEIVE_FAILURE':
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default wallet;

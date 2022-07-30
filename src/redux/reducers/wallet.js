// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  loading: false,
  quote: {},
  // expenses: [],
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
    };
  case 'RECEIVE_FAILURE':
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  case 'RECEIVE_QUOTE':
    return {
      ...state,
      quote: action.quote,
    };
  case 'EXPENSES':
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;

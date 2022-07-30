import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expense, fetchCurrency, fetchQuote } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      expenses: [],
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  createObj = () => {
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const obj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    this.setState((prevState) => ({
      id: id + 1,
      expenses: [...prevState.expenses, obj],
    }));
  };

  handleClick = async () => {
    // const { currency } = this.state;
    const { getQuote } = this.props;
    await getQuote();
    const { quote } = this.props;
    // this.setState({ exchangeRates: quote[currency].ask });
    this.setState({ exchangeRates: quote });
    this.createObj();
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    const { expenses } = this.state;
    const { prices } = this.props;
    prices(expenses);
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div className="wallet">
        <label htmlFor="valueInput">
          Valor:
          <input
            id="valueInput"
            type="number"
            min={ 0 }
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="descriptionInput">
          Descrição:
          <input
            id="descriptionInput"
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currencyInput">
          Moeda:
          <select
            id="currencyInput"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { (currencies)
              .map((currenc) => (
                <option key={ currenc } value={ currenc }>{ currenc }</option>
              )) }
          </select>
        </label>

        <label htmlFor="methodInput">
          Método de Pagamento
          <select
            id="methodInput"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tagInput">
          Tag
          <select
            id="tagInput"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          name="buttonAdd"
          onClick={ () => this.handleClick() }
        >
          Adicionar despesa
        </button>

      </div>
    );
  }
}

WalletForm.propTypes = {
  getCurrency: PropTypes.func.isRequired,
  getQuote: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  quote: PropTypes.shape({}).isRequired,
  prices: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  quote: store.wallet.quote,
  // expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrency()),
  getQuote: () => dispatch(fetchQuote()),
  prices: (expenses) => dispatch(expense(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

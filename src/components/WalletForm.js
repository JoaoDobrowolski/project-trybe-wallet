import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editButton, expense, fetchCurrency, fetchQuote } from '../redux/actions';
// import { editTr, tableButtons } from './Table';

const alimentacao = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      expenses: [],
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency(); // dispatch
  }

  handleChange = ({ target }) => {
    const { name } = target;
    // const value = target.value;
    this.setState({
      [name]: target.value,
    });
  };

  createObj = () => {
    const { id, value, description, currency, method,
      tag, exchangeRates } = this.state;
    const obj = {
      id,
      value: value === '' ? 0 : value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    const { newExpenses, editId, isEditDisabled } = this.props; // mapState
    if (isEditDisabled === true) {
      this.setState({
        id: id + 1,
        expenses: [...newExpenses, obj], // ajuda do Dhiego
      });
    } else {
      // const arr = Array.prototype.slice.call(editTr); // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
      // const indexTr = arr.map((element) => parseFloat(element.id))
      //   .filter((ids) => ids === editId);
      // editTr[indexTr].classList.remove('editYellow');

      // const arrOfButtons = Array.prototype.slice.call(tableButtons);
      // for (let index = 0; index < arrOfButtons.length; index += 1) {
      //   arrOfButtons[index].style.visibility = 'visible';
      // }

      const arrayEdit = [...newExpenses];
      arrayEdit[editId].value = obj.value;
      arrayEdit[editId].description = obj.description;
      arrayEdit[editId].currency = obj.currency;
      arrayEdit[editId].method = obj.method;
      arrayEdit[editId].tag = obj.tag;
      arrayEdit[editId].exchangeRates = obj.exchangeRates;
      this.setState({
        expenses: arrayEdit,
      });
    }
  };

  handleAddClick = async () => {
    const { getQuote } = this.props;
    await getQuote(); // dispatch
    const { quote } = this.props; // mapState
    this.setState({ exchangeRates: quote });
    this.createObj();
    const { expenses } = this.state;
    this.setState({
      expenses,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    });
    const { prices } = this.props;
    prices(expenses); // dispatch
  };

  handleEditClick = async () => {
    await this.handleAddClick();
    const { isEditDisabledWF } = this.props;
    isEditDisabledWF(true);
  };

  render() {
    const { value, description, currency,
      method, tag } = this.state;
    const { currencies, isEditDisabled } = this.props; // mapState
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
          Método de Pagamento:
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
          Tag:
          <select
            id="tagInput"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value={ alimentacao }>Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        { isEditDisabled
          ? (
            <button
              data-testid="addExpenseButton"
              id="addExpenseButton"
              type="button"
              name="buttonAdd"
              onClick={ () => this.handleAddClick() }
            // disabled={ !isEditDisabled }
            >
              Adicionar despesa
            </button>
          )
          : (
            <button
              data-testid="editExpenseButton"
              id="editExpenseButton"
              type="button"
              name="buttonEdit"
              onClick={ () => this.handleEditClick() }
            // disabled={ isEditDisabled }
            >
              Editar despesa
            </button>
          ) }
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
  newExpenses: PropTypes.shape({}).isRequired,
  isEditDisabled: PropTypes.bool.isRequired,
  isEditDisabledWF: PropTypes.bool.isRequired,
  editId: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  quote: store.wallet.quote,
  newExpenses: store.wallet.expenses,
  isEditDisabled: store.wallet.isEditButtonDisabled,
  editId: store.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrency()),
  getQuote: () => dispatch(fetchQuote()),
  prices: (expenses) => dispatch(expense(expenses)),
  isEditDisabledWF: (isEditButtonDisabled, id) => (
    dispatch(editButton(isEditButtonDisabled, id))),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toRound from '../rounder';
import { expense } from '../redux/actions';

class Table extends Component {
  handleDeleteButton = (id) => {
    const { expenses } = this.props;
    const newExpense = expenses.filter((expenseDeleted) => expenseDeleted.id !== id);
    const { prices } = this.props;
    prices(newExpense);
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th data-testid="desc">Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th data-testid="edEx">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses
              && (
                expenses.map((element) => (
                  <tr key={ element.id }>
                    <td>{ element.description }</td>
                    <td>{ element.tag }</td>
                    <td>{ element.method }</td>
                    <td>{ toRound(element.value).toFixed(2) }</td>
                    <td>{ element.exchangeRates[element.currency].name }</td>
                    <td>
                      { toRound(element.exchangeRates[element.currency].ask).toFixed(2) }
                    </td>
                    <td>
                      {
                        toRound(
                          element.exchangeRates[element.currency].ask * element.value,
                        ).toFixed(2)
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        id="edit-button"
                        data-testid="edit-btn"
                        type="button"
                      >
                        Editar
                      </button>
                      <button
                        id="delete-button"
                        name="deleteButton"
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.handleDeleteButton(element.id) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  prices: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  prices: (expensesAfterDelete) => dispatch(expense(expensesAfterDelete)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

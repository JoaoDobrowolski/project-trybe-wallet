import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toRound from '../rounder';
import { editButton, expense } from '../redux/actions';

export const editTr = document.getElementsByClassName('trs');
export const tableButtons = document.getElementsByClassName('table-buttons');

class Table extends Component {
  handleDeleteButton = (id) => {
    const { expenses } = this.props; // mapState
    const newExpense = expenses.filter((expenseDeleted) => expenseDeleted.id !== id);
    const { prices } = this.props;
    prices(newExpense); // dispatch
  };

  handleEditButton = (id) => {
    const { isEditDisabled } = this.props; // mapState
    isEditDisabled(false, id); // dispatch
    // const arr = Array.prototype.slice.call(editTr); // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
    // const indexTr = arr.map((element) => parseFloat(element.id))
    //   .filter((ids) => ids === id);
    // editTr[indexTr].classList.add('editYellow');

    // const arrOfButtons = Array.prototype.slice.call(tableButtons);
    // for (let index = 0; index < arrOfButtons.length; index += 1) {
    //   arrOfButtons[index].style.visibility = 'hidden';
    // }
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
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
            { (expenses)
              && (
                expenses.map((element) => (
                  <tr className="trs" id={ element.id } key={ element.id }>
                    <td className="tds" data-testid="desc">{ element.description }</td>
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
                        className="table-buttons"
                        id="edit-button"
                        data-testid="edit-btn"
                        type="button"
                        onClick={ () => this.handleEditButton(element.id) }
                      >
                        Editar
                      </button>
                      <button
                        className="table-buttons"
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
  isEditDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  prices: (expensesAfterDelete) => dispatch(expense(expensesAfterDelete)),
  isEditDisabled: (isEditButtonDisabled, id) => (
    dispatch(editButton(isEditButtonDisabled, id))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

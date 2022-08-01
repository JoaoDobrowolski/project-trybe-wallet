import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  toRound = (num) => { // https://www.delftstack.com/pt/howto/javascript/javascript-round-to-2-decimal-places/#:~:text=decimais%20em%20JavaScript.-,Use%20o%20m%C3%A9todo%20.,ap%C3%B3s%20o%20decimal%20como%20argumento.
    const quinze = 15;
    const centezimo = 0.01;
    const aux = Number((Math.abs(num) * 100).toPrecision(quinze)); // OBS: (Math.round(number + 'e+2') + 'e-2') não é permitido devido ao lint
    return (Math.round(aux) * centezimo * Math.sign(aux)).toFixed(2);
  };

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          <tbody>
            { expenses
              && (
                expenses.map((element) => (
                  <tr key={ element.id }>
                    <td>{ element.description }</td>
                    <td>{ element.tag }</td>
                    <td>{ element.method }</td>
                    <td>{ this.toRound(element.value) }</td>
                    <td>{ element.exchangeRates[element.currency].name }</td>
                    <td>{ this.toRound(element.exchangeRates[element.currency].ask) }</td>
                    <td>
                      {
                        this.toRound(
                          element.exchangeRates[element.currency].ask * element.value,
                        )
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button type="button">Editar</button>
                      <button type="button">Excluir</button>
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
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

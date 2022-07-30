import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  toRound = (num) => { // https://www.delftstack.com/pt/howto/javascript/javascript-round-to-2-decimal-places/#:~:text=decimais%20em%20JavaScript.-,Use%20o%20m%C3%A9todo%20.,ap%C3%B3s%20o%20decimal%20como%20argumento.
    const quinze = 15;
    const centezimo = 0.01;
    const aux = Number((Math.abs(num) * 100).toPrecision(quinze)); // OBS: (Math.round(number + 'e+2') + 'e-2') não é permitido devido ao lint
    return (Math.round(aux) * centezimo * Math.sign(aux));
  };

  getExpenses = () => {
    const { expenses } = this.props;
    return (expenses.reduce((acc, cur) => this
      .toRound((acc) + parseFloat(cur.value)
        * parseFloat(cur.exchangeRates[cur.currency].ask)), 0))
      .toFixed(2);
  };

  render() {
    const { user, expenses } = this.props;
    return (
      <div className="header">
        <div>
          <span id="email-header" data-testid="email-field">{ user }</span>
        </div>
        <div>
          {
            expenses
              ? <span data-testid="total-field">{ this.getExpenses().toString() }</span>
              : <span data-testid="total-field">0</span>
          }
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = (store) => ({
  user: store.user.email,
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

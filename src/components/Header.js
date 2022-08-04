import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toRound from '../rounder';

class Header extends Component {
  render() {
    const { user, expenses } = this.props;
    return (
      <div className="header">
        <div>
          <span id="email-header" data-testid="email-field">{ user }</span>
        </div>
        <div>
          <span data-testid="total-field">
            {
              expenses.reduce((acc, cur) => toRound((acc) + parseFloat(cur.value)
                * parseFloat(cur.exchangeRates[cur.currency].ask)), 0).toFixed(2)
            }
          </span>
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

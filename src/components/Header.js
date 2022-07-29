import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="header">
        <div>
          <span id="email-header" data-testid="email-field">{ user }</span>
        </div>
        <div>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  user: store.user.email,
});

export default connect(mapStateToProps)(Header);

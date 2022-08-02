import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoginButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, this.validateInput);
  };

  validateInput = () => {
    const { email, password } = this.state;
    const minChar = 6;
    const emailValidade = String(email)
      .toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    if (password.length >= minChar && emailValidade !== null) {
      this.setState({
        isLoginButtonDisabled: false,
      });
    } else {
      this.setState({
        isLoginButtonDisabled: true,
      });
    }
  };

  handleLogin = () => {
    const { email } = this.state;
    const { history, userEmail } = this.props;
    userEmail(email);
    history.push('/carteira'); // Diegho me lembrou disso
  };

  render() {
    const { email, password, isLoginButtonDisabled } = this.state;
    return (
      <div className="login">
        <span className="logo-trybe">
          TR
          <span className="y-logo-trybe">
            Y
          </span>
          BE
        </span>
        <input
          type="email"
          id="emailInput"
          placeholder="Email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          id="passwordInput"
          placeholder="Senha"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          name="buttonLogin"
          id="button-login"
          disabled={ isLoginButtonDisabled }
          onClick={ this.handleLogin }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  userEmail: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userEmail: (emailUser) => dispatch(userAction(emailUser)),
});

export default connect(null, mapDispatchToProps)(Login);

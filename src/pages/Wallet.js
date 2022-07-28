import React from 'react';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="wallet">
          <label htmlFor="valueInput">
            Valor:
            <input
              id="valueInput"
              type="number"
            />
          </label>
        </div>
      </>
    );
  }
}

export default Wallet;

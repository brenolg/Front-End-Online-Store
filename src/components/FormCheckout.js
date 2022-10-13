import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormCheckout extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      endereço: '',
      payment: '',
      inputCheck: false,
      clickCheck: false,
    };
  }

  checkInputs = () => {
    const { name, email, cpf, telefone, cep, endereço, payment } = this.state;
    const inputCheck = (name.length > 0 && email.length > 0
      && cpf.length > 0 && telefone.length > 0 && cep.length > 0
       && endereço.length > 0 && payment.length > 0);
    this.setState({ inputCheck });
  };

  handleChange = ({ target }) => {
    this.setState(
      { [target.name]: target.value },
      () => this.checkInputs(),
    );
  };

  buy = () => {
    const { push } = this.props;
    const { inputCheck } = this.state;
    if (inputCheck) {
      localStorage.clear('favoriteList');
      this.setState({ clickCheck: true }, () => push('/'));
    }
    this.setState({ clickCheck: true });
  };

  render() {
    const { inputCheck, clickCheck } = this.state;
    return (
      <>

        <form>
          <label htmlFor="name">
            Nome Completo
            <input
              id="name"
              name="name"
              type="text"
              data-testid="checkout-fullname"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            email
            <input
              id="email"
              name="email"
              type="email"
              data-testid="checkout-email"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="cpf">
            cpf
            <input
              id="cpf"
              name="cpf"
              type="text"
              data-testid="checkout-cpf"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="telefone">
            telefone
            <input
              id="telefone"
              name="telefone"
              type="text"
              data-testid="checkout-phone"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="CEP">
            CEP
            <input
              id="CEP"
              type="text"
              name="cep"
              data-testid="checkout-cep"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="endereço">
            endereço
            <input
              id="endereço"
              name="endereço"
              type="text"
              data-testid="checkout-address"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="boleto">
            boleto
            <input
              id="boleto"
              type="radio"
              name="payment"
              value="boleto"
              data-testid="ticket-payment"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="visa">
            visa
            <input
              id="visa"
              type="radio"
              name="payment"
              value="visa"
              data-testid="visa-payment"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="master">
            master
            <input
              id="master"
              type="radio"
              name="payment"
              value="master"
              data-testid="master-payment"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="elo">
            elo
            <input
              id="elo"
              type="radio"
              name="payment"
              value="elo"
              data-testid="elo-payment"
              onChange={ this.handleChange }
            />
          </label>

          <button
            data-testid="checkout-btn"
            type="button"
            onClick={ this.buy }

          >
            Efetuar Pagamento
          </button>
        </form>
        <div>
          {(!inputCheck && clickCheck) && (
            <p data-testid="error-msg">Campos inválidos</p>
          )}
        </div>
      </>

    );
  }
}

FormCheckout.propTypes = {
  push: PropTypes.func.isRequired,
};

export default FormCheckout;

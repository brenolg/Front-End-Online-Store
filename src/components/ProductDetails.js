import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import CartIcon from './CartIcon';

class ProductDetails extends Component {
  state = {
    details: [],
    radioTrue: false,
    email: '',
    emailTrue: false,
    campoValidado: true,
    text: '',
    nota: '',
    avaliacoes: [],
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params;
    this.getProduct();
    const avaliacoes = JSON.parse(localStorage.getItem(id));
    if (avaliacoes !== null) {
      this.setState({ avaliacoes });
    }
  }

  getProduct = async () => {
    const { match: { params } } = this.props;
    const result = await getProductById(params.id);
    this.setState({ details: result });
  };

  saveLocalStorage = () => {
    const { match: { params } } = this.props;
    const { id } = params;
    const { avaliacoes } = this.state;
    localStorage.setItem(id, JSON.stringify(avaliacoes));
  };

  handleClick = () => {
    const { emailTrue, radioTrue, email, nota, text, avaliacoes } = this.state;
    const avaliacao = { email, text, rating: nota };
    if (emailTrue && radioTrue) {
      this.setState({ avaliacoes: [...avaliacoes, avaliacao],
      }, () => this.saveLocalStorage());
      this.setState({ radioTrue: false,
        email: '',
        emailTrue: false,
        campoValidado: true,
        text: '',
        nota: '' });
    } else {
      this.setState({ campoValidado: false });
    }
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const result = value.includes('@') && value.includes('.com');
    this.setState({ emailTrue: result, email: value });
  };

  handleChangeRadio = ({ target }) => {
    this.setState({ [target.name]: target.value });
    if (target.value === 'on') {
      this.setState({ radioTrue: true, nota: target.id });
    }
  };

  handleChangeText = ({ target }) => {
    const { value } = target;
    this.setState({ text: value });
  };

  render() {
    const { details, disabled, campoValidado,
      avaliacoes, email, text } = this.state;
    const { addToCar, quantity } = this.props;
    return (
      <div>
        <CartIcon quantity={ quantity } />
        <div>
          <img
            src={ details.thumbnail }
            alt={ details.title }
            data-testid="product-detail-image"
          />
          <p data-testid="product-detail-price" id={ details.price }>{details.price}</p>
          <p data-testid="product-detail-name" id={ details.title }>{details.title}</p>
          <button
            type="button"
            onClick={ addToCar }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao Carrinho
          </button>
          <button
            type="button"
          >
            <Link
              to="/cart"
              data-testid="shopping-cart-button"
            >
              Carrinho de Compras
            </Link>
          </button>
        </div>
        <form>
          <label htmlFor="email-input">
            E-mail
            <input
              type="email"
              name=""
              id="email-input"
              data-testid="product-detail-email"
              required
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <div>
            <span>Nota:</span>
            <label htmlFor="1">
              1
              <input
                type="radio"
                name="nota"
                id="1"
                data-testid="1-rating"
                onChange={ this.handleChangeRadio }
              />
            </label>
            <label htmlFor="2">
              2
              <input
                type="radio"
                name="nota"
                id="2"
                data-testid="2-rating"
                onChange={ this.handleChangeRadio }
              />
            </label>
            <label htmlFor="3">
              3
              <input
                type="radio"
                name="nota"
                id="3"
                data-testid="3-rating"
                onChange={ this.handleChangeRadio }
              />
            </label>
            <label htmlFor="4">
              4
              <input
                type="radio"
                name="nota"
                id="4"
                data-testid="4-rating"
                onChange={ this.handleChangeRadio }
              />
            </label>
            <label htmlFor="5">
              5
              <input
                type="radio"
                name="nota"
                id="5"
                data-testid="5-rating"
                onChange={ this.handleChangeRadio }
              />
            </label>
          </div>
          <span>Comentários</span>
          <input
            type="text"
            name=""
            id="text-input"
            data-testid="product-detail-evaluation"
            onChange={ this.handleChangeText }
            value={ text }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Enviar
          </button>
        </form>
        { campoValidado ? (
          <ul>
            {avaliacoes.map((ava) => (
              <li key={ ava.email }>
                <p data-testid="review-card-email">{ava.email}</p>
                <p data-testid="review-card-rating">{ava.rating}</p>
                <p data-testid="review-card-evaluation">{ava.text}</p>
              </li>))}
          </ul>)
          : <p data-testid="error-msg">Campos inválidos</p>}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  addToCar: PropTypes.func.isRequired,
};

export default ProductDetails;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetails extends Component {
  state = {
    details: [],
    freeShipping: false,
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params } } = this.props;
    const result = await getProductById(params.id);
    this.setState({
      details: result,
      freeShipping: result.shipping.free_shipping });
  };

  render() {
    const { details, freeShipping } = this.state;
    const { addToCar } = this.props;
    return (
      <div>
        <img
          src={ details.thumbnail }
          alt={ details.title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price" id={ details.price }>{details.price}</p>
        <p data-testid="product-detail-name" id={ details.title }>{details.title}</p>
        {freeShipping && (
          <p data-testid="free-shipping">Frete grátis</p>)}
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

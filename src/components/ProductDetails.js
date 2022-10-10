import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetails extends Component {
  state = {
    details: [],
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params } } = this.props;
    const result = await getProductById(params.id);
    this.setState({ details: result });
  };

  render() {
    const { details } = this.state;
    return (
      <div>
        <span data-testid="product-detail-name">{details.title}</span>
        <img
          src={ details.thumbnail }
          alt={ details.title }
          data-testid="product-detail-image"
        />
        <span data-testid="product-detail-price">{details.price}</span>
        <div>
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
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default ProductDetails;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartItemCard extends Component {
  render() {
    const { favorito } = this.props;
    return (
      <div key={ favorito.title }>
        <img src={ favorito.img } alt={ favorito.title } />
        <p>{favorito.price}</p>
        <p data-testid="shopping-cart-product-name">{favorito.title}</p>
        <p data-testid="shopping-cart-product-quantity">
          {favorito.qtde}
        </p>
      </div>
    );
  }
}

CartItemCard.propTypes = {
  favorito: PropTypes.shape({
    img: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    qtde: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItemCard;

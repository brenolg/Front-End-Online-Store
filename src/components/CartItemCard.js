import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartItemCard extends Component {
  render() {
    const { favorito, addToCar, decreaseQuantity, removeCartItem } = this.props;
    return (
      <div key={ favorito.title }>
        <img src={ favorito.img } alt={ favorito.title } />
        <p id={ favorito.price }>{favorito.price}</p>
        <p data-testid="shopping-cart-product-name" id={ favorito.title }>
          {favorito.title}
        </p>
        <p data-testid="shopping-cart-product-quantity">
          {favorito.qtde}
        </p>
        <button
          type="button"
          onClick={ addToCar }
          data-testid="product-increase-quantity"
        >
          Adicionar +1
        </button>
        <button
          type="button"
          onClick={ decreaseQuantity }
          data-testid="product-decrease-quantity"
        >
          Remover -1
        </button>
        <button
          type="button"
          onClick={ removeCartItem }
          data-testid="remove-product"
        >
          Remover Produto da Lista
        </button>
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
  addToCar: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
  removeCartItem: PropTypes.func.isRequired,
};

export default CartItemCard;

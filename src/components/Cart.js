import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartItemCard from './CartItemCard';

class Cart extends Component {
  render() {
    const { favoriteList, addToCar, decreaseQuantity, removeCartItem } = this.props;
    return (
      <div>
        { favoriteList.length < 1
          ? <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
          : favoriteList.map((favorito) => (
            <CartItemCard
              key={ favorito.title }
              favorito={ favorito }
              quantidadeItens={ this.quantidadeItens }
              addToCar={ addToCar }
              decreaseQuantity={ decreaseQuantity }
              removeCartItem={ removeCartItem }
            />
          ))}
      </div>
    );
  }
}

Cart.propTypes = {
  favoriteList: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    qtde: PropTypes.number.isRequired,
  })).isRequired,
  addToCar: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
  removeCartItem: PropTypes.func.isRequired,
};

export default Cart;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartItemCard from './CartItemCard';

class Cart extends Component {
  state = {
    cartList: [],
  };

  render() {
    const { cartList } = this.state;
    const { favoriteList } = this.props;
    return (
      <div>
        { cartList.length < 1
          ? <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
          : <span>{cartList}</span> }
        {favoriteList.map((favorito) => (
          <CartItemCard
            key={ favorito.title }
            favorito={ favorito }
            quantidadeItens={ this.quantidadeItens }
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
};

export default Cart;

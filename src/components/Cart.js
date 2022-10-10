import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  state = {
    cartList: [],
  };

  quantidadeItens = (title) => {
    const { favoriteList } = this.props;
    const quantidade = favoriteList.filter((favorito) => favorito.title === title);
    return quantidade.length;
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
          <div key={ favorito.title }>
            <img src={ favorito.img } alt={ favorito.title } />
            <p>{favorito.price}</p>
            <p data-testid="shopping-cart-product-name">{favorito.title}</p>
            <p data-testid="shopping-cart-product-quantity">
              {this.quantidadeItens(favorito.title)}
            </p>
          </div>))}
      </div>
    );
  }
}

Cart.propTypes = {
  favoriteList: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default Cart;

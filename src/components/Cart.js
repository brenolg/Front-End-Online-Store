import React, { Component } from 'react';

class Cart extends Component {
  state = {
    cartList: [],
  };

  render() {
    const { cartList } = this.state;
    return (
      <div>
        { cartList.length < 1
          ? <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
          : <span>{cartList}</span> }
      </div>
    );
  }
}

export default Cart;

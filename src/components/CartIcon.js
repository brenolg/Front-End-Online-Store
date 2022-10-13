import React, { Component } from 'react';

class CartIcon extends Component {
  state = {
    quantity: 0,
  };

  componentDidMount() {
    this.getNProducts();
  }

  getNProducts = () => {
    const quantity = JSON.parse(localStorage.getItem('quantity'));
    if (quantity !== null) {
      this.setState({ quantity });
    }
  };

  render() {
    const { quantity } = this.props;
    return (
      <p data-testid="shopping-cart-size">{quantity}</p>
    );
  }
}

export default CartIcon;

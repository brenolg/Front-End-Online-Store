import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartIcon extends Component {
  render() {
    const { quantity } = this.props;
    return (
      <p data-testid="shopping-cart-size">{quantity}</p>
    );
  }
}

CartIcon.propTypes = {
  quantity: PropTypes.func.isRequired,
};

export default CartIcon;

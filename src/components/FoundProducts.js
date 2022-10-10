import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FoundProducts extends Component {
  render() {
    const { productList, addToCar } = this.props;
    return (
      <div>
        { productList.map((produto) => (
          <div key={ produto.id } data-testid="product">
            <img src={ produto.thumbnail } alt={ produto.title } />
            <p id={ produto.price }>{produto.price}</p>
            <p id={ produto.title }>{produto.title}</p>
            <button
              type="button"
              onClick={ addToCar }
              data-testid="product-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
          </div>)) }
      </div>
    );
  }
}

FoundProducts.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  addToCar: PropTypes.func.isRequired,
};

export default FoundProducts;

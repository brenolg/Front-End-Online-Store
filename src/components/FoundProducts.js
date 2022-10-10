import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class FoundProducts extends Component {
  handleClick = async ({ target }) => {
    const result = await getProductById(target.id);
    console.log(target);
    return result;
  };

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
            <button
              type="button"
              onClick={ this.handleClick }
            >
              <Link
                to={ `/product-details/${produto.id}` }
                data-testid="product-detail-link"
                id={ produto.id }
              >
                Detalhes do Produto
              </Link>
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

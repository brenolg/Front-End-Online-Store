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
    const { productList } = this.props;
    return (
      <div>
        { productList.map((produto) => (
          <div key={ produto.id } data-testid="product">
            <span>{produto.title}</span>
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
};

export default FoundProducts;

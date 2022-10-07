import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FoundProducts extends Component {
  render() {
    const { productList } = this.props;
    return (
      <div>
        { productList.map((produto) => (
          <div key={ produto.id } data-testid="product">
            <span>{produto.title}</span>
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

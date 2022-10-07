import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    searchProduct: '',
  };

  handleChange = ({ target }) => {
    this.setState({ searchProduct: target.value });
  };

  render() {
    const { searchProduct } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho de compras</Link>
        <input type="text" onChange={ this.handleChange } />
        {(searchProduct === '')
          ? (
            <span data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>)
          : <span>{searchProduct}</span>}
      </div>
    );
  }
}

export default Home;

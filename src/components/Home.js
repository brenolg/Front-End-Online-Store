import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import FoundProducts from './FoundProducts';
import CartIcon from './CartIcon';

class Home extends Component {
  state = {
    searchProduct: '',
    productList: [],
    searched: false,
    listOfCategories: [],
    selectedCat: '',
  };

  componentDidMount() {
    this.createListButtons();
  }

  createListButtons = async () => {
    const search = await getCategories();
    this.setState({ listOfCategories: search });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    if (target.type === 'radio') {
      this.searchButton();
    }
  };

  searchButton = async () => {
    const { searchProduct, selectedCat } = this.state;
    let productList = await getProductsFromCategoryAndQuery(selectedCat, searchProduct);
    productList = productList.results;
    this.setState({
      productList,
      searched: true,
    });
  };

  render() {
    const { productList,
      searched,
      listOfCategories } = this.state;
    const { addToCar, quantity } = this.props;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho de compras</Link>
        <form>
          <input
            type="text"
            onChange={ this.handleChange }
            data-testid="query-input"
            name="searchProduct"
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.searchButton }
          >
            Buscar
          </button>
        </form>
        <CartIcon quantity={ quantity } />
        <div>
          {listOfCategories.map((cat, index) => (
            <label
              htmlFor={ cat.id }
              key={ index }
            >
              {cat.name}
              <input
                data-testid="category"
                value={ cat.id }
                onChange={ this.handleChange }
                name="selectedCategory"
                type="radio"
                id={ cat.id }
              />
            </label>
          ))}
        </div>
        {(!searched)
          ? (
            <span data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>)
          : (
            <div>
              { productList.length < 1
                ? <p>Nenhum produto foi encontrado</p>
                : <FoundProducts { ...this.state } addToCar={ addToCar } />}
            </div>)}
      </div>
    );
  }
}

Home.propTypes = {
  addToCar: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default Home;

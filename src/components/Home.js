import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import FoundProducts from './FoundProducts';

class Home extends Component {
  state = {
    searchProduct: '',
    productList: [],
    searched: false,
    listOfProduct: [],
  };

  componentDidMount() {
    this.createListButtons();
  }

  createListButtons = async () => {
    const search = await getCategories();
    this.setState({ listOfProduct: search });
  };

  handleChange = ({ target }) => {
    this.setState({ searchProduct: target.value });
  };

  searchButton = async () => {
    const { searchProduct } = this.state;
    let productList = await getProductsFromCategoryAndQuery('', searchProduct);
    console.log(productList);

    productList = productList.results;
    console.log(searchProduct, productList);
    this.setState({
      productList,
      searched: true,
    });
  };

  render() {
    const { productList, searched, listOfProduct } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho de compras</Link>
        <form>
          <input type="text" onChange={ this.handleChange } data-testid="query-input" />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.searchButton }
          >
            Buscar
          </button>
        </form>
        {(!searched)
          ? (
            <span data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>)
          : (
            <div>
              { productList.length < 1
                ? <p>Nenhum produto foi encontrado</p>
                : <FoundProducts { ...this.state } />}
            </div>)}
        <div>

          {listOfProduct.map((cat, index) => (
            <label
              htmlFor={ cat.id }
              key={ index }
            >
              {cat.name}
              <input
                data-testid="category"
                name="index"
                type="radio"
                id={ cat.id }
              />
            </label>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;

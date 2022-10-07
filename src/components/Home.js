import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    searchProduct: '',
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

  render() {
    const { searchProduct,
      listOfProduct } = this.state;
    return (
      <>
        <div>
          <input type="text" onChange={ this.handleChange } />
          {(searchProduct === '')
            ? (
              <span data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </span>)
            : <span>{searchProduct}</span>}
        </div>
        <div>

          {listOfProduct.map((cat, index) => (

            <label
              htmlFor="index"
              key={ index }
            >
              {cat.name}
              <input
                data-testid="category"
                name="index"
                type="radio"
                id="index"
              />
            </label>
          ))}

        </div>
      </>

    );
  }
}

export default Home;

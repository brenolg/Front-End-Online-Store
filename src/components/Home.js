import React, { Component } from 'react';

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

import React, { Component } from 'react';
import FormCheckout from './FormCheckout';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      favoriteList: [],
    };
  }

  componentDidMount() {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    if (favoriteList !== null) {
      this.setState({ favoriteList });
    }
  }

  render() {
    const { favoriteList } = this.state;
    return (

      <div>
        {favoriteList.length > 0 ? (
          <div>
            <p>Revise seus Produtos</p>
            {favoriteList.map((listItem) => (
              <div key={ listItem.title }>
                <img src={ listItem.img } alt={ listItem.img } />
                <p>{listItem.title}</p>
                <p>{listItem.qtde}</p>
                <p>{listItem.price}</p>
              </div>
            ))}
            <FormCheckout />

          </div>
        ) : (<h1>Seu carrinho está vazio</h1>)}

      </div>

    );
  }
}

export default Checkout;

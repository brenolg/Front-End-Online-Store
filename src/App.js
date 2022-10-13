import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';

class App extends Component {
  constructor() {
    super();

    this.state = {
      favoriteList: [],
      quantity: 0,
    };
  }

  componentDidMount() {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    const quantity = JSON.parse(localStorage.getItem('quantity'));
    if (favoriteList !== null) {
      this.setState({ favoriteList, quantity });
    }
  }

  saveLocalStorage = () => {
    const { favoriteList } = this.state;
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    this.changeStorageQuantity();
  };

  changeStorageQuantity = () => {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    const quantity = favoriteList.reduce((prev, curr) => curr.qtde + prev, 0);
    localStorage.setItem('quantity', JSON.stringify(quantity));
    this.setState({ quantity });
  };

  addToCar = ({ target }) => {
    const { favoriteList } = this.state;
    const { parentElement: { children } } = target;
    const [img, price, title] = children;
    let qtdeSalva = 0;
    const itemNaLista = favoriteList.find((favorito) => favorito.title === title.id);
    const outrosItens = favoriteList.filter((favorito) => favorito.title !== title.id);
    if (itemNaLista !== undefined) {
      qtdeSalva = itemNaLista.qtde;
    } else {
      qtdeSalva = 0;
    }
    const novoFavorito = {
      img: img.src,
      price: price.id,
      title: title.id,
      qtde: qtdeSalva + 1,
    };
    this.setState({
      favoriteList: [...outrosItens, novoFavorito],
    }, () => this.saveLocalStorage());
  };

  decreaseQuantity = ({ target }) => {
    const { favoriteList } = this.state;
    const { parentElement: { children } } = target;
    const [img, price, title] = children;
    let qtdeSalva;
    const itemNaLista = favoriteList.find((favorito) => favorito.title === title.id);
    const outrosItens = favoriteList.filter((favorito) => favorito.title !== title.id);
    if (itemNaLista.qtde > 0) {
      qtdeSalva = itemNaLista.qtde - 1;
    } else {
      qtdeSalva = 0;
    }
    const novoFavorito = {
      img: img.src,
      price: price.id,
      title: title.id,
      qtde: qtdeSalva,
    };
    this.setState({
      favoriteList: [...outrosItens, novoFavorito],
    }, () => this.saveLocalStorage());
  };

  removeCartItem = ({ target }) => {
    const { favoriteList } = this.state;
    const { parentElement: { children } } = target;
    const [img] = children;
    const newFavList = favoriteList.filter((favorito) => favorito.title !== img.alt);
    this.setState({ favoriteList: newFavList }, () => this.saveLocalStorage());
    localStorage.clear();
  };

  render() {
    const { favoriteList, quantity } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/checkout" component={ Checkout } />
            <Route path="/cart">
              <Cart
                favoriteList={ favoriteList }
                addToCar={ this.addToCar }
                decreaseQuantity={ this.decreaseQuantity }
                removeCartItem={ this.removeCartItem }
              />
            </Route>
            <Route exact path="/">
              <Home addToCar={ this.addToCar } quantity={ quantity } />
            </Route>
            <Route
              path="/product-details/:id"
              render={ (props) => (
                <ProductDetails
                  { ...props }
                  addToCar={ this.addToCar }
                  quantity={ quantity }
                />
              ) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

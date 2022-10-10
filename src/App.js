import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';

class App extends Component {
  constructor() {
    super();

    this.state = {
      favoriteList: [],
    };
  }

  addToCar = ({ target }) => {
    const { parentElement: { children } } = target;
    const [img, price, title] = children;
    const novoFavorito = {
      img: img.src,
      price: price.id,
      title: title.id,
    };
    this.setState((prevState) => ({
      favoriteList: [...prevState.favoriteList, novoFavorito],
    }));
  };

  render() {
    const { favoriteList } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/cart"><Cart favoriteList={ favoriteList } /></Route>
            <Route exact path="/">
              <Home addToCar={ this.addToCar } />
            </Route>
            <Route path="/product-details/:id" component={ ProductDetails } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

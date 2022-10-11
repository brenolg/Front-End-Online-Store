import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';

class App extends Component {
  constructor() {
    super();

    this.state = {
      favoriteList: [],
    };
  }

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
    });
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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

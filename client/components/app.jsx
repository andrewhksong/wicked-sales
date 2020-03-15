import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cartItems => this.setState({
        cart: cartItems
      }));
  }

  render() {
    const view = this.state.view;
    if (view.name === 'catalog') {
      return (
        <div>
          <Header setView={ this.setView } cartItems={ this.state.cart.length }/>
          <ProductList setView={ this.setView }/>
        </div>
      );
    } else if (view.name === 'details') {
      return (
        <div>
          <Header setView={ this.setView } cartItems={ this.state.cart.length }/>
          <ProductDetails product={ view.params } setView={ this.setView }/>
        </div>
      );
    }
  }
}

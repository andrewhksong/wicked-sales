import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

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
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(cartItems => this.setState({
        cart: this.state.cart.concat(cartItems)
      }));
  }

  deleteItem(cartItemId) {
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
      .then(() => this.setState({ cart: [] }))
      .then(() => this.setView('catalog', {}));
  }

  render() {
    const view = this.state.view;
    if (view.name === 'catalog') {
      return (
        <div>
          <Header
            setView={ this.setView }
            cartItems={ this.state.cart.length }/>
          <ProductList
            setView={ this.setView }
            view={this.state.view} />
        </div>
      );
    } else if (view.name === 'details') {
      return (
        <div>
          <Header
            setView={ this.setView }
            cartItems={ this.state.cart.length }/>
          <ProductDetails
            product={ view.params }
            setView={ this.setView }
            addToCart={ this.addToCart }/>
        </div>
      );
    } else if (view.name === 'cart') {
      return (
        <div>
          <Header
            setView={ this.setView }
            cartItems={ this.state.cart.length }/>
          <CartSummary
            cart={ this.state.cart }
            setView={ this.setView }
            deleteItem={ this.deleteItem }/>
        </div>
      );
    } else if (view.name === 'checkout') {
      return (
        <div>
          <Header
            setView={ this.setView }
            cartItems={ this.state.cart.length }/>
          <CheckoutForm
            cart={ this.state.cart }
            setView={ this.setView }
            placeOrder={ this.placeOrder }/>
        </div>
      );
    }
  }
}

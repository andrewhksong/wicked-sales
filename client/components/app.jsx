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
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    const view = this.state.view;
    if (view.name === 'catalog') {
      return (
        <div>
          <Header setView={ this.setView }/>
          <ProductList setView={ this.setView }/>
        </div>
      );
    } else if (view.name === 'details') {
      return (
        <div>
          <Header setView={ this.setView }/>
          <ProductDetails product={ view.params } setView={ this.setView }/>
        </div>
      );
    }
  }
}

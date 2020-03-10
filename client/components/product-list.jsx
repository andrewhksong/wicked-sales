import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({
        products: products
      }));
  }

  render() {
    const items = this.state.products.map(product => {
      return (
        <ProductListItem
          key={ product }
          name={ product.name }
          price={ product.price }
          image={ product.image }
          description={ product.shortDescription } />
      );
    });
    return (
      <div className="container">
        <div className="row">
          {items}
        </div>
      </div>
    );
  }
}

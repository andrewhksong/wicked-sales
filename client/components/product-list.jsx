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
      }))
      .catch(error => console.error(
        'error:', error.message
      ));
  }

  render() {
    const items = this.state.products.map(product => {
      return (
        <ProductListItem
          key={ product.productId }
          name={ product.name }
          price={ (product.price / 100).toFixed(2) }
          image={ product.image }
          description={ product.shortDescription }
          productId={ product.productId }
          setView={ this.props.setView } />
      );
    });
    return (
      <div className="container mb-4">
        <div className="row d-flex justify-content-around">
          {items}
        </div>
      </div>
    );
  }
}

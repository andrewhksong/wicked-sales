import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const productId = this.props.productId;
    fetch(`/api/products${productId}`)
      .then(res => res.json())
      .then(product => this.setState({
        product: product
      }));
  }

  render() {
    return null;
  }
}

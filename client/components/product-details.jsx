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
    const product = this.state.product;
    if (product) {
      return (
        <div className="container">
          <a href="#"> Back to catalog </a>
          <header>
            <div className="col-sm-4">
              <img src={ product.image } />
            </div>
            <div className="col-sm-8">
              <h2>{ product.name }</h2>
              <h4 className="text-muted">{ product.price }</h4>
              <p>{ product.shortDescription }</p>
            </div>
          </header>
          <div className="col-sm-12">{ product.longDescription }</div>
        </div>
      );
    }
    return null;
  }
}

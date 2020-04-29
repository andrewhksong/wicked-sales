import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const productId = this.props.product.productId;
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(product => this.setState({
        product: product
      }));
  }

  render() {
    const product = this.state.product;
    if (product) {
      return (
        <div className="container cart mb-5">
          <div onClick={() => this.props.setView('catalog', {})}
            style={{ cursor: 'pointer' }}>
            <p className="redirect text-muted mt-4 ml-3 mb-4"> &lt; Back to catalog </p>
          </div>
          <header className="pl-3 pr-3">
            <div className="row mb-5">
              <img className="col-sm-4 card-dimensions" src={ product.image } />
              <div className="col-sm-8">
                <h2>{ product.name }</h2>
                <h4 className="text-muted">${ (product.price / 100).toFixed(2) }</h4>
                <p>{ product.shortDescription }</p>
                <button
                  className="btn btn-primary mt-3"
                  onClick={ () => this.props.addToCart(product) }>Add To Cart</button>
              </div>
            </div>
          </header>
          <div className="col-sm-12 card-text mb-4">{ product.longDescription }</div>
        </div>
      );
    }
    return null;
  }
}

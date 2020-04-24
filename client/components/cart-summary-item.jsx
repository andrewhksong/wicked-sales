import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    const product = this.props.product;
    return (
      <div className="card container">
        <img src={ product.image } className="col-sm-4 col-4 card-img-top h-50 w-50" />
        <div className="col-sm-8 col-8 d-flex flex-column justify-content-center">
          <p className="card-title">{ product.name }</p>
          <p className="text-muted">${ (product.price / 100).toFixed(2)}</p>
          <p>{ product.descption }</p>
        </div>
      </div>
    );
  }
}

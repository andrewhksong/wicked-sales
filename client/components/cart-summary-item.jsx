import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    const product = this.props.product;
    return (
      <div className="cart mb-4 p-3">
        <div className="row">
          <div className="col-sm-4 col-4">
            <img
              src={ product.image }
              className="card-checkout" />
          </div>
          <div className="col-sm-8 col-8 ">
            <h3 className="card-title">{ product.name }</h3>
            <p className="text-muted">${ (product.price / 100).toFixed(2)}</p>
            <p>{ product.shortDescription }</p>
          </div>
          <div>
            <button onCLick={ () => product.deleteItem(product.cartItemId)}>
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

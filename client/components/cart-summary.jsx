import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    const cartList = this.props.cart.map(product => {
      return (
        <CartSummaryItem
          key={ product.productId }
          product={ product }/>
      );
    });
    const initialValue = 0;
    const total = this.props.cart.reduce((accum, currV) => {
      return accum + currV.price;
    }, initialValue);
    const cartTotal = (total / 100).toFixed(2);
    if (this.props.cart.length === 0) {
      return (
        <div>
          <p className="d-flex justify-content-center">You haven&#39;t added anything yet!</p>
        </div>
      );
    }
    return (
      <div className="container mb-5">
        <p
          className="redirect text-muted"
          style={{ cursor: 'pointer' }}
          onClick={() => this.props.setView('catalog', {})}>
          &lt; Back to catalog
        </p>
        <h2 className="mb-2">My Cart</h2>
        <div className="cart p-2 m-1">
          { cartList }
          <div className="d-flex justify-content-between p-3">
            <h3 className="m-1">Cart Total ${ cartTotal }</h3>
            <button
              className="btn btn-primary"
              onClick={() => this.props.setView('checkout', {})}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

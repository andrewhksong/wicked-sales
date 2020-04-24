import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    const cartList = this.props.cart.map(product => {
      return (
        <CartSummaryItem key={ product.productId } product={ product }/>
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
          <p>You haven&#39;t added anything yet!</p>
        </div>
      );
    }
    return (
      <div className="container">
        <p className="text-muted"
          style={{ cursor: 'pointer' }}
          onClick={() => this.props.setView('catalog', {})}>
             &lt; Back to catalog
        </p>
        <h2 className="mb-2">
              My Cart
        </h2>
        { cartList }
        <div className="row justify-content-between m-2">
          <h3 className="m-4">Cart Total ${cartTotal}</h3>
        </div>
      </div>
    );
  }
}

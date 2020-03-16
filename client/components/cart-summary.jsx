import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    const cartList = this.props.cart.map(product => {
      return (
        <CartSummaryItem key={ product.productId } product={ product }/>
      );
    });
    return (
      <div className="container">
        { cartList }
      </div>
    );
  }
}

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
        <p className="text-muted"
          style={{ cursor: 'pointer' }}
          onClick={() => this.props.setView('catalog', {})}>
             &lt; Back to catalog
        </p>
        <h2 className="mb-2">
              My Cart
        </h2>
        { cartList }
      </div>
    );
  }
}

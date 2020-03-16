import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    const product = this.props.product;
    return (
      <div src={ product.image }>
        <p>{ product.name }</p>
        <p>{ product.price }</p>
        <p>{ product.descption }</p>
      </div>
    );
  }
}

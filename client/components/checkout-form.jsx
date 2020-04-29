import React from 'react';

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        name: '',
        creditCard: ''
        };
    }

    render() {
        const initialValue = 0;
        const total = this.props.cart.reduce((accum, currV) => {
          return accum + currV.price;
        }, initialValue);
        const cartTotal = (total / 100).toFixed(2);
        return (
        <form className="container">
            <p className="text-muted"
                style={{ cursor: 'pointer' }}
                onClick={() => this.props.setView('cart', {})}>
                &lt; Back to Cart
            </p>
            <h2>Total ${cartTotal}</h2>
            <div className="d-flex flex-column form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" 
                       id="name" 
                       placeholder="Name" 
                       className="form-control"/>
            </div>
            <div className="d-flex flex-column form-group">
                <label htmlFor="credit">Credit Card Number</label>
                <input type="number" 
                       id="credit" 
                       placeholder="Credit Card Number"
                       className="form-control"/>
            </div>
            <div className="d-flex flex-column form-group">
                <label htmlFor="shipping">Street Address 1</label>
                <textarea id="shipping" className="form-control" rows="2"></textarea>
            </div>
            <div className="d-flex justify-content-between">
                <p className="text-muted"
                   style={{ cursor: 'pointer' }}
                   onClick={() => this.props.setView('catalog', {})}>
                   &lt; Continue Shopping
                </p>
                <button className="btn btn-primary">Place Order</button>
            </div>
        </form>
        );
    }
}

export default CheckoutForm;
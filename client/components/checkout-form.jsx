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
        return (
        <form className="container">
            <label htmlFor="name" >Name</label>
            <input type="text" id="name" placeholder="Name" />
            <label htmlFor="credit">Credit Card</label>
            <input type="number" id="credit" placeholder="Credit Card Number" />
            <label htmlFor="shipping">Shiping Address</label>
            <textarea id="shipping"></textarea>
            <div className="d-flex justify-content-between">
            <p className="text-muted">&lt; Continue Shopping</p>
            <button className="btn btn-primary">Place Order</button>
            </div>
        </form>
        );
    }
}

export default CheckoutForm;
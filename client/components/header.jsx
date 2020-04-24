import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="row bg-dark mb-5">
        <div className="col-6 col-sm-6">
          <p className="container text-white font-weight-bold pt-4 ml-sm-5 ml-2"
            onClick={() => this.props.setView('catalog', {})}> $ Wicked Sales </p>
          <img />
        </div>
        <div className="col-6 col-sm-6 d-flex flex-wrap align-items-center justify-content-end"
          onClick={ () => this.props.setView('cart', {}) }
          style={ { cursor: 'pointer' } }>
          <i className="fas fa-shopping-cart mr-4 text-white"></i>
          <p className="mr-4 text-white">{ this.props.cartItems }</p>
        </div>
      </div>
    );
  }
}

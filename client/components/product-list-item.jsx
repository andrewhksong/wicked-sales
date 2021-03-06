import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div
        className="col-sm-4 mb-4"
        onClick={() => this.props.setView('details', { productId: this.props.productId })}
        style={{ cursor: 'pointer ' }}>
        <div className="card h-100">
          <img
            src={ this.props.image }
            alt={ this.props.name }
            className="card-img-top card-dimensions h-50" />
          <div className="card-body">
            <p className="card-title font-weight-bold">{ this.props.name }</p>
            <p className="card-subtitle text-muted mb-1">${ this.props.price }</p>
            <p>{ this.props.description }</p>
          </div>
        </div>
      </div>
    );
  }
}

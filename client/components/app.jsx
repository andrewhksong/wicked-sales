import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <div className="container">
        <Header />
        <ProductList />
      </div>
    );
  }
}

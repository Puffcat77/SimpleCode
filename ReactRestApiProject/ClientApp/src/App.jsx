import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { FetchComponent } from './Utils/DataFetcher';
import { AppRouter } from './components/AppRouter';

import './custom.css'
import { BrowserRouter } from 'react-router-dom';

export default class App extends Component {
  static displayName = App.name;
  constructor(props) {
    super(props);
    this.state = {
      hasToken: FetchComponent.hasToken()
    }
  }

  componentDidMount() {
    this.setState({
      hasToken: FetchComponent.hasToken()
    });
  }

  render () {
    return (
        <BrowserRouter>
          <Layout>
            <AppRouter />
          </Layout>
        </BrowserRouter>
    );
  }
}

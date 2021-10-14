import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Employees } from './components/Employees';
import { Registration } from './components/Registration';
import { LogIn } from './components/LogIn';
import { FetchData } from './components/FetchData';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Employees} />
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/login' component={LogIn} />
      </Layout>
    );
  }
}

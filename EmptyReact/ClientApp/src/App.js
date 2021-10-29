import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Employees } from './components/Employees';
import { LoginForm } from './components/LoginForm';
import { EditEmployee } from './components/EditEmployee';
import { FetchComponent } from './Utils/DataFetcher';

import './custom.css'
import { AddEmployee } from './components/AddEmployee';

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
      <Layout>
        <Route exact path='/' >
          { this.state.hasToken ? <Employees/> : <Redirect to='/login' />}
        </Route>
        <Route exact path='/add'>
          { this.state.hasToken ? <AddEmployee /> : <Redirect to='/login' />}
        </Route>
        <Route exact path='/employee/:id' component={ EditEmployee }>
          { this.state.hasToken ? <EditEmployee /> : <Redirect to='/login' />}
        </Route>
        <Route exact path='/login' component={LoginForm} />
      </Layout>
    );
  }
}

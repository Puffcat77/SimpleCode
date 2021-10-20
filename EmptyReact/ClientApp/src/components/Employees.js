import React, { Component } from 'react';
import { Route } from 'react-router';
import {Table} from 'react-bootstrap';
// import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { MyButton } from './UI/button/MyButton.jsx';
import { AppConfig } from './AppConfig.js';
import { FetchComponent } from './FetchComponent.js';
import { AddEmployee } from "./AddEmployee.js";


export class Employees extends Component {
  static displayName = Employees.name;

  constructor(props) {
    super(props);
    this.state={emps:[]}
  }

  async refreshList() {
    fetch(process.env.REACT_APP_EMPLOYEE_API)
      .then(response => response.json())
      .then(data => this.setState({emps: data}));
  }

  componentDidMount() {
      this.refreshList();
  }

  componentDidUpdate() {
      //this.refreshList();
  }

  render () {
    const {emps} = this.state;
    return ( 
      <div>
        <h3 className="employees-table">
          Employees page
          <MyButton type="button" value="Add employee">
          { <Route exact path='/add' component={AddEmployee}/> }
          </MyButton>
        </h3>
        
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Birth date</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
          {emps.map(emp => {
              return <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{ new Date(emp.birthday).toLocaleDateString() }
                </td>
                <td>{ Intl.NumberFormat(AppConfig.userLanguage, { minimumFractionDigits: 2 }).format(emp.salary)}</td>
                <td>Edit Delete</td>
              </tr>
              }
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


export class Employees extends Component {
  static displayName = Employees.name;

  constructor(props) {
    super(props);
    this.state={emps:[]}
    this.userLang = navigator.language || navigator.userLanguage;
    this.offset = new Date().getTimezoneOffset();
  }

    refreshList() {
        fetch(process.env.REACT_APP_EMPLOYEE_API)
        .then(resp => resp.json())
        .then(data => {
          this.setState({emps: data})
        });
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
        <h3>Employees page</h3>
        <input type="button" value="Add"/>
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
                <td>{ new Date(emp.birthday).toLocaleString(this.userLang, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </td>
                <td>{Intl.NumberFormat(this.userLang, { minimumFractionDigits: 2 }).format(emp.salary)}</td>
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

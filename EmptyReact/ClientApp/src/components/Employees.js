import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { MyButton } from './UI/button/MyButton.jsx';
import { AppConfig } from './AppConfig.js';
import classes from './UI/button/MyButton.module.css';


export const Employees = (props) => {
  const displayName = Employees.name;
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  
  function getEmployees() {
    let emps = [];
    fetch(process.env.REACT_APP_EMPLOYEE_API)
      .then(response =>  response.json())
      .then(data => {
        setEmployees(data);
      })
  }

  function refreshList() {
    setIsLoading(true);
    fetch(process.env.REACT_APP_EMPLOYEE_API)
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        setEmployees(data);
      });
  }

  function deleteEmployee(employeeId) {
    fetch(process.env.REACT_APP_EMPLOYEE_API+`/${employeeId}`, {
        method: 'DELETE'
      })
    .then(response => response)
    .then(data => refreshList())
    .catch(error => console.log(error));
  }

  useEffect(() => refreshList(), []);
  
  return ( 
    <div>
      <h3 className="employees-table">
        Employees page
        <MyButton disabled={isLoading} value="Add employee" onClick={e => { window.location.href='/add' }}/>
      </h3>
      {
        isLoading?
        <h4>Loading...</h4>
        :<Table className="mt-4" striped bordered hover size="sm">
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
          {employees?.map(emp => {
              return <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{ new Date(emp.birthday).toLocaleDateString() }
                </td>
                <td>{ Intl.NumberFormat(AppConfig.userLanguage, { minimumFractionDigits: 2 }).format(emp.salary)}</td>
                <td>
                  <div className={ classes.inlineGroup }>
                    <MyButton 
                      onClick ={ e => window.location.href = ("/employee/" + emp.id)} 
                      customClasses={ classes.small } value='Edit'/>
                    <div className={classes.splitter}/>
                    <MyButton 
                      onClick ={ e => deleteEmployee(emp.id)} 
                      customClasses={ [classes.small, classes.red, classes.delete].join(' ') } 
                      value='Delete'/>
                  </div>
                </td>
              </tr>
              }
            )}
          </tbody>
        </Table>
      }
    </div>
  );
}

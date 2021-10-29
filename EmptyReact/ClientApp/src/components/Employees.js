import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { MyButton } from './UI/button/MyButton.jsx';
import { AppConfig } from './AppConfig.js';
import classes from './UI/button/MyButton.module.css';
import { FetchComponent } from '../Utils/DataFetcher.js';


export const Employees = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  function refreshList() {
    FetchComponent.getEmployees(setEmployees, setIsLoading);
  }

  function deleteEmployee(employeeId) {
    FetchComponent.removeEmployee(employeeId, refreshList);
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

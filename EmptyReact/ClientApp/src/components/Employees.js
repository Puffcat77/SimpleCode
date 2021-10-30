import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { MyButton } from './UI/button/MyButton.jsx';
import { AppConfig } from './AppConfig.js';
import classes from './UI/button/MyButton.module.css';
import { FetchComponent } from '../Utils/DataFetcher.js';
import { MySelect } from './UI/select/MySelect.js';
import { Loader } from './UI/Loader/Loader.jsx';


export const Employees = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [orderedEmployees, setOrderedEmployees] = useState([]);

  const stringComparer = (val1, val2) => ('' + val1).localeCompare('' + val2);
  
  const dateComparer = (val1, val2) => (new Date(val1) - new Date(val2));

  const numberComparer = (val1, val2) => val1 - val2;

  function sortEmployees(order, data = employees) {
    let comparer = undefined;
    let sort = 0;
    if (order.orderBy === 'ascending')
      sort = 1;
    if (order.orderBy === 'descending')
      sort = -1;
    switch(order.propName) {
      case '':
        comparer = (val1, val2) =>  0;
        break;
      case 'salary':
        comparer = numberComparer;
        break;
      case 'birthday':
        comparer = dateComparer;
        break;
      default:
        comparer = stringComparer;
        break;
    }
    setOrderedEmployees([...data].sort((empA, empB) => 
      (sort)*comparer(empA[order.propName], empB[order.propName])));
  }

  function refreshList() {
    FetchComponent.getEmployees(setEmployees, setIsLoading, sortEmployees);
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
        <div style={{display: 'flex', justifyContent: 'center'}}><Loader /></div>
        :<Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name <MySelect onChange={sortEmployees} propName='name'/></th>
              <th>Email <MySelect onChange={sortEmployees} propName='email'/></th>
              <th>Birth date <MySelect onChange={sortEmployees} propName='birthday'/></th>
              <th>Salary <MySelect onChange={sortEmployees} propName='salary'/></th>
            </tr>
          </thead>
          <tbody>
          {orderedEmployees?.map(emp => {
              return <tr key={emp.id}>
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

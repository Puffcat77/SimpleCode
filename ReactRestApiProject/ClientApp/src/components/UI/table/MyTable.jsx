import React from 'react';
import {Table} from 'react-bootstrap';
import { MyButton } from '../button/MyButton.jsx';
import { AppConfig } from '../../AppConfig.js';
import classes from '../button/MyButton.module.css';

export const MyTable = ({isLoading, employees, deleteEmployee, props}) => {
    return (
        <Table className={[ "mt-4" ]} striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Birth date</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
        {isLoading?
            <tr></tr>
            :employees?.map(emp => {
              return (
              <tr key={emp.id}>
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
              )}
            )
          }
        </tbody>
      </Table>
    );
}
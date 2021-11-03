import React, { useState, useEffect, useMemo } from 'react';
import {Table} from 'react-bootstrap';
import { MyButton } from './UI/button/MyButton.jsx';
import { AppConfig } from './AppConfig.js';
import classes from './UI/button/MyButton.module.css';
import { FetchComponent } from '../Utils/DataFetcher.js';
import { MySelect } from './UI/select/MySelect.js';
import { Loader } from './UI/Loader/Loader.jsx';
import { Pages } from './Pages.js';
import { MyOrder } from './UI/order/MyOrder.js';


export const Employees = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [order, setOrder] = useState({propName: '', orderBy: ''});
  const [currentPage, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagesCount, setPages] = useState(1)

  function totalPages() {
    FetchComponent.getEmployees(
      setEmployees, 
      setIsLoading, 
      setPages, 
      order, 
      limit, 
      currentPage);
  }

  function deleteEmployee(employeeId) {
    FetchComponent.removeEmployee(employeeId, totalPages);
  }
  
  useEffect(() => totalPages(), []);
  useEffect(() => totalPages(), [order.propName, order.orderBy, currentPage, limit]);
  
  return ( 
    <div>
      <h3 style={{display: 'flex', alignContent:'center', justifyContent:'space-between'}}>
        <div style={{marginTop: '0px'}}>
          Employees page
          {isLoading?
            <Loader isInline={true}/>
            : ''
          }
        </div>
        <MyButton 
          disabled={isLoading} 
          value="Add employee" 
          onClick={e => { window.location.href='/add' }}/>
      </h3>
      <MyOrder setOrder={setOrder} order={order}/>
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
        <Pages page={currentPage} setPage={setPage} pagesCount={ pagesCount }/>
    </div>
  );
}

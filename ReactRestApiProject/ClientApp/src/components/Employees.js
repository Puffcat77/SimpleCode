import React, { useState, useEffect, useMemo } from 'react';
import { MyButton } from './UI/button/MyButton.jsx';
import { FetchComponent } from '../Utils/DataFetcher.js';
import { Loader } from './UI/loader/Loader.jsx';
import { Pages } from './Pages.js';
import { MyOrder } from './UI/order/MyOrder.js';
import { MyLimit } from './UI/limit/MyLimit.js';
import { MyTable } from './UI/table/MyTable.js';


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
      <MyOrder setOrder={setOrder} order={order} isLoading={isLoading}/>
      <MyLimit setLimit={setLimit} limit={limit} isLoading={isLoading}/>
      <MyTable isLoading={isLoading} employees={employees} deleteEmployee={deleteEmployee}/>
      <Pages page={currentPage} setPage={setPage} pagesCount={ pagesCount }/>
    </div>
  );
}

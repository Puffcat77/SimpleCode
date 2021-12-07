import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Employees } from './Employees.jsx';
import { LoginForm } from './LoginForm.jsx';
import { EditEmployee } from './EditEmployee.jsx';
import { AddEmployee } from './AddEmployee.jsx';
import { FetchComponent } from '../Utils/DataFetcher';

export const AppRouter= () => {
    const [hasToken, setHasToken] = useState(FetchComponent.hasToken())

    useEffect(() => { 
      setHasToken(FetchComponent.hasToken())
    })

    return (
      <div>
      { 
        hasToken?
        <Switch>
          <Route exact path='/employees' component={Employees}/>
          <Route exact path='/add' component={AddEmployee} />
          <Route exact path='/employee/:id' component={EditEmployee}/>
          <Redirect to='/employees'/>
        </Switch>
        :
        <Switch>
          <Route extact path='/login' component={LoginForm} />
          <Redirect to='/login'/>
        </Switch>
      }
      </div>  
    )
}
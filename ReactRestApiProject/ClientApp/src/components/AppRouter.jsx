import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Employees } from './Employees';
import { LoginForm } from './LoginForm';
import { EditEmployee } from './EditEmployee';
import { AddEmployee } from './AddEmployee';
import { FetchComponent } from '../Utils/DataFetcher';

export const AppRouter= () => {
    const [hasToken, setHasToken] = useState(FetchComponent.hasToken())

    useEffect(() => { 
      setHasToken(FetchComponent.hasToken())
    })

    return (
          <Switch>
            { 
              hasToken?
              <div>
                <Route exact path='/employees' component={Employees}/>
                <Route exact path='/add' component={AddEmployee} />
                <Route exact path='/employee/:id' component={EditEmployee}/>
                <Redirect to='/employees'/>
              </div>
              :
              <div>
                <Route extact path='/login' component={LoginForm} />
                <Redirect to='/login'/>
              </div>
            }
          </Switch>
    )
}
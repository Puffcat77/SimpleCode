import React, { useEffect, useState } from "react";
import { MyButton } from "./UI/button/MyButton";
import { Form } from "react-bootstrap";
import { EmployeeForm } from './EmployeeForm';
import { useEmployeeStatus } from './hooks/useEmployeeStatus';
import { EmployeeContext } from "./hooks/EmployeeContext";
import classes from './UI/button/MyButton.module.css';
import { FetchComponent } from '../Utils/DataFetcher';
import { useHistory, useLocation } from "react-router";

export const EditEmployee = (props) => {
    const location = useLocation();
    console.log('location', location);
    const lastSlashIndex = location.pathname.lastIndexOf('/');
    const [employee, setEmployee] = useState({id: location.pathname.substr(lastSlashIndex + 1)});
    const isFilled = useEmployeeStatus(employee);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        FetchComponent.getEmployee(employee.id, employee, setEmployee, setIsLoading);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        FetchComponent.editEmployee(employee, () => window.location.href = '/');
    };

    function cancelSubmit(e) {
        e.preventDefault();
        window.location.href = '/';
    };
    
    return (
        <EmployeeContext.Provider value={{employee, setEmployee, isLoading}}>
            { isLoading?
                <h3>Loading...</h3>
                :
                <Form>
                    <EmployeeForm id={employee.id}/>
                    <div className={ [classes.group].join(' ') }>
                        <MyButton 
                            disabled={!isFilled} 
                            value="Save"
                            onClick={e => handleSubmit(e)}/>
                        <MyButton customClasses = { classes.red }
                            disabled={false} 
                            value="Cancel"
                            onClick={e => cancelSubmit(e)}/>
                    </div>
                </Form>
            }
        </EmployeeContext.Provider>
    );
};
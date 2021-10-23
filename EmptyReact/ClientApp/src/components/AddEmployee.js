import React, { useEffect, useState } from "react";
import { MyButton } from "./UI/button/MyButton";
import { Form } from "react-bootstrap";
import { EmployeeForm } from './EmployeeForm';
import { useEmployeeStatus } from './hooks/useEmployeeStatus';
import { EmployeeContext } from "./hooks/EmployeeContext";
import classes from './UI/buttonGroups/ButtonGroups.module.css';

export const AddEmployee = ({props}) =>  {
    const [employee, setEmployee] = useState({});
    const isFilled = useEmployeeStatus(employee);

    useEffect(() => console.log(employee));

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = JSON.stringify( employee );
        fetch(process.env.REACT_APP_EMPLOYEE_API, {
            method: "POST",
            headers:{
                'Content-Type':'application/json; charset=utf-8'
            },
            body: body
        })
        .then(resp =>  { 
            if (resp.ok)
                alert("Employee added successfully!");
        })
        .catch( error =>
            console.error(error)
        );
        window.location.href = '/';
    }

    return (
        <EmployeeContext.Provider value={{employee, setEmployee}}>
            <Form>
                    <EmployeeForm id={0}/>
                    <MyButton 
                        customClasses = { classes.buttons }
                        disabled={!isFilled} 
                        value="Add new employee" 
                        onClick={e => handleSubmit(e)}/>
            </Form>
        </EmployeeContext.Provider>
    )
}